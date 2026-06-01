"use client";

import { usePathname } from "next/navigation";
import { MapPin, MessageCircle, Search } from "lucide-react";

import { Footer } from "./Footer";
import { Header } from "./Header";
import { PromoTopBar } from "./PromoTopBar";
import { CartProvider } from "./CartProvider";
import { site } from "@/lib/site-data";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <CartProvider>
      <PromoTopBar />
      <Header />
      <div>{children}</div>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#071f33]/10 bg-white/95 px-3 py-2 shadow-2xl backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={site.whatsapp}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#10a36f] text-xs font-black text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] text-xs font-black text-white"
          >
            <Search className="h-4 w-4" />
            Search
          </a>
          <a
            href={site.directions}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#f5ead7] text-xs font-black text-[#071f33]"
          >
            <MapPin className="h-4 w-4" />
            Visit
          </a>
        </div>
      </div>
      <Footer />
    </CartProvider>
  );
}
