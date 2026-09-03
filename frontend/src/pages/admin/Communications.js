import { PageHeader, Card } from "@/components/PageHeader";
import { useStore } from "@/data/store";
import { relTime } from "@/lib/format";
import { Megaphone, Plus } from "lucide-react";
import { toast } from "sonner";

const STATUS_STYLE = {
  active:    { label: "Ativo",       bg: "var(--success-bg)", border: "var(--success-border)", fg: "var(--success)" },
  scheduled: { label: "Agendado",   bg: "var(--info-bg)",    border: "var(--info-border)",    fg: "var(--info)" },
  draft:     { label: "Rascunho",    bg: "var(--layer-2)",     border: "var(--hairline)",         fg: "var(--text-2)" },
};

export default function Communications() {
  const { announcements } = useStore();
  return (
    <div>
      <PageHeader
        title="Comunicados"
        subtitle="Mensagens exibidas na vitrine pública e no painel operacional"
        actions={
          <button onClick={() => toast("Novo comunicado (mock)")} className="h-8 px-3 rounded-md text-[12px] font-medium bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] flex items-center gap-1.5">
            <Plus size={13} /> Novo comunicado
          </button>
        }
      />
      <div className="px-4 sm:px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {announcements.map((a) => {
          const s = STATUS_STYLE[a.status];
          return (
            <Card key={a.id}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-md border border-[var(--hairline)] bg-[var(--layer-2)] flex items-center justify-center text-[var(--gold)] shrink-0"><Megaphone size={14} /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-[13px] font-semibold">{a.title}</div>
                    <span className="inline-flex items-center h-5 px-1.5 rounded-[4px] border text-[10px] uppercase tracking-[0.08em] font-medium" style={{ background: s.bg, borderColor: s.border, color: s.fg }}>{s.label}</span>
                  </div>
                  <div className="text-[11px] text-[var(--text-3)] mt-1">Audiência: {a.audience} · atualizado {relTime(a.updatedAt)}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
