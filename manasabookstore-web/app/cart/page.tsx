import type { Metadata } from "next";

import { CartView } from "@/components/site/CartView";

export const metadata: Metadata = {
  title: "Cart | Manasa Book Center",
};

export default function CartPage() {
  return <CartView />;
}

