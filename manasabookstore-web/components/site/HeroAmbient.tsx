export function HeroAmbient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,212,147,0.38),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(11,107,74,0.16),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(251,247,239,0.92))]" />
      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(7,31,51,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(7,31,51,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full border border-[#d86b13]/10" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#0b6b4a]/8 blur-3xl" />
    </div>
  );
}
