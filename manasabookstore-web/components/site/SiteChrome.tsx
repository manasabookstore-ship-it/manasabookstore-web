"use client";

import { usePathname } from "next/navigation";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { CartProvider } from "./CartProvider";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </CartProvider>
  );
}
