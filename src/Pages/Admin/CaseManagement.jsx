import React, { useMemo, useState } from "react";
import {
  

  X,
  MapPin,
  UserRound,
} from "lucide-react";
import Client from "../../assets/client.png"
import Location from "../../assets/location.png"
import Filter from "../../assets/filter.png"
import Sort from "../../assets/sort.png"


const DATA = [
  {
    id: "1234567",
    title: "Title Goes here",
    description: "Description goes here...........",
    status: "Active", 
    statusTable: "Open", 
    client: {
      name: "Ali Marsad",
      country: "Pakistan",
      avatar:
       Client,
    },
    lawyer: {
      name: "Ali Marsad",
      country: "Pakistan",
      avatar:
        Client,
    },
    datePosted: "12-12-2024",
    category: "Corporate",
    bidsReceived: 23,
    messagesSent: "01",
    dispute: {
      title: "dispute tittle here",
      description: "Description",
    },
  },
  {
    id: "1234568",
    title: "Title Goes here",
    description: "Description goes here...........",
    status: "Active",
    statusTable: "In progress",
    client: { name: "Name", country: "Pakistan", avatar: "" },
    lawyer: { name: "Name", country: "Pakistan", avatar: "" },
    datePosted: "12-12-2024",
    category: "Corporate",
    bidsReceived: 23,
    messagesSent: "01",
    dispute: {
      title: "dispute tittle here",
      description: "Description",
    },
  },
];

function StatusText({ value }) {
  const cls =
    value === "Open"
      ? "text-[#22C55E]"
      : value === "Disputed"
        ? "text-[#FF2D2D]"
        : value === "In progress"
          ? "text-[#F59E0B]"
          : "text-[#94A3B8]";
  return <span className={["font-medium", cls].join(" ")}>{value}</span>;
}

function Avatar({ src, name }) {
  return (
    <div className="h-11 w-11 rounded-full overflow-hidden bg-[#E2E8F0] flex items-center justify-center shrink-0">
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <UserRound className="h-5 w-5 text-[#64748B]" />
      )}
    </div>
  );
}

function PersonBlock({ label, person }) {
  return (
    <div className="space-y-3">
      <div className="text-[14px] text-[#64748B]">{label}</div>
      <div className="flex items-center gap-3">
        <Avatar src={person?.avatar} name={person?.name} />
        <div className="min-w-0">
          <div className="text-[16px] font-medium text-[#0F172A] truncate">
            {person?.name || "-"}
          </div>
          <div className="mt-1 flex items-center gap-2 text-[14px] text-[#64748B]">
            <img src={Location} alt="icon" className="h-5 w-5" />
            <span className="truncate">{person?.country || "-"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white px-4 py-4">
      <div className="text-[13px] text-[#64748B]">{title}</div>
      <div className="mt-2 text-[16px] font-semibold text-[#0F172A]">
        {value}
      </div>
    </div>
  );
}

function DisputeBox({ dispute }) {
  return (
    <div className="rounded-xl border border-[#FF2D2D] bg-white px-5 py-4">
      <div className="text-[13px] text-[#64748B]">Dispute(if any)</div>
      <div className="mt-2 text-[16px] font-semibold text-[#0F172A]">
        {dispute?.title || "-"}
      </div>
      <div className="mt-2 text-[14px] text-[#64748B]">
        {dispute?.description || "-"}
      </div>
    </div>
  );
}

function StatsBar({ bidsReceived, messagesSent }) {
  return (
    <div className="rounded-xl bg-[#F8EED7] px-6 py-5">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-[13px] text-[#64748B]">Bids Received</div>
          <div className="mt-2 text-[18px] font-semibold text-[#0F172A]">
            {String(bidsReceived ?? 0)}
          </div>
        </div>
        <div>
          <div className="text-[13px] text-[#64748B]">Messages sent</div>
          <div className="mt-2 text-[18px] font-semibold text-[#0F172A]">
            {messagesSent ?? "00"}
          </div>
        </div>
      </div>
    </div>
  );
}

function RightDetailPanel({ data, onClose }) {
  if (!data) return null;

  return (
<div className="lg:sticky lg:top-6 lg:h-[calc(100vh-140px)]">
  <div className="h-full rounded-xl bg-[#F5F6F6] shadow-sm overflow-hidden">
    {/* Scroll area */}
    <div
      className="
        lg:h-full lg:overflow-y-auto
        px-4 py-4 sm:px-6 sm:py-6
      "
    >
      {/* Top: id + status pill */}
      <div className="flex items-start justify-between gap-3">
        <div className="text-[14px] sm:text-[16px] text-[#64748B]">
          ({data.id})
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-2 sm:px-4 rounded-md bg-[#DDF5E5] text-[#1E9B54] text-[12px] sm:text-[14px] font-medium">
            {data.status || "Active"}
          </span>

          <button
            type="button"
            onClick={onClose}
            className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] flex items-center justify-center cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-4 w-4 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Title + description */}
      <div className="mt-3 text-[18px] sm:text-[20px] font-semibold text-[#0F172A]">
        {data.title}
      </div>
      <div className="mt-2 text-[13px] sm:text-[14px] text-[#64748B] leading-6">
        {data.description}
      </div>

      {/* People */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <PersonBlock label="Client" person={data.client} />
        <PersonBlock label="Assigned Lawyer" person={data.lawyer} />
      </div>

      {/* Middle layout: left stacked + dispute box */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        <div className="space-y-4">
          <SmallCard title="Date Posted" value={data.datePosted} />
          <SmallCard title="Category" value={data.category} />
        </div>

        <DisputeBox dispute={data.dispute} />
      </div>

      {/* Stats beige bar */}
      <div className="mt-5 sm:mt-6">
        <StatsBar
          bidsReceived={data.bidsReceived}
          messagesSent={data.messagesSent}
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <button
          type="button"
          className="h-[42px] sm:h-[40px] w-full px-4 sm:px-6 rounded-md bg-[#D4822B] text-white text-[13px] font-medium cursor-pointer hover:opacity-95 transition"
        >
          Assign/Reassign Lawyer
        </button>

        <button
          type="button"
          className="h-[42px] sm:h-[40px] w-full px-4 sm:px-6 rounded-md bg-[#FF2D2D] text-white text-[13px] font-medium cursor-pointer hover:opacity-95 transition"
        >
          Resolve Dispute
        </button>

        <button
          type="button"
          className="h-[42px] sm:h-[40px] w-full px-4 sm:px-6 rounded-md bg-[#FF8A00] text-white text-[13px] font-medium cursor-pointer hover:opacity-95 transition"
        >
          Mark as Closed
        </button>
      </div>

      <div className="h-2" />
    </div>
  </div>
</div>

  );
}

export default function CaseManagementPage() {
  const [rows] = useState(DATA);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const activeCase = useMemo(
    () => rows.find((r) => r.id === activeId) || null,
    [rows, activeId]
  );

  const openDetails = (row) => {
    setActiveId(row.id);
    setOpen(true);
  };

  const closeDetails = () => {
    setOpen(false);
    setActiveId(null);
  };

  return (
    <div className="max-w-[1520px] mx-auto bg-white">
      {/* HEADER */}
<div className="flex flex-col gap-4 px-4 pt-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-6">
  {/* Title */}
  <h1 className="text-[20px] sm:text-[26px] font-semibold text-[#0F172A]">
    Case Management
  </h1>

  {/* Actions */}
  <div className="flex items-center gap-3 sm:gap-6">
    <button
      type="button"
      className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#334155] transition"
    >
      <img src={Filter} alt="Filter" className="h-4 w-4" />
      <span className="text-[13px] sm:text-[14px] font-medium">
        Filter
      </span>
    </button>

    <button
      type="button"
      className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#334155] transition"
    >
      <img src={Sort} alt="Sort" className="h-4 w-4" />
      <span className="text-[13px] sm:text-[14px] font-medium">
        Sort By
      </span>
    </button>
  </div>
</div>

      {/* CONTENT */}
      <div className="px-2 sm:px-6 pb-10 pt-4">
        <div className="flex gap-4">
          {/* LEFT: TABLE */}
          <div
            className={[
              "min-w-0 transition-all duration-200",
              open ? "w-full lg:w-[68%]" : "w-full",
            ].join(" ")}
          >
            <div className="overflow-x-auto">
              <div className="min-w-[1100px]">
                <div className="grid grid-cols-7 bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 sm:px-6 py-4 text-[13px] font-medium text-[#64748B]">
                  <div>ID</div>
                  <div>Title</div>
                  <div>Status</div>
                  <div>Client Name</div>
                  <div>Assigned Lawyer</div>
                  <div>Date posted</div>
                  <div className="text-right"> </div>
                </div>

                <div className="divide-y divide-[#E2E8F0]">
                  {rows.map((row, i) => (
                    <div
                      key={`${row.id}-${i}`}
                      className="grid grid-cols-7 px-4 sm:px-6 py-5 text-[14px] text-[#334155] items-center"
                    >
                      <div>{row.id}</div>
                      <div>{row.title}</div>
                      <div>
                        <StatusText value={row.statusTable || "Open"} />
                      </div>
                      <div>{row.client?.name || "Name"}</div>
                      <div>{row.lawyer?.name || "Name"}</div>
                      <div>{row.datePosted}</div>

                      <div className="text-right">
                        <button
                          type="button"
                          onClick={() => openDetails(row)}
                          className="h-[36px] px-5 rounded-md border border-[#DFA458] text-[#64748B] bg-white hover:bg-[#FFF7ED] transition cursor-pointer text-[14px] font-medium"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-2" />
              </div>
            </div>
          </div>

          {/* RIGHT: PANEL (Desktop) */}
          <div
            className={[
              "hidden lg:block transition-all duration-200",
              open ? "w-[32%]" : "w-0 overflow-hidden",
            ].join(" ")}
          >
            {open && (
              <RightDetailPanel data={activeCase} onClose={closeDetails} />
            )}
          </div>
        </div>

{/* MOBILE: Right panel as overlay */}
{open && (
  <div className="lg:hidden fixed inset-0 z-50">
    {/* Backdrop */}
    <div
      onClick={closeDetails}
      className="absolute inset-0 bg-black/40"
    />

    {/* Slide Panel */}
    <div
      className="
        absolute right-0 top-0
        h-[100dvh]
        w-[100%] max-w-[520px]
        bg-white
        shadow-2xl
        transform transition-transform duration-300
        animate-slide-in
        flex flex-col
      "
    >
     

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <RightDetailPanel
          data={activeCase}
          onClose={closeDetails}
        />
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
