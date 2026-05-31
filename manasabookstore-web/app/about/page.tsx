import { HeartHandshake, MapPin, PackageCheck } from "lucide-react";

import { site } from "@/lib/site-data";

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-black text-[#d86b13]">About</p>
          <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
            A local store for students and everyday essentials.
          </h1>
        </div>
        <p className="text-base leading-8 text-[#071f33]/68">
          Manasa Book Center serves Chimakurthy with books, stationery, school
          essentials, project materials, engineering tools, hostel basics,
          personal care items and gifts. This website foundation is designed to
          make the store easier to discover, browse and contact.
        </p>
      </section>
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
