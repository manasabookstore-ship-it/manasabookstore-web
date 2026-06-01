"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardPlus, Search, SlidersHorizontal } from "lucide-react";

import { PublicProductSuggestion } from "@/lib/public-product-lookup";
import type { Category, Product } from "@/lib/site-data";
import { ProductLookupCard } from "./ProductLookupCard";
import { ProductCard } from "./ProductCard";

type ProductBrowserProps = {
  products: Product[];
  categories: Category[];
  initialQuery?: string;
  initialCategorySlug?: string;
  lockCategory?: boolean;
};

export function ProductBrowser({
  products,
  categories,
  initialQuery = "",
  initialCategorySlug = "all",
  lockCategory = false,
}: ProductBrowserProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categorySlug, setCategorySlug] = useState(initialCategorySlug);
  const [lookupResults, setLookupResults] = useState<PublicProductSuggestion[]>([]);
  const [lookupLoading, setLookupLoading] = useState(false);

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
  const normalizedQuery = query.trim();
  const shouldLookup = visibleProducts.length === 0 && normalizedQuery.length >= 3;
  const visibleLookupResults = shouldLookup ? lookupResults : [];
  const isLookupLoading = shouldLookup && lookupLoading;

  useEffect(() => {
    if (!shouldLookup) {
      return;
    }

    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLookupLoading(true);

      try {
        const response = await fetch(
          `/api/product-lookup?q=${encodeURIComponent(normalizedQuery)}`,
          {
            cache: "no-store",
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          setLookupResults([]);
          return;
        }

        const data = (await response.json()) as {
          suggestions?: PublicProductSuggestion[];
        };

        setLookupResults(data.suggestions ?? []);
      } catch {
        if (!controller.signal.aborted) {
          setLookupResults([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLookupLoading(false);
        }
      }
    }, 450);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [normalizedQuery, shouldLookup]);

  return (
    <section>
      <div className="sticky top-[76px] z-20 rounded-[8px] border border-[#071f33]/10 bg-white/95 p-4 shadow-xl backdrop-blur">
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

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <div className="mt-8 rounded-[8px] border border-dashed border-[#071f33]/20 bg-white p-8 text-center">
          <h2 className="text-2xl font-black">No matching products yet.</h2>
          <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
            We can still help source it through Manasa.
          </p>
        </div>
      ) : null}

      {shouldLookup ? (
        <section className="mt-8">
          <div className="mb-4 flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#fff3da] text-[#d86b13]">
              <ClipboardPlus className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-black text-[#d86b13]">
                Request Through Manasa
              </p>
              <h2 className="mt-1 text-2xl font-black">
                Suggested items we can review for you
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#071f33]/62">
                These are lookup suggestions, not confirmed store stock. Send a
                request and the team can check availability.
              </p>
            </div>
          </div>

          {isLookupLoading ? (
            <p className="rounded-[8px] bg-white p-4 text-sm font-bold text-[#071f33]/62 shadow-sm">
              Looking for requestable items...
            </p>
          ) : null}

          {!isLookupLoading && visibleLookupResults.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {visibleLookupResults.map((suggestion) => (
                <ProductLookupCard
                  key={`${suggestion.source}-${suggestion.id}`}
                  suggestion={suggestion}
                />
              ))}
            </div>
          ) : null}

          {!isLookupLoading && visibleLookupResults.length === 0 ? (
            <div className="rounded-[8px] bg-white p-5 shadow-sm">
              <p className="text-sm font-bold text-[#071f33]/64">
                No public suggestions found. You can still send this item name
                as a direct request.
              </p>
            </div>
          ) : null}
        </section>
      ) : null}
    </section>
  );
}
