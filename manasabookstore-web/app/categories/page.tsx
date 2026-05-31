import { CategoryCard } from "@/components/site/CategoryCard";
import { categories } from "@/lib/site-data";

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="max-w-3xl">
        <p className="text-sm font-black text-[#d86b13]">Categories</p>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
          Find what you need faster.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#071f33]/68">
          Browse the core Manasa Book Center departments used by students,
          parents, hostellers and project makers.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </main>
  );
}
