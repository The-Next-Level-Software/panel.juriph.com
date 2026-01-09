import React from "react";
import first from "../../assets/first.png";
import Client from "../../assets/client.png";
import { useNavigate } from "react-router-dom";

export default function CaseDetail() {
  const navigate = useNavigate();

  const steps = [
    { label: "Step 1", status: "done" },
    { label: "Step 2", status: "done" },
    { label: "Step 3", status: "current" },
    { label: "Step 4", status: "todo" },
    { label: "Step 5", status: "todo" },
  ];

  const docs = [
    { name: "File Name", meta: "File Type, Jpeg, PDF" },
    { name: "File Name", meta: "File Type, Jpeg, PDF" },
    { name: "File Name", meta: "File Type, Jpeg, PDF" },
  ];

  return (
    <div className="min-h-screen  bg-white">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-[22px] sm:text-[26px] font-semibold text-[#2b2b2b]">
              Case Title Goes here
            </h1>
            <p className="mt-1 max-w-[620px] text-[12.5px] sm:text-[13px] leading-relaxed text-[#7a7a7a]">
              Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu
              id. Vel imperdiet nunc commodo cursus nunc augue eu.
            </p>
          </div>

          <div className="items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                
                navigate(-1);
              }}
              className="text-sm cursor-pointer font-medium text-[#2b2b2b] hover:underline"
            >
              Go Back
            </button>

            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-white mt-1 flex items-center justify-center">
                <img src={first} alt="icon" className="h-9 w-9" />
              </div>
              <span className="mt-2 text-xs text-[#6e6e6e]">Active</span>
            </div>
          </div>
        </div>

        {/* Top cards */}
        <div className="mt-6 grid grid-cols-7 md:grid-cols-3 gap-2 sm:gap-4">
          
          <div className="rounded-lg col-span-4 sm:col-span-1 bg-[#F7F1E7] p-3 sm:p-4">
            <p className="text-sm text-[#7b7b7b]">Client</p>

            <div className=" mt-2 sm:mt-3 flex items-center gap-1 sm:gap-3">
              <img
                src={Client}
                alt="Lawyer"
                className=" h-10 w-10 sm:h-14 sm:w-14  rounded-full object-cover"
                draggable={false}
              />
              <div>
                <p className="text-md  sm:text-lg font-semibold text-[#414749]">
                  Client Name
                </p>
                <p className="text-[14px] text-[#7a7a7a]">Location</p>
              </div>
            </div>
          </div>

          {/* Proposed Fee */}
          <div className="rounded-lg bg-[#E1A352] col-span-3 sm:col-span-1 p-4 text-white relative overflow-hidden">
            <p className="text-sm opacity-95">Held In Escrow</p>

            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-[24px] font-semibold">$300</p>
              
            </div>

          </div>

          {/* Dates */}
          <div className="rounded-lg col-span-7 sm:col-span-1 bg-[#E8ECEF] p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-[#7b7b7b]">Remaining Time</p>
                <p className="mt-2 text-lg font-semibold text-[#2b2b2b]">
                  3 Days 12 Hr
                </p>
              </div>
              <div>
                <p className="text-sm text-[#7b7b7b]">Deadline</p>
                <p className="mt-2 text-lg font-semibold text-[#2b2b2b]">
                  12-12-2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle section */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Progress */}
          <div className="md:col-span-2 rounded-lg bg-[#F3F3F3] p-4 sm:p-5">
            <p className="text-sm font-medium text-[#4b4b4b]">Progress</p>

            <div className="mt-4 sm:mt-6 flex items-end justify-between gap-2 sm:gap-4">
              {steps.map((s, idx) => (
                <StepItem
                  key={s.label}
                  index={idx}
                  label={s.label}
                  status={s.status}
                />
              ))}
            </div>
          </div>

          {/* Attached Documents */}
          <div className="rounded-lg bg-[#F7F1E7] p-4 sm:p-5">
            <p className="text-sm font-medium text-[#4b4b4b]">
              Attached Documents
            </p>

            <div className="mt-4 space-y-3">
              {docs.map((d, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-md bg-[#1f2b2d] overflow-hidden shrink-0 relative">
                    {/* tiny “thumbnail” style like screenshot */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1f2b2d] via-[#3a2c1b] to-[#a85c1b]" />
                    <div className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_55%)]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-[#2b2b2b] truncate">
                      {d.name}
                    </p>
                    <p className="text-[11px] text-[#7a7a7a]">{d.meta}</p>
                  </div>
                </div>
              ))}

             <button
            type="button"
            className="h-[40px] px-3 mt-3 rounded-md border border-[#E1A352] cursor-pointer text-[#4b4b4b] text-xs text-md font-medium
                       hover:brightness-[0.98] active:scale-[0.99] transition"
          >
            Upload Document
          </button>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="mt-6 sm:grid flex flex-wrap sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            type="button"
            className="h-[44px] px-3 rounded-md bg-[#E1A352] cursor-pointer text-white text-md font-medium
                       hover:brightness-[0.98] active:scale-[0.99] transition"
          >
            Request update
          </button>

          <button
            type="button"
            className="h-[44px] px-3 rounded-md border border-[#E1A352] cursor-pointer bg-white text-[#2b2b2b]
                       text-md font-medium hover:bg-[#fff7ea] active:scale-[0.99] transition"
          >
           Submit Work
          </button>


          <button
            type="button"
            className="h-[44px] px-3 rounded-md bg-[#FF3B30] cursor-pointer text-white text-md font-medium
                       hover:bg-[#e6352b] active:scale-[0.99] transition"
          >
            Report an issue
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------- Small Pieces ----------------------- */

function StepItem({ label, status }) {
  const isDone = status === "done";
  const isCurrent = status === "current";
  const isActive = isDone || isCurrent;

  // Match screenshot colors
  const ACTIVE_LINE = "bg-[#414749]"; // dark line + top dot
  const TODO_LINE = "bg-[#BFC6CC]"; // light grey line + top dot

  const ORANGE = "#E1A352";
  const GREEN = "#2ECC71";
  const GREY = "#BFC6CC";

  const accent = isCurrent ? GREEN : isDone ? ORANGE : GREY;

  return (
    <div className="flex flex-col items-center flex-1 min-w-0">
      {/* top dot */}
      <div
        className={`h-3 w-3 rounded-full ${isActive ? ACTIVE_LINE : TODO_LINE}`}
      />

      {/* vertical line */}
      <div
        className={` h-16 sm:h-18 w-[2px] rounded-full ${
          isActive ? ACTIVE_LINE : TODO_LINE
        }`}
      />

      {/* bottom circle (ring) */}
      <div
        className="mt-1 h-6 w-6 rounded-full bg-white border-2 flex items-center justify-center"
        style={{ borderColor: accent }}
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor: isDone || isCurrent ? accent : "transparent",
          }}
        />
      </div>

      {/* label */}
      <p className="mt-2 text-[12px] text-[#2b2b2b] whitespace-nowrap">
        {label}
      </p>
    </div>
  );
}
