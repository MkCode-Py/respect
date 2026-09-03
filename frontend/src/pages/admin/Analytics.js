import { useMemo } from "react";
import { PageHeader, Card } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { useStore } from "@/data/store";
import { num } from "@/lib/format";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";
import { Search, MousePointerClick, MessageCircle, ShoppingCart, Eye, AlertTriangle } from "lucide-react";

export default function Analytics() {
  const { analytics, products } = useStore();

  const totals = useMemo(() => {
    const t = analytics.daily.reduce((acc, d) => ({
      visits: acc.visits + d.visits,
      searches: acc.searches + d.searches,
      addToCart: acc.addToCart + d.addToCart,
      checkouts: acc.checkouts + d.checkouts,
      whatsapp: acc.whatsapp + d.whatsapp,
    }), { visits: 0, searches: 0, addToCart: 0, checkouts: 0, whatsapp: 0 });
    return t;
  }, [analytics]);

  const noResult = analytics.topSearches.filter((s) => !s.hasResult);
  const withResult = analytics.topSearches.filter((s) => s.hasResult);

  return (
    <div data-testid="analytics-page">
      <PageHeader
        title="Analytics"
        subtitle="Últimos 30 dias na vitrine pública"
      />

      <div className="px-4 sm:px-6 py-4 flex flex-col gap-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <StatCard label="Visitas"        value={num(totals.visits)}     icon={Eye} />
          <StatCard label="Pesquisas"     value={num(totals.searches)}  icon={Search} />
          <StatCard label="Add to Cart"   value={num(totals.addToCart)} icon={MousePointerClick} tone="gold" />
          <StatCard label="Checkouts"     value={num(totals.checkouts)} icon={ShoppingCart} />
          <StatCard label="Handoff WhatsApp" value={num(totals.whatsapp)} icon={MessageCircle} tone="info" />
        </div>

        <Card padding={false}>
          <div className="px-4 py-3 border-b border-[var(--hairline)]">
            <div className="text-[13px] font-semibold">Funil de conversão (30 dias)</div>
            <div className="text-[11px] text-[var(--text-3)]">Visitas → add to cart → checkout → handoff WhatsApp</div>
          </div>
          <div className="p-4 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analytics.daily}>
                <defs>
                  <linearGradient id="gVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9962A" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#C9962A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#23262D" strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(d) => d.slice(5).replace("-", "/")} stroke="#6F6B64" fontSize={11} />
                <YAxis stroke="#6F6B64" fontSize={11} />
                <Tooltip contentStyle={{ background: "#14161A", border: "1px solid #23262D", borderRadius: 6, fontSize: 12, color: "#F4F2EE" }} />
                <Area type="monotone" dataKey="visits"    stroke="#C9962A" fill="url(#gVisits)" strokeWidth={1.5} />
                <Line type="monotone" dataKey="addToCart" stroke="#7AB7FF" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="checkouts" stroke="#7EE2A8" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="whatsapp"  stroke="#F5C451" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card padding={false}>
            <div className="px-4 py-3 border-b border-[var(--hairline)] flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold">Pesquisas mais comuns</div>
                <div className="text-[11px] text-[var(--text-3)]">Termos digitados na busca</div>
              </div>
              <Search size={14} className="text-[var(--text-3)]" />
            </div>
            <div className="divide-y divide-[var(--hairline)]">
              {withResult.map((s) => (
                <div key={s.term} className="flex items-center gap-3 px-4 h-9">
                  <span className="text-[13px] flex-1 truncate">{s.term}</span>
                  <span className="tabular text-[13px] font-medium">{num(s.count)}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card padding={false}>
            <div className="px-4 py-3 border-b border-[var(--hairline)] flex items-center justify-between">
              <div>
                <div className="text-[13px] font-semibold">Pesquisas sem resultado</div>
                <div className="text-[11px] text-[var(--warning)]">Oportunidades de novos produtos no catálogo</div>
              </div>
              <AlertTriangle size={14} className="text-[var(--warning)]" />
            </div>
            <div className="divide-y divide-[var(--hairline)]">
              {noResult.map((s) => (
                <div key={s.term} className="flex items-center gap-3 px-4 h-9" data-testid={`no-result-${s.term}`}>
                  <span className="text-[13px] flex-1 truncate">{s.term}</span>
                  <span className="tabular text-[13px] font-medium text-[var(--warning)]">{num(s.count)}</span>
                </div>
              ))}
              {noResult.length === 0 && (
                <div className="p-6 text-[12px] text-[var(--text-3)] text-center">Nenhuma pesquisa sem resultado no período.</div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
