import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { StaffRegisterForm } from "@/components/admin/StaffRegisterForm";

export const metadata: Metadata = {
  title: "Register Staff | Manasa Book Center",
};

export default function AdminRegisterPage() {
  return (
    <AdminGate>
      <StaffRegisterForm />
    </AdminGate>
  );
}
