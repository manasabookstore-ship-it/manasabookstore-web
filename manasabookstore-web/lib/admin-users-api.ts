import { AppRole } from "./supabase/auth";

export type AdminUserSummary = {
  total: number;
  customers: number;
  staff: number;
  admins: number;
  owners: number;
};

export type AdminUser = {
  id: string;
  email: string | null;
  fullName: string | null;
  phone: string | null;
  role: AppRole;
  createdAt: string;
};

export type AdminUsersResponse = {
  summary: AdminUserSummary;
  users: AdminUser[];
};

export async function fetchAdminUsers(): Promise<AdminUsersResponse | null> {
  const response = await fetch("/api/admin/users", { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as AdminUsersResponse;
}
