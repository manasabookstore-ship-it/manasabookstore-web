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
      phonePeUpiId: "",
      phonePeMerchantName: "Manasa Book Center",
      onlineUpiPaymentEnabled: false,
      payAtStoreEnabled: true,
      pickupPaymentEnabled: true,
      homepageNotice: "",
      homepageNoticeEnabled: false,
    };
  }

  const { data } = await supabase
    .from("store_settings")
    .select(
      "online_ordering_enabled, pickup_enabled, delivery_enabled, phonepe_upi_id, phonepe_merchant_name, online_upi_payment_enabled, pay_at_store_enabled, pickup_payment_enabled, homepage_notice, homepage_notice_enabled",
    )
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  return {
    onlineOrderingEnabled: data?.online_ordering_enabled ?? false,
    pickupEnabled: data?.pickup_enabled ?? false,
    deliveryEnabled: data?.delivery_enabled ?? false,
    phonePeUpiId: data?.phonepe_upi_id ?? "",
    phonePeMerchantName: data?.phonepe_merchant_name ?? "Manasa Book Center",
    onlineUpiPaymentEnabled: data?.online_upi_payment_enabled ?? false,
    payAtStoreEnabled: data?.pay_at_store_enabled ?? true,
    pickupPaymentEnabled: data?.pickup_payment_enabled ?? true,
    homepageNotice: data?.homepage_notice ?? "",
    homepageNoticeEnabled: data?.homepage_notice_enabled ?? false,
  };
}

export async function updateCommerceSettingsInSupabase(
  settings: CommerceSettings,
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
    phonepe_upi_id: settings.phonePeUpiId.trim() || null,
    phonepe_merchant_name:
      settings.phonePeMerchantName.trim() || "Manasa Book Center",
    online_upi_payment_enabled: settings.onlineUpiPaymentEnabled,
    pay_at_store_enabled: settings.payAtStoreEnabled,
    pickup_payment_enabled: settings.pickupPaymentEnabled,
    homepage_notice: settings.homepageNotice.trim() || null,
    homepage_notice_enabled: settings.homepageNoticeEnabled,
  };

  const query = current
    ? supabase
        .from("store_settings")
        .update(payload)
        .eq("id", current.id)
        .select(
          "online_ordering_enabled, pickup_enabled, delivery_enabled, phonepe_upi_id, phonepe_merchant_name, online_upi_payment_enabled, pay_at_store_enabled, pickup_payment_enabled, homepage_notice, homepage_notice_enabled",
        )
        .single()
    : supabase
        .from("store_settings")
        .insert(payload)
        .select(
          "online_ordering_enabled, pickup_enabled, delivery_enabled, phonepe_upi_id, phonepe_merchant_name, online_upi_payment_enabled, pay_at_store_enabled, pickup_payment_enabled, homepage_notice, homepage_notice_enabled",
        )
        .single();

  const { data, error } = await query;

  if (error || !data) {
    return null;
  }

  return {
    onlineOrderingEnabled: data.online_ordering_enabled,
    pickupEnabled: data.pickup_enabled,
    deliveryEnabled: data.delivery_enabled,
    phonePeUpiId: data.phonepe_upi_id ?? "",
    phonePeMerchantName: data.phonepe_merchant_name ?? "Manasa Book Center",
    onlineUpiPaymentEnabled: data.online_upi_payment_enabled,
    payAtStoreEnabled: data.pay_at_store_enabled,
    pickupPaymentEnabled: data.pickup_payment_enabled,
    homepageNotice: data.homepage_notice ?? "",
    homepageNoticeEnabled: data.homepage_notice_enabled,
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
