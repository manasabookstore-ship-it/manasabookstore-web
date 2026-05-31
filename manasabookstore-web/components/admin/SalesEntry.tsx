"use client";

import { CheckCircle2, Plus, ReceiptText, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminSale, SaleItem } from "@/lib/admin-data";
import { AdminPageHeader } from "./AdminPageHeader";
import { useAdminStore } from "./AdminStore";

function money(value: number) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

export function SalesEntry() {
  const { products, recordSale } = useAdminStore();
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id ?? "");
  const [quantity, setQuantity] = useState("1");
  const [paymentMode, setPaymentMode] =
    useState<AdminSale["paymentMode"]>("Cash");
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const selectedProduct = products.find(
    (product) => product.id === selectedProductId,
  );
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const availableProducts = useMemo(
    () => products.filter((product) => product.stock > 0),
    [products],
  );

  function addToCart() {
    setMessage("");
    if (!selectedProduct) {
      return;
    }

    const nextQuantity = Number(quantity);
    if (Number.isNaN(nextQuantity) || nextQuantity <= 0) {
      setMessage("Enter a valid quantity.");
      return;
    }

    if (nextQuantity > selectedProduct.stock) {
      setMessage("Quantity is higher than available stock.");
      return;
    }

    setCart((current) => {
      const existing = current.find(
        (item) => item.productId === selectedProduct.id,
      );

      if (existing) {
        return current.map((item) =>
          item.productId === selectedProduct.id
            ? { ...item, quantity: item.quantity + nextQuantity }
            : item,
        );
      }

      return [
        ...current,
        {
          productId: selectedProduct.id,
          name: selectedProduct.name,
          sku: selectedProduct.sku,
          quantity: nextQuantity,
          price: selectedProduct.price,
        },
      ];
    });
    setQuantity("1");
  }

  function removeItem(productId: string) {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }

  async function completeSale() {
    setMessage("");
    if (!cart.length) {
      setMessage("Add at least one item before completing a sale.");
      return;
    }

    setSaving(true);
    await recordSale(cart, paymentMode);
    setCart([]);
    setMessage("Sale recorded and stock updated.");
    setSaving(false);
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Sales"
        title="POS-style sales entry."
        description="Create a simple walk-in sale, choose payment mode and reduce stock locally after recording."
      />

      <div className="mt-8 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Add item</h2>
          <label className="mt-5 block text-sm font-black">
            Product
            <select
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(event.target.value)}
              className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 bg-white px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
            >
              {availableProducts.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} · {product.stock} left
                </option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-sm font-black">
            Quantity
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
            />
          </label>
          <label className="mt-4 block text-sm font-black">
            Payment mode
            <select
              value={paymentMode}
              onChange={(event) =>
                setPaymentMode(event.target.value as AdminSale["paymentMode"])
              }
              className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 bg-white px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
            >
              <option>Cash</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
          </label>
          <button
            type="button"
            onClick={addToCart}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#071f33] text-sm font-black text-white"
          >
            <Plus className="h-4 w-4" />
            Add to sale
          </button>
          {message ? (
            <p className="mt-4 rounded-[8px] bg-[#f7faf9] px-4 py-3 text-sm font-bold text-[#071f33]/70">
              {message}
            </p>
          ) : null}
        </section>

        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black">Current sale</h2>
              <p className="mt-1 text-sm font-semibold text-[#071f33]/58">
                {cart.length} line items
              </p>
            </div>
            <ReceiptText className="h-7 w-7 text-[#d86b13]" />
          </div>

          <div className="mt-5 grid gap-3">
            {cart.length ? (
              cart.map((item) => (
                <div
                  key={item.productId}
                  className="grid gap-3 rounded-[8px] bg-[#f7faf9] p-4 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                >
                  <div>
                    <p className="text-sm font-black">{item.name}</p>
                    <p className="mt-1 text-xs font-semibold text-[#071f33]/54">
                      {item.sku} · {item.quantity} x {money(item.price)}
                    </p>
                  </div>
                  <p className="text-sm font-black">
                    {money(item.price * item.quantity)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-red-600"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))
            ) : (
              <p className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-semibold text-[#071f33]/58">
                Add products to start a sale.
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-[#071f33]/10 pt-5">
            <span className="text-sm font-black text-[#071f33]/58">
              Subtotal
            </span>
            <span className="text-3xl font-black">{money(subtotal)}</span>
          </div>
          <button
            type="button"
            onClick={completeSale}
            disabled={saving}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0b6b4a] text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCircle2 className="h-4 w-4" />
            {saving ? "Recording..." : "Complete sale"}
          </button>
        </section>
      </div>
    </div>
  );
}
