export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  sku: string;
  barcode: string;
  stock: number;
  price: number;
  lowStock: number;
};

export type SaleItem = {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
};

export type AdminSale = {
  id: string;
  createdAt: string;
  items: SaleItem[];
  subtotal: number;
  paymentMode: "Cash" | "UPI" | "Card";
};

export type AdminOrderStatus =
  | "requested"
  | "confirmed"
  | "ready"
  | "completed"
  | "cancelled";

export type AdminOrder = {
  id: string;
  customerName: string;
  customerPhone: string;
  customerNote: string;
  status: AdminOrderStatus;
  source: "website" | "whatsapp" | "store";
  createdAt: string;
};

export const adminStorageKeys = {
  session: "manasa-admin-session",
  products: "manasa-admin-products",
  sales: "manasa-admin-sales",
};

export const defaultAdminProducts: AdminProduct[] = [
  {
    id: "p-1001",
    name: "Premium Notebook Pack",
    category: "Stationery",
    sku: "STA-NB-001",
    barcode: "890100000001",
    stock: 46,
    price: 120,
    lowStock: 12,
  },
  {
    id: "p-1002",
    name: "Scientific Calculator",
    category: "Engineering Tools",
    sku: "ENG-CAL-002",
    barcode: "890100000002",
    stock: 8,
    price: 799,
    lowStock: 6,
  },
  {
    id: "p-1003",
    name: "School Bag Selection",
    category: "School Essentials",
    sku: "SCH-BAG-003",
    barcode: "890100000003",
    stock: 15,
    price: 399,
    lowStock: 8,
  },
  {
    id: "p-1004",
    name: "Science Project Board Kit",
    category: "Project Materials",
    sku: "PRJ-KIT-004",
    barcode: "890100000004",
    stock: 28,
    price: 99,
    lowStock: 10,
  },
  {
    id: "p-1005",
    name: "Pen & Pencil Writing Kit",
    category: "Stationery",
    sku: "STA-WRT-005",
    barcode: "890100000005",
    stock: 64,
    price: 49,
    lowStock: 20,
  },
  {
    id: "p-1006",
    name: "Engineering Drawing Kit",
    category: "Engineering Tools",
    sku: "ENG-DRW-006",
    barcode: "890100000006",
    stock: 11,
    price: 249,
    lowStock: 8,
  },
];

export const defaultAdminSales: AdminSale[] = [
  {
    id: "s-1001",
    createdAt: new Date().toISOString(),
    paymentMode: "Cash",
    items: [
      {
        productId: "p-1001",
        name: "Premium Notebook Pack",
        sku: "STA-NB-001",
        quantity: 2,
        price: 120,
      },
      {
        productId: "p-1005",
        name: "Pen & Pencil Writing Kit",
        sku: "STA-WRT-005",
        quantity: 1,
        price: 49,
      },
    ],
    subtotal: 289,
  },
  {
    id: "s-1002",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4)).toISOString(),
    paymentMode: "UPI",
    items: [
      {
        productId: "p-1004",
        name: "Science Project Board Kit",
        sku: "PRJ-KIT-004",
        quantity: 3,
        price: 99,
      },
    ],
    subtotal: 297,
  },
];
