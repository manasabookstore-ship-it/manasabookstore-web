import {
  Backpack,
  BookOpen,
  Calculator,
  Gift,
  MapPin,
  MessageCircle,
  NotebookPen,
  Phone,
  ShoppingBag,
  Truck,
  Wrench,
  HomeIcon,
} from "lucide-react";

const categories = [
  { icon: BookOpen, title: "Books" },
  { icon: NotebookPen, title: "Stationery" },
  { icon: Backpack, title: "School" },
  { icon: Calculator, title: "Geometry" },
  { icon: Wrench, title: "Projects" },
  { icon: Gift, title: "Gifts" },
];

const services = [
  { icon: HomeIcon, title: "In Store" },
  { icon: ShoppingBag, title: "Pickup" },
  { icon: Truck, title: "Delivery" },
];

export default function Page() {
  return (
    <main className="h-dvh overflow-hidden bg-[#fbf7ef] text-[#071f33]">
      <section className="relative mx-auto flex h-dvh max-w-[1600px] flex-col px-6 py-5 lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-32 top-10 h-[720px] w-[720px] rounded-full bg-[#0b3d2e]" />
          <div className="absolute bottom-[-220px] left-[-170px] h-[420px] w-[420px] rounded-full bg-[#f0dfc5]" />
          <div className="absolute left-[43%] top-[16%] text-[32rem] font-black leading-none text-[#071f33]/[0.035]">
            M
          </div>
        </div>

        <header className="relative z-10 flex h-[64px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d7b36a]/50 bg-white shadow-sm">
              <ShoppingBag className="h-6 w-6 text-[#0b3d2e]" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-[0.14em] text-[#0b3d2e]">
                MANASA
              </h1>
              <p className="text-[15px] font-bold uppercase tracking-[0.28em] text-[#b7791f]">
                Book Store
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-7 text-xs font-bold uppercase tracking-[0.18em] text-[#071f33]/70 md:flex">
            <span>Books</span>
            <span>Stationery</span>
            <span>Essentials</span>
            <span>Delivery</span>
          </div>

          <a
            href="tel:+919876543210"
            className="hidden rounded-2xl bg-[#071f33] px-5 py-3 text-sm font-bold text-white shadow-lg md:inline-flex"
          >
            <Phone className="mr-2 h-4 w-4" />
            +91 98765 43210
          </a>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-[#0b3d2e] shadow-sm">
              Chimakurthy, Andhra Pradesh
            </p>

            <h2 className="max-w-2xl text-[clamp(2.6rem,5.8vw,6.2rem)] font-black leading-[0.95] tracking-[-0.06em] text-[#071f33]">
              Everything Students Need.
              <span className="block text-[#d86b13]">All In One Place.</span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#071f33]/75 lg:text-lg">
              Books, stationery, hostel essentials, project materials, personal
              care, engineering tools, gifts and more — all at Manasa.
            </p>

            <div className="mt-6 grid max-w-xl grid-cols-3 gap-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div key={service.title} className="rounded-3xl bg-white p-4 shadow-sm">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0b3d2e] text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 text-sm font-black">{service.title}</h3>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href="https://wa.me/919876543210"
                className="inline-flex items-center rounded-2xl bg-[#0b3d2e] px-7 py-4 text-sm font-black uppercase tracking-wide text-white shadow-xl"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Order on WhatsApp
              </a>

              <a
                href="#"
                className="inline-flex items-center rounded-2xl border border-[#071f33]/20 bg-white px-7 py-4 text-sm font-black uppercase tracking-wide text-[#071f33] shadow-sm"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Visit Store
              </a>
            </div>
          </div>

          <div className="relative hidden h-[590px] lg:block">
            <div className="absolute right-0 top-1/2 h-[560px] w-[600px] -translate-y-1/2 rounded-[4rem] bg-white/70 shadow-2xl backdrop-blur" />

            <div className="absolute right-12 top-8 h-56 w-60 rounded-[3rem] bg-[#071f33] p-7 text-white shadow-2xl">
              <Backpack className="h-11 w-11" />
              <p className="mt-16 text-3xl font-black leading-none">School Essentials</p>
            </div>

            <div className="absolute left-20 top-20 h-44 w-52 rotate-[-8deg] rounded-[2rem] bg-white p-6 shadow-xl">
              <BookOpen className="h-8 w-8 text-[#0b3d2e]" />
              <p className="mt-12 text-2xl font-black">Books</p>
            </div>

            <div className="absolute left-64 top-36 h-48 w-52 rotate-[5deg] rounded-[2rem] bg-[#f5e6cc] p-6 shadow-xl">
              <NotebookPen className="h-8 w-8 text-[#d86b13]" />
              <p className="mt-12 text-2xl font-black">Stationery</p>
            </div>

            <div className="absolute left-10 bottom-36 h-48 w-56 rotate-[4deg] rounded-[2rem] bg-[#0b3d2e] p-6 text-white shadow-xl">
              <Calculator className="h-8 w-8" />
              <p className="mt-12 text-2xl font-black">Calculators</p>
            </div>

            <div className="absolute right-28 bottom-32 h-48 w-56 rotate-[-5deg] rounded-[2rem] bg-white p-6 shadow-xl">
              <Wrench className="h-8 w-8 text-[#071f33]" />
              <p className="mt-12 text-2xl font-black">Project Items</p>
            </div>

            <div className="absolute right-0 bottom-8 h-36 w-48 rounded-[2rem] bg-[#d86b13] p-6 text-white shadow-xl">
              <Gift className="h-7 w-7" />
              <p className="mt-8 text-xl font-black">Gifts & More</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 hidden h-[86px] grid-cols-6 gap-3 pb-0 lg:grid">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-[#071f33]/10 bg-white/80 px-4 py-2 shadow-sm backdrop-blur"
              >
                <Icon className="h-6 w-6 shrink-0 text-[#0b3d2e]" />
                <h3 className="text-xs font-black uppercase tracking-wide">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}