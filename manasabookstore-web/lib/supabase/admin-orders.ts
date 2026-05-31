import { AdminOrder, AdminOrderStatus } from "@/lib/admin-data";
import { Database } from "./database.types";
import { createSupabaseServiceClient } from "./server";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];

function mapOrder(row: OrderRow): AdminOrder {
  return {
    id: row.id,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerNote: row.customer_note ?? "",
    status: row.status,
    source: row.source,
    createdAt: row.created_at,
  };
}

export async function getOrdersFromSupabase() {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapOrder);
}

export async function updateOrderStatusInSupabase(
  id: string,
  status: AdminOrderStatus,
) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    return null;
  }

  return mapOrder(data);
}

