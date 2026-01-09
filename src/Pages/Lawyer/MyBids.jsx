import React from "react";
import Location from "../../assets/location.png"



const IconClock = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 7v5l3 2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const IconUserPin = (props) => (
  <img src={Location} alt="icon"/>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center justify-center h-10 px-6 rounded-md bg-white text-[#657475] text-[14px] ">
    {children}
  </span>
);

const Field = ({ label, value }) => (
  <div className="space-y-2">
    <div className="text-[15px] font-medium text-[#6B7A7A]">{label}</div>
    <div className="h-[46px] rounded-md bg-[#F4F6F7] flex items-center justify-center text-[16px] font-medium text-[#414749]">
      {value}
    </div>
  </div>
);

function CaseLeft({ item }) {
  return (
    <div className="bg-[#F7F7F7] rounded-xl p-7">
      <div className="text-[12px] text-[#7B8A8B]">Posted 2 hour ago</div>

      <h3 className="mt-2 text-[18px] font-semibold text-[#414749] leading-snug">
        {item.title}
      </h3>

      <p className="mt-2 text-[13px] leading-6 text-[#657475]">
        {item.desc}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        <Pill>Case Type</Pill>
        <Pill>Urgent</Pill>
        <Pill>Any Other Tag</Pill>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <div className="text-[13px] text-[#657475]">Budget</div>
          <div className="mt-1 text-[16px] font-semibold text-[#414749]">
            {item.budget}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-[13px] text-[#657475]">
            <IconClock className="h-4 w-4 text-[#657475]" />
            <span>Deadline</span>
          </div>
          <div className="mt-1 text-[16px] font-semibold text-[#414749]">
            {item.deadline}
          </div>
        </div>

        <div>
          <div className="text-[13px] text-[#657475]">Client Preference</div>
          <div className="mt-1 text-[16px] font-semibold text-[#414749]">
            {item.preference}
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <div className="text-[13px] text-[#657475]"> </div>
            <div className="mt-1 inline-flex items-center gap-2 text-[15px] font-medium text-[#6B7A7A]">
              <IconUserPin className="h-5 w-5 text-[#6B7A7A]" />
              <span>{item.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseRight({ item }) {
  return (
    <div className="rounded-xl p-4 sm:p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="Proposed Amount" value={item.proposedAmount} />
        <Field label="Timeline" value={item.timeline} />
      </div>

      <div className="mt-8">
        <div className="text-[16px] font-semibold text-[#4A5254]">
          Cover Letter
        </div>
        <p className="mt-3 text-[14px] leading-7 text-[#7B8A8B]">
          <span className="font-medium text-[#6B7A7A]">Description:</span>{" "}
          {item.coverLetter}
        </p>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        {item.viewed ? (
          <button
            type="button"
            className="h-[46px] px-10 cursor-pointer font-medium rounded-md bg-[#AEB6B6] text-white text-[14px] sm:text-[15px]"
            disabled
          >
            Viewed by Client
          </button>
        ) : null}

        <button
          type="button"
          className="h-[46px] px-10 rounded-md bg-[#DFA458] font-medium cursor-pointer text-white text-[14px] sm:text-[15px] hover:brightness-[0.98] active:scale-[0.99] transition"
          onClick={() => item.onViewDetails?.(item)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default function BidsReceivedPage() {
  const rows = [
    {
      id: 1,
      title: "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
      desc: "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
      budget: "$300-$600",
      deadline: "12-12-2024",
      preference: "Video Call",
      location: "Pakistan",
      proposedAmount: "$300",
      timeline: "12-12-2024",
      coverLetter:
        "Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc.",
      viewed: false,
      
    },
    {
      id: 2,
      title: "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
      desc: "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
      budget: "$300-$600",
      deadline: "12-12-2024",
      preference: "Video Call",
      location: "Pakistan",
      proposedAmount: "$300",
      timeline: "12-12-2024",
      coverLetter:
        "Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Commodo Cursus Nunc.",
      viewed: true,
     
    },
  ];

  return (
    <div className="w-full bg-white p-4 mt-5 sm:p-6">
      <div className="max-w-[1480px] mx-auto space-y-6">
        {rows.map((item) => (
          <div
            key={item.id}
            className="border border-[#E7A44B] rounded-xl "
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-6">
              <CaseLeft item={item} />
              <CaseRight item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
