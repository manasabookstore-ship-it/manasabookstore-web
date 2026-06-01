"use client";

import Link from "next/link";
import { Search, UserPlus, UsersRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AdminUser, fetchAdminUsers } from "@/lib/admin-users-api";
import { AdminPageHeader } from "./AdminPageHeader";

function roleClass(role: AdminUser["role"]) {
  if (role === "owner") {
    return "bg-[#071f33] text-white";
  }

  if (role === "admin") {
    return "bg-[#eaf0ff] text-[#163d7a]";
  }

  if (role === "staff") {
    return "bg-[#eaf4ef] text-[#0b6b4a]";
  }

  return "bg-[#f7faf9] text-[#071f33]/64";
}

export function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchAdminUsers();

      if (data) {
        setUsers(data.users);
      }

      setLoading(false);
    }

    void loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) =>
      [user.fullName, user.email, user.phone, user.role]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [query, users]);

  const summary = useMemo(
    () => ({
      total: users.length,
      customers: users.filter((user) => user.role === "customer").length,
      staff: users.filter((user) => user.role === "staff").length,
      admins: users.filter((user) => user.role === "admin").length,
      owners: users.filter((user) => user.role === "owner").length,
    }),
    [users],
  );

  return (
    <div>
      <AdminPageHeader
        eyebrow="Users"
        title="Account and role overview."
        description="Review customer and store accounts created in Supabase. Staff creation is available to admins and owners."
        action={
          <Link
            href="/admin/register"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
          >
            <UserPlus className="h-4 w-4" />
            Add staff
          </Link>
        }
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {[
          ["Total users", summary.total],
          ["Customers", summary.customers],
          ["Staff", summary.staff],
          ["Admins", summary.admins],
          ["Owners", summary.owners],
        ].map(([label, value]) => (
          <article
            key={label}
            className="rounded-[8px] border border-[#071f33]/10 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-black uppercase tracking-wide text-[#071f33]/48">
              {label}
            </p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </article>
        ))}
      </div>

      <section className="mt-6 rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#071f33]/10 p-4">
          <Search className="h-5 w-5 text-[#071f33]/38" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, email, phone or role"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[#071f33]/36"
          />
        </div>

        {loading ? (
          <p className="p-5 text-sm font-bold text-[#071f33]/62">
            Loading users...
          </p>
        ) : null}

        {!loading && filteredUsers.length === 0 ? (
          <div className="p-5 text-center">
            <UsersRound className="mx-auto h-8 w-8 text-[#d86b13]" />
            <p className="mt-3 text-sm font-bold text-[#071f33]/62">
              No matching users found.
            </p>
          </div>
        ) : null}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#f7faf9] text-xs uppercase tracking-wide text-[#071f33]/58">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#071f33]/8">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-4">
                    <p className="font-black">
                      {user.fullName || "Unnamed user"}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-[#071f33]/54">
                      {user.email || user.id}
                    </p>
                  </td>
                  <td className="px-4 py-4 font-bold">
                    {user.phone || "-"}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-black uppercase ${roleClass(user.role)}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-semibold text-[#071f33]/62">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-3 p-4 md:hidden">
          {filteredUsers.map((user) => (
            <article
              key={user.id}
              className="rounded-[8px] border border-[#071f33]/10 bg-[#fbf7ef] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black">
                    {user.fullName || "Unnamed user"}
                  </p>
                  <p className="mt-1 break-all text-xs font-semibold text-[#071f33]/54">
                    {user.email || user.id}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-black uppercase ${roleClass(user.role)}`}
                >
                  {user.role}
                </span>
              </div>
              <p className="mt-3 text-xs font-bold text-[#071f33]/58">
                Phone: {user.phone || "-"}
              </p>
              <p className="mt-1 text-xs font-bold text-[#071f33]/58">
                Created: {new Date(user.createdAt).toLocaleString()}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
