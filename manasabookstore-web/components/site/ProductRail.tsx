import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Product } from "@/lib/site-data";
import { CompactProductCard } from "./CompactProductCard";

type ProductRailProps = {
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
};

export function ProductRail({ eyebrow, title, href, products }: ProductRailProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-[#d86b13]">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-black text-[#071f33]">{title}</h2>
        </div>
        <Link
          href={href}
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-xs font-black text-white"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-5 flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <CompactProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
