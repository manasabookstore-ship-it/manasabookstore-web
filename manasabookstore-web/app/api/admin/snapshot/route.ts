import { NextResponse } from "next/server";

import { getAdminSnapshotFromSupabase } from "@/lib/supabase/admin-data";
import { guardAdminRequest } from "../guard";

export async function GET() {
  const blocked = await guardAdminRequest();

  if (blocked) {
    return blocked;
  }

  const snapshot = await getAdminSnapshotFromSupabase();

  if (!snapshot) {
    return NextResponse.json(
      { error: "Supabase snapshot unavailable" },
      { status: 503 },
    );
  }

  return NextResponse.json(snapshot);
}
