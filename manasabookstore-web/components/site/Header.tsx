import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { CartHeaderLink } from "./CartHeaderLink";
import { SearchBar } from "./SearchBar";

const navItems = [
  { href: "/categories", label: "Categories" },
  { href: "/products", label: "Products" },
  { href: "/offers", label: "Offers" },
  { href: "/request", label: "Request Item" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#071f33]/10 bg-[#fbf7ef]/96 shadow-sm backdrop-blur">
      <div className="mx-auto grid max-w-[1500px] gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="shrink-0" aria-label="Manasa Book Store">
            <span className="inline-flex items-center gap-2 sm:gap-3">
              <Image
                src="/manasa-logo-concept-mark.svg"
                alt=""
                width={64}
                height={64}
                priority
                className="h-10 w-10 sm:h-14 sm:w-14"
              />
              <span>
                <span className="block font-serif text-lg uppercase leading-none tracking-[0.22em] text-[#071f33] sm:text-2xl">
                  Manasa
                </span>
                <span className="mt-1 block text-[9px] font-black uppercase leading-none tracking-[0.28em] text-[#8a5a12] sm:text-[11px]">
                  Book Store
                </span>
              </span>
            </span>
          </Link>

          <div className="mx-auto hidden w-full max-w-[700px] md:block">
            <SearchBar placeholder="Search books, stationery, gifts and more..." compact />
          </div>

          <CartHeaderLink />

          <details className="relative lg:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-[8px] border border-[#071f33]/12 bg-white text-[#071f33] shadow-sm [&::-webkit-details-marker]:hidden">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 top-13 w-[min(88vw,330px)] rounded-[8px] border border-[#071f33]/10 bg-white p-3 shadow-2xl">
              <div className="mb-3">
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

        <div className="md:hidden">
          <SearchBar placeholder="Search store..." compact />
        </div>

        <nav className="hidden justify-center gap-10 border-t border-[#071f33]/8 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#071f33] lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-[#8a5a12]">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
