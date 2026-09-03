import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { StoreProvider } from "@/data/store";
import AdminShell from "@/layout/AdminShell";
import Dashboard from "@/pages/admin/Dashboard";
import Products from "@/pages/admin/Products";
import ProductDetail from "@/pages/admin/ProductDetail";
import Prices from "@/pages/admin/Prices";
import Promotions from "@/pages/admin/Promotions";
import Orders from "@/pages/admin/Orders";
import OrderDetail from "@/pages/admin/OrderDetail";
import Extensions from "@/pages/admin/Extensions";
import ExtensionDetail from "@/pages/admin/ExtensionDetail";
import Analytics from "@/pages/admin/Analytics";
import Brands from "@/pages/admin/Brands";
import Categories from "@/pages/admin/Categories";
import Freight from "@/pages/admin/Freight";
import ShippingRules from "@/pages/admin/ShippingRules";
import Insurance from "@/pages/admin/Insurance";
import StockBurn from "@/pages/admin/StockBurn";
import ExpiredProducts from "@/pages/admin/ExpiredProducts";
import Communications from "@/pages/admin/Communications";
import Settings from "@/pages/admin/Settings";
import Storefront from "@/pages/storefront/Storefront";
import "@/App.css";

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/admin" replace />} />
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<Dashboard />} />
            <Route path="produtos" element={<Products />} />
            <Route path="produtos/:id" element={<ProductDetail />} />
            <Route path="precos" element={<Prices />} />
            <Route path="promocoes" element={<Promotions />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="pedidos/:id" element={<OrderDetail />} />
            <Route path="extensoes" element={<Extensions />} />
            <Route path="extensoes/:slug" element={<ExtensionDetail />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="marcas" element={<Brands />} />
            <Route path="categorias" element={<Categories />} />
            <Route path="fretes" element={<Freight />} />
            <Route path="regras-envio" element={<ShippingRules />} />
            <Route path="seguro" element={<Insurance />} />
            <Route path="queima-estoque" element={<StockBurn />} />
            <Route path="produtos-vencidos" element={<ExpiredProducts />} />
            <Route path="comunicados" element={<Communications />} />
            <Route path="configuracoes" element={<Settings />} />
          </Route>
          <Route path="/vitrine" element={<Storefront />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1A1A20",
            border: "1px solid #26252C",
            color: "#F6F4F0",
            fontSize: "13px",
            borderRadius: "12px",
          },
        }}
      />
    </StoreProvider>
  );
}
