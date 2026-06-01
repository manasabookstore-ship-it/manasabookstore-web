"use client";

import Link from "next/link";
import { Check, MessageCircle, Pencil, PlusCircle, Search, TriangleAlert, X } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminProduct } from "@/lib/admin-data";
import { categories } from "@/lib/site-data";
import { AdminPageHeader } from "./AdminPageHeader";
import { useAdminStore } from "./AdminStore";

const inputClass =
  "h-11 rounded-[8px] border border-[#071f33]/12 px-3 text-sm font-bold outline-none focus:border-[#0b6b4a]";

export function InventoryTable() {
  const { products, updateProduct } = useAdminStore();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<AdminProduct | null>(null);
  const [saving, setSaving] = useState(false);

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
  const lowStockProducts = products.filter(
    (product) => product.stock <= product.lowStock,
  );
  const restockMessage = [
    "Manasa Book Center restock list",
    "",
    ...lowStockProducts.map(
      (product) =>
        `${product.name} | Stock ${product.stock} | Threshold ${product.lowStock}`,
    ),
  ].join("\n");
  const restockHref = `https://wa.me/?text=${encodeURIComponent(restockMessage)}`;

  function setEditField<K extends keyof AdminProduct>(
    key: K,
    value: AdminProduct[K],
  ) {
    setEditing((current) => (current ? { ...current, [key]: value } : current));
  }

  async function saveEdit() {
    if (!editing) {
      return;
    }

    setSaving(true);
    await updateProduct(editing);
    setSaving(false);
    setEditing(null);
  }

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

      {lowStockProducts.length ? (
        <section className="mt-6 rounded-[8px] border border-amber-200 bg-amber-50 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-black text-amber-950">
                Low-stock purchase list
              </h2>
              <p className="mt-1 text-sm font-semibold text-amber-900/72">
                {lowStockProducts.length} items need restock attention.
              </p>
            </div>
            <a
              href={restockHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-[8px] bg-[#10a36f] px-4 text-sm font-black text-white"
            >
              <MessageCircle className="h-4 w-4" />
              Share list
            </a>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {lowStockProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="rounded-[8px] bg-white p-3">
                <p className="text-sm font-black">{product.name}</p>
                <p className="mt-1 text-xs font-bold text-[#071f33]/58">
                  Stock {product.stock} · threshold {product.lowStock}
                </p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

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
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[#f7faf9] text-xs uppercase tracking-wide text-[#071f33]/58">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Barcode</th>
                <th className="px-4 py-3">Stock</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Low stock</th>
                <th className="px-4 py-3">Action</th>
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
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => setEditing(product)}
                        className="inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#071f33] px-3 text-xs font-black text-white"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="grid gap-3 p-4 md:hidden">
          {filteredProducts.map((product) => {
            const isLow = product.stock <= product.lowStock;
            return (
              <article
                key={product.id}
                className="rounded-[8px] border border-[#071f33]/10 bg-[#fbf7ef] p-4"
              >
                {product.imageUrl ? (
                  <div
                    className="mb-3 aspect-video rounded-[8px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${product.imageUrl})` }}
                    role="img"
                    aria-label={product.name}
                  />
                ) : null}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-black">{product.name}</p>
                    <p className="mt-1 text-xs font-semibold text-[#071f33]/54">
                      {product.category}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditing(product)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] bg-white text-[#071f33]"
                    aria-label={`Edit ${product.name}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-bold text-[#071f33]/64">
                  <span>SKU: {product.sku}</span>
                  <span>Barcode: {product.barcode || "-"}</span>
                  <span>Stock: {product.stock}</span>
                  <span>Price: Rs {product.price.toLocaleString("en-IN")}</span>
                </div>
                {isLow ? (
                  <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-black text-amber-800">
                    <TriangleAlert className="h-3.5 w-3.5" />
                    Low stock
                  </p>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>

      {editing ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-[#071f33]/70 p-4">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              void saveEdit();
            }}
            className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-[8px] bg-white p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-black">Edit product</h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#f7faf9]"
                aria-label="Close edit"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <EditField label="Name">
                <input
                  value={editing.name}
                  onChange={(event) => setEditField("name", event.target.value)}
                  className={inputClass}
                />
              </EditField>
              <EditField label="Category">
                <select
                  value={editing.category}
                  onChange={(event) =>
                    setEditField("category", event.target.value)
                  }
                  className={`${inputClass} bg-white`}
                >
                  {categories.map((category) => (
                    <option key={category.slug}>{category.name}</option>
                  ))}
                </select>
              </EditField>
              <EditField label="SKU">
                <input
                  value={editing.sku}
                  onChange={(event) => setEditField("sku", event.target.value)}
                  className={inputClass}
                />
              </EditField>
              <EditField label="Barcode">
                <input
                  value={editing.barcode}
                  onChange={(event) =>
                    setEditField("barcode", event.target.value)
                  }
                  className={inputClass}
                />
              </EditField>
              <EditField label="Stock">
                <input
                  type="number"
                  min="0"
                  value={editing.stock}
                  onChange={(event) =>
                    setEditField("stock", Number(event.target.value))
                  }
                  className={inputClass}
                />
              </EditField>
              <EditField label="Price">
                <input
                  type="number"
                  min="0"
                  value={editing.price}
                  onChange={(event) =>
                    setEditField("price", Number(event.target.value))
                  }
                  className={inputClass}
                />
              </EditField>
              <EditField label="Low stock">
                <input
                  type="number"
                  min="0"
                  value={editing.lowStock}
                  onChange={(event) =>
                    setEditField("lowStock", Number(event.target.value))
                  }
                  className={inputClass}
                />
              </EditField>
              <EditField label="Image URL" className="sm:col-span-2">
                <input
                  value={editing.imageUrl ?? ""}
                  onChange={(event) =>
                    setEditField("imageUrl", event.target.value)
                  }
                  className={inputClass}
                />
              </EditField>
            </div>
            {editing.imageUrl ? (
              <div
                className="mt-4 aspect-video rounded-[8px] border border-[#071f33]/10 bg-cover bg-center"
                style={{ backgroundImage: `url(${editing.imageUrl})` }}
                role="img"
                aria-label="Product preview"
              />
            ) : null}
            <button
              type="submit"
              disabled={saving}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0b6b4a] text-sm font-black text-white disabled:opacity-60"
            >
              <Check className="h-4 w-4" />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

function EditField({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-2 text-sm font-black ${className}`}>
      {label}
      {children}
    </label>
  );
}

