import { NextResponse } from "next/server";

import { CommerceSettings } from "@/lib/commerce";
import {
  getCommerceSettingsFromSupabase,
  updateCommerceSettingsInSupabase,
} from "@/lib/supabase/commerce-data";
import { guardAdminRequest } from "../guard";

export async function GET() {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  return NextResponse.json(await getCommerceSettingsFromSupabase());
}

export async function PATCH(request: Request) {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const body = (await request.json()) as CommerceSettings;
  const updated = await updateCommerceSettingsInSupabase({
    onlineOrderingEnabled: Boolean(body.onlineOrderingEnabled),
    pickupEnabled: Boolean(body.pickupEnabled),
    deliveryEnabled: Boolean(body.deliveryEnabled),
  });

  if (!updated) {
    return NextResponse.json(
      { error: "Settings could not be updated" },
      { status: 500 },
    );
  }

  return NextResponse.json(updated);
}

