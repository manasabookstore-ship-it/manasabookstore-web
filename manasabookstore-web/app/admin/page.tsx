import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminLogin } from "@/components/admin/AdminLogin";
import { canAccessAdmin, getCurrentRole } from "@/lib/supabase/auth";

export const metadata: Metadata = {
  title: "Admin Login | Manasa Book Center",
};

type AdminPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const role = await getCurrentRole();

  if (canAccessAdmin(role)) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  return <AdminLogin error={params.error} />;
}
