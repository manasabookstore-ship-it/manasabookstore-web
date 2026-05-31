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
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-black text-[#d86b13]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#071f33]/62">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}

