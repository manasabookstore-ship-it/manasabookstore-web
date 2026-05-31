import { NextResponse } from "next/server";

import { lookupExternalBarcode } from "@/lib/barcode-lookup";
import { findProductByBarcodeInSupabase } from "@/lib/supabase/admin-data";
import { guardAdminRequest } from "../../guard";

export async function GET(request: Request) {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const code = new URL(request.url).searchParams.get("code")?.trim() ?? "";

  if (!code) {
    return NextResponse.json(
      { error: "Barcode is required" },
      { status: 400 },
    );
  }

  const product = await findProductByBarcodeInSupabase(code);

  if (product) {
    return NextResponse.json({
      found: true,
      source: "inventory",
      product,
    });
  }

  return NextResponse.json(await lookupExternalBarcode(code));
}
