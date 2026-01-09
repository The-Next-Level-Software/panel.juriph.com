import React, { useMemo, useState } from "react";
import Client from "../../assets/client.png";

/** Inline SVG Stars (no libs) */
function Stars({ value = 5 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="flex items-center gap-1">
      {stars.map((on, idx) => (
        <svg
          key={idx}
          width="25"
          height="25"
          viewBox="0 0 24 24"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            d="M12 17.27l-5.18 3.1 1.4-5.92L3 9.24l6.05-.52L12 3l2.95 5.72 6.05.52-5.22 5.21 1.4 5.92L12 17.27z"
            fill={on ? "#F5B301" : "#E6E6E6"}
          />
        </svg>
      ))}
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center justify-center px-4 h-11 rounded-md bg-[#F8F3EA] text-[#3A3A3A] text-[14px]">
      {children}
    </span>
  );
}

function CaseCard({ title, desc, budget, deadline, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left cursor-pointer rounded-2xl p-6 transition",
        active ? "bg-[#F5F6F6] " : "opacity-70",
        "border border-transparent hover:border-black/5",
      ].join(" ")}
    >
      <h3 className="text-[20px] font-semibold text-[#2E2E2E]">{title}</h3>
      <p className="mt-3 text-[#7A7A7A] text-[14px] leading-6 max-w-[44ch]">
        {desc}
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl bg-[#E0A856] text-white p-4">
          <p className="text-[13px] opacity-90">Budget</p>
          <p className="mt-2 text-[17px] ">{budget}</p>
        </div>

        <div className="rounded-xl bg-[#E9ECEC] text-[#445255] p-4">
          <p className="text-[13px] opacity-80">Deadline</p>
          <p className="mt-2 text-[17px] font-semibold">{deadline}</p>
        </div>
      </div>
    </button>
  );
}

function BidCard({
  avatar,
  name,
  price,
  duration,
  experience,
  skills,
  summary,
}) {
  return (
    <div className="border-b  border-black/10 pb-8">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={Client}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
            draggable={false}
          />
          <div>
            <p className="text-[18px] font-medium text-[#3A3A3A]">{name}</p>
          </div>
        </div>

        <Stars value={5} />
      </div>

      {/* meta row */}
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="text-[13px] text-[#7A7A7A]">Price</p>
          <p className="mt-2 text-[28px] font-semibold text-[#3A3A3A]">
            {price}
          </p>
        </div>
        <div>
          <p className="text-[13px] text-[#7A7A7A]">Duration</p>
          <p className="mt-3 text-[16px] font-medium text-[#3A3A3A]">
            {duration}
          </p>
        </div>
        <div>
          <p className="text-[13px] text-[#7A7A7A]">Experience</p>
          <p className="mt-3 text-[16px] font-medium text-[#3A3A3A]">
            {experience}
          </p>
        </div>
      </div>

      {/* skills */}
      <div className="mt-8">
        <p className="text-[13px] text-[#7A7A7A]">Skills</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {skills.map((s, i) => (
            <Pill key={i}>{s}</Pill>
          ))}
        </div>
      </div>

      {/* summary */}
      <div className="mt-8">
        <p className="text-[13px] text-[#7A7A7A]">Scope Summary</p>
        <p className="mt-3 text-[15px] leading-6 text-[#3A3A3A] max-w-3xl">
          {summary}
        </p>
      </div>

      {/* actions */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:items-center">
        <button
          type="button"
          className="h-[46px] px-8 cursor-pointer rounded-md bg-[#E0A856] text-white font-medium
                     hover:brightness-95 active:scale-[0.99] transition"
        >
          View Profile
        </button>

        <button
          type="button"
          className="h-[46px] px-8 cursor-pointer rounded-md border border-[#E0A856] text-[#3A3A3A] font-medium
                     hover:bg-[#F6EBD7] active:scale-[0.99] transition"
        >
          Send a Message
        </button>

        <div className="flex gap-4 sm:ml-auto">
          <button
            type="button"
            className="h-[46px] w-full cursor-pointer sm:w-[140px] rounded-md bg-[#2ECC71] text-white font-medium
                       hover:brightness-95 active:scale-[0.99] transition"
          >
            Accept
          </button>
          <button
            type="button"
            className="h-[46px] w-full cursor-pointer sm:w-[140px] rounded-md bg-[#FF3B30] text-white font-medium
                       hover:brightness-95 active:scale-[0.99] transition"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BidsReceived() {
  const cases = useMemo(
    () => [
      {
        id: 1,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
        budget: "$300 To $1200",
        deadline: "12-12-2024",
      },
      {
        id: 2,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
        budget: "$300 To $1200",
        deadline: "12-12-2024",
      },
      {
        id: 3,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
        budget: "$300 To $1200",
        deadline: "12-12-2024",
      },
    ],
    []
  );

  const bids = useMemo(
    () => [
      {
        id: 1,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=70",
        name: "Lawyer name",
        price: "$200",
        duration: "Less then one month",
        experience: "3 Years",
        skills: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
        summary:
          "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
      },
      {
        id: 2,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=70",
        name: "Lawyer name",
        price: "$200",
        duration: "Less then one month",
        experience: "3 Years",
        skills: ["Lorem ipsum", "Lorem ipsum", "Lorem ipsum", "Lorem ipsum"],
        summary:
          "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
      },
    ],
    []
  );

  const [selectedCaseId, setSelectedCaseId] = useState(cases[0]?.id ?? 1);

  return (
 <div className="h-[95dvh] bg-white border border-t overflow-hidden">
      {/* IMPORTANT: prevent page-level horizontal scroll */}
      <div className="h-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col min-h-0 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 flex-1 min-h-0">
          {/* LEFT LIST (Mobile slider / Desktop list) */}
          <aside
            className={[
              // mobile slider
              "flex sm:block",
              "gap-4 sm:space-y-7",
              "overflow-x-auto sm:overflow-x-hidden",
              "overflow-y-hidden sm:overflow-y-auto",
              "snap-x sm:snap-none snap-mandatory snap-always",
              "scroll-smooth",
              "pb-2",

              // make snap align nicely with the left padding
              "-mx-4 px-4 sm:mx-0 sm:px-0",
              "scroll-pl-4 sm:scroll-pl-0",

              // better touch scrolling + stop parent bounce
              "touch-pan-x overscroll-x-contain",

              // hide scrollbar
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
            ].join(" ")}
          >
            {cases.map((c) => (
              <div
                key={c.id}
                className={[
                  // each card is a slide on mobile
                  "snap-start shrink-0",

                  // ✅ remove xs: (not default tailwind)
                  // Use a stable min/max so it feels like a carousel
                  "w-[85%] min-w-[280px] max-w-[380px]",

                  // desktop
                  "sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink",
                ].join(" ")}
              >
                <CaseCard
                  title={c.title}
                  desc={c.desc}
                  budget={c.budget}
                  deadline={c.deadline}
                  active={selectedCaseId === c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                />
              </div>
            ))}
          </aside>

          {/* RIGHT DETAILS (own scroll) */}
          <section className="min-w-0 min-h-0 overflow-y-auto pr-1">
            <h2 className="text-[26px] font-semibold text-[#2E2E2E]">
              Bids Received
            </h2>

            <div className="mt-6 bg-white">
              <div className="space-y-8">
                {bids.map((b, idx) => (
                  <div key={b.id} className={idx === 0 ? "" : "pt-2"}>
                    <BidCard {...b} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
