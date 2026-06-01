"use client";

import { ClipboardList, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AdminOrder, AdminOrderStatus } from "@/lib/admin-data";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
} from "@/lib/admin-orders-api";
import { site } from "@/lib/site-data";
import { AdminPageHeader } from "./AdminPageHeader";

const statuses: AdminOrderStatus[] = [
  "requested",
  "confirmed",
  "ready",
  "completed",
  "cancelled",
];

function statusClass(status: AdminOrderStatus) {
  if (status === "completed") {
    return "bg-emerald-100 text-emerald-800";
  }

  if (status === "cancelled") {
    return "bg-red-100 text-red-800";
  }

  if (status === "ready" || status === "confirmed") {
    return "bg-blue-100 text-blue-800";
  }

  return "bg-amber-100 text-amber-800";
}

function whatsappForOrder(order: AdminOrder) {
  const message = [
    "Manasa Book Center request update",
    "",
    `Request ID: ${order.id}`,
    `Hello ${order.customerName},`,
    "We are reviewing your item request and will update you on availability.",
  ].join("\n");
  const phone = order.customerPhone.replace(/\D/g, "");
  const fallbackPhone = site.phoneHref.replace(/\D/g, "");

  return `https://wa.me/${phone || fallbackPhone}?text=${encodeURIComponent(message)}`;
}

function valueFromNote(note: string, label: string) {
  const line = note
    .split("\n")
    .find((entry) => entry.toLowerCase().startsWith(`${label.toLowerCase()}:`));

  return line?.split(":").slice(1).join(":").trim() ?? "";
}

export function AdminOrders() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      setOrders(await fetchAdminOrders());
      setLoading(false);
    }

    void loadOrders();
  }, []);

  const requestedCount = useMemo(
    () => orders.filter((order) => order.status === "requested").length,
    [orders],
  );

  async function updateStatus(id: string, status: AdminOrderStatus) {
    const updated = await updateAdminOrderStatus(id, status);

    if (!updated) {
      return;
    }

    setOrders((current) =>
      current.map((order) => (order.id === id ? updated : order)),
    );
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="Requests"
        title="Customer item requests."
        description="Review website requests, follow up on WhatsApp and update status as the store team works through availability."
      />

      <div className="mt-8 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-black">Request inbox</h2>
            <p className="mt-1 text-sm font-semibold text-[#071f33]/58">
              {requestedCount} open requests
            </p>
          </div>
          <ClipboardList className="h-8 w-8 text-[#d86b13]" />
        </div>

        <div className="mt-5 grid gap-4">
          {loading ? (
            <p className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-bold text-[#071f33]/62">
              Loading requests...
            </p>
          ) : null}

          {!loading && !orders.length ? (
            <p className="rounded-[8px] bg-[#f7faf9] p-4 text-sm font-bold text-[#071f33]/62">
              No customer requests yet.
            </p>
          ) : null}

          {orders.map((order) => (
            (() => {
              const requestedItem = valueFromNote(order.customerNote, "Requested item");
              const category = valueFromNote(order.customerNote, "Category");
              const params = new URLSearchParams({
                item: requestedItem,
                category,
              });

              return (
            <article
              key={order.id}
              className="grid gap-4 rounded-[8px] border border-[#071f33]/10 bg-[#fbf7ef] p-4 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-black">{order.customerName}</h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${statusClass(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="mt-1 text-sm font-bold text-[#071f33]/58">
                  {order.customerPhone} · {new Date(order.createdAt).toLocaleString()}
                </p>
                <pre className="mt-4 whitespace-pre-wrap rounded-[8px] bg-white p-4 text-sm font-semibold leading-6 text-[#071f33]/72">
                  {order.customerNote}
                </pre>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <select
                  value={order.status}
                  onChange={(event) =>
                    void updateStatus(
                      order.id,
                      event.target.value as AdminOrderStatus,
                    )
                  }
                  className="h-11 rounded-[8px] border border-[#071f33]/12 bg-white px-3 text-sm font-black outline-none"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <a
                  href={whatsappForOrder(order)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#10a36f] px-4 text-sm font-black text-white"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                {requestedItem ? (
                  <Link
                    href={`/admin/inventory/add?${params.toString()}`}
                    className="inline-flex h-11 items-center justify-center rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white"
                  >
                    Convert to product
                  </Link>
                ) : null}
              </div>
            </article>
              );
            })()
          ))}
        </div>
      </div>
    </div>
  );
}

