import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, Search, ChevronRight, Bell, ExternalLink } from "lucide-react";

const LABELS = {
  admin: "Dashboard", produtos: "Produtos", precos: "Pre\u00e7os", promocoes: "Promo\u00e7\u00f5es",
  pedidos: "Pedidos", extensoes: "Extens\u00f5es", analytics: "Analytics", marcas: "Marcas",
  categorias: "Categorias", fretes: "Fretes", "regras-envio": "Regras de Envio", seguro: "Seguro",
  "queima-estoque": "Queima de Estoque", "produtos-vencidos": "Produtos Vencidos",
  comunicados: "Comunicados", configuracoes: "Comerciais",
};

function breadcrumbs(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const items = [];
  let acc = "";
  for (const p of parts) {
    acc += "/" + p;
    items.push({ href: acc, label: LABELS[p] || decodeURIComponent(p) });
  }
  return items;
}

export default function Topbar({ onOpenMobile, onOpenCommand, pathname }) {
  const items = breadcrumbs(pathname);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenCommand();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onOpenCommand]);

  return (
    <header
      className="sticky top-0 z-20 h-[var(--topbar-h)] bg-[var(--canvas)]/85 backdrop-blur-md border-b border-[var(--hairline)] flex items-center px-3 sm:px-6 lg:px-8 gap-3"
      data-testid="admin-topbar"
    >
      <button
        className="lg:hidden p-2 -ml-1 rounded-[var(--r-sm)] text-[var(--text-2)] hover:bg-[var(--layer-2)]"
        onClick={onOpenMobile}
        aria-label="Abrir menu"
        data-testid="topbar-open-menu"
      >
        <Menu size={18} />
      </button>

      {/* Breadcrumbs */}
      <nav className="hidden sm:flex items-center gap-1.5 text-[12px] min-w-0">
        {items.map((it, i) => (
          <div key={it.href} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <ChevronRight size={12} className="text-[var(--text-4)] shrink-0" />}
            {i === items.length - 1 ? (
              <span className="text-[var(--text-1)] font-semibold truncate">{it.label}</span>
            ) : (
              <Link to={it.href} className="text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors truncate">{it.label}</Link>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile brand mark */}
      <div className="sm:hidden flex items-center gap-2 min-w-0">
        <div className="w-6 h-6 rounded-[7px] flex items-center justify-center font-extrabold text-[11px] text-[var(--canvas)]" style={{ background: "linear-gradient(150deg, var(--gold-soft), var(--gold-active))" }}>R</div>
        <span className="text-[13px] font-semibold truncate">{items[items.length - 1]?.label}</span>
      </div>

      <div className="flex-1" />

      <button
        onClick={onOpenCommand}
        className="hidden sm:flex items-center gap-2 h-8 pl-2.5 pr-2 rounded-[var(--r-sm)] border border-[var(--hairline)] bg-[var(--layer-1)] text-[var(--text-3)] hover:text-[var(--text-2)] hover:border-[var(--stroke)] transition-colors"
        data-testid="command-palette-trigger"
      >
        <Search size={13} />
        <span className="text-[12px] hidden md:inline">Buscar ou executar…</span>
        <span className="flex items-center gap-1 md:ml-3">
          <span className="kbd">⌘</span>
          <span className="kbd">K</span>
        </span>
      </button>

      <button onClick={onOpenCommand} className="sm:hidden p-2 rounded-[var(--r-sm)] text-[var(--text-2)] hover:bg-[var(--layer-2)]" aria-label="Buscar">
        <Search size={17} />
      </button>

      <button
        className="p-2 rounded-[var(--r-sm)] text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--layer-2)] relative"
        aria-label="Notificações"
        onClick={() => navigate("/admin/comunicados")}
        data-testid="topbar-notifications"
      >
        <Bell size={16} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
      </button>

      <a
        href="/vitrine"
        target="_blank"
        rel="noreferrer"
        className="hidden md:flex items-center gap-1.5 h-8 px-2.5 rounded-[var(--r-sm)] text-[12px] font-medium text-[var(--text-2)] border border-[var(--hairline)] hover:border-[var(--stroke)] hover:text-[var(--text-1)] transition-colors"
        data-testid="topbar-open-storefront"
      >
        <ExternalLink size={12} /> Vitrine
      </a>
    </header>
  );
}
