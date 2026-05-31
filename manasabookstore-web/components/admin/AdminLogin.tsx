"use client";

import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, UserRound } from "lucide-react";

type AdminLoginProps = {
  error?: string;
};

export function AdminLogin({ error }: AdminLoginProps) {
  const errorMessage =
    error === "not-authorized"
      ? "Your GitHub account is signed in, but it is not assigned a store staff role yet."
      : error === "supabase-env"
        ? "Supabase environment variables are missing."
        : error === "github-oauth"
          ? "GitHub sign-in could not be started."
          : "";

  return (
    <main className="grid min-h-dvh place-items-center bg-[#071f33] p-5 text-[#071f33]">
      <section
        className="w-full max-w-md rounded-[8px] bg-[#fbf7ef] p-6 shadow-2xl sm:p-8"
      >
        <Image
          src="/manasa-logo.svg"
          alt="Manasa Book Center"
          width={205}
          height={64}
          priority
          className="h-14 w-auto"
        />
        <div className="mt-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#f5ead7] text-[#d86b13]">
            <LockKeyhole className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-black">Admin login</h1>
            <p className="text-sm font-semibold text-[#071f33]/58">
              Secure store access with Supabase and GitHub.
            </p>
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-[8px] bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <Link
          href="/auth/github"
          className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-[#0b6b4a] text-sm font-black text-white transition hover:bg-[#09563c]"
        >
          <UserRound className="h-4 w-4" />
          Continue with GitHub
        </Link>
        <p className="mt-5 text-xs font-semibold leading-5 text-[#071f33]/52">
          Your GitHub account must have a `staff`, `admin`, or `owner` role in
          the Supabase `profiles` table.
        </p>
      </section>
    </main>
  );
}
