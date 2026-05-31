"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AdminProduct,
  AdminSale,
  adminStorageKeys,
  defaultAdminProducts,
  defaultAdminSales,
  SaleItem,
} from "@/lib/admin-data";
import {
  createAdminProduct,
  createAdminSale,
  fetchAdminSnapshot,
} from "@/lib/admin-api";

type CartItem = SaleItem;

type AdminStoreValue = {
  products: AdminProduct[];
  sales: AdminSale[];
  dataSource: "supabase" | "local";
  addProduct: (product: Omit<AdminProduct, "id">) => Promise<void>;
  recordSale: (
    items: CartItem[],
    paymentMode: AdminSale["paymentMode"],
  ) => Promise<void>;
  resetDemoData: () => void;
};

const AdminStoreContext = createContext<AdminStoreValue | null>(null);

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  const value = window.localStorage.getItem(key);
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function AdminStoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<AdminProduct[]>(() =>
    readStored(adminStorageKeys.products, defaultAdminProducts),
  );
  const [sales, setSales] = useState<AdminSale[]>(() =>
    readStored(adminStorageKeys.sales, defaultAdminSales),
  );
  const [dataSource, setDataSource] = useState<"supabase" | "local">("local");

  useEffect(() => {
    async function loadSupabaseSnapshot() {
      const snapshot = await fetchAdminSnapshot();

      if (!snapshot) {
        return;
      }

      setProducts(snapshot.products);
      setSales(snapshot.sales);
      setDataSource("supabase");
    }

    void loadSupabaseSnapshot();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        adminStorageKeys.products,
        JSON.stringify(products),
      );
    }
  }, [products]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(adminStorageKeys.sales, JSON.stringify(sales));
    }
  }, [sales]);

  const addProduct = useCallback(async (product: Omit<AdminProduct, "id">) => {
    const created = await createAdminProduct(product);
    const nextProduct = created ?? {
      ...product,
      id: `p-${Date.now()}`,
    };

    setProducts((current) => [nextProduct, ...current]);

    if (created) {
      setDataSource("supabase");
    }
  }, []);

  const recordSale = useCallback(
    async (items: CartItem[], paymentMode: AdminSale["paymentMode"]) => {
      const subtotal = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
      const created = await createAdminSale(items, paymentMode);
      const nextSale =
        created ??
        ({
          id: `s-${Date.now()}`,
          createdAt: new Date().toISOString(),
          items,
          subtotal,
          paymentMode,
        } satisfies AdminSale);

      setSales((current) => [nextSale, ...current]);

      setProducts((current) =>
        current.map((product) => {
          const sold = items.find((item) => item.productId === product.id);
          if (!sold) {
            return product;
          }

          return {
            ...product,
            stock: Math.max(0, product.stock - sold.quantity),
          };
        }),
      );

      if (created) {
        setDataSource("supabase");
      }
    },
    [],
  );

  const resetDemoData = useCallback(() => {
    setProducts(defaultAdminProducts);
    setSales(defaultAdminSales);
  }, []);

  const value = useMemo(
    () => ({
      products,
      sales,
      dataSource,
      addProduct,
      recordSale,
      resetDemoData,
    }),
    [addProduct, dataSource, products, recordSale, resetDemoData, sales],
  );

  return (
    <AdminStoreContext.Provider value={value}>
      {children}
    </AdminStoreContext.Provider>
  );
}

export function useAdminStore() {
  const value = useContext(AdminStoreContext);

  if (!value) {
    throw new Error("useAdminStore must be used inside AdminStoreProvider");
  }

  return value;
}
