import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BookOpen,
  CalendarDays,
  Gift,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import { CouponCard } from "@/components/site/CouponCard";
import { CouponStrip } from "@/components/site/CouponStrip";
import { DealCard } from "@/components/site/DealCard";
import { OfferCard } from "@/components/site/OfferCard";
import { RetailPageHeader } from "@/components/site/RetailPageHeader";
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
  const dealCards = [
    {
      eyebrow: "Back To School",
      title: "School lists and stationery combos",
      description: "Notebook packs, covers, labels, pens and school basics.",
      href: "/request?category=school-essentials",
      cta: "Request school list",
      tone: "navy" as const,
      icon: BookOpen,
    },
    {
      eyebrow: "Project Week",
      title: "Project materials in one shelf",
      description: "Charts, boards, glue, cutters and model supplies.",
      href: "/category/project-materials",
      cta: "Browse project deals",
      tone: "green" as const,
      icon: PackageCheck,
    },
    {
      eyebrow: "Festival Picks",
      title: "Gift wrap, cards and chocolates",
      description: "Simple gifting choices customers can request or pick up.",
      href: "/category/gifts-chocolates",
      cta: "Shop gifting",
      tone: "gold" as const,
      icon: Gift,
    },
  ];

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <RetailPageHeader
        eyebrow="Offers"
        title="Store combos, coupons and seasonal picks."
        description="Value-focused shelves for school reopening, projects, gifting and everyday buying. Customers can reference these while requesting or visiting."
        icon={<BadgePercent className="h-6 w-6" />}
        actions={
          <Link
            href="/request"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#ffd493] px-5 text-sm font-black text-[#071f33]"
          >
            Request a combo
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { icon: CalendarDays, label: "Seasonal" },
            { icon: Sparkles, label: "School" },
            { icon: BadgePercent, label: "Festival" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-[8px] bg-white p-4 shadow-sm">
                <Icon className="h-6 w-6 text-[#0b6b4a]" />
                <p className="mt-4 text-sm font-black">{item.label}</p>
              </div>
            );
          })}
        </div>
      </RetailPageHeader>

      <section className="mt-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#d86b13]">
              Deal Zone
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
              Featured store shelves customers can act on now.
            </h2>
          </div>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {dealCards.map((deal) => (
            <DealCard key={deal.title} {...deal} />
          ))}
        </div>
      </section>

      <div className="mt-6">
        <CouponStrip coupons={coupons} />
      </div>

      {hasCoupons ? (
        <section className="mt-12">
          <SectionHeading
            eyebrow="Coupon Wall"
            title="Reference codes for store conversations."
            description="Customers can mention these while asking for school kits, project bundles or festival picks."
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
