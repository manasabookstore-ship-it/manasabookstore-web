import { AppRole } from "./supabase/auth";

export type StaffCreatePayload = {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: Extract<AppRole, "staff" | "admin">;
};

export type StaffCreateResult =
  | {
      ok: false;
      error: string;
    }
  | {
      ok: true;
      profile: {
        id: string;
        email: string | null;
        full_name: string | null;
        role: AppRole;
      };
    };

export async function createStaffAccount(
  payload: StaffCreatePayload,
): Promise<StaffCreateResult> {
  const response = await fetch("/api/admin/staff", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    return {
      ok: false,
      error: data?.error ?? "Staff account could not be created.",
    };
  }

  return {
    ok: true,
    profile: (await response.json()) as {
      id: string;
      email: string | null;
      full_name: string | null;
      role: AppRole;
    },
  };
}
