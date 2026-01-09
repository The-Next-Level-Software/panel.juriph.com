import React, { useMemo, useState } from "react";
import Client from "../../assets/client.png";


const Star = ({ filled, onClick, onHover, onLeave, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
    className={[
      "p-0.5 transition",
      disabled ? "cursor-default" : "cursor-pointer hover:scale-[1.03]",
    ].join(" ")}
    aria-label="rating star"
  >
    <svg
      viewBox="0 0 24 24"
      className={[
        "h-10 w-10",
        filled ? "text-[#DFA458]" : "text-[#DFA458]",
      ].join(" ")}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2.6l2.8 6.1 6.7.6-5 4.3 1.5 6.5L12 16.9 6 20.1l1.5-6.5-5-4.3 6.7-.6L12 2.6z" />
    </svg>
  </button>
);

const Avatar = ({ name }) => {
  const initials = useMemo(() => {
    const parts = (name || "Lawyer").split(" ").filter(Boolean);
    return (parts[0]?.[0] || "L") + (parts[1]?.[0] || "N");
  }, [name]);

  return (
    <div className="h-12 w-12 rounded-full bg-[#D9D9D9] overflow-hidden grid place-items-center shrink-0">
      <span className="text-[14px] font-semibold text-[#2C2C2C] select-none">
        {initials.toUpperCase()}
      </span>
    </div>
  );
};

const PillToggle = ({ value, onChange, disabled }) => {
  const isPublic = value === "public";

  return (
    <div
      className={[
        "relative inline-flex mt-4 sm:mt-0 rounded-lg bg-[#F3E2C3] p-1",
        "w-[165px] h-11", 
        disabled ? "opacity-70" : "",
      ].join(" ")}
    >
      {/* Sliding background */}
      <span
        className={[
          "absolute top-1 left-1 h-9 w-[76px] rounded-lg",
          "bg-[#DFA458]",
          "transition-transform duration-300 ease-out",
        ].join(" ")}
        style={{
          transform: isPublic ? "translateX(80px)" : "translateX(0px)",
        }}
      />

      {/* Private */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("private")}
        className={[
          "relative z-10 flex-1 h-9 cursor-pointer rounded-lg",
          "text-[14px] font-medium transition-colors",
          !isPublic ? "text-white" : "text-[#2C2C2C]/85",
          disabled ? "cursor-default" : "hover:opacity-95",
        ].join(" ")}
      >
        Private
      </button>

      {/* Public */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("public")}
        className={[
          "relative z-10 flex-1 cursor-pointer h-9 rounded-lg",
          "text-[14px] font-medium transition-colors",
          isPublic ? "text-white" : "text-[#2C2C2C]/85",
          disabled ? "cursor-default" : "hover:opacity-95",
        ].join(" ")}
      >
        Public
      </button>
    </div>
  );
};

const PublicPill = () => (
  <div className="inline-flex mt-5 sm:mt-0 items-center justify-center h-12 px-10 rounded-xl bg-[#DFA458] text-white text-[14px] font-medium">
    Public
  </div>
);

// ---------- Left card ----------
const CaseCard = ({ title, desc, lawyerName, lawyerTag }) => {
  return (
    <div className="bg-[#FBF6EA] rounded-2xl p-7  sm:p-8 h-85">
      <h3 className="text-[22px] font-semibold text-[#2C2C2C]">{title}</h3>

      <p className="mt-3 text-[14px] leading-4 text-[#2C2C2C]/70 max-w-[520px]">
        {desc}
      </p>

      <div className="mt-5">
        <p className="text-[12px] text-[#2C2C2C]/55 mb-3">Assigned Lawyer</p>

        <div className="flex items-center gap-4">
          <img src={Client} alt="lawyer" className="h-11 w-11" />
          <div className="min-w-0">
            <p className="text-[16px] font-semibold text-[#2C2C2C] truncate">
              {lawyerName}
            </p>
            <p className="text-[13px] text-[#2C2C2C]/55 truncate">
              {lawyerTag}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="mt-8 h-11 px-10  cursor-pointer rounded-lg bg-[#DFA458] text-white text-[16px] font-medium
                     hover:brightness-[0.98] active:scale-[0.99] transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

// ---------- Right panels ----------
const FeedbackFormPanel = ({
  rating,
  setRating,
  comment,
  setComment,
  visibility,
  setVisibility,
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="h-full flex pt-7 px-7 sm:pt-5 sm:px-5 flex-col">
      <div className="flex items-start justify-between gap-6">
        <div className="w-full">
          <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C]">
            How was your experience with this lawyer?
          </h3>

          <div className="mt-5 flex-1 sm:flex justify-between items-center gap-2">
            <div>
            {Array.from({ length: 5 }).map((_, i) => {
              const idx = i + 1;
              const isFilled = (hover || rating) >= idx;
              return (
                <Star
                  key={idx}
                  filled={isFilled}
                  onClick={() => setRating(idx)}
                  onHover={() => setHover(idx)}
                  onLeave={() => setHover(0)}
                />
              );
            })}
            </div>
            <div className="pt-1">
          <PillToggle value={visibility} onChange={setVisibility} />
        </div>
          </div>
        </div>

        
      </div>

      <div className="mt-7">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment here"
          className="w-full min-h-[140px] rounded-xl border border-[#CFCFCF]
                     px-5 py-4 text-[14px] text-[#2C2C2C]
                     placeholder:text-[#2C2C2C]/50
                     focus:outline-none focus:ring-2 focus:ring-[#DFA458]/25"
        />
      </div>

      <div className="mt-auto flex justify-end pt-7">
        <button
          type="button"
          className="h-12 px-10 rounded-xl cursor-pointer bg-[#DFA458] text-white text-[14px] font-medium
                     hover:brightness-[0.98] active:scale-[0.99] transition"
        >
          Submit feedback
        </button>
      </div>
    </div>
  );
};

const FeedbackSubmittedPanel = ({ rating = 5, comment }) => {
  return (
    <div className="h-full pt-5 px-5 sm:pt-7 sm:pr-7 flex flex-col">
      <div className="flex items-start w-full  gap-6">
        <div className=" w-full">
          <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#2C2C2C]">
            How was your experience with this lawyer?
          </h3>

          <div className="mt-5 flex-1 sm:flex col-span-2 justify-between items-center gap-2">
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} filled={i + 1 <= rating} disabled />
              ))}
            </div>
            <div className="pt-1">
              <PublicPill />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <div
          className="w-full min-h-[140px] rounded-xl border border-[#CFCFCF]
                     px-5 py-4 text-[14px] leading-6 text-[#2C2C2C]/75"
        >
          {comment}
        </div>
      </div>

      <div className="mt-auto flex justify-end pt-7">
        <button
          type="button"
          disabled
          className="h-12 px-10 rounded-xl bg-[#AAB2B2] text-white text-[14px] font-medium cursor-not-allowed"
        >
          feedback Submitted
        </button>
      </div>
    </div>
  );
};

// ---------- Page ----------
export default function HistoryAndFeedback() {
  const dummy = {
    title: "Case Title Goes here",
    desc:
      "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. " +
      "Vel imperdiet nunc commodo cursus nunc augue eu.",
    lawyerName: "Lawyer Name",
    lawyerTag: "Tagline Or Summary",
  };

  const [rating, setRating] = useState(0);
  const [visibility, setVisibility] = useState("public");
  const [comment, setComment] = useState("");

  return (
    <div className="min-h-screen bg-white p-6 sm:p-10">
      <div className=" mx-auto space-y-8">
        {/* TOP (form) */}
        <section className="rounded-2xl border border-[#DFA458] pb-5 sm:pb-7">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-10 min-h-[260px]">
            <CaseCard {...dummy} />
            <FeedbackFormPanel
              rating={rating}
              setRating={setRating}
              visibility={visibility}
              setVisibility={setVisibility}
              comment={comment}
              setComment={setComment}
            />
          </div>
        </section>

        {/* BOTTOM (submitted) */}
        <section className="rounded-2xl border border-[#DFA458] pb-5 sm:pb-7">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 lg:gap-10 min-h-[260px]">
            <CaseCard {...dummy} />
            <FeedbackSubmittedPanel
              rating={5}
              comment={
                "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. " +
                "Vel imperdiet nunc commodo cursus nunc augue eu."
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}
