# plan.md — Respect Pharma NEXT (Preview visual navegável)

## STATUS ATUAL — Redesign v2 (CONCLUÍDO)
Redesign completo do frontend com foco em (1) visual claramente novo/moderno (não cópia do sistema atual) e (2) responsividade total sem NENHUMA rolagem lateral.
- Novo Design System: tokens grafite+âmbar refinados, radius suaves, seleção âmbar, grão sutil, guardas globais anti-overflow (html,body overflow-x:hidden + main overflow-x:clip). Ver `src/index.css`.
- Novo Shell: sidebar flutuante (painel arredondado), topbar refinada, drawer no mobile. Ver `src/layout/*`.
- Componentes: PageHeader (com brilho âmbar) + Card + CardHead + PageBody + EmptyState + Toolbar, StatCard, TierBadge, BrandAvatar, AvailabilityBadge, Segmented (chips que quebram), FilterSelect (shadcn Select no lugar de <select> nativo).
- Padrão responsivo das listas: `<table>` no desktop (md/lg+) e CARDS no mobile (`md:hidden`) — zero overflow-x. Aplicado em Products, Prices (7 níveis), Orders, Promotions, StockBurn, ExpiredProducts, Freight.
- ProductDetail e ExtensionDetail reescritos (responsivos). Extensions/OrderDetail/Analytics herdam o novo visual.
- Storefront: header novo, chips wrap, accordion Categoria→Marca→Produtos, seletor de nível (Select), painéis (promoções/fretes/regras/rastreio).
- VALIDAÇÃO (testing_agent_v3): ZERO overflow horizontal em 17 rotas × 3 viewports (51/51). Navegação, filtros, edição inline, drawer mobile e vitrine OK. Corrigido z-index do cabeçalho de Preços (pointer-events-none). 100% mock, sem backend.

---


## 1) Objectives
- Entregar uma **preview visual e navegável** (desktop + mobile) do **Respect Pharma NEXT** com **100% mock data no frontend**.
- Consolidar **Design System premium operacional** (base preto/grafite + dourado âmbar #C9962A estratégico, Inter, alta densidade Linear/Height).
- Construir **Admin Respect** (core operacional) + **Vitrine Pública** (accordion Categoria → Marca → Produtos com logo) com fluxos completos e estados (loading/empty/error/confirm).
- Garantir que os **fluxos críticos** (catálogo, preços 7 níveis, extensões herdadas, promoções, pedidos com timeline WhatsApp) funcionem e sejam fáceis de operar.

## 2) Implementation Steps

### Phase 1 — Core flow spike (POC leve, dentro do app; sem integrações)
**Meta:** provar rapidamente que o “núcleo” de dados e edição funciona com densidade alta e responsividade.
- Definir **modelo de dados mock** (TS): Produto, Categoria, Marca(logo), Preços(7 níveis), Extensões(8), Promoções, Pedido(timeline), Regras(Frete/Seguro), Comunicações.
- Implementar **engine de preços** (pure functions):
  - Preços por nível (Varejo→Diamante) por produto.
  - Extensões: herda Varejo por padrão; exceções por extensão; “voltar a herdar”.
- Implementar **POC UI** mínima:
  - Lista densa de produtos + busca + 2 filtros + toggle disponibilidade inline.
  - Drawer/Detail com edição dos **7 preços lado a lado** + exceções por extensão.
  - Vitrine: accordion Categoria→Marca→Produtos + busca.
- Validar manualmente: performance com dataset simulado (gerador 800 itens), estados e navegação.

**User stories (Phase 1)**
1. Como owner, quero buscar um produto em segundos para não perder tempo com rolagem.
2. Como owner, quero alternar disponibilidade direto na lista para agir rápido.
3. Como owner, quero editar os 7 preços lado a lado para evitar erros por contexto.
4. Como owner, quero criar/remover exceção de extensão e voltar a herdar Varejo sem fricção.
5. Como cliente, quero navegar por categoria/marca com uma mão no celular.

**Exit criteria (Phase 1):** funções de preço/herança testadas, UI mínima navegável, dataset grande sem travar, responsividade básica ok.

### Phase 2 — V1 App Development (Admin + Design System + rotas principais)
**Meta:** construir o V1 completo do Admin com visual premium e alta densidade.
- Chamar **design_agent** e consolidar **Design System** (tokens): cores/surfaces, tipografia Inter, scale, radius, shadows discretas, componentes (buttons, inputs, selects, badges, pills, tables, drawers, dialogs, tooltips, tabs, filters, accordions).
- Setup app: React + TS + router + state (leve) + styling (tokens) + ícones.
- Implementar **Admin Shell**:
  - Sidebar densa (colapsável no mobile), topbar com busca global, breadcrumbs, Command-K.
  - Padrões de layout: tabelas densas, drawers para edição, confirmação segura (desfazer quando possível).
- Mock data realista:
  - Gerador: ~800 produtos, categorias e marcas coerentes, logos/fallback, 7 níveis, 8 extensões, promoções, pedidos, termos de busca sem resultado.
- Telas principais (MVP polido):
  1. **Dashboard**: “Precisa da sua atenção” (sem preço, indisponíveis, promoções expirando, pedidos pendentes de handoff), atalhos.
  2. **Produtos**: tabela densa, busca/filtros (categoria/marca/status/sem preço), ações inline, seleção em massa (toggle visibilidade / set status).
  3. **Produto Detalhe/Edição**: workspace com identidade (marca/categoria), status/visibilidade por nível, 7 preços, promo, extensões (herdado/exceção).
  4. **Preços**: tabela por produto com **edição inline** nos 7 níveis; sticky columns; validação; sem regra percentual.
  5. **Extensões**: lista + detalhe (política de preço, atividade); gestão de exceções e retorno a herança.
  6. **Promoções**: lista/CRUD, vínculo produto+extensão, original vs promo, badge desconto.
  7. **Pedidos**: lista + detalhe com timeline “criado → encaminhado WhatsApp”; status e filtros; sem qualquer menção a receita.
  8. **Analytics**: visitas, buscas sem resultado, funil add-to-cart → handoff WhatsApp.
  9. **Fretes/Regras de Envio/Seguro**: configuração (seguro 15% editável), regras e estados.
  10. **Queima de Estoque** e **Produtos Vencidos**: cadastros independentes e listagem.
  11. **Comunicações**: comunicados (draft/ativo), agendamento mock.
- Estados e UX: empty/loading/skeleton, erro de validação, confirm dialogs, toasts discretos.
- Responsividade Admin: tabela → cards compactos no mobile, filtros em bottom sheet, ações acessíveis.
- Rodar **testing agent**: navegação E2E (rotas, edição, persistência em memória, responsividade).

**User stories (Phase 2)**
1. Como owner, quero abrir o Dashboard e ver tarefas acionáveis imediatamente.
2. Como owner, quero filtrar “sem preço” e corrigir rapidamente em lote.
3. Como owner, quero editar um produto sem modal intrusivo, com drawer e confirmação clara.
4. Como owner, quero editar preços inline em tabela sem perder posição/scroll.
5. Como owner, quero ver pedidos e encaminhar/registrar handoff WhatsApp com timeline clara.

**Exit criteria (Phase 2):** Admin V1 completo navegável, design consistente, fluxos críticos funcionando, responsivo, sem dead-ends.

### Phase 3 — Vitrine Pública (MVP) + polimento + responsividade avançada
**Meta:** entregar a vitrine pública com excelente mobile-first e fidelidade de identidade.
- Criar rota **/vitrine**:
  - Header refinado, busca, ações (fretes/regras, rastreio, novidades, copiar lista, PDF mock).
  - Accordion: **Categoria → Marca → Produtos**.
  - Marca com **logo pequena** + fallback de iniciais (contraste claro/escuro).
  - Produto: preço por nível (seleção de “nível comercial” como toggle), promoções, indisponível sempre visível.
- Mobile-first: navegação com uma mão (targets grandes, bottom sheets, sticky search, scroll restoration).
- Microinterações discretas (hover/press, transitions rápidas, sem glow/gradientes chamativos).
- Rodar **testing agent**: vitrine E2E + testes de breakpoints (desktop/tablet/mobile).

**User stories (Phase 3)**
1. Como cliente, quero buscar e encontrar produtos rapidamente sem navegar por muitos níveis.
2. Como cliente, quero expandir categoria e marca com poucos toques (accordion eficiente).
3. Como cliente, quero ver claramente quando um item está indisponível sem ele sumir.
4. Como cliente, quero copiar a lista/PDF mock para compartilhar com facilidade.
5. Como cliente, quero acessar fretes/regras/rastreio sem sair do fluxo de compra.

**Exit criteria (Phase 3):** vitrine navegável, mobile excelente, accordion performático, logos/fallback ok, estados completos.

### Phase 4 — Hardening, QA e refinamentos
- Ajustar performance (virtualização em tabelas/listas quando necessário).
- Acessibilidade (focus states, navegação teclado no Admin, contraste, aria para accordion).
- Consistência visual (tokens, espaçamentos, densidade) e pequenas melhorias de UX.
- Rodar **testing agent** final: regressão completa Admin + Vitrine.

**User stories (Phase 4)**
1. Como operador, quero que listas grandes sejam rápidas e sem engasgos.
2. Como operador, quero usar teclado para navegar/editar mais rápido.
3. Como cliente mobile, quero que a vitrine carregue rápido e mantenha posição ao voltar.
4. Como owner, quero confiança de que nada quebrou entre telas após polimentos.
5. Como time, quero um Design System consistente para evoluções futuras.

## 3) Next Actions
1. Rodar **design_agent** para diretrizes visuais completas (tokens + componentes + exemplos).
2. Implementar o **modelo de dados mock** + gerador (800 produtos) + engine de herança/exceções.
3. Construir **POC UI** (lista produtos + drawer de preços + vitrine accordion) e validar.
4. Fechar Design System no código e iniciar Admin Shell + rotas principais.

## 4) Success Criteria
- Preview parece **produto real** (não wireframe): consistência, densidade, microinterações discretas.
- Admin: encontrar produto, alternar disponibilidade, editar 7 preços, gerir extensões herdadas e promoções, ver pedidos com timeline WhatsApp — tudo fluido.
- Vitrine: accordion categoria→marca→produtos com logo e fallback; busca; indisponíveis visíveis; excelente no mobile.
- 100% frontend mock, sem backend/auth/integrações.
- Testing agent aprova navegação E2E e responsividade sem quebras.