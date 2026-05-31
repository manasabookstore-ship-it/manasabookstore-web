import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { AdminReports } from "@/components/admin/AdminReports";

export const metadata: Metadata = {
  title: "Reports | Manasa Book Center Admin",
};

export default function AdminReportsPage() {
  return (
    <AdminGate>
      <AdminReports />
    </AdminGate>
  );
}

