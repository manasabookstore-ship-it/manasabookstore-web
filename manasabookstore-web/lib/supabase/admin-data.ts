import { AdminProduct, AdminSale, SaleItem } from "@/lib/admin-data";
import { createSupabaseServiceClient } from "./server";
import { mapProduct, mapSale, slugify, toPaymentMode } from "./admin-mappers";

function receiptNo() {
  return `MBC-${Date.now()}`;
}

export async function getAdminSnapshotFromSupabase() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const [{ data: productRows, error: productError }, { data: saleRows, error: saleError }] =
    await Promise.all([
      supabase
        .from("products")
        .select("*, categories(name)")
        .order("created_at", { ascending: false }),
      supabase
        .from("sales")
        .select("*, sale_items(*)")
        .order("created_at", { ascending: false }),
    ]);

  if (productError || saleError) {
    return null;
  }

  return {
    products: (productRows ?? []).map(mapProduct),
    sales: (saleRows ?? []).map(mapSale),
  };
}

export async function createProductInSupabase(
  product: Omit<AdminProduct, "id">,
) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const { data: category } = await supabase
    .from("categories")
    .select("id")
    .eq("name", product.category)
    .maybeSingle();

  const { data, error } = await supabase
    .from("products")
    .insert({
      category_id: category?.id ?? null,
      name: product.name,
      slug: `${slugify(product.name)}-${Date.now()}`,
      sku: product.sku,
      barcode: product.barcode || null,
      stock: product.stock,
      price: product.price,
      low_stock: product.lowStock,
      is_active: true,
    })
    .select("*, categories(name)")
    .single();

  if (error || !data) {
    return null;
  }

  return mapProduct(data);
}

export async function findProductByBarcodeInSupabase(barcode: string) {
  const supabase = createSupabaseServiceClient();
  const code = barcode.trim();

  if (!supabase || !code) {
    return null;
  }

  const { data } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("barcode", code)
    .maybeSingle();

  return data ? mapProduct(data) : null;
}

export async function createSaleInSupabase(
  items: SaleItem[],
  paymentMode: AdminSale["paymentMode"],
) {
  const supabase = createSupabaseServiceClient();

  if (!supabase || !items.length) {
    return null;
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const { data: sale, error: saleError } = await supabase
    .from("sales")
    .insert({
      receipt_no: receiptNo(),
      payment_mode: toPaymentMode(paymentMode),
      subtotal,
      total: subtotal,
    })
    .select("*")
    .single();

  if (saleError || !sale) {
    return null;
  }

  const { error: itemsError } = await supabase.from("sale_items").insert(
    items.map((item) => ({
      sale_id: sale.id,
      product_id: item.productId || null,
      product_name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      unit_price: item.price,
      line_total: item.price * item.quantity,
    })),
  );

  if (itemsError) {
    return null;
  }

  await Promise.all(
    items
      .filter((item) => item.productId)
      .map(async (item) => {
        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.productId)
          .single();

        if (!product) {
          return;
        }

        await supabase
          .from("products")
          .update({ stock: Math.max(0, product.stock - item.quantity) })
          .eq("id", item.productId);
      }),
  );

  return {
    id: sale.id,
    createdAt: sale.created_at,
    paymentMode,
    subtotal,
    items,
  };
}

