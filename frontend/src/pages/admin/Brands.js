import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader, Card } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { useStore, findCategory } from "@/data/store";
import { num } from "@/lib/format";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

export default function Brands() {
  const { brands, products, categories } = useStore();
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const counts = useMemo(() => {
    const m = {};
    for (const p of products) m[p.brand] = (m[p.brand] || 0) + 1;
    return m;
  }, [products]);

  const filtered = brands.filter((b) => b.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <PageHeader title="Marcas" subtitle={`${brands.length} marcas cadastradas`}>
        <div className="relative max-w-md">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-4)]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar marca…" className="w-full h-9 pl-8 pr-2 rounded-md bg-[var(--layer-1)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)]" />
        </div>
      </PageHeader>
      <div className="px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {filtered.map((b) => {
          const cat = findCategory(categories, b.category);
          return (
            <button
              key={b.slug}
              onClick={() => navigate(`/admin/produtos?filter=todos`)}
              className="group text-left rounded-md border border-[var(--hairline)] bg-[var(--layer-1)] p-4 hover:border-[var(--stroke)] transition-colors flex items-center gap-3"
            >
              <BrandAvatar name={b.name} tone={b.tone} size={32} />
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold truncate">{b.name}</div>
                <div className="text-[11px] text-[var(--text-3)] truncate">{cat?.name}</div>
              </div>
              <div className="text-right">
                <div className="tabular text-[15px] font-semibold">{num(counts[b.slug] || 0)}</div>
                <div className="text-[10px] uppercase tracking-[0.08em] text-[var(--text-3)]">produtos</div>
              </div>
              <ChevronRight size={14} className="text-[var(--text-4)] group-hover:text-[var(--text-1)]" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
