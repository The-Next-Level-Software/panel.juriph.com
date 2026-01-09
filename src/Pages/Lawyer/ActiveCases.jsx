import React, { useMemo, useState } from "react";
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import Client from "../../assets/Client.png";
import { useNavigate } from "react-router-dom";
import Filter from "../../assets/filter.png";
import Sort from "../../assets/sort.png";

export default function ActiveCases() {
  const [sortBy, setSortBy] = useState("Newest");

  const cases = useMemo(
    () => [
      {
        id: 1,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
        status: "Active",
        statusType: "active",
        ClientName: "Client Name",
        ClientTag: "Tagline Or Summary",
        fee: 300,
        escrow: true,
        startedDate: "3 Days 12 Hr",
        deadline: "12-12-2024",
      },
      {
        id: 2,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
        status: "waiting for\nfeedback",
        statusType: "active",
        ClientName: "Client Name",
        ClientTag: "Tagline Or Summary",
        fee: 300,
        escrow: true,
        startedDate: "3 Days 12 Hr",
        deadline: "12-12-2024",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen mt-4 py-3 sm:px-5 bg-white">
      <div className="mx-auto w-full  px-2 sm:px-4 py-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Title */}
          <h1 className="px-5 text-[22px] font-medium text-[#1E1E1E] sm:px-0 sm:text-[25px]">
            Active Cases
          </h1>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 px-5 sm:px-0 sm:gap-6">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 text-[#6B6B6B] transition hover:text-[#1E1E1E]"
            >
              <img src={Filter} alt="Filter" className="h-5 w-5 shrink-0" />
              <span className="text-[14px] font-[500] whitespace-nowrap">
                Filter
              </span>
            </button>

            <div className="relative">
              <button
                type="button"
                className="inline-flex cursor-pointer items-center gap-2 text-[#6B6B6B] transition hover:text-[#1E1E1E]"
              >
                <img src={Sort} alt="Sort" className="h-5 w-5 shrink-0" />
                <span className="text-[14px] font-[500] whitespace-nowrap">
                  Sort By
                </span>
              </button>

              {/* click-through select */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="absolute inset-0 w-full cursor-pointer opacity-0"
                aria-label="Sort By"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Deadline">Deadline</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-1">
          {cases.map((c) => (
            <CaseCard key={c.id} data={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function CaseCard({ data }) {
  const isWaiting = data.statusType === "waiting";
  const navigate = useNavigate();

  return (
    <div className="rounded-xl  p-4 sm:p-5">
      <div className="rounded-xl bg-[#F4F4F4] p-5 sm:p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="text-[18px] sm:text-[20px] font-medium text-[#414749]">
              {data.title}
            </h2>
            <p className="mt-2 text-[13px] sm:text-[14px] leading-6 text-[#6D6D6D] max-w-[520px]">
              {data.desc}
            </p>
          </div>

          {/* Status */}
          <div className="shrink-0 flex flex-col items-center justify-center gap-2 pt-1">
            {isWaiting ? <ClockCircleIcon /> : <RefreshCircleIcon />}
            <span className="text-[12px] font-[600] text-[#6D6D6D] text-center whitespace-pre-line">
              {data.status}
            </span>
          </div>
        </div>

        {/* Client */}
        <div className="mt-7">
          <p className="text-[11px] text-[#8B8B8B] mb-2">Client</p>

          <div className="flex items-center gap-3">
            <img
              src={Client}
              alt="Lawyer"
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-[15px]  text-[#414749]">{data.ClientName}</p>
              <p className="text-[12px] text-[#8B8B8B] mt-1">
                {data.ClientTag}
              </p>
            </div>
          </div>
        </div>

        {/* Info strip */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Proposed Fee */}
          <div className="rounded-lg bg-[#E3A853] px-4 py-3 text-white">
            <p className="text-[14px]  opacity-95">Held In Escrow</p>

            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-[20px] ">${data.fee}</span>
            </div>
          </div>

          {/* Started Date */}
          <div className="rounded-lg bg-[#E9ECEC] px-4 py-3">
            <p className="text-[14px]  text-[#6B6B6B]">Remaining Time</p>
            <p className="mt-2 text-[17px] font-[600] text-[#414749]">
              {data.startedDate}
            </p>
          </div>

          {/* Deadline */}
          <div className="rounded-lg bg-[#E9ECEC] px-4 py-3">
            <p className="text-[14px]  text-[#6B6B6B]">Deadline</p>
            <p className="mt-2 text-[17px] font-[600] text-[#414749]">
              {data.deadline}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 grid grid-cols-3 gap-1 text-xs sm:text-sm sm:gap-3">
          <button
            onClick={() => {
              navigate("detail");
            }}
            type="button"
            className="sm:h-[44px] h-[35px] px-1 sm:px-0 cursor-pointer rounded-md bg-[#E3A853] text-white font-[600]
                       hover:brightness-[0.98] active:scale-[0.99] transition"
          >
            View Details
          </button>

          <button
            type="button"
            className="sm:h-[44px] h-[35px] cursor-pointer rounded-md bg-white font-[600] text-[#414749]
                       border border-[#E3A853] hover:bg-[#FFF6EA]
                       active:scale-[0.99] transition"
          >
            Open Chat
          </button>

          <button
            type="button"
            className="sm:h-[44px] h-[35px] cursor-pointer rounded-md bg-white font-[600] text-[#414749]
                       border border-[#E3A853] hover:bg-[#FFF6EA]
                       active:scale-[0.99] transition"
          >
            Submit Work
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Icons (inline SVG) ---------------- */

function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 5h18l-7 8v5l-4 2v-7L3 5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 6h11M3 6h3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 12h14M3 12h1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 18h7M3 18h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* turquoise-ish "active" rotate */
function RefreshCircleIcon() {
  return (
    <div className="h-10 w-10 rounded-full flex items-center justify-center">
      <img src={first} alt="icon" />
    </div>
  );
}

/* orange clock */
function ClockCircleIcon() {
  return (
    <div className="h-10 w-10 rounded-full flex items-center justify-center">
      <img src={second} alt="icon" />
    </div>
  );
}
