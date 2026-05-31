import Link from "next/link";
import { ClipboardPlus } from "lucide-react";

import { PublicProductSuggestion } from "@/lib/public-product-lookup";

function sourceLabel(source: PublicProductSuggestion["source"]) {
  if (source === "open-food-facts") {
    return "Open Food Facts";
  }

  if (source === "google-books") {
    return "Google Books";
  }

  return "Open Library";
}

export function ProductLookupCard({
  suggestion,
}: {
  suggestion: PublicProductSuggestion;
}) {
  const params = new URLSearchParams({
    item: suggestion.name,
    category: suggestion.categorySlug,
  });

  return (
    <article className="rounded-[8px] border border-[#071f33]/10 bg-white p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wide text-[#d86b13]">
        Available on request
      </p>
      <h3 className="mt-2 line-clamp-2 text-lg font-black">{suggestion.name}</h3>
      <p className="mt-2 text-sm font-semibold text-[#071f33]/58">
        {suggestion.category}
      </p>
      {suggestion.description ? (
        <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-[#071f33]/50">
          {suggestion.description}
        </p>
      ) : null}
      <p className="mt-3 text-xs font-semibold text-[#071f33]/42">
        Drafted from {sourceLabel(suggestion.source)}. Store availability must be
        confirmed.
      </p>
      <Link
        href={`/request?${params.toString()}`}
        className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
      >
        <ClipboardPlus className="h-4 w-4" />
        Request through Manasa
      </Link>
    </article>
  );
}
