import type { Product } from "@/lib/site-data";

const availabilityCopy = {
  available: {
    label: "Available",
    className: "bg-[#eaf4ef] text-[#0b6b4a]",
  },
  limited: {
    label: "Limited stock",
    className: "bg-[#fff3da] text-[#9a4c00]",
  },
  request: {
    label: "Request first",
    className: "bg-[#eaf0ff] text-[#163d7a]",
  },
};

export function AvailabilityBadge({
  availability = "request",
}: {
  availability?: Product["availability"];
}) {
  const item = availabilityCopy[availability ?? "request"];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${item.className}`}
    >
      {item.label}
    </span>
  );
}
