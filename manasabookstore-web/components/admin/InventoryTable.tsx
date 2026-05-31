"use client";

import Link from "next/link";
import { PlusCircle, Search, TriangleAlert } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminPageHeader } from "./AdminPageHeader";
import { useAdminStore } from "./AdminStore";

export function InventoryTable() {
  const { products } = useAdminStore();
  const [query, setQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) {
      return products;
    }

    return products.filter((product) =>
      [product.name, product.category, product.sku, product.barcode]
        .join(" ")
        .toLowerCase()
        .includes(value),
    );
  }, [products, query]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Inventory"
        title="Products, SKUs, barcodes and stock."
        description="Manage the local product list and watch low-stock items before this connects to a backend."
        action={
          <Link
            href="/admin/inventory/add"
            className="inline-flex h-11 items-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
          >
            <PlusCircle className="h-4 w-4" />
            Add product
          </Link>
        }
      />

      <div className="mt-8 rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-[#071f33]/10 p-4">
          <Search className="h-5 w-5 text-[#071f33]/38" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search product, SKU or barcode"
            className="h-11 min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-[#071f33]/36"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[#f7faf9] text-xs uppercase tracking-wide text-[#071f33]/58">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Barcode</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Low stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#071f33]/8">
              {filteredProducts.map((product) => {
                const isLow = product.stock <= product.lowStock;
                return (
                  <tr key={product.id}>
                    <td className="px-4 py-4">
                      <p className="font-black">{product.name}</p>
                      <p className="mt-1 text-xs font-semibold text-[#071f33]/54">
                        {product.category}
                      </p>
                    </td>
                    <td className="px-4 py-4 font-bold">{product.sku}</td>
                    <td className="px-4 py-4 font-mono text-xs">
                      {product.barcode}
                    </td>
                    <td className="px-4 py-4 font-black">{product.stock}</td>
                    <td className="px-4 py-4 font-black">
                      Rs {product.price.toLocaleString("en-IN")}
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black ${
                          isLow
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {isLow ? <TriangleAlert className="h-3.5 w-3.5" /> : null}
                        {product.lowStock}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

