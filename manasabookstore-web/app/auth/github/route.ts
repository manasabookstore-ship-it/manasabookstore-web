import { NextResponse } from "next/server";

import { getSiteUrl } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const requestUrl = new URL(request.url);
  const nextParam = requestUrl.searchParams.get("next");
  const next = nextParam?.startsWith("/") ? nextParam : "/admin/dashboard";

  if (!supabase) {
    return NextResponse.redirect(new URL("/admin?error=supabase-env", request.url));
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${getSiteUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(new URL("/admin?error=github-oauth", request.url));
  }

  return NextResponse.redirect(data.url);
}
