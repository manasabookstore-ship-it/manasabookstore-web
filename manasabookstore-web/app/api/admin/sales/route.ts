import { NextResponse } from "next/server";

import { createSaleInSupabase } from "@/lib/supabase/admin-data";
import { guardAdminRequest } from "../guard";

export async function POST(request: Request) {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const body = await request.json();
  const created = await createSaleInSupabase(body.items, body.paymentMode);

  if (!created) {
    return NextResponse.json(
      { error: "Sale could not be recorded" },
      { status: 500 },
    );
  }

  return NextResponse.json(created);
}
