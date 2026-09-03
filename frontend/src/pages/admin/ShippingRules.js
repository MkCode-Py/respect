import { PageHeader, Card } from "@/components/PageHeader";
import { useStore } from "@/data/store";
import { ScrollText } from "lucide-react";

export default function ShippingRules() {
  const { shippingRules } = useStore();
  return (
    <div>
      <PageHeader title="Regras de Envio" subtitle="Políticas aplicadas na vitrine pública" />
      <div className="px-4 sm:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {shippingRules.map((r) => (
          <Card key={r.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-md border border-[var(--hairline)] bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-3)] shrink-0"><ScrollText size={14} /></div>
            <div>
              <div className="text-[13px] font-semibold">{r.title}</div>
              <div className="text-[12px] text-[var(--text-3)] mt-1">{r.detail}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
