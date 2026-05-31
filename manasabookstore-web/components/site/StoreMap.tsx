import { MapPin, Navigation } from "lucide-react";

import { site } from "@/lib/site-data";

type StoreMapProps = {
  className?: string;
};

export function StoreMap({ className = "" }: StoreMapProps) {
  return (
    <div
      className={`overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm ${className}`}
    >
      <div className="relative h-[320px] bg-[#071f33] sm:h-[380px]">
        <iframe
          title="Map to Manasa Book Center"
          src={site.mapEmbed}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <div className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#f5ead7] text-[#d86b13]">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <h3 className="text-base font-black">{site.name}</h3>
            <p className="mt-1 text-sm font-semibold leading-6 text-[#071f33]/64">
              {site.address}
            </p>
          </div>
        </div>
        <a
          href={site.directions}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b6b4a]"
        >
          <Navigation className="h-4 w-4" />
          Directions
        </a>
      </div>
    </div>
  );
}
