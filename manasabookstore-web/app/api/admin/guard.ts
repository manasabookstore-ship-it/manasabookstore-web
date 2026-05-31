import { NextResponse } from "next/server";

import { canAccessAdmin, getCurrentRole } from "@/lib/supabase/auth";

export async function guardAdminRequest() {
  const role = await getCurrentRole();

  if (!canAccessAdmin(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
