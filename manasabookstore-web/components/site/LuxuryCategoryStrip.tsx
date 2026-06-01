import Image from "next/image";
import Link from "next/link";

const categories = [
  { image: "/generated/category-books.png", title: "Books", href: "/category/books" },
  { image: "/generated/category-stationery.png", title: "Stationery", href: "/category/stationery" },
  { image: "/generated/category-school.png", title: "School Essentials", href: "/category/school-essentials" },
  { image: "/generated/category-project.png", title: "Project Materials", href: "/category/project-materials" },
  { image: "/generated/category-gifts.png", title: "Gifts", href: "/category/gifts-chocolates" },
  { image: "/generated/category-daily.png", title: "Daily Essentials", href: "/category/daily-essentials" },
];

export function LuxuryCategoryStrip() {
  return (
    <section className="mx-auto max-w-[1500px] px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <p className="font-serif text-xl font-semibold uppercase tracking-[0.14em] text-[#071f33] sm:text-2xl sm:tracking-[0.2em]">
          Shop by Category
        </p>
        <div className="mx-auto mt-3 h-px w-16 bg-[#c49345]" />
      </div>
      <div className="mt-8 grid gap-px overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-[#071f33]/10 sm:grid-cols-2 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group bg-[#fbf7ef] p-3 text-center transition hover:bg-white sm:p-4"
          >
            <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[8px] bg-[#efe4d3]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="mx-auto mt-4 max-w-[150px] font-serif text-2xl font-semibold leading-none text-[#071f33]">
              {category.title}
            </h3>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a5a12]">
              Explore
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
