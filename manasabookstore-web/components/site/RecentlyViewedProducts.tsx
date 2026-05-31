"use client";

import { useEffect, useMemo, useState } from "react";

import type { Product } from "@/lib/site-data";
import { ProductCard } from "./ProductCard";

const storageKey = "manasa_recent_products";

export function RecentlyViewedProducts({
  currentProduct,
  products,
}: {
  currentProduct: Product;
  products: Product[];
}) {
  const [recentSlugs] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      return JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let existing: string[] = [];

    try {
      existing = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    } catch {
      existing = [];
    }

    const next = [
      currentProduct.slug,
      ...existing.filter((slug) => slug !== currentProduct.slug),
    ].slice(0, 6);

    window.localStorage.setItem(storageKey, JSON.stringify(next));
  }, [currentProduct.slug]);

  const recentProducts = useMemo(() => {
    return recentSlugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter((product): product is Product => Boolean(product))
      .slice(0, 3);
  }, [products, recentSlugs]);

  if (recentProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <p className="text-sm font-black text-[#d86b13]">Recently viewed</p>
      <h2 className="mt-2 text-3xl font-black">Continue browsing</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {recentProducts.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
