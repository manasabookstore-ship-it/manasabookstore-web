import { AdminProduct } from "./admin-data";

export type BarcodeLookupResult = {
  found: boolean;
  source: "inventory" | "open-library" | "google-books" | "open-food-facts" | "upcitemdb" | "none";
  product?: AdminProduct;
  suggestion?: {
    name: string;
    category: string;
    barcode: string;
    sku: string;
    price: number;
    stock: number;
    lowStock: number;
    description?: string;
  };
};

function cleanBarcode(code: string) {
  return code.replace(/\D/g, "");
}

function skuFromBarcode(code: string, prefix = "SCAN") {
  return `${prefix}-${code.slice(-8) || Date.now()}`;
}

function isBookCode(code: string) {
  return code.length === 10 || code.length === 13;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "ManasaBookCenter/1.0 barcode lookup",
      },
      next: { revalidate: 60 * 60 * 24 },
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

type OpenLibraryBook = {
  title?: string;
  authors?: Array<{ name?: string }>;
  publishers?: Array<{ name?: string }>;
};

async function lookupOpenLibrary(code: string): Promise<BarcodeLookupResult | null> {
  if (!isBookCode(code)) {
    return null;
  }

  const data = await fetchJson<Record<string, OpenLibraryBook>>(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${code}&format=json&jscmd=data`,
  );
  const book = data?.[`ISBN:${code}`];

  if (!book?.title) {
    return null;
  }

  const author = book.authors?.[0]?.name;
  return {
    found: true,
    source: "open-library",
    suggestion: {
      name: author ? `${book.title} - ${author}` : book.title,
      category: "Books",
      barcode: code,
      sku: skuFromBarcode(code, "BOOK"),
      price: 0,
      stock: 1,
      lowStock: 2,
      description: book.publishers?.[0]?.name,
    },
  };
}

type GoogleBooksResponse = {
  items?: Array<{
    volumeInfo?: {
      title?: string;
      authors?: string[];
      publisher?: string;
      categories?: string[];
    };
  }>;
};

async function lookupGoogleBooks(code: string): Promise<BarcodeLookupResult | null> {
  if (!isBookCode(code)) {
    return null;
  }

  const data = await fetchJson<GoogleBooksResponse>(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${code}`,
  );
  const info = data?.items?.[0]?.volumeInfo;

  if (!info?.title) {
    return null;
  }

  return {
    found: true,
    source: "google-books",
    suggestion: {
      name: info.authors?.[0] ? `${info.title} - ${info.authors[0]}` : info.title,
      category: "Books",
      barcode: code,
      sku: skuFromBarcode(code, "BOOK"),
      price: 0,
      stock: 1,
      lowStock: 2,
      description: info.publisher ?? info.categories?.[0],
    },
  };
}

type OpenFoodFactsResponse = {
  status?: number;
  product?: {
    product_name?: string;
    brands?: string;
    categories_tags?: string[];
  };
};

async function lookupOpenFoodFacts(code: string): Promise<BarcodeLookupResult | null> {
  const data = await fetchJson<OpenFoodFactsResponse>(
    `https://world.openfoodfacts.org/api/v2/product/${code}.json?fields=product_name,brands,categories_tags`,
  );
  const product = data?.product;

  if (data?.status !== 1 || !product?.product_name) {
    return null;
  }

  const tags = product.categories_tags?.join(" ") ?? "";
  const category = /chocolate|snack|sweet|candy|beverage|drink/i.test(tags)
    ? "Gifts & Chocolates"
    : /hygiene|personal|soap|shampoo|toothpaste/i.test(tags)
      ? "Personal Care"
      : "Daily Essentials";

  return {
    found: true,
    source: "open-food-facts",
    suggestion: {
      name: product.brands
        ? `${product.product_name} - ${product.brands}`
        : product.product_name,
      category,
      barcode: code,
      sku: skuFromBarcode(code, "ITEM"),
      price: 0,
      stock: 1,
      lowStock: 5,
    },
  };
}

type UpcItemDbResponse = {
  code?: string;
  items?: Array<{
    title?: string;
    brand?: string;
    category?: string;
  }>;
};

async function lookupUpcItemDb(code: string): Promise<BarcodeLookupResult | null> {
  const data = await fetchJson<UpcItemDbResponse>(
    `https://api.upcitemdb.com/prod/trial/lookup?upc=${code}`,
  );
  const item = data?.items?.[0];

  if (!item?.title) {
    return null;
  }

  return {
    found: true,
    source: "upcitemdb",
    suggestion: {
      name: item.brand ? `${item.title} - ${item.brand}` : item.title,
      category: "Daily Essentials",
      barcode: code,
      sku: skuFromBarcode(code, "ITEM"),
      price: 0,
      stock: 1,
      lowStock: 5,
      description: item.category,
    },
  };
}

export async function lookupExternalBarcode(
  rawCode: string,
): Promise<BarcodeLookupResult> {
  const code = cleanBarcode(rawCode);

  if (!code) {
    return { found: false, source: "none" };
  }

  const lookups = [
    lookupOpenLibrary,
    lookupGoogleBooks,
    lookupOpenFoodFacts,
    lookupUpcItemDb,
  ];

  for (const lookup of lookups) {
    const result = await lookup(code);
    if (result) {
      return result;
    }
  }

  return {
    found: false,
    source: "none",
    suggestion: {
      name: "",
      category: "Daily Essentials",
      barcode: code,
      sku: skuFromBarcode(code),
      price: 0,
      stock: 1,
      lowStock: 5,
    },
  };
}
