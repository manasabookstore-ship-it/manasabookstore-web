"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { CreditCard, PackageCheck } from "lucide-react";

import {
  CheckoutMode,
  CustomerProfile,
  defaultCommerceSettings,
  PaymentMode,
} from "@/lib/commerce";
import {
  fetchCommerceSettings,
  createRazorpayOrder,
  submitCheckout,
  validateCoupon,
} from "@/lib/commerce-api";
import { useCart } from "./CartProvider";

const profileKey = "manasa-customer-profile";

function readProfile(): CustomerProfile {
  if (typeof window === "undefined") {
    return { name: "", phone: "", email: "", address: "" };
  }

  try {
    return JSON.parse(window.localStorage.getItem(profileKey) ?? "{}");
  } catch {
    return { name: "", phone: "", email: "", address: "" };
  }
}

export function CheckoutView() {
  const { items, subtotal, clearCart } = useCart();
  const [settings, setSettings] = useState(defaultCommerceSettings);
  const [customer, setCustomer] = useState<CustomerProfile>(readProfile);
  const [fulfillment, setFulfillment] = useState<CheckoutMode>("pickup");
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("pay_at_store");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      const next = await fetchCommerceSettings();
      if (next) {
        setSettings(next);
        if (!next.pickupEnabled && next.deliveryEnabled) {
          setFulfillment("delivery");
        }
      }
    }

    void loadSettings();
  }, []);

  const total = useMemo(() => Math.max(0, subtotal - discount), [discount, subtotal]);
  const checkoutDisabled =
    !settings.onlineOrderingEnabled ||
    !items.length ||
    (fulfillment === "pickup" && !settings.pickupEnabled) ||
    (fulfillment === "delivery" && !settings.deliveryEnabled);

  function updateCustomer(field: keyof CustomerProfile, value: string) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  async function applyCoupon() {
    const coupon = await validateCoupon(couponCode, subtotal);
    if (!coupon) {
      setDiscount(0);
      setMessage("Coupon is not valid.");
      return;
    }
    setDiscount(coupon.discount);
    setMessage(`${coupon.title} applied.`);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (checkoutDisabled) {
      setMessage("Checkout is currently not enabled for this option.");
      return;
    }

    if (!customer.name || !customer.phone) {
      setMessage("Name and phone are required.");
      return;
    }

    window.localStorage.setItem(profileKey, JSON.stringify(customer));
    setSaving(true);
    const razorpayOrder =
      paymentMode === "razorpay" ? await createRazorpayOrder(total) : null;

    if (paymentMode === "razorpay" && !razorpayOrder) {
      setSaving(false);
      setMessage("Razorpay could not be started. Choose pay at store.");
      return;
    }

    const order = await submitCheckout({
      customer,
      items,
      fulfillment,
      paymentMode,
      couponCode,
    });
    setSaving(false);

    if (!order) {
      setMessage("Order could not be placed.");
      return;
    }

    clearCart();
    setMessage(`Order placed. Reference: ${order.id}`);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div>
        <p className="text-sm font-black text-[#d86b13]">Checkout</p>
        <h1 className="mt-2 text-4xl font-black">Pickup or delivery order</h1>
        <p className="mt-3 text-sm font-semibold text-[#071f33]/62">
          Features here follow admin store settings.
        </p>
      </div>

      {!settings.onlineOrderingEnabled ? (
        <div className="mt-8 rounded-[8px] border border-amber-200 bg-amber-50 p-5 text-sm font-bold text-amber-900">
          Online ordering is currently disabled by the store.
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5 lg:grid-cols-[1fr_360px]">
        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Customer details</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {(["name", "phone", "email", "address"] as const).map((field) => (
              <label key={field} className="grid gap-2 text-sm font-black">
                {field}
                <input
                  value={customer[field]}
                  onChange={(event) => updateCustomer(field, event.target.value)}
                  className="h-12 rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none"
                />
              </label>
            ))}
          </div>

          <h2 className="mt-7 text-xl font-black">Fulfillment</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-black">
              <input
                type="radio"
                checked={fulfillment === "pickup"}
                disabled={!settings.pickupEnabled}
                onChange={() => setFulfillment("pickup")}
                className="mr-2 accent-[#0b6b4a]"
              />
              Pickup
            </label>
            <label className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-black">
              <input
                type="radio"
                checked={fulfillment === "delivery"}
                disabled={!settings.deliveryEnabled}
                onChange={() => setFulfillment("delivery")}
                className="mr-2 accent-[#0b6b4a]"
              />
              Delivery
            </label>
          </div>

          <h2 className="mt-7 text-xl font-black">Payment</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <label className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-black">
              <input
                type="radio"
                checked={paymentMode === "pay_at_store"}
                onChange={() => setPaymentMode("pay_at_store")}
                className="mr-2 accent-[#0b6b4a]"
              />
              Pay at store
            </label>
            <label className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-black">
              <input
                type="radio"
                checked={paymentMode === "razorpay"}
                disabled={!settings.razorpayEnabled}
                onChange={() => setPaymentMode("razorpay")}
                className="mr-2 accent-[#0b6b4a]"
              />
              Razorpay
            </label>
          </div>
        </section>

        <aside className="h-fit rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <PackageCheck className="h-7 w-7 text-[#0b6b4a]" />
          <h2 className="mt-4 text-xl font-black">Order summary</h2>
          <div className="mt-4 grid gap-2 text-sm font-semibold text-[#071f33]/68">
            {items.map((item) => (
              <div key={item.slug} className="flex justify-between gap-3">
                <span>{item.quantity} x {item.name}</span>
                <span>Rs {(item.price * item.quantity).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <input
              value={couponCode}
              onChange={(event) => setCouponCode(event.target.value)}
              placeholder="Coupon"
              className="h-11 min-w-0 flex-1 rounded-[8px] border border-[#071f33]/12 px-3 text-sm font-bold outline-none"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="h-11 rounded-[8px] bg-[#f7faf9] px-3 text-sm font-black"
            >
              Apply
            </button>
          </div>
          <div className="mt-5 border-t border-[#071f33]/10 pt-4">
            <div className="flex justify-between text-sm font-bold">
              <span>Subtotal</span>
              <span>Rs {subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm font-bold">
              <span>Discount</span>
              <span>Rs {discount.toLocaleString("en-IN")}</span>
            </div>
            <div className="mt-3 flex justify-between text-xl font-black">
              <span>Total</span>
              <span>Rs {total.toLocaleString("en-IN")}</span>
            </div>
          </div>
          {message ? (
            <p className="mt-4 rounded-[8px] bg-[#f7faf9] p-3 text-sm font-bold text-[#071f33]/70">
              {message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={checkoutDisabled || saving}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#071f33] text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <CreditCard className="h-4 w-4" />
            {saving ? "Placing order..." : "Place order"}
          </button>
        </aside>
      </form>
    </main>
  );
}
