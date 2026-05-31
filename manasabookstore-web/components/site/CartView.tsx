"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "./CartProvider";

export function CartView() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="flex items-center gap-3">
        <ShoppingBag className="h-8 w-8 text-[#0b6b4a]" />
        <div>
          <p className="text-sm font-black text-[#d86b13]">Cart</p>
          <h1 className="text-4xl font-black">Your items</h1>
        </div>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_320px]">
        <section className="grid gap-3">
          {items.length ? (
            items.map((item) => (
              <article
                key={item.slug}
                className="grid gap-4 rounded-[8px] border border-[#071f33]/10 bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto]"
              >
                <div>
                  <p className="text-lg font-black">{item.name}</p>
                  <p className="mt-1 text-sm font-semibold text-[#071f33]/58">
                    {item.category} · Rs {item.price.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#f7faf9]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-black">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#f7faf9]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="grid h-9 w-9 place-items-center rounded-[8px] bg-red-50 text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[8px] bg-white p-6 text-sm font-bold text-[#071f33]/62 shadow-sm">
              Your cart is empty.
            </div>
          )}
        </section>

        <aside className="h-fit rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <p className="text-sm font-black text-[#071f33]/58">Subtotal</p>
          <p className="mt-2 text-3xl font-black">
            Rs {subtotal.toLocaleString("en-IN")}
          </p>
          <Link
            href="/checkout"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[8px] bg-[#071f33] text-sm font-black text-white"
          >
            Checkout
          </Link>
          <Link
            href="/products"
            className="mt-3 inline-flex h-11 w-full items-center justify-center rounded-[8px] bg-[#f7faf9] text-sm font-black text-[#071f33]"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

