import { BadgePercent, CalendarDays, Sparkles } from "lucide-react";

import type { StoreOffer } from "@/lib/site-data";

const typeStyle = {
  seasonal: "bg-[#fff3da] text-[#9a4c00]",
  school: "bg-[#eaf4ef] text-[#0b6b4a]",
  festival: "bg-[#fff1f2] text-[#be123c]",
  combo: "bg-[#eaf0ff] text-[#163d7a]",
};

export function OfferCard({ offer }: { offer: StoreOffer }) {
  return (
    <article className="group flex h-full flex-col rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-[#071f33] text-white">
          <BadgePercent className="h-6 w-6" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${typeStyle[offer.type]}`}
        >
          {offer.type}
        </span>
      </div>

      <p className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#d86b13]">
        <Sparkles className="h-4 w-4" />
        {offer.highlight}
      </p>
      <h3 className="mt-2 text-2xl font-black leading-tight text-[#071f33]">
        {offer.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[#071f33]/64">
        {offer.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {offer.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-[#071f33]/5 px-3 py-1 text-xs font-bold text-[#071f33]/65"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-[8px] bg-[#fbf7ef] px-3 py-2 text-sm font-black text-[#071f33]/70">
        <CalendarDays className="h-4 w-4 text-[#0b6b4a]" />
        {offer.validUntil}
      </div>
    </article>
  );
}
