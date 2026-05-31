import { CartItem, CommerceSettings } from "@/lib/commerce";
import { CheckoutPayload } from "@/lib/commerce-api";
import { createSupabaseServiceClient } from "./server";

export async function getCommerceSettingsFromSupabase(): Promise<CommerceSettings> {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return {
      onlineOrderingEnabled: false,
      pickupEnabled: false,
      deliveryEnabled: false,
      razorpayEnabled: false,
    };
  }

  const { data } = await supabase
    .from("store_settings")
    .select("online_ordering_enabled, pickup_enabled, delivery_enabled")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return {
    onlineOrderingEnabled: data?.online_ordering_enabled ?? false,
    pickupEnabled: data?.pickup_enabled ?? false,
    deliveryEnabled: data?.delivery_enabled ?? false,
    razorpayEnabled: Boolean(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET,
    ),
  };
}

export async function updateCommerceSettingsInSupabase(
  settings: Omit<CommerceSettings, "razorpayEnabled">,
) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const { data: current } = await supabase
    .from("store_settings")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const payload = {
    store_name: "Manasa Book Center",
    online_ordering_enabled: settings.onlineOrderingEnabled,
    pickup_enabled: settings.pickupEnabled,
    delivery_enabled: settings.deliveryEnabled,
  };

  const query = current
    ? supabase
        .from("store_settings")
        .update(payload)
        .eq("id", current.id)
        .select("online_ordering_enabled, pickup_enabled, delivery_enabled")
        .single()
    : supabase
        .from("store_settings")
        .insert(payload)
        .select("online_ordering_enabled, pickup_enabled, delivery_enabled")
        .single();

  const { data, error } = await query;

  if (error || !data) {
    return null;
  }

  return {
    onlineOrderingEnabled: data.online_ordering_enabled,
    pickupEnabled: data.pickup_enabled,
    deliveryEnabled: data.delivery_enabled,
    razorpayEnabled: Boolean(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET,
    ),
  };
}

export async function validateCouponInSupabase(code: string, subtotal: number) {
  const supabase = createSupabaseServiceClient();

  if (!supabase || !code.trim()) {
    return null;
  }

  const { data } = await supabase
    .from("coupons")
    .select("code, title, discount_type, discount_value, is_active")
    .eq("code", code.trim().toUpperCase())
    .eq("is_active", true)
    .maybeSingle();

  if (!data) {
    return null;
  }

  const value = Number(data.discount_value);
  const discount =
    data.discount_type === "percent"
      ? Math.round((subtotal * value) / 100)
      : data.discount_type === "amount"
        ? value
        : 0;

  return {
    code: data.code,
    title: data.title,
    discount: Math.min(subtotal, discount),
  };
}

function orderNote(payload: CheckoutPayload, discount: number) {
  const lines = payload.items.map(
    (item) =>
      `${item.name} | ${item.category} | Qty ${item.quantity} | Rs ${item.price}`,
  );

  return [
    `Fulfillment: ${payload.fulfillment}`,
    `Payment: ${payload.paymentMode}`,
    payload.couponCode ? `Coupon: ${payload.couponCode}` : "Coupon: -",
    `Discount: Rs ${discount}`,
    `Email: ${payload.customer.email || "-"}`,
    `Address: ${payload.customer.address || "-"}`,
    "",
    "Items:",
    ...lines,
  ].join("\n");
}

async function syncInventory(items: CartItem[]) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return;
  }

  await Promise.all(
    items.map(async (item) => {
      const { data: product } = await supabase
        .from("products")
        .select("id, stock")
        .eq("slug", item.slug)
        .maybeSingle();

      if (!product) {
        return;
      }

      await supabase
        .from("products")
        .update({ stock: Math.max(0, product.stock - item.quantity) })
        .eq("id", product.id);
    }),
  );
}

export async function createCommerceOrderInSupabase(
  payload: CheckoutPayload,
  discount: number,
) {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return null;
  }

  const subtotal = payload.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const total = Math.max(0, subtotal - discount);

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: payload.customer.name,
      customer_phone: payload.customer.phone,
      customer_note: orderNote(payload, discount),
      source: "website",
      status: "requested",
      subtotal: total,
    })
    .select("id, status, subtotal")
    .single();

  if (error || !data) {
    return null;
  }

  await syncInventory(payload.items);

  return {
    id: data.id,
    status: data.status,
    total: Number(data.subtotal),
  };
}

export async function getOrderHistoryFromSupabase(phone: string) {
  const supabase = createSupabaseServiceClient();
  const digits = phone.replace(/\D/g, "");

  if (!supabase || digits.length < 10) {
    return [];
  }

  const { data } = await supabase
    .from("orders")
    .select("id, status, customer_note, subtotal, created_at")
    .ilike("customer_phone", `%${digits.slice(-10)}%`)
    .order("created_at", { ascending: false });

  return (data ?? []).map((order) => ({
    id: order.id,
    status: order.status,
    customerNote: order.customer_note ?? "",
    total: Number(order.subtotal),
    createdAt: order.created_at,
  }));
}

