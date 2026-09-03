import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, PageBody, Card, CardHead } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { BrandAvatar } from "@/components/BrandAvatar";
import { TierBadge } from "@/components/TierBadge";
import { useStore, findBrand } from "@/data/store";
import { brl, num, relTime } from "@/lib/format";
import {
  Package, TrendingUp, ShoppingCart, Search, AlertTriangle,
  Flame, Percent, ArrowRight, ExternalLink, Eye, MessageCircle, DollarSign,
} from "lucide-react";

export default function Dashboard() {
  const { products, orders, promotions, analytics, brands, extensions } = useStore();
  const navigate = useNavigate();

  const summary = useMemo(() => {
    const available = products.filter((p) => p.available).length;
    const missingPrice = products.filter((p) => Object.values(p.prices).some((v) => v == null));
    const todayOrders = orders.filter((o) => new Date(o.createdAt).toDateString() === new Date().toDateString());
    const last7 = orders.filter((o) => Date.now() - new Date(o.createdAt).getTime() < 7 * 864e5);
    const withoutResult = analytics.topSearches.filter((s) => !s.hasResult);
    const popularUnavailable = products.filter((p) => !p.available).sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
    return {
      available, unavailable: products.length - available, missingPrice,
      activePromos: promotions.length, todayOrders: todayOrders.length, last7: last7.length,
      withoutResult, popularUnavailable,
    };
  }, [products, orders, promotions, analytics]);

  const extensionActivity = useMemo(() => {
    const map = {};
    for (const o of orders) map[o.extension] = (map[o.extension] || 0) + 1;
    return extensions.map((e) => ({ ...e, count: map[e.slug] || 0 })).sort((a, b) => b.count - a.count).slice(0, 5);
  }, [orders, extensions]);

  const mostViewed = useMemo(() => products.slice().sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5), [products]);

  return (
    <div>
      <PageHeader
        title="Visão Geral"
        subtitle="Um resumo acionável para começar o dia — sem faturamento, só o que precisa de ação."
        actions={
          <>
            <button
              onClick={() => navigate("/admin/produtos?filter=sem-preco")}
              className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] hover:bg-[var(--layer-2)] text-[var(--text-1)] transition-colors"
              data-testid="dash-fix-missing-prices"
            >
              Corrigir preços pendentes
            </button>
            <a
              href="/vitrine" target="_blank" rel="noreferrer"
              className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] active:bg-[var(--gold-active)] flex items-center gap-1.5"
              data-testid="dash-open-storefront"
            >
              <ExternalLink size={12} /> Abrir vitrine
            </a>
          </>
        }
      />

      <PageBody className="flex flex-col gap-6">
        {/* Attention band */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
            <h2 className="text-[14px] font-semibold">Precisa da sua atenção</h2>
            <span className="text-[12px] text-[var(--text-3)]">itens que impactam vendas agora</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <AttentionCard tone="warning" icon={DollarSign} title={`${summary.missingPrice.length} produtos sem preço`} hint="Podem ficar invisíveis ou gerar erro no checkout" cta="Revisar agora" onClick={() => navigate("/admin/produtos?filter=sem-preco")} />
            <AttentionCard tone="danger" icon={AlertTriangle} title={`${summary.popularUnavailable.length} populares indisponíveis`} hint="Muito procurados nos últimos 30 dias" cta="Ver lista" onClick={() => navigate("/admin/produtos?filter=indisponivel")} />
            <AttentionCard tone="info" icon={Search} title={`${summary.withoutResult.length} buscas sem resultado`} hint="Oportunidades de novos produtos" cta="Ver pesquisas" onClick={() => navigate("/admin/analytics")} />
          </div>
        </div>

        {/* KPIs */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-4)]" />
            <h2 className="text-[14px] font-semibold">Operação</h2>
            <span className="text-[12px] text-[var(--text-3)]">sinais em tempo real (não representa faturamento)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            <StatCard label="Produtos ativos" value={num(summary.available)} hint={`de ${num(products.length)} cadastrados`} icon={Package} onClick={() => navigate("/admin/produtos")} testId="stat-produtos-ativos" />
            <StatCard label="Indisponíveis" value={num(summary.unavailable)} hint="não somem da vitrine" icon={Flame} tone="danger" onClick={() => navigate("/admin/produtos?filter=indisponivel")} testId="stat-produtos-indisponiveis" />
            <StatCard label="Pedidos hoje" value={num(summary.todayOrders)} hint="registrados no admin" icon={ShoppingCart} onClick={() => navigate("/admin/pedidos")} testId="stat-pedidos-hoje" />
            <StatCard label="Pedidos 7 dias" value={num(summary.last7)} hint="handoff via WhatsApp" icon={MessageCircle} onClick={() => navigate("/admin/pedidos")} testId="stat-pedidos-7d" />
            <StatCard label="Promoções" value={num(summary.activePromos)} hint="algumas encerram esta semana" icon={Percent} tone="gold" onClick={() => navigate("/admin/promocoes")} testId="stat-promocoes" />
            <StatCard label="Visitantes 7d" value={num(analytics.daily.slice(-7).reduce((s, d) => s + d.visits, 0))} hint="vitrine pública" icon={Eye} onClick={() => navigate("/admin/analytics")} testId="stat-visitantes-7d" />
          </div>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2" padding={false}>
            <CardHead title="Produtos sem preço" description={`${summary.missingPrice.length} itens têm algum nível vazio`}
              action={<button onClick={() => navigate("/admin/produtos?filter=sem-preco")} className="text-[12px] text-[var(--gold)] hover:text-[var(--gold-hover)] flex items-center gap-1 shrink-0">Ver todos <ArrowRight size={12} /></button>} />
            <div className="divide-y divide-[var(--hairline)]">
              {summary.missingPrice.slice(0, 6).map((p) => {
                const brand = findBrand(brands, p.brand);
                const missingTiers = Object.entries(p.prices).filter(([, v]) => v == null).map(([k]) => k);
                return (
                  <button key={p.id} onClick={() => navigate(`/admin/produtos/${p.id}`)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--layer-2)] transition-colors text-left">
                    <BrandAvatar name={brand?.name || "?"} tone={brand?.tone} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium truncate">{p.name} <span className="text-[var(--text-3)] font-normal">· {p.dosage}</span></div>
                      <div className="text-[11px] text-[var(--text-3)] truncate">{brand?.name}</div>
                    </div>
                    <div className="hidden sm:flex items-center gap-1 shrink-0">
                      {missingTiers.slice(0, 3).map((t) => <TierBadge key={t} tier={t} size="xs" />)}
                    </div>
                    <ArrowRight size={13} className="text-[var(--text-4)] shrink-0" />
                  </button>
                );
              })}
              {summary.missingPrice.length === 0 && <div className="px-4 py-6 text-[12px] text-[var(--text-3)]">Tudo em ordem — nenhum produto sem preço.</div>}
            </div>
          </Card>

          <Card padding={false}>
            <CardHead title="Extensões — atividade" description="Pedidos por operação (7d)"
              action={<button onClick={() => navigate("/admin/extensoes")} className="text-[12px] text-[var(--gold)] hover:text-[var(--gold-hover)] flex items-center gap-1 shrink-0">Gerenciar <ArrowRight size={12} /></button>} />
            <div className="divide-y divide-[var(--hairline)]">
              {extensionActivity.map((e) => (
                <button key={e.slug} onClick={() => navigate(`/admin/extensoes/${e.slug}`)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--layer-2)] transition-colors text-left">
                  <BrandAvatar name={e.initials} tone={e.tone} />
                  <div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{e.name}</div></div>
                  <div className="tabular text-[13px] font-semibold">{e.count}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="lg:col-span-2" padding={false}>
            <CardHead title="Pedidos recentes" description="Registro não significa venda concluída"
              action={<button onClick={() => navigate("/admin/pedidos")} className="text-[12px] text-[var(--gold)] hover:text-[var(--gold-hover)] flex items-center gap-1 shrink-0">Ver todos <ArrowRight size={12} /></button>} />
            <div className="divide-y divide-[var(--hairline)]">
              {orders.slice(0, 6).map((o) => {
                const ext = extensions.find((e) => e.slug === o.extension);
                return (
                  <button key={o.id} onClick={() => navigate(`/admin/pedidos/${o.id}`)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--layer-2)] transition-colors text-left">
                    <BrandAvatar name={ext?.initials || "?"} tone={ext?.tone} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium truncate">{o.client} <span className="text-[var(--text-3)] font-normal">· {o.city}/{o.state}</span></div>
                      <div className="text-[11px] text-[var(--text-3)] mono truncate">{o.id} · {relTime(o.createdAt)}</div>
                    </div>
                    <div className="tabular text-[13px] font-semibold shrink-0">{brl(o.total)}</div>
                  </button>
                );
              })}
            </div>
          </Card>

          <Card padding={false}>
            <CardHead title="Mais visualizados" description="30 dias" action={<TrendingUp size={14} className="text-[var(--gold)]" />} />
            <div className="divide-y divide-[var(--hairline)]">
              {mostViewed.map((p) => {
                const brand = findBrand(brands, p.brand);
                return (
                  <button key={p.id} onClick={() => navigate(`/admin/produtos/${p.id}`)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--layer-2)] transition-colors text-left">
                    <BrandAvatar name={brand?.name || "?"} tone={brand?.tone} />
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium truncate">{p.name}</div>
                      <div className="text-[11px] text-[var(--text-3)] truncate">{p.dosage} · {brand?.name}</div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[var(--text-3)] tabular shrink-0"><Eye size={11} /> {num(p.views)}</div>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>
      </PageBody>
    </div>
  );
}

function AttentionCard({ tone, icon: Icon, title, hint, cta, onClick }) {
  const t = {
    warning: { bg: "var(--warning-bg)", border: "var(--warning-border)", fg: "var(--warning)" },
    danger: { bg: "var(--danger-bg)", border: "var(--danger-border)", fg: "var(--danger)" },
    info: { bg: "var(--info-bg)", border: "var(--info-border)", fg: "var(--info)" },
  }[tone];
  return (
    <div className="rounded-[var(--r-md)] border p-3.5 flex gap-3" style={{ background: t.bg, borderColor: t.border }}>
      <div className="w-8 h-8 rounded-[var(--r-sm)] flex items-center justify-center shrink-0 border" style={{ borderColor: t.border, color: t.fg }}><Icon size={15} /></div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[var(--text-1)]">{title}</div>
        <div className="text-[11px] text-[var(--text-3)] mt-0.5">{hint}</div>
        <button onClick={onClick} className="mt-2 h-7 px-2.5 rounded-[var(--r-xs)] text-[12px] font-medium border hover:opacity-90 transition-opacity" style={{ background: "transparent", borderColor: t.border, color: t.fg }}>{cta}</button>
      </div>
    </div>
  );
}
