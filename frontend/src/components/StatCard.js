import { ArrowUpRight } from "lucide-react";

const TONES = {
  default: "var(--text-1)",
  gold: "var(--gold)",
  success: "var(--success)",
  danger: "var(--danger)",
  warning: "var(--warning)",
  info: "var(--info)",
};

export function StatCard({ label, value, hint, tone = "default", icon: Icon, onClick, testId }) {
  const fg = TONES[tone] || TONES.default;

  const inner = (
    <div
      className="group relative overflow-hidden rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] p-3.5 flex flex-col gap-2 h-full transition-colors hover:border-[var(--stroke)]"
      data-testid={testId}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] uppercase tracking-[0.1em] font-semibold text-[var(--text-3)] truncate">{label}</span>
        {Icon && (
          <span className="w-6 h-6 rounded-[7px] border border-[var(--hairline)] bg-[var(--layer-2)] flex items-center justify-center shrink-0" style={{ color: tone === "default" ? "var(--text-3)" : fg }}>
            <Icon size={13} />
          </span>
        )}
      </div>
      <div className="metric-num text-[24px] leading-[1.1] font-semibold truncate" style={{ color: fg }}>{value}</div>
      {hint && (
        <div className="text-[11px] text-[var(--text-3)] flex items-center gap-1 min-w-0">
          <span className="truncate">{hint}</span>
          {onClick && <ArrowUpRight size={11} className="shrink-0 text-[var(--text-4)] opacity-0 group-hover:opacity-100 transition-opacity" />}
        </div>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left focus-gold rounded-[var(--r-md)] w-full">
        {inner}
      </button>
    );
  }
  return inner;
}
