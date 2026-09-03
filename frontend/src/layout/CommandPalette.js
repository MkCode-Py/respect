import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  LayoutDashboard, Package, DollarSign, Percent, Puzzle, ShoppingCart,
  Truck, ShieldCheck, Megaphone, BarChart3, Tag, Layers, Flame, Clock,
  ExternalLink, Plus,
} from "lucide-react";
import { useStore } from "@/data/store";

export default function CommandPalette({ open, onOpenChange }) {
  const navigate = useNavigate();
  const { products } = useStore();

  const go = (path) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Buscar produtos, telas ou executar ações…" data-testid="command-input" />
      <CommandList>
        <CommandEmpty>Nada encontrado.</CommandEmpty>

        <CommandGroup heading="Navegação">
          <CommandItem onSelect={() => go("/admin")}><LayoutDashboard size={13} /> Dashboard</CommandItem>
          <CommandItem onSelect={() => go("/admin/produtos")}><Package size={13} /> Produtos</CommandItem>
          <CommandItem onSelect={() => go("/admin/precos")}><DollarSign size={13} /> Preços</CommandItem>
          <CommandItem onSelect={() => go("/admin/promocoes")}><Percent size={13} /> Promoções</CommandItem>
          <CommandItem onSelect={() => go("/admin/extensoes")}><Puzzle size={13} /> Extensões</CommandItem>
          <CommandItem onSelect={() => go("/admin/pedidos")}><ShoppingCart size={13} /> Pedidos</CommandItem>
          <CommandItem onSelect={() => go("/admin/analytics")}><BarChart3 size={13} /> Analytics</CommandItem>
          <CommandItem onSelect={() => go("/admin/marcas")}><Tag size={13} /> Marcas</CommandItem>
          <CommandItem onSelect={() => go("/admin/categorias")}><Layers size={13} /> Categorias</CommandItem>
          <CommandItem onSelect={() => go("/admin/queima-estoque")}><Flame size={13} /> Queima de Estoque</CommandItem>
          <CommandItem onSelect={() => go("/admin/produtos-vencidos")}><Clock size={13} /> Produtos Vencidos</CommandItem>
          <CommandItem onSelect={() => go("/admin/fretes")}><Truck size={13} /> Fretes</CommandItem>
          <CommandItem onSelect={() => go("/admin/seguro")}><ShieldCheck size={13} /> Seguro</CommandItem>
          <CommandItem onSelect={() => go("/admin/comunicados")}><Megaphone size={13} /> Comunicados</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Ações rápidas">
          <CommandItem onSelect={() => go("/admin/produtos?filter=sem-preco")}><Plus size={13} /> Corrigir produtos sem preço</CommandItem>
          <CommandItem onSelect={() => go("/admin/promocoes")}><Percent size={13} /> Criar promoção</CommandItem>
          <CommandItem onSelect={() => window.open("/vitrine", "_blank")}><ExternalLink size={13} /> Abrir vitrine pública</CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Produtos">
          {products.slice(0, 20).map((p) => (
            <CommandItem key={p.id} value={`${p.name} ${p.dosage} ${p.brand}`} onSelect={() => go(`/admin/produtos/${p.id}`)}>
              <Package size={13} />
              <span>{p.name}</span>
              <span className="ml-auto text-[11px] text-[var(--text-3)]">{p.dosage}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
