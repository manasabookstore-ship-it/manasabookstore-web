import Link from "next/link";
import { LockKeyhole } from "lucide-react";

import { canAccessAdmin, getCurrentProfile } from "@/lib/supabase/auth";
import { AdminShell } from "./AdminShell";

export async function AdminGate({ children }: { children: React.ReactNode }) {
  const profile = await getCurrentProfile();
  const isAllowed = canAccessAdmin(profile?.role ?? null);

  if (!isAllowed) {
    return (
      <main className="grid min-h-dvh place-items-center bg-[#eef2f1] p-5">
        <div className="w-full max-w-md rounded-[8px] border border-[#071f33]/10 bg-white p-6 text-center shadow-sm">
          <LockKeyhole className="mx-auto h-9 w-9 text-[#d86b13]" />
          <h1 className="mt-5 text-2xl font-black">Admin login required</h1>
          <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
            Sign in to access inventory, sales and reports.
          </p>
          {profile ? (
            <p className="mt-3 rounded-[8px] bg-amber-50 px-4 py-3 text-sm font-bold text-amber-800">
              Signed in as {profile.email ?? "GitHub user"}, but this profile is
              not a store staff role yet.
            </p>
          ) : null}
          <Link
            href="/admin"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-[8px] bg-[#071f33] px-5 text-sm font-black text-white"
          >
            Go to login
          </Link>
        </div>
      </main>
    );
  }

  return (
    <AdminShell
      profile={{
        email: profile?.email,
        fullName: profile?.full_name,
        role: profile?.role ?? "staff",
      }}
    >
      {children}
    </AdminShell>
  );
}
