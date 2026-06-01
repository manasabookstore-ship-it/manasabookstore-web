import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { CollectionPanel } from "@/components/site/CollectionPanel";
import { EditorialProductCard } from "@/components/site/EditorialProductCard";
import { Hero } from "@/components/site/Hero";
import { LuxuryCategoryStrip } from "@/components/site/LuxuryCategoryStrip";
import { LuxuryOfferBand } from "@/components/site/LuxuryOfferBand";
import { LuxuryTrustBand } from "@/components/site/LuxuryTrustBand";
import { featuredProducts } from "@/lib/site-data";
import { getCommerceSettingsFromSupabase } from "@/lib/supabase/commerce-data";
import { getPublicProductsFromSupabase } from "@/lib/supabase/public-products";

export const dynamic = "force-dynamic";

const collections = [
  {
    title: "Back to School",
    text: "Everything you need for a graceful academic start.",
    href: "/category/school-essentials",
    image: "/generated/collection-school.png",
    tone: "school" as const,
  },
  {
    title: "Project Ready",
    text: "Tools and materials for every idea and occasion.",
    href: "/category/project-materials",
    image: "/generated/collection-project.png",
    tone: "project" as const,
  },
  {
    title: "Gift Picks",
    text: "Thoughtful gifts for every occasion.",
    href: "/category/gifts-chocolates",
    image: "/generated/collection-gift.png",
    tone: "gift" as const,
  },
  {
    title: "Everyday Essentials",
    text: "Quality daily essentials for home and you.",
    href: "/category/daily-essentials",
    image: "/generated/collection-daily.png",
    tone: "daily" as const,
  },
];

export default async function HomePage() {
  const [liveProducts, settings] = await Promise.all([
    getPublicProductsFromSupabase(8),
    getCommerceSettingsFromSupabase(),
  ]);
  const productShelf = [...liveProducts, ...featuredProducts]
    .filter(
      (product, index, all) =>
        all.findIndex((item) => item.slug === product.slug) === index,
    )
    .slice(0, 4);

  return (
    <main className="bg-[#fbf7ef]">
      <Hero />

      {settings.homepageNoticeEnabled && settings.homepageNotice ? (
        <section className="bg-[#fff3da] px-4 py-3 text-center text-sm font-black text-[#7c3d00]">
          {settings.homepageNotice}
        </section>
      ) : null}

      <LuxuryCategoryStrip />

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold uppercase tracking-[0.14em] text-[#071f33] sm:text-2xl sm:tracking-[0.2em]">
            Curated Collections
          </h2>
          <Link
            href="/categories"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a12] sm:inline-flex"
          >
            View all collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {collections.map((collection) => (
            <CollectionPanel key={collection.title} {...collection} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="font-serif text-xl font-semibold uppercase tracking-[0.14em] text-[#071f33] sm:text-2xl sm:tracking-[0.2em]">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a5a12] sm:inline-flex"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {productShelf.map((product) => (
            <EditorialProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <LuxuryOfferBand />
      <LuxuryTrustBand />
    </main>
  );
}
