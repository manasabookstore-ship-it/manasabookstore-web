import { MessageCircle, PackageCheck, ShieldCheck, ShoppingBag } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Trusted Local Store", text: "Serving Chimakurthy with pride" },
  { icon: PackageCheck, title: "Request Anything", text: "If we do not have it, we will try to get it" },
  { icon: ShoppingBag, title: "Pickup From Store", text: "Easy and quick store pickup" },
  { icon: MessageCircle, title: "WhatsApp Support", text: "We are here to help you anytime" },
];

export function LuxuryTrustBand() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-px overflow-hidden rounded-[8px] bg-[#c49345]/30 lg:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-4 bg-[#071f33] p-6 text-white">
              <Icon className="h-7 w-7 shrink-0 text-[#c49345]" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-black text-[#ffd493]">{item.title}</p>
                <p className="mt-1 text-sm leading-6 text-white/68">{item.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
