import React from "react";
import { NavLink } from "react-router-dom";

import Client from "../../assets/client.png";

import Dashboard from "../../assets/dashboard.png";
import Dashboard1 from "../../assets/dashboard1.png";

import Blog from "../../assets/todo-line.png";
import Blog1 from "../../assets/blog1.png";

import User from "../../assets/user.png";
import User1 from "../../assets/user1.png";

import Payment from "../../assets/payment.svg";
import Payment1 from "../../assets/payment1.png";

import Message from "../../assets/message.svg";
import Message1 from "../../assets/message1.png";

import Bids from "../../assets/bid.png";
import Bids1 from "../../assets/big1.png";

import logout from "../../assets/logout.png";

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* BACKDROP (mobile only) */}
      <div
        onClick={onClose}
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* SIDEBAR */}
      <aside
        className={[
          "fixed left-0 mt-1 md:mt-4 md:ml-5 z-50 bg-white",
          "top-16 bottom-0",
          "w-[280px] sm:w-[330px]",
          "sm:translate-x-0",
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="h-full pb-6 flex flex-col overflow-hidden">
          {/* Profile */}
          <div className="bg-[#FCF8F0] rounded-xl p-6 shrink-0 mx-3 mt-6">
            <div className="items-center gap-3">
              <div className="relative h-20 w-20">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#ef4444 0deg 90deg, transparent 90deg 360deg)",
                  }}
                />
                <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white">
                  <img
                    src={Client}
                    alt="Client Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div
                className={[
                  "min-w-0",
                  isOpen ? "block" : "hidden",
                  "sm:block",
                ].join(" ")}
              >
                <h1 className="text-lg mt-4 font-medium text-[#454545] truncate">
                  Name Goes here
                </h1>
                <p className="text-[#454545]">Tag line Goes here</p>
                <h2 className="text-sm underline cursor-pointer mt-1 text-[#D88B37]">
                  Complete Profile
                </h2>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-[#FCF8F0] rounded-xl p-3 mx-3 mt-6 flex-1 overflow-hidden">
            <nav className="flex flex-col gap-1 h-full overflow-y-auto pr-1">
              {/* ✅ If Sidebar is inside /admin-dashboard Layout, use relative paths */}
              <SidebarLink
                to="." // index route of /admin-dashboard
                icon={Dashboard}
                activeicon={Dashboard1}
                label="Dashboard"
                onClose={onClose}
                end
              />

              <SidebarLink
                to="user-management"
                icon={User}
                activeicon={User1}
                label="User Management"
                onClose={onClose}
              />

              <SidebarLink
                to="case-management" // ✅ fixed casing to match route
                icon={Bids}
                activeicon={Bids1}
                label="Case Management"
                onClose={onClose}
              />

              <SidebarLink
                to="financial-overview"
                icon={Payment}
                activeicon={Payment1}
                label="Financial Overview"
                onClose={onClose}
              />

              <SidebarLink
                to="dispute-resolution"
                icon={Message}
                activeicon={Message1}
                label="Dispute Resolution"
                onClose={onClose}
              />

              <SidebarLink
                to="blog-management"
                icon={Blog}
                activeicon={Blog1}
                label="Blog Management"
                onClose={onClose}
              />

              {/* Logout */}
              <div className="mt-auto pt-3">
                <SidebarLink
                  to="/sign-in"
                  icon={logout}
                  activeicon={logout}
                  label="Logout"
                  danger
                  onClose={onClose}
                />
              </div>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------------- helper component ---------------- */

function SidebarLink({ to, icon, activeicon, label, danger, onClose, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={() => {
        if (window.innerWidth < 640) onClose?.();
      }}
      className={({ isActive }) =>
        [
          "relative z-10 flex items-center gap-3 px-4 py-3 rounded-lg",
          "text-[16px] font-[600] transition-colors duration-300",
          isActive ? "bg-[#DFA458] text-white" : "text-[#657475]",
          danger ? "hover:bg-red-500/15 hover:text-red-500" : "",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? activeicon : icon}
            alt={label}
            className="h-5 w-5 shrink-0"
          />
          <span className="whitespace-nowrap text-[15px]">{label}</span>
        </>
      )}
    </NavLink>
  );
}
