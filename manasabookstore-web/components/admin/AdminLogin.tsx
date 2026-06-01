"use client";

import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, Mail, UserRound } from "lucide-react";

type AdminLoginProps = {
  error?: string;
};

export function AdminLogin({ error }: AdminLoginProps) {
  const errorMessage =
    error === "not-authorized"
      ? "This account is signed in, but it is not assigned a store staff role yet."
      : error === "supabase-env"
        ? "Supabase environment variables are missing."
        : error === "github-oauth"
          ? "GitHub sign-in could not be started."
          : error === "email-login"
            ? "Email or password is incorrect."
            : error === "email-required"
              ? "Email and password are required."
              : "";

  return (
    <main className="grid min-h-dvh overflow-hidden bg-[#051b15] p-4 text-[#071f33] sm:place-items-center sm:p-5">
      <div className="pointer-events-none fixed inset-0 opacity-24">
        <Image
          src="/generated/manasa-hero-still-life.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#051b15]/70" />
      </div>
      <section
        className="relative mx-auto mt-20 w-full max-w-[18rem] overflow-hidden rounded-[8px] border border-[#c49345]/20 bg-[#fbf7ef] p-5 shadow-2xl sm:mt-0 sm:max-w-md sm:p-8"
      >
        <div className="pointer-events-none absolute -right-14 -top-20 h-44 w-44 rounded-full bg-[#c49345]/12" />
        <div className="relative inline-flex min-w-0 items-center gap-3">
          <Image
            src="/manasa-logo-concept-mark.svg"
            alt=""
            width={58}
            height={58}
            priority
            className="h-12 w-12"
          />
          <div className="min-w-0">
            <p className="font-serif text-xl uppercase leading-none tracking-[0.16em] text-[#071f33] sm:text-2xl sm:tracking-[0.2em]">
              Manasa
            </p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.26em] text-[#8a5a12]">
              Admin Studio
            </p>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#f5ead7] text-[#8a5a12]">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black">Admin login</h1>
            <p className="text-sm font-semibold text-[#071f33]/58">
              Secure store access with Supabase.
            </p>
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <form action="/auth/email" method="post" className="mt-7 grid gap-3">
          <input type="hidden" name="next" value="/admin/dashboard" />
          <label className="grid gap-2 text-sm font-black">
            Email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="h-12 w-full min-w-0 rounded-[8px] border border-[#071f33]/12 bg-white px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
            />
          </label>
          <label className="grid gap-2 text-sm font-black">
            Password
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 w-full min-w-0 rounded-[8px] border border-[#071f33]/12 bg-white px-4 text-sm font-bold outline-none focus:border-[#0b6b4a]"
            />
          </label>
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#071f33] text-sm font-black text-white transition hover:bg-[#0d2b43]"
          >
            <Mail className="h-4 w-4" />
            Continue with email
          </button>
        </form>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#071f33]/12" />
          <span className="text-xs font-black uppercase tracking-wide text-[#071f33]/40">
            or
          </span>
          <span className="h-px flex-1 bg-[#071f33]/12" />
        </div>

        <Link
          href="/auth/github"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0b6b4a] text-sm font-black text-white transition hover:bg-[#09563c]"
        >
          <UserRound className="h-4 w-4" />
          Continue with GitHub
        </Link>
        <p className="mt-5 text-xs font-semibold leading-5 text-[#071f33]/52">
          Your account must have a `staff`, `admin`, or `owner` role in the
          Supabase `profiles` table.
        </p>
      </section>
    </main>
  );
}
