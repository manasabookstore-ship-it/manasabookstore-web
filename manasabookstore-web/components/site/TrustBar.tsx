import { MapPin, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Trusted local store", text: "Serving Chimakurthy customers" },
  { icon: MessageCircle, title: "WhatsApp help", text: "Share lists and questions" },
  { icon: PackageCheck, title: "Request missing items", text: "Admin team can review" },
  { icon: MapPin, title: "Easy store visit", text: "Kurnool Main Road" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[#071f33]/10 bg-white">
      <div className="mx-auto grid max-w-[1600px] gap-px bg-[#071f33]/10 px-3 sm:px-5 md:grid-cols-4 lg:px-6">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="flex items-center gap-3 bg-white py-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-[#eaf4ef] text-[#0b6b4a]">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-black text-[#071f33]">
                  {item.title}
                </span>
                <span className="block text-xs font-semibold text-[#071f33]/58">
                  {item.text}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
