import { ClipboardList, MessageCircle } from "lucide-react";

import { RequestForm } from "@/components/site/RequestForm";
import { categories, site } from "@/lib/site-data";

export default function RequestPage() {
  return (
    <main className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[0.78fr_1fr] lg:px-10 lg:py-14">
      <section>
        <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-[#eaf4ef] text-[#0b6b4a]">
          <ClipboardList className="h-8 w-8" />
        </div>
        <p className="mt-6 text-sm font-black text-[#d86b13]">Request Item</p>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
          Ask for a book, product or full list.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#071f33]/68">
          Share the item you need and the store team can review availability.
          This is a client-side request experience, ready to connect to
          Supabase later.
        </p>
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
      </section>

      <RequestForm categories={categories} />
    </main>
  );
}
