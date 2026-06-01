import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CategoryCard } from "@/components/site/CategoryCard";
import { iconMap } from "@/components/site/icon-map";
import { ProductBrowser } from "@/components/site/ProductBrowser";
import { RetailPageHeader } from "@/components/site/RetailPageHeader";
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
  const Icon = iconMap[category.icon];

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-sm font-black text-[#0b6b4a]"
      >
        <ArrowLeft className="h-4 w-4" />
        All categories
      </Link>

      <div className="mt-6">
        <RetailPageHeader
          eyebrow="Category"
          title={category.name}
          description={category.description}
          icon={<Icon className="h-6 w-6" />}
          actions={
            <Link
              href={`/request?category=${category.slug}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#ffd493] px-5 text-sm font-black text-[#071f33]"
            >
              Request in this category
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[8px] bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-[#0b6b4a]">
                {categoryProducts.length}
              </p>
              <p className="mt-1 text-sm font-bold text-[#071f33]/62">
                listed products
              </p>
            </div>
            <div className="rounded-[8px] bg-white p-5 shadow-sm">
              <p className="text-3xl font-black text-[#d86b13]">Fast</p>
              <p className="mt-1 text-sm font-bold text-[#071f33]/62">
                search inside category
              </p>
            </div>
          </div>
        </RetailPageHeader>
      </div>

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
