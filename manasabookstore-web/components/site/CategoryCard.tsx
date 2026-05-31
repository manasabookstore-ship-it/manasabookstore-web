import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Category } from "@/lib/site-data";
import { iconMap } from "./icon-map";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon];

  return (
    <Link
      href={`/category/${category.slug}`}
      className="group block rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#0b6b4a]/35 hover:shadow-xl"
    >
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-[8px] ${category.accent}`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-[#071f33]">
            {category.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
            {category.description}
          </p>
        </div>
        <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-[#071f33]/35 transition group-hover:translate-x-1 group-hover:text-[#0b6b4a]" />
      </div>
    </Link>
  );
}
