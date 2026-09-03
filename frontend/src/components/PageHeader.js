export function PageHeader({ title, subtitle, actions, children, testId }) {
  return (
    <div className="relative overflow-hidden amber-glow border-b border-[var(--hairline)] bg-[var(--canvas)]" data-testid={testId}>
      <div className="relative z-[1] px-4 sm:px-6 lg:px-8 pt-5 pb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-[22px] sm:text-[24px] leading-[1.15] font-semibold tracking-[-0.02em] text-[var(--text-1)]">
            {title}
          </h1>
          {subtitle && (
            <div className="mt-1 text-[13px] text-[var(--text-3)] max-w-2xl">{subtitle}</div>
          )}
        </div>
        {actions && <div className="flex items-center gap-2 flex-wrap shrink-0">{actions}</div>}
      </div>
      {children && <div className="relative z-[1] px-4 sm:px-6 lg:px-8 pb-4">{children}</div>}
    </div>
  );
}

/* Page body wrapper — enforces max width & clips any accidental overflow */
export function PageBody({ children, className = "" }) {
  return (
    <div className={`px-4 sm:px-6 lg:px-8 py-5 w-full max-w-[1500px] mx-auto ${className}`} style={{ overflowX: "clip" }}>
      {children}
    </div>
  );
}

export function Section({ title, description, actions, children, className = "" }) {
  return (
    <section className={`px-4 sm:px-6 lg:px-8 py-5 ${className}`}>
      {(title || actions) && (
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            {title && <h2 className="text-[14px] leading-5 font-semibold tracking-[-0.005em] text-[var(--text-1)]">{title}</h2>}
            {description && <p className="text-[12px] text-[var(--text-3)] mt-0.5">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function Card({ children, className = "", padding = true }) {
  return (
    <div className={`rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] ${padding ? "p-4" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function CardHead({ title, description, action }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--hairline)]">
      <div className="min-w-0">
        <div className="text-[13px] font-semibold tracking-[-0.005em] text-[var(--text-1)] truncate">{title}</div>
        {description && <div className="text-[11px] text-[var(--text-3)] mt-0.5 truncate">{description}</div>}
      </div>
      {action}
    </div>
  );
}

/* A toolbar that wraps gracefully — never causes horizontal scroll */
export function Toolbar({ children, className = "" }) {
  return <div className={`flex flex-wrap items-center gap-2 ${className}`}>{children}</div>;
}

export function EmptyState({ title, description, action, icon: Icon, testId }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6" data-testid={testId}>
      {Icon && (
        <div className="w-11 h-11 rounded-[var(--r-sm)] border border-[var(--hairline)] bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-3)] mb-3">
          <Icon size={18} strokeWidth={1.75} />
        </div>
      )}
      <div className="text-[14px] font-semibold text-[var(--text-1)]">{title}</div>
      {description && <div className="text-[12px] text-[var(--text-3)] mt-1 max-w-sm">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
