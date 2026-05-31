import { NextResponse } from "next/server";

import { canAccessAdmin, getCurrentRole } from "@/lib/supabase/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextParam = String(formData.get("next") ?? "/admin/dashboard");
  const next = nextParam.startsWith("/") ? nextParam : "/admin/dashboard";

  if (!email || !password) {
    return NextResponse.redirect(
      new URL("/admin?error=email-required", request.url),
    );
  }

  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.redirect(
      new URL("/admin?error=supabase-env", request.url),
    );
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.redirect(
      new URL("/admin?error=email-login", request.url),
    );
  }

  const role = await getCurrentRole();

  if (!canAccessAdmin(role)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      new URL("/admin?error=not-authorized", request.url),
    );
  }

  return NextResponse.redirect(new URL(next, request.url));
}
