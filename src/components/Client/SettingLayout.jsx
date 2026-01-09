import React from "react";
import { Outlet } from "react-router-dom";
import SettingSidebar from "./SettingSidebar";

export default function Settings() {
  return (
    <div className="max-h-[90dvh] w-full sm:ml-5 mt-10 flex-1 sm:flex  overflow-y-auto">
      
      {/* LEFT SETTINGS MENU (NO SCROLL) */}
      <aside className=" max-h-[60dvh] w-[300px] sm:pl-6 mb-5 sm:mb-0 shrink-0">
        <SettingSidebar />
      </aside>

      {/* RIGHT CONTENT AREA */}
      <main className="flex-1 overflow-hidden">
        
        {/* ONLY THIS SCROLLS */}
        <div className="max-h-[100dvh] overflow-y-auto ">
          <Outlet />
        </div>

      </main>
    </div>
  );
}
