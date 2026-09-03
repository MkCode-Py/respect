import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "@/layout/Sidebar";
import Topbar from "@/layout/Topbar";
import CommandPalette from "@/layout/CommandPalette";

export default function AdminShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer + scroll to top on route change
  useEffect(() => {
    setMobileOpen(false);
    const main = document.getElementById("admin-main");
    if (main) main.scrollTop = 0;
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[var(--canvas)] text-[var(--text-1)] flex" data-testid="admin-shell">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0 lg:pl-[var(--sidebar-w)]">
        <Topbar
          onOpenMobile={() => setMobileOpen(true)}
          onOpenCommand={() => setCmdOpen(true)}
          pathname={location.pathname}
        />
        <main id="admin-main" className="flex-1 min-w-0" style={{ overflowX: "clip" }}>
          <div className="animate-rise" key={location.pathname}>
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
    </div>
  );
}
