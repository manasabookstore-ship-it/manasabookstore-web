import Link from "next/link";
import { ArrowRight } from "lucide-react";

const offers = [
  {
    title: "Back To School Offer",
    text: "Store offers on selected school essentials",
    tone: "bg-[#08251d] text-white",
  },
  {
    title: "Project Kit Combo",
    text: "Curated kits for practical work and project needs",
    tone: "bg-[#efe1cc] text-[#071f33]",
  },
  {
    title: "Gift Combo Offer",
    text: "Thoughtful gift bundles selected by the store",
    tone: "bg-[#e4cfad] text-[#071f33]",
  },
];

export function LuxuryOfferBand() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <h2 className="font-serif text-xl font-semibold uppercase tracking-[0.14em] text-[#071f33] sm:text-2xl sm:tracking-[0.2em]">
          Exclusive Offers
        </h2>
        <Link
          href="/offers"
          className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a12] sm:inline-flex"
        >
          View all offers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {offers.map((offer) => (
          <Link
            key={offer.title}
            href="/offers"
            className={`relative min-h-40 overflow-hidden rounded-[8px] p-6 shadow-sm ${offer.tone}`}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full border border-current/15" />
            <p className="font-serif text-2xl font-semibold uppercase tracking-[0.08em]">
              {offer.title}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 opacity-75">{offer.text}</p>
            <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em]">
              Shop now
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
