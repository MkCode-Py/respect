import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { buildDataset, TIERS, EXTENSIONS, CATEGORIES, BRANDS } from "@/data/mockData";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [data, setData] = useState(() => buildDataset());

  const updateProduct = useCallback((id, patch) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }));
  }, []);

  const toggleAvailability = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === id ? { ...p, available: !p.available } : p
      ),
    }));
  }, []);

  const setPrice = useCallback((id, tier, value) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === id ? { ...p, prices: { ...p.prices, [tier]: value } } : p
      ),
    }));
  }, []);

  const setExtensionOverride = useCallback((id, extSlug, value) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p.extensionOverrides };
        if (value == null) delete next[extSlug];
        else next[extSlug] = value;
        return { ...p, extensionOverrides: next };
      }),
    }));
  }, []);

  const setVisibility = useCallback((id, tier, visible) => {
    setData((prev) => ({
      ...prev,
      products: prev.products.map((p) =>
        p.id === id ? { ...p, visibility: { ...p.visibility, [tier]: visible } } : p
      ),
    }));
  }, []);

  const setInsurance = useCallback((patch) => {
    setData((prev) => ({ ...prev, insurance: { ...prev.insurance, ...patch } }));
  }, []);

  const value = useMemo(
    () => ({
      ...data,
      updateProduct,
      toggleAvailability,
      setPrice,
      setExtensionOverride,
      setVisibility,
      setInsurance,
    }),
    [data, updateProduct, toggleAvailability, setPrice, setExtensionOverride, setVisibility, setInsurance]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}

export { TIERS, EXTENSIONS, CATEGORIES, BRANDS };

// Helpers
export function priceForExtension(product, extSlug) {
  const override = product.extensionOverrides?.[extSlug];
  if (override != null) return { value: override, inherited: false };
  return { value: product.prices.varejo, inherited: true };
}

export function findBrand(brands, slug) {
  return brands.find((b) => b.slug === slug);
}
export function findCategory(cats, slug) {
  return cats.find((c) => c.slug === slug);
}
export function findExtension(exts, slug) {
  return exts.find((e) => e.slug === slug);
}
