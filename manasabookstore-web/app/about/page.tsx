import { HeartHandshake, MapPin, PackageCheck } from "lucide-react";

import { RetailPageHeader } from "@/components/site/RetailPageHeader";
import { site } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <RetailPageHeader
        eyebrow="About Manasa"
        title="A trusted Chimakurthy store for students and daily essentials."
        description="Manasa Book Center serves books, stationery, school essentials, project materials, engineering tools, hostel basics, personal care items and gifts."
        icon={<HeartHandshake className="h-6 w-6" />}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {["Books", "Stationery", "Essentials", "Gifts"].map((item) => (
            <div key={item} className="rounded-[8px] bg-white p-4 shadow-sm">
              <p className="text-sm font-black text-[#071f33]">{item}</p>
            </div>
          ))}
        </div>
      </RetailPageHeader>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {[
          {
            icon: PackageCheck,
            title: "Useful selection",
            text: "Products are organized around school, college and student needs.",
          },
          {
            icon: HeartHandshake,
            title: "Human help",
            text: "Customers can request matching items instead of guessing online.",
          },
          {
            icon: MapPin,
            title: "Local presence",
            text: `Built around quick visits and pickup in ${site.location}.`,
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm"
            >
              <Icon className="h-7 w-7 text-[#0b6b4a]" />
              <h2 className="mt-5 text-xl font-black">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
                {item.text}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
