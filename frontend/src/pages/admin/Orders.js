import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, PageBody, EmptyState } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { FilterSelect } from "@/components/FilterSelect";
import { useStore, findExtension } from "@/data/store";
import { brl, num, relTime } from "@/lib/format";
import { Search, X, ChevronRight, MessageCircle, CheckCircle2, Clock, Inbox } from "lucide-react";

const STATUS = {
  pending:  { label: "Pendente", bg: "var(--warning-bg)", border: "var(--warning-border)", fg: "var(--warning)", icon: Clock },
  whatsapp: { label: "WhatsApp", bg: "var(--info-bg)", border: "var(--info-border)", fg: "var(--info)", icon: MessageCircle },
  completed:{ label: "Confirmado", bg: "var(--success-bg)", border: "var(--success-border)", fg: "var(--success)", icon: CheckCircle2 },
};

function StatusPill({ status }) {
  const S = STATUS[status];
  const Icon = S.icon;
  return (
    <span className="inline-flex items-center gap-1 h-5 px-2 rounded-full border text-[11px] font-medium whitespace-nowrap" style={{ background: S.bg, borderColor: S.border, color: S.fg }}>
      <Icon size={10} /> {S.label}
    </span>
  );
}

export default function Orders() {
  const { orders, extensions } = useStore();
  const [query, setQuery] = useState("");
  const [ext, setExt] = useState("todas");
  const [status, setStatus] = useState("todos");
  const [period, setPeriod] = useState("30d");
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = orders;
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((o) => `${o.id} ${o.client} ${o.city}`.toLowerCase().includes(q));
    }
    if (ext !== "todas") list = list.filter((o) => o.extension === ext);
    if (status !== "todos") list = list.filter((o) => o.status === status);
    if (period !== "todos") {
      const days = { "7d": 7, "30d": 30 }[period] || 999;
      const cut = Date.now() - days * 864e5;
      list = list.filter((o) => new Date(o.createdAt).getTime() >= cut);
    }
    return list;
  }, [orders, query, ext, status, period]);

  const totalItems = filtered.reduce((s, o) => s + o.items.reduce((a, i) => a + i.qty, 0), 0);

  return (
    <div data-testid="orders-page">
      <PageHeader
        title="Pedidos"
        subtitle={<><span className="text-[var(--text-2)] font-medium tabular">{num(filtered.length)}</span> pedidos · {num(totalItems)} itens · registro não é venda concluída</>}
      >
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1 min-w-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por número, cliente ou cidade…"
              className="w-full h-9 pl-9 pr-8 rounded-[var(--r-sm)] bg-[var(--layer-1)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
              data-testid="orders-search" />
            {query && <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"><X size={13} /></button>}
          </div>
          <div className="grid grid-cols-3 sm:flex gap-2">
            <FilterSelect value={ext} onChange={setExt} placeholder="Extensão" testId="orders-filter-extension" className="sm:w-40"
              options={[{ value: "todas", label: "Extensões" }, ...extensions.map((e) => ({ value: e.slug, label: e.name }))]} />
            <FilterSelect value={status} onChange={setStatus} placeholder="Status" className="sm:w-36"
              options={[{ value: "todos", label: "Status" }, { value: "pending", label: "Pendentes" }, { value: "whatsapp", label: "WhatsApp" }, { value: "completed", label: "Confirmado" }]} />
            <FilterSelect value={period} onChange={setPeriod} placeholder="Período" className="sm:w-32"
              options={[{ value: "7d", label: "7 dias" }, { value: "30d", label: "30 dias" }, { value: "todos", label: "Todos" }]} />
          </div>
        </div>
      </PageHeader>

      <PageBody>
        {/* Desktop table */}
        <div className="hidden md:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[13px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
                <th className="text-left font-semibold px-4 py-2.5 w-[130px]">Pedido</th>
                <th className="text-left font-semibold px-3 py-2.5">Cliente</th>
                <th className="text-left font-semibold px-3 py-2.5 hidden lg:table-cell w-[170px]">Extensão</th>
                <th className="text-left font-semibold px-3 py-2.5 hidden xl:table-cell w-[150px]">Local</th>
                <th className="text-center font-semibold px-3 py-2.5 w-[70px]">Itens</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[120px]">Total</th>
                <th className="text-left font-semibold px-3 py-2.5 w-[130px]">Status</th>
                <th className="px-2 py-2.5 w-[40px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {filtered.map((o) => {
                const extInfo = findExtension(extensions, o.extension);
                return (
                  <tr key={o.id} className="group hover:bg-[var(--layer-2)] cursor-pointer transition-colors" onClick={() => navigate(`/admin/pedidos/${o.id}`)} data-testid={`order-row-${o.id}`}>
                    <td className="px-4 py-2.5">
                      <div className="mono text-[12px] font-medium truncate">{o.id}</div>
                      <div className="text-[11px] text-[var(--text-3)]">{relTime(o.createdAt)}</div>
                    </td>
                    <td className="px-3 py-2.5 font-medium truncate">{o.client}</td>
                    <td className="px-3 py-2.5 hidden lg:table-cell">
                      <div className="flex items-center gap-2 min-w-0"><BrandAvatar name={extInfo?.initials || "?"} tone={extInfo?.tone} size={18} /><span className="text-[12px] truncate">{extInfo?.name}</span></div>
                    </td>
                    <td className="px-3 py-2.5 hidden xl:table-cell text-[12px] text-[var(--text-2)] truncate">{o.city}/{o.state}</td>
                    <td className="px-3 py-2.5 text-center tabular">{o.items.reduce((s, i) => s + i.qty, 0)}</td>
                    <td className="px-3 py-2.5 text-right tabular font-semibold">{brl(o.total)}</td>
                    <td className="px-3 py-2.5"><StatusPill status={o.status} /></td>
                    <td className="px-2 py-2.5 text-right"><ChevronRight size={15} className="text-[var(--text-4)] group-hover:text-[var(--text-1)] transition-colors inline" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={Inbox} title="Nenhum pedido" description="Nenhum pedido encontrado com esses filtros." />}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-2">
          {filtered.map((o) => {
            const extInfo = findExtension(extensions, o.extension);
            return (
              <button key={o.id} onClick={() => navigate(`/admin/pedidos/${o.id}`)} className="w-full text-left rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] p-3 active:bg-[var(--layer-2)] transition-colors" data-testid={`order-card-${o.id}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="mono text-[12px] font-semibold">{o.id}</span>
                  <StatusPill status={o.status} />
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[14px] font-medium truncate">{o.client}</div>
                    <div className="text-[11px] text-[var(--text-3)] truncate flex items-center gap-1.5 mt-0.5">
                      <BrandAvatar name={extInfo?.initials || "?"} tone={extInfo?.tone} size={14} /> {extInfo?.name} · {o.city}/{o.state}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="tabular text-[14px] font-semibold">{brl(o.total)}</div>
                    <div className="text-[11px] text-[var(--text-3)]">{o.items.reduce((s, i) => s + i.qty, 0)} itens · {relTime(o.createdAt)}</div>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && <EmptyState icon={Inbox} title="Nenhum pedido" description="Nenhum pedido encontrado com esses filtros." />}
        </div>
      </PageBody>
    </div>
  );
}
