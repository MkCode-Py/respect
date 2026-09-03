import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, Card } from "@/components/PageHeader";
import { TierBadge, TIER_STYLES } from "@/components/TierBadge";
import { BrandAvatar } from "@/components/BrandAvatar";
import { useStore, findBrand, findCategory, TIERS } from "@/data/store";
import { brl, pct } from "@/lib/format";
import {
  ArrowLeft, Save, Copy, Archive, Eye, EyeOff, Link2, Sparkles,
  Trash2, RefreshCw, Percent, ImageIcon, CircleDot, CircleOff, Info,
} from "lucide-react";
import { toast } from "sonner";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, brands, categories, extensions, updateProduct, toggleAvailability, setPrice, setExtensionOverride, setVisibility } = useStore();
  const product = useMemo(() => products.find((p) => p.id === id), [products, id]);

  if (!product) {
    return (
      <div className="p-8">
        <button onClick={() => navigate("/admin/produtos")} className="text-[13px] text-[var(--text-3)] hover:text-[var(--text-1)]">← Voltar</button>
        <div className="mt-4 text-[14px]">Produto não encontrado.</div>
      </div>
    );
  }
  const brand = findBrand(brands, product.brand);
  const category = findCategory(categories, product.category);

  return (
    <div data-testid="product-detail">
      <PageHeader
        title={
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={() => navigate("/admin/produtos")} className="p-1.5 rounded-[var(--r-sm)] text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] shrink-0"><ArrowLeft size={16} /></button>
            <span className="truncate">{product.name}</span>
            <span className="text-[var(--text-3)] font-normal text-[15px] tabular shrink-0">· {product.dosage}</span>
          </div>
        }
        subtitle={<>{brand?.name} · {category?.name} · <span className="mono text-[11px]">{product.id}</span></>}
        actions={
          <>
            <button onClick={() => toast("Produto duplicado (mock)")} className="h-9 px-3 rounded-[var(--r-sm)] text-[12px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] flex items-center gap-1.5"><Copy size={12} /> Duplicar</button>
            <button onClick={() => toast("Produto arquivado (mock)")} className="h-9 px-3 rounded-[var(--r-sm)] text-[12px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] flex items-center gap-1.5"><Archive size={12} /> Arquivar</button>
            <button onClick={() => toast.success("Alterações salvas")} className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] active:bg-[var(--gold-active)] flex items-center gap-1.5" data-testid="product-save"><Save size={12} /> Salvar</button>
          </>
        }
      />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 px-4 sm:px-6 lg:px-8 py-5">
        <div className="lg:col-span-8 flex flex-col gap-4 min-w-0">
          <IdentitySection product={product} brands={brands} categories={categories} onUpdate={(patch) => updateProduct(product.id, patch)} />
          <PricesSection product={product} onSetPrice={(t, v) => setPrice(product.id, t, v)} />
          <ExtensionsSection product={product} extensions={extensions} onSetOverride={(slug, v) => setExtensionOverride(product.id, slug, v)} />
          <PromoSection product={product} onUpdate={(patch) => updateProduct(product.id, patch)} />
        </div>
        <div className="lg:col-span-4 flex flex-col gap-4 min-w-0">
          <StatusSection product={product} onToggle={() => toggleAvailability(product.id)} />
          <VisibilitySection product={product} onSet={(tier, v) => setVisibility(product.id, tier, v)} />
          <MetaSection product={product} brand={brand} />
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, description, action }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--hairline)]">
      <div className="min-w-0"><div className="text-[13px] font-semibold tracking-[-0.005em]">{title}</div>{description && <div className="text-[11px] text-[var(--text-3)] mt-0.5">{description}</div>}</div>
      {action}
    </div>
  );
}

function Field({ label, children, span }) {
  return (
    <div className={span === "full" ? "sm:col-span-2" : ""}>
      <label className="block text-[11px] uppercase tracking-[0.08em] text-[var(--text-3)] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "h-9 w-full px-2.5 rounded-[var(--r-sm)] bg-[var(--layer-2)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30";

function IdentitySection({ product, brands, categories, onUpdate }) {
  return (
    <Card padding={false}>
      <SectionHeader title="Identidade" description="Informações básicas exibidas para clientes" />
      <div className="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-4 p-4">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.08em] text-[var(--text-3)] mb-1.5">Imagem</label>
          <div className="aspect-square rounded-[var(--r-sm)] border border-dashed border-[var(--stroke)] bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-4)] hover:border-[var(--gold)] cursor-pointer transition-colors"><ImageIcon size={20} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Nome" span="full"><input defaultValue={product.name} onBlur={(e) => onUpdate({ name: e.target.value })} className={inputCls} /></Field>
          <Field label="Marca"><select defaultValue={product.brand} onChange={(e) => onUpdate({ brand: e.target.value })} className={inputCls}>{brands.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}</select></Field>
          <Field label="Categoria"><select defaultValue={product.category} onChange={(e) => onUpdate({ category: e.target.value })} className={inputCls}>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></Field>
          <Field label="Forma"><input defaultValue={product.form} onBlur={(e) => onUpdate({ form: e.target.value })} className={inputCls} /></Field>
          <Field label="Dosagem"><input defaultValue={product.dosage} onBlur={(e) => onUpdate({ dosage: e.target.value })} className={inputCls} /></Field>
          <Field label="Apresentação" span="full"><input defaultValue={product.pack} onBlur={(e) => onUpdate({ pack: e.target.value })} className={inputCls} /></Field>
        </div>
      </div>
    </Card>
  );
}

function PricesSection({ product, onSetPrice }) {
  const varejo = product.prices.varejo || 0;
  return (
    <Card padding={false}>
      <SectionHeader title="Preços por nível comercial" description="7 níveis independentes. Sem regra percentual automática." />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px bg-[var(--hairline)] border-t border-[var(--hairline)]">
        {TIERS.map((tier) => {
          const value = product.prices[tier.key];
          const delta = value != null && varejo && tier.key !== "varejo" ? ((value / varejo) - 1) * 100 : null;
          const style = TIER_STYLES[tier.key];
          return (
            <div key={tier.key} className="p-3 bg-[var(--layer-1)] min-w-0">
              <div className="flex items-center gap-1.5 mb-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: style.fg }} /><span className="text-[11px] uppercase tracking-[0.06em] font-medium truncate" style={{ color: style.fg }}>{tier.label}</span></div>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[var(--text-4)]">R$</span>
                <input type="number" step="0.01" defaultValue={value ?? ""} onBlur={(e) => onSetPrice(tier.key, e.target.value === "" ? null : parseFloat(e.target.value))} placeholder="—" className="tabular w-full h-9 pl-8 pr-2 rounded-[var(--r-sm)] bg-[var(--layer-2)] border border-[var(--hairline)] text-[13px] font-semibold focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30" data-testid={`price-input-${tier.key}`} />
              </div>
              <div className="mt-1.5 h-4 text-[10px] text-[var(--text-3)] tabular">{delta != null ? <span style={{ color: delta < 0 ? "var(--success)" : "var(--warning)" }}>{pct(delta, 0)} vs Varejo</span> : tier.key === "varejo" ? <span>Referência</span> : <span className="text-[var(--warning)]">Sem preço</span>}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function ExtensionsSection({ product, extensions, onSetOverride }) {
  const varejo = product.prices.varejo || 0;
  return (
    <Card padding={false}>
      <SectionHeader title="Extensões — preço herdado" description="Cada extensão herda o Varejo por padrão. Crie exceções só quando necessário." />
      <div className="divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
        {extensions.map((ext) => {
          const custom = product.extensionOverrides?.[ext.slug];
          const inherited = custom == null;
          const value = custom ?? varejo;
          const delta = varejo && custom != null ? ((custom / varejo) - 1) * 100 : null;
          return (
            <div key={ext.slug} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-4 py-2.5" data-testid={`extension-row-${ext.slug}`}>
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <BrandAvatar name={ext.initials} tone={ext.tone} />
                <div className="min-w-0">
                  <div className="text-[13px] font-medium truncate">{ext.name}</div>
                  <div className="text-[11px] text-[var(--text-3)] mt-0.5 flex items-center gap-2 flex-wrap">
                    {inherited ? (
                      <span className="inline-flex items-center gap-1 h-4 px-1.5 rounded-full border border-[var(--hairline)] bg-[var(--layer-2)] text-[10px] uppercase tracking-[0.06em] text-[var(--text-3)]"><Link2 size={9} /> Herdando Varejo</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 h-4 px-1.5 rounded-full border text-[10px] uppercase tracking-[0.06em] font-medium" style={{ background: "var(--gold-subtle-bg)", borderColor: "var(--gold-subtle-border)", color: "var(--gold)" }}><Sparkles size={9} /> Personalizado</span>
                    )}
                    {delta != null && <span className="tabular">{pct(delta, 0)} vs Varejo</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="relative flex-1 sm:flex-none">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[11px] text-[var(--text-4)]">R$</span>
                  <input type="number" step="0.01" defaultValue={value} key={value} onBlur={(e) => { const v = parseFloat(e.target.value); if (Number.isNaN(v) || v === varejo) return; onSetOverride(ext.slug, v); }} className={`tabular w-full sm:w-28 h-8 pl-7 pr-2 rounded-[var(--r-sm)] border text-[13px] font-medium focus:outline-none focus:border-[var(--gold)] ${inherited ? "bg-[var(--layer-2)] border-[var(--hairline)] text-[var(--text-3)]" : "bg-[var(--gold-subtle-bg)] border-[var(--gold-subtle-border)] text-[var(--gold)]"}`} data-testid={`extension-input-${ext.slug}`} />
                </div>
                {!inherited ? (
                  <button onClick={() => { onSetOverride(ext.slug, null); toast("Voltou a herdar Varejo"); }} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] flex items-center gap-1 shrink-0" data-testid={`extension-reset-${ext.slug}`}><RefreshCw size={11} /> Herdar</button>
                ) : (
                  <button onClick={() => onSetOverride(ext.slug, Math.round(varejo * 1.1))} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--gold-subtle-border)] bg-[var(--gold-subtle-bg)] text-[var(--gold)] hover:opacity-90 flex items-center gap-1 shrink-0" data-testid={`extension-create-${ext.slug}`}><Sparkles size={11} /> Personalizar</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function PromoSection({ product, onUpdate }) {
  const [promo, setPromo] = useState(product.promo);
  const varejo = product.prices.varejo || 0;
  const discount = promo?.price && varejo ? Math.round((1 - promo.price / varejo) * 100) : 0;
  const futureIso = (days) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString(); };
  return (
    <Card padding={false}>
      <SectionHeader title="Promoção" description={promo ? `Em promoção até ${new Date(promo.endsAt).toLocaleDateString("pt-BR")}` : "Nenhuma promoção ativa"}
        action={promo ? (
          <button onClick={() => { setPromo(null); onUpdate({ promo: null }); toast("Promoção removida"); }} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border border-[var(--danger-border)] bg-[var(--danger-bg)] text-[var(--danger)] hover:opacity-90 flex items-center gap-1"><Trash2 size={11} /> Remover</button>
        ) : (
          <button onClick={() => { const next = { price: Math.round(varejo * 0.85), endsAt: futureIso(14) }; setPromo(next); onUpdate({ promo: next }); }} className="h-8 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] flex items-center gap-1"><Percent size={11} /> Criar</button>
        )}
      />
      {promo && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Field label="Preço promocional"><div className="relative"><span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[var(--text-4)]">R$</span><input type="number" step="0.01" defaultValue={promo.price} onBlur={(e) => { const next = { ...promo, price: parseFloat(e.target.value) || 0 }; setPromo(next); onUpdate({ promo: next }); }} className="tabular h-9 w-full pl-8 pr-2 rounded-[var(--r-sm)] bg-[var(--gold-subtle-bg)] border border-[var(--gold-subtle-border)] text-[13px] text-[var(--gold)] font-semibold focus:outline-none focus:border-[var(--gold)]" /></div></Field>
          <Field label="Encerra em"><input type="date" defaultValue={promo.endsAt.slice(0, 10)} onBlur={(e) => { const next = { ...promo, endsAt: new Date(e.target.value).toISOString() }; setPromo(next); onUpdate({ promo: next }); }} className={inputCls} /></Field>
          <Field label="Desconto"><div className="h-9 flex items-center gap-2 px-2.5 rounded-[var(--r-sm)] bg-[var(--layer-2)] border border-[var(--hairline)]"><Percent size={12} className="text-[var(--gold)]" /><span className="tabular text-[13px] font-semibold text-[var(--gold)]">{discount}%</span><span className="text-[11px] text-[var(--text-3)] truncate">sobre {brl(varejo)}</span></div></Field>
        </div>
      )}
    </Card>
  );
}

function StatusSection({ product, onToggle }) {
  return (
    <Card padding={false}>
      <SectionHeader title="Status" description="Disponibilidade e visibilidade" />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0"><div className="text-[12px] text-[var(--text-3)] uppercase tracking-[0.06em]">Disponibilidade</div><div className="text-[13px] mt-0.5">{product.available ? "Disponível para venda" : "Aparece como indisponível"}</div></div>
          <button onClick={() => { onToggle(); toast(product.available ? "Marcado como indisponível" : "Marcado como disponível"); }} className="h-8 px-3 rounded-[var(--r-sm)] text-[12px] font-medium border flex items-center gap-1.5 transition-colors shrink-0" style={product.available ? { background: "var(--success-bg)", borderColor: "var(--success-border)", color: "var(--success)" } : { background: "var(--danger-bg)", borderColor: "var(--danger-border)", color: "var(--danger)" }} data-testid="product-detail-toggle-availability">{product.available ? <><CircleDot size={12} /> Disponível</> : <><CircleOff size={12} /> Indisponível</>}</button>
        </div>
        <div className="h-px bg-[var(--hairline)]" />
        <div className="text-[11px] text-[var(--text-3)] flex items-start gap-1.5"><Info size={12} className="shrink-0 mt-0.5" /><span>Indisponível não some da vitrine — continua visível, marcado como tal.</span></div>
      </div>
    </Card>
  );
}

function VisibilitySection({ product, onSet }) {
  return (
    <Card padding={false}>
      <SectionHeader title="Visibilidade por nível" description="Oculte o produto em níveis específicos" />
      <div className="divide-y divide-[var(--hairline)] border-t border-[var(--hairline)]">
        {TIERS.map((tier) => {
          const visible = product.visibility?.[tier.key] !== false;
          return (
            <div key={tier.key} className="flex items-center justify-between px-4 h-11">
              <TierBadge tier={tier.key} size="xs" />
              <button onClick={() => onSet(tier.key, !visible)} className="h-7 px-2.5 rounded-[var(--r-sm)] text-[11px] font-medium border flex items-center gap-1 transition-colors" style={visible ? { background: "var(--layer-2)", borderColor: "var(--hairline)", color: "var(--text-2)" } : { background: "var(--danger-bg)", borderColor: "var(--danger-border)", color: "var(--danger)" }} data-testid={`visibility-toggle-${tier.key}`}>{visible ? <><Eye size={11} /> Visível</> : <><EyeOff size={11} /> Oculto</>}</button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function MetaSection({ product, brand }) {
  const rows = [
    ["Visualizações (30d)", product.views],
    ["Pesquisas (30d)", product.searches],
    ["Adicionado em", new Date(product.addedAt).toLocaleDateString("pt-BR")],
    ["Marca", brand?.name],
  ];
  return (
    <Card padding={false}>
      <SectionHeader title="Metadados" description="Dados operacionais" />
      <div className="p-4 flex flex-col gap-2 text-[12px]">
        {rows.map(([l, v]) => <div key={l} className="flex items-center justify-between gap-2"><span className="text-[var(--text-3)]">{l}</span><span className="text-[var(--text-1)] tabular truncate">{v ?? "—"}</span></div>)}
        <div className="flex items-center justify-between gap-2"><span className="text-[var(--text-3)]">ID</span><span className="mono text-[11px] text-[var(--text-2)]">{product.id}</span></div>
      </div>
    </Card>
  );
}
