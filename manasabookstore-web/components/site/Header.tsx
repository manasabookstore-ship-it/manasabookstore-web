import Image from "next/image";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";

import { site } from "@/lib/site-data";
import { SearchBar } from "./SearchBar";

const navItems = [
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/offers", label: "Offers" },
  { href: "/request", label: "Request" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#071f33]/10 bg-[#fbf7ef]/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-3 sm:px-8 lg:px-10">
        <Link href="/" className="shrink-0" aria-label="Manasa Book Center">
          <Image
            src="/manasa-logo.svg"
            alt="Manasa Book Center"
            width={205}
            height={64}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-5 px-4 text-sm font-black text-[#071f33]/70 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-[#0b6b4a]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <SearchBar compact />
        </div>

        <a
          href={site.phoneHref}
          className="hidden h-11 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white shadow-sm transition hover:bg-[#0b6b4a] sm:inline-flex"
        >
          <Phone className="h-4 w-4" />
          {site.phone}
        </a>

        <details className="relative ml-auto lg:hidden">
          <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[8px] border border-[#071f33]/12 bg-white text-[#071f33] shadow-sm [&::-webkit-details-marker]:hidden">
            <Menu className="h-5 w-5" />
          </summary>
          <div className="absolute right-0 top-13 w-[min(88vw,330px)] rounded-[8px] border border-[#071f33]/10 bg-white p-3 shadow-2xl">
            <div className="mb-3 md:hidden">
              <SearchBar compact />
            </div>
            <nav className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-[8px] px-3 py-3 text-sm font-black text-[#071f33]/76 transition hover:bg-[#fbf7ef] hover:text-[#0b6b4a]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
