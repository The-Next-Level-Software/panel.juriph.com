import React, { useMemo, useState } from "react";

import Filter from "../../assets/filter.png"
import Sort from "../../assets/sort.png"

const STATS = [
  { label: "Total Articles", value: "312" },
  { label: "Draft Articles", value: "43" },
  { label: "Published Articles", value: "122" },
  { label: "Scheduled Articles", value: "32" },
];

const SAMPLE = Array.from({ length: 4 }).map((_, idx) => ({
  id: `12345${idx}`,
  title: "Title goes here",
  category: "Legal",
  status: "Published",
  author: "Name",
  publishDate: "12-12-2024",
}));

const StatCard = ({ label, value }) => (
  <div className="rounded-[10px] bg-[#F7EEDB] px-7 py-6 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
    <div className="text-[13px] font-semibold text-[#6B7280]">{label}</div>
    <div className="mt-3 text-[30px] font-semibold tracking-tight text-[#111827]">
      {value}
    </div>
  </div>
);

const ChipStatus = ({ value }) => {
  const isPublished = String(value).toLowerCase() === "published";
  return (
    <span
      className={[
        "text-[13px] font-semibold",
        isPublished ? "text-[#10B981]" : "text-[#6B7280]",
      ].join(" ")}
    >
      {value}
    </span>
  );
};

const Btn = ({ variant = "solid", children, className = "", ...props }) => {
  const base =
    "h-[34px] px-4 rounded-[6px] cursor-pointer text-[13px] font-medium transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";
  const styles =
    variant === "solid"
      ? "bg-[#D79A45] text-white hover:bg-[#C98E3F]"
      : variant === "outline"
      ? "border border-[#D79A45] text-[#566164] bg-white hover:bg-[#FFF7ED]"
      : "bg-[#D1D5DB] text-[#4B5563] hover:bg-[#C7CCD3]";
  return (
    <button className={[base, styles, className].join(" ")} {...props}>
      {children}
    </button>
  );
};

export default function ArticlesPage() {
  const [rows] = useState(SAMPLE);

  const columns = useMemo(
    () => [
      { key: "id", label: "Article ID", className: "w-[120px]" },
      { key: "title", label: "Title", className: "min-w-[240px]" },
      { key: "category", label: "Category", className: "w-[160px]" },
      { key: "status", label: "Status", className: "w-[150px]" },
      { key: "author", label: "Author", className: "w-[160px]" },
      { key: "publishDate", label: "Publish Date", className: "w-[170px]" },
      { key: "actions", label: "", className: "w-[260px]" },
    ],
    []
  );

  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* TOP STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 text-[13px] font-semibold text-[#6B7280] hover:text-[#374151]"
            >
              <img src={Filter} alt="icon" className="h-5 w-5" />
              Filter
            </button>

            <button
              type="button"
              className="inline-flex items-center cursor-pointer gap-2 text-[13px] font-semibold text-[#6B7280] hover:text-[#374151]"
            >
              <img src={Sort} alt="icon" className="h-5 w-5" />
              Sort By
            </button>
          </div>

          <div className="sm:ml-6">
            <Btn variant="solid" className="w-full sm:w-auto h-[40px] px-6">
              Create new Article
            </Btn>
          </div>
        </div>

        {/* TABLE */}
        <div className="mt-5 rounded-[10px] bg-white">
          {/* horizontal scroll only for table (like you asked before) */}
          <div className="overflow-x-auto">
            <table className="min-w-[980px] w-full border-collapse">
              <thead>
                <tr className="bg-[#F3F4F6]">
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      className={[
                        "px-6 py-4 text-left text-[13px] font-semibold text-[#6B7280]",
                        c.className || "",
                      ].join(" ")}
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#E5E7EB]">
                {rows.map((r) => (
                  <tr key={r.id} className="bg-white">
                    <td className="px-6 py-6 text-[13px] text-[#374151]">
                      {r.id}
                    </td>

                    <td className="px-6 py-6 text-[13px] text-[#374151]">
                      {r.title}
                    </td>

                    <td className="px-6 py-6 text-[13px] text-[#374151]">
                      {r.category}
                    </td>

                    <td className="px-6 py-6">
                      <ChipStatus value={r.status} />
                    </td>

                    <td className="px-6 py-6 text-[13px] text-[#374151]">
                      {r.author}
                    </td>

                    <td className="px-6 py-6 text-[13px] text-[#374151]">
                      {r.publishDate}
                    </td>

                    <td className="px-6 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Btn
                          variant="outline"
                          onClick={() => console.log("Edit", r.id)}
                        >
                          Edit
                        </Btn>
                        <Btn
                          variant="solid"
                          onClick={() => console.log("View", r.id)}
                        >
                          View
                        </Btn>
                        <Btn
                          variant="gray"
                          onClick={() => console.log("Delete", r.id)}
                        >
                          Delete
                        </Btn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* bottom spacing like screenshot */}
          <div className="h-6" />
        </div>
      </div>
    </div>
  );
}
