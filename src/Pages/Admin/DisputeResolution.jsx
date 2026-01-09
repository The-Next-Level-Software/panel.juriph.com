import React, { useEffect,useMemo, useState } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { X } from "lucide-react";
import Filter from "../../assets/filter.png";
import Sort from "../../assets/sort.png";
import Client from "../../assets/client.png";
import Location from "../../assets/location.png";

const STATS = [
  {
    title: "Total Dispute",
    value: "42134",
    pill: "28.4%",
    desc: "Platform's Total Earnings From\nCommissions (20% Cut).",
  },
  {
    title: "Resolved Dispute",
    value: "2432",
    pill: "28.4%",
    desc: "Total Funds Currently Held In Escrow.",
  },
  {
    title: "Pending Dispute",
    value: "122",
    pill: "28.4%",
    desc: "Total Payments Released To Lawyers.",
  },
  {
    title: "Dispute Escrow Amount",
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
    DisputeReason: "Incompleted Work",
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
    DisputeReason: "Payment issue",
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
    DisputeReason: "Payment issue",  
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
    DisputeReason: "Incompleted Work",
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
    DisputeReason: "Incompleted Work",
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

function RightDetailPanel({
  data,
  onClose,
  onRelease,
  onSplit,
  onRefund,
  onApprove,
  onReject,
}) {
  const [notes, setNotes] = useState(data?.notes || "Comments goes here");

  useEffect(() => {
    setNotes(data?.notes || "Comments goes here");
  }, [data?.id]);

  const actions = useMemo(() => {
    return {
      release: onRelease || onApprove,
      split: onSplit,
      refund: onRefund || onReject,
    };
  }, [onRelease, onSplit, onRefund, onApprove, onReject]);

  if (!data) return null;

  const chat = Array.isArray(data.communication) ? data.communication : [];

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex flex-col">
        {/* SCROLL AREA (only the panel scrolls) */}
        <div className="flex-1 overflow-y-auto overscroll-contain ">
          <div className="rounded-2xl bg-[#F5F6F6] shadow-sm ">
            {/* Header */}
            <div className="px-4 sm:px-6 pt-5 pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[13px] text-[#7A7A7A] font-medium">
                    ({data.id})
                  </div>
                  <div className="mt-1 text-[18px] sm:text-[20px] font-semibold text-[#3D3D3D]">
                    {data.title || "Title Goes here"}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="rounded-md bg-[#EFEFEF] px-3 py-1.5 text-[12px] font-semibold text-[#6B7280]">
                    {data.date || "12-12-2024"}
                  </div>

                  {onClose ? (
                    <button
                      type="button"
                      onClick={onClose}
                      className="rounded-md p-1.5 text-[#6B7280] hover:bg-black/5 hover:text-[#111827]"
                      aria-label="Close"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Client + Assigned Lawyer */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <PersonBlock
                  label="Client"
                  name={data.client || "Ali Marsad"}
                  country={data.clientCountry || "Pakistan"}
                  avatar={data.clientAvatar || "https://i.pravatar.cc/80?img=13"}
                />
                <PersonBlock
                  label="Assigned Lawyer"
                  name={data.lawyer || "Ali Marsad"}
                  country={data.lawyerCountry || "Pakistan"}
                  avatar={data.lawyerAvatar || "https://i.pravatar.cc/80?img=13"}
                />
              </div>

              {/* Dispute reason + Escrow amount */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_170px] gap-4">
                <div className="rounded-xl bg-white border border-black/5 p-4">
                  <div className="text-[12px] font-semibold text-[#6B7280]">
                    Dispute Reason
                  </div>
                  <div className="mt-2 text-[13px] leading-5 text-[#3D3D3D]">
                    {data.disputeReason ||
                      "Full description provided by the client/lawyer."}
                  </div>
                </div>

                <div className="rounded-xl bg-[#F7EEDC] p-4 border border-black/5">
                  <div className="text-[12px] font-semibold text-[#6B7280]">
                    Escrow Amount
                  </div>
                  <div className="mt-2 text-[18px] font-semibold text-[#3D3D3D]">
                    {data.escrowAmount || "$300"}
                  </div>
                </div>
              </div>

              {/* Communication */}
              <div className="mt-5 rounded-xl bg-white border border-black/5 p-4">
                <div className="text-[13px] font-semibold text-[#3D3D3D]">
                  Communication
                </div>

                <div className="mt-4 space-y-3">
                  {chat.length === 0 ? (
                    <div className="text-[13px] text-[#9CA3AF]">
                      No messages yet.
                    </div>
                  ) : (
                    chat.map((m) => (
                      <ChatBubble
                        key={m.id || `${m.side}-${m.text}`}
                        side={m.side}
                        text={m.text}
                        avatar={m.avatar}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Comments / notes */}
              <div className="mt-5 rounded-xl bg-white border border-black/5 p-4">
                <div className="text-[12px] font-semibold text-[#6B7280]">
                  Comments or notes
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none bg-transparent text-[13px] text-[#3D3D3D] outline-none placeholder:text-[#9CA3AF]"
                  placeholder="Comments goes here"
                />
              </div>
            </div>

            {/* Bottom actions (inside card, like screenshot) */}
            <div className="px-4 sm:px-6 pb-5">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <ActionBtn
                  label="Release funds to lawyer"
                  variant="ghost"
                  onClick={() => actions.release?.({ ...data, notes })}
                />
                <ActionBtn
                  label="Split funds"
                  variant="ghost"
                  onClick={() => actions.split?.({ ...data, notes })}
                />
                <ActionBtn
                  label="Refund to client"
                  variant="ghost"
                  onClick={() => actions.refund?.({ ...data, notes })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}

    function PersonBlock({ label, name, country, avatar }) {
  return (
    <div>
      <div className="text-[12px] font-semibold text-[#6B7280]">{label}</div>

      <div className="mt-2 flex items-center gap-3">
        <img
          src={avatar}
          alt={label}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="min-w-0">
          <div className="text-[13px] font-semibold text-[#3D3D3D] truncate">
            {name}
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-[#6B7280]">
            <img src={Location} alt="icon" className="h-4 w-4" />
            <span className="truncate">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatBubble({ side = "left", text, avatar }) {
  const isRight = side === "right";

  return (
    <div className={isRight ? "flex justify-end" : "flex justify-start"}>
      <div className={isRight ? "flex items-end gap-2" : "flex items-end gap-2"}>
        {!isRight ? (
          <img
            src={avatar || "https://i.pravatar.cc/80?img=12"}
            alt="user"
            className="h-8 w-8 rounded-md object-cover"
          />
        ) : null}

        <div
          className={[
            "max-w-[78%] rounded-xl px-3 py-2 text-[13px] leading-5 shadow-sm",
            isRight
              ? "bg-[#DFA458] text-white rounded-br-md"
              : "bg-[#F3F4F6] text-[#3D3D3D] rounded-bl-md",
          ].join(" ")}
        >
          {text}
        </div>

        {isRight ? (
          <img
            src={avatar || "https://i.pravatar.cc/80?img=11"}
            alt="me"
            className="h-8 w-8 rounded-md object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}

function ActionBtn({ label, onClick, variant = "ghost" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "h-10 w-full sm:w-auto sm:flex-1 cursor-pointer rounded-md text-[12px] font-semibold transition",
        variant === "ghost"
          ? "bg-[#E9EAEC] text-[#5B5F66] hover:bg-[#DDE0E4]"
          : "bg-[#DFA458] text-white hover:opacity-90",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

export default function DiputePage() {
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
                  <tr className="bg-[#F3F4F6] text-left text-[13px] font-light text-[#5B6166]">
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
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
                      Dispute Reason
                    </th>
                    <th className="px-6 py-4 border-b border-[#E5E7EB] whitespace-nowrap">
                      Amount
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
                          {r.DisputeReason} 
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          {r.amount}
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
              <div className="h-[680px] overflow-hidden rounded-xl  ">
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
              <div className="sticky top-0 z-10 flex items-center justify-end  bg-[#F5F6F6] px-3 pt-2">
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
