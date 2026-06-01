"use client";

import { FormEvent, useState } from "react";
import { History } from "lucide-react";

import { fetchOrderHistory } from "@/lib/commerce-api";

type HistoryOrder = {
  id: string;
  status: string;
  customerNote: string;
  total: number;
  createdAt: string;
};

export function OrderHistoryView() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<HistoryOrder[]>([]);
  const [searched, setSearched] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setOrders(await fetchOrderHistory(phone));
    setSearched(true);
  }

  return (
    <main className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="rounded-[8px] bg-[#071f33] p-6 text-white shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <History className="h-8 w-8 text-[#ffd493]" />
          <div>
            <p className="text-sm font-black text-[#ffd493]">Order history</p>
            <h1 className="text-4xl font-black">Find your orders</h1>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-8 flex flex-col gap-3 rounded-[8px] bg-white p-5 shadow-sm sm:flex-row"
      >
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Enter phone number"
          className="h-12 min-w-0 flex-1 rounded-[8px] border border-[#071f33]/12 px-4 text-sm font-bold outline-none"
        />
        <button className="h-12 rounded-[8px] bg-[#071f33] px-5 text-sm font-black text-white">
          Search
        </button>
      </form>
      <div className="mt-6 grid gap-4">
        {searched && !orders.length ? (
          <p className="rounded-[8px] bg-white p-5 text-sm font-bold text-[#071f33]/62">
            No orders found for this phone number.
          </p>
        ) : null}
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-black">{order.id}</p>
              <span className="rounded-full bg-[#f5ead7] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#9a4c00]">
                {order.status}
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold text-[#071f33]/58">
              {new Date(order.createdAt).toLocaleString()} · Rs{" "}
              {order.total.toLocaleString("en-IN")}
            </p>
            <pre className="mt-4 whitespace-pre-wrap rounded-[8px] bg-[#f7faf9] p-4 text-sm font-semibold leading-6 text-[#071f33]/68">
              {order.customerNote}
            </pre>
          </article>
        ))}
      </div>
    </main>
  );
}

