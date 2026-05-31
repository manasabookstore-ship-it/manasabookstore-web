import { NextResponse } from "next/server";

import { AdminOrderStatus } from "@/lib/admin-data";
import {
  getOrdersFromSupabase,
  updateOrderStatusInSupabase,
} from "@/lib/supabase/admin-orders";
import { guardAdminRequest } from "../guard";

const statuses: AdminOrderStatus[] = [
  "requested",
  "confirmed",
  "ready",
  "completed",
  "cancelled",
];

export async function GET() {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  return NextResponse.json(await getOrdersFromSupabase());
}

export async function PATCH(request: Request) {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const body = (await request.json()) as {
    id?: string;
    status?: AdminOrderStatus;
  };

  if (!body.id || !body.status || !statuses.includes(body.status)) {
    return NextResponse.json({ error: "Invalid order update" }, { status: 400 });
  }

  const updated = await updateOrderStatusInSupabase(body.id, body.status);

  if (!updated) {
    return NextResponse.json(
      { error: "Order could not be updated" },
      { status: 500 },
    );
  }

  return NextResponse.json(updated);
}
