"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";

import { productToCartItem } from "@/lib/commerce";
import type { Product } from "@/lib/site-data";
import { useCart } from "./CartProvider";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const price = productToCartItem(product).price;
  const disabled = price <= 0;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        addItem(productToCartItem(product));
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
      className="mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white transition hover:bg-[#0b6b4a] disabled:cursor-not-allowed disabled:bg-[#071f33]/30"
    >
      <ShoppingCart className="h-4 w-4" />
      {disabled ? "Request item" : added ? "Added" : "Add to cart"}
    </button>
  );
}

