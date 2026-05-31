import type { Metadata } from "next";

import { CheckoutView } from "@/components/site/CheckoutView";

export const metadata: Metadata = {
  title: "Checkout | Manasa Book Center",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
