import type { Metadata } from "next";

import { AdminGate } from "@/components/admin/AdminGate";
import { ProductAddForm } from "@/components/admin/ProductAddForm";

export const metadata: Metadata = {
  title: "Add Product | Manasa Book Center Admin",
};

export default function AdminInventoryAddPage() {
  return (
    <AdminGate>
      <ProductAddForm />
    </AdminGate>
  );
}

