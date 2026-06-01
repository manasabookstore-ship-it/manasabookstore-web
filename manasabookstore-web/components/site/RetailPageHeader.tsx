import type { ReactNode } from "react";

type RetailPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
};

export function RetailPageHeader({
  eyebrow,
  title,
  description,
  icon,
  actions,
  children,
}: RetailPageHeaderProps) {
  return (
    <section className="overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white shadow-sm">
      <div className="grid gap-px bg-[#071f33]/10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-[#071f33] p-6 text-white sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-[#ffd493]">
                {eyebrow}
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
                {title}
              </h1>
            </div>
            {icon ? (
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-white/10 text-[#ffd493]">
                {icon}
              </span>
            ) : null}
          </div>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/70">
            {description}
          </p>
          {actions ? <div className="mt-7 flex flex-wrap gap-3">{actions}</div> : null}
        </div>
        <div className="grid content-center bg-[#fbf7ef] p-5 sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}
