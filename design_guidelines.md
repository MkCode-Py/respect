{
  "meta": {
    "product": "Respect Pharma — Admin Operacional + Vitrine Pública",
    "goal": "Primeira versão visual navegável (100% mock frontend) com densidade alta, precisão e acabamento premium 2026.",
    "non_goals": [
      "Não copiar o sistema atual",
      "Não parecer template admin genérico",
      "Não usar transparência em backgrounds (solid only)",
      "Não usar gradientes chamativos / glow excessivo / glassmorphism exagerado",
      "Não usar clichê preto+dourado espalhado (dourado é acento estratégico)"
    ],
    "testing": {
      "rule": "Todo elemento interativo e toda informação crítica deve ter data-testid (kebab-case, descrevendo função).",
      "examples": [
        "data-testid=\"command-palette-trigger\"",
        "data-testid=\"products-table-search-input\"",
        "data-testid=\"product-detail-save-button\"",
        "data-testid=\"tier-price-cell-ouro-input\""
      ]
    },
    "file_target": "/app/design_guidelines.md",
    "stack": ["React (JS)", "Tailwind", "shadcn/ui (components em src/components/ui)"]
  },

  "visual_personality": {
    "keywords": [
      "grafite profundo",
      "alta densidade organizada",
      "software premium",
      "precisão",
      "velocidade operacional",
      "microinterações discretas",
      "sem ruído visual"
    ],
    "reference_fusion": {
      "layout_principle": "Linear/Height: densidade + keyboard-first + separação por linhas finas",
      "tone": "Enterprise premium (sem cara de ERP velho)",
      "accent_strategy": "Âmbar dourado só para foco, seleção, ring, highlights e 1 CTA primário por tela"
    }
  },

  "design_tokens": {
    "notes": [
      "CRITICAL: backgrounds sempre sólidos (sem alpha/transparência).",
      "Dourado #C9962A é acento — não usar como borda padrão nem como cor de texto em massa.",
      "Evitar radius grande: máximo 8px.",
      "Densidade: base spacing 4px; tabelas 32–40px de altura de linha."
    ],

    "css_variables": {
      "where": "/app/frontend/src/index.css (substituir tokens atuais do :root e .dark)",
      "palette_hex": {
        "brand_amber": {
          "base": "#C9962A",
          "hover": "#D6A63A",
          "active": "#B88722",
          "subtle_bg": "#1A1408",
          "subtle_border": "#2A210F"
        },
        "bg": {
          "canvas": "#0A0A0B",
          "layer_1": "#0F1012",
          "layer_2": "#14161A",
          "layer_3": "#191C21"
        },
        "text": {
          "primary": "#F4F2EE",
          "secondary": "#C9C6BF",
          "muted": "#9A968E",
          "disabled": "#6F6B64"
        },
        "stroke": {
          "hairline": "#23262D",
          "subtle": "#2B2F38",
          "strong": "#3A404C"
        },
        "functional": {
          "success": { "fg": "#7EE2A8", "bg": "#0E1A13", "border": "#1E3A2A" },
          "danger": { "fg": "#FF6B6B", "bg": "#1A0E10", "border": "#3A1E22" },
          "warning": { "fg": "#F5C451", "bg": "#1A140A", "border": "#3A2C12" },
          "info": { "fg": "#7AB7FF", "bg": "#0D141F", "border": "#1B2E4A" }
        },
        "tier_badges": {
          "varejo": { "bg": "#121419", "border": "#2B2F38", "fg": "#F4F2EE" },
          "bronze": { "bg": "#141312", "border": "#2E2A24", "fg": "#D7D2C8" },
          "prata": { "bg": "#121418", "border": "#2A2F39", "fg": "#DDE3EA" },
          "ouro": { "bg": "#171309", "border": "#2A210F", "fg": "#F5D58A" },
          "platina": { "bg": "#11161A", "border": "#26323A", "fg": "#CFE7F2" },
          "esmeralda": { "bg": "#0F1713", "border": "#1E3A2A", "fg": "#A7F3D0" },
          "diamante": { "bg": "#12131A", "border": "#2B2F38", "fg": "#E9E7FF" }
        }
      },

      "shadcn_hsl_mapping": {
        "instruction": "Mapear os HEX acima para HSL e preencher variáveis shadcn. Use o dourado como --ring e como --primary (com parcimônia via variantes de botão).",
        "recommended": {
          "--background": "#0A0A0B",
          "--foreground": "#F4F2EE",
          "--card": "#0F1012",
          "--card-foreground": "#F4F2EE",
          "--popover": "#14161A",
          "--popover-foreground": "#F4F2EE",
          "--primary": "#C9962A",
          "--primary-foreground": "#0A0A0B",
          "--secondary": "#14161A",
          "--secondary-foreground": "#F4F2EE",
          "--muted": "#191C21",
          "--muted-foreground": "#9A968E",
          "--accent": "#14161A",
          "--accent-foreground": "#F4F2EE",
          "--destructive": "#FF6B6B",
          "--destructive-foreground": "#0A0A0B",
          "--border": "#23262D",
          "--input": "#2B2F38",
          "--ring": "#C9962A",
          "--radius": "0.375rem"
        }
      },

      "extra_tokens": {
        "radius_px": { "xs": 2, "sm": 4, "md": 6, "lg": 8 },
        "shadow": {
          "elev_1": "0 1px 0 0 #000000, 0 0 0 1px #23262D",
          "elev_2": "0 8px 24px rgba(0,0,0,0.55), 0 0 0 1px #23262D",
          "focus_ring": "0 0 0 2px #0A0A0B, 0 0 0 4px #C9962A"
        },
        "motion": {
          "duration_ms": { "fast": 120, "base": 160, "slow": 220 },
          "easing": { "standard": "cubic-bezier(0.2, 0.0, 0, 1)", "out": "cubic-bezier(0.16, 1, 0.3, 1)" }
        },
        "spacing_px": {
          "base": 4,
          "scale": [0, 4, 8, 12, 16, 20, 24, 28, 32]
        },
        "density": {
          "topbar_h": 48,
          "sidebar_w": 220,
          "table_row_h": { "compact": 32, "default": 36, "comfortable": 40 }
        }
      }
    }
  },

  "typography": {
    "font_family": {
      "primary": "Inter",
      "fallback": "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
    },
    "import": {
      "google_fonts": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      "instruction": "Adicionar no index.html ou via CSS import no index.css."
    },
    "scale_px": {
      "xs": { "size": 11, "lh": 16, "tracking": "0.01em", "weight": 500 },
      "sm": { "size": 12, "lh": 16, "tracking": "0.005em", "weight": 500 },
      "base": { "size": 13, "lh": 18, "tracking": "0em", "weight": 500 },
      "md": { "size": 14, "lh": 20, "tracking": "-0.005em", "weight": 500 },
      "lg": { "size": 16, "lh": 22, "tracking": "-0.01em", "weight": 600 },
      "xl": { "size": 20, "lh": 26, "tracking": "-0.015em", "weight": 650 },
      "2xl": { "size": 24, "lh": 30, "tracking": "-0.02em", "weight": 700 }
    },
    "usage": {
      "admin_default": "13px/18px (base) para listas e tabelas; 12px para metadados; 14px para formulários.",
      "numbers": "Aplicar tabular-nums em preços e colunas numéricas.",
      "ids": "Usar fonte mono apenas para IDs/SKUs (evitar excesso)."
    },
    "tailwind_examples": {
      "dense_body": "text-[13px] leading-[18px]",
      "meta": "text-[12px] leading-4 text-muted-foreground",
      "section_title": "text-[14px] leading-5 font-semibold tracking-[-0.005em]",
      "page_title": "text-[20px] leading-[26px] font-semibold tracking-[-0.015em]"
    }
  },

  "layout_system": {
    "grid": {
      "admin": {
        "structure": "Sidebar fixa (220px) + Topbar (48px) + Content com max-width fluido.",
        "content_padding": "px-4 sm:px-6 (vertical: py-4)",
        "breakpoints": {
          "mobile": "Sidebar vira Drawer; Topbar mantém busca/⌘K.",
          "tablet": "Sidebar colapsável (ícones + tooltips).",
          "desktop": "Sidebar fixa; tabelas com sticky header."
        }
      },
      "storefront": {
        "structure": "Header sticky + busca + accordion categoria→marca + lista compacta de produtos.",
        "mobile_first": "1 coluna com cards compactos; grid 2 colunas em telas maiores."
      }
    },
    "do_not": [
      "Não centralizar container global (evitar leitura artificial).",
      "Não usar cards gigantes com muito padding.",
      "Não usar sidebar gigante (>260px)."
    ]
  },

  "components": {
    "component_path": {
      "shadcn_primary": "/app/frontend/src/components/ui",
      "use": [
        "button.jsx",
        "input.jsx",
        "select.jsx",
        "tabs.jsx",
        "badge.jsx",
        "table.jsx",
        "command.jsx",
        "breadcrumb.jsx",
        "drawer.jsx",
        "dialog.jsx",
        "tooltip.jsx",
        "accordion.jsx",
        "scroll-area.jsx",
        "separator.jsx",
        "skeleton.jsx",
        "sonner.jsx",
        "avatar.jsx",
        "calendar.jsx"
      ]
    },

    "buttons": {
      "radius": "6px",
      "sizes": {
        "sm": "h-8 px-3 text-[12px]",
        "md": "h-9 px-3.5 text-[13px]",
        "icon": "h-8 w-8"
      },
      "variants": {
        "primary": {
          "use_for": "1 ação principal por tela (Salvar, Criar, Aplicar).",
          "tailwind": "bg-[--brand-amber] text-[--bg-canvas] hover:bg-[#D6A63A] active:bg-[#B88722]",
          "focus": "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:ring-[#C9962A]"
        },
        "secondary": {
          "use_for": "Ações comuns (Editar, Exportar).",
          "tailwind": "bg-[#14161A] text-[#F4F2EE] border border-[#23262D] hover:bg-[#191C21]"
        },
        "ghost": {
          "use_for": "Ações em tabelas/linhas (ícones).",
          "tailwind": "bg-transparent hover:bg-[#14161A] text-[#C9C6BF] hover:text-[#F4F2EE]"
        },
        "danger": {
          "use_for": "Excluir/Remover exceção.",
          "tailwind": "bg-[#1A0E10] text-[#FF6B6B] border border-[#3A1E22] hover:bg-[#231114]"
        }
      },
      "micro_interactions": {
        "rule": "Sem transition:all. Use transições específicas.",
        "tailwind": "transition-colors duration-150 ease-out active:translate-y-[0.5px]"
      }
    },

    "inputs": {
      "style": {
        "height": "h-9 (admin), h-10 (vitrine)",
        "bg": "#0F1012",
        "border": "#23262D",
        "focus_ring": "#C9962A"
      },
      "tailwind_example": "h-9 bg-[#0F1012] border border-[#23262D] text-[#F4F2EE] placeholder:text-[#6F6B64] focus-visible:ring-2 focus-visible:ring-[#C9962A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]",
      "patterns": {
        "search": "Input com ícone à esquerda + atalho / para focar (opcional).",
        "inline_edit": "Input sem sombra, com bg layer_2 ao focar; Enter salva, Esc cancela."
      }
    },

    "badges_and_pills": {
      "availability": {
        "available": "Badge pill: bg success.bg, text success.fg, border success.border",
        "unavailable": "Badge pill: bg danger.bg, text danger.fg, border danger.border"
      },
      "tier_badges": {
        "rule": "Não usar cores literais (bronze/prata/ouro) saturadas. Usar tons discretos e consistentes.",
        "shape": "rounded-md px-2 py-0.5 text-[11px] font-medium border"
      },
      "extension_state": {
        "inheriting": {
          "label": "HERDANDO VAREJO",
          "style": "bg #121419, border #2B2F38, text #C9C6BF",
          "icon": "link"
        },
        "custom": {
          "label": "PREÇO PERSONALIZADO",
          "style": "bg #171309, border #2A210F, text #F5D58A",
          "icon": "sparkles (discreto)"
        }
      }
    },

    "tables_dense": {
      "use": "Produtos, Preços (7 níveis), Promoções, Pedidos.",
      "row_height": "32–36px (default).",
      "header": "sticky top-0 bg layer_1 com border-bottom hairline.",
      "cell": {
        "padding": "px-3 py-2",
        "typography": "text-[13px] leading-[18px]",
        "numeric": "text-right tabular-nums",
        "muted": "text-[#9A968E]"
      },
      "interaction": {
        "row_hover": "hover:bg-[#0F1012] (ou layer_1) sem glow",
        "row_focus": "focus-within:outline-none focus-within:ring-2 focus-within:ring-[#C9962A] focus-within:ring-offset-2 focus-within:ring-offset-[#0A0A0B]",
        "actions": "Ações como ícones em ghost buttons; revelar no hover (opacity transition-colors only)."
      },
      "empty_loading_error": {
        "loading": "Skeleton rows (skeleton.jsx) com 6–10 linhas.",
        "empty": "Mensagem curta + ação primária (Criar produto / Limpar filtros).",
        "error": "Alert (alert.jsx) com tom danger.bg e botão 'Tentar novamente'."
      }
    },

    "command_palette": {
      "component": "command.jsx",
      "trigger": "Botão na topbar + atalho ⌘K",
      "content": "Busca fuzzy + grupos: Navegação, Criar, Ações rápidas (ex: 'Criar promoção', 'Ir para produto…').",
      "ui": {
        "surface": "popover layer_2 com shadow elev_2",
        "kbd": "Mostrar atalhos à direita (text-[11px] muted)."
      }
    },

    "drawers_dialogs": {
      "drawer": {
        "use_for": "Filtros avançados, detalhes rápidos, ações em mobile.",
        "component": "drawer.jsx",
        "width": "sm: 420px",
        "bg": "#14161A",
        "no_transparency": true
      },
      "dialog": {
        "use_for": "Confirmações destrutivas, criar/editar pequeno.",
        "component": "dialog.jsx",
        "rule": "Produto detalhe/edição NÃO é modal — é workspace de página."
      }
    },

    "navigation": {
      "sidebar": {
        "width": "220px",
        "density": "Itens h-9, ícone 16px, label 13px",
        "active_state": "bg layer_2 + left indicator 2px dourado (somente item ativo)",
        "tailwind": "w-[220px] bg-[#0F1012] border-r border-[#23262D]"
      },
      "topbar": {
        "height": "48px",
        "content": "Breadcrumbs discretos + busca + ações contextuais",
        "tailwind": "h-12 bg-[#0A0A0B] border-b border-[#23262D]"
      },
      "breadcrumbs": {
        "component": "breadcrumb.jsx",
        "style": "text-[12px] text-muted-foreground; último item em text-foreground"
      }
    },

    "storefront_components": {
      "header": {
        "sticky": true,
        "height": "56px",
        "content": "Logo Respect + busca + botão promoções",
        "tailwind": "sticky top-0 z-20 bg-[#0A0A0B] border-b border-[#23262D]"
      },
      "accordion_catalog": {
        "component": "accordion.jsx",
        "pattern": "Categoria (AccordionItem) → Marca (sub-accordion com Avatar logo) → Produtos (lista compacta)",
        "brand_logo": "avatar.jsx com fallback iniciais",
        "interaction": "Chevron rotate 180 com transition-transform duration-150"
      },
      "product_card_compact": {
        "rule": "Sem cards enormes. Preferir linhas compactas com thumbnail opcional.",
        "tailwind": "rounded-md border border-[#23262D] bg-[#0F1012] p-3"
      }
    }
  },

  "screen_composition_patterns": {
    "admin_dashboard": {
      "goal": "Operacional e acionável: 'Precisa da sua atenção'.",
      "layout": [
        "Top: faixa de alertas/pendências (3–5 itens) em lista compacta",
        "Meio: 2 colunas (desktop) com blocos: Produtos vencidos, Queima de estoque, Pesquisas sem resultado",
        "Base: Atalhos rápidos (Criar promoção, Ir para preços, Ver pedidos)"
      ],
      "components": ["alert.jsx", "card.jsx (compact)", "button.jsx", "tabs.jsx"],
      "notes": "Evitar gráficos grandes; se usar, mini sparklines discretos."
    },

    "products_list": {
      "layout": [
        "Topbar local: busca + filtros rápidos (chips) + botão 'Filtros avançados' (Drawer)",
        "Tabela densa com sticky header",
        "Colunas sugeridas: Nome, Marca, Categoria, Status, Disponibilidade, Varejo, Ouro, Diamante, Extensões (count), Ações"
      ],
      "filters": {
        "quick": ["Disponível", "Em promoção", "Sem estoque", "Vencendo"],
        "advanced_drawer": ["Marca", "Categoria", "Extensão", "Faixa de preço", "Status", "Visibilidade por nível"]
      }
    },

    "product_detail_workspace": {
      "rule": "Workspace amplo (não modal).",
      "layout": [
        "Header fixo da página: título + status + ações (Salvar, Duplicar, Arquivar)",
        "Grid 12 colunas: esquerda (8) conteúdo; direita (4) painel de status/visibilidade",
        "Seções: Identidade, Status, Preços (7 níveis comparáveis), Promoção, Visibilidade por nível, Extensões"
      ],
      "interaction": "Salvar com toast (sonner) + indicador 'Unsaved changes' discreto."
    },

    "prices_table_inline_edit": {
      "layout": [
        "Tabela com colunas fixas: Produto | Varejo | Bronze | Prata | Ouro | Platina | Esmeralda | Diamante",
        "Edição inline: clique vira input; Enter salva; Esc cancela",
        "Comparação: delta vs Varejo em texto muted (ex: +12,50)"
      ],
      "visual": {
        "edited_cell": "borda 1px dourada + bg subtle_bg",
        "invalid": "borda danger.border + mensagem pequena"
      }
    },

    "extensions": {
      "layout": [
        "Lista de extensões (8) com status e contagem de exceções",
        "Página da extensão: tabela de exceções com toggle 'Herdar varejo' / 'Personalizar'"
      ],
      "state_design": "Diferença clara entre herdando vs personalizado usando pills e ícones (sem cores gritantes)."
    },

    "orders": {
      "list": "Tabela densa com status + origem + data + ação 'Abrir timeline'.",
      "detail": {
        "timeline": "Vertical stepper: Criado → Separado → Encaminhado para WhatsApp (sem mencionar faturamento/receita)",
        "components": ["separator.jsx", "badge.jsx", "card.jsx"]
      }
    },

    "analytics": {
      "focus": "Pesquisas sem resultado + funil add-to-cart → handoff WhatsApp.",
      "charts": {
        "library": "recharts (opcional)",
        "style": "Linhas finas, sem preenchimento pesado; eixos muted; tooltip sólido (sem transparência)."
      }
    },

    "public_storefront": {
      "layout": [
        "Header sticky com busca",
        "Accordion Categoria → Marca (com logo) → Produtos",
        "Produtos indisponíveis continuam visíveis (badge indisponível + botão desabilitado)"
      ],
      "mobile": "Ações grandes o suficiente para toque (min-h 44px), mas cards continuam compactos."
    }
  },

  "micro_interactions_motion": {
    "principles": [
      "Transições curtas (120–160ms) e discretas",
      "Hover: mudança de cor/borda, não escala exagerada",
      "Focus: ring dourado consistente",
      "Scroll: sticky headers e sombras mínimas (ou só border)"
    ],
    "tailwind_snippets": {
      "hover_row": "transition-colors duration-150 ease-out",
      "chevron": "transition-transform duration-150 ease-out data-[state=open]:rotate-180",
      "focus_ring": "focus-visible:ring-2 focus-visible:ring-[#C9962A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
    },
    "reduced_motion": "Respeitar prefers-reduced-motion: evitar animações contínuas."
  },

  "accessibility": {
    "contrast": "Garantir contraste AA: texto primary em bg canvas; muted ainda legível.",
    "focus": "Sempre visível (ring dourado).",
    "keyboard": "⌘K abre Command; tabelas navegáveis; inputs com labels (label.jsx).",
    "touch": "Na vitrine: alvos >= 44px; espaçamento vertical suficiente."
  },

  "images": {
    "image_urls": {
      "brand_logos": {
        "description": "Marcas usam logos pequenas; fallback com iniciais via Avatar.",
        "urls": [],
        "note": "Preferir mock: gerar iniciais e cores neutras; evitar imagens externas desnecessárias."
      },
      "storefront_hero": {
        "description": "Vitrine não precisa de hero grande; usar header + promoções compactas.",
        "urls": []
      }
    }
  },

  "libraries_optional": {
    "recharts": {
      "when": "Analytics (funil e tendências).",
      "install": "npm i recharts",
      "usage_notes": [
        "Tooltip com bg sólido (#14161A) e border hairline",
        "Sem gradients grandes; linhas finas; pontos pequenos"
      ]
    },
    "framer_motion": {
      "when": "Apenas para micro transições (drawer open, list enter) se necessário.",
      "install": "npm i framer-motion",
      "rule": "Evitar animações chamativas; respeitar reduced motion."
    }
  },

  "instructions_to_main_agent": [
    "Atualizar /app/frontend/src/index.css tokens shadcn para o tema grafite + dourado (solid backgrounds).",
    "Remover/ignorar estilos default do CRA em App.css (não usar App-header centralizado).",
    "Construir Admin Shell: sidebar 220px + topbar 48px + breadcrumbs + Command (⌘K) usando command.jsx.",
    "Implementar tabelas densas com sticky header (table.jsx) e ações em ghost buttons.",
    "Produto detalhe/edição deve ser página workspace (grid 12 colunas), não modal.",
    "Extensões: diferenciar claramente HERDANDO VAREJO vs PREÇO PERSONALIZADO com pills e estilos definidos.",
    "Vitrine pública: header sticky + busca + accordion categoria→marca→produtos; mobile-first real.",
    "Adicionar data-testid em TODOS os elementos interativos e informações críticas."
  ]
}

---

<General UI UX Design Guidelines>  
    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms
    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text
   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json

 **GRADIENT RESTRICTION RULE**
NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc
NEVER use dark gradients for logo, testimonial, footer etc
NEVER let gradients cover more than 20% of the viewport.
NEVER apply gradients to text-heavy content or reading areas.
NEVER use gradients on small UI elements (<100px width).
NEVER stack multiple gradient layers in the same viewport.

**ENFORCEMENT RULE:**
    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors

**How and where to use:**
   • Section backgrounds (not content backgrounds)
   • Hero section header content. Eg: dark to light to dark color
   • Decorative overlays and accent elements only
   • Hero section with 2-3 mild color
   • Gradients creation can be done for any angle say horizontal, vertical or diagonal

- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**

</Font Guidelines>

- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. 
   
- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.

- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.
   
- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly
    Eg: - if it implies playful/energetic, choose a colorful scheme
           - if it implies monochrome/minimal, choose a black–white/neutral scheme

**Component Reuse:**
	- Prioritize using pre-existing components from src/components/ui when applicable
	- Create new components that match the style and conventions of existing components when needed
	- Examine existing components to understand the project's component patterns before creating new ones

**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component

**Best Practices:**
	- Use Shadcn/UI as the primary component library for consistency and accessibility
	- Import path: ./components/[component-name]

**Export Conventions:**
	- Components MUST use named exports (export const ComponentName = ...)
	- Pages MUST use default exports (export default function PageName() {...})

**Toasts:**
  - Use `sonner` for toasts"
  - Sonner component are located in `/app/src/components/ui/sonner.tsx`

Use 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.
</General UI UX Design Guidelines>
