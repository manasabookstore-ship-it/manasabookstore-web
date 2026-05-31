import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  MapPin,
  MousePointerClick,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import { SearchBar } from "./SearchBar";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#061b2c] text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(255,212,147,0.18),transparent_28%),radial-gradient(circle_at_85%_12%,rgba(16,163,111,0.16),transparent_30%)]" />
      <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-10 lg:py-18">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-[#ffd493] ring-1 ring-white/15">
            <MapPin className="h-4 w-4" />
            Chimakurthy, Andhra Pradesh
          </p>
          <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            Manasa Book Center
            <span className="mt-3 block text-[#ffd493]">
              More Than Just Books.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
            A trusted local store in Chimakurthy, now building its digital
            front.
          </p>
          <div className="mt-6 max-w-2xl rounded-[8px] border border-white/12 bg-white/10 p-4 text-sm font-bold leading-6 text-white/82 shadow-2xl backdrop-blur">
            Online ordering, pickup, and delivery features are coming soon.
          </div>
          <div className="mt-8 max-w-2xl">
            <SearchBar placeholder="Search books, stationery, school items..." />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/categories"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-[8px] bg-[#10a36f] px-6 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0d8e60]"
            >
              Explore categories
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/request"
              className="inline-flex h-13 items-center justify-center gap-2 rounded-[8px] bg-white px-6 text-sm font-black text-[#071f33] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#ffe3b1]"
            >
              Request an item
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[8px] border border-white/12 bg-white/10 p-3 shadow-2xl backdrop-blur">
            <div className="rounded-[8px] bg-[#fbf7ef] p-5 text-[#071f33]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#d86b13]">
                    Store preview
                  </p>
                  <h2 className="mt-2 text-3xl font-black leading-tight">
                    Built for students, parents and daily needs.
                  </h2>
                </div>
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[8px] bg-[#0b6b4a] text-white">
                  <Sparkles className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  { icon: BookOpen, label: "Books and references" },
                  { icon: PackageCheck, label: "School essentials" },
                  { icon: CheckCircle2, label: "Project materials" },
                  { icon: MousePointerClick, label: "Digital store soon" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-[8px] border border-[#071f33]/10 bg-white p-4"
                    >
                      <Icon className="h-6 w-6 text-[#0b6b4a]" />
                      <p className="mt-4 text-sm font-black">{item.label}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-[8px] bg-[#071f33] p-5 text-white">
                <p className="text-sm font-black text-[#ffd493]">
                  Coming next
                </p>
                <p className="mt-2 text-base leading-7 text-white/74">
                  A faster way to discover products, request items and prepare
                  store visits through Manasa&apos;s digital front.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 h-36 w-36 rounded-full bg-[#d86b13]/30 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
