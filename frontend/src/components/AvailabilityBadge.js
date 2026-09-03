import { CircleDot, CircleOff } from "lucide-react";

export function AvailabilityBadge({ available }) {
  const st = available
    ? { bg: "var(--success-bg)", border: "var(--success-border)", fg: "var(--success)", label: "Dispon\u00edvel", Icon: CircleDot }
    : { bg: "var(--danger-bg)", border: "var(--danger-border)", fg: "var(--danger)", label: "Indispon\u00edvel", Icon: CircleOff };
  const { Icon } = st;
  return (
    <span className="inline-flex items-center gap-1 h-5 px-1.5 rounded-full border text-[11px] font-medium" style={{ background: st.bg, borderColor: st.border, color: st.fg }}>
      <Icon size={10} strokeWidth={2} /> {st.label}
    </span>
  );
}

export function AvailabilityToggle({ available, onToggle, testId }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle?.(); }}
      className="group inline-flex items-center gap-1.5 h-6 pl-1.5 pr-2 rounded-full border text-[11px] font-medium transition-colors"
      style={
        available
          ? { background: "var(--success-bg)", borderColor: "var(--success-border)", color: "var(--success)" }
          : { background: "var(--danger-bg)", borderColor: "var(--danger-border)", color: "var(--danger)" }
      }
      title={available ? "Marcar como indispon\u00edvel" : "Marcar como dispon\u00edvel"}
      data-testid={testId}
    >
      <span className="w-2 h-2 rounded-full" style={{ background: available ? "var(--success)" : "var(--danger)" }} />
      {available ? "Dispon\u00edvel" : "Indispon\u00edvel"}
    </button>
  );
}
