import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CategoryCard } from "@/components/site/CategoryCard";
import { ProductBrowser } from "@/components/site/ProductBrowser";
import {
  categories,
  getCategory,
  getProductsByCategory,
} from "@/lib/site-data";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(category.slug);
  const relatedCategories = categories
    .filter((item) => item.slug !== category.slug)
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-sm font-black text-[#0b6b4a]"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      <section className="mt-6 rounded-[8px] bg-[#071f33] p-6 text-white sm:p-8">
        <p className="text-sm font-black text-[#ffd493]">Category detail</p>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
          {category.name}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/72">
          {category.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-wide text-white/78">
            {categoryProducts.length} products
          </span>
          <span className="rounded-full bg-white/12 px-4 py-2 text-xs font-black uppercase tracking-wide text-white/78">
            Search within category
          </span>
        </div>
      </section>

      <div className="mt-8">
        <ProductBrowser
          products={categoryProducts}
          categories={[category]}
          initialCategorySlug={category.slug}
          lockCategory
        />
      </div>

      <section className="mt-12">
        <p className="text-sm font-black text-[#d86b13]">Related categories</p>
        <h2 className="mt-2 text-3xl font-black">Explore nearby needs</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {relatedCategories.map((item) => (
            <CategoryCard key={item.slug} category={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
