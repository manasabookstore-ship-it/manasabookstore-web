import { ClipboardList, MessageCircle, PackageSearch } from "lucide-react";

import { RetailPageHeader } from "@/components/site/RetailPageHeader";
import { RequestForm } from "@/components/site/RequestForm";
import { RequestedItemsBoard } from "@/components/site/RequestedItemsBoard";
import { RequestStatusLookup } from "@/components/site/RequestStatusLookup";
import { getPublicRequestedItemsFromSupabase } from "@/lib/supabase/public-requests";
import { categories, site } from "@/lib/site-data";

type RequestPageProps = {
  searchParams: Promise<{ item?: string; category?: string }>;
};

export default async function RequestPage({ searchParams }: RequestPageProps) {
  const [params, requestedItems] = await Promise.all([
    searchParams,
    getPublicRequestedItemsFromSupabase(),
  ]);
  const requestedCategory = categories.some(
    (category) => category.slug === params.category,
  )
    ? params.category
    : "";

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <RetailPageHeader
        eyebrow="Request Desk"
        title="Ask for a product, book list or full school kit."
        description="Send the item details once. The request is saved for the admin team and a WhatsApp-ready message is prepared for faster follow-up."
        icon={<ClipboardList className="h-6 w-6" />}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {["Book lists", "Daily essentials", "Project kits", "Gifts"].map(
            (item) => (
              <div key={item} className="rounded-[8px] bg-white p-4 shadow-sm">
                <PackageSearch className="h-5 w-5 text-[#0b6b4a]" />
                <p className="mt-3 text-sm font-black text-[#071f33]">{item}</p>
              </div>
            ),
          )}
        </div>
      </RetailPageHeader>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.78fr_1fr]">
      <section>
        <div className="mt-6 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-[#071f33]">
            Need faster help today?
          </p>
          <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
            You can also continue on WhatsApp with your book list or item
            details.
          </p>
          <a
            href={site.whatsapp}
            className="mt-4 inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#10a36f] px-4 text-sm font-black text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Continue on WhatsApp
          </a>
        </div>
        <RequestStatusLookup />
        <RequestedItemsBoard items={requestedItems} />
      </section>

      <RequestForm
        categories={categories}
        initialItem={params.item ?? ""}
        initialCategory={requestedCategory}
      />
      </div>
    </main>
  );
}
