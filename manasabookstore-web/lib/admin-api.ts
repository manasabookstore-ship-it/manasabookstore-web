import { AdminProduct, AdminSale, SaleItem } from "./admin-data";
import { BarcodeLookupResult } from "./barcode-lookup";

export type AdminSnapshot = {
  products: AdminProduct[];
  sales: AdminSale[];
};

type ProductPayload = Omit<AdminProduct, "id">;

function headers() {
  return {
    "Content-Type": "application/json",
  };
}

export async function fetchAdminSnapshot(): Promise<AdminSnapshot | null> {
  const response = await fetch("/api/admin/snapshot", {
    headers: headers(),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminSnapshot;
}

export async function createAdminProduct(
  product: ProductPayload,
): Promise<AdminProduct | null> {
  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminProduct;
}

export async function updateAdminProduct(
  product: AdminProduct,
): Promise<AdminProduct | null> {
  const response = await fetch("/api/admin/products", {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminProduct;
}

export async function createAdminSale(
  items: SaleItem[],
  paymentMode: AdminSale["paymentMode"],
): Promise<AdminSale | null> {
  const response = await fetch("/api/admin/sales", {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ items, paymentMode }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminSale;
}

export async function lookupAdminBarcode(
  code: string,
): Promise<BarcodeLookupResult | null> {
  const params = new URLSearchParams({ code });
  const response = await fetch(`/api/admin/barcode/lookup?${params.toString()}`, {
    headers: headers(),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as BarcodeLookupResult;
}
