import { useMemo } from "react";
import { PageHeader, Card } from "@/components/PageHeader";
import { useStore } from "@/data/store";
import { num } from "@/lib/format";
import { Layers } from "lucide-react";

export default function Categories() {
  const { categories, brands, products } = useStore();
  const counts = useMemo(() => {
    const m = {};
    for (const p of products) m[p.category] = (m[p.category] || 0) + 1;
    return m;
  }, [products]);
  const brandCounts = useMemo(() => {
    const m = {};
    for (const b of brands) m[b.category] = (m[b.category] || 0) + 1;
    return m;
  }, [brands]);

  return (
    <div>
      <PageHeader title="Categorias" subtitle={`${categories.length} categorias cadastradas`} />
      <div className="px-4 sm:px-6 py-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {categories.map((c) => (
          <Card key={c.slug}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md border border-[var(--hairline)] flex items-center justify-center" style={{ background: `${c.tone}1a`, color: c.tone }}>
                <Layers size={16} />
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-semibold">{c.name}</div>
                <div className="text-[11px] text-[var(--text-3)]">{num(brandCounts[c.slug] || 0)} marcas · {num(counts[c.slug] || 0)} produtos</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
