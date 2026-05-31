import { AdminProduct, AdminSale, SaleItem } from "@/lib/admin-data";
import { Database } from "./database.types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"] & {
  categories?: { name: string } | null;
};
type SaleRow = Database["public"]["Tables"]["sales"]["Row"] & {
  sale_items?: Database["public"]["Tables"]["sale_items"]["Row"][];
};

export function toPaymentMode(mode: AdminSale["paymentMode"]) {
  return mode.toLowerCase() as Database["public"]["Enums"]["payment_mode"];
}

export function fromPaymentMode(
  mode: Database["public"]["Enums"]["payment_mode"],
): AdminSale["paymentMode"] {
  if (mode === "upi") {
    return "UPI";
  }

  if (mode === "card") {
    return "Card";
  }

  return "Cash";
}

export function mapProduct(row: ProductRow): AdminProduct {
  return {
    id: row.id,
    name: row.name,
    category: row.categories?.name ?? "Uncategorized",
    sku: row.sku,
    barcode: row.barcode ?? "",
    stock: row.stock,
    price: Number(row.price),
    lowStock: row.low_stock,
  };
}

export function mapSale(row: SaleRow): AdminSale {
  const items: SaleItem[] =
    row.sale_items?.map((item) => ({
      productId: item.product_id ?? "",
      name: item.product_name,
      sku: item.sku ?? "",
      quantity: item.quantity,
      price: Number(item.unit_price),
    })) ?? [];

  return {
    id: row.id,
    createdAt: row.created_at,
    paymentMode: fromPaymentMode(row.payment_mode),
    subtotal: Number(row.subtotal),
    items,
  };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

