/* Pill filter group that wraps to new lines — never scrolls horizontally */
export function Segmented({ options, value, onChange, testIdPrefix }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5" data-testid={testIdPrefix ? `${testIdPrefix}-group` : undefined}>
      {options.map((o) => {
        const active = value === o.key;
        return (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[12px] font-medium border transition-colors ${
              active
                ? "bg-[var(--gold-subtle-bg)] border-[var(--gold-subtle-border)] text-[var(--gold)]"
                : "bg-[var(--layer-1)] border-[var(--hairline)] text-[var(--text-3)] hover:text-[var(--text-1)] hover:border-[var(--stroke)]"
            }`}
            data-testid={testIdPrefix ? `${testIdPrefix}-${o.key}` : undefined}
          >
            {o.label}
            {o.count != null && (
              <span className={`tabular text-[10px] px-1 rounded-full ${active ? "bg-[var(--gold-subtle-border)] text-[var(--gold-soft)]" : "bg-[var(--layer-3)] text-[var(--text-3)]"}`}>{o.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
