import type { Metadata } from "next";

import { OrderHistoryView } from "@/components/site/OrderHistoryView";

export const metadata: Metadata = {
  title: "Order History | Manasa Book Center",
};

export default function OrdersPage() {
  return <OrderHistoryView />;
}
