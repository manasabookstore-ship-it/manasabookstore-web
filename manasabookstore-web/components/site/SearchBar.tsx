import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  compact?: boolean;
};

export function SearchBar({
  placeholder = "Search books, stationery, tools...",
  compact = false,
}: SearchBarProps) {
  return (
    <form
      action="/products"
      className="relative w-full"
      role="search"
    >
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#071f33]/45" />
      <input
        name="q"
        type="search"
        placeholder={placeholder}
        className={`w-full rounded-[8px] border border-[#071f33]/12 bg-white pl-12 pr-4 text-sm font-semibold text-[#071f33] shadow-sm outline-none transition placeholder:text-[#071f33]/40 focus:border-[#0b6b4a] focus:ring-4 focus:ring-[#0b6b4a]/12 ${
          compact ? "h-11" : "h-14"
        }`}
      />
    </form>
  );
}
