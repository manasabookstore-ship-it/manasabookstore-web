import { NextResponse } from "next/server";

import { canManageStaff, getCurrentRole } from "@/lib/supabase/auth";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

type StaffPayload = {
  email?: string;
  password?: string;
  fullName?: string;
  phone?: string;
  role?: "staff" | "admin";
};

export async function POST(request: Request) {
  const role = await getCurrentRole();

  if (!canManageStaff(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as StaffPayload;
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const fullName = body.fullName?.trim() ?? "";
  const staffRole = body.role === "admin" ? "admin" : "staff";

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: "Name, email and password are required." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role is not configured." },
      { status: 500 },
    );
  }

  const { data: createdUser, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
      },
    });

  if (createError || !createdUser.user) {
    return NextResponse.json(
      { error: createError?.message ?? "User could not be created." },
      { status: 400 },
    );
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .upsert(
      {
        id: createdUser.user.id,
        email,
        full_name: fullName,
        phone: body.phone?.trim() || null,
        role: staffRole,
      },
      { onConflict: "id" },
    )
    .select("id, email, full_name, role")
    .single();

  if (profileError || !profile) {
    return NextResponse.json(
      { error: "Profile role could not be assigned." },
      { status: 500 },
    );
  }

  return NextResponse.json(profile);
}
