type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[8px] border border-[#071f33]/10 bg-white p-5 shadow-sm sm:p-6">
      <div className="pointer-events-none absolute -right-16 -top-24 h-52 w-52 rounded-full bg-[#c49345]/10" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-24 w-40 bg-[#0b6b4a]/5" />
      <div className="relative flex min-w-0 flex-col justify-between gap-5 md:flex-row md:items-end">
      <div className="min-w-0">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8a5a12]">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight tracking-[-0.02em] text-[#071f33] sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#071f33]/62">
          {description}
        </p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </div>
  );
}

