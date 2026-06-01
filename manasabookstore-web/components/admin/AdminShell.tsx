"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusCircle,
  ReceiptText,
  Settings,
  UserPlus,
  UsersRound,
  X,
} from "lucide-react";

import { AdminStoreProvider } from "./AdminStore";

const adminNav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventory", label: "Inventory", icon: Boxes },
  { href: "/admin/inventory/add", label: "Add product", icon: PlusCircle },
  { href: "/admin/orders", label: "Requests", icon: ClipboardList },
  { href: "/admin/sales", label: "Sales", icon: ReceiptText },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  {
    href: "/admin/register",
    label: "Staff",
    icon: UserPlus,
    managerOnly: true,
  },
  {
    href: "/admin/users",
    label: "Users",
    icon: UsersRound,
    managerOnly: true,
  },
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
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleNav = adminNav.filter(
    (item) =>
      !item.managerOnly || profile.role === "admin" || profile.role === "owner",
  );

  async function logout() {
    await fetch("/auth/signout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <AdminStoreProvider>
      <main className="min-h-dvh bg-[#fbf7ef] text-[#071f33]">
        <div className="lg:grid lg:min-h-dvh lg:grid-cols-[280px_1fr]">
          <header className="sticky top-0 z-40 border-b border-[#c49345]/18 bg-[#051b15] text-white shadow-lg lg:hidden">
            <div className="flex min-h-16 items-center justify-between gap-3 px-4 py-3">
              <Link
                href="/admin/dashboard"
                aria-label="Admin dashboard"
                onClick={() => setMenuOpen(false)}
                className="inline-flex min-w-0 items-center gap-3"
              >
                <AdminBrand compact />
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={logout}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10 text-white transition hover:bg-white/16"
                  aria-label="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setMenuOpen((current) => !current)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#c49345] text-[#051b15]"
                  aria-label="Toggle admin navigation"
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {menuOpen ? (
              <nav className="grid gap-2 border-t border-white/10 px-4 py-4">
                {visibleNav.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={`inline-flex h-11 items-center gap-3 rounded-[8px] px-4 text-sm font-black transition ${
                        active
                          ? "bg-[#ffd493] text-[#071f33]"
                          : "bg-white/8 text-white/78 hover:bg-white/12 hover:text-white"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="rounded-[8px] bg-white/8 p-3">
                  <p className="truncate text-xs font-black text-[#ffd493]">
                    {profile.fullName ?? profile.email ?? "Store user"}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/44">
                    {profile.role}
                  </p>
                </div>
              </nav>
            ) : null}
          </header>

          <aside className="hidden bg-[#051b15] text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:border-r lg:border-[#c49345]/10">
            <div className="px-6 py-7">
              <Link href="/admin/dashboard" aria-label="Admin dashboard" className="inline-flex">
                <AdminBrand />
              </Link>
            </div>

            <nav className="grid gap-2 px-4">
              {visibleNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex h-11 shrink-0 items-center gap-3 rounded-[8px] px-4 text-sm font-black transition ${
                      active
                        ? "bg-[#c49345] text-[#051b15]"
                        : "text-white/72 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
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
              <div className="mt-6 hidden rounded-[8px] border border-[#c49345]/15 bg-white/[0.06] p-4 lg:block">
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

          <section className="min-w-0 overflow-x-hidden p-4 sm:p-6 lg:p-9">
            <div className="mx-auto max-w-[1500px]">{children}</div>
          </section>
        </div>
      </main>
    </AdminStoreProvider>
  );
}

function AdminBrand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#c49345]/70 font-serif text-xl text-[#f3d08d]">
        M
      </span>
      <span className={compact ? "min-w-0" : ""}>
        <span className="block truncate font-serif text-xl uppercase leading-none tracking-[0.22em] text-white">
          Manasa
        </span>
        <span className="mt-1 block truncate text-[10px] font-black uppercase leading-none tracking-[0.26em] text-[#c49345]">
          Admin Studio
        </span>
      </span>
    </span>
  );
}
