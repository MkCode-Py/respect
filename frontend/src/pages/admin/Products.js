import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader, PageBody, EmptyState } from "@/components/PageHeader";
import { AvailabilityToggle } from "@/components/AvailabilityBadge";
import { BrandAvatar } from "@/components/BrandAvatar";
import { Segmented } from "@/components/Segmented";
import { FilterSelect } from "@/components/FilterSelect";
import { useStore, findBrand, findCategory } from "@/data/store";
import { brl, num } from "@/lib/format";
import { Search, Plus, ChevronRight, Percent, Puzzle, X, ArrowUpDown, PackageSearch } from "lucide-react";
import { toast } from "sonner";

export default function Products() {
  const { products, brands, categories, toggleAvailability } = useStore();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("todas");
  const [category, setCategory] = useState("todas");
  const [sort, setSort] = useState({ key: "name", dir: "asc" });
  const filter = params.get("filter") || "todos";
  const setFilter = (v) => { params.set("filter", v); setParams(params, { replace: true }); };
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    let list = products;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => `${p.name} ${p.dosage} ${p.brand} ${p.form}`.toLowerCase().includes(q));
    }
    if (brand !== "todas") list = list.filter((p) => p.brand === brand);
    if (category !== "todas") list = list.filter((p) => p.category === category);
    if (filter === "disponivel") list = list.filter((p) => p.available);
    if (filter === "indisponivel") list = list.filter((p) => !p.available);
    if (filter === "sem-preco") list = list.filter((p) => Object.values(p.prices).some((v) => v == null));
    if (filter === "promocao") list = list.filter((p) => p.promo);
    if (filter === "excecao") list = list.filter((p) => Object.keys(p.extensionOverrides || {}).length > 0);
    list = [...list].sort((a, b) => {
      if (sort.key === "varejo") return ((a.prices.varejo || 0) - (b.prices.varejo || 0)) * (sort.dir === "asc" ? 1 : -1);
      const av = a[sort.key], bv = b[sort.key];
      if (typeof av === "string") return av.localeCompare(bv || "") * (sort.dir === "asc" ? 1 : -1);
      return ((av || 0) - (bv || 0)) * (sort.dir === "asc" ? 1 : -1);
    });
    return list;
  }, [products, query, brand, category, filter, sort]);

  const counts = useMemo(() => ({
    todos: products.length,
    disponivel: products.filter((p) => p.available).length,
    indisponivel: products.filter((p) => !p.available).length,
    semPreco: products.filter((p) => Object.values(p.prices).some((v) => v == null)).length,
    promocao: products.filter((p) => p.promo).length,
    excecao: products.filter((p) => Object.keys(p.extensionOverrides || {}).length > 0).length,
  }), [products]);

  const QUICK = [
    { key: "todos", label: "Todos", count: counts.todos },
    { key: "disponivel", label: "Disponíveis", count: counts.disponivel },
    { key: "indisponivel", label: "Indisponíveis", count: counts.indisponivel },
    { key: "sem-preco", label: "Sem preço", count: counts.semPreco },
    { key: "promocao", label: "Em promoção", count: counts.promocao },
    { key: "excecao", label: "Com exceção", count: counts.excecao },
  ];

  const toggleSort = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === "asc" ? "desc" : "asc" }));
  const clearAll = () => { setQuery(""); setBrand("todas"); setCategory("todas"); setFilter("todos"); };

  return (
    <div data-testid="products-page">
      <PageHeader
        title="Produtos"
        subtitle={<><span className="tabular text-[var(--text-2)] font-medium">{num(counts.todos)}</span> cadastrados · <span className="tabular text-[var(--text-2)] font-medium">{num(filtered.length)}</span> exibidos{counts.semPreco > 0 && <> · <span className="text-[var(--warning)] font-medium">{counts.semPreco} sem preço</span></>}</>}
        actions={
          <>
            <button className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-medium border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-1)] hover:bg-[var(--layer-2)] flex items-center gap-1.5" onClick={() => navigate("/admin/promocoes")} data-testid="products-new-campaign">
              <Percent size={13} className="text-[var(--gold)]" /> Campanha
            </button>
            <button className="h-9 px-3.5 rounded-[var(--r-sm)] text-[12px] font-semibold bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] active:bg-[var(--gold-active)] flex items-center gap-1.5" onClick={() => toast.success("Fluxo de criar produto (mock)")} data-testid="products-new-product">
              <Plus size={13} /> Novo produto
            </button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 min-w-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nome, marca, dosagem…"
                className="w-full h-9 pl-9 pr-8 rounded-[var(--r-sm)] bg-[var(--layer-1)] border border-[var(--hairline)] text-[13px] placeholder:text-[var(--text-4)] focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30"
                data-testid="products-search-input" />
              {query && <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-3)] hover:text-[var(--text-1)]"><X size={13} /></button>}
            </div>
            <div className="flex gap-2">
              <FilterSelect value={brand} onChange={setBrand} placeholder="Marca" testId="products-filter-brand" className="flex-1 sm:w-44"
                options={[{ value: "todas", label: "Todas as marcas" }, ...brands.map((b) => ({ value: b.slug, label: b.name }))]} />
              <FilterSelect value={category} onChange={setCategory} placeholder="Categoria" testId="products-filter-category" className="flex-1 sm:w-48"
                options={[{ value: "todas", label: "Todas as categorias" }, ...categories.map((c) => ({ value: c.slug, label: c.name }))]} />
            </div>
          </div>
          <div data-testid="products-quick-filters">
            <Segmented options={QUICK} value={filter} onChange={setFilter} testIdPrefix="products-filter" />
          </div>
        </div>
      </PageHeader>

      <PageBody>
        {/* Desktop table */}
        <div className="hidden md:block rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] shadow-[var(--shadow-card)] overflow-hidden">
          <table className="w-full text-[13px] table-fixed">
            <thead>
              <tr className="bg-[var(--layer-1)] border-b border-[var(--hairline)] text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">
                <th className="text-left font-semibold px-4 py-2.5">
                  <button onClick={() => toggleSort("name")} className="inline-flex items-center gap-1 hover:text-[var(--text-1)]">Produto <ArrowUpDown size={11} className={sort.key === "name" ? "text-[var(--gold)]" : ""} /></button>
                </th>
                <th className="text-left font-semibold px-3 py-2.5 hidden lg:table-cell w-[148px]">Marca</th>
                <th className="text-left font-semibold px-3 py-2.5 hidden xl:table-cell w-[168px]">Categoria</th>
                <th className="text-left font-semibold px-3 py-2.5 w-[128px]">Status</th>
                <th className="text-right font-semibold px-3 py-2.5 w-[104px]">
                  <button onClick={() => toggleSort("varejo")} className="inline-flex items-center gap-1 hover:text-[var(--text-1)]">Varejo <ArrowUpDown size={11} className={sort.key === "varejo" ? "text-[var(--gold)]" : ""} /></button>
                </th>
                <th className="text-right font-semibold px-3 py-2.5 hidden xl:table-cell w-[104px]">Diamante</th>
                <th className="text-center font-semibold px-3 py-2.5 hidden lg:table-cell w-[64px]">Ext.</th>
                <th className="px-2 py-2.5 w-[40px]" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--hairline)]">
              {filtered.slice(0, 120).map((p) => {
                const b = findBrand(brands, p.brand);
                const c = findCategory(categories, p.category);
                const overrides = Object.keys(p.extensionOverrides || {}).length;
                const missingVarejo = p.prices.varejo == null;
                return (
                  <tr key={p.id} className="group hover:bg-[var(--layer-2)] cursor-pointer transition-colors" onClick={() => navigate(`/admin/produtos/${p.id}`)} data-testid={`product-row-${p.id}`}>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <BrandAvatar name={b?.name || p.name} tone={b?.tone} />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{p.name}</div>
                          <div className="text-[11px] text-[var(--text-3)] truncate">{p.dosage} · {p.pack}{p.promo && <span className="text-[var(--gold)] font-medium"> · promo</span>}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 hidden lg:table-cell text-[var(--text-2)] truncate">{b?.name}</td>
                    <td className="px-3 py-2.5 hidden xl:table-cell">
                      {c && <span className="inline-flex items-center gap-1.5 h-5 px-2 rounded-full border border-[var(--hairline)] bg-[var(--layer-2)] text-[11px] text-[var(--text-2)] max-w-full"><span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: c.tone }} /><span className="truncate">{c.name}</span></span>}
                    </td>
                    <td className="px-3 py-2.5"><AvailabilityToggle available={p.available} onToggle={() => { toggleAvailability(p.id); toast(p.available ? "Marcado como indisponível" : "Marcado como disponível", { duration: 1500 }); }} testId={`toggle-availability-${p.id}`} /></td>
                    <td className="px-3 py-2.5 text-right tabular font-semibold">{missingVarejo ? <span className="text-[var(--warning)] text-[11px] uppercase tracking-wide">sem preço</span> : brl(p.prices.varejo)}</td>
                    <td className="px-3 py-2.5 text-right hidden xl:table-cell tabular text-[var(--text-2)]">{p.prices.diamante != null ? brl(p.prices.diamante) : <span className="text-[var(--text-4)]">—</span>}</td>
                    <td className="px-3 py-2.5 text-center hidden lg:table-cell">{overrides > 0 ? <span className="inline-flex items-center gap-1 h-5 px-1.5 rounded-full border text-[11px] font-medium" style={{ background: "var(--gold-subtle-bg)", borderColor: "var(--gold-subtle-border)", color: "var(--gold)" }}><Puzzle size={10} /> {overrides}</span> : <span className="text-[var(--text-4)] text-[11px]">—</span>}</td>
                    <td className="px-2 py-2.5 text-right"><ChevronRight size={15} className="text-[var(--text-4)] group-hover:text-[var(--text-1)] transition-colors inline" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyState icon={PackageSearch} title="Nenhum produto encontrado" description="Ajuste sua busca ou limpe os filtros" action={<button onClick={clearAll} className="h-8 px-3 rounded-[var(--r-sm)] text-[12px] font-medium border border-[var(--hairline)] hover:bg-[var(--layer-2)]">Limpar filtros</button>} testId="products-empty" />}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-2">
          {filtered.slice(0, 80).map((p) => {
            const b = findBrand(brands, p.brand);
            const overrides = Object.keys(p.extensionOverrides || {}).length;
            const missingVarejo = p.prices.varejo == null;
            return (
              <button key={p.id} onClick={() => navigate(`/admin/produtos/${p.id}`)} className="w-full text-left rounded-[var(--r-md)] border border-[var(--hairline)] bg-[var(--layer-1)] p-3 active:bg-[var(--layer-2)] transition-colors" data-testid={`product-card-${p.id}`}>
                <div className="flex items-start gap-3">
                  <BrandAvatar name={b?.name || p.name} tone={b?.tone} size={30} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-[14px] truncate">{p.name}</div>
                      <div className="tabular font-semibold text-[14px] shrink-0">{missingVarejo ? <span className="text-[var(--warning)] text-[11px] uppercase">sem preço</span> : brl(p.prices.varejo)}</div>
                    </div>
                    <div className="text-[11px] text-[var(--text-3)] truncate mt-0.5">{b?.name} · {p.dosage} · {p.pack}</div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <AvailabilityToggle available={p.available} onToggle={() => { toggleAvailability(p.id); toast(p.available ? "Indisponível" : "Disponível", { duration: 1400 }); }} testId={`toggle-availability-m-${p.id}`} />
                      {p.promo && <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full border text-[11px] font-medium" style={{ background: "var(--gold-subtle-bg)", borderColor: "var(--gold-subtle-border)", color: "var(--gold)" }}><Percent size={10} /> promo</span>}
                      {overrides > 0 && <span className="inline-flex items-center gap-1 h-6 px-2 rounded-full border text-[11px] font-medium" style={{ background: "var(--gold-subtle-bg)", borderColor: "var(--gold-subtle-border)", color: "var(--gold)" }}><Puzzle size={10} /> {overrides}</span>}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
          {filtered.length === 0 && <EmptyState icon={PackageSearch} title="Nenhum produto encontrado" description="Ajuste sua busca ou limpe os filtros" action={<button onClick={clearAll} className="h-8 px-3 rounded-[var(--r-sm)] text-[12px] font-medium border border-[var(--hairline)]">Limpar filtros</button>} />}
        </div>

        {filtered.length > 0 && <div className="mt-3 text-[11px] text-[var(--text-3)]">Mostrando até {Math.min(filtered.length, 120)} de {num(filtered.length)} · toque para abrir o workspace do produto.</div>}
      </PageBody>
    </div>
  );
}
