import { LucideIcon } from "lucide-react";

type AdminStatsProps = {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

export function AdminStats({ title, value, note, icon: Icon }: AdminStatsProps) {
  return (
    <article className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#c49345]/35">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8a5a12]">
            {title}
          </p>
          <p className="mt-2 break-words font-serif text-4xl font-semibold leading-none text-[#071f33]">
            {value}
          </p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#f5ead7] text-[#8a5a12]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-[#071f33]/58">
        {note}
      </p>
    </article>
  );
}

