import React, { useMemo, useState } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Sale from "../../assets/Sales.png";
import Clock from "../../assets/clock.png";
import { useNavigate } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

/* -------------------- CHART DATA -------------------- */
// values are in "K"
const revenueData = [
  { month: "Jan", revenue: 75, expenses: 160 },
  { month: "Feb", revenue: 90, expenses: 150 },
  { month: "Mar", revenue: 120, expenses: 170 },
  { month: "Apr", revenue: 140, expenses: 200 },
  { month: "May", revenue: 165, expenses: 180 },
  { month: "Jun", revenue: 200, expenses: 165 },
  { month: "Jul", revenue: 230, expenses: 140 },
  { month: "Aug", revenue: 260, expenses: 130 },
  { month: "Sep", revenue: 245, expenses: 150 },
  { month: "Oct", revenue: 270, expenses: 175 },
  { month: "Nov", revenue: 290, expenses: 190 },
  { month: "Dec", revenue: 300, expenses: 210 },
];

const StatPill = ({ value = "28.4%", up = true }) => (
  <span
    className={[
      "inline-flex items-center gap-1 px-2 py-[3px] border text-[11px] font-semibold",
      up
        ? "bg-green-500/20 border-green-500/20 text-[#14CA74]"
        : "bg-red-500/15 border-red-500/20 text-[#D43C3C]",
    ].join(" ")}
  >
    {value}
    <span className="text-[12px] leading-none">
      {up ? (
        <ArrowUpRight className="h-4 w-4" />
      ) : (
        <ArrowDownRight className="h-4 w-4" />
      )}
    </span>
  </span>
);

const CreamCard = ({ title, children, buttonText, onButton }) => (
  <div className="rounded-xl bg-[#F9EFDB] p-5">
    <div className="text-[12px] text-[#657475] font-semibold">{title}</div>
    <div className="mt-3 text-medium">{children}</div>

    {buttonText ? (
      <button
        type="button"
        onClick={onButton}
        className="mt-4 h-[34px] px-4 rounded-md border border-[#E6B97E] text-[#566164] cursor-pointer bg-transparent text-[12px] font-semibold hover:bg-white/40 transition"
      >
        {buttonText}
      </button>
    ) : null}
  </div>
);

const TealCard = ({ className = "", children }) => (
  <div
    className={[
      "rounded-2xl bg-[#0D586C] border border-[#0A4B55] text-white",
      className,
    ].join(" ")}
  >
    {children}
  </div>
);

const LegendDot = ({ color = "#F2C06B", label }) => (
  <div className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[12px] text-white/80">{label}</span>
  </div>
);

/* -------------------- TOOLTIP (FIXED) -------------------- */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const revenueItem = payload.find((p) => p.dataKey === "revenue");
  const value = revenueItem?.value ?? payload[0]?.value ?? 0;

  return (
    <div className="rounded-xl bg-[#0D586C] px-5 py-3.5 shadow-2xl">
      <div className="flex items-center gap-3">
        <p className="text-white text-[23px] ">${value}k</p>

        <span className="bg-green-500/15 flex items-center border border-green-500/20 text-[#2ECF7B] text-[12px] font-medium px-2 py-[2px] rounded">
          12.5% <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <p className="text-white/60 text-[12px] mt-1">{label} 21, 2023</p>
    </div>
  );
};
const TipDot = ({ cx, cy, index, dataLength, stroke }) => {
  if (index !== dataLength - 1) return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={3} // 👈 small dot size
      fill={stroke}
      strokeWidth={1.5}
    />
  );
};

const RingActiveDot = ({ cx, cy, stroke, bg = "#0D586C" }) => {
  if (cx == null || cy == null) return null;

  return (
    <g>
      {/* mask the line inside the ring */}
      <circle cx={cx} cy={cy} r={9} fill={bg} />

      {/* thin ring */}
      <circle
        cx={cx}
        cy={cy}
        r={9}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
      />
    </g>
  );
};

/* -------------------- REVENUE CHART (NO DEFAULT EXPORT) -------------------- */
function RevenueChart() {
  return (
    <div className="h-[320px] sm:h-[460px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={revenueData}
          margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="cyanFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00D4EB" stopOpacity={0.25} />
              <stop offset="80%" stopColor="#00D4EB" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#00D4EB" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="month"
            stroke="rgba(255,255,255,0.6)"
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="rgba(255,255,255,0.6)"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v}K`}
            domain={[0, 250]}
            ticks={[0,  50, 100, 150, 200, 250, 300]}
          />

          <Tooltip content={<CustomTooltip />} />

          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#1EC7D6"
            strokeWidth={1}
            fill="url(#cyanFill)"
            dot={false}
            activeDot={(props) => (
              <RingActiveDot {...props} stroke="#1EC7D6" bg="#0D586C" />
            )}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#F2C06B"
            strokeWidth={1}
            fill="url(#cyanFill)"
            dot={false}
            activeDot={(props) => (
              <RingActiveDot {...props} stroke="#F2C06B" bg="#0D586C" />
            )}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#F2C06B"
            strokeWidth={1}
             dot={(props) => (
              <TipDot
                {...props}
                dataLength={revenueData.length}
                stroke="#F2C06B"
             
              />
              )}
            activeDot={false}
          />

          <Line
            type="monotone"
            dataKey="expenses"
            stroke="#1EC7D6"
            strokeWidth={1}
             dot={(props) => (
              <TipDot
                {...props}
                dataLength={revenueData.length}
                stroke="#1EC7D6"
              />)}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProfitBars() {
  const bars = [
    10, 18, 12, 24, 16, 20, 14, 26, 18, 22, 16, 28, 20, 24, 18, 30, 22, 26,
  ];
  const bars2 = [
    7, 12, 8, 16, 10, 14, 9, 18, 12, 15, 11, 20, 14, 17, 12, 22, 15, 19,
  ];
  const time = ["12 AM", "4 AM", "8 PM", "11 PM"];

  return (
    <div className="h-[122px] w-full">
      <div className="flex items-end gap-[6px] h-[86px] mt-3">
        {bars.map((h, i) => (
          <div key={i} className="flex items-end gap-[6px]">
            <div
              className="w-[6px] rounded-sm"
              style={{ height: `${h * 2.4}px`, background: "#F2C06B" }}
            />
            <div
              className="w-[6px] rounded-sm"
              style={{
                height: `${(bars2[i] ?? 0) * 2.4}px`,
                background: "#1EC7D6",
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 w-full flex items-center justify-between text-[10px] text-[#94A3B8]">
        {time.map((label, i) => (
          <p key={i} className="whitespace-nowrap">
            {label}
          </p>
        ))}
      </div>
    </div>
  );
}

function SessionsMiniLine() {
  const VerticalBar = [500, 250, 0, 0];
  const HorizontalBar = ["12 AM", "4 AM", "8 PM", "11 PM"];

  return (
    <div className="h-[140px]">
      <div className="mt-3 h-[86px] relative">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-white/60">
          {VerticalBar.map((v, i) => (
            <p key={i} className="leading-none">
              {v}
            </p>
          ))}
        </div>

        <div className="h-full pl-8">
          <svg viewBox="0 0 520 140" className="w-full h-full">
            <line
              x1="0"
              y1="120"
              x2="520"
              y2="120"
              stroke="rgba(255,255,255,0.10)"
              strokeWidth="2"
            />
            <path
              d="M0,115 L60,98 L110,108 L160,78 L210,102 L260,102 L310,40 L360,104 L420,104 L520,88"
              fill="none"
              stroke="#F2C06B"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="absolute left-8 right-0 -bottom-5 flex justify-between text-[10px] text-white/55">
          {HorizontalBar.map((h, i) => (
            <p key={i} className="leading-none">
              {h}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-24 flex items-center justify-between text-[11px] text-white/55">
        <div className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#2ECF7B]" />
          <span className="text-[#2ECF7B] font-semibold">Live</span>
          <span>10k visitors</span>
        </div>
        <button
          type="button"
          className="text-[#F2C06B] cursor-pointer font-semibold hover:underline"
        >
          View report
        </button>
      </div>
    </div>
  );
}

/* -------------------- PAGE (DEFAULT EXPORT) -------------------- */
export default function Dashboard() {
  const [range, setRange] = useState("Jan 2024 - Dec 2024");
  const navigate = useNavigate();

  const activity = useMemo(
    () => [
      {
        activity: "Lawyer Profile Approved",
        time: "12:00",
        user: "Joan Smith",
      },
      { activity: "Case Resolved: #12345", time: "12:00", user: "Joan Smith" },
      {
        activity: "Dispute Reviewed: Client vs Lawyer",
        time: "12:00",
        user: "Joan Smith",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 py-6">
        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-4">
            <CreamCard
              title="Total Users"
              buttonText="Approve Pending profiles"
            >
              <div className="flex justify-between sm:block sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] text-[#6B7280] font-semibold">
                      Clients
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="sm:text-[22px] text-[20px] font-medium text-[#111827]">
                        12050
                      </div>
                      <StatPill value="28.4%" up />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] text-[#6B7280] font-semibold">
                      Lawyers
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="sm:text-[22px] text-[20px] font-medium text-[#111827]">
                        56,789
                      </div>
                      <StatPill value="28.4%" up />
                    </div>
                  </div>
                </div>
              </div>
            </CreamCard>
          </div>

          <div className="md:col-span-4">
            <CreamCard title="Earnings" buttonText="Withdraw Balance">
              <div className="flex justify-between sm:block sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] text-[#6B7280] font-semibold">
                      Escrow Balance
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-[22px] font-medium text-[#111827]">
                        $30k
                      </div>
                      <StatPill value="28.4%" up />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[12px] text-[#6B7280] font-semibold">
                      Total Earnings
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-[22px] font-medium text-[#111827]">
                        $302k
                      </div>
                      <StatPill value="28.4%" up />
                    </div>
                  </div>
                </div>
              </div>
            </CreamCard>
          </div>

          <div className="md:col-span-4 grid grid-cols-1 gap-4">
            <div className="rounded-xl bg-[#F7EBD6] p-5 flex items-center justify-between">
              <div>
                <div className="text-[12px] text-[#6B7280] font-semibold">
                  Open Cases
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="text-[22px] font-medium text-[#111827]">
                    98
                  </div>
                  <StatPill value="12.6%" up={false} />
                </div>
              </div>
              <button
                type="button"
                className="h-[34px] px-4 rounded-md border cursor-pointer border-[#E6B97E] text-[#566164] text-[12px] font-medium hover:bg-white/40 transition"
              >
                View new cases
              </button>
            </div>

            <div className="rounded-xl bg-[#F7EBD6] p-5 flex items-center justify-between">
              <div>
                <div className="text-[12px] text-[#6B7280] font-semibold">
                  Disputes in Progress
                </div>
                <div className="mt-2 text-[22px] font-medium text-[#111827]">
                  98
                </div>
              </div>
              <button
                type="button"
                className="h-[34px] px-4 cursor-pointer rounded-md border border-[#E6B97E] text-[#566164] text-[12px] font-medium hover:bg-white/40 transition"
              >
                Resolve Disputes
              </button>
            </div>
          </div>
        </div>

        {/* TEAL ANALYTICS PANEL */}
        <div className="mt-6 hidden sm:block">
          <TealCard className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[13px] text-white/75 font-semibold">
                      Total revenue
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="text-[28px] font-medium">$240.8K</div>
                      <StatPill value="24.6%" up />
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <LegendDot color="#F2C06B" label="Revenue" />
                    <LegendDot color="#1EC7D6" label="Expenses" />
                    <select
                      value={range}
                      onChange={(e) => setRange(e.target.value)}
                      className="h-[34px] rounded-md bg-black/35 border border-white/10 text-white/85 text-[12px] px-3 outline-none"
                    >
                      <option>Jan 2024 - Dec 2024</option>
                      <option>Jan 2023 - Dec 2023</option>
                      <option>Last 6 months</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <RevenueChart />
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="p-5 sm:p-6 border-b border-white/10">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-[13px] flex gap-1 items-center text-white/75 font-semibold">
                        <img src={Sale} alt="icon" className="h-3.5 w-3.5" />
                        Total profit
                      </div>
                      <div className="mt-1 flex items-center gap-3">
                        <div className="text-[24px] font-medium">$144.6K</div>
                        <StatPill value="28.5%" up />
                      </div>
                    </div>
                  </div>

                  <ProfitBars />

                  <div className="mt-3 flex items-center justify-between text-[13px] text-white/75">
                    <span>Last 12 months</span>
                    <button className="text-[#F2C06B] hover:underline cursor-pointer transition">
                      View report
                    </button>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div>
                    <div className="text-[13px] flex items-center gap-1 text-white/75 font-semibold">
                      <img src={Clock} alt="icon" className="h-3.5 w-3.5" />{" "}
                      Total sessions
                    </div>
                    <div className="mt-1 flex items-center gap-3">
                      <div className="text-[24px] font-medium">400</div>
                      <StatPill value="15.8%" up />
                    </div>
                  </div>

                  <SessionsMiniLine />
                </div>
              </div>
            </div>
          </TealCard>
        </div>

        {/* ACTIVITY LOG */}
        <div className="mt-8">
          <div className="flex items-end justify-between">
            <h2 className="text-[22px] font-medium text-[#111827]">
              Activity Log
            </h2>
            <button
              type="button"
              className="text-[14px] cursor-pointer font-semibold text-[#6B7280] hover:text-[#374151] transition"
            >
              See All
            </button>
          </div>

          <div className="mt-4 border-b border-[#E5E7EB] overflow-hidden">
            <div className="grid grid-cols-12 bg-[#F5F6F6] px-4 py-3 text-[14px] font-semibold text-[#6B7280]">
              <div className="col-span-6">Activity</div>
              <div className="col-span-3">Time</div>
              <div className="col-span-2">User</div>
              <div className="col-span-1 text-right"> </div>
            </div>

            {activity.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-4 py-4 text-[15px] text-[#393E40] border-t border-[#E5E7EB]"
              >
                <div className="col-span-12 sm:col-span-6 font-medium">
                  {row.activity}
                </div>
                <div className="col-span-6 sm:col-span-3 text-[#6B7280] mt-2 sm:mt-0">
                  {row.time}
                </div>
                <div className="col-span-6 sm:col-span-2 text-[#6B7280] mt-2 sm:mt-0">
                  {row.user}
                </div>
                <div className="col-span-12 sm:col-span-1 mt-3 sm:mt-0 flex sm:justify-end">
                  <button
                    type="button"
                    className="h-[30px] px-3 rounded-md border cursor-pointer border-[#E6B97E] text-[#566164] text-[12px] font-semibold hover:bg-[#FFF7E8] transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
