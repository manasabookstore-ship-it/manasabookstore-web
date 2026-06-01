import Link from "next/link";
import { ArrowRight, Copy, TicketPercent } from "lucide-react";

import type { Coupon } from "@/lib/site-data";

export function CouponStrip({ coupons }: { coupons: Coupon[] }) {
  if (coupons.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#fff3da] text-[#d86b13]">
            <TicketPercent className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-black text-[#071f33]">
              Coupons customers can mention in store
            </p>
            <p className="text-xs font-semibold text-[#071f33]/58">
              Reference codes for bundles, school lists and gifts.
            </p>
          </div>
        </div>
        <Link
          href="/offers"
          className="inline-flex items-center gap-2 text-sm font-black text-[#0b6b4a]"
        >
          View all offers
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {coupons.slice(0, 3).map((coupon) => (
          <div
            key={coupon.code}
            className="flex items-center justify-between gap-3 rounded-[8px] border border-dashed border-[#0b6b4a]/35 bg-[#eaf4ef] px-4 py-3"
          >
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-[#0b6b4a]/70">
                {coupon.title}
              </p>
              <code className="mt-1 block text-base font-black text-[#0b6b4a]">
                {coupon.code}
              </code>
            </div>
            <Copy className="h-4 w-4 shrink-0 text-[#0b6b4a]" />
          </div>
        ))}
      </div>
    </section>
  );
}
