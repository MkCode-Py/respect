import { PageHeader, Card } from "@/components/PageHeader";
import { TIERS } from "@/data/store";
import { TierBadge } from "@/components/TierBadge";

export default function Settings() {
  return (
    <div>
      <PageHeader title="Configurações Comerciais" subtitle="Estrutura de níveis e regras gerais" />
      <div className="px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <div className="text-[13px] font-semibold">Níveis comerciais</div>
          <div className="text-[11px] text-[var(--text-3)] mt-0.5">7 níveis ordenados do mais aberto ao mais premium</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TIERS.map((t) => <TierBadge key={t.key} tier={t.key} />)}
          </div>
        </Card>
        <Card>
          <div className="text-[13px] font-semibold">Regras gerais</div>
          <ul className="text-[12px] text-[var(--text-3)] mt-2 flex flex-col gap-1.5 list-disc pl-4">
            <li>Extensões herdam preço do Varejo por padrão</li>
            <li>Preview visual navegvel; dados não são persistidos</li>
            <li>Pedidos registrados não representam venda concluída</li>
            <li>Checkout ocorre no WhatsApp</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
