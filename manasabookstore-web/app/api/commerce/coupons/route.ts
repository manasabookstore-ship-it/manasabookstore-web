import { NextResponse } from "next/server";

import { validateCouponInSupabase } from "@/lib/supabase/commerce-data";

export async function POST(request: Request) {
  const body = (await request.json()) as { code?: string; subtotal?: number };
  const coupon = await validateCouponInSupabase(
    body.code ?? "",
    Number(body.subtotal ?? 0),
  );

  if (!coupon) {
    return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
  }

  return NextResponse.json(coupon);
}

