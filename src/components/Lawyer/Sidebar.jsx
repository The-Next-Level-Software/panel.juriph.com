import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import Client from "../../assets/Client.png";
import AvailableCase from "../../assets/available-case.png";
import Case from "../../assets/cases.svg";
import Payment from "../../assets/payment.svg";
import Message from "../../assets/message.svg";
import Settings from "../../assets/setting.svg";
import Bids1 from "../../assets/big1.png";
import AvailableCase1 from "../../assets/available-case-1.png";
import Case1 from "../../assets/cases1.png";
import Payment1 from "../../assets/payment1.png";
import Message1 from "../../assets/message1.png";

import Settings1 from "../../assets/setting1.png";
import Bids from "../../assets/bid.png";

import logout from "../../assets/logout.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {

  const navigate =useNavigate()

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
          // Always fixed so it sits under the fixed topbar
          "fixed left-0 mt-1 md:mt-4 md:ml-5 z-50 bg-white",
          "top-16 bottom-0", // under Topbar (h-16)

          // Width
          "w-[280px] sm:w-[330px]",

          // Desktop: always visible
          "sm:translate-x-0",

          // Mobile: slide drawer
          "transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="h-full pb-6 flex flex-col overflow-hidden">
          {/* Profile */}
          <div className="bg-[#FCF8F0] rounded-xl p-6 shrink-0 mx-3 mt-6">
            <div className=" items-center gap-3">
              <div className="relative h-20 w-20">
                {/* Border ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#ef4444 0deg 90deg, transparent 90deg 360deg)",
                  }}
                />

                {/* Inner image */}
                <div className="absolute inset-[3px] rounded-full overflow-hidden bg-white">
                  <img
                    src={Client}
                    alt="Client Avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* On desktop always show text, on mobile only show when open */}
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
                <p className="text-[#454545] ">Tag line Goes here</p>
                <button
                onClick={()=>{
                  navigate("profile") 
                }}
                 className="text-sm underline cursor-pointer mt-1 text-[#D88B37]">
                  Complete Profile
                </button>
              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="bg-[#FCF8F0] rounded-xl p-3 mx-3 mt-6 flex-1 overflow-hidden">
            <nav className="flex flex-col gap-1 h-full overflow-y-auto pr-1">
              <SidebarLink
                to="available-cases"
                icon={AvailableCase}
                activeicon={AvailableCase1}
                label="Available Cases"
                onClose={onClose}
              />
              <SidebarLink
                to="active-cases"
                icon={Case}
                activeicon={Case1}
                label="Active Cases"
                onClose={onClose}
              />
              <SidebarLink
                to="my-bids"
                icon={Bids}
                activeicon={Bids1}
                label="My Bids"
                onClose={onClose}
              />
              <SidebarLink
                to="payments"
                icon={Payment}
                activeicon={Payment1}
                label="Payments"
                onClose={onClose}
              />
              <SidebarLink
                to="messages"
                icon={Message}
                activeicon={Message1}
                label="Messages"
                onClose={onClose}
              />
              
              <SidebarLink
                to="settings"
                icon={Settings}
                activeicon={Settings1}
                label="Settings"
                onClose={onClose}
              />
              {/* Logout */}
              <div className="mt-auto pt-3">
                <SidebarLink
                  to="/sign-in"
                  icon={logout}
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

function SidebarLink({ to, icon, label, danger, onClose, activeicon }) {
  return (
    <NavLink
      to={to}
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
