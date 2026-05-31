import { categories } from "./site-data";

export type PublicProductSuggestion = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  source: "open-food-facts" | "google-books" | "open-library";
  description?: string;
};

function categorySlugFromName(name: string) {
  return (
    categories.find(
      (category) => category.name.toLowerCase() === name.toLowerCase(),
    )?.slug ?? "daily-essentials"
  );
}

function uniqueByName(items: PublicProductSuggestion[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.name.toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ManasaBookCenter/1.0 public product lookup",
      },
      next: { revalidate: 60 * 60 * 6 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function categorizeFood(tags: string) {
  if (/chocolate|snack|sweet|candy|beverage|drink|chips|crisps/i.test(tags)) {
    return "Gifts & Chocolates";
  }

  if (/hygiene|personal|soap|shampoo|toothpaste|beauty/i.test(tags)) {
    return "Personal Care";
  }

  return "Daily Essentials";
}

type OpenFoodFactsSearch = {
  products?: Array<{
    code?: string;
    product_name?: string;
    brands?: string;
    categories_tags?: string[];
  }>;
};

async function lookupOpenFoodFacts(query: string) {
  const data = await fetchJson<OpenFoodFactsSearch>(
    `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=6&fields=code,product_name,brands,categories_tags`,
  );

  return (data?.products ?? [])
    .filter((product) => product.product_name)
    .map((product) => {
      const tags = product.categories_tags?.join(" ") ?? "";
      const category = categorizeFood(tags);

      return {
        id: `off-${product.code ?? product.product_name}`,
        name: product.brands
          ? `${product.product_name} - ${product.brands}`
          : product.product_name ?? "",
        category,
        categorySlug: categorySlugFromName(category),
        source: "open-food-facts" as const,
      };
    });
}

type GoogleBooksSearch = {
  items?: Array<{
    id?: string;
    volumeInfo?: {
      title?: string;
      authors?: string[];
      publisher?: string;
      categories?: string[];
    };
  }>;
};

async function lookupGoogleBooks(query: string) {
  const data = await fetchJson<GoogleBooksSearch>(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=6`,
  );

  return (data?.items ?? [])
    .filter((book) => book.volumeInfo?.title)
    .map((book) => ({
      id: `gb-${book.id ?? book.volumeInfo?.title}`,
      name: book.volumeInfo?.authors?.[0]
        ? `${book.volumeInfo.title} - ${book.volumeInfo.authors[0]}`
        : book.volumeInfo?.title ?? "",
      category: "Books",
      categorySlug: "books",
      source: "google-books" as const,
      description: book.volumeInfo?.publisher ?? book.volumeInfo?.categories?.[0],
    }));
}

type OpenLibrarySearch = {
  docs?: Array<{
    key?: string;
    title?: string;
    author_name?: string[];
    publisher?: string[];
  }>;
};

async function lookupOpenLibrary(query: string) {
  const data = await fetchJson<OpenLibrarySearch>(
    `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=6`,
  );

  return (data?.docs ?? [])
    .filter((book) => book.title)
    .map((book) => ({
      id: `ol-${book.key ?? book.title}`,
      name: book.author_name?.[0]
        ? `${book.title} - ${book.author_name[0]}`
        : book.title ?? "",
      category: "Books",
      categorySlug: "books",
      source: "open-library" as const,
      description: book.publisher?.[0],
    }));
}

export async function lookupPublicProducts(query: string, limit = 8) {
  const value = query.trim();

  if (value.length < 3) {
    return [];
  }

  const [food, googleBooks, openLibrary] = await Promise.all([
    lookupOpenFoodFacts(value),
    lookupGoogleBooks(value),
    lookupOpenLibrary(value),
  ]);

  return uniqueByName([...food, ...googleBooks, ...openLibrary]).slice(0, limit);
}
