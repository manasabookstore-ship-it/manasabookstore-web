"use client";

import { FormEvent, useState } from "react";
import { UserPlus } from "lucide-react";

import { createStaffAccount } from "@/lib/staff-api";
import { AdminPageHeader } from "./AdminPageHeader";

export function StaffRegisterForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "staff" as "staff" | "admin",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);

    const result = await createStaffAccount(form);
    setSaving(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    setForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "staff",
    });
    setMessage("Staff account created. They can now sign in with email.");
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Staff"
        title="Register a store staff account."
        description="Create email/password access for staff without requiring GitHub. Only admins and owners can add staff."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid max-w-3xl gap-4 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm sm:grid-cols-2"
      >
        <label className="block text-sm font-black sm:col-span-2">
          Full name
          <input
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            required
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Email
          <input
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            type="email"
            required
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Phone
          <input
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Temporary password
          <input
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
            type="password"
            minLength={8}
            required
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Role
          <select
            value={form.role}
            onChange={(event) =>
              updateField("role", event.target.value as "staff" | "admin")
            }
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 bg-white px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          >
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        {error ? (
          <p className="rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="rounded-[8px] bg-[#f7faf9] px-4 py-3 text-sm font-bold text-[#071f33]/70 sm:col-span-2">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#0b6b4a] text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          <UserPlus className="h-4 w-4" />
          {saving ? "Creating account..." : "Create staff account"}
        </button>
      </form>
    </div>
  );
}
