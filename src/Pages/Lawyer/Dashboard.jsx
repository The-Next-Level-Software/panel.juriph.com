import { Clock, DollarSign } from "lucide-react";
import React, { useMemo, useState } from "react";
import First from "../../assets/first.png";
import Second from "../../assets/second.png";
import { useNavigate } from "react-router-dom";

const IconClock = () => <img src={Second} alt="icon" className="h-9 w-9" />;

const IconRefresh = () => <img src={First} alt="icon" className="h-9 w-9" />;

const IconPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 22s7-4.4 7-12a7 7 0 1 0-14 0c0 7.6 7 12 7 12Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

// ✅ FIXED: hook used inside component
const SectionHeader = ({ title, actionText = "See All", path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!path) return;

    navigate(path.startsWith("/") ? path : `/${path}`);
  };

  return (
    <div className="flex items-center justify-between mt-3 mb-4">
      <h2 className="text-[24px] font-semibold text-[#0F172A]">{title}</h2>
      <button
        type="button"
        onClick={handleClick}
        className="text-[14px] font-medium cursor-pointer text-[#94A3B8] hover:text-[#64748B] transition"
      >
        {actionText}
      </button>
    </div>
  );
};

const CardShell = ({ children, className = "" }) => (
  <div className={["rounded-lg bg-[#F5F6F6]", className].join(" ")}>
    {children}
  </div>
);

function AvailableCaseCard({ item }) {
  const navigate = useNavigate();

  return (
    <CardShell className="p-4 cursor-pointer">
      <button
        onClick={() => {
          navigate("available-cases/detail");
        }}
        className="cursor-pointer text-left"
      >
        <div className="flex items-center  justify-between">
          <p className="text-[13px] text-[#94A3B8]">Posted {item.posted}</p>
        </div>

        <h3 className="mt-2 text-[18px] font-semibold text-[#0F172A] leading-snug">
          {item.title}
        </h3>

        <p className="mt-2 text-[13px] text-[#94A3B8] leading-relaxed line-clamp-3">
          {item.desc}
        </p>

        <div className="mt-4 flex items-center justify-between text-[13px] text-[#64748B]">
          <div className=" items-center gap-2">
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 text-[#94A3B8]" />
              <span>Budget</span>
            </div>
            <span className="text-[#0F172A] mt-1 ml-1 font-medium">
              {item.budget}
            </span>
          </div>

          <div className=" items-center gap-2">
            <div className="flex items-center gap-1 mr-8">
              <Clock className="h-4 w-4 text-[#94A3B8]" />
              <span>Due Date</span>
            </div>
            <span className="text-[#0F172A] ml-5 font-medium">
              {item.dueDate}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[13px] text-[#64748B]">
          <IconPin className="h-4 w-4 text-[#94A3B8]" />
          <span>{item.location}</span>
        </div>
      </button>
    </CardShell>
  );
}

function ActiveCaseCard({ item }) {
  const isActive = item.status === "Active";
  const isWaiting = item.status === "waiting for feedback";

  const statusColor = isActive
    ? "text-emerald-500"
    : isWaiting
    ? "text-amber-500"
    : "text-slate-400";

  const StatusIcon = isWaiting ? IconClock : IconRefresh;

  return (
    <div className=" border border-[#AAB5B6] rounded-md p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-[#414749] leading-snug">
            {item.name}
          </h3>
          <p className="mt-2 text-[13px] text-[#94A3B8]">
            Next Action Required
          </p>
          <p className="mt-1 text-[14px] font-semibold text-[#414749]">
            {item.nextAction}
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-end gap-1">
          <StatusIcon className={["h-5 w-5", statusColor].join(" ")} />
          <span className={["text-[14px] font-medium", statusColor].join(" ")}>
            {item.status}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[13px] text-[#64748B]">
        <div className=" items-center gap-2">
          <div className="flex items-center gap-1 mr-8">
            <Clock className="h-4 w-4 text-[#94A3B8]" />
            <span>Started on</span>
          </div>
          <span className="text-[#0F172A] ml-5 font-medium">
            {item.startedOn}
          </span>
        </div>

        <div className=" items-center gap-2">
          <div className="flex items-center gap-1 mr-8">
            <Clock className="h-4 w-4 text-[#94A3B8]" />
            <span>Due Date</span>
          </div>
          <span className="text-[#0F172A] ml-5 font-medium">
            {item.dueDate}
          </span>
        </div>
      </div>
    </div>
  );
}

const TabButton = ({ active, children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={[
      "sm:text-[16px] cursor-pointer pt-2 text-[14px] font-semibold px-3 rounded-t-lg pb-3",
      "border-b-2 transition",
      active
        ? "text-[#414749] bg-[#F5F6F6] border-[#CBD5E1]"
        : "text-[#414749] border-transparent hover:text-[#64748B]",
    ].join(" ")}
  >
    {children}
  </button>
);

export default function Dashboard() {
  const availableCases = useMemo(
    () => [
      {
        id: 1,
        posted: "2 hour ago",
        title:
          "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
        desc: "Description: Lorem Ipsum Dolor Sit Amet consectetur. Pellentesque Sapien Enim Id Eu. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
        budget: "$300-$600",
        dueDate: "12-12-2024",
        location: "Pakistan",
      },
      {
        id: 2,
        posted: "2 hour ago",
        title:
          "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
        desc: "Description: Lorem Ipsum Dolor Sit Amet consectetur. Pellentesque Sapien Enim Id Eu. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
        budget: "$300-$600",
        dueDate: "12-12-2024",
        location: "Pakistan",
      },
      {
        id: 3,
        posted: "2 hour ago",
        title:
          "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
        desc: "Description: Lorem Ipsum Dolor Sit Amet consectetur. Pellentesque Sapien Enim Id Eu. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
        budget: "$300-$600",
        dueDate: "12-12-2024",
        location: "Pakistan",
      },
    ],
    []
  );

  const activeCases = useMemo(
    () => [
      {
        id: 1,
        name: "Case Name Goes\nhere",
        status: "Active",
        nextAction: "Submit Documents To The Client",
        startedOn: "12-12-2024",
        dueDate: "12-12-2024",
      },
      {
        id: 2,
        name: "Case Name Goes\nhere",
        status: "waiting for feedback",
        nextAction: "Submit Documents To The Client",
        startedOn: "12-12-2024",
        dueDate: "12-12-2024",
      },
      {
        id: 3,
        name: "Case Name Goes\nhere",
        status: "Active",
        nextAction: "Submit Documents To The Client",
        startedOn: "12-12-2024",
        dueDate: "12-12-2024",
      },
    ],
    []
  );

  const [tab, setTab] = useState("Funds Held in Escrow");

  const paymentsRows = useMemo(
    () => [
      {
        id: 1,
        caseName: "123 case",
        amount: "$200",
        dateToRelease: "12-12-2024",
        status: "Held in Escrow",
      },
      {
        id: 2,
        caseName: "123 case",
        amount: "$200",
        dateToRelease: "12-12-2024",
        status: "Held in Escrow",
      },
      {
        id: 3,
        caseName: "123 case",
        amount: "$200",
        dateToRelease: "12-12-2024",
        status: "Held in Escrow",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen sm:px-10 bg-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Available Cases */}
        <SectionHeader
          path="/lawyer-dashboard/available-cases"
          title="Available Cases"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableCases.map((c) => (
            <AvailableCaseCard key={c.id} item={c} />
          ))}
        </div>

        <div className="h-7" />

        {/* Active Cases */}
        <SectionHeader
          path="/lawyer-dashboard/active-cases"
          title="Active Cases"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeCases.map((c) => (
            <ActiveCaseCard key={c.id} item={c} />
          ))}
        </div>

        <div className="h-7" />

        {/* Payments */}
        <SectionHeader path="/lawyer-dashboard/payments" title="Payments" />
        <CardShell className="overflow-hidden bg-white">
          <div className=" pt-4">
            <div className="flex text-left items-center gap-6 border-b border-[#E5E7EB]">
              <TabButton
                active={tab === "Funds Held in Escrow"}
                onClick={() => setTab("Funds Held in Escrow")}
              >
                Funds Held in Escrow
              </TabButton>
              <TabButton
                active={tab === "Funds Released"}
                onClick={() => setTab("Funds Released")}
              >
                Funds Released
              </TabButton>
              <TabButton
                active={tab === "Pending Payments"}
                onClick={() => setTab("Pending Payments")}
              >
                Pending Payments
              </TabButton>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full  min-w-[820px]">
              <thead className="">
                <tr className="text-left bg-[#F5F6F6] text-[14px] text-[#414749]">
                  <th className="px-4 sm:px-6 py-4 font-semibold">Case name</th>
                  <th className="px-4 sm:px-6 py-4 font-semibold">Amount</th>
                  <th className="px-4 sm:px-6 py-4 font-semibold">
                    Date to Release
                  </th>
                  <th className="px-4 sm:px-6 py-4 font-semibold">Status</th>
                  <th className="px-4 sm:px-6 py-4 font-semibold text-right"></th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-[#0F172A]">
                {paymentsRows.map((r) => (
                  <tr key={r.id} className="border-t border-[#EEF2F7]">
                    <td className="px-4 sm:px-6 text-[16px] py-4 text-[#393E40]">
                      {r.caseName}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-[#393E40]">
                      {r.amount}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-[#393E40]">
                      {r.dateToRelease}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-[#393E40]">
                      {r.status}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className={[
                            "h-9 px-4 rounded-md text-[14px] cursor-pointer font-semibold",
                            "bg-[#94A3B8] text-white",
                            "hover:bg-[#7C8AA0] active:scale-[0.98] transition",
                          ].join(" ")}
                        >
                          Open Case
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardShell>
      </div>
    </div>
  );
}
