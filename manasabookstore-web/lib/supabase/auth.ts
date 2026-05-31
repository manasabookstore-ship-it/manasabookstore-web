import { createSupabaseServerClient } from "./server";
import { Database } from "./database.types";

export type AppRole = "customer" | "staff" | "admin" | "owner";
type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];

const adminRoles: AppRole[] = ["staff", "admin", "owner"];

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return data as ProfileRow | null;
}

export async function getCurrentRole(): Promise<AppRole | null> {
  const profile = await getCurrentProfile();
  return profile?.role ?? null;
}

export function canAccessAdmin(role: AppRole | null) {
  return role ? adminRoles.includes(role) : false;
}
