import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader, Card } from "@/components/PageHeader";
import { BrandAvatar } from "@/components/BrandAvatar";
import { useStore, findExtension } from "@/data/store";
import { brl, dateTime, num } from "@/lib/format";
import { ArrowLeft, MessageCircle, CheckCircle2, Clock, Truck, ShieldCheck, MapPin, User, Package } from "lucide-react";

const STATUS = {
  pending:  { label: "Pendente",              icon: Clock },
  whatsapp: { label: "Encaminhado WhatsApp", icon: MessageCircle },
  completed:{ label: "Confirmado",             icon: CheckCircle2 },
};

export default function OrderDetail() {
  const { id } = useParams();
  const { orders, extensions, products, insurance } = useStore();
  const order = useMemo(() => orders.find((o) => o.id === id), [orders, id]);
  const navigate = useNavigate();

  if (!order) {
    return (
      <div className="p-8">
        <button onClick={() => navigate("/admin/pedidos")} className="text-[13px] text-[var(--text-3)] hover:text-[var(--text-1)]">← Voltar</button>
        <div className="mt-4 text-[14px]">Pedido não encontrado.</div>
      </div>
    );
  }
  const extInfo = findExtension(extensions, order.extension);

  return (
    <div data-testid="order-detail">
      <PageHeader
        title={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/admin/pedidos")} className="p-1 rounded-md text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--layer-1)]">
              <ArrowLeft size={16} />
            </button>
            <span className="mono">{order.id}</span>
          </div>
        }
        subtitle={<>{order.client} · {order.city}/{order.state} · {dateTime(order.createdAt)}</>}
        actions={
          <a
            href={`https://wa.me/55?text=Pedido%20${order.id}`}
            target="_blank" rel="noreferrer"
            className="h-8 px-3 rounded-md text-[12px] font-medium bg-[var(--gold)] text-[var(--canvas)] hover:bg-[var(--gold-hover)] flex items-center gap-1.5"
          >
            <MessageCircle size={12} /> Abrir WhatsApp
          </a>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 sm:p-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Items */}
          <Card padding={false}>
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--hairline)]">
              <div className="text-[13px] font-semibold">Itens do pedido</div>
              <div className="text-[11px] text-[var(--text-3)]">{order.items.length} produtos</div>
            </div>
            <div className="divide-y divide-[var(--hairline)]">
              {order.items.map((it, i) => {
                const p = products.find((x) => x.id === it.productId);
                return (
                  <div key={i} className="flex items-center gap-3 px-4 py-2.5">
                    <div className="w-8 h-8 rounded-md bg-[var(--layer-2)] flex items-center justify-center text-[var(--text-3)]"><Package size={14} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium truncate">{it.name} <span className="text-[var(--text-3)] font-normal">· {it.dosage}</span></div>
                      <div className="text-[11px] text-[var(--text-3)]">{it.qty} × {brl(it.unit)}{p ? ` · ${p.pack}` : ""}</div>
                    </div>
                    <div className="tabular text-[13px] font-medium">{brl(it.qty * it.unit)}</div>
                  </div>
                );
              })}
            </div>
            <div className="px-4 py-3 border-t border-[var(--hairline)] bg-[var(--layer-2)] flex flex-col gap-1 text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-3)]">Subtotal</span>
                <span className="tabular">{brl(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-3)] inline-flex items-center gap-1.5"><Truck size={11} /> Frete</span>
                <span className="tabular">{brl(order.freight)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-3)] inline-flex items-center gap-1.5"><ShieldCheck size={11} /> Seguro ({Math.round(insurance.rate * 100)}%)</span>
                <span className="tabular">{brl(order.insurance)}</span>
              </div>
              <div className="h-px bg-[var(--hairline)] my-1" />
              <div className="flex items-center justify-between text-[13px] font-semibold">
                <span>Total</span>
                <span className="tabular text-[var(--gold)]">{brl(order.total)}</span>
              </div>
            </div>
          </Card>

          {/* Timeline */}
          <Card padding={false}>
            <div className="px-4 py-3 border-b border-[var(--hairline)]">
              <div className="text-[13px] font-semibold">Timeline</div>
              <div className="text-[11px] text-[var(--text-3)]">Apenas etapas reais do fluxo atual</div>
            </div>
            <div className="p-4">
              <ol className="relative border-l border-[var(--hairline)] ml-2">
                {order.timeline.map((ev, i) => {
                  const S = STATUS[ev.key] || { icon: Clock };
                  const Icon = S.icon;
                  const last = i === order.timeline.length - 1;
                  return (
                    <li key={i} className="pl-4 pb-4 last:pb-0">
                      <span className="absolute -left-[9px] w-4 h-4 rounded-full border flex items-center justify-center" style={{
                        background: last ? "var(--gold-subtle-bg)" : "var(--layer-2)",
                        borderColor: last ? "var(--gold)" : "var(--stroke)",
                        color: last ? "var(--gold)" : "var(--text-3)",
                      }}>
                        <Icon size={9} />
                      </span>
                      <div className="text-[13px] font-medium">{ev.label}</div>
                      <div className="text-[11px] text-[var(--text-3)]">{dateTime(ev.at)}</div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card padding={false}>
            <div className="px-4 py-3 border-b border-[var(--hairline)]">
              <div className="text-[13px] font-semibold">Cliente</div>
            </div>
            <div className="p-4 flex flex-col gap-2 text-[12px]">
              <Row icon={User} label="Nome" value={order.client} />
              <Row icon={MapPin} label="Local" value={`${order.city}/${order.state}`} />
              <Row icon={Package} label="Itens" value={num(order.items.reduce((s,i)=>s+i.qty,0))} />
            </div>
          </Card>

          <Card padding={false}>
            <div className="px-4 py-3 border-b border-[var(--hairline)]">
              <div className="text-[13px] font-semibold">Origem</div>
            </div>
            <div className="p-4">
              <button onClick={() => navigate(`/admin/extensoes/${order.extension}`)} className="w-full flex items-center gap-3 p-2.5 -m-2.5 rounded-md hover:bg-[var(--layer-2)] transition-colors text-left">
                <BrandAvatar name={extInfo?.initials || "?"} tone={extInfo?.tone} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{extInfo?.name}</div>
                  <div className="text-[11px] text-[var(--text-3)]">Extensão comercial →</div>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={12} className="text-[var(--text-4)]" />
      <span className="text-[var(--text-3)] w-16">{label}</span>
      <span className="text-[var(--text-1)] font-medium truncate">{value}</span>
    </div>
  );
}
