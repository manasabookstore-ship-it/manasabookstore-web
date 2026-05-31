"use client";

import { BarChart3, CalendarDays, IndianRupee, PackageSearch } from "lucide-react";

import { AdminPageHeader } from "./AdminPageHeader";
import { AdminStats } from "./AdminStats";
import { useAdminStore } from "./AdminStore";

function money(value: number) {
  return `Rs ${value.toLocaleString("en-IN")}`;
}

export function AdminReports() {
  const { products, sales } = useAdminStore();
  const now = new Date();
  const dailySales = sales
    .filter((sale) => new Date(sale.createdAt).toDateString() === now.toDateString())
    .reduce((total, sale) => total + sale.subtotal, 0);
  const monthlySales = sales
    .filter((sale) => {
      const date = new Date(sale.createdAt);
      return (
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear()
      );
    })
    .reduce((total, sale) => total + sale.subtotal, 0);
  const inventoryValue = products.reduce(
    (total, product) => total + product.stock * product.price,
    0,
  );
  const unitsInStock = products.reduce((total, product) => total + product.stock, 0);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Reports"
        title="Daily sales, monthly sales and inventory value."
        description="Simple local reports for store visibility before backend analytics are connected."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStats
          title="Daily sales"
          value={money(dailySales)}
          note="Sales recorded today."
          icon={CalendarDays}
        />
        <AdminStats
          title="Monthly sales"
          value={money(monthlySales)}
          note="Sales for the current month."
          icon={BarChart3}
        />
        <AdminStats
          title="Inventory value"
          value={money(inventoryValue)}
          note="Current stock value at listed price."
          icon={IndianRupee}
        />
        <AdminStats
          title="Units in stock"
          value={String(unitsInStock)}
          note="Total units across all products."
          icon={PackageSearch}
        />
      </div>

      <section className="mt-8 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black">Sales history</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f7faf9] text-xs uppercase tracking-wide text-[#071f33]/58">
              <tr>
                <th className="px-4 py-3">Sale</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#071f33]/8">
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td className="px-4 py-4 font-black">{sale.id}</td>
                  <td className="px-4 py-4 font-semibold">
                    {new Date(sale.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 font-semibold">
                    {sale.items.reduce((total, item) => total + item.quantity, 0)}
                  </td>
                  <td className="px-4 py-4 font-semibold">{sale.paymentMode}</td>
                  <td className="px-4 py-4 font-black">{money(sale.subtotal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

