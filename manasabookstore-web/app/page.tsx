import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  BookMarked,
  CheckCircle2,
  Clock3,
  MapPin,
  MousePointerClick,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
} from "lucide-react";

import { CategoryCard } from "@/components/site/CategoryCard";
import { Hero } from "@/components/site/Hero";
import { ProductCard } from "@/components/site/ProductCard";
import { StoreMap } from "@/components/site/StoreMap";
import {
  categories,
  featuredProducts,
  offerProducts,
  site,
} from "@/lib/site-data";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black text-[#d86b13]">
              Featured Categories
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              Everything arranged around real store needs.
            </h2>
          </div>
          <Link
            href="/categories"
            className="inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#071f33] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b6b4a]"
          >
            Browse all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.slice(0, 6).map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 lg:py-22">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-[#0b6b4a]">
                Store Highlights
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
                A local store experience with a sharper digital future.
              </h2>
              <p className="mt-4 text-base leading-8 text-[#071f33]/68">
                Manasa is positioned for students, parents, hostellers and
                project makers who need practical items quickly and clearly.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: BookMarked,
                  title: "Student-first selection",
                  text: "Books, guides, notebooks, records, charts and tools grouped by use.",
                },
                {
                  icon: Store,
                  title: "Trusted local presence",
                  text: "A familiar Chimakurthy store with a more polished online front.",
                },
                {
                  icon: ShieldCheck,
                  title: "Clear product discovery",
                  text: "Categories and product pages help customers browse before visiting.",
                },
                {
                  icon: Clock3,
                  title: "Digital features soon",
                  text: "Online ordering, pickup, and delivery features are coming soon.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="rounded-[8px] border border-[#071f33]/10 bg-[#fbf7ef] p-5 transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Icon className="h-7 w-7 text-[#0b6b4a]" />
                    <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#071f33]/64">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black text-[#d86b13]">
              Featured Products
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              A premium catalog preview without backend complexity.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex h-12 items-center gap-2 rounded-[8px] border border-[#071f33]/12 bg-white px-5 text-sm font-black text-[#071f33] transition hover:-translate-y-0.5 hover:border-[#0b6b4a]/35"
          >
            View products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[#071f33] py-16 text-white lg:py-22">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:px-10">
          <div>
            <BadgePercent className="h-9 w-9 text-[#ffd493]" />
            <p className="mt-5 text-sm font-black text-[#ffd493]">Offers</p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
              Useful combos and seasonal picks.
            </h2>
            <p className="mt-4 text-base leading-8 text-white/68">
              Offer cards are ready for future campaigns while keeping today’s
              site simple and fast.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {offerProducts.slice(0, 2).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="grid overflow-hidden rounded-[8px] bg-[#f5ead7] lg:grid-cols-[1fr_0.86fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <PackageCheck className="h-9 w-9 text-[#0b6b4a]" />
            <p className="mt-5 text-sm font-black text-[#d86b13]">
              Request Item CTA
            </p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight sm:text-5xl">
              Looking for a specific book or item?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[#071f33]/68">
              Customers can share book names, school lists, project materials or
              product requirements. This keeps the homepage useful today while
              full commerce features are still being built.
            </p>
            <Link
              href="/request"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#0b6b4a] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#09563c]"
            >
              Request an item
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid content-center gap-3 bg-[#0b6b4a] p-6 text-white sm:p-8 lg:p-10">
            {[
              "Book lists",
              "Project materials",
              "Engineering tools",
              "School essentials",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[8px] bg-white/12 p-4"
              >
                <CheckCircle2 className="h-5 w-5 text-[#ffd493]" />
                <span className="text-sm font-black">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-22">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-10">
          <div>
            <p className="text-sm font-black text-[#d86b13]">Location</p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">
              Visit Manasa Book Center in Chimakurthy.
            </h2>
            <p className="mt-4 text-base leading-8 text-[#071f33]/68">
              Find the store on Kurnool Main Road and use the website to
              understand categories, product types and upcoming digital
              services.
            </p>
            <a
              href={site.directions}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#071f33] px-5 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#0b6b4a]"
            >
              <MapPin className="h-4 w-4" />
              Get directions
            </a>
          </div>
          <StoreMap />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-22">
        <div className="rounded-[8px] bg-[#071f33] p-6 text-white sm:p-8 lg:p-10">
          <p className="text-sm font-black text-[#ffd493]">
            Future Digital Services
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">
              The store is preparing for a more digital customer experience.
            </h2>
            <p className="text-base leading-8 text-white/68">
              Online ordering, pickup, and delivery features are coming soon.
              For now, this website creates a premium discovery layer customers
              can trust.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Searchable catalog",
                text: "A faster way to explore product types before visiting.",
              },
              {
                icon: MousePointerClick,
                title: "Online ordering soon",
                text: "Prepared for future ordering flows without adding backend now.",
              },
              {
                icon: Sparkles,
                title: "Modern local commerce",
                text: "A polished foundation that can grow into mobile and web commerce.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  className="rounded-[8px] border border-white/12 bg-white/10 p-5"
                >
                  <Icon className="h-7 w-7 text-[#ffd493]" />
                  <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/64">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
