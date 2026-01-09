// src/pages/PaymentsPage.jsx
import React, { useMemo, useState } from "react";
import Filter from "../../assets/filter.png";
import Sort from "../../assets/sort.png";

const money = (n) => `$${Number(n).toLocaleString()}`;

const STAT_CARDS = [
  {
    key: "released",
    title: "Total Released Payments",
    value: 300,
    tone: "primary",
    cta: "Withdraw",
  },
  { key: "escrow", title: "Current Escrow Balance", value: 300, tone: "cream" },
  { key: "pending", title: "Pending Payments", value: 300, tone: "gray" },
];

const TABS = [
  { key: "held", label: "Funds Held in Escrow" },
  { key: "released", label: "Funds Released" },
  { key: "history", label: "Payment History" },
];

export default function PaymentsPage() {
  const [tab, setTab] = useState("held");

  // ✅ Different table data per tab
  const DATA_BY_TAB = useMemo(
    () => ({
      held: [
        {
          id: 1,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Held in Escrow",
          action: "Submit work to Release",
        },
        {
          id: 2,
          caseName: "456 case",
          amount: 350,
          date: "15-12-2024",
          status: "Held in Escrow",
          action: "Submit work to Release",
        },
        {
          id: 3,
          caseName: "789 case",
          amount: 120,
          date: "18-12-2024",
          status: "Held in Escrow",
          action: "Submit work to Release",
        },
      ],
      released: [
        {
          id: 11,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Released",
          action: "Open Case Detail",
        },
        {
          id: 12,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Released",
          action: "Open Case Detail",
        },
        {
          id: 13,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Released",
          action: "Open Case Detail",
        },
      ],
      history: [
        {
          id: 21,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Held In Escrow",
          action: "Open Case Detail",
        },
        {
          id: 22,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Released",
          action: "Open Case Detail",
        },
        {
          id: 23,
          caseName: "123 case",
          amount: 200,
          date: "12-12-2024",
          status: "Pending",
          action: "Open Case Detail",
        },
      ],
    }),
    []
  );

  // ✅ rows now change with tab
  const displayRows = useMemo(() => DATA_BY_TAB[tab] ?? [], [DATA_BY_TAB, tab]);

  // ✅ show action button only for held tab (as per your current UI intent)
  const showActionButton = tab === "held" && "history";

  return (
    <div className="min-h-[90dvh] bg-white">
      <div className="mx-auto max-w-[1480px] px-5 sm:px-3 py-7">
        {/* HEADER */}
        <div className="flex items-start mt-4 justify-between gap-4">
          <h1 className="text-[25px] font-semibold text-[#111827]">Payments</h1>

          <div className="flex items-center gap-6 text-[#6B7280]">
            <button
              type="button"
              className="flex items-center cursor-pointer gap-1 text-[14px] font-medium hover:text-[#374151] transition"
            >
              <img src={Filter} alt="icon" className="h-5.5 w-5.5" />
              Filter
            </button>
            <button
              type="button"
              className="flex items-center cursor-pointer gap-1 text-[14px] font-medium hover:text-[#374151] transition"
            >
              <img src={Sort} alt="icon" className="h-5.5 w-5.5" />
              Sort By
            </button>
          </div>
        </div>

        {/* TOP STATS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STAT_CARDS.map((c) => (
            <StatCard key={c.key} {...c} />
          ))}
        </div>

        {/* TABLE WRAP */}
        <div className="mt-8 rounded-xl bg-white overflow-hidden">
          {/* mobile: stack | desktop: side-by-side */}
          <div className="flex flex-col sm:flex-row">
            {/* LEFT TABS (desktop) */}
            <aside className="w-[240px] mt-6 bg-white hidden sm:block shrink-0">
              <div className="space-y-2">
                {TABS.map((t) => {
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)} // ✅ changes tab + table rows
                      className={[
                        "w-full text-left cursor-pointer rounded-lg px-4 py-3.5 text-[16px] font-semibold",
                        active
                          ? "bg-[#F3F4F6] text-[#414749]"
                          : "text-[#414749] hover:bg-[#F5F6F6]",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* MOBILE TABS */}
            <div className="sm:hidden w-full px-5 pt-5">
              <div className="flex gap-2 overflow-x-auto pb-2 [-webkit-overflow-scrolling:touch]">
                {TABS.map((t) => {
                  const active = tab === t.key;
                  return (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => setTab(t.key)} // ✅ changes tab + table rows
                      className={[
                        "whitespace-nowrap rounded-lg px-4 py-3 text-[14px] font-semibold shrink-0",
                        active
                          ? "bg-[#F5F6F6] text-[#414749]"
                          : " text-[#6B7280]",
                      ].join(" ")}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT TABLE */}
            <section className="flex-1 bg-white min-w-0">
              <div className="overflow-x-auto sm:overflow-x-visible">
                <div className="min-w-[820px] sm:min-w-0">
                  <div className="px-5 sm:px-7 pt-5 sm:pt-6 pb-4">
                    <div className="rounded-lg bg-[#F5F6F6] px-5 py-4">
                      <div className="grid grid-cols-12 gap-4 text-[14px] font-medium text-[#4A5254]">
                        <div className="col-span-3">Case name</div>
                        <div className="col-span-2">Amount</div>
                        <div className="col-span-3">Date to Release</div>

                        {/* ✅ Show status header only for held & history */}
                        {tab === "held" || tab === "history" ? (
                          <div className="col-span-3">Status</div>
                        ) : (
                          <div className="col-span-3" /> /* keeps grid alignment */
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rows */}
                  <div className="px-5 sm:px-7 pb-6">
                    <div className="divide-y divide-[#E5E7EB]">
                      {displayRows.map((r) => {
                        const isSubmit = r.action === "Submit work to Release";
                        const isViewDetails = r.action === "View Details";
                        const showStatus = tab === "held" || tab === "history";

                        return (
                          <div
                            key={r.id}
                            className="py-3 px-4 sm:px-6 grid grid-cols-12 gap-4 items-center"
                          >
                            {/* Case */}
                            <div className="col-span-3 text-[15px] font-medium text-[#393E40] truncate">
                              {r.caseName}
                            </div>

                            {/* Amount */}
                            <div className="col-span-2 text-[18px] font-semibold text-[#DFA458] whitespace-nowrap">
                              {money(r.amount)}
                            </div>

                            {/* Date */}
                            <div className="col-span-3 font-medium text-[14px] text-[#393E40] whitespace-nowrap">
                              {r.date}
                            </div>

                            {/* Status + Action */}
                            <div className="col-span-4 flex items-center justify-between gap-3">
                              {/* ✅ Status only in held + history */}
                              {showStatus ? (
                                <span
                                  className={[
                                    "text-[15px] font-medium whitespace-nowrap",
                                    r.status?.toLowerCase() === "released"
                                      ? "text-[#00C7BE]"
                                      : r.status?.toLowerCase() === "pending"
                                      ? "text-[#FF3B30]"
                                      : "text-[#393E40]",
                                  ].join(" ")}
                                >
                                  {r.status}
                                </span>
                              ) : (
                                <span /> /* keeps spacing aligned */
                              )}

                              {/* Action Button */}
                              <button
                                type="button"
                                className={[
                                  "shrink-0 h-[40px] px-5 cursor-pointer rounded-lg text-[14px] font-medium transition",
                                  isSubmit
                                    ? "bg-[#DFA458] text-white hover:brightness-95 active:brightness-90"
                                    : isViewDetails
                                    ? "bg-[#F9EFDB] text-[#566164] hover:brightness-95 active:brightness-90"
                                    : "bg-[#AAB5B6] text-white hover:brightness-95 active:brightness-90",
                                ].join(" ")}
                              >
                                {r.action}
                              </button>
                            </div>
                          </div>
                        );
                      })}

                      {displayRows.length === 0 && (
                        <div className="py-10 text-center text-[14px] text-[#6B7280]">
                          No records found.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------- UI pieces -------------------- */

function StatCard({ title, value, tone, cta }) {
  const styles =
    tone === "primary"
      ? {
          wrap: "bg-[#DFA458]",
          title: "text-white/90",
          value: "text-white",
          btn: "bg-[#FCF8F0] text-[#566164]",
        }
      : tone === "cream"
      ? {
          wrap: "bg-[#F9EFDB]",
          title: "text-[#566164]",
          value: "text-[#566164]",
        }
      : {
          wrap: "bg-[#E5E8E8]",
          title: "text-[#566164]",
          value: "text-[#566164]",
        };

  return (
    <div className={["rounded-xl px-7 py-6", styles.wrap].join(" ")}>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className={["text-[15px] mt-5 ", styles.title].join(" ")}>
            {title}
          </div>
          <div
            className={[
              "mt-2 text-[36px] font-semibold leading-none",
              styles.value,
            ].join(" ")}
          >
            {money(value)}
          </div>
        </div>

        {cta ? (
          <button
            type="button"
            className={[
              "h-[40px] px-6 cursor-pointer rounded-lg text-[14px] font-semibold",
              "shadow-[0_1px_0_rgba(0,0,0,0.08)]",
              styles.btn,
            ].join(" ")}
          >
            {cta}
          </button>
        ) : null}
      </div>
    </div>
  );
}
