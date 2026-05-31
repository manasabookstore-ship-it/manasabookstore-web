import { ProductBrowser } from "@/components/site/ProductBrowser";
import { categories, products } from "@/lib/site-data";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <div className="max-w-3xl">
        <p className="text-sm font-black text-[#d86b13]">Products</p>
        <h1 className="mt-2 text-4xl font-black leading-tight sm:text-5xl">
          Browse products by need, category and availability.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#071f33]/68">
          Search dummy product data, filter by category, explore featured picks
          and open product pages for related items. No backend, checkout, cart
          or payments are included.
        </p>
      </div>

      <div className="mt-8">
        <ProductBrowser products={products} categories={categories} />
      </div>
    </main>
  );
}
