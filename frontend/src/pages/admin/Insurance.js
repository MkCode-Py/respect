import { useState } from "react";
import { PageHeader, Card } from "@/components/PageHeader";
import { useStore } from "@/data/store";
import { ShieldCheck, Save } from "lucide-react";
import { toast } from "sonner";

export default function Insurance() {
  const { insurance, setInsurance } = useStore();
  const [rate, setRate] = useState(insurance.rate * 100);
  const [enabled, setEnabled] = useState(insurance.enabled);

  const save = () => {
    setInsurance({ rate: Number(rate) / 100, enabled });
    toast.success("Configuração de seguro salva");
  };

  return (
    <div>
      <PageHeader
        title="Seguro de Envio"
        subtitle="Taxa aplicada sobre o valor do pedido (configurável)"
        actions={
          <button onClick={save} className="h-8 px-3 rounded-md text-[12px] font-medium bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] flex items-center gap-1.5" data-testid="insurance-save">
            <Save size={12} /> Salvar
          </button>
        }
      />
      <div className="px-4 sm:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md border border-[var(--hairline)] bg-[var(--layer-2)] flex items-center justify-center text-[var(--gold)]"><ShieldCheck size={18} /></div>
            <div>
              <div className="text-[13px] font-semibold">Seguro Respect</div>
              <div className="text-[11px] text-[var(--text-3)]">Cobertura de extravio e avarias no envio</div>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <label className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-3)]">Taxa (%)</label>
            <div className="flex items-center gap-2">
              <input
                type="number" step="0.5"
                value={rate} onChange={(e) => setRate(e.target.value)}
                className="tabular w-24 h-9 px-2.5 rounded-md bg-[var(--layer-2)] border border-[var(--hairline)] text-[13px] focus:outline-none focus:border-[var(--gold)]"
                data-testid="insurance-rate-input"
              />
              <span className="text-[13px] text-[var(--text-3)]">% sobre o subtotal</span>
            </div>
            <label className="mt-2 flex items-center gap-2 text-[12px]">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="accent-[var(--gold)]" />
              <span>Habilitar seguro em novos pedidos</span>
            </label>
          </div>
        </Card>
        <Card>
          <div className="text-[13px] font-semibold">Como funciona</div>
          <ul className="text-[12px] text-[var(--text-3)] mt-2 flex flex-col gap-1.5 list-disc pl-4">
            <li>Taxa é aplicada automaticamente no cálculo do pedido</li>
            <li>Pode ser desabilitada por pedido pelo operador</li>
            <li>Valor padrão histórico: 15% (não fixo no código)</li>
            <li>Valor é destacado no resumo do pedido</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
