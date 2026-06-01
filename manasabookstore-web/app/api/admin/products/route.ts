import { NextResponse } from "next/server";

import {
  createProductInSupabase,
  updateProductInSupabase,
} from "@/lib/supabase/admin-data";
import { guardAdminRequest } from "../guard";

export async function POST(request: Request) {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const product = await request.json();
  const created = await createProductInSupabase(product);

  if (!created) {
    return NextResponse.json(
      { error: "Product could not be created" },
      { status: 500 },
    );
  }

  return NextResponse.json(created);
}

export async function PATCH(request: Request) {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const product = await request.json();
  const updated = await updateProductInSupabase(product);

  if (!updated) {
    return NextResponse.json(
      { error: "Product could not be updated" },
      { status: 500 },
    );
  }

  return NextResponse.json(updated);
}
