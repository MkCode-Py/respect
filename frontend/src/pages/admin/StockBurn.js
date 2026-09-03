import { PageHeader, PageBody, EmptyState } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { useStore, findBrand } from "@/data/store";
import { brl, dateShort, num } from "@/lib/format";
import { Flame } from "lucide-react";

export default function StockBurn() {
  const { stockBurn, brands } = useStore();
  return (
    <div>
      <PageHeader title="Queima de Estoque" subtitle="Cadastro independente — não afeta o catálogo principal" />
      <PageBody>
        {/* Desktop table */}
        <div className="hidden sm:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[13px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
                <th className="text-left font-semibold px-4 py-2.5">Produto</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[90px]">Estoque</th>
                <th className="text-right font-semibold px-3 py-2.5 hidden md:table-cell w-[120px]">Original</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[120px]">Queima</th>
                <th className="text-left font-semibold px-3 py-2.5 hidden lg:table-cell w-[120px]">Vencimento</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {stockBurn.map((s) => {
                const b = findBrand(brands, s.brand);
                return (
                  <tr key={s.id} className="hover:bg-[var(--layer-2)] transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-[7px] bg-[var(--warning-bg)] border border-[var(--warning-border)] flex items-center justify-center text-[var(--warning)] shrink-0"><Flame size={13} /></div>
                        <div className="min-w-0"><div className="font-medium truncate">{s.name}</div><div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {s.dosage}</div></div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular">{num(s.qty)}</td>
                    <td className="px-3 py-2.5 text-right tabular text-[var(--text-3)] line-through hidden md:table-cell">{brl(s.originalPrice)}</td>
                    <td className="px-3 py-2.5 text-right tabular font-semibold text-[var(--warning)]">{brl(s.burnPrice)}</td>
                    <td className="px-3 py-2.5 text-[var(--text-2)] hidden lg:table-cell">{dateShort(s.expiresAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden flex flex-col gap-2">
          {stockBurn.map((s) => {
            const b = findBrand(brands, s.brand);
            return (
              <div key={s.id} className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] p-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-[7px] bg-[var(--warning-bg)] border border-[var(--warning-border)] flex items-center justify-center text-[var(--warning)] shrink-0"><Flame size={14} /></div>
                  <div className="flex-1 min-w-0"><div className="font-semibold text-[14px] truncate">{s.name}</div><div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {s.dosage} · vence {dateShort(s.expiresAt)}</div></div>
                </div>
                <div className="flex items-center gap-4 mt-2 text-[12px]">
                  <span className="text-[var(--text-3)]">Estoque <b className="text-[var(--text-1)] tabular">{num(s.qty)}</b></span>
                  <span className="tabular text-[var(--text-4)] line-through">{brl(s.originalPrice)}</span>
                  <span className="ml-auto tabular font-semibold text-[var(--warning)]">{brl(s.burnPrice)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </PageBody>
    </div>
  );
}
