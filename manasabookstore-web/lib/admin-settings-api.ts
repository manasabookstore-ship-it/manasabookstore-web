import { CommerceSettings } from "./commerce";

export async function fetchAdminCommerceSettings() {
  const response = await fetch("/api/admin/settings", { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CommerceSettings;
}

export async function updateAdminCommerceSettings(
  settings: CommerceSettings,
) {
  const response = await fetch("/api/admin/settings", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(settings),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CommerceSettings;
}

