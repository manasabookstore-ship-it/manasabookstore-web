import { categories } from "@/lib/site-data";
import { createSupabaseServiceClient } from "./server";

export type PublicRequestedItem = {
  item: string;
  category: string;
  categorySlug: string;
  count: number;
  latestAt: string;
};

function valueFromLine(note: string, label: string) {
  const line = note
    .split("\n")
    .find((entry) => entry.toLowerCase().startsWith(`${label.toLowerCase()}:`));

  return line?.split(":").slice(1).join(":").trim() ?? "";
}

function categorySlugFromName(name: string) {
  return (
    categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase(),
    )?.slug ?? ""
  );
}

export async function getPublicRequestedItemsFromSupabase(
  limit = 8,
): Promise<PublicRequestedItem[]> {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from("orders")
    .select("customer_note, created_at, status")
    .eq("source", "website")
    .in("status", ["requested", "confirmed", "ready"])
    .order("created_at", { ascending: false })
    .limit(100);

  const grouped = new Map<string, PublicRequestedItem>();

  for (const order of data ?? []) {
    const note = order.customer_note ?? "";
    const item = valueFromLine(note, "Requested item");
    const category = valueFromLine(note, "Category") || "Requested Items";

    if (!item || item.length < 3) {
      continue;
    }

    const key = `${item.toLowerCase()}|${category.toLowerCase()}`;
    const current = grouped.get(key);

    if (current) {
      current.count += 1;
      if (order.created_at > current.latestAt) {
        current.latestAt = order.created_at;
      }
      continue;
    }

    grouped.set(key, {
      item,
      category,
      categorySlug: categorySlugFromName(category),
      count: 1,
      latestAt: order.created_at,
    });
  }

  return [...grouped.values()]
    .sort((left, right) => {
      if (right.count !== left.count) {
        return right.count - left.count;
      }

      return right.latestAt.localeCompare(left.latestAt);
    })
    .slice(0, limit);
}
