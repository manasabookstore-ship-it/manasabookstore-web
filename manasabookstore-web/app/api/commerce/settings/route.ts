import { NextResponse } from "next/server";

import { getCommerceSettingsFromSupabase } from "@/lib/supabase/commerce-data";

export async function GET() {
  return NextResponse.json(await getCommerceSettingsFromSupabase());
}

