import { AdminOrder, AdminOrderStatus } from "./admin-data";

export async function fetchAdminOrders(): Promise<AdminOrder[]> {
  const response = await fetch("/api/admin/orders", {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as AdminOrder[];
}

export async function updateAdminOrderStatus(
  id: string,
  status: AdminOrderStatus,
): Promise<AdminOrder | null> {
  const response = await fetch("/api/admin/orders", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, status }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminOrder;
}

