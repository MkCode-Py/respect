export function TierBadge({ tier, size = "sm" }) {
  const t = TIER_STYLES[tier] || TIER_STYLES.varejo;
  const cls = size === "xs" ? "h-4 px-1.5 text-[10px]" : "h-5 px-2 text-[11px]";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border ${cls} font-medium tabular tracking-[-0.005em]`}
      style={{ background: t.bg, borderColor: t.border, color: t.fg }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: t.fg }} />
      {t.label}
    </span>
  );
}

export const TIER_STYLES = {
  varejo:    { label: "Varejo",    bg: "#15161B", border: "#2C2B33", fg: "#E7E4DE" },
  bronze:    { label: "Bronze",    bg: "#181410", border: "#33291F", fg: "#D7A878" },
  prata:     { label: "Prata",      bg: "#14161B", border: "#2B313B", fg: "#CBD5E1" },
  ouro:      { label: "Ouro",       bg: "#1B1408", border: "#3A2C10", fg: "#F0C766" },
  platina:   { label: "Platina",    bg: "#101820", border: "#233542", fg: "#A9D4EA" },
  esmeralda: { label: "Esmeralda", bg: "#0D1913", border: "#1E3A2A", fg: "#7FE3B4" },
  diamante:  { label: "Diamante",   bg: "#14131E", border: "#2E2C42", fg: "#C9C4F0" },
};
