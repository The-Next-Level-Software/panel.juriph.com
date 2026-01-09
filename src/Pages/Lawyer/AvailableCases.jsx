import React, { useMemo, useState } from "react";
import { Clock, CalendarDays, Video } from "lucide-react";
import Location from "../../assets/location.png";
import { useNavigate } from "react-router-dom";
import Filter from "../../assets/filter.png";
import Sort from "../../assets/sort.png";

const casesSeed = [
  {
    id: 1,
    posted: "Posted 2 hour ago",
    title: "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
    desc: "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
    tags: ["Case Type", "Urgent", "Any Other Tag"],
    budget: "$300-$600",
    deadline: "12-12-2024",
    preference: "Video Call",
    location: "Pakistan",
  },
  {
    id: 2,
    posted: "Posted 2 hour ago",
    title: "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
    desc: "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
    tags: ["Case Type", "Urgent", "Any Other Tag"],
    budget: "$300-$600",
    deadline: "12-12-2024",
    preference: "Video Call",
    location: "Pakistan",
  },
  {
    id: 3,
    posted: "Posted 2 hour ago",
    title: "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
    desc: "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
    tags: ["Case Type", "Urgent", "Any Other Tag"],
    budget: "$300-$600",
    deadline: "12-12-2024",
    preference: "Video Call",
    location: "Pakistan",
  },
];

const Tag = ({ children }) => (
  <span
    className={[
      "inline-flex items-center justify-center",
      "h-[40px] px-6 rounded-md",
      "bg-white border border-[#EEF2F6]",
      "text-[14px] font-medium text-[#6B7280]",
    ].join(" ")}
  >
    {children}
  </span>
);

const MetaItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 min-w-[140px]">
    <div className="pt-1 text-[#414749]">
      <Icon className="h-5 w-5" />
    </div>
    <div>
      <div className="text-[12px] text-[#657475] leading-none">{label}</div>
      <div className="mt-1 text-[14px] font-semibold text-[#414749]">
        {value}
      </div>
    </div>
  </div>
);

const CaseCard = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("detail");
      }}
      className="bg-[#F7F7F7] cursor-pointer rounded-xl p-6 md:p-7"
    >
      <div className="text-[12px] text-[#657475] mb-2">{item.posted}</div>

      <h3 className="text-[18px] md:text-[20px] font-semibold text-[#414749] leading-snug">
        {item.title}
      </h3>

      <p className="mt-2 text-[14px] text-[#657475] leading-relaxed">
        {item.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {item.tags.map((t, idx) => (
          <Tag key={idx}>{t}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-y-5 gap-x-10">
        <MetaItem icon={Clock} label="Budget" value={item.budget} />
        <MetaItem icon={CalendarDays} label="Deadline" value={item.deadline} />
        <MetaItem
          icon={Video}
          label="Client Preference"
          value={item.preference}
        />
        <div className="flex items-start gap-3 min-w-[140px]">
          <div className="pt-1 text-[#94A3B8]">
            <img src={Location} alt="icon" className="h-6 w-6" />
          </div>
          <div>
            <div className="text-[12px] text-[#414749] leading-none">
              &nbsp;
            </div>
            <div className="-mt-2.5 text-[14px] font-medium text-[#414749]">
              {item.location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AvailableCases() {
  const [sort, setSort] = useState("Sort By");
  const [filterOpen, setFilterOpen] = useState(false);

  const data = useMemo(() => {
    // Demo sort (kept minimal to match screenshot UI)
    const copy = [...casesSeed];
    if (sort === "Deadline") {
      copy.sort((a, b) => (a.deadline > b.deadline ? 1 : -1));
    }
    if (sort === "Budget") {
      copy.sort((a, b) => (a.budget > b.budget ? 1 : -1));
    }
    return copy;
  }, [sort]);

  return (
    <div className="min-h-screen sm:p-5 bg-white">
      <div className=" mx-auto px-5 sm:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          {/* Title */}
          <h1 className="text-[22px] font-semibold text-[#0F172A] sm:text-[24px] md:text-[25px]">
            Available Cases
          </h1>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-6">
            {/* Filter */}
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-medium text-[#64748B] transition hover:text-[#0F172A]"
            >
              <img src={Filter} alt="Filter" className="h-5 w-5 shrink-0" />
              <span className="whitespace-nowrap">Filter</span>
            </button>

            {/* Sort */}
            <div className="relative inline-flex items-center gap-2">
              <img src={Sort} alt="Sort" className="h-5 w-5 shrink-0" />

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={[
                  "h-9 rounded-md bg-transparent text-[14px] font-medium text-[#64748B]",
                  "outline-none cursor-pointer",
                  // makes it easier to tap on mobile
                  "pr-2",
                ].join(" ")}
              >
                <option value="">Sort By</option>
                <option value="Deadline">Deadline</option>
                <option value="Budget">Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Optional filter strip (hidden by default, just to keep behavior) */}
        {filterOpen ? (
          <div className="mt-4 bg-[#F7F7F7] rounded-xl p-4 flex flex-wrap gap-3">
            <Tag>Case Type</Tag>
            <Tag>Urgent</Tag>
            <Tag>Video Call</Tag>
            <button
              type="button"
              onClick={() => setFilterOpen(false)}
              className="ml-auto h-[40px] px-5 rounded-md bg-white border border-[#EEF2F6] text-[14px] font-medium text-[#64748B] hover:text-[#0F172A]"
            >
              Close
            </button>
          </div>
        ) : null}

        {/* List */}
        <div className="mt-6 space-y-7">
          {data.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
