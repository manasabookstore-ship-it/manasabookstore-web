import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { AdminUsers } from "@/components/admin/AdminUsers";

export const metadata: Metadata = {
  title: "Admin Users | Manasa Book Center",
};

export default function AdminUsersPage() {
  return (
    <AdminGate>
      <AdminUsers />
    </AdminGate>
  );
}
