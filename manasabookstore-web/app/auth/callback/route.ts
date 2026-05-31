import { NextResponse } from "next/server";

import { canAccessAdmin, getCurrentRole } from "@/lib/supabase/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next");
  const next = nextParam?.startsWith("/") ? nextParam : "/admin/dashboard";

  if (code) {
    const supabase = await createSupabaseServerClient();
    await supabase?.auth.exchangeCodeForSession(code);
  }

  const role = await getCurrentRole();

  if (!canAccessAdmin(role)) {
    return NextResponse.redirect(new URL("/admin?error=not-authorized", request.url));
  }

  return NextResponse.redirect(new URL(next, request.url));
}
