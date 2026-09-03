import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, PageBody, Card, EmptyState } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { Segmented } from "@/components/Segmented";
import { useStore, findExtension, findBrand } from "@/data/store";
import { brl, num, pct } from "@/lib/format";
import { ArrowLeft, Sparkles, Link2, RefreshCw, Search, X } from "lucide-react";
import { toast } from "sonner";

export default function ExtensionDetail() {
  const { slug } = useParams();
  const { extensions, products, brands, setExtensionOverride, orders } = useStore();
  const navigate = useNavigate();
  const ext = findExtension(extensions, slug);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("exceptions");

  const withOverride = useMemo(() => products.filter((p) => p.extensionOverrides?.[slug] != null), [products, slug]);
  const allProducts = useMemo(() => {
    let list = products;
    if (query.trim()) { const q = query.toLowerCase(); list = list.filter((p) => `${p.name} ${p.dosage} ${p.brand}`.toLowerCase().includes(q)); }
    return list.slice(0, 40);
  }, [products, query]);

  if (!ext) return <div className="p-8">Extensão não encontrada.</div>;
  const orderCount = orders.filter((o) => o.extension === slug).length;

  return (
    <div data-testid="extension-detail">
      <PageHeader
        title={<div className="flex items-center gap-2.5 min-w-0"><button onClick={() => navigate("/admin/extensoes")} className="p-1.5 rounded-[var(--r-sm)] text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] shrink-0"><ArrowLeft size={16} /></button><BrandAvatar name={ext.initials} tone={ext.tone} size={24} /><span className="truncate">{ext.name}</span></div>}
        subtitle={<>{num(withOverride.length)} exceções · {num(orderCount)} pedidos · herdando Varejo por padrão</>}
      >
        <Segmented value={tab} onChange={setTab} testIdPrefix="ext-tab" options={[{ key: "exceptions", label: "Exceções" }, { key: "catalog", label: "Catálogo" }, { key: "settings", label: "Ajustes" }]} />
      </PageHeader>

      <PageBody>
        {tab === "exceptions" && (
          <Card padding={false}>
            <div className="px-4 py-3 border-b border-[var(--hairline)] flex items-center justify-between gap-2">
              <div className="min-w-0"><div className="text-[13px] font-semibold">Preços personalizados</div><div className="text-[11px] text-[var(--text-3)] truncate">Produtos com preço diferente do Varejo nesta extensão</div></div>
              <span className="text-[12px] text-[var(--gold)] tabular shrink-0">{withOverride.length} exceções</span>
            </div>
            <div className="divide-y divide-[var(--hairline)]">
              {withOverride.map((p) => {
                const brand = findBrand(brands, p.brand);
                const custom = p.extensionOverrides[slug];
                const varejo = p.prices.varejo || 0;
                const delta = varejo ? ((custom / varejo) - 1) * 100 : 0;
                return (
                  <div key={p.id} className="flex items-center gap-3 px-4 py-2.5">
                    <BrandAvatar name={brand?.name || p.name} tone={brand?.tone} />
                    <button onClick={() => navigate(`/admin/produtos/${p.id}`)} className="flex-1 min-w-0 text-left hover:text-[var(--gold)] transition-colors">
                      <div className="text-[13px] font-medium truncate">{p.name} <span className="text-[var(--text-3)] font-normal">· {p.dosage}</span></div>
                      <div className="text-[11px] text-[var(--text-3)] truncate">{brand?.name}</div>
                    </button>
                    <div className="text-right shrink-0"><div className="tabular text-[13px] font-semibold text-[var(--gold)]">{brl(custom)}</div><div className="text-[11px] text-[var(--text-3)] tabular hidden sm:block">Varejo {brl(varejo)} <span className={delta < 0 ? "text-[var(--success)]" : "text-[var(--warning)]"}>({pct(delta, 0)})</span></div></div>
                    <button onClick={() => { setExtensionOverride(p.id, slug, null); toast("Voltou a herdar Varejo"); }} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] flex items-center gap-1 shrink-0" data-testid={`ext-detail-reset-${p.id}`}><RefreshCw size={11} /> <span className="hidden sm:inline">Herdar</span></button>
                  </div>
                );
              })}
              {withOverride.length === 0 && <EmptyState icon={Sparkles} title="Nenhuma exceção de preço" description="Todos os produtos herdam o Varejo" action={<button onClick={() => setTab("catalog")} className="h-8 px-3 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] flex items-center gap-1.5"><Sparkles size={12} /> Criar primeira exceção</button>} />}
            </div>
          </Card>
        )}

        {tab === "catalog" && (
          <div>
            <div className="relative max-w-md mb-3">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto para personalizar…" className="w-full h-9 pl-9 pr-8 rounded-[var(--r-sm)] bg-[var(--layer-1)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)]" />
              {query && <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)]"><X size={13} /></button>}
            </div>
            <Card padding={false}>
              <div className="divide-y divide-[var(--hairline)]">
                {allProducts.map((p) => {
                  const brand = findBrand(brands, p.brand);
                  const custom = p.extensionOverrides?.[slug];
                  const inherited = custom == null;
                  const varejo = p.prices.varejo || 0;
                  return (
                    <div key={p.id} className="flex items-center gap-3 px-4 py-2.5">
                      <BrandAvatar name={brand?.name || p.name} tone={brand?.tone} />
                      <div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{p.name} <span className="text-[var(--text-3)] font-normal">· {p.dosage}</span></div><div className="text-[11px] text-[var(--text-3)] truncate">{inherited ? <><Link2 size={9} className="inline mr-0.5" /> Herdando Varejo</> : <span className="text-[var(--gold)]"><Sparkles size={9} className="inline mr-0.5" /> Personalizado</span>}</div></div>
                      <div className="tabular text-[13px] text-right shrink-0 hidden sm:block"><div className={inherited ? "text-[var(--text-2)]" : "text-[var(--gold)] font-semibold"}>{brl(custom ?? varejo)}</div></div>
                      {inherited ? (
                        <button onClick={() => setExtensionOverride(p.id, slug, Math.round(varejo * 1.1))} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--gold-subtle-border)] bg-[var(--gold-subtle-bg)] text-[var(--gold)] hover:opacity-90 flex items-center gap-1 shrink-0"><Sparkles size={11} /> <span className="hidden sm:inline">Personalizar</span></button>
                      ) : (
                        <button onClick={() => setExtensionOverride(p.id, slug, null)} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] flex items-center gap-1 shrink-0"><RefreshCw size={11} /> <span className="hidden sm:inline">Herdar</span></button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {tab === "settings" && (
          <Card>
            <div className="text-[13px] font-semibold mb-3">Ajustes da extensão</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              {[["Nome", ext.name], ["Slug", <span className="mono">/vitrine/{ext.slug}</span>], ["Status", ext.active ? "Ativa" : "Pausada"], ["Política", "Herda Varejo com exceções"], ["Checkout", "WhatsApp handoff"], ["PIX", "Habilitado"]].map(([l, v], i) => (
                <div key={i} className="flex items-center justify-between py-2.5 border-b border-[var(--hairline)] text-[13px]"><span className="text-[var(--text-3)]">{l}</span><span className="text-[var(--text-1)] font-medium">{v}</span></div>
              ))}
            </div>
          </Card>
        )}
      </PageBody>
    </div>
  );
}
