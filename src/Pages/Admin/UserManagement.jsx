import React, { useMemo, useState, useEffect } from "react";
import {

  Mail,
  Phone,
  MapPin,
  X,

} from "lucide-react";
import Filter from "../../assets/filter.png"
import Sort from "../../assets/sort.png"
import Client from "../../assets/client.png"
import Location from "../../assets/location.png"


const TABS = [
  { key: "clients", label: "Clients" },
  { key: "lawyers", label: "Lawyers" },
  { key: "requests", label: "New Requests" },
];

const skills = [
  "Skill 123",
  "3456789",
  "Skill 123",
  "Good to work",
  "Skill 123",
  "Skill 123",
  "Skill 123",
];

const CLIENTS = [
  {
    id: "1234567",
    name: "Ali Marsad",
    email: "123@gmail.com",
    phone: "+923456789232",
    country: "Pakistan",
    status: "Active",
    date: "12-12-2024",
    stats: { posted: 23, active: 1, completed: 22 },
  },
  {
    id: "1234568",
    name: "Ahmed Raza",
    email: "ahmed@gmail.com",
    phone: "+923001112233",
    country: "Pakistan",
    status: "Active",
    date: "10-12-2024",
    stats: { posted: 15, active: 2, completed: 13 },
  },
  {
    id: "1234569",
    name: "Hassan Ali",
    email: "hassan@gmail.com",
    phone: "+923211234567",
    country: "Pakistan",
    status: "Active",
    date: "08-12-2024",
    stats: { posted: 9, active: 1, completed: 8 },
  },
];

const LAWYERS = [
  {
    id: "2234567",
    name: "Sara Khan",
    email: "sara@gmail.com",
    phone: "+923401234567",
    country: "Pakistan",
    status: "Active",
    date: "12-12-2024",
    stats: { posted: 0, active: 6, completed: 48 },
  },
  {
    id: "2234568",
    name: "Umar Farooq",
    email: "umar@gmail.com",
    phone: "+923221112233",
    country: "Pakistan",
    status: "Active",
    date: "11-12-2024",
    stats: { posted: 0, active: 3, completed: 21 },
  },
  {
    id: "2234569",
    name: "Ayesha Noor",
    email: "ayesha@gmail.com",
    phone: "+923331234567",
    country: "Pakistan",
    status: "Active",
    date: "09-12-2024",
    stats: { posted: 0, active: 2, completed: 12 },
  },
];

const REQUESTS = [
  {
    id: "3234567",
    name: "New User",
    email: "newuser@gmail.com",
    phone: "+923451231231",
    country: "Pakistan",
    date: "12-12-2024",
    stats: { posted: 0, active: 0, completed: 0 },
  },
  {
    id: "3234568",
    name: "New User 2",
    email: "newuser2@gmail.com",
    phone: "+923451231232",
    country: "Pakistan",
    date: "11-12-2024",
    stats: { posted: 0, active: 0, completed: 0 },
  },
  {
    id: "3234569",
    name: "New User 3",
    email: "newuser3@gmail.com",
    phone: "+923451231233",
    country: "Pakistan",
    date: "10-12-2024",
    stats: { posted: 0, active: 0, completed: 0 },
  },
];

const cx = (...classes) => classes.filter(Boolean).join(" ");

function StatusBadge({ status = "Active" }) {
  const isActive = String(status).toLowerCase() === "active";
  return (
    <span
      className={cx(
        "inline-flex items-center justify-center px-4 h-[34px] sm:h-[40px] rounded-md text-[13px] sm:text-[14px] font-medium",
        isActive ? "bg-[#DFF5DE] text-[#2CCF3B]" : "bg-[#FDE2E2] text-[#EF4444]"
      )}
    >
      {status}
    </span>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "h-[44px] sm:h-[48px] px-5 sm:px-8 rounded-t-md cursor-pointer text-[14px] sm:text-[15px] font-semibold whitespace-nowrap",
        active
          ? "bg-[#F3F4F6] text-[#3E4A4E]"
          : "text-[#3E4A4E] hover:bg-[#F7F7F8]"
      )}
    >
      {children}
    </button>
  );
}

function HeaderAction({ icon: Icon, label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center cursor-pointer gap-2 text-[13px] sm:text-[14px] font-medium text-[#556064] hover:text-[#2F383B]"
    >
      <img src={Icon} alt="icon" className="h-5 w-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function StatRow({ label, value }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="text-[13px] sm:text-[14px] text-[#6B7A7E]">{label}</div>
      <div className="mt-1 text-[16px] sm:text-[18px] font-semibold text-[#2E3A3D]">
        {value}
      </div>
    </div>
  );
}

/** Simple media query hook (no deps) */
function useMediaQuery(query) {
  const getMatches = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);
    listener();

    if (media.addEventListener) media.addEventListener("change", listener);
    else media.addListener(listener);

    return () => {
      if (media.removeEventListener) media.removeEventListener("change", listener);
      else media.removeListener(listener);
    };
  }, [query]);

  return matches;
}

export default function UserManagementPage() {
  const [tab, setTab] = useState("clients");
  const [selected, setSelected] = useState(null);


  const isDesktopWide = useMediaQuery("(min-width: 1280px)");

  const data = useMemo(() => {
    if (tab === "clients") return CLIENTS;
    if (tab === "lawyers") return LAWYERS;
    return REQUESTS;
  }, [tab]);

  const isRequests = tab === "requests";
  const showDetail = Boolean(selected);

  const onChangeTab = (next) => {
    setTab(next);
    setSelected(null);
  };

  
  const gridCols = isRequests
    ? "grid-cols-[110px_220px_260px_160px_280px]"
    : "grid-cols-[110px_220px_260px_140px_160px_170px]";

  const tableMinW = isRequests ? "min-w-[1430px]" : "min-w-[1400px]";


  const hideRequestActionsOnLeft = isRequests && showDetail;

  return (
<div className="min-h-screen bg-white">
  {/* Top title */}
  <div className="px-4 sm:px-10 pt-6 sm:pt-8">
    <h1 className="text-[22px] sm:text-[28px] font-semibold text-[#111827]">
      User Management
    </h1>
  </div>

  {/* Content */}
  <div className="px-4 sm:px-10 mt-4 sm:mt-6 pb-6">
    {/* Tabs + Actions */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Desktop tabs */}
      <div className="hidden sm:flex items-end gap-4">
        <div className="bg-white rounded-md overflow-hidden border border-transparent">
          <div className="flex">
            {TABS.map((t) => (
              <TabButton
                key={t.key}
                active={tab === t.key}
                onClick={() => onChangeTab(t.key)}
              >
                {t.label}
              </TabButton>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile tabs select */}
      <div className="sm:hidden">
        <label className="text-[13px] text-[#6B7280] mb-2 block">
          Select Tab
        </label>
        <div className="relative">
          <select
            value={tab}
            onChange={(e) => onChangeTab(e.target.value)}
            className="w-full h-[46px] rounded-md border border-[#E5E7EB] bg-white px-4 pr-10 text-[14px] font-medium text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#DFA458]/30"
          >
            {TABS.map((t) => (
              <option key={t.key} value={t.key}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Actions (wrap on small screens) */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-6 justify-start sm:justify-end">
        <HeaderAction icon={Filter} label="Filter" />
        <HeaderAction icon={Sort} label="Sort By" />
      </div>
    </div>

    {/* ✅ Responsive split area */}
    <div
      className={cx(
        " grid gap-4 sm:gap-6",
        showDetail && isDesktopWide
          ? "xl:grid-cols-[minmax(0,1fr)_520px]"
          : "grid-cols-1"
      )}
    >
      {/* LEFT TABLE */}
      <div className="rounded-md bg-white border border-[#F1F2F3] overflow-hidden">
        {/* Whole-table horizontal scroll */}
        <div className="overflow-x-auto">
          {/* min width ensures columns don’t crush on small screens */}
          <div className={cx("min-w-[980px] w-full", tableMinW)}>
            {/* Header */}
            <div className="bg-[#F3F4F6]">
              <div
                className={cx(
                  // use grid so columns align perfectly
                  "flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5 text-[14px] sm:text-[15px] font-semibold text-[#465457]",
                  gridCols // your existing grid template classes
                )}
              >
                <div>ID</div>
                <div>Name</div>
                <div>Email</div>

                {isRequests ? (
                  <>
                    <div>Date</div>
                    <div className="text-right">Actions</div>
                  </>
                ) : (
                  <>
                    <div>Status</div>
                    <div>Joining Date</div>
                    <div className="text-right">Actions</div>
                  </>
                )}
              </div>
            </div>

            {/* Body (ONLY this scrolls vertically) */}
            <div className="divide-y divide-[#E5E7EB] max-h-[62vh] sm:max-h-[66vh] overflow-y-auto">
              {data.map((row, idx) => {
                const activeRow = selected?.id === row.id;

                return (
                  <div
                    key={`${row.id}-${idx}`}
                    className={cx(
                      "flex justify-between items-center px-4 sm:px-6 py-4 sm:py-5",
                      gridCols,
                      activeRow ? "bg-[#FBF6EC]" : "bg-white"
                    )}
                  >
                    <div className="text-[14px] sm:text-[15px] text-[#364346]">
                      {row.id}
                    </div>

                    <div className="text-[14px] sm:text-[15px] text-[#364346]">
                      {row.name}
                    </div>

                    <div className="text-[14px] sm:text-[15px] text-[#364346]">
                      {row.email}
                    </div>

                    {isRequests ? (
                      <>
                        <div className="text-[14px] sm:text-[15px] text-[#364346]">
                          {row.date}
                        </div>

                        <div className="flex items-center gap-2 flex-wrap justify-end">
                          <button
                            type="button"
                            onClick={() => setSelected({ ...row, _type: tab })}
                            className="h-[34px] px-4 rounded-md cursor-pointer border border-[#DFA458] text-[#566164] text-[13px] font-medium hover:bg-[#fdfaf4] transition"
                          >
                            Details
                          </button>

                          {!hideRequestActionsOnLeft && (
                            <>
                              <button
                                type="button"
                                className="h-[34px] px-4 rounded-md cursor-pointer bg-[#E8C284] text-[#414749] text-[13px] font-semibold hover:opacity-95 transition"
                              >
                                Approved
                              </button>

                              <button
                                type="button"
                                className="h-[34px] px-4 rounded-md cursor-pointer bg-[#FF3B30] text-white text-[13px] font-semibold hover:opacity-95 transition"
                              >
                                Decline
                              </button>
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="text-[13px] sm:text-[14px] font-medium text-[#2CCF3B]">
                          {row.status}
                        </div>

                        <div className="text-[14px] sm:text-[15px] text-[#364346]">
                          {row.date}
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => setSelected({ ...row, _type: tab })}
                            className="h-[34px] px-4 rounded-md cursor-pointer border border-[#DFA458] text-[#566164] text-[13px] font-medium hover:bg-[#fdfaf4] transition"
                          >
                            Details
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT DETAIL (Desktop only) */}
      {showDetail && isDesktopWide && (
        <div className="rounded-md bg-[#F7F7F8] border border-[#F1F2F3] overflow-hidden">
          {/* Only this panel scrolls */}
          <div className="p-4 sm:p-6 max-h-[66vh] xl:max-h-[72vh] overflow-y-auto">
            <DetailPanel selected={selected} onClose={() => setSelected(null)} />
          </div>
        </div>
      )}
    </div>
  </div>

  {/* MOBILE DETAIL OVERLAY */}
  {showDetail && !isDesktopWide && (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/30"
        onClick={() => setSelected(null)}
      />
      <div className="absolute left-0 right-0 bottom-0 max-h-[88vh] rounded-t-2xl bg-[#F7F7F8] shadow-xl overflow-hidden">
        <div className="p-4 overflow-y-auto max-h-[88vh]">
          <DetailPanel selected={selected} onClose={() => setSelected(null)} />
        </div>
      </div>
    </div>
  )}
</div>

  );
}

function DetailPanel({ selected, onClose }) {
  return (
    <>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="h-10 w-10 rounded-md cursor-pointer hover:bg-black/5 flex items-center justify-center"
          aria-label="Close detail"
        >
          <X size={18} className="text-[#6B7A7E]" />
        </button>
      </div>

      <div className="rounded-md bg-white p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-[#111827] overflow-hidden flex items-center justify-center text-white font-semibold">
              <img src={Client} alt="icon" />
            </div>

            <div className="min-w-0">
              <div className="text-[16px] sm:text-[18px] font-semibold text-[#2E3A3D]">
                {selected?.name}{" "}
                <span className="font-medium text-[#6B7A7E]">
                  ({selected?.id})
                </span>
              </div>

              <div className="mt-1 flex items-center gap-2 text-[#6B7A7E]">
                <img src={Location} alt="icon" className="h-5 w-5" />
                <span className="text-[13px] sm:text-[14px]">
                  {selected?.country || "Pakistan"}
                </span>
              </div>
            </div>
          </div>

          {selected?._type !== "requests" && (
            <StatusBadge status={selected?.status || "Active"} />
          )}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-md bg-white p-5">
          <div className="flex items-center gap-3 text-[#6B7A7E]">
            <Mail size={18} />
            <span className="text-[14px] sm:text-[15px] text-[#3E4A4E] break-all">
              {selected?.email}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-3 text-[#6B7A7E]">
            <Phone size={18} />
            <span className="text-[14px] sm:text-[15px] text-[#3E4A4E]">
              {selected?.phone}
            </span>
          </div>
        </div>

        <div className="rounded-md bg-[#F3E0B8] p-5">
          <div className="text-[13px] sm:text-[14px] font-medium text-[#6B5A2C]">
            {selected?._type === "requests" ? "Date" : "Joining Date"}
          </div>
          <div className="mt-2 text-[16px] sm:text-[18px] font-semibold text-[#2E3A3D]">
            {selected?.date}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <StatRow
            label="Case posted"
            value={String(selected?.stats?.posted ?? 0).padStart(2, "0")}
          />
          <StatRow
            label="Active Cases"
            value={String(selected?.stats?.active ?? 0).padStart(2, "0")}
          />
          <StatRow
            label="Completed Cases"
            value={String(selected?.stats?.completed ?? 0).padStart(2, "0")}
          />
        </div>
      </div>

      <div className="mt-5">
        {selected?._type !== "clients" ? (
          <div className="space-y-6">
            <div className="bg-white rounded-md p-6">
              <h3 className="text-[14px] sm:text-[15px] font-medium text-[#6B7280] mb-4">
                Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-lg bg-[#F3F4F6] text-[13px] sm:text-[14px] text-[#374151]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-md p-6">
              <h3 className="text-[14px] sm:text-[15px] font-medium text-[#6B7280] mb-4">
                Documents Uploaded
              </h3>

              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#F3F4F6] flex items-center justify-center">
                      <img
                        src="https://via.placeholder.com/48"
                        alt="doc"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <p className="text-[13px] sm:text-[14px] font-medium text-[#111827]">
                        File Name
                      </p>
                      <p className="text-[12px] sm:text-[13px] text-[#6B7280]">
                        File Type, Jpeg, PDF
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
        {selected?._type === "requests" ? (
          <>
            <button
              type="button"
              className="h-[42px] w-full sm:min-w-[120px] cursor-pointer rounded-md bg-[#16A34A] text-white text-[14px] font-semibold hover:opacity-95"
            >
              Approved
            </button>
            <button
              type="button"
              className="h-[42px] w-full sm:min-w-[120px] cursor-pointer rounded-md bg-[#F97316] text-white text-[14px] font-semibold hover:opacity-95"
            >
              Decline
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="h-[42px] w-full sm:min-w-[120px] cursor-pointer rounded-md bg-[#FF3B30] text-white text-[14px] font-semibold hover:opacity-95"
            >
              Ban
            </button>
            <button
              type="button"
              className="h-[42px] w-full sm:min-w-[120px] cursor-pointer rounded-md bg-[#FF9500] text-white text-[14px] font-semibold hover:opacity-95"
            >
              Suspend
            </button>
          </>
        )}
      </div>
    </>
  );
}
