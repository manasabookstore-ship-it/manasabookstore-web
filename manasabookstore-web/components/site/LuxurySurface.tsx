import type { ReactNode } from "react";

export function LuxurySurface({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white shadow-[0_18px_60px_rgba(7,31,51,0.08)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d86b13]/55 to-transparent" />
      {children}
    </div>
  );
}
