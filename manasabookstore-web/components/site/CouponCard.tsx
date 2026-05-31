import { Copy, TicketPercent } from "lucide-react";

import type { Coupon } from "@/lib/site-data";

export function CouponCard({ coupon }: { coupon: Coupon }) {
  return (
    <article className="overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm">
      <div className="border-b border-dashed border-[#071f33]/18 bg-[#071f33] p-5 text-white">
        <TicketPercent className="h-7 w-7 text-[#ffd493]" />
        <p className="mt-4 text-xs font-black uppercase tracking-wide text-[#ffd493]">
          Coupon
        </p>
        <h3 className="mt-2 text-xl font-black">{coupon.title}</h3>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between gap-3 rounded-[8px] border border-dashed border-[#0b6b4a]/35 bg-[#eaf4ef] px-4 py-3">
          <code className="text-base font-black text-[#0b6b4a]">
            {coupon.code}
          </code>
          <Copy className="h-4 w-4 text-[#0b6b4a]" />
        </div>
        <p className="mt-4 text-sm leading-6 text-[#071f33]/68">
          {coupon.description}
        </p>
        <p className="mt-4 rounded-[8px] bg-[#fbf7ef] p-3 text-xs font-semibold leading-5 text-[#071f33]/58">
          {coupon.terms}
        </p>
      </div>
    </article>
  );
}
