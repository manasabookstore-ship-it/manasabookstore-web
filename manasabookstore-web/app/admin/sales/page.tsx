import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { SalesEntry } from "@/components/admin/SalesEntry";

export const metadata: Metadata = {
  title: "Sales | Manasa Book Center Admin",
};

export default function AdminSalesPage() {
  return (
    <AdminGate>
      <SalesEntry />
    </AdminGate>
  );
}

