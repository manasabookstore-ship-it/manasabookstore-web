import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { InventoryTable } from "@/components/admin/InventoryTable";

export const metadata: Metadata = {
  title: "Inventory | Manasa Book Center Admin",
};

export default function AdminInventoryPage() {
  return (
    <AdminGate>
      <InventoryTable />
    </AdminGate>
  );
}

