import { NextResponse } from "next/server";

import { lookupPublicProducts } from "@/lib/public-product-lookup";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  const suggestions = await lookupPublicProducts(query);

  return NextResponse.json({ suggestions });
}
