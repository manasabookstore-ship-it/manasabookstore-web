import { Product } from "@/lib/site-data";
import { slugify } from "./admin-mappers";
import { createSupabaseServiceClient } from "./server";

type ProductRow = {
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  is_featured: boolean;
  image_url: string | null;
  categories?: { name: string; slug: string } | null;
};

export async function getPublicProductsFromSupabase(
  limit = 12,
): Promise<Product[]> {
  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return [];
  }

  const { data } = await supabase
    .from("products")
    .select("name, slug, description, price, stock, is_featured, image_url, categories(name, slug)")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  return ((data ?? []) as ProductRow[]).map((product) => {
    const category = product.categories?.name ?? "Daily Essentials";
    const categorySlug = product.categories?.slug ?? slugify(category);

    return {
      slug: product.slug,
      name: product.name,
      category,
      categorySlug,
      price: `Rs ${Number(product.price).toLocaleString("en-IN")}`,
      description:
        product.description ??
        "Store inventory item added by Manasa Book Center.",
      tags: ["Store inventory", category],
      availability:
        product.stock <= 0 ? "request" : product.stock <= 5 ? "limited" : "available",
      featured: product.is_featured,
      stockNote:
        product.stock > 0
          ? `${product.stock} in store inventory`
          : "Request availability from the store.",
      imageUrl: product.image_url ?? "",
    };
  });
}

export async function getPublicProductBySlugFromSupabase(slug: string) {
  const products = await getPublicProductsFromSupabase(100);
  return products.find((product) => product.slug === slug) ?? null;
}
