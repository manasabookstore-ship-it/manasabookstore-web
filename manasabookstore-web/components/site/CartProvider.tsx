"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartItem, cartSubtotal } from "@/lib/commerce";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "manasa-cart";

function readCart() {
  if (typeof window === "undefined") {
    return [];
  }

  const value = window.localStorage.getItem(storageKey);
  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value) as CartItem[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: cartSubtotal(items),
      addItem(item) {
        setItems((current) => {
          const existing = current.find((entry) => entry.slug === item.slug);

          if (existing) {
            return current.map((entry) =>
              entry.slug === item.slug
                ? { ...entry, quantity: entry.quantity + 1 }
                : entry,
            );
          }

          return [...current, item];
        });
      },
      updateQuantity(slug, quantity) {
        setItems((current) =>
          current.map((item) =>
            item.slug === slug
              ? { ...item, quantity: Math.max(1, quantity) }
              : item,
          ),
        );
      },
      removeItem(slug) {
        setItems((current) => current.filter((item) => item.slug !== slug));
      },
      clearCart() {
        setItems([]);
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);

  if (!value) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return value;
}
