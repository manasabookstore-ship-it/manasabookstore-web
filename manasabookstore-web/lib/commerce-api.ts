import {
  CartItem,
  CheckoutMode,
  CommerceSettings,
  CustomerProfile,
  PaymentMode,
} from "./commerce";

export type CheckoutPayload = {
  customer: CustomerProfile;
  items: CartItem[];
  fulfillment: CheckoutMode;
  paymentMode: PaymentMode;
  couponCode?: string;
};

export type CheckoutResponse = {
  id: string;
  status: string;
  total: number;
  razorpayOrderId?: string;
};

export async function fetchCommerceSettings(): Promise<CommerceSettings | null> {
  const response = await fetch("/api/commerce/settings", { cache: "no-store" });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CommerceSettings;
}

export async function submitCheckout(
  payload: CheckoutPayload,
): Promise<CheckoutResponse | null> {
  const response = await fetch("/api/commerce/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as CheckoutResponse;
}

export async function fetchOrderHistory(phone: string) {
  const params = new URLSearchParams({ phone });
  const response = await fetch(`/api/commerce/orders?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as Array<{
    id: string;
    status: string;
    customerNote: string;
    total: number;
    createdAt: string;
  }>;
}

export async function validateCoupon(code: string, subtotal: number) {
  const response = await fetch("/api/commerce/coupons", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, subtotal }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as {
    code: string;
    title: string;
    discount: number;
  };
}

export async function createRazorpayOrder(amount: number) {
  const response = await fetch("/api/commerce/razorpay-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as { id: string };
}
