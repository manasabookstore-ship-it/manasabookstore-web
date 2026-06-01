import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight } from "lucide-react";

type DealCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  tone: "navy" | "green" | "gold";
  icon: ComponentType<{ className?: string }>;
};

const toneStyles = {
  navy: "bg-[#071f33] text-white",
  green: "bg-[#0b6b4a] text-white",
  gold: "bg-[#fff3da] text-[#071f33]",
};

const eyebrowStyles = {
  navy: "text-[#ffd493]",
  green: "text-[#ffd493]",
  gold: "text-[#9a4c00]",
};

export function DealCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  tone,
  icon: Icon,
}: DealCardProps) {
  return (
    <Link
      href={href}
      className={`group relative min-h-52 overflow-hidden rounded-[8px] p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl ${toneStyles[tone]}`}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <p className={`text-xs font-black uppercase tracking-wide ${eyebrowStyles[tone]}`}>
            {eyebrow}
          </p>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[8px] bg-white/16">
            <Icon className="h-5 w-5" />
          </span>
        </div>
        <h3 className="mt-5 text-2xl font-black leading-tight">{title}</h3>
        <p className="mt-3 max-w-sm text-sm font-semibold leading-6 opacity-72">
          {description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black">
          {cta}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />
      <div className="absolute -bottom-16 right-12 h-32 w-32 rounded-full bg-white/10" />
    </Link>
  );
}
