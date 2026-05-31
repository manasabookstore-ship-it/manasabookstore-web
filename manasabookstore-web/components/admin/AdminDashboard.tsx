"use client";

import Link from "next/link";
import { ArrowRight, Boxes, IndianRupee, ReceiptText, TriangleAlert } from "lucide-react";

import { AdminPageHeader } from "./AdminPageHeader";
import { AdminStats } from "./AdminStats";
import { useAdminStore } from "./AdminStore";

function money(value: number) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

export function AdminDashboard() {
  const { products, sales, dataSource } = useAdminStore();
  const lowStock = products.filter((product) => product.stock <= product.lowStock);
  const inventoryValue = products.reduce(
    (total, product) => total + product.stock * product.price,
    0,
  );
  const todaysSales = sales
    .filter((sale) => new Date(sale.createdAt).toDateString() === new Date().toDateString())
    .reduce((total, sale) => total + sale.subtotal, 0);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Admin dashboard"
        title="Store operations at a glance."
        description="Track products, low stock, quick sales and inventory value using local browser data for now."
        action={
          <Link
            href="/admin/sales"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
          >
            New sale
            <ArrowRight className="h-4 w-4" />
          </Link>
        }
      />

      <p className="mt-5 inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#071f33]/58 shadow-sm">
        Data source: {dataSource}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStats
          title="Products"
          value={String(products.length)}
          note="Inventory items available in the admin MVP."
          icon={Boxes}
        />
        <AdminStats
          title="Low stock"
          value={String(lowStock.length)}
          note="Items at or below their low-stock threshold."
          icon={TriangleAlert}
        />
        <AdminStats
          title="Today sales"
          value={money(todaysSales)}
          note="Sales recorded today in this browser."
          icon={ReceiptText}
        />
        <AdminStats
          title="Inventory value"
          value={money(inventoryValue)}
          note="Stock quantity multiplied by current price."
          icon={IndianRupee}
        />
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Recent sales</h2>
          <div className="mt-5 grid gap-3">
            {sales.slice(0, 5).map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between gap-4 rounded-[8px] bg-[#f7faf9] p-4"
              >
                <div>
                  <p className="text-sm font-black">{sale.id.toUpperCase()}</p>
                  <p className="mt-1 text-xs font-semibold text-[#071f33]/58">
                    {new Date(sale.createdAt).toLocaleString()} · {sale.paymentMode}
                  </p>
                </div>
                <p className="text-sm font-black">{money(sale.subtotal)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
          <h2 className="text-xl font-black">Low stock watch</h2>
          <div className="mt-5 grid gap-3">
            {lowStock.length ? (
              lowStock.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[8px] border border-amber-200 bg-amber-50 p-4"
                >
                  <p className="text-sm font-black">{product.name}</p>
                  <p className="mt-1 text-xs font-semibold text-[#071f33]/62">
                    {product.stock} in stock · threshold {product.lowStock}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-semibold text-[#071f33]/62">
                No products are below low-stock level.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
