"use client";

import { RotateCcw, Settings } from "lucide-react";
import { useEffect, useState } from "react";

import {
  fetchAdminCommerceSettings,
  updateAdminCommerceSettings,
} from "@/lib/admin-settings-api";
import { CommerceSettings, defaultCommerceSettings } from "@/lib/commerce";
import { site } from "@/lib/site-data";
import { AdminPageHeader } from "./AdminPageHeader";
import { useAdminStore } from "./AdminStore";

export function AdminSettings() {
  const { resetDemoData } = useAdminStore();
  const [settings, setSettings] = useState<CommerceSettings>(
    defaultCommerceSettings,
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const nextSettings = await fetchAdminCommerceSettings();
      if (nextSettings) {
        setSettings(nextSettings);
      }
    }

    void loadSettings();
  }, []);

  async function updateSetting(key: keyof CommerceSettings, value: boolean) {
    const nextSettings = { ...settings, [key]: value };
    setSettings(nextSettings);
    setSaving(true);
    const saved = await updateAdminCommerceSettings(nextSettings);
    if (saved) {
      setSettings(saved);
    }
    setSaving(false);
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Settings"
        title="Local admin settings."
        description="Review store identity and reset demo data while the admin MVP stays frontend-only."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <Settings className="h-7 w-7 text-[#d86b13]" />
          <h2 className="mt-5 text-xl font-black">Store profile</h2>
          <div className="mt-5 grid gap-3 text-sm">
            <p>
              <span className="font-black">Name:</span> {site.name}
            </p>
            <p>
              <span className="font-black">Phone:</span> {site.phone}
            </p>
            <p>
              <span className="font-black">Address:</span> {site.address}
            </p>
          </div>
        </section>

        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Ecommerce controls</h2>
          <p className="mt-3 text-sm font-semibold leading-6 text-[#071f33]/62">
            Customer checkout features only appear when enabled here.
          </p>
          <div className="mt-5 grid gap-3">
            <Toggle
              label="Online ordering"
              checked={settings.onlineOrderingEnabled}
              onChange={(value) => updateSetting("onlineOrderingEnabled", value)}
            />
            <Toggle
              label="Pickup"
              checked={settings.pickupEnabled}
              onChange={(value) => updateSetting("pickupEnabled", value)}
            />
            <Toggle
              label="Delivery"
              checked={settings.deliveryEnabled}
              onChange={(value) => updateSetting("deliveryEnabled", value)}
            />
            <div className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-bold text-[#071f33]/64">
              Razorpay is {settings.razorpayEnabled ? "configured" : "not configured"}.
            </div>
          </div>
          {saving ? (
            <p className="mt-3 text-sm font-bold text-[#0b6b4a]">Saving...</p>
          ) : null}
        </section>

        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Demo data</h2>
          <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#071f33]/62">
            Inventory and sales are stored in localStorage for this browser.
            Resetting restores the seeded products and sample sales.
          </p>
          <button
            type="button"
            onClick={resetDemoData}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Reset local demo data
          </button>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-4 rounded-[8px] bg-[#f7faf9] p-4 text-sm font-black">
      {label}
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-5 w-5 accent-[#0b6b4a]"
      />
    </label>
  );
}
