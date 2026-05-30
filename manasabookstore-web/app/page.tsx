import Image from "next/image";
import {
  Backpack,
  BookOpen,
  Calculator,
  Clock3,
  Gift,
  HomeIcon,
  MapPin,
  MessageCircle,
  NotebookPen,
  PenLine,
  Phone,
  Ruler,
  School,
  ShoppingBag,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";

const phoneNumber = "+91 99480 30907";
const phoneHref = "tel:+919948030907";
const whatsAppHref =
  "https://wa.me/919948030907?text=Hi%20Manasa%20Book%20Store%2C%20I%20want%20to%20place%20an%20order.";
const mapsHref =
  "https://www.bing.com/search?qs=HS&pq=manasa&sk=CSYN1MT7LT1AS3OS1SC1&sc=17-6&q=manasa+book+center+chimakurthy&cvid=251d3bde35104bc19c1e61a7fa6ee600&gs_lcrp=EgRlZGdlKgkIABBFGDsY-QcyCQgAEEUYOxj5BzIGCAEQLhhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEEUYPDIGCAcQRRg8MgYICBBFGDzSAQgxNzU3ajBqOagCCLACAQ&form=EX0050&adppc=EDGEESS&pc=NMTS&source=chrome.ob&filters=local_ypid:%22YND014B12103196DA3%22&shtp=GetUrl&shid=8f0953d4-063e-46dc-8bf6-2763e8449e0e&shtk=TUFOQVNBIEJPT0sgU1RPUkU%3D&shdk=Rm91bmQgb24gQmluZy4%3D&shhk=nyeqIsbuOqZ%2Fv0ZDWksftvvVr%2BF9Z6bm%2F4LieaV46l8%3D";

const categories = [
  {
    icon: BookOpen,
    title: "Textbooks",
    text: "School, college, competitive and reference books.",
    tone: "bg-[#eaf4ef] text-[#0c4a34]",
  },
  {
    icon: NotebookPen,
    title: "Stationery",
    text: "Notebooks, pens, files, charts and daily supplies.",
    tone: "bg-[#fff3da] text-[#9a4c00]",
  },
  {
    icon: Backpack,
    title: "School Kits",
    text: "Bags, lunch boxes, bottles and classroom essentials.",
    tone: "bg-[#eaf0ff] text-[#163d7a]",
  },
  {
    icon: Calculator,
    title: "Engineering",
    text: "Calculators, drafter tools, scales and lab records.",
    tone: "bg-[#f4edff] text-[#59318f]",
  },
  {
    icon: Wrench,
    title: "Projects",
    text: "Thermocol, craft boards, wires and project material.",
    tone: "bg-[#eef7f8] text-[#155e63]",
  },
  {
    icon: Gift,
    title: "Gifts",
    text: "Greeting cards, gift wrap, small surprises and more.",
    tone: "bg-[#ffecef] text-[#9f2438]",
  },
];

const services = [
  {
    icon: HomeIcon,
    title: "In-store help",
    text: "Find the right book list, school kit or project supply faster.",
  },
  {
    icon: ShoppingBag,
    title: "Quick pickup",
    text: "Send your list on WhatsApp and collect packed items.",
  },
  {
    icon: Truck,
    title: "Local delivery",
    text: "Delivery support around Chimakurthy for eligible orders.",
  },
];

const stats = [
  { value: "Books", label: "school, college and exams" },
  { value: "Tools", label: "geometry and engineering" },
  { value: "Gifts", label: "cards, wraps and small picks" },
];

function ManasaLogo() {
  return (
    <Image
      src="/manasa-logo.svg"
      alt="Manasa Book Store"
      width={205}
      height={64}
      priority
      className="h-14 w-auto sm:h-16"
    />
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#071f33]">
      <section className="relative min-h-[92vh] overflow-hidden bg-[#071f33] text-white">
        <Image
          src="/manasa-store-hero.png"
          alt="Books, stationery, calculators, school bags and gift supplies arranged inside a bookstore"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#071f33]/62" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-[#fbf7ef] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-4">
            <a
              href="#home"
              className="min-w-0 rounded-[12px] bg-[#071f33]/24 p-1 ring-1 ring-white/14 backdrop-blur transition hover:bg-[#071f33]/38"
            >
              <ManasaLogo />
            </a>

            <nav className="hidden items-center gap-6 rounded-[10px] bg-[#071f33]/24 px-5 py-3 text-sm font-semibold text-white/82 ring-1 ring-white/12 backdrop-blur md:flex">
              <a className="transition hover:text-white" href="#products">
                Products
              </a>
              <a className="transition hover:text-white" href="#services">
                Services
              </a>
              <a className="transition hover:text-white" href="#visit">
                Visit
              </a>
            </nav>

            <a
              href={phoneHref}
              className="hidden h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-4 text-sm font-black text-[#071f33] shadow-sm transition hover:bg-[#ffe3b1] sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {phoneNumber}
            </a>
          </header>

          <div
            id="home"
            className="flex flex-1 items-center pb-16 pt-20 sm:pt-24 lg:pb-20"
          >
            <div className="max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-[8px] bg-white/12 px-4 py-2 text-sm font-bold text-[#ffe1ac] ring-1 ring-white/18 backdrop-blur">
                <MapPin className="h-4 w-4" />
                Chimakurthy, Andhra Pradesh
              </p>
              <h1 className="text-5xl font-black leading-[0.96] text-white sm:text-6xl lg:text-7xl">
                Manasa Book Store
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
                Books, stationery, school essentials, project materials,
                engineering tools, personal care items and gifts in one trusted
                local shop.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsAppHref}
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[8px] bg-[#10a36f] px-6 text-sm font-black text-white shadow-lg transition hover:bg-[#0d8e60]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Order on WhatsApp
                </a>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-13 items-center justify-center gap-2 rounded-[8px] bg-white px-6 text-sm font-black text-[#071f33] shadow-lg transition hover:bg-[#ffe3b1]"
                >
                  <MapPin className="h-5 w-5" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>

          <div className="grid gap-3 pb-3 sm:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.value}
                className="rounded-[8px] border border-white/18 bg-white/12 p-4 backdrop-blur"
              >
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="mt-1 text-sm leading-6 text-white/76">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black text-[#d86b13]">Daily Needs</p>
            <h2 className="mt-2 max-w-2xl text-3xl font-black leading-tight sm:text-4xl">
              A sharper shelf for students, parents and makers.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-[#071f33]/70">
            From a school reopening list to a last-minute project chart, Manasa
            keeps the essentials easy to find and quick to buy.
          </p>
        </div>

        <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-[8px] ${item.tone}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#071f33]/66">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="services" className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <p className="text-sm font-black text-[#0b6b4a]">
                Shop Your Way
              </p>
              <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
                Walk in, send a list, or ask for delivery.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#071f33]/70">
                The store is built around quick everyday buying: clear lists,
                fast packing and practical help when a product has to match a
                school or college requirement.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="rounded-[8px] border border-[#071f33]/10 bg-[#fbf7ef] p-5"
                  >
                    <Icon className="h-7 w-7 text-[#d86b13]" />
                    <h3 className="mt-5 text-lg font-black">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[#071f33]/66">
                      {service.text}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid overflow-hidden rounded-[8px] bg-[#092b24] text-white lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <p className="text-sm font-black text-[#ffd493]">
              For Every List
            </p>
            <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
              Bring the requirement. Leave with the right items.
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                { icon: School, label: "School reopening kits" },
                { icon: Ruler, label: "Geometry and drawing supplies" },
                { icon: PenLine, label: "Records, charts and stationery" },
                { icon: Sparkles, label: "Gifts, cards and wrap" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] bg-white/12">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-bold text-white/88">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative min-h-72">
            <Image
              src="/manasa-store-hero.png"
              alt="A close view of stationery, books and school supplies at Manasa Book Store"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section id="visit" className="border-t border-[#071f33]/10 bg-[#f5ead7]">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
          <div>
            <p className="text-sm font-black text-[#d86b13]">Visit Manasa</p>
            <h2 className="mt-2 text-3xl font-black">Ready when you are.</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#071f33]/70">
              Call ahead, send a WhatsApp list, or stop by the store in
              Chimakurthy for books and everyday supplies.
            </p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm font-bold text-[#071f33]/78">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-[#0b6b4a]" />
                Open daily
              </span>
              <span className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#0b6b4a]" />
                {phoneNumber}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <a
              href={whatsAppHref}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-[#0b6b4a] px-5 text-sm font-black text-white shadow-sm transition hover:bg-[#09563c]"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-5 text-sm font-black text-[#071f33] shadow-sm transition hover:bg-[#fff7ea]"
            >
              <MapPin className="h-5 w-5" />
              Directions
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
