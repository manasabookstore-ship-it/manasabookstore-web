"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  ReceiptText,
  Settings,
} from "lucide-react";

import { AdminStoreProvider } from "./AdminStore";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/inventory/add", label: "Add product", icon: PlusCircle },
  { href: "/admin/orders", label: "Requests", icon: ClipboardList },
  { href: "/admin/sales", label: "Sales", icon: ReceiptText },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

type AdminShellProps = {
  children: React.ReactNode;
  profile: {
    email?: string | null;
    fullName?: string | null;
    role: string;
  };
};

export function AdminShell({ children, profile }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/auth/signout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <AdminStoreProvider>
      <main className="min-h-dvh bg-[#eef2f1] text-[#071f33]">
        <div className="grid min-h-dvh lg:grid-cols-[280px_1fr]">
          <aside className="border-b border-[#071f33]/10 bg-[#071f33] text-white lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between gap-4 px-5 py-4 lg:block lg:px-6 lg:py-7">
              <Link href="/admin/dashboard" aria-label="Admin dashboard">
                <Image
                  src="/manasa-logo.svg"
                  alt="Manasa Book Center"
                  width={205}
                  height={64}
                  className="h-12 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-white/10 px-3 text-sm font-black text-white transition hover:bg-white/16 lg:hidden"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            <nav className="flex gap-2 overflow-x-auto px-5 pb-4 lg:grid lg:gap-2 lg:px-4 lg:pb-0">
              {adminNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex h-11 shrink-0 items-center gap-3 rounded-[8px] px-4 text-sm font-black transition ${
                      active
                        ? "bg-[#ffd493] text-[#071f33]"
                        : "text-white/72 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto hidden px-4 py-6 lg:block">
              <button
                type="button"
                onClick={logout}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-white/10 px-4 text-sm font-black text-white transition hover:bg-white/16"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
              <div className="mt-6 hidden rounded-[8px] bg-white/8 p-4 lg:block">
                <p className="text-xs font-black uppercase tracking-wide text-[#ffd493]">
                  Signed in
                </p>
                <p className="mt-2 truncate text-sm font-black">
                  {profile.fullName ?? profile.email ?? "Store user"}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/44">
                  {profile.role}
                </p>
              </div>
              <p className="mt-4 text-xs font-semibold leading-5 text-white/44">
                Admin data is connected to Supabase with role-based access.
              </p>
            </div>
          </aside>

          <section className="min-w-0 p-5 sm:p-7 lg:p-9">{children}</section>
        </div>
      </main>
    </AdminStoreProvider>
  );
}
