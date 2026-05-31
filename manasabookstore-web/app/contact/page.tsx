import { MapPin, MessageCircle, Phone } from "lucide-react";

import { StoreMap } from "@/components/site/StoreMap";
import { site } from "@/lib/site-data";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="max-w-3xl">
        <p className="text-sm font-black text-[#d86b13]">Contact</p>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
          Visit, call or message Manasa.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#071f33]/68">
          Reach the store for book lists, product availability, pickup help and
          directions.
        </p>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <a
          href={site.phoneHref}
          className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm"
        >
          <Phone className="h-7 w-7 text-[#0b6b4a]" />
          <h2 className="mt-5 text-xl font-black">Call</h2>
          <p className="mt-2 text-sm font-bold text-[#071f33]/64">
            {site.phone}
          </p>
        </a>
        <a
          href={site.whatsapp}
          className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm"
        >
          <MessageCircle className="h-7 w-7 text-[#10a36f]" />
          <h2 className="mt-5 text-xl font-black">WhatsApp</h2>
          <p className="mt-2 text-sm font-bold text-[#071f33]/64">
            Send your list or product request.
          </p>
        </a>
        <a
          href={site.directions}
          target="_blank"
          rel="noreferrer"
          className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm"
        >
          <MapPin className="h-7 w-7 text-[#d86b13]" />
          <h2 className="mt-5 text-xl font-black">Directions</h2>
          <p className="mt-2 text-sm font-bold text-[#071f33]/64">
            {site.address}
          </p>
        </a>
      </div>
      <StoreMap className="mt-8" />
      <div className="mt-8 rounded-[8px] bg-[#071f33] p-6 text-white sm:p-8">
        <p className="text-sm font-black text-[#ffd493]">Store note</p>
        <p className="mt-3 max-w-3xl text-base leading-7 text-white/72">
          For quickest service, send a clear photo of your book list, project
          list or required product names before visiting the store.
        </p>
      </div>
    </main>
  );
}
