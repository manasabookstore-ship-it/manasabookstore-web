import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const body = (await request.json()) as { amount?: number };

  if (!keyId || !keySecret) {
    return NextResponse.json(
      { error: "Razorpay is not configured" },
      { status: 503 },
    );
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(Number(body.amount ?? 0) * 100),
      currency: "INR",
      receipt: `mbc_${Date.now()}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Razorpay order could not be created" },
      { status: 500 },
    );
  }

  return NextResponse.json(await response.json());
}
