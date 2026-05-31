import Link from "next/link";
import { Search, Sparkles } from "lucide-react";

import { PublicRequestedItem } from "@/lib/supabase/public-requests";

export function RequestedItemsBoard({
  items,
}: {
  items: PublicRequestedItem[];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="mt-8 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#fff3da] text-[#d86b13]">
          <Sparkles className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-black text-[#d86b13]">Requested By Customers</p>
          <h2 className="mt-1 text-2xl font-black">Items people are asking for</h2>
          <p className="mt-2 text-sm leading-6 text-[#071f33]/62">
            These are public, anonymized requests. You can request the same item
            and the store team will review availability.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {items.map((item) => {
          const params = new URLSearchParams({
            item: item.item,
          });

          if (item.categorySlug) {
            params.set("category", item.categorySlug);
          }

          return (
            <div
              key={`${item.item}-${item.category}`}
              className="grid gap-3 rounded-[8px] bg-[#f7faf9] p-4 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <p className="text-sm font-black">{item.item}</p>
                <p className="mt-1 text-xs font-semibold text-[#071f33]/54">
                  {item.category} · {item.count} request{item.count > 1 ? "s" : ""}
                </p>
              </div>
              <Link
                href={`/request?${params.toString()}`}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
              >
                <Search className="h-4 w-4" />
                Request this
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
