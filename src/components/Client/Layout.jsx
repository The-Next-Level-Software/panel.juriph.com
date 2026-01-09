import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen((p) => !p);

  // Auto-open sidebar on desktop, closed on mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)"); // sm
    const sync = () => setIsSidebarOpen(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white">
        <Topbar onToggle={toggleSidebar} />
      </header>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

      {/* Content */}
      <main
        className={[
          "pt-16 transition-[margin] duration-300",
          // Desktop: push content when sidebar is open
          isSidebarOpen ? "sm:ml-[330px]" : "sm:ml-0",
          // Mobile: always 0 margin (sidebar should overlay)
          "ml-0",
        ].join(" ")}
      >
        <Outlet />
      </main>
    </div>
  );
}
