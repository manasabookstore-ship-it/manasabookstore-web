import type { ComponentType } from "react";

type PremiumFeatureCardProps = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  text: string;
};

export function PremiumFeatureCard({
  icon: Icon,
  title,
  text,
}: PremiumFeatureCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-[8px] border border-white/12 bg-white/[0.08] p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white/[0.12]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#ffd493]/70 to-transparent" />
      <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-[#ffd493] text-[#071f33] shadow-sm">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-white/62">
        {text}
      </p>
    </article>
  );
}
