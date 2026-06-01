import Link from "next/link";
import { ArrowRight, Grid3X3 } from "lucide-react";

import { CategoryCard } from "@/components/site/CategoryCard";
import { RetailPageHeader } from "@/components/site/RetailPageHeader";
import { categories } from "@/lib/site-data";

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <RetailPageHeader
        eyebrow="Store Departments"
        title="Shop by shelf, not by guesswork."
        description="Quickly jump into the departments customers ask for most: books, stationery, school items, project materials, tools, hostel essentials and gifting."
        icon={<Grid3X3 className="h-6 w-6" />}
        actions={
          <Link
            href="/products"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#ffd493] px-5 text-sm font-black text-[#071f33]"
          >
            Browse all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="rounded-[8px] bg-white p-4 text-sm font-black text-[#071f33] shadow-sm"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </RetailPageHeader>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </main>
  );
}
