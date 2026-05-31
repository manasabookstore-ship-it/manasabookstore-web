"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { categories } from "@/lib/site-data";
import { AdminPageHeader } from "./AdminPageHeader";
import { useAdminStore } from "./AdminStore";

export function ProductAddForm() {
  const router = useRouter();
  const { addProduct } = useAdminStore();
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: categories[0]?.name ?? "Books",
    sku: "",
    barcode: "",
    stock: "0",
    price: "0",
    lowStock: "5",
  });

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);

    if (!form.name.trim() || !form.sku.trim() || !form.barcode.trim()) {
      setError("Product name, SKU and barcode are required.");
      setSaving(false);
      return;
    }

    const stock = Number(form.stock);
    const price = Number(form.price);
    const lowStock = Number(form.lowStock);

    if ([stock, price, lowStock].some((value) => Number.isNaN(value) || value < 0)) {
      setError("Stock, price and low stock must be positive numbers.");
      setSaving(false);
      return;
    }

    await addProduct({
      name: form.name.trim(),
      category: form.category,
      sku: form.sku.trim(),
      barcode: form.barcode.trim(),
      stock,
      price,
      lowStock,
    });
    router.push("/admin/inventory");
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Add product"
        title="Create a local inventory item."
        description="This form is ready for future backend persistence. For now it saves into local browser storage."
      />

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid max-w-3xl gap-4 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm sm:grid-cols-2"
      >
        <label className="block text-sm font-black sm:col-span-2">
          Product name
          <input
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Category
          <select
            value={form.category}
            onChange={(event) => updateField("category", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 bg-white px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          >
            {categories.map((category) => (
              <option key={category.slug}>{category.name}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-black">
          SKU
          <input
            value={form.sku}
            onChange={(event) => updateField("sku", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Barcode
          <input
            value={form.barcode}
            onChange={(event) => updateField("barcode", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Stock
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(event) => updateField("stock", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Price
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(event) => updateField("price", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        <label className="block text-sm font-black">
          Low stock threshold
          <input
            type="number"
            min="0"
            value={form.lowStock}
            onChange={(event) => updateField("lowStock", event.target.value)}
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        {error ? (
          <p className="rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={saving}
          className="h-12 rounded-[8px] bg-[#0b6b4a] text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {saving ? "Saving..." : "Save product"}
        </button>
      </form>
    </div>
  );
}
