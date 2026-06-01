"use client";

import { FormEvent, useState } from "react";
import { Search } from "lucide-react";

type RequestStatus = {
  id: string;
  status: string;
  customerNote: string;
  createdAt: string;
};

export function RequestStatusLookup() {
  const [phone, setPhone] = useState("");
  const [requestId, setRequestId] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<RequestStatus[]>([]);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    const params = new URLSearchParams({ phone });
    if (requestId.trim()) {
      params.set("id", requestId.trim());
    }

    const response = await fetch(`/api/requests?${params.toString()}`, {
      cache: "no-store",
    });
    setLoading(false);

    if (!response.ok) {
      setMessage("Enter the phone number used for the request.");
      setResults([]);
      return;
    }

    const data = (await response.json()) as RequestStatus[];
    setResults(data);
    setMessage(data.length ? "" : "No matching requests found.");
  }

  return (
    <section className="mt-6 rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Track a request</h2>
      <p className="mt-2 text-sm font-semibold leading-6 text-[#071f33]/62">
        Check status using the phone number submitted with the request.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone number"
          className="h-11 rounded-[8px] border border-[#071f33]/12 px-3 text-sm font-bold outline-none focus:border-[#0b6b4a]"
        />
        <input
          value={requestId}
          onChange={(event) => setRequestId(event.target.value)}
          placeholder="Request ID optional"
          className="h-11 rounded-[8px] border border-[#071f33]/12 px-3 text-sm font-bold outline-none focus:border-[#0b6b4a]"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-[#071f33] px-4 text-sm font-black text-white disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {loading ? "Checking..." : "Check status"}
        </button>
      </form>
      {message ? (
        <p className="mt-4 rounded-[8px] bg-[#f7faf9] p-3 text-sm font-bold text-[#071f33]/64">
          {message}
        </p>
      ) : null}
      <div className="mt-4 grid gap-3">
        {results.map((result) => (
          <article key={result.id} className="rounded-[8px] bg-[#f7faf9] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-black text-[#071f33]/50">
                {result.id}
              </p>
              <span className="rounded-full bg-[#eaf4ef] px-3 py-1 text-xs font-black uppercase text-[#0b6b4a]">
                {result.status}
              </span>
            </div>
            <pre className="mt-3 whitespace-pre-wrap text-sm font-semibold leading-6 text-[#071f33]/64">
              {result.customerNote}
            </pre>
          </article>
        ))}
      </div>
    </section>
  );
}
