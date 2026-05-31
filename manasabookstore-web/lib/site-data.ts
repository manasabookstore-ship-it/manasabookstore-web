export type IconName =
  | "book"
  | "pen"
  | "backpack"
  | "wrench"
  | "calculator"
  | "bed"
  | "heart"
  | "gift"
  | "shopping";

export type Category = {
  slug: string;
  name: string;
  description: string;
  icon: IconName;
  accent: string;
};

export type Product = {
  slug: string;
  name: string;
  categorySlug: string;
  category: string;
  price: string;
  description: string;
  tags: string[];
  availability?: "available" | "limited" | "request";
  featured?: boolean;
  offer?: string;
  stockNote: string;
};

export type OfferType = "seasonal" | "school" | "festival" | "combo";

export type StoreOffer = {
  id: string;
  title: string;
  type: OfferType;
  description: string;
  highlight: string;
  validUntil: string;
  tags: string[];
};

export type Coupon = {
  code: string;
  title: string;
  description: string;
  terms: string;
  type: OfferType;
};

export const site = {
  name: "Manasa Book Center",
  shortName: "Manasa",
  location: "Chimakurthy, Andhra Pradesh",
  address: "Kurnool Main Road, Chimakurthy, Andhra Pradesh 523226",
  phone: "+91 99480 30907",
  phoneHref: "tel:+919948030907",
  whatsapp:
    "https://wa.me/919948030907?text=Hi%20Manasa%20Book%20Center%2C%20I%20want%20to%20place%20an%20order.",
  directions:
    "https://www.google.com/maps/search/?api=1&query=Manasa%20Book%20Center%2C%20Kurnool%20Main%20Road%2C%20Chimakurthy%2C%20Andhra%20Pradesh%20523226",
  mapEmbed:
    "https://www.google.com/maps?q=Manasa%20Book%20Center%2C%20Kurnool%20Main%20Road%2C%20Chimakurthy%2C%20Andhra%20Pradesh%20523226&output=embed",
};

export const categories: Category[] = [
  {
    slug: "books",
    name: "Books",
    description: "School, college, reference and competitive exam books.",
    icon: "book",
    accent: "bg-[#eaf4ef] text-[#0b6b4a]",
  },
  {
    slug: "stationery",
    name: "Stationery",
    description: "Notebooks, pens, files, art sheets and daily supplies.",
    icon: "pen",
    accent: "bg-[#fff3da] text-[#9a4c00]",
  },
  {
    slug: "school-essentials",
    name: "School Essentials",
    description: "Bags, bottles, lunch boxes and ready school kits.",
    icon: "backpack",
    accent: "bg-[#eaf0ff] text-[#163d7a]",
  },
  {
    slug: "project-materials",
    name: "Project Materials",
    description: "Charts, craft boards, thermocol, wiring and model supplies.",
    icon: "wrench",
    accent: "bg-[#eef7f8] text-[#155e63]",
  },
  {
    slug: "engineering-tools",
    name: "Engineering Tools",
    description: "Calculators, drafter tools, drawing sheets and lab records.",
    icon: "calculator",
    accent: "bg-[#f4edff] text-[#59318f]",
  },
  {
    slug: "hostel-essentials",
    name: "Hostel Essentials",
    description: "Storage, bedding helpers and compact room essentials.",
    icon: "bed",
    accent: "bg-[#edf7ff] text-[#075985]",
  },
  {
    slug: "personal-care",
    name: "Personal Care",
    description: "Everyday grooming, care and hygiene basics for students.",
    icon: "heart",
    accent: "bg-[#ffecef] text-[#9f2438]",
  },
  {
    slug: "gifts-chocolates",
    name: "Gifts & Chocolates",
    description: "Greeting cards, gift wrap, chocolates and small surprises.",
    icon: "gift",
    accent: "bg-[#fff1f2] text-[#be123c]",
  },
  {
    slug: "daily-essentials",
    name: "Daily Essentials",
    description: "Convenience items for campus, hostel and home routines.",
    icon: "shopping",
    accent: "bg-[#f1f5e8] text-[#55720f]",
  },
];

export const products: Product[] = [
  {
    slug: "school-textbook-bundle",
    name: "School Textbook Bundle",
    categorySlug: "books",
    category: "Books",
    price: "List based",
    description: "Class-wise textbooks and workbooks packed from your school list.",
    tags: ["School", "Bundles", "Fast pickup"],
    availability: "request",
    featured: true,
    stockNote: "Bring or send your book list.",
  },
  {
    slug: "competitive-exam-guides",
    name: "Competitive Exam Guides",
    categorySlug: "books",
    category: "Books",
    price: "From ₹149",
    description: "Reference guides, practice books and exam preparation material.",
    tags: ["Guides", "Reference"],
    availability: "limited",
    stockNote: "Popular titles rotate weekly.",
  },
  {
    slug: "premium-notebook-pack",
    name: "Premium Notebook Pack",
    categorySlug: "stationery",
    category: "Stationery",
    price: "From ₹120",
    description: "Ruled, unruled and long notebooks for class and college work.",
    tags: ["Notebooks", "Value pack"],
    availability: "available",
    featured: true,
    offer: "Back-to-school pricing",
    stockNote: "Multiple sizes available.",
  },
  {
    slug: "pen-pencil-writing-kit",
    name: "Pen & Pencil Writing Kit",
    categorySlug: "stationery",
    category: "Stationery",
    price: "From ₹49",
    description: "Daily writing kit with pens, pencils, eraser, sharpener and scale.",
    tags: ["Daily use", "Kit"],
    availability: "available",
    stockNote: "Good for school bags.",
  },
  {
    slug: "school-bag-selection",
    name: "School Bag Selection",
    categorySlug: "school-essentials",
    category: "School Essentials",
    price: "From ₹399",
    description: "Durable school bags in practical sizes for younger and senior students.",
    tags: ["Bags", "Durable"],
    availability: "limited",
    featured: true,
    stockNote: "Ask for latest colors.",
  },
  {
    slug: "lunch-bottle-combo",
    name: "Lunch Box & Bottle Combo",
    categorySlug: "school-essentials",
    category: "School Essentials",
    price: "From ₹199",
    description: "Everyday lunch and water bottle combinations for school routines.",
    tags: ["Combo", "School"],
    availability: "available",
    offer: "Combo savings",
    stockNote: "Seasonal designs in store.",
  },
  {
    slug: "science-project-board-kit",
    name: "Science Project Board Kit",
    categorySlug: "project-materials",
    category: "Project Materials",
    price: "From ₹99",
    description: "Charts, color sheets, foam board and craft basics for displays.",
    tags: ["Projects", "Charts"],
    availability: "available",
    stockNote: "Same-day project basics.",
  },
  {
    slug: "model-making-supplies",
    name: "Model Making Supplies",
    categorySlug: "project-materials",
    category: "Project Materials",
    price: "From ₹30",
    description: "Thermocol, sticks, glue, cutters and small materials for models.",
    tags: ["Craft", "Models"],
    availability: "limited",
    stockNote: "Ask staff for matching items.",
  },
  {
    slug: "scientific-calculator",
    name: "Scientific Calculator",
    categorySlug: "engineering-tools",
    category: "Engineering Tools",
    price: "From ₹799",
    description: "College-ready calculators for engineering and science courses.",
    tags: ["Calculator", "College"],
    availability: "limited",
    featured: true,
    stockNote: "Course-approved models available.",
  },
  {
    slug: "engineering-drawing-kit",
    name: "Engineering Drawing Kit",
    categorySlug: "engineering-tools",
    category: "Engineering Tools",
    price: "From ₹249",
    description: "Drafter, set squares, scales and sheets for drawing classes.",
    tags: ["Drawing", "Tools"],
    availability: "available",
    stockNote: "Bundle options available.",
  },
  {
    slug: "hostel-storage-kit",
    name: "Hostel Storage Kit",
    categorySlug: "hostel-essentials",
    category: "Hostel Essentials",
    price: "From ₹299",
    description: "Compact organizers and everyday storage helpers for hostel rooms.",
    tags: ["Hostel", "Storage"],
    availability: "limited",
    stockNote: "Practical sizes in stock.",
  },
  {
    slug: "personal-care-basics",
    name: "Personal Care Basics",
    categorySlug: "personal-care",
    category: "Personal Care",
    price: "From ₹25",
    description: "Toiletries and personal care basics for students and hostel life.",
    tags: ["Care", "Everyday"],
    availability: "available",
    stockNote: "Daily-use brands available.",
  },
  {
    slug: "gift-wrap-card-set",
    name: "Gift Wrap & Card Set",
    categorySlug: "gifts-chocolates",
    category: "Gifts & Chocolates",
    price: "From ₹40",
    description: "Gift papers, cards, ribbons and small celebration add-ons.",
    tags: ["Gifts", "Cards"],
    availability: "available",
    stockNote: "Fresh designs in store.",
  },
  {
    slug: "chocolate-gift-picks",
    name: "Chocolate Gift Picks",
    categorySlug: "gifts-chocolates",
    category: "Gifts & Chocolates",
    price: "From ₹20",
    description: "Small chocolates and quick gifts for birthdays and celebrations.",
    tags: ["Chocolate", "Quick gift"],
    availability: "limited",
    offer: "Popular with students",
    stockNote: "Availability varies by day.",
  },
  {
    slug: "daily-campus-essentials",
    name: "Daily Campus Essentials",
    categorySlug: "daily-essentials",
    category: "Daily Essentials",
    price: "From ₹10",
    description: "Convenience supplies for classroom, hostel and home use.",
    tags: ["Daily", "Convenience"],
    availability: "available",
    stockNote: "Ask for current shelf stock.",
  },
];

export const offers: StoreOffer[] = [
  {
    id: "school-reopening-kit",
    title: "School Reopening Kit",
    type: "school",
    description:
      "A ready planning offer for notebooks, labels, covers, pens and daily school basics.",
    highlight: "Bundle planning",
    validUntil: "Seasonal",
    tags: ["School", "Stationery", "Student kit"],
  },
  {
    id: "notebook-value-week",
    title: "Notebook Value Week",
    type: "seasonal",
    description:
      "Dummy seasonal promotion for notebook packs and writing supplies.",
    highlight: "Value picks",
    validUntil: "This month",
    tags: ["Notebooks", "Writing", "Seasonal"],
  },
  {
    id: "project-ready-combo",
    title: "Project Ready Combo",
    type: "combo",
    description:
      "Charts, foam board, glue, cutters and craft basics grouped for project work.",
    highlight: "Project bundle",
    validUntil: "Ongoing",
    tags: ["Projects", "Craft", "Charts"],
  },
  {
    id: "festival-gifting-picks",
    title: "Festival Gifting Picks",
    type: "festival",
    description:
      "Greeting cards, gift wrap, chocolates and small add-ons for celebrations.",
    highlight: "Gift ideas",
    validUntil: "Festival season",
    tags: ["Gifts", "Chocolates", "Cards"],
  },
];

export const coupons: Coupon[] = [
  {
    code: "SCHOOLREADY",
    title: "School-ready coupon",
    description: "Dummy coupon UI for school reopening lists and stationery.",
    terms: "Show this code in store when discussing your school list.",
    type: "school",
  },
  {
    code: "PROJECTKIT",
    title: "Project materials coupon",
    description: "Dummy coupon UI for project material bundles.",
    terms: "Subject to item availability at the store.",
    type: "combo",
  },
  {
    code: "FESTIVEGIFT",
    title: "Festival gift coupon",
    description: "Dummy coupon UI for gifts, cards and chocolates.",
    terms: "Use for inspiration while requesting gifting items.",
    type: "festival",
  },
];

export const featuredProducts = products.filter((product) => product.featured);
export const offerProducts = products.filter((product) => product.offer);
export const schoolReopeningOffers = offers.filter(
  (offer) => offer.type === "school",
);
export const seasonalOffers = offers.filter(
  (offer) => offer.type === "seasonal" || offer.type === "combo",
);
export const festivalOffers = offers.filter(
  (offer) => offer.type === "festival",
);

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((product) => product.categorySlug === slug);
}
