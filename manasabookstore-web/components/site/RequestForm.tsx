"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";

import { submitCustomerRequest } from "@/lib/request-api";
import type { Category } from "@/lib/site-data";

type RequestFormValues = {
  name: string;
  phone: string;
  category: string;
  requestedItem: string;
  notes: string;
};

type RequestFormErrors = Partial<Record<keyof RequestFormValues, string>>;

const initialValues: RequestFormValues = {
  name: "",
  phone: "",
  category: "",
  requestedItem: "",
  notes: "",
};

function validate(values: RequestFormValues) {
  const errors: RequestFormErrors = {};
  const digits = values.phone.replace(/\D/g, "");

  if (values.name.trim().length < 2) {
    errors.name = "Enter your name.";
  }

  if (digits.length < 10) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.category) {
    errors.category = "Choose a category.";
  }

  if (values.requestedItem.trim().length < 3) {
    errors.requestedItem = "Tell us what item you need.";
  }

  return errors;
}

export function RequestForm({ categories }: { categories: Category[] }) {
  const [values, setValues] = useState<RequestFormValues>(initialValues);
  const [errors, setErrors] = useState<RequestFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [whatsappHref, setWhatsappHref] = useState("");
  const [requestId, setRequestId] = useState("");

  const selectedCategory = useMemo(() => {
    return categories.find((category) => category.slug === values.category);
  }, [categories, values.category]);

  function updateValue(field: keyof RequestFormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSaving(true);
    const response = await submitCustomerRequest({
      ...values,
      category: selectedCategory?.name ?? values.category,
    });
    setSaving(false);

    if (!response) {
      setSubmitError("Request could not be saved. Please try WhatsApp.");
      return;
    }

    setWhatsappHref(response.whatsappHref);
    setRequestId(response.id);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className="rounded-[8px] border border-[#0b6b4a]/20 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-[#eaf4ef] text-[#0b6b4a]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h2 className="mt-6 text-3xl font-black">
          Your request has been recorded.
        </h2>
        <p className="mt-3 text-base leading-7 text-[#071f33]/68">
          Store team will review availability. Send the formatted WhatsApp
          message as well for faster follow-up.
        </p>
        <div className="mt-6 rounded-[8px] bg-[#fbf7ef] p-4">
          <p className="text-xs font-black uppercase tracking-wide text-[#071f33]/48">
            Request summary
          </p>
          <p className="mt-2 text-xs font-bold text-[#071f33]/52">
            ID: {requestId}
          </p>
          <p className="mt-2 text-sm font-black">{values.requestedItem}</p>
          <p className="mt-1 text-sm text-[#071f33]/64">
            {selectedCategory?.name}
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#10a36f] px-5 text-sm font-black text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Send on WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              setValues(initialValues);
              setSubmitted(false);
              setErrors({});
              setWhatsappHref("");
              setRequestId("");
            }}
            className="inline-flex h-12 items-center rounded-[8px] bg-[#071f33] px-5 text-sm font-black text-white"
          >
            Create another request
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name}>
          <input
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
            className="h-12 rounded-[8px] border border-[#071f33]/12 px-4 font-semibold outline-none focus:border-[#0b6b4a]"
            placeholder="Your name"
          />
        </Field>

        <Field label="Phone" error={errors.phone}>
          <input
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
            inputMode="tel"
            className="h-12 rounded-[8px] border border-[#071f33]/12 px-4 font-semibold outline-none focus:border-[#0b6b4a]"
            placeholder="+91..."
          />
        </Field>
      </div>

      <Field label="Category" error={errors.category} className="mt-4">
        <select
          value={values.category}
          onChange={(event) => updateValue("category", event.target.value)}
          className="h-12 rounded-[8px] border border-[#071f33]/12 bg-white px-4 font-semibold outline-none focus:border-[#0b6b4a]"
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Requested Item" error={errors.requestedItem} className="mt-4">
        <input
          value={values.requestedItem}
          onChange={(event) =>
            updateValue("requestedItem", event.target.value)
          }
          className="h-12 rounded-[8px] border border-[#071f33]/12 px-4 font-semibold outline-none focus:border-[#0b6b4a]"
          placeholder="Book name, stationery item, tool, gift..."
        />
      </Field>

      <Field label="Notes" error={errors.notes} className="mt-4">
        <textarea
          value={values.notes}
          onChange={(event) => updateValue("notes", event.target.value)}
          className="min-h-32 rounded-[8px] border border-[#071f33]/12 p-4 font-semibold outline-none focus:border-[#0b6b4a]"
          placeholder="Class, brand preference, quantity, deadline or any extra details"
        />
      </Field>

      <div className="mt-5 rounded-[8px] bg-[#fbf7ef] p-4 text-sm leading-6 text-[#071f33]/66">
        Your request is saved for the store team and a formatted WhatsApp
        message is prepared after submission.
      </div>

      {submitError ? (
        <p className="mt-4 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving}
        className="mt-5 inline-flex h-12 items-center gap-2 rounded-[8px] bg-[#071f33] px-5 text-sm font-black text-white transition hover:bg-[#0b6b4a] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {saving ? "Saving request..." : "Submit request"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`grid gap-2 text-sm font-black text-[#071f33] ${className}`}>
      {label}
      {children}
      {error ? (
        <span className="text-xs font-bold text-[#be123c]">{error}</span>
      ) : null}
    </label>
  );
}
