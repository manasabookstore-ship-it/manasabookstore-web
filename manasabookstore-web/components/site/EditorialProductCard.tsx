import Link from "next/link";

import type { Product } from "@/lib/site-data";

function ProductArtwork({ product }: { product: Product }) {
  const name = product.name.toLowerCase();

  if (name.includes("pen")) {
    return (
      <div className="relative h-44 w-56 -rotate-12">
        <div className="absolute left-4 top-20 h-6 w-44 rounded-full bg-[#071f33] shadow-2xl" />
        <div className="absolute left-28 top-20 h-6 w-16 rounded-full bg-[#c49345]" />
        <div className="absolute right-0 top-[86px] h-3 w-12 rounded-full bg-[#071f33]" />
        <div className="absolute left-0 top-[86px] h-3 w-10 rounded-full bg-[#c49345]" />
      </div>
    );
  }

  if (name.includes("geometry") || name.includes("box")) {
    return (
      <div className="relative h-40 w-56 rounded-[14px] bg-[#dfe7ec] p-4 shadow-2xl">
        <div className="h-full rounded-[10px] border border-[#071f33]/15 bg-white/70" />
        <div className="absolute left-10 top-14 h-5 w-32 rounded-full bg-[#071f33]" />
        <div className="absolute left-16 top-24 h-4 w-24 rounded-full bg-[#c49345]" />
        <div className="absolute right-8 top-11 h-14 w-14 rounded-full border-2 border-[#071f33]/30" />
      </div>
    );
  }

  if (name.includes("bottle")) {
    return (
      <div className="relative h-56 w-24 rounded-b-[22px] rounded-t-[10px] bg-[#123a2d] shadow-2xl">
        <div className="absolute left-1/2 top-[-28px] h-8 w-12 -translate-x-1/2 rounded-t-[6px] bg-[#071f33]" />
        <div className="absolute inset-x-5 top-14 h-20 rounded-full bg-white/8" />
        <div className="absolute inset-x-4 bottom-10 h-px bg-[#c49345]" />
      </div>
    );
  }

  return (
    <div className="relative h-52 w-40 rounded-[10px] bg-[#0a3328] shadow-2xl">
      <div className="absolute inset-3 rounded-[7px] border border-[#c49345]/25" />
      <div className="absolute bottom-0 left-0 h-12 w-full bg-[#071f33]/20" />
      <p className="absolute inset-x-0 top-16 text-center text-xs font-black uppercase tracking-[0.26em] text-[#c49345]">
        Manasa
      </p>
    </div>
  );
}

export function EditorialProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-[#f5ead7]">
        <div className="relative flex aspect-[4/5] items-center justify-center bg-white">
          {product.imageUrl ? (
            <div
              role="img"
              aria-label={product.name}
              className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
              style={{ backgroundImage: `url(${product.imageUrl})` }}
            />
          ) : (
            <ProductArtwork product={product} />
          )}
        </div>
      </div>
      <div className="mt-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d86b13]">
          {product.category}
        </p>
        <h3 className="mt-2 text-xl font-black leading-tight text-[#071f33]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm font-semibold text-[#071f33]/58">
          {product.price}
        </p>
      </div>
    </Link>
  );
}
