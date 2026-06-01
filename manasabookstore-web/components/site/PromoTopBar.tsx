import Link from "next/link";
import { Clock3, MapPin, MessageCircle, PackageSearch } from "lucide-react";

import { site } from "@/lib/site-data";

export function PromoTopBar() {
  return (
    <div className="bg-[#051b15] text-[#f5ead7]">
      <div className="mx-auto flex max-w-[1500px] items-center justify-center gap-4 px-4 py-2.5 text-[11px] font-bold sm:justify-between sm:px-6 lg:px-8">
        <span className="hidden items-center gap-2 sm:inline-flex">
          <MapPin className="h-3.5 w-3.5 text-[#c49345]" />
          Chimakurthy, Andhra Pradesh
        </span>
        <span className="hidden items-center gap-2 md:inline-flex">
          <Clock3 className="h-3.5 w-3.5 text-[#c49345]" />
          Store Timing: 9:00 AM - 8:30 PM
        </span>
        <div className="flex items-center gap-4">
          <Link href="/request" className="inline-flex items-center gap-2">
            <PackageSearch className="h-3.5 w-3.5 text-[#c49345]" />
            Request Anything
          </Link>
          <a href={site.whatsapp} className="inline-flex items-center gap-2">
            <MessageCircle className="h-3.5 w-3.5 text-[#c49345]" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
