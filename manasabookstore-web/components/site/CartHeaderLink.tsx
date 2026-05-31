"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCart } from "./CartProvider";

export function CartHeaderLink() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-[#071f33]/12 bg-white text-[#071f33] shadow-sm transition hover:border-[#0b6b4a]/35"
      aria-label="Cart"
    >
      <ShoppingCart className="h-5 w-5" />
      {count ? (
        <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-[#d86b13] px-1 text-[11px] font-black text-white">
          {count}
        </span>
      ) : null}
    </Link>
  );
}

