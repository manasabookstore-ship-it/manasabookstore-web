import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { AdminOrders } from "@/components/admin/AdminOrders";

export const metadata: Metadata = {
  title: "Requests | Manasa Book Center Admin",
};

export default function AdminOrdersPage() {
  return (
    <AdminGate>
      <AdminOrders />
    </AdminGate>
  );
}
