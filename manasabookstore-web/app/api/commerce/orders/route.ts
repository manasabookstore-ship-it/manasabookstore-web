import { NextResponse } from "next/server";

import { CheckoutPayload } from "@/lib/commerce-api";
import {
  createCommerceOrderInSupabase,
  getCommerceSettingsFromSupabase,
  getOrderHistoryFromSupabase,
  validateCouponInSupabase,
} from "@/lib/supabase/commerce-data";

export async function GET(request: Request) {
  const phone = new URL(request.url).searchParams.get("phone") ?? "";
  return NextResponse.json(await getOrderHistoryFromSupabase(phone));
}

export async function POST(request: Request) {
  const payload = (await request.json()) as CheckoutPayload;
  const settings = await getCommerceSettingsFromSupabase();

  if (!settings.onlineOrderingEnabled) {
    return NextResponse.json(
      { error: "Online ordering is disabled" },
      { status: 403 },
    );
  }

  if (payload.fulfillment === "pickup" && !settings.pickupEnabled) {
    return NextResponse.json({ error: "Pickup is disabled" }, { status: 403 });
  }

  if (payload.fulfillment === "delivery" && !settings.deliveryEnabled) {
    return NextResponse.json({ error: "Delivery is disabled" }, { status: 403 });
  }

  const subtotal = payload.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const coupon = payload.couponCode
    ? await validateCouponInSupabase(payload.couponCode, subtotal)
    : null;
  const order = await createCommerceOrderInSupabase(
    payload,
    coupon?.discount ?? 0,
  );

  if (!order) {
    return NextResponse.json(
      { error: "Order could not be created" },
      { status: 500 },
    );
  }

  return NextResponse.json(order);
}

