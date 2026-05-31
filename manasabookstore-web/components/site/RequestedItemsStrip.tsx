import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PublicRequestedItem } from "@/lib/supabase/public-requests";

export function RequestedItemsStrip({
  items,
}: {
  items: PublicRequestedItem[];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="mt-10 rounded-[8px] border border-[#071f33]/10 bg-[#071f33] p-5 text-white shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black text-[#ffd493]">
            Customer Request Board
          </p>
          <h2 className="mt-1 text-2xl font-black">
            Not in the catalog yet? Customers are already asking.
          </h2>
        </div>
        <Link
          href="/request"
          className="inline-flex h-10 items-center gap-2 rounded-[8px] bg-white px-4 text-sm font-black text-[#071f33]"
        >
          Request item
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
        {items.map((item) => {
          const params = new URLSearchParams({ item: item.item });

          if (item.categorySlug) {
            params.set("category", item.categorySlug);
          }

          return (
            <Link
              key={`${item.item}-${item.category}`}
              href={`/request?${params.toString()}`}
              className="min-w-[220px] rounded-[8px] bg-white/10 p-4 transition hover:bg-white/16"
            >
              <p className="line-clamp-2 text-sm font-black">{item.item}</p>
              <p className="mt-2 text-xs font-semibold text-white/58">
                {item.category} · {item.count} request
                {item.count > 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
