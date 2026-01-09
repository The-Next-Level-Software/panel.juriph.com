import React, { useMemo, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { X } from "lucide-react";
import Filter from "../../assets/filter.png";
import Sort from "../../assets/sort.png";
import Client from "../../assets/client.png";
import Location from "../../assets/location.png";

const STATS = [
  {
    title: "Total Earnings",
    value: "$30k",
    pill: "28.4%",
    desc: "Platform's Total Earnings From\nCommissions (20% Cut).",
  },
  {
    title: "Pending Escrow Amount",
    value: "$30k",
    pill: "28.4%",
    desc: "Total Funds Currently Held In Escrow.",
  },
  {
    title: "Released Payments",
    value: "$30k",
    pill: "28.4%",
    desc: "Total Payments Released To Lawyers.",
  },
  {
    title: "Disputed Amount",
    value: "$30k",
    pill: "28.4%",
    desc: "Funds Currently Involved In Disputes.",
  },
];

const ROWS = [
  {
    id: "1234567",
    client: "Ali Marsad",
    clientCountry: "Pakistan",
    clientAvatar: Client,
    lawyer: "Ali Marsad",
    lawyerCountry: "Pakistan",
    lawyerAvatar: Client,
    title: "Title goes here",
    amount: "$300",
    type: "Released",
    status: "Completed",
    date: "12-12-2024",
    notes: "Comment or note here",
  },
  {
    id: "1234568",
    client: "Name",
    clientCountry: "Pakistan",
    clientAvatar: Client,
    lawyer: "Name",
    lawyerCountry: "Pakistan",
    lawyerAvatar: Client,
    title: "Title goes here",
    amount: "$450",
    type: "Escrowed",
    status: "Escrow",
    date: "12-12-2024",
    notes: "Comment or note here",
  },
  {
    id: "1234569",
    client: "Name",
    clientCountry: "Pakistan",
    clientAvatar: Client,
    lawyer: "Name",
    lawyerCountry: "Pakistan",
    lawyerAvatar: Client,
    title: "Title goes here",
    amount: "$150",
    type: "Escrowed",
    status: "Refund",
    date: "12-12-2024",
    notes: "Comment or note here",
  },
  {
    id: "1234570",
    client: "Name",
    clientCountry: "Pakistan",
    clientAvatar: Client,
    lawyer: "Name",
    lawyerCountry: "Pakistan",
    lawyerAvatar: Client,
    title: "Title goes here",
    amount: "$220",
    type: "Released",
    status: "Completed",
    date: "12-12-2024",
    notes: "Comment or note here",
  },
  {
    id: "1234571",
    client: "Name",
    clientCountry: "Pakistan",
    clientAvatar: Client,
    lawyer: "Name",
    lawyerCountry: "Pakistan",
    lawyerAvatar: Client,
    title: "Title goes here",
    amount: "$520",
    type: "Released",
    status: "Completed",
    date: "12-12-2024",
    notes: "Comment or note here",
  },
];

function StatCard({ title, value, pill, desc }) {
  return (
    <div className="rounded-xl bg-[#F7EEDC] px-6 py-5">
      <div className="text-[13px] font-semibold text-[#7A7A7A]">{title}</div>

      <div className="mt-3 flex items-center gap-3">
        <div className="text-[26px] font-semibold text-[#3D3D3D]">{value}</div>
        <span className="rounded flex items-center gap-1 bg-green-500/15 border border-green-500/20 px-2 py-[3px] text-[11px] font-semibold text-[#14CA74]">
          {pill}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>

      <div className="mt-3 whitespace-pre-line text-[12px] leading-5 text-[#7A7A7A]">
        {desc}
      </div>
    </div>
  );
}

function StatusText({ value }) {
  const cls =
    value === "Completed"
      ? "text-[#14CA74]"
      : value === "Escrow"
      ? "text-[#00B7C5]"
      : "text-[#FF8A00]";
  return <span className={`font-medium ${cls}`}>{value}</span>;
}

function RightDetailPanel({ data, onApprove, onReject }) {
  const [comment, setComment] = useState(data?.notes || "Comment or note here");

  // Keep textarea synced if user clicks another row
  React.useEffect(() => {
    setComment(data?.notes || "Comment or note here");
  }, [data?.id]);

  if (!data) return null;

  return (
    <div className="h-full w-full bg-[#F5F6F6]">
      <div className="h-full  w-full flex flex-col">
        <div className="px-3 sm:px-6 pt-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[16px] text-[#7A7A7A] font-medium">
                ({data.id})
              </div>
              <div className="mt-1 text-[28px] font-medium text-[#3D3D3D]">
                {data.amount || "$300"}
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center justify-center rounded-md bg-[#DFF5E3] px-6 py-2 text-[13px] font-medium text-[#2E9F56]">
                {data.type || "Released"}
              </span>

              <div className="mt-3 text-[13px] text-[#6B7280]">{data.date}</div>
              <div className="mt-2 h-[1px] w-[70px] bg-[#374151] ml-auto opacity-70" />
            </div>
          </div>

          {/* Case title */}
          <div className="mt-7">
            <div className="text-[13px] font-semibold text-[#7A7A7A]">
              Case Title
            </div>
            <div className="mt-1 text-[15px] font-semibold text-[#3D3D3D]">
              {data.title || "Title goes here"}
            </div>
          </div>

          {/* Client + Assigned Lawyer */}
          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <div className="text-[13px] font-semibold text-[#7A7A7A]">
                Client
              </div>

              <div className="mt-3 flex items-center gap-3">
                <img
                  src={data.clientAvatar || "https://i.pravatar.cc/80?img=13"}
                  alt="client"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="text-[15px] font-semibold text-[#3D3D3D]">
                  {data.client || "Ali Marsad"}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[13px] text-[#6B7280]">
                <img src={Location} alt="icon" className="h-4 w-4" />
                <span>{data.clientCountry || "Pakistan"}</span>
              </div>
            </div>

            <div>
              <div className="text-[13px] font-semibold text-[#7A7A7A]">
                Assigned Lawyer
              </div>

              <div className="mt-3 flex items-center gap-3">
                <img
                  src={data.lawyerAvatar || "https://i.pravatar.cc/80?img=13"}
                  alt="lawyer"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="text-[16px] font-semibold text-[#3D3D3D]">
                  {data.lawyer || "Ali Marsad"}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-2 text-[13px] text-[#6B7280]">
                <img src={Location} alt="icon" className="h-4 w-4" />
                <span>{data.lawyerCountry || "Pakistan"}</span>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className="mt-8 rounded-xl bg-white p-5">
            <div className="text-[13px] font-semibold text-[#3D3D3D]">
              Comments
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-3 w-full resize-none bg-transparent text-[14px] text-[#3D3D3D] outline-none placeholder:text-[#9CA3AF]"
              rows={3}
              placeholder="Comment or note here"
            />
          </div>
        </div>

        {/* Buttons bottom-right */}
        <div className="mt-auto px-6 pb-6 pt-4">
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => onApprove?.({ ...data, notes: comment })}
              className="h-10 rounded-md bg-[#DFA458] cursor-pointer px-6 text-[13px] font-semibold text-white hover:opacity-90"
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => onReject?.({ ...data, notes: comment })}
              className="h-10 rounded-md bg-[#FF3B30] cursor-pointer px-6 text-[13px] font-semibold text-white hover:opacity-90"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const [sort, setSort] = useState("Newest");
  const [activeTx, setActiveTx] = useState(null);

  const data = useMemo(() => {
    const copy = [...ROWS];
    if (sort === "Oldest") copy.reverse();
    return copy;
  }, [sort]);

  const openDetails = (row) => setActiveTx(row);
  const closeDetails = () => setActiveTx(null);

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TOP STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard
              key={s.title}
              title={s.title}
              value={s.value}
              pill={s.pill}
              desc={s.desc}
            />
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 sm:gap-6">
          <button
            type="button"
            className="inline-flex items-center cursor-pointer gap-1 text-[13px] font-semibold text-[#6B7280] hover:text-[#3D3D3D]"
          >
            <img src={Filter} alt="icon" className="h-4.5 w-4.5" />
            Filter
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center cursor-pointer gap-1 text-[13px] font-semibold text-[#6B7280] hover:text-[#3D3D3D]"
            >
              <img src={Sort} className="h-4.5 w-4.5" />
              Sort By
            </button>
          </div>
        </div>

        {/* MAIN AREA: Table + Right Panel */}
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start">
          {/* TABLE WRAP */}
          <div
            className={[
              // IMPORTANT: min-w-0 so the table container can shrink in flex-row
              "min-w-0 flex-1 overflow-hidden rounded-xl  bg-white transition-all duration-300",
              !activeTx ? "w-full" : "",
            ].join(" ")}
          >
            <div className="w-full overflow-x-auto">
              <table className="min-w-[980px] w-full border-collapse">
                <thead>
                  <tr className="bg-[#F3F4F6] text-left text-[13px]  text-[#5B6166]">
                    <th className="px-6 py-4 border-b border-[#E5E7EB]">
                      Trans ID
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Client Name
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Lawyer Name
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Case Title
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Date
                    </th>
                    <th
                      className="px-6 py-4 border-b border-[#E5E7EB] text-right whitespace-nowrap"
                      scope="col"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="text-[13px] text-[#414749]">
                  {data.map((r, idx) => {
                    const active = activeTx?.id === r.id;
                    return (
                      <tr
                        key={`${r.id}-${idx}`}
                        className={[
                          "border-b border-[#E5E7EB]",
                          active ? "bg-[#FFF7ED]" : "bg-white",
                        ].join(" ")}
                      >
                        <td className="px-6 py-5 whitespace-nowrap">{r.id}</td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {r.client}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {r.lawyer}
                        </td>
                        <td className="px-6 py-5">{r.title}</td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {r.amount}
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <StatusText value={r.status} />
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {r.date}
                        </td>
                        <td className="px-6 py-5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            className="h-9 rounded-md border cursor-pointer border-[#F4A261] bg-white px-4 text-[13px] font-medium text-[#6B7280] hover:bg-[#FFF3E8]"
                            onClick={() => openDetails(r)}
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="h-2 bg-white" />
          </div>

          {/* RIGHT PANEL (desktop) */}
          {activeTx && (
            <div className="hidden lg:block w-[520px] xl:w-[580px] shrink-0">
              <div className="h-[620px] overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F3F4F6]">
                {/* only panel scrolls */}
                <div className="h-full overflow-y-auto overscroll-contain">
                  <RightDetailPanel
                    data={activeTx}
                    onApprove={(payload) => console.log("Approve:", payload)}
                    onReject={(payload) => console.log("Reject:", payload)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT PANEL (mobile drawer) */}
        {activeTx && (
          <div className="lg:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <button
              type="button"
              onClick={closeDetails}
              className="absolute inset-0 bg-black/40"
              aria-label="Close backdrop"
            />

            {/* Panel */}
            <div
              className={[
                // positioning
                "absolute bg-[#F3F4F6] shadow-2xl",
                // small phones: bottom sheet
                "left-0 right-0 bottom-0 h-[92dvh] rounded-t-2xl",
                // sm and up: right drawer
                "sm:top-0 sm:bottom-0 sm:left-auto sm:right-0 sm:h-full sm:w-[92%] sm:max-w-[520px] sm:rounded-none",
              ].join(" ")}
              role="dialog"
              aria-modal="true"
            >
              {/* Header (sticky) */}
              <div className="sticky top-0 z-10 flex items-center justify-end border-b border-black/5 bg-[#F3F4F6] px-3 py-2">
                <button
                  type="button"
                  onClick={closeDetails}
                  className="inline-flex items-center justify-center rounded-lg p-2 text-[#6B7280] hover:bg-white/70 hover:text-[#111827]"
                  aria-label="Close details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body (only this scrolls) */}
              <div className="h-[calc(92dvh-48px)] sm:h-[calc(100dvh-48px)] overflow-y-auto overscroll-contain px-3 py-3">
                <RightDetailPanel
                  data={activeTx}
                  onApprove={(payload) => console.log("Approve:", payload)}
                  onReject={(payload) => console.log("Reject:", payload)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
