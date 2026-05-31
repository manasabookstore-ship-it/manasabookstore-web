"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { Category, Product } from "@/lib/site-data";
import { ProductCard } from "./ProductCard";

type ProductBrowserProps = {
  products: Product[];
  categories: Category[];
  initialCategorySlug?: string;
  lockCategory?: boolean;
};

export function ProductBrowser({
  products,
  categories,
  initialCategorySlug = "all",
  lockCategory = false,
}: ProductBrowserProps) {
  const [query, setQuery] = useState("");
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        lockCategory ||
        categorySlug === "all" ||
        product.categorySlug === categorySlug;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        [
          product.name,
          product.category,
          product.description,
          product.stockNote,
          ...product.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [categorySlug, lockCategory, products, query]);

  const featured = visibleProducts.filter((product) => product.featured);

  return (
    <section>
      <div className="rounded-[8px] border border-[#071f33]/10 bg-white p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#071f33]/45" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search by item, use, tag or category..."
              className="h-12 w-full rounded-[8px] border border-[#071f33]/12 bg-[#fbf7ef] pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#0b6b4a] focus:bg-white"
            />
          </label>

          <div className="flex items-center gap-2 rounded-[8px] bg-[#fbf7ef] px-3 py-2 text-sm font-black text-[#071f33]/70">
            <SlidersHorizontal className="h-4 w-4" />
            {visibleProducts.length} products
          </div>
        </div>

        {!lockCategory ? (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setCategorySlug("all")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                categorySlug === "all"
                  ? "bg-[#071f33] text-white"
                  : "bg-[#071f33]/5 text-[#071f33]/66 hover:bg-[#071f33]/10"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                type="button"
                key={category.slug}
                onClick={() => setCategorySlug(category.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wide transition ${
                  categorySlug === category.slug
                    ? "bg-[#071f33] text-white"
                    : "bg-[#071f33]/5 text-[#071f33]/66 hover:bg-[#071f33]/10"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {featured.length > 0 ? (
        <div className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-black text-[#d86b13]">Featured</p>
              <h2 className="text-2xl font-black">Recommended picks</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <div className="mt-8 rounded-[8px] border border-dashed border-[#071f33]/20 bg-white p-8 text-center">
          <h2 className="text-2xl font-black">No matching products yet.</h2>
          <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
            Try another keyword or request the item directly from the store.
          </p>
        </div>
      ) : null}
    </section>
  );
}
