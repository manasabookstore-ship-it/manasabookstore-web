import Image from "next/image";
import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import { categories, site } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-[#071f33] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
        <div>
          <Image
            src="/manasa-logo.svg"
            alt="Manasa Book Center"
            width={205}
            height={64}
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/68">
            A trusted local store for books, stationery, school essentials,
            project materials and student needs in Chimakurthy.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={site.whatsapp}
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#10a36f] px-4 text-sm font-black text-white"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-white px-4 text-sm font-black text-[#071f33]"
            >
              <Phone className="h-4 w-4" />
              Call
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-[#ffd493]">
            Shop
          </h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-white/70">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="transition hover:text-white"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-black uppercase tracking-wide text-[#ffd493]">
            Store
          </h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-white/70">
            <Link href="/about" className="transition hover:text-white">
              About
            </Link>
            <Link href="/request" className="transition hover:text-white">
              Request item
            </Link>
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
            <a
              href={site.directions}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <MapPin className="h-4 w-4" />
              {site.address}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs font-semibold text-white/48">
        (c) 2026 Manasa Book Center. Customer-facing website foundation.
      </div>
    </footer>
  );
}
