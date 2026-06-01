import Link from "next/link";
import { Sparkles } from "lucide-react";

import type { Product } from "@/lib/site-data";
import { AddToCartButton } from "./AddToCartButton";
import { AvailabilityBadge } from "./AvailabilityBadge";

export function CompactProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full min-w-[240px] flex-col overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <Link href={`/product/${product.slug}`} className="block bg-[#f5ead7] p-3">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[8px] bg-white">
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
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3">
          <AvailabilityBadge availability={product.availability} />
        </div>
        <p className="text-xs font-black uppercase tracking-wide text-[#d86b13]">
          {product.category}
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-2 line-clamp-2 text-base font-black leading-snug text-[#071f33]"
        >
          {product.name}
        </Link>
        <p className="mt-3 text-lg font-black text-[#0b6b4a]">
          {product.price}
        </p>
        {product.offer ? (
          <p className="mt-3 rounded-[8px] bg-[#fff3da] px-3 py-2 text-xs font-black text-[#9a4c00]">
            {product.offer}
          </p>
        ) : null}
        <div className="mt-auto pt-4">
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
