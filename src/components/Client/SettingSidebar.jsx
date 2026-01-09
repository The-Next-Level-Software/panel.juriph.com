import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "profile", label: "Profile Settings" },
  { to: "account", label: "Account Settings" },
  { to: "notifications", label: "Notification Preferences" },
  { to: "payment-method", label: "Payment Methods" },
  { to: "security", label: "Privacy & Security" },
];

export default function SettingsSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ default tab
  const [activeTab, setActiveTab] = useState("profile");

  /* 🔁 Sync with URL (and fallback to profile) */
  useEffect(() => {
    const current = links.find((l) =>
      location.pathname.endsWith(l.to)
    );

    if (current) {
      setActiveTab(current.to);
    } else {
      // 👈 when user opens /settings directly
      navigate("profile", { replace: true });
      setActiveTab("profile");
    }
  }, [location.pathname, navigate]);

  return (
    <>
      {/* ---------- MOBILE DROPDOWN ---------- */}
      <div className="md:hidden w-full px-4 mt-4">
        <select
          value={activeTab}
          onChange={(e) => {
            setActiveTab(e.target.value);
            navigate(e.target.value);
          }}
          className="
            w-full h-[48px] rounded-md border border-[#E5E7EB]
            bg-white px-4 text-[15px] font-medium text-[#6B7280]
            focus:outline-none focus:ring-2 focus:ring-[#DFA458]/40
          "
        >
          {links.map((item) => (
            <option key={item.to} value={item.to}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {/* ---------- DESKTOP SIDEBAR ---------- */}
      <aside className="hidden md:block w-[260px] mt-4 bg-white p-3">
        <nav className="flex flex-col gap-1">
          {links.map((item) => {
            const isActive = activeTab === item.to;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setActiveTab(item.to)}
                className={[
                  "px-4 py-3 rounded-md font-medium transition-all",
                  isActive
                    ? "bg-[#F3F3F3] text-[#6B7280]"
                    : "text-[#6B7280] hover:bg-[#F5F5F5]",
                ].join(" ")}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
