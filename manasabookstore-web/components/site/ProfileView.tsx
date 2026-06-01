"use client";

import { FormEvent, useState } from "react";
import { UserRound } from "lucide-react";

import { CustomerProfile } from "@/lib/commerce";

const profileKey = "manasa-customer-profile";

function readProfile(): CustomerProfile {
  if (typeof window === "undefined") {
    return { name: "", phone: "", email: "", address: "" };
  }

  try {
    return JSON.parse(window.localStorage.getItem(profileKey) ?? "{}");
  } catch {
    return { name: "", phone: "", email: "", address: "" };
  }
}

export function ProfileView() {
  const [profile, setProfile] = useState<CustomerProfile>(readProfile);
  const [saved, setSaved] = useState(false);

  function updateField(field: keyof CustomerProfile, value: string) {
    setProfile((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.localStorage.setItem(profileKey, JSON.stringify(profile));
    setSaved(true);
  }

  return (
    <main className="mx-auto max-w-[900px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="rounded-[8px] bg-[#071f33] p-6 text-white shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <UserRound className="h-8 w-8 text-[#ffd493]" />
          <div>
            <p className="text-sm font-black text-[#ffd493]">Customer profile</p>
            <h1 className="text-4xl font-black">Saved checkout details</h1>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-4 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm sm:grid-cols-2"
      >
        {(["name", "phone", "email", "address"] as const).map((field) => (
          <label key={field} className="grid gap-2 text-sm font-black">
            {field}
            <input
              value={profile[field] ?? ""}
              onChange={(event) => updateField(field, event.target.value)}
              className="h-12 rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none"
            />
          </label>
        ))}
        {saved ? (
          <p className="rounded-[8px] bg-emerald-50 p-3 text-sm font-bold text-emerald-800 sm:col-span-2">
            Profile saved on this device.
          </p>
        ) : null}
        <button
          type="submit"
          className="h-12 rounded-[8px] bg-[#071f33] text-sm font-black text-white sm:col-span-2"
        >
          Save profile
        </button>
      </form>
    </main>
  );
}
