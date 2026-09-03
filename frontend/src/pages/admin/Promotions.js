import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, PageBody, EmptyState } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { useStore, findBrand } from "@/data/store";
import { brl, dateShort } from "@/lib/format";
import { Search, Percent, Plus, X, ChevronRight, Tag } from "lucide-react";
import { toast } from "sonner";

export default function Promotions() {
  const { promotions, products, brands, extensions } = useStore();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query.trim()) return promotions;
    const q = query.toLowerCase();
    return promotions.filter((p) => p.productName.toLowerCase().includes(q));
  }, [promotions, query]);

  const stats = useMemo(() => ({
    active: promotions.length,
    endingSoon: promotions.filter((p) => new Date(p.endsAt).getTime() - Date.now() < 5 * 864e5).length,
    avgDiscount: promotions.length ? Math.round(promotions.reduce((s, p) => s + p.discount, 0) / promotions.length) : 0,
  }), [promotions]);

  const DiscountPill = ({ v }) => (
    <span className="inline-flex items-center gap-1 h-5 px-2 rounded-full border text-[11px] font-semibold tabular" style={{ background: "var(--gold-subtle-bg)", borderColor: "var(--gold-subtle-border)", color: "var(--gold)" }}>
      <Percent size={10} /> {v}%
    </span>
  );

  return (
    <div data-testid="promotions-page">
      <PageHeader
        title="Promoções"
        subtitle={`${stats.active} ativas · desconto médio ${stats.avgDiscount}% · ${stats.endingSoon} encerram esta semana`}
        actions={
          <button onClick={() => toast("Fluxo de criar promoção (mock)")} className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] active:bg-[var(--gold-active)] flex items-center gap-1.5" data-testid="promotions-new">
            <Plus size={13} /> Nova promoção
          </button>
        }
      >
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto em promoção…"
            className="w-full h-9 pl-9 pr-8 rounded-[var(--r-sm)] bg-[var(--layer-1)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
            data-testid="promotions-search" />
          {query && <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"><X size={13} /></button>}
        </div>
      </PageHeader>

      <PageBody>
        {/* Desktop table */}
        <div className="hidden md:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[13px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
                <th className="text-left font-semibold px-4 py-2.5">Produto</th>
                <th className="text-right font-semibold px-3 py-2.5 hidden lg:table-cell w-[120px]">Original</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[130px]">Promocional</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[110px]">Desconto</th>
                <th className="text-left font-semibold px-3 py-2.5 hidden xl:table-cell w-[110px]">Encerra</th>
                <th className="text-left font-semibold px-3 py-2.5 hidden xl:table-cell w-[150px]">Aparece em</th>
                <th className="px-2 py-2.5 w-[40px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {filtered.map((promo) => {
                const product = products.find((p) => p.id === promo.productId);
                const b = findBrand(brands, promo.brand);
                const soon = new Date(promo.endsAt).getTime() - Date.now() < 5 * 864e5;
                return (
                  <tr key={promo.id} className="group hover:bg-[var(--layer-2)] transition-colors cursor-pointer" onClick={() => product && navigate(`/admin/produtos/${product.id}`)} data-testid={`promo-row-${promo.id}`}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BrandAvatar name={b?.name || promo.productName} tone={b?.tone} />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{promo.productName}</div>
                          <div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {product?.dosage}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular text-[var(--text-3)] line-through hidden lg:table-cell">{brl(promo.originalPrice)}</td>
                    <td className="px-3 py-2.5 text-right tabular font-semibold text-[var(--gold)]">{brl(promo.promoPrice)}</td>
                    <td className="px-3 py-2.5 text-right"><DiscountPill v={promo.discount} /></td>
                    <td className="px-3 py-2.5 hidden xl:table-cell text-[12px]"><span className={soon ? "text-[var(--warning)]" : "text-[var(--text-2)]"}>{dateShort(promo.endsAt)}</span></td>
                    <td className="px-3 py-2.5 hidden xl:table-cell">
                      <div className="flex items-center gap-1">
                        {promo.extensions.length === extensions.length ? <span className="text-[11px] text-[var(--text-3)]">Todas</span> : promo.extensions.slice(0, 3).map((slug) => { const e = extensions.find((x) => x.slug === slug); return e && <BrandAvatar key={slug} name={e.initials} tone={e.tone} size={16} />; })}
                      </div>
                    </td>
                    <td className="px-2 py-2.5 text-right"><ChevronRight size={15} className="text-[var(--text-4)] group-hover:text-[var(--text-1)] transition-colors inline" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={Tag} title="Nenhuma promoção" description="Nenhuma promoção encontrada." />}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-2">
          {filtered.map((promo) => {
            const product = products.find((p) => p.id === promo.productId);
            const b = findBrand(brands, promo.brand);
            const soon = new Date(promo.endsAt).getTime() - Date.now() < 5 * 864e5;
            return (
              <button key={promo.id} onClick={() => product && navigate(`/admin/produtos/${product.id}`)} className="w-full text-left rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] p-3 active:bg-[var(--layer-2)] transition-colors" data-testid={`promo-card-${promo.id}`}>
                <div className="flex items-start gap-3">
                  <BrandAvatar name={b?.name || promo.productName} tone={b?.tone} size={30} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-[14px] truncate">{promo.productName}</div>
                      <DiscountPill v={promo.discount} />
                    </div>
                    <div className="text-[11px] text-[var(--text-3)] truncate mt-0.5">{b?.name} · {product?.dosage}</div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="tabular text-[15px] font-semibold text-[var(--gold)]">{brl(promo.promoPrice)}</span>
                      <span className="tabular text-[12px] text-[var(--text-4)] line-through">{brl(promo.originalPrice)}</span>
                      <span className={`ml-auto text-[11px] ${soon ? "text-[var(--warning)]" : "text-[var(--text-3)]"}`}>até {dateShort(promo.endsAt)}</span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && <EmptyState icon={Tag} title="Nenhuma promoção" description="Nenhuma promoção encontrada." />}
        </div>
      </PageBody>
    </div>
  );
}
