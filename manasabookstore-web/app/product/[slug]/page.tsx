import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, PackageCheck } from "lucide-react";

import { AvailabilityBadge } from "@/components/site/AvailabilityBadge";
import { ProductCard } from "@/components/site/ProductCard";
import { RecentlyViewedProducts } from "@/components/site/RecentlyViewedProducts";
import {
  featuredProducts,
  getProduct,
  getProductsByCategory,
  products,
  site,
} from "@/lib/site-data";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);
  const fallbackRelated = featuredProducts
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);
  const related = relatedProducts.length > 0 ? relatedProducts : fallbackRelated;

  return (
    <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm font-black text-[#0b6b4a]"
      >
        <ArrowLeft className="h-4 w-4" />
        All products
      </Link>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <div className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <div className="grid aspect-square place-items-center rounded-[8px] bg-[#fbf7ef]">
            <div className="grid h-40 w-40 place-items-center rounded-full bg-[#0b6b4a]/10 text-[#0b6b4a]">
              <PackageCheck className="h-16 w-16" />
            </div>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[8px] bg-[#fbf7ef] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#071f33]/50">
                Category
              </p>
              <p className="mt-1 text-sm font-black">{product.category}</p>
            </div>
            <div className="rounded-[8px] bg-[#fbf7ef] p-4">
              <p className="text-xs font-black uppercase tracking-wide text-[#071f33]/50">
                Availability
              </p>
              <div className="mt-2">
                <AvailabilityBadge availability={product.availability} />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[8px] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <AvailabilityBadge availability={product.availability} />
            {product.featured ? (
              <span className="rounded-full bg-[#071f33] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                Featured
              </span>
            ) : null}
          </div>
          <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#d86b13]">
            {product.category}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-black text-[#0b6b4a]">
            {product.price}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#071f33]/70">
            {product.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#071f33]/5 px-3 py-1 text-xs font-bold text-[#071f33]/65"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-8 rounded-[8px] bg-[#fbf7ef] p-4">
            <p className="text-sm font-black text-[#071f33]">Availability note</p>
            <p className="mt-1 text-sm leading-6 text-[#071f33]/68">
              {product.stockNote}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={site.whatsapp}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#10a36f] px-5 text-sm font-black text-white"
            >
              <MessageCircle className="h-5 w-5" />
              Ask availability
            </a>
            <Link
              href="/request"
              className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#071f33]/12 bg-white px-5 text-sm font-black text-[#071f33]"
            >
              Request similar item
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <p className="text-sm font-black text-[#d86b13]">Related products</p>
        <h2 className="mt-2 text-3xl font-black">Customers may also browse</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <RecentlyViewedProducts currentProduct={product} products={products} />
    </main>
  );
}
