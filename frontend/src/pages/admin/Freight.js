import { PageHeader, PageBody } from "@/components/PageHeader";
import { useStore } from "@/data/store";
import { brl } from "@/lib/format";
import { Truck } from "lucide-react";

export default function Freight() {
  const { freights } = useStore();
  return (
    <div>
      <PageHeader title="Fretes" subtitle="Modalidades e valores por região" />
      <PageBody>
        <div className="hidden sm:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[13px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
                <th className="text-left font-semibold px-4 py-2.5 w-[160px]">Modalidade</th>
                <th className="text-left font-semibold px-3 py-2.5">Região</th>
                <th className="text-left font-semibold px-3 py-2.5 w-[130px]">Prazo</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[120px]">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {freights.map((f) => (
                <tr key={f.id} className="hover:bg-[var(--layer-2)] transition-colors">
                  <td className="px-4 py-2.5"><div className="flex items-center gap-2 min-w-0"><Truck size={14} className="text-[var(--text-3)] shrink-0" /><span className="font-medium truncate">{f.label}</span></div></td>
                  <td className="px-3 py-2.5 text-[var(--text-2)] truncate">{f.region}</td>
                  <td className="px-3 py-2.5 text-[var(--text-2)]">{f.days}</td>
                  <td className="px-3 py-2.5 text-right tabular font-semibold">{brl(f.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="sm:hidden flex flex-col gap-2">
          {freights.map((f) => (
            <div key={f.id} className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] p-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-[7px] border border-[var(--hairline)] bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-3)] shrink-0"><Truck size={14} /></div>
              <div className="flex-1 min-w-0"><div className="font-semibold text-[14px] truncate">{f.label} · {f.region}</div><div className="text-[11px] text-[var(--text-3)]">{f.days}</div></div>
              <div className="tabular text-[14px] font-semibold shrink-0">{brl(f.price)}</div>
            </div>
          ))}
        </div>
      </PageBody>
    </div>
  );
}
