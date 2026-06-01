import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { ProductBrowser } from "@/components/site/ProductBrowser";
import { RetailPageHeader } from "@/components/site/RetailPageHeader";
import { RequestedItemsStrip } from "@/components/site/RequestedItemsStrip";
import { categories, products } from "@/lib/site-data";
import { getPublicRequestedItemsFromSupabase } from "@/lib/supabase/public-requests";
import { getPublicProductsFromSupabase } from "@/lib/supabase/public-products";

type ProductsPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const [params, requestedItems, liveProducts] = await Promise.all([
    searchParams,
    getPublicRequestedItemsFromSupabase(10),
    getPublicProductsFromSupabase(40),
  ]);
  const mergedProducts = [...liveProducts, ...products].filter(
    (product, index, all) =>
      all.findIndex((item) => item.slug === product.slug) === index,
  );

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <RetailPageHeader
        eyebrow="Product Browse"
        title="Search Manasa shelves before you visit."
        description="Browse live store products, filter by department, check availability badges and request products that are not listed yet."
        icon={<ShoppingBag className="h-6 w-6" />}
        actions={
          <Link
            href="/request"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#ffd493] px-5 text-sm font-black text-[#071f33]"
          >
            Request missing item
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {["Search", "Filter", "Request"].map((item) => (
            <div key={item} className="rounded-[8px] bg-white p-4 shadow-sm">
              <p className="text-2xl font-black text-[#0b6b4a]">{item}</p>
              <p className="mt-1 text-xs font-bold text-[#071f33]/60">
                Fast product discovery
              </p>
            </div>
          ))}
        </div>
      </RetailPageHeader>

      <div className="mt-8">
        <ProductBrowser
          products={mergedProducts}
          categories={categories}
          initialQuery={params.q ?? ""}
        />
      </div>

      <RequestedItemsStrip items={requestedItems} />
    </main>
  );
}
