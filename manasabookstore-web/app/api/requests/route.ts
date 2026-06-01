import { NextResponse } from "next/server";

import { CustomerRequestPayload } from "@/lib/request-api";
import { site } from "@/lib/site-data";
import { createSupabaseServiceClient } from "@/lib/supabase/server";
import {
  getOwnerWhatsAppPhone,
  sendWhatsAppTextNotification,
} from "@/lib/whatsapp";

function buildRequestMessage(
  values: CustomerRequestPayload,
  requestId: string,
) {
  return [
    "New item request - Manasa Book Center",
    "",
    `Request ID: ${requestId}`,
    `Name: ${values.name}`,
    `Phone: ${values.phone}`,
    `Category: ${values.category}`,
    `Requested item: ${values.requestedItem}`,
    values.notes ? `Notes: ${values.notes}` : "Notes: -",
  ].join("\n");
}

function validate(values: CustomerRequestPayload) {
  const digits = values.phone?.replace(/\D/g, "") ?? "";

  return Boolean(
    values.name?.trim().length >= 2 &&
      digits.length >= 10 &&
      values.category &&
      values.requestedItem?.trim().length >= 3,
  );
}

export async function POST(request: Request) {
  const values = (await request.json()) as CustomerRequestPayload;

  if (!validate(values)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 },
    );
  }

  const customerNote = [
    `Category: ${values.category}`,
    `Requested item: ${values.requestedItem}`,
    values.notes ? `Notes: ${values.notes}` : "Notes: -",
  ].join("\n");

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: values.name.trim(),
      customer_phone: values.phone.trim(),
      customer_note: customerNote,
      status: "requested",
      source: "website",
      subtotal: 0,
    })
    .select("id")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Request could not be saved" },
      { status: 500 },
    );
  }

  const message = buildRequestMessage(values, data.id);
  const phone = site.phoneHref.replace(/\D/g, "");
  const whatsappHref = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const ownerPhone = getOwnerWhatsAppPhone();
  const ownerNotification = ownerPhone
    ? await sendWhatsAppTextNotification({ to: ownerPhone, message })
    : { configured: false, sent: false };

  return NextResponse.json({
    id: data.id,
    message,
    whatsappHref,
    ownerNotified: ownerNotification.sent,
    ownerNotificationConfigured: ownerNotification.configured,
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const phone = url.searchParams.get("phone")?.replace(/\D/g, "") ?? "";
  const requestId = url.searchParams.get("id")?.trim() ?? "";

  if (phone.length < 10) {
    return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json([]);
  }

  let query = supabase
    .from("orders")
    .select("id, status, customer_note, created_at")
    .eq("source", "website")
    .ilike("customer_phone", `%${phone.slice(-10)}%`)
    .order("created_at", { ascending: false })
    .limit(10);

  if (requestId) {
    query = query.eq("id", requestId);
  }

  const { data } = await query;

  return NextResponse.json(
    (data ?? []).map((order) => ({
      id: order.id,
      status: order.status,
      customerNote: order.customer_note,
      createdAt: order.created_at,
    })),
  );
}
