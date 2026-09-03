import { useMemo, useState } from "react";
import { useStore, TIERS } from "@/data/store";
import { BrandAvatar } from "@/components/BrandAvatar";
import { FilterSelect } from "@/components/FilterSelect";
import { brl, num } from "@/lib/format";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import {
  Search, X, Percent, Truck, ScrollText, PackageSearch, Copy,
  FileText, ChevronDown, ArrowLeft, Sparkles, Info, Package,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function Storefront() {
  const { categories, brands, products, freights, shippingRules, promotions } = useStore();
  const [query, setQuery] = useState("");
  const [tier, setTier] = useState("varejo");
  const [showPanel, setShowPanel] = useState(null);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    return categories.map((cat) => {
      const catBrands = brands.filter((b) => b.category === cat.slug);
      const brandGroups = catBrands.map((br) => {
        let items = products.filter((p) => p.brand === br.slug);
        if (q) items = items.filter((p) => `${p.name} ${p.dosage} ${br.name} ${cat.name}`.toLowerCase().includes(q));
        const unavailable = items.filter((p) => !p.available).length;
        return { brand: br, products: items, unavailable };
      }).filter((g) => g.products.length > 0);
      const totalProducts = brandGroups.reduce((s, g) => s + g.products.length, 0);
      return { cat, brandGroups, totalBrands: brandGroups.length, totalProducts };
    }).filter((g) => g.totalProducts > 0);
  }, [categories, brands, products, query]);

  const totalProducts = grouped.reduce((s, g) => s + g.totalProducts, 0);

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-1)]" data-testid="storefront">
      {/* Sticky Header */}
      <header className="sticky top-0 z-30 bg-[var(--canvas)]/90 backdrop-blur-md border-b border-[var(--hairline)]">
        <div className="px-4 sm:px-6 h-14 flex items-center gap-3 max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[9px] flex items-center justify-center font-extrabold text-[14px] text-[var(--canvas)] shrink-0" style={{ background: "linear-gradient(150deg, var(--gold-soft), var(--gold-active))" }}>R</div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold tracking-[-0.01em] truncate">Respect Pharma</div>
              <div className="text-[10px] text-[var(--gold)] uppercase tracking-[0.16em] leading-none font-semibold">Catálogo oficial</div>
            </div>
          </div>
          <div className="flex-1" />
          <div className="w-[118px] sm:w-[150px] shrink-0">
            <FilterSelect value={tier} onChange={setTier} size="sm"
              options={TIERS.map((t) => ({ value: t.key, label: `Nível: ${t.label}` }))} testId="storefront-tier-selector" />
          </div>
          <Link to="/admin" className="h-8 px-2.5 rounded-[var(--r-sm)] text-[12px] border border-[var(--hairline)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--stroke)] flex items-center gap-1.5 shrink-0">
            <ArrowLeft size={12} /> <span className="hidden sm:inline">Admin</span>
          </Link>
        </div>

        {/* Search + chips */}
        <div className="px-4 sm:px-6 pb-3 max-w-5xl mx-auto">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar produto ou marca…"
              className="w-full h-11 pl-9 pr-9 rounded-[var(--r-md)] bg-[var(--layer-1)] border border-[var(--hairline)] text-[14px] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
              data-testid="storefront-search" />
            {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"><X size={14} /></button>}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <QuickPill icon={Percent} tone="gold" label={`Promoções · ${promotions.length}`} onClick={() => setShowPanel("promo")} testId="pill-promo" />
            <QuickPill icon={Truck} tone="info" label="Fretes" onClick={() => setShowPanel("freight")} testId="pill-freight" />
            <QuickPill icon={ScrollText} label="Regras de Envio" onClick={() => setShowPanel("rules")} testId="pill-rules" />
            <QuickPill icon={PackageSearch} label="Rastrear pedido" onClick={() => setShowPanel("track")} testId="pill-track" />
            <QuickPill icon={Sparkles} tone="gold" label="Novidades" onClick={() => toast("17 novidades · mock")} />
          </div>
        </div>
      </header>

      {showPanel && (
        <div className="px-4 sm:px-6 py-3 max-w-5xl mx-auto">
          <Panel type={showPanel} onClose={() => setShowPanel(null)} freights={freights} rules={shippingRules} promotions={promotions} />
        </div>
      )}

      {/* Info note */}
      <div className="px-4 sm:px-6 pt-4 max-w-5xl mx-auto">
        <div className="rounded-[var(--r-md)] border border-[var(--gold-subtle-border)] bg-[var(--gold-subtle-bg)] p-3 flex gap-2.5">
          <Info size={15} className="text-[var(--gold)] mt-0.5 shrink-0" />
          <div className="text-[12px] text-[var(--text-2)] min-w-0">Algumas marcas fabricam produtos em ampola e em bujão. <span className="text-[var(--text-3)]">Imagens ilustrativas · preços por nível comercial.</span></div>
        </div>
      </div>

      {/* Catalog */}
      <div className="px-4 sm:px-6 py-4 max-w-5xl mx-auto">
        <div className="mb-3 text-[11px] text-[var(--text-3)] uppercase tracking-[0.1em]">Catálogo · {num(totalProducts)} produtos</div>

        <Accordion type="multiple" className="flex flex-col gap-2" data-testid="catalog-accordion">
          {grouped.map((g) => (
            <AccordionItem key={g.cat.slug} value={g.cat.slug} className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
              <AccordionTrigger className="px-3 py-3 hover:no-underline hover:bg-[var(--layer-2)] transition-colors [&>svg]:hidden" data-testid={`cat-trigger-${g.cat.slug}`}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <BrandAvatar name={g.cat.short} tone={g.cat.tone} size={30} />
                  <div className="text-left min-w-0 flex-1">
                    <div className="text-[14px] font-semibold uppercase tracking-[-0.005em] truncate">{g.cat.name}</div>
                    <div className="text-[11px] text-[var(--text-3)]">{g.totalBrands} marcas · {g.totalProducts} produtos</div>
                  </div>
                  <ChevronDown size={17} className="chev text-[var(--text-3)] shrink-0" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="border-t border-[var(--hairline)]">
                  <Accordion type="multiple" className="flex flex-col divide-y divide-[var(--hairline)]">
                    {g.brandGroups.map((bg) => (
                      <AccordionItem key={bg.brand.slug} value={bg.brand.slug} className="border-0">
                        <AccordionTrigger className="px-3 py-2.5 hover:no-underline hover:bg-[var(--layer-2)] transition-colors [&>svg]:hidden" data-testid={`brand-trigger-${bg.brand.slug}`}>
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <BrandAvatar name={bg.brand.name} tone={bg.brand.tone} size={24} />
                            <div className="text-left min-w-0 flex-1">
                              <div className="text-[13px] font-semibold uppercase truncate">{bg.brand.name}</div>
                              <div className="text-[11px] text-[var(--text-3)]">{bg.products.length} produtos{bg.unavailable > 0 && <span className="text-[var(--warning)]"> · {bg.unavailable} indisponíveis</span>}</div>
                            </div>
                            <ChevronDown size={15} className="chev text-[var(--text-3)] shrink-0" />
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          <div className="bg-[var(--canvas)] border-t border-[var(--hairline)] divide-y divide-[var(--hairline)]">
                            {bg.products.map((p) => <ProductRow key={p.id} product={p} tier={tier} />)}
                            <div className="px-3 py-2.5 flex items-center gap-2 flex-wrap">
                              <button onClick={() => { navigator.clipboard?.writeText(`Lista ${bg.brand.name}`); toast("Lista copiada"); }} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-2)] hover:text-[var(--text-1)] flex items-center gap-1.5"><Copy size={11} /> Copiar lista</button>
                              <button onClick={() => toast("PDF gerado (mock)")} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--gold-subtle-border)] bg-[var(--gold-subtle-bg)] text-[var(--gold)] flex items-center gap-1.5"><FileText size={11} /> PDF</button>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}

          {grouped.length === 0 && (
            <div className="text-center py-12">
              <PackageSearch size={24} className="text-[var(--text-4)] mx-auto" />
              <div className="text-[14px] font-semibold mt-2">Nada encontrado para “{query}”</div>
              <div className="text-[12px] text-[var(--text-3)] mt-1">Tente outro termo ou limpe a busca.</div>
            </div>
          )}
        </Accordion>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 border-t border-[var(--hairline)] bg-[var(--layer-1)]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between text-[11px] text-[var(--text-3)] gap-2">
          <span className="uppercase tracking-[0.1em] truncate">Respect Pharma · {num(totalProducts)} produtos</span>
          <span className="hidden sm:inline shrink-0">Envio nacional · Rastreamento por CPF · Seguro opcional</span>
        </div>
      </div>
    </div>
  );
}

function ProductRow({ product, tier }) {
  const price = product.prices[tier] ?? product.prices.varejo;
  const promoPrice = product.promo?.price;
  const isPromo = !!promoPrice;
  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 ${product.available ? "" : "opacity-70"}`} data-testid={`storefront-product-${product.id}`}>
      <div className="w-9 h-9 rounded-[var(--r-sm)] bg-[var(--layer-2)] border border-[var(--hairline)] flex items-center justify-center text-[var(--text-3)] shrink-0"><Package size={14} /></div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
          <div className="text-[13px] font-medium truncate">{product.name}</div>
          {isPromo && <span className="inline-flex items-center gap-0.5 h-4 px-1 rounded-full border text-[10px] font-medium" style={{ background: "var(--gold-subtle-bg)", borderColor: "var(--gold-subtle-border)", color: "var(--gold)" }}><Percent size={8} /> promo</span>}
          {!product.available && <span className="inline-flex items-center h-4 px-1.5 rounded-full border text-[10px] font-medium" style={{ background: "var(--danger-bg)", borderColor: "var(--danger-border)", color: "var(--danger)" }}>indisponível</span>}
        </div>
        <div className="text-[11px] text-[var(--text-3)] mt-0.5 truncate">{product.dosage} · {product.pack}</div>
      </div>
      <div className="text-right shrink-0">
        {isPromo ? (
          <><div className="text-[13px] font-semibold tabular text-[var(--gold)]">{brl(promoPrice)}</div><div className="text-[10px] text-[var(--text-4)] line-through tabular">{brl(price)}</div></>
        ) : price != null ? (
          <div className="text-[13px] font-semibold tabular">{brl(price)}</div>
        ) : (
          <div className="text-[11px] text-[var(--warning)]">sem preço</div>
        )}
      </div>
    </div>
  );
}

function QuickPill({ icon: Icon, tone, label, onClick, testId }) {
  const toneMap = {
    default: { bg: "var(--layer-1)", border: "var(--hairline)", fg: "var(--text-2)" },
    gold: { bg: "var(--gold-subtle-bg)", border: "var(--gold-subtle-border)", fg: "var(--gold)" },
    info: { bg: "var(--info-bg)", border: "var(--info-border)", fg: "var(--info)" },
  }[tone || "default"];
  return (
    <button onClick={onClick} className="shrink-0 h-8 px-3 rounded-full border text-[12px] font-medium flex items-center gap-1.5 hover:opacity-90 transition-opacity" style={{ background: toneMap.bg, borderColor: toneMap.border, color: toneMap.fg }} data-testid={testId}>
      <Icon size={12} /> {label}
    </button>
  );
}

function Panel({ type, onClose, freights, rules, promotions }) {
  const titles = { promo: "Promoções ativas", freight: "Tabela de Fretes", rules: "Regras de Envio", track: "Rastrear seu pedido" };
  return (
    <div className="rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
      <div className="px-3 py-2.5 border-b border-[var(--hairline)] flex items-center justify-between">
        <div className="text-[13px] font-semibold">{titles[type]}</div>
        <button onClick={onClose} className="text-[var(--text-3)] hover:text-[var(--text-1)]"><X size={15} /></button>
      </div>
      <div className="p-3">
        {type === "promo" && (
          <div className="divide-y divide-[var(--hairline)]">
            {promotions.slice(0, 8).map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-[var(--r-sm)] border border-[var(--gold-subtle-border)] bg-[var(--gold-subtle-bg)] text-[var(--gold)] flex items-center justify-center shrink-0"><Percent size={12} /></div>
                <div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{p.productName}</div><div className="text-[11px] text-[var(--text-3)]">{p.discount}% off · encerra em breve</div></div>
                <div className="text-right shrink-0"><div className="tabular text-[13px] font-semibold text-[var(--gold)]">{brl(p.promoPrice)}</div><div className="text-[10px] text-[var(--text-4)] line-through tabular">{brl(p.originalPrice)}</div></div>
              </div>
            ))}
          </div>
        )}
        {type === "freight" && (
          <div className="divide-y divide-[var(--hairline)]">
            {freights.map((f) => (
              <div key={f.id} className="flex items-center gap-3 py-2">
                <Truck size={14} className="text-[var(--text-3)] shrink-0" />
                <div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{f.label} · {f.region}</div><div className="text-[11px] text-[var(--text-3)]">{f.days}</div></div>
                <div className="tabular text-[13px] font-semibold shrink-0">{brl(f.price)}</div>
              </div>
            ))}
          </div>
        )}
        {type === "rules" && (
          <div className="flex flex-col gap-2">
            {rules.map((r) => (
              <div key={r.id} className="rounded-[var(--r-sm)] border border-[var(--hairline)] bg-[var(--canvas)] p-2.5"><div className="text-[13px] font-medium">{r.title}</div><div className="text-[12px] text-[var(--text-3)] mt-0.5">{r.detail}</div></div>
            ))}
          </div>
        )}
        {type === "track" && (
          <div className="flex flex-col gap-2">
            <div className="text-[12px] text-[var(--text-3)]">Informe seu CPF para consultar o status do envio.</div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input placeholder="000.000.000-00" className="flex-1 h-9 px-2.5 rounded-[var(--r-sm)] bg-[var(--layer-2)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)]" />
              <button onClick={() => toast("Nenhum pedido em rastreio (mock)")} className="h-9 px-3 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)]">Consultar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
