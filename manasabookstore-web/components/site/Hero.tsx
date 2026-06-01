import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { site } from "@/lib/site-data";
import { LuxuryButton } from "./LuxuryButton";

export function Hero() {
  return (
    <section className="overflow-hidden bg-[#fbf7ef]">
      <div className="mx-auto grid max-w-[1500px] min-w-0 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8 lg:py-14">
        <div className="min-w-0 max-w-[22rem] sm:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a12]">
            More than just a bookstore
          </p>
          <h1 className="mt-5 font-serif text-[clamp(3.15rem,15vw,7.4rem)] font-semibold leading-[0.9] tracking-[-0.035em] text-[#071f33] sm:tracking-[-0.045em]">
            Manasa
            <span className="block">
              Book <span className="block sm:inline">Store</span>
            </span>
          </h1>
          <div className="mt-6 h-px w-16 bg-[#c49345]" />
          <p className="mt-7 max-w-lg text-base leading-8 text-[#071f33]/72">
            Books, stationery, school supplies, project materials, gifts, daily
            essentials and personal care. Handpicked for quality. Chosen for
            you.
          </p>
          <div className="mt-8 flex min-w-0 flex-col gap-3 sm:flex-row">
            <LuxuryButton href="/products" className="w-full sm:w-auto">Explore Store</LuxuryButton>
            <LuxuryButton href="/request" variant="secondary" className="w-full sm:w-auto">
              Request Item
            </LuxuryButton>
            <LuxuryButton
              href={site.whatsapp}
              variant="secondary"
              icon={<MessageCircle className="h-4 w-4" />}
              external
              className="w-full sm:w-auto"
            >
              WhatsApp Store
            </LuxuryButton>
          </div>
        </div>
        <div className="relative min-h-[360px] w-full max-w-[22rem] min-w-0 overflow-hidden rounded-[8px] bg-[#efe4d3] shadow-sm sm:max-w-none sm:min-h-[430px]">
          <Image
            src="/generated/manasa-hero-still-life.png"
            alt="Premium books, stationery, gifts and essentials arranged for Manasa Book Store"
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
