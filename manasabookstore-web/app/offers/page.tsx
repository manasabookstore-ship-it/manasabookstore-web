import Link from "next/link";
import { ArrowRight, BadgePercent, CalendarDays, Sparkles } from "lucide-react";

import { CouponCard } from "@/components/site/CouponCard";
import { OfferCard } from "@/components/site/OfferCard";
import {
  coupons,
  festivalOffers,
  schoolReopeningOffers,
  seasonalOffers,
} from "@/lib/site-data";

export default function OffersPage() {
  const hasCoupons = coupons.length > 0;
  const hasSchoolOffers = schoolReopeningOffers.length > 0;
  const hasSeasonalOffers = seasonalOffers.length > 0;
  const hasFestivalOffers = festivalOffers.length > 0;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="overflow-hidden rounded-[8px] bg-[#071f33] text-white">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div>
            <BadgePercent className="h-10 w-10 text-[#ffd493]" />
            <p className="mt-5 text-sm font-black text-[#ffd493]">Offers</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Useful store promotions for student life.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
              Browse dummy customer-facing offers, coupons, school reopening
              promotions and festival picks. These are ready for future offer
              management, without adding admin today.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:self-end">
            {[
              { icon: CalendarDays, label: "Seasonal promotions" },
              { icon: Sparkles, label: "School reopening" },
              { icon: BadgePercent, label: "Festival offers" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="rounded-[8px] bg-white/10 p-4 ring-1 ring-white/12"
                >
                  <Icon className="h-6 w-6 text-[#ffd493]" />
                  <p className="mt-4 text-sm font-black">{item.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {hasCoupons ? (
        <section className="mt-10">
          <SectionHeading
            eyebrow="Coupons UI"
            title="Codes customers can reference in store."
            description="Coupon cards are static for now and can later connect to offer rules or Supabase."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.code} coupon={coupon} />
            ))}
          </div>
        </section>
      ) : null}

      {hasSchoolOffers ? (
        <section className="mt-12">
          <SectionHeading
            eyebrow="School Reopening Offers"
            title="Prepared for the rush of new academic needs."
            description="Highlight school kits, notebook packs and list-based buying during reopening season."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {schoolReopeningOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      ) : null}

      {hasSeasonalOffers ? (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Seasonal Promotions"
            title="Timely value picks for everyday store visits."
            description="Seasonal sections stay hidden automatically when there are no offers in the data."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {seasonalOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      ) : null}

      {hasFestivalOffers ? (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Festival Offers"
            title="Gift-ready picks for celebrations."
            description="Use this area for cards, chocolates, gift wrap and seasonal gifting promotions."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {festivalOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 rounded-[8px] bg-[#f5ead7] p-6 sm:p-8">
        <h2 className="text-3xl font-black">Need a custom store combo?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#071f33]/64">
          Customers can request school lists, project kits, hostel essentials or
          gifting bundles through the request flow.
        </p>
        <Link
          href="/request"
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#0b6b4a] px-4 text-sm font-black text-white"
        >
          Request a bundle
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </main>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-black text-[#d86b13]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-[#071f33]/68">
        {description}
      </p>
    </div>
  );
}
