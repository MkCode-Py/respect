// Respect Pharma NEXT — Mock Data (100% frontend)
// Realistic dataset simulating ~800 products across 7 tiers and 8 extensions.

import { slug } from "@/lib/format";

export const TIERS = [
  { key: "varejo", label: "Varejo" },
  { key: "bronze", label: "Bronze" },
  { key: "prata", label: "Prata" },
  { key: "ouro", label: "Ouro" },
  { key: "platina", label: "Platina" },
  { key: "esmeralda", label: "Esmeralda" },
  { key: "diamante", label: "Diamante" },
];

export const EXTENSIONS = [
  { slug: "cooper", name: "Cooper", initials: "CP", tone: "#6E7B8B", active: true },
  { slug: "murilo", name: "Murilo", initials: "MU", tone: "#7A5E3F", active: true },
  { slug: "maneco", name: "Maneco", initials: "MN", tone: "#5E7A5E", active: true },
  { slug: "muscle-labs-india", name: "Muscle Labs India", initials: "ML", tone: "#8B5E3C", active: true },
  { slug: "zphc", name: "ZPHC", initials: "ZP", tone: "#5C6E8B", active: true },
  { slug: "marcos-royal", name: "Marcos Royal", initials: "MR", tone: "#8B7A3C", active: true },
  { slug: "andrey-eminence-labs", name: "Andrey Eminence Labs", initials: "AE", tone: "#5E5E8B", active: true },
  { slug: "mauricio-landerlan", name: "Mauricio Landerlan", initials: "MA", tone: "#7A3C3C", active: false },
];

export const CATEGORIES = [
  { slug: "emagrecedores", name: "Emagrecedores", short: "EM", tone: "#7A5E3F" },
  { slug: "farmacia-manipulados", name: "Farmácia + Manipulados", short: "FA", tone: "#5E7A6B" },
  { slug: "marcas-importadas", name: "Marcas Importadas", short: "MI", tone: "#6E7B8B" },
  { slug: "marcas-premium", name: "Marcas Premium", short: "MP", tone: "#8B7A3C" },
  { slug: "peptideos", name: "Peptídeos", short: "PE", tone: "#5E5E8B" },
  { slug: "sarms-variados", name: "SARMs + Variados", short: "SA", tone: "#7A3C5E" },
];

export const BRANDS = [
  { slug: "synedica",         name: "Synedica",         category: "emagrecedores",         tone: "#7A5E3F" },
  { slug: "lilly",             name: "Lilly",             category: "emagrecedores",         tone: "#8B4C4C" },
  { slug: "gen-tirz",          name: "GEN-TIRZ",          category: "emagrecedores",         tone: "#6E7B8B" },
  { slug: "eticos",            name: "Éticos",            category: "farmacia-manipulados", tone: "#5E7A6B" },
  { slug: "farmacia",          name: "Farmácia Respect",  category: "farmacia-manipulados", tone: "#5E7A6B" },
  { slug: "manipulados",       name: "Manipulados",       category: "farmacia-manipulados", tone: "#4C7A6E" },
  { slug: "cooper-pharma",     name: "Cooper Pharma",     category: "marcas-importadas",    tone: "#6E7B8B" },
  { slug: "balkan",             name: "Balkan Pharma",     category: "marcas-importadas",    tone: "#5C6E8B" },
  { slug: "alpha-pharma",       name: "Alpha Pharma",      category: "marcas-importadas",    tone: "#6E7B8B" },
  { slug: "bratva-labs",        name: "Bratva Labs",       category: "marcas-importadas",    tone: "#8B5E3C" },
  { slug: "canada-labs",        name: "Canada Labs",       category: "marcas-importadas",    tone: "#8B4C4C" },
  { slug: "aureon",             name: "Aureon",            category: "marcas-premium",       tone: "#8B7A3C" },
  { slug: "eminence-labs",      name: "Eminence Labs",     category: "marcas-premium",       tone: "#8B7A3C" },
  { slug: "dragon-elite",       name: "Dragon Elite",      category: "marcas-premium",       tone: "#7A5E3F" },
  { slug: "alluvi",             name: "Alluvi",            category: "marcas-premium",       tone: "#5E7A6B" },
  { slug: "geniqs-pharma",      name: "Geniqs Pharma",     category: "marcas-premium",       tone: "#6E7B8B" },
  { slug: "pharmaqo",           name: "Pharmaqo Labs",     category: "marcas-premium",       tone: "#7A5E3F" },
  { slug: "landerlan",          name: "Landerlan",         category: "marcas-premium",       tone: "#8B5E3C" },
  { slug: "peptide-sciences",   name: "Peptide Sciences",  category: "peptideos",             tone: "#5E5E8B" },
  { slug: "pure-peptides",      name: "Pure Peptides",     category: "peptideos",             tone: "#5E5E8B" },
  { slug: "biotropin",          name: "Biotropin",         category: "peptideos",             tone: "#5C6E8B" },
  { slug: "hygetropin",         name: "Hygetropin",        category: "peptideos",             tone: "#6E7B8B" },
  { slug: "sarms-forte",        name: "SARMs Forte",       category: "sarms-variados",       tone: "#7A3C5E" },
  { slug: "radar-labs",         name: "Radar Labs",        category: "sarms-variados",       tone: "#7A3C5E" },
];

const PRODUCT_TEMPLATES = {
  "emagrecedores": [
    { name: "Retatrutida",       dose: ["10mg","20mg","30mg","40mg","50mg"], form: "Emagrecedor" },
    { name: "Semaglutida",       dose: ["0.25mg","0.5mg","1mg","2mg"],        form: "Emagrecedor" },
    { name: "Tirzepatida",       dose: ["2.5mg","5mg","7.5mg","10mg","15mg"], form: "Emagrecedor" },
    { name: "Mounjaro Caneta",   dose: ["5mg","10mg","15mg"],                 form: "Emagrecedor" },
    { name: "Ozempic Caneta",    dose: ["0.5mg","1mg","2mg"],                 form: "Emagrecedor" },
    { name: "Wegovy",             dose: ["2.4mg"],                             form: "Emagrecedor" },
    { name: "Lipoless",           dose: ["12,5mg","15mg"],                     form: "Emagrecedor" },
    { name: "NAD+ + B12 Caneta", dose: ["1000mg + 4000mcg"],                   form: "Peptídeo" },
    { name: "Cagrilintida",       dose: ["2.4mg","5mg"],                       form: "Emagrecedor" },
  ],
  "farmacia-manipulados": [
    { name: "Anfepramona",  dose: ["25mg","50mg","75mg"],         form: "Comprimido" },
    { name: "Cafeína",       dose: ["100mg","210mg","420mg"],       form: "Comprimido" },
    { name: "Clomid",        dose: ["25mg","50mg"],                 form: "Comprimido" },
    { name: "Clomipramina",  dose: ["30mg","60mg"],                 form: "Comprimido" },
    { name: "Femproporex",   dose: ["25mg"],                        form: "Comprimido" },
    { name: "Ioimbina",      dose: ["5mg","10mg"],                  form: "Comprimido" },
    { name: "Proviron",      dose: ["25mg"],                        form: "Comprimido" },
    { name: "Silimarina",    dose: ["200mg","400mg"],               form: "Cápsula" },
    { name: "T3",             dose: ["25mcg","50mcg","100mcg"],      form: "Comprimido" },
    { name: "T4",             dose: ["50mcg","100mcg"],              form: "Comprimido" },
    { name: "Tamoxifeno",    dose: ["10mg","20mg"],                 form: "Comprimido" },
    { name: "Testo Oral",    dose: ["40mg","50mg"],                 form: "Cápsula" },
    { name: "Venvanse",      dose: ["10mg","30mg","50mg","70mg"],    form: "Cápsula" },
    { name: "Sibutramina",   dose: ["10mg","15mg"],                 form: "Cápsula" },
    { name: "Modafinil",     dose: ["100mg","200mg"],               form: "Comprimido" },
    { name: "Metformina",    dose: ["500mg","850mg"],               form: "Comprimido" },
  ],
  "marcas-importadas": [
    { name: "Testosterona Enantato", dose: ["250mg/ml"], form: "Injetável" },
    { name: "Testosterona Cipionato",dose: ["200mg/ml"], form: "Injetável" },
    { name: "Trembolona Enantato",   dose: ["200mg/ml"], form: "Injetável" },
    { name: "Trembolona Acetato",    dose: ["100mg/ml"], form: "Injetável" },
    { name: "Boldenona",              dose: ["250mg/ml"], form: "Injetável" },
    { name: "Deca Durabolin",         dose: ["250mg/ml"], form: "Injetável" },
    { name: "Masteron Propionato",   dose: ["100mg/ml"], form: "Injetável" },
    { name: "Primobolan",             dose: ["100mg/ml"], form: "Injetável" },
    { name: "Winstrol Depot",         dose: ["50mg/ml"],  form: "Injetável" },
    { name: "Sustanon",               dose: ["250mg/ml"], form: "Injetável" },
    { name: "Oxandrolona",            dose: ["10mg","20mg"], form: "Comprimido" },
    { name: "Dianabol",               dose: ["10mg"],        form: "Comprimido" },
    { name: "Stanozolol Oral",       dose: ["10mg"],        form: "Comprimido" },
  ],
  "marcas-premium": [
    { name: "Enantato Premium",   dose: ["300mg/ml"], form: "Injetável" },
    { name: "Cipionato Premium",  dose: ["250mg/ml"], form: "Injetável" },
    { name: "Trembolona Mix",     dose: ["200mg/ml"], form: "Injetável" },
    { name: "Masteron Enantato", dose: ["200mg/ml"], form: "Injetável" },
    { name: "Sustanon Premium",  dose: ["300mg/ml"], form: "Injetável" },
    { name: "Boldenona Elite",   dose: ["300mg/ml"], form: "Injetável" },
    { name: "Blend Corte",        dose: ["400mg/ml"], form: "Injetável" },
    { name: "Blend Volume",       dose: ["500mg/ml"], form: "Injetável" },
    { name: "Anavar Elite",       dose: ["25mg"],      form: "Comprimido" },
  ],
  "peptideos": [
    { name: "BPC-157",       dose: ["5mg","10mg"], form: "Peptídeo" },
    { name: "TB-500",        dose: ["5mg","10mg"], form: "Peptídeo" },
    { name: "CJC-1295",      dose: ["2mg","5mg"],  form: "Peptídeo" },
    { name: "Ipamorelin",    dose: ["2mg","5mg"],  form: "Peptídeo" },
    { name: "GHRP-6",        dose: ["5mg"],         form: "Peptídeo" },
    { name: "MOTS-C",        dose: ["10mg"],        form: "Peptídeo" },
    { name: "HGH Frag",      dose: ["2mg","5mg"],  form: "Peptídeo" },
    { name: "Melanotan II", dose: ["10mg"],        form: "Peptídeo" },
    { name: "IGF-1 LR3",     dose: ["1mg"],         form: "Peptídeo" },
    { name: "Hygetropin HGH", dose: ["100UI","200UI"], form: "Peptídeo" },
  ],
  "sarms-variados": [
    { name: "Ostarine",   dose: ["10mg","25mg"], form: "SARM" },
    { name: "Ligandrol",  dose: ["5mg","10mg"],  form: "SARM" },
    { name: "Cardarine",  dose: ["10mg","20mg"], form: "SARM" },
    { name: "Andarine",   dose: ["25mg"],         form: "SARM" },
    { name: "RAD-140",    dose: ["10mg"],         form: "SARM" },
    { name: "YK-11",      dose: ["10mg"],         form: "SARM" },
    { name: "MK-677",     dose: ["25mg"],         form: "SARM" },
  ],
};

const PACKS = {
  "Comprimido":  ["30 Comprimidos","60 Comprimidos","100 Comprimidos"],
  "Cápsula":     ["30 Cápsulas","60 Cápsulas"],
  "Injetável":   ["10ml","20ml"],
  "Peptídeo":    ["1 Frasco","2 Frascos","5 Vials"],
  "SARM":         ["30 ml","60 ml"],
  "Emagrecedor": ["1 Caneta","2 Canetas","4 Vials"],
};

// Deterministic pseudo-random for stable UI
function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260118);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const chance = (p) => rand() < p;
const round = (n, step = 1) => Math.round(n / step) * step;

function buildProducts() {
  const products = [];
  let id = 1;

  // For each brand, create N products by rotating through category templates
  for (const brand of BRANDS) {
    const templates = PRODUCT_TEMPLATES[brand.category] || [];
    const targetCount =
      brand.category === "farmacia-manipulados" ? 22 :
      brand.category === "emagrecedores" ? 18 :
      brand.category === "marcas-importadas" ? 26 :
      brand.category === "marcas-premium" ? 30 :
      brand.category === "peptideos" ? 22 :
      12;
    let created = 0;
    let ti = 0;
    while (created < targetCount && ti < templates.length * 4) {
      const tpl = templates[ti % templates.length];
      const dose = tpl.dose[ti % tpl.dose.length];
      const pack = pick(PACKS[tpl.form] || ["1 Unidade"]);
      const basePrice =
        tpl.form === "Emagrecedor" ? 350 + Math.floor(rand() * 900) :
        tpl.form === "Peptídeo"    ? 180 + Math.floor(rand() * 400) :
        tpl.form === "Injetável"    ? 90 + Math.floor(rand() * 260) :
        tpl.form === "SARM"          ? 120 + Math.floor(rand() * 220) :
        20 + Math.floor(rand() * 240);
      const priceVarejo = round(basePrice);
      const priceScale = {
        varejo:    priceVarejo,
        bronze:    round(priceVarejo * (0.94 + rand() * 0.02)),
        prata:     round(priceVarejo * (0.90 + rand() * 0.02)),
        ouro:      round(priceVarejo * (0.86 + rand() * 0.02)),
        platina:   round(priceVarejo * (0.82 + rand() * 0.02)),
        esmeralda: round(priceVarejo * (0.78 + rand() * 0.02)),
        diamante:  round(priceVarejo * (0.72 + rand() * 0.02)),
      };
      const missingPrice = chance(0.04);
      if (missingPrice) {
        const missingTier = pick(["bronze","prata","ouro","platina","esmeralda","diamante"]);
        priceScale[missingTier] = null;
      }
      const available = !chance(0.19);
      const promoOn = chance(0.11);
      const promoPrice = promoOn ? round(priceVarejo * (0.82 - rand() * 0.10)) : null;

      // extension overrides (custom pricing) — ~1 in 6 has at least one
      const overrides = {};
      if (chance(0.18)) {
        const ext1 = pick(EXTENSIONS).slug;
        overrides[ext1] = round(priceVarejo * (1.05 + rand() * 0.20));
      }
      if (chance(0.10)) {
        const ext2 = pick(EXTENSIONS).slug;
        overrides[ext2] = round(priceVarejo * (0.90 - rand() * 0.10));
      }

      // visibility per tier (default all visible; sometimes hidden in a tier)
      const visibility = Object.fromEntries(TIERS.map((t) => [t.key, true]));
      if (chance(0.06)) visibility["varejo"] = false;
      if (chance(0.04)) visibility["bronze"] = false;

      products.push({
        id: `p-${id}`,
        name: tpl.name,
        description: pack,
        brand: brand.slug,
        category: brand.category,
        form: tpl.form,
        dosage: dose,
        pack,
        available,
        image: null,
        prices: priceScale,
        promo: promoOn ? { price: promoPrice, endsAt: futureDate(3 + Math.floor(rand() * 20)) } : null,
        extensionOverrides: overrides,
        visibility,
        views: Math.floor(30 + rand() * 800),
        searches: Math.floor(rand() * 260),
        addedAt: pastDate(Math.floor(rand() * 240)),
      });
      id++;
      created++;
      ti++;
    }
  }
  return products;
}

function futureDate(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}
function pastDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function buildOrders(products) {
  const orders = [];
  const clients = [
    "Ricardo M.", "Juliana P.", "Bruno S.", "Carla V.", "Diego R.", "Fernanda A.",
    "Guilherme L.", "Isabela C.", "Rodrigo N.", "Tâmara F.", "Vitor H.", "Amélia S.",
    "Marcus C.", "Priscila B.", "Thiago O.", "Renata Q.", "Leandro D.", "Beatriz P.",
  ];
  const states = ["SP","RJ","MG","PR","RS","SC","BA","CE","PE","GO","DF","ES"];
  const cities  = { SP:"São Paulo", RJ:"Rio de Janeiro", MG:"Belo Horizonte", PR:"Curitiba", RS:"Porto Alegre", SC:"Florianópolis", BA:"Salvador", CE:"Fortaleza", PE:"Recife", GO:"Goiânia", DF:"Brasília", ES:"Vitória" };
  for (let i = 0; i < 68; i++) {
    const ext = pick(EXTENSIONS);
    const itemsCount = 1 + Math.floor(rand() * 4);
    const items = [];
    let subtotal = 0;
    for (let j = 0; j < itemsCount; j++) {
      const p = products[Math.floor(rand() * products.length)];
      const qty = 1 + Math.floor(rand() * 3);
      const unit = p.promo?.price || p.prices.varejo || 100;
      subtotal += unit * qty;
      items.push({ productId: p.id, name: p.name, dosage: p.dosage, qty, unit });
    }
    const freight = round(28 + rand() * 60);
    const insurance = round(subtotal * 0.15);
    const total = subtotal + freight + insurance;
    const st = pick(states);
    const daysAgo = Math.floor(rand() * 12);
    const status = daysAgo === 0
      ? pick(["pending","whatsapp","whatsapp"])
      : pick(["whatsapp","whatsapp","completed","pending"]);
    orders.push({
      id: `PED-${(1000 + i).toString()}`,
      createdAt: pastDate(daysAgo, Math.floor(rand()*23)),
      extension: ext.slug,
      client: pick(clients),
      city: cities[st],
      state: st,
      items,
      subtotal,
      freight,
      insurance,
      total,
      status, // pending | whatsapp | completed
      timeline: buildTimeline(status, daysAgo),
    });
  }
  orders.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return orders;
}

function buildTimeline(status, daysAgo) {
  const now = new Date();
  const t0 = new Date(now.getTime() - (daysAgo * 24 + Math.floor(rand()*20)) * 3600 * 1000);
  const events = [
    { key: "created",  label: "Pedido criado",              at: t0.toISOString() },
  ];
  if (status === "whatsapp" || status === "completed") {
    const t1 = new Date(t0.getTime() + (10 + Math.floor(rand()*60)) * 60 * 1000);
    events.push({ key: "whatsapp", label: "Encaminhado para WhatsApp", at: t1.toISOString() });
  }
  if (status === "completed") {
    const t2 = new Date(t0.getTime() + (2 + Math.floor(rand()*8)) * 3600 * 1000);
    events.push({ key: "completed", label: "Cliente confirmou recebimento", at: t2.toISOString() });
  }
  return events;
}

function buildPromotions(products) {
  return products
    .filter((p) => p.promo)
    .map((p) => ({
      id: `promo-${p.id}`,
      productId: p.id,
      productName: p.name,
      brand: p.brand,
      originalPrice: p.prices.varejo,
      promoPrice: p.promo.price,
      discount: Math.round((1 - p.promo.price / p.prices.varejo) * 100),
      endsAt: p.promo.endsAt,
      extensions: chance(0.5) ? [pick(EXTENSIONS).slug] : EXTENSIONS.map(e => e.slug),
    }))
    .slice(0, 42);
}

function buildAnalytics(products) {
  const days = 30;
  const daily = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    daily.push({
      date: d.toISOString().slice(0,10),
      visits: 380 + Math.floor(rand() * 460),
      searches: 210 + Math.floor(rand() * 240),
      addToCart: 24 + Math.floor(rand() * 60),
      checkouts: 8 + Math.floor(rand() * 26),
      whatsapp: 5 + Math.floor(rand() * 20),
    });
  }
  const topSearches = [
    { term: "mounjaro",       count: 342, hasResult: true },
    { term: "retatrutida",   count: 298, hasResult: true },
    { term: "trembolona",    count: 264, hasResult: true },
    { term: "stanozolol",    count: 240, hasResult: true },
    { term: "HGH",             count: 210, hasResult: true },
    { term: "anavar",         count: 187, hasResult: true },
    { term: "oxymetholone",  count: 92,  hasResult: false },
    { term: "finasterida",   count: 78,  hasResult: false },
    { term: "cardarine spray", count: 61, hasResult: false },
    { term: "testo gel",      count: 54,  hasResult: false },
    { term: "clenbuterol xarope", count: 47, hasResult: false },
    { term: "anastrozol",     count: 41,  hasResult: false },
  ];
  return { daily, topSearches };
}

function buildStockBurn(products) {
  return products
    .filter((_, i) => i % 47 === 0)
    .slice(0, 12)
    .map((p) => ({
      id: `qe-${p.id}`,
      name: p.name,
      brand: p.brand,
      dosage: p.dosage,
      originalPrice: p.prices.varejo,
      burnPrice: round(p.prices.varejo * 0.55),
      qty: 3 + Math.floor(rand() * 12),
      expiresAt: futureDate(20 + Math.floor(rand() * 80)),
    }));
}

function buildExpired(products) {
  return products
    .filter((_, i) => i % 71 === 0)
    .slice(0, 8)
    .map((p) => ({
      id: `vc-${p.id}`,
      name: p.name,
      brand: p.brand,
      dosage: p.dosage,
      qty: 1 + Math.floor(rand() * 8),
      expiredAt: pastDate(2 + Math.floor(rand() * 40)),
    }));
}

function buildFreights() {
  return [
    { id: "f1", label: "SEDEX",           region: "SP-Capital",      price: 32.9, days: "1-2" },
    { id: "f2", label: "SEDEX",           region: "SP-Interior",    price: 38.5, days: "2-3" },
    { id: "f3", label: "SEDEX",           region: "Sudeste",         price: 46.9, days: "2-4" },
    { id: "f4", label: "SEDEX",           region: "Sul",              price: 54.0, days: "3-5" },
    { id: "f5", label: "SEDEX",           region: "Nordeste",         price: 68.0, days: "4-7" },
    { id: "f6", label: "SEDEX",           region: "Norte",            price: 84.0, days: "5-9" },
    { id: "f7", label: "Transportadora", region: "Todo Brasil",     price: 89.9, days: "6-10" },
    { id: "f8", label: "Motoboy",         region: "São Paulo Capital",price: 24.9, days: "mesmo dia" },
  ];
}

function buildShippingRules() {
  return [
    { id: "r1", title: "Pedidos acima de R$ 800",    detail: "Frete gratuito para Sudeste em SEDEX" },
    { id: "r2", title: "Envios com Seguro",           detail: "Recálculo automático de acordo com valor da carga" },
    { id: "r3", title: "Pedidos com Peptideos",     detail: "Envio refrigerado disponível mediante confirmação" },
    { id: "r4", title: "Pedidos internacionais",     detail: "Somente por transportadora autorizada com código" },
    { id: "r5", title: "Cortes de horário",           detail: "Pedidos após 15h saem no próximo dia útil" },
  ];
}

function buildAnnouncements() {
  return [
    { id: "c1", title: "Nova linha Retatrutida Synedica", status: "active",  updatedAt: pastDate(1), audience: "Todos os níveis" },
    { id: "c2", title: "Estoque limitado — Mounjaro Caneta", status: "active", updatedAt: pastDate(3), audience: "Ouro, Platina, Esmeralda, Diamante" },
    { id: "c3", title: "Feriado nacional — envio suspenso", status: "scheduled", updatedAt: pastDate(0), audience: "Todos" },
    { id: "c4", title: "Nova extensão Andrey Eminence Labs", status: "draft", updatedAt: pastDate(5), audience: "Interno" },
  ];
}

export function buildDataset() {
  const products = buildProducts();
  const orders = buildOrders(products);
  const promotions = buildPromotions(products);
  const analytics = buildAnalytics(products);
  const stockBurn = buildStockBurn(products);
  const expired = buildExpired(products);
  const freights = buildFreights();
  const shippingRules = buildShippingRules();
  const announcements = buildAnnouncements();

  return {
    tiers: TIERS,
    extensions: EXTENSIONS,
    categories: CATEGORIES,
    brands: BRANDS,
    products,
    orders,
    promotions,
    analytics,
    stockBurn,
    expired,
    freights,
    shippingRules,
    announcements,
    insurance: { rate: 0.15, enabled: true },
  };
}
