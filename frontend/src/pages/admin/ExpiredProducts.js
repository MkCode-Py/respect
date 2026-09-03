import { PageHeader, PageBody } from "@/components/PageHeader";
import { useStore, findBrand } from "@/data/store";
import { dateShort, num } from "@/lib/format";
import { Clock } from "lucide-react";

export default function ExpiredProducts() {
  const { expired, brands } = useStore();
  return (
    <div>
      <PageHeader title="Produtos Vencidos" subtitle="Cadastro independente para controle interno" />
      <PageBody>
        <div className="hidden sm:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[13px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
                <th className="text-left font-semibold px-4 py-2.5">Produto</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[120px]">Quantidade</th>
                <th className="text-left font-semibold px-3 py-2.5 w-[140px]">Venceu em</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {expired.map((s) => {
                const b = findBrand(brands, s.brand);
                return (
                  <tr key={s.id} className="hover:bg-[var(--layer-2)] transition-colors">
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-[7px] bg-[var(--danger-bg)] border border-[var(--danger-border)] flex items-center justify-center text-[var(--danger)] shrink-0"><Clock size={13} /></div>
                        <div className="min-w-0"><div className="font-medium truncate">{s.name}</div><div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {s.dosage}</div></div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-right tabular">{num(s.qty)}</td>
                    <td className="px-3 py-2.5 text-[var(--danger)]">{dateShort(s.expiredAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden flex flex-col gap-2">
          {expired.map((s) => {
            const b = findBrand(brands, s.brand);
            return (
              <div key={s.id} className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] p-3 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[7px] bg-[var(--danger-bg)] border border-[var(--danger-border)] flex items-center justify-center text-[var(--danger)] shrink-0"><Clock size={14} /></div>
                <div className="flex-1 min-w-0"><div className="font-semibold text-[14px] truncate">{s.name}</div><div className="text-[11px] text-[var(--text-3)] truncate">{b?.name} · {s.dosage}</div></div>
                <div className="text-right shrink-0"><div className="tabular text-[13px] font-semibold">{num(s.qty)}</div><div className="text-[11px] text-[var(--danger)]">{dateShort(s.expiredAt)}</div></div>
              </div>
            );
          })}
        </div>
      </PageBody>
    </div>
  );
}
