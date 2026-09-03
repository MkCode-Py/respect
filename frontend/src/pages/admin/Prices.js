import { useMemo, useState } from "react";
import { PageHeader, PageBody, EmptyState } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { TIER_STYLES } from "@/components/TierBadge";
import { FilterSelect } from "@/components/FilterSelect";
import { useStore, findBrand, TIERS } from "@/data/store";
import { brl, pct, num } from "@/lib/format";
import { Search, X, Save, PackageSearch } from "lucide-react";
import { toast } from "sonner";

export default function Prices() {
  const { products, brands, setPrice } = useStore();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("todas");
  const [dirty, setDirty] = useState(0);

  const filtered = useMemo(() => {
    let list = products;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => `${p.name} ${p.dosage} ${p.brand}`.toLowerCase().includes(q));
    }
    if (brand !== "todas") list = list.filter((p) => p.brand === brand);
    return list.slice(0, 60);
  }, [products, query, brand]);

  const onEdit = (id, tier, v) => { setPrice(id, tier, v); setDirty((d) => d + 1); };

  return (
    <div data-testid="prices-page">
      <PageHeader
        title="Tabelas de Preço"
        subtitle="Edite os 7 níveis comerciais lado a lado. Sem regra percentual automática."
        actions={
          <>
            {dirty > 0 && (
              <span className="text-[12px] text-[var(--gold)] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse" />
                {dirty} não salvas
              </span>
            )}
            <button
              onClick={() => { toast.success(`${dirty} alterações salvas`); setDirty(0); }}
              disabled={dirty === 0}
              className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] active:bg-[var(--gold-active)] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
              data-testid="prices-save"
            >
              <Save size={13} /> Salvar
            </button>
          </>
        }
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto…"
              className="w-full h-9 pl-9 pr-8 rounded-[var(--r-sm)] bg-[var(--layer-1)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
              data-testid="prices-search-input" />
            {query && <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"><X size={13} /></button>}
          </div>
          <FilterSelect value={brand} onChange={setBrand} placeholder="Marca" className="sm:w-52"
            options={[{ value: "todas", label: "Todas as marcas" }, ...brands.map((b) => ({ value: b.slug, label: b.name }))]} />
        </div>
      </PageHeader>

      <PageBody>
        {/* Desktop: dense table (lg+) */}
        <div className="hidden lg:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[12px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] sticky top-[var(--topbar-h)] z-10 border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.06em] text-[var(--text-3)] pointer-events-none">
                <th className="text-left font-semibold px-4 py-2.5 w-[24%]">Produto</th>
                {TIERS.map((t) => (
                  <th key={t.key} className="text-right font-semibold px-2 py-2.5">
                    <div className="flex items-center justify-end gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: TIER_STYLES[t.key].fg }} />
                      {t.label}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {filtered.map((p) => {
                const b = findBrand(brands, p.brand);
                const varejo = p.prices.varejo || 0;
                return (
                  <tr key={p.id} className="hover:bg-[var(--layer-2)] transition-colors">
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BrandAvatar name={b?.name || p.name} tone={b?.tone} />
                        <div className="min-w-0">
                          <div className="font-medium text-[13px] truncate">{p.name}</div>
                          <div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {p.dosage}</div>
                        </div>
                      </div>
                    </td>
                    {TIERS.map((t) => {
                      const v = p.prices[t.key];
                      const delta = v != null && varejo && t.key !== "varejo" ? ((v / varejo) - 1) * 100 : null;
                      return (
                        <td key={t.key} className="px-2 py-1.5 align-top">
                          <PriceField value={v} onChange={(nv) => onEdit(p.id, t.key, nv)} testId={`price-cell-${p.id}-${t.key}`} />
                          <div className="h-3.5 text-right text-[10px] tabular mt-0.5">
                            {delta != null && <span style={{ color: delta < 0 ? "var(--success)" : "var(--warning)" }}>{pct(delta, 0)}</span>}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={PackageSearch} title="Nenhum produto" description="Ajuste a busca ou a marca selecionada" />}
        </div>

        {/* Mobile / tablet: per-product cards with tier grid */}
        <div className="lg:hidden flex flex-col gap-2.5">
          {filtered.map((p) => {
            const b = findBrand(brands, p.brand);
            const varejo = p.prices.varejo || 0;
            return (
              <div key={p.id} className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] p-3">
                <div className="flex items-center gap-2.5 min-w-0 mb-3">
                  <BrandAvatar name={b?.name || p.name} tone={b?.tone} size={28} />
                  <div className="min-w-0">
                    <div className="font-semibold text-[14px] truncate">{p.name}</div>
                    <div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {p.dosage}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIERS.map((t) => {
                    const v = p.prices[t.key];
                    const delta = v != null && varejo && t.key !== "varejo" ? ((v / varejo) - 1) * 100 : null;
                    return (
                      <div key={t.key} className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: TIER_STYLES[t.key].fg }} />
                          <span className="text-[10px] uppercase tracking-wide font-medium" style={{ color: TIER_STYLES[t.key].fg }}>{t.label}</span>
                        </div>
                        <PriceField value={v} onChange={(nv) => onEdit(p.id, t.key, nv)} testId={`price-cell-m-${p.id}-${t.key}`} />
                        <div className="h-3 text-[10px] tabular mt-0.5">
                          {delta != null && <span style={{ color: delta < 0 ? "var(--success)" : "var(--warning)" }}>{pct(delta, 0)} vs Varejo</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && <EmptyState icon={PackageSearch} title="Nenhum produto" description="Ajuste a busca ou a marca selecionada" />}
        </div>

        <div className="mt-3 text-[11px] text-[var(--text-3)]">Enter salva a célula · Esc cancela · deltas comparados ao Varejo · exibindo {num(filtered.length)} de {num(products.length)}.</div>
      </PageBody>
    </div>
  );
}

function PriceField({ value, onChange, testId }) {
  const [editing, setEditing] = useState(false);
  const [v, setV] = useState(value ?? "");
  if (editing) {
    return (
      <input
        type="number" step="0.01" autoFocus value={v}
        onChange={(e) => setV(e.target.value)}
        onBlur={() => { setEditing(false); onChange(v === "" ? null : parseFloat(v)); }}
        onKeyDown={(e) => {
          if (e.key === "Enter") { setEditing(false); onChange(v === "" ? null : parseFloat(v)); }
          if (e.key === "Escape") { setEditing(false); setV(value ?? ""); }
        }}
        className="tabular w-full h-8 px-2 rounded-[var(--r-xs)] bg-[var(--layer-2)] border border-[var(--gold)] text-[12px] font-semibold text-right focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
        data-testid={testId}
      />
    );
  }
  return (
    <button
      onClick={() => { setV(value ?? ""); setEditing(true); }}
      className="tabular w-full h-8 px-2 rounded-[var(--r-xs)] border border-transparent hover:border-[var(--stroke)] hover:bg-[var(--layer-2)] text-right text-[12px] font-medium transition-colors"
      style={{ color: value == null ? "var(--warning)" : "var(--text-1)" }}
      data-testid={testId}
    >
      {value == null ? "sem preço" : brl(value)}
    </button>
  );
}
