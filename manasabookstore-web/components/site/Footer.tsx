import Link from "next/link";
import { Clock3, MapPin, MessageCircle, Phone } from "lucide-react";

import { site } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="bg-[#051b15] pb-20 text-[#f5ead7] md:pb-0">
      <div className="mx-auto grid max-w-[1500px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.25fr_0.7fr_0.7fr_1fr] lg:px-8">
        <div className="max-w-sm">
          <Link href="/" className="inline-flex items-center gap-4" aria-label="Manasa Book Store">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#c49345]/70 font-serif text-2xl text-[#f3d08d]">
              M
            </span>
            <span>
              <span className="block font-serif text-2xl uppercase tracking-[0.22em] text-white">
                Manasa
              </span>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#c49345]">
                Book Store
              </span>
            </span>
          </Link>
          <p className="mt-5 text-sm leading-7 text-white/62">
            Your trusted center for books, stationery, school supplies, project
            materials, gifts and daily essentials.
          </p>
        </div>

        <FooterColumn
          title="Quick Links"
          links={[
            ["/categories", "Categories"],
            ["/products", "Products"],
            ["/offers", "Offers"],
            ["/request", "Request Item"],
          ]}
        />

        <FooterColumn
          title="Customer"
          links={[
            ["/orders", "My Orders"],
            ["/request", "Track Request"],
            ["/contact", "Help"],
          ]}
        />

        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#c49345]">
            Store Info
          </h2>
          <div className="mt-4 grid gap-3 text-sm font-semibold text-white/62">
            <span className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c49345]" />
              Kurnool Main Road, Chimakurthy
            </span>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 transition hover:text-white"
            >
              <Phone className="h-4 w-4 text-[#c49345]" />
              {site.phone}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#c49345]" />
              9:00 AM - 8:30 PM
            </span>
          </div>
          <a
            href={site.whatsapp}
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-[8px] border border-[#c49345]/50 px-4 text-sm font-black text-[#ffd493] transition hover:bg-[#c49345] hover:text-[#051b15]"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-xs font-semibold text-white/42">
        © 2026 Manasa Book Store. All rights reserved.
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[#c49345]">
        {title}
      </h2>
      <div className="mt-4 grid gap-3 text-sm font-semibold text-white/62">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className="transition hover:text-white">
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
