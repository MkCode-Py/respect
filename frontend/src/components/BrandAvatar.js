import { initials } from "@/lib/format";

export function BrandAvatar({ name, tone = "#5E7A6B", size = 22, className = "" }) {
  const s = typeof size === "number" ? `${size}px` : size;
  return (
    <div
      className={`shrink-0 rounded-[7px] flex items-center justify-center border ${className}`}
      style={{
        width: s,
        height: s,
        background: `linear-gradient(150deg, ${tone}2b 0%, ${tone}12 100%)`,
        borderColor: `${tone}33`,
        color: tone,
      }}
      aria-hidden
    >
      <span className="font-bold leading-none" style={{ fontSize: Math.round((typeof size === "number" ? size : 22) * 0.4) }}>
        {initials(name)}
      </span>
    </div>
  );
}

export function CategoryChip({ name, short, tone = "#5E7A6B", size = 22 }) {
  return <BrandAvatar name={short || name} tone={tone} size={size} />;
}
