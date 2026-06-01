import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LuxuryButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "whatsapp";
  icon?: ReactNode;
  external?: boolean;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">;

const variantStyles = {
  primary:
    "bg-[#071f33] text-white shadow-[0_14px_34px_rgba(7,31,51,0.16)] hover:bg-[#0b6b4a]",
  secondary:
    "border border-[#071f33]/12 bg-white text-[#071f33] shadow-sm hover:border-[#0b6b4a]/35 hover:text-[#0b6b4a]",
  whatsapp:
    "bg-[#0b6b4a] text-white shadow-[0_14px_34px_rgba(11,107,74,0.16)] hover:bg-[#09563c]",
};

export function LuxuryButton({
  children,
  href,
  variant = "primary",
  icon,
  external = false,
  className = "",
  ...props
}: LuxuryButtonProps) {
  const classes = `inline-flex h-12 items-center justify-center gap-2 rounded-[8px] px-5 text-sm font-black transition duration-300 hover:-translate-y-0.5 ${variantStyles[variant]} ${className}`;
  const content = (
    <>
      <span className="inline-flex items-center gap-2">
        {icon}
        {children}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
