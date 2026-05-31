import { LucideIcon } from "lucide-react";

type AdminStatsProps = {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
};

export function AdminStats({ title, value, note, icon: Icon }: AdminStatsProps) {
  return (
    <article className="rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black text-[#071f33]/58">{title}</p>
          <p className="mt-2 text-3xl font-black">{value}</p>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-[#f5ead7] text-[#d86b13]">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-[#071f33]/58">
        {note}
      </p>
    </article>
  );
}

