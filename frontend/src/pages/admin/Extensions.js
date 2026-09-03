import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { useStore } from "@/data/store";
import { num } from "@/lib/format";
import { CircleDot, CircleOff, ChevronRight, Puzzle } from "lucide-react";

export default function Extensions() {
  const { extensions, orders, products } = useStore();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    const m = {};
    for (const o of orders) m[o.extension] = (m[o.extension] || 0) + 1;
    const ex = {};
    for (const p of products) {
      for (const slug of Object.keys(p.extensionOverrides || {})) {
        ex[slug] = (ex[slug] || 0) + 1;
      }
    }
    return { orderCount: m, exceptionCount: ex };
  }, [orders, products]);

  return (
    <div data-testid="extensions-page">
      <PageHeader
        title="Extensões"
        subtitle={`${extensions.length} vitrines comerciais · preço padrão herdado do Varejo`}
      />
      <div className="px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {extensions.map((e) => {
            const orderCount = stats.orderCount[e.slug] || 0;
            const exceptionCount = stats.exceptionCount[e.slug] || 0;
            return (
              <button
                key={e.slug}
                onClick={() => navigate(`/admin/extensoes/${e.slug}`)}
                className="group text-left rounded-md border border-[var(--hairline)] bg-[var(--layer-1)] p-4 hover:border-[var(--stroke)] transition-colors"
                data-testid={`extension-card-${e.slug}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <BrandAvatar name={e.initials} tone={e.tone} size={32} />
                    <div>
                      <div className="text-[14px] font-semibold">{e.name}</div>
                      <div className="text-[11px] text-[var(--text-3)] mono">/vitrine/{e.slug}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-[var(--text-4)] group-hover:text-[var(--text-1)] transition-colors" />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <MiniStat label="Pedidos"      value={num(orderCount)} />
                  <MiniStat label="Exceções"    value={num(exceptionCount)} tone={exceptionCount > 0 ? "gold" : "default"} />
                  <MiniStat label="Status"        value={e.active ? "Ativa" : "Pausada"} tone={e.active ? "success" : "danger"} />
                </div>
                <div className="mt-3 pt-3 border-t border-[var(--hairline)] text-[11px] text-[var(--text-3)] flex items-center gap-1.5">
                  <Puzzle size={11} /> Herdando Varejo por padrão
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone = "default" }) {
  const color = {
    default: "var(--text-1)",
    gold: "var(--gold)",
    success: "var(--success)",
    danger: "var(--danger)",
  }[tone];
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">{label}</div>
      <div className="text-[15px] font-semibold tabular mt-0.5" style={{ color }}>{value}</div>
    </div>
  );
}
