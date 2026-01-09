import React from "react";
import { useNavigate } from "react-router-dom";
import first from "../../assets/first.png";
import second from "../../assets/second.png";
import third from "../../assets/third.png";
import { Clock } from "lucide-react";
import Client from "../../assets/Client.png";

export default function Dashboard() {
  const navigate = useNavigate();

  const activeCases = [
    { status: "Active", tone: "teal", img: first },
    { status: "Waiting for feedback", tone: "orange", img: second },
    { status: "Completed", tone: "green", img: third },
  ];

  const bids = [
    { id: 1, fee: 200, timeline: "Less than one month" },
    { id: 2, fee: 200, timeline: "Less than one month" },
    { id: 3, fee: 200, timeline: "Less than one month" },
  ];

  return (
    <div className=" px-5 sm:px-14 mt-5 bg-white">
      {/* Header */}
      <div className="flex items-start mt-7 justify-between">
        <h1 className="text-[28px] font-bold text-[#0B2B33]"></h1>
        <button
        onClick={() => navigate("/client-dashboard/post-a-case")}
          className="h-[44px] cursor-pointer px-10 rounded-md bg-[#D9A35B] text-white font-medium
                     hover:opacity-95 active:scale-[0.99]"
        >
          Post a Case
        </button>
      </div>

      {/* Active Cases */}
      <div className="mt-6 flex items-center justify-between">
        <h2 className="text-[25px] font-medium text-[#0B2B33]">Active Cases</h2>
        <button
          onClick={() => navigate("/client-dashboard/active-cases")}
          className="text-[14px] cursor-pointer text-[#6B7A80] hover:text-[#0B2B33]"
        >
          See All
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {activeCases.map((c, i) => (
          <CaseCard
            key={i}
            status={c.status}
            tone={c.tone}
            statusImg={c.img}
          />
        ))}
      </div>

      {/* Bids */}
      <div className="mt-14 flex items-center justify-between">
        <h2 className="text-[25px] font-medium text-[#0B2B33]">Bids Received</h2>
        <button
          onClick={() => navigate("/client-dashboard/bids-received")}
          className="text-[14px] cursor-pointer text-[#6B7A80] hover:text-[#0B2B33]"
        >
          See All
        </button>
      </div>

      <div className="mt-5 rounded-xl border border-[#EEF1F2] overflow-hidden">
        {bids.map((row, i) => (
          <div
            key={row.id}
            className={`px-6 py-5 bg-white ${
              i !== bids.length - 1 ? "border-b border-[#EEF1F2]" : ""
            }`}
          >
            <div className="grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 flex items-center gap-4">
                <Avatar />
                <div>
                  <div className="text-[16px] font-semibold text-[#0B2B33]">
                    Case Name
                  </div>
                  <div className="text-[14px] text-[#6B7A80]">Lawyer name</div>
                </div>
              </div>

              <div className="md:col-span-2 text-[#6B7A80]">${row.fee}</div>
              <div className="md:col-span-3 text-[#6B7A80]">
                {row.timeline}
              </div>

              <div className="md:col-span-2 flex justify-end gap-1 sm:gap-3">
                <button className="h-[40px] cursor-pointer text-[14px] sm:text-[16px]  px-4 sm:px-5 font-medium rounded-md bg-[#29C35A] text-white">
                  Accept
                </button>
                <button className="h-[40px] cursor-pointer  px-4 sm:px-5 text-[14px] sm:text-[16px] font-medium rounded-md bg-[#FF3B30] text-white">
                  Decline
                </button>
                <button className="h-[40px] cursor-pointer  px-4 sm:px-5 text-[14px] sm:text-[16px] font-medium rounded-md bg-[#DFA458] text-white">
                  Message
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-10" />
    </div>
  );
}

/* ================= Components ================= */

function CaseCard({ status, tone, statusImg }) {
  const colors = {
    teal: { bg: "#E7F7F5" },
    orange: { bg: "#FFF4E6" },
    green: { bg: "#E9F9EF" },
  };

  return (
    <div className="rounded-xl bg-[#F6F7F8] p-6">
      <div className="flex justify-between">
        <div className="text-[15px] font-semibold text-[#0B2B33]">
          Case Name Goes <br /> here
        </div>

        <div className="flex flex-col items-center gap-2">
          <div
            
          >
            <img
              src={statusImg}
              alt={status}
              className="h-8 w-8 object-contain"
              draggable={false}
            />
          </div>
          <span className="text-[13px] text-[#2E3A3F] text-center">
            {status}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-[12px] text-[#6B7A80] mb-3">Assigned Lawyer</div>
        <div className="flex items-center gap-3">
          <Avatar small />
          <div>
            <div className="text-[14px] font-semibold text-[#0B2B33]">
              Lawyer Name
            </div>
            <div className="text-[12px] text-[#6B7A80]">Summary</div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <DateBlock title="Started On" date="12-12-2024" />
        <DateBlock title="Due Date" date="12-12-2024" />
      </div>
    </div>
  );
}

function DateBlock({ title, date }) {
  return (
    <div className="flex  gap-1">
      <Clock className="h-3.5 w-3.5 mt-0.5 text-[#6B7A80]" />
      <div>
        <div className="text-[12px] text-[#6B7A80]">{title}</div>
        <div className="text-[13px] font-medium text-[#0B2B33]">{date}</div>
      </div>
    </div>
  );
}

function Avatar({ small = false }) {
  return (
    <>
    <div>
        <img src={Client} alt="Client" className="h-14 w-14"/>
    </div>
    </>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 22a10 10 0 1 1 0-20"
        stroke="#6B7A80"
        strokeWidth="2"
      />
      <path
        d="M12 7v6l4 2"
        stroke="#6B7A80"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
