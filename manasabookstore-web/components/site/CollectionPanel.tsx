import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type CollectionPanelProps = {
  title: string;
  text: string;
  href: string;
  image: string;
  tone: "school" | "project" | "gift" | "daily";
};

const tones = {
  school: "from-[#0a3328] to-[#071f33]",
  project: "from-[#4b3a24] to-[#0f241d]",
  gift: "from-[#3b271b] to-[#0b251d]",
  daily: "from-[#efe1cc] to-[#c9ad83] text-[#071f33]",
};

export function CollectionPanel({ title, text, href, image, tone }: CollectionPanelProps) {
  return (
    <Link
      href={href}
      className={`group relative min-h-72 overflow-hidden rounded-[8px] bg-gradient-to-br p-6 text-white shadow-sm transition hover:-translate-y-0.5 ${tones[tone]}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#051b15]/88 via-[#051b15]/44 to-transparent" />
      <div className="absolute inset-0 bg-[#071f33]/10" />
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <h3 className="font-serif text-4xl font-semibold leading-none">
            {title}
          </h3>
          <p className="mt-4 max-w-[230px] text-sm leading-6 opacity-78">{text}</p>
        </div>
        <span className="mt-8 grid h-10 w-10 place-items-center rounded-full border border-current/40 transition group-hover:translate-x-1">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
