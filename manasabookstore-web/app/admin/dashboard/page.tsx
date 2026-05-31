import type { Metadata } from "next";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminGate } from "@/components/admin/AdminGate";

export const metadata: Metadata = {
  title: "Admin Dashboard | Manasa Book Center",
};

export default function AdminDashboardPage() {
  return (
    <AdminGate>
      <AdminDashboard />
    </AdminGate>
  );
}

