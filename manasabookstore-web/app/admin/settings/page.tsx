import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { AdminSettings } from "@/components/admin/AdminSettings";

export const metadata: Metadata = {
  title: "Settings | Manasa Book Center Admin",
};

export default function AdminSettingsPage() {
  return (
    <AdminGate>
      <AdminSettings />
    </AdminGate>
  );
}
