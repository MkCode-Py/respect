import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Package, Tag, Layers, Flame, Clock,
  DollarSign, Percent, Puzzle, ShoppingCart, Truck, ShieldCheck,
  Megaphone, BarChart3, Settings, ArrowUpRight, X, ScrollText, Store,
} from "lucide-react";

const NAV = [
  {
    section: "Vis\u00e3o geral",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true }],
  },
  {
    section: "Cat\u00e1logo",
    items: [
      { to: "/admin/produtos", label: "Produtos", icon: Package },
      { to: "/admin/marcas", label: "Marcas", icon: Tag },
      { to: "/admin/categorias", label: "Categorias", icon: Layers },
      { to: "/admin/queima-estoque", label: "Queima de Estoque", icon: Flame },
      { to: "/admin/produtos-vencidos", label: "Produtos Vencidos", icon: Clock },
    ],
  },
  {
    section: "Comercial",
    items: [
      { to: "/admin/precos", label: "Pre\u00e7os", icon: DollarSign },
      { to: "/admin/promocoes", label: "Promo\u00e7\u00f5es", icon: Percent },
      { to: "/admin/extensoes", label: "Extens\u00f5es", icon: Puzzle },
    ],
  },
  {
    section: "Opera\u00e7\u00e3o",
    items: [{ to: "/admin/pedidos", label: "Pedidos", icon: ShoppingCart }],
  },
  {
    section: "Log\u00edstica",
    items: [
      { to: "/admin/fretes", label: "Fretes", icon: Truck },
      { to: "/admin/regras-envio", label: "Regras de Envio", icon: ScrollText },
      { to: "/admin/seguro", label: "Seguro", icon: ShieldCheck },
    ],
  },
  {
    section: "Comunica\u00e7\u00e3o & Dados",
    items: [
      { to: "/admin/comunicados", label: "Comunicados", icon: Megaphone },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/admin/configuracoes", label: "Comerciais", icon: Settings },
    ],
  },
];

function Item({ item, onClick }) {
  const Icon = item.icon;
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "group relative flex items-center gap-2.5 h-9 pl-3 pr-2 rounded-[var(--r-sm)] text-[13px] transition-colors",
          isActive
            ? "bg-[var(--gold-subtle-bg)] text-[var(--gold)] font-semibold"
            : "text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] font-medium",
        ].join(" ")
      }
      data-testid={`sidebar-link-${item.to.split("/").pop() || "dashboard"}`}
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[var(--gold)]" />}
          <Icon size={16} strokeWidth={2} className={isActive ? "text-[var(--gold)]" : "text-[var(--text-4)] group-hover:text-[var(--text-2)]"} />
          <span className="truncate tracking-[-0.005em]">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-[var(--layer-1)]">
      {/* Brand */}
      <div className="h-[var(--topbar-h)] px-3.5 flex items-center justify-between border-b border-[var(--hairline)] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-[8px] flex items-center justify-center font-extrabold text-[13px] text-[var(--canvas)]" style={{ background: "linear-gradient(150deg, var(--gold-soft), var(--gold-active))" }}>R</div>
          <div className="leading-tight min-w-0">
            <div className="text-[13px] font-semibold tracking-[-0.01em] truncate">Respect Pharma</div>
            <div className="text-[9px] text-[var(--gold)] uppercase tracking-[0.22em] font-semibold">NEXT</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden text-[var(--text-3)] hover:text-[var(--text-1)]" aria-label="Fechar menu">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-3 px-2 no-scrollbar">
        {NAV.map((group) => (
          <div key={group.section} className="mb-4 last:mb-0">
            <div className="px-3 mb-1.5 text-[9px] uppercase tracking-[0.16em] font-semibold text-[var(--text-4)]">{group.section}</div>
            <div className="flex flex-col gap-[3px]">
              {group.items.map((item) => <Item key={item.to} item={item} onClick={onClose} />)}
            </div>
          </div>
        ))}
      </div>

      {/* Storefront link */}
      <div className="p-2.5 border-t border-[var(--hairline)] shrink-0">
        <a
          href="/vitrine"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--r-sm)] border border-[var(--gold-subtle-border)] bg-[var(--gold-subtle-bg)] hover:border-[var(--gold)] transition-colors"
          data-testid="open-storefront-link"
        >
          <Store size={15} className="text-[var(--gold)] shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-[12px] font-semibold text-[var(--gold-soft)]">Vitrine pública</div>
            <div className="text-[10px] text-[var(--text-3)]">Abrir catálogo do cliente</div>
          </div>
          <ArrowUpRight size={13} className="text-[var(--text-3)] group-hover:text-[var(--gold)] transition-colors" />
        </a>
      </div>
    </div>
  );
}

export default function Sidebar({ mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Desktop floating panel */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[var(--sidebar-w)] p-2.5 z-30">
        <div className="h-full w-full rounded-[var(--r-lg)] border border-[var(--hairline)] shadow-[var(--shadow-float)] overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onCloseMobile} />
          <aside className="absolute inset-y-0 left-0 w-[82%] max-w-[300px] p-2.5 animate-rise">
            <div className="h-full w-full rounded-[var(--r-lg)] border border-[var(--hairline)] shadow-[var(--shadow-pop)] overflow-hidden">
              <SidebarContent onClose={onCloseMobile} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
