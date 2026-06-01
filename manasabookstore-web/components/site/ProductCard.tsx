import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import type { Product } from "@/lib/site-data";
import { AddToCartButton } from "./AddToCartButton";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#0b6b4a]/30 hover:shadow-xl">
      <div className="bg-[#fbf7ef] p-4">
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white">
          {product.imageUrl ? (
            <div
              role="img"
              aria-label={product.name}
              className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0b6b4a]/10 text-[#0b6b4a]">
              <Sparkles className="h-8 w-8" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <AvailabilityBadge availability={product.availability} />
          {product.featured ? (
            <span className="rounded-full bg-[#071f33] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
              Featured
            </span>
          ) : null}
        </div>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-[#d86b13]">
              {product.category}
            </p>
            <h3 className="mt-2 text-lg font-black leading-snug text-[#071f33]">
              {product.name}
            </h3>
          </div>
          <p className="shrink-0 rounded-[8px] bg-[#eaf4ef] px-3 py-1 text-sm font-black text-[#0b6b4a]">
            {product.price}
          </p>
        </div>
        <p className="mt-3 text-sm leading-6 text-[#071f33]/64">
          {product.description}
        </p>
        {product.offer ? (
          <p className="mt-4 rounded-[8px] bg-[#fff3da] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#9a4c00]">
            {product.offer}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#071f33]/5 px-3 py-1 text-xs font-bold text-[#071f33]/65"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          href={`/product/${product.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0b6b4a]"
        >
          View details
          <ArrowRight className="h-4 w-4" />
        </Link>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
