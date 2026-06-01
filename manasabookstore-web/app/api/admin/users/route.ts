import { NextResponse } from "next/server";

import { canManageStaff, getCurrentRole } from "@/lib/supabase/auth";
import { createSupabaseServiceClient } from "@/lib/supabase/server";

export async function GET() {
  const role = await getCurrentRole();

  if (!canManageStaff(role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase service role is not configured." },
      { status: 500 },
    );
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, full_name, phone, role, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Users could not be loaded." },
      { status: 500 },
    );
  }

  const users = (data ?? []).map((user) => ({
    id: user.id,
    email: user.email,
    fullName: user.full_name,
    phone: user.phone,
    role: user.role,
    createdAt: user.created_at,
  }));

  return NextResponse.json({
    summary: {
      total: users.length,
      customers: users.filter((user) => user.role === "customer").length,
      staff: users.filter((user) => user.role === "staff").length,
      admins: users.filter((user) => user.role === "admin").length,
      owners: users.filter((user) => user.role === "owner").length,
    },
    users,
  });
}
