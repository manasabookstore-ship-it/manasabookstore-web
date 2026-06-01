"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { lookupAdminBarcode } from "@/lib/admin-api";
import { categories } from "@/lib/site-data";
import { BarcodeScannerButton } from "./BarcodeScannerButton";
import { AdminPageHeader } from "./AdminPageHeader";
import { useAdminStore } from "./AdminStore";

export function ProductAddForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialItem = searchParams.get("item") ?? "";
  const initialCategoryParam = searchParams.get("category") ?? "";
  const initialCategory =
    categories.find(
      (category) =>
        category.slug === initialCategoryParam ||
        category.name.toLowerCase() === initialCategoryParam.toLowerCase(),
    )?.name ?? "";
  const { addProduct } = useAdminStore();
  const [error, setError] = useState("");
  const [lookupMessage, setLookupMessage] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: initialItem,
    category: initialCategory || categories[0]?.name || "Books",
    sku: initialItem
      ? `REQ-${initialItem.replace(/[^a-z0-9]+/gi, "-").slice(0, 18).toUpperCase()}`
      : "",
    barcode: "",
    stock: "0",
    price: "0",
    lowStock: "5",
    imageUrl: "",
  });

  function updateField(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function lookupBarcode(code = form.barcode) {
    const barcode = code.trim();
    setError("");
    setLookupMessage("");

    if (!barcode) {
      setError("Enter or scan a barcode first.");
      return;
    }

    setLookingUp(true);
    const result = await lookupAdminBarcode(barcode);
    setLookingUp(false);

    if (!result) {
      setLookupMessage("Lookup failed. You can still enter product details manually.");
      return;
    }

    if (result.product) {
      setForm({
        name: result.product.name,
        category: result.product.category,
        sku: result.product.sku,
        barcode: result.product.barcode,
        stock: String(result.product.stock),
        price: String(result.product.price),
        lowStock: String(result.product.lowStock),
        imageUrl: result.product.imageUrl ?? "",
      });
      setLookupMessage("This barcode already exists in inventory.");
      return;
    }

    if (result.suggestion) {
      setForm((current) => ({
        ...current,
        name: result.suggestion?.name ?? current.name,
        category: result.suggestion?.category ?? current.category,
        sku: result.suggestion?.sku ?? current.sku,
        barcode: result.suggestion?.barcode ?? barcode,
        stock: String(result.suggestion?.stock ?? current.stock),
        price: String(result.suggestion?.price ?? current.price),
        lowStock: String(result.suggestion?.lowStock ?? current.lowStock),
      }));
      setLookupMessage(
        result.found
          ? `Drafted from ${result.source}. Please confirm price and stock.`
          : "No public match found. Barcode and SKU are ready for manual entry.",
      );
    }
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
      imageUrl: form.imageUrl.trim(),
    });
    router.push("/admin/inventory");
  }

  function loadImage(file: File | undefined) {
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateField("imageUrl", String(reader.result ?? ""));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Add product"
        title="Create a local inventory item."
        description="Scan or type a barcode, then confirm the product details before saving."
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
          <div className="mt-2 flex gap-2">
            <input
              value={form.barcode}
              onChange={(event) => updateField("barcode", event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void lookupBarcode();
                }
              }}
              className="h-12 min-w-0 flex-1 rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
            />
            <BarcodeScannerButton
              onDetected={(barcode) => {
                updateField("barcode", barcode);
                void lookupBarcode(barcode);
              }}
            />
          </div>
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
        <label className="block text-sm font-black sm:col-span-2">
          Product photo
          <input
            type="file"
            accept="image/*"
            onChange={(event) => loadImage(event.target.files?.[0])}
            className="mt-2 block w-full rounded-[8px] border border-[#071f33]/12 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
          <input
            value={form.imageUrl}
            onChange={(event) => updateField("imageUrl", event.target.value)}
            placeholder="Or paste image URL"
            className="mt-2 h-12 w-full rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
          />
        </label>
        {form.imageUrl ? (
          <div
            className="aspect-video rounded-[8px] border border-[#071f33]/10 bg-cover bg-center sm:col-span-2"
            style={{ backgroundImage: `url(${form.imageUrl})` }}
            role="img"
            aria-label="Product preview"
          />
        ) : null}
        {error ? (
          <p className="rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700 sm:col-span-2">
            {error}
          </p>
        ) : null}
        {lookupMessage ? (
          <p className="rounded-[8px] bg-[#f7faf9] px-4 py-3 text-sm font-bold text-[#071f33]/70 sm:col-span-2">
            {lookupMessage}
          </p>
        ) : null}
        <button
          type="button"
          onClick={() => lookupBarcode()}
          disabled={lookingUp}
          className="h-12 rounded-[8px] bg-[#071f33] text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
        >
          {lookingUp ? "Looking up..." : "Lookup barcode"}
        </button>
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
