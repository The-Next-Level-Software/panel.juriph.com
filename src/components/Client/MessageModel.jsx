import React, { useEffect } from "react";

export default function OfferModal({
  open,
  onClose,
  title = "Case Title Goes here",
  description = `Lorem ipsum dolor sit amet consectetur. Pellentesque
sapien in eu id. Vel imperdiet nunc commodo cursus
nunc augue eu.`,
  proposedFee = "$300",
  dueDate = "12-12-2024",
  onAccept,
  onDecline,
}) {
  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/35"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[860px]">
        <div className="rounded-[22px] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-[#EEE] overflow-hidden">
          <div className="p-7 sm:p-9">
            {/* Title */}
            <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#2B2B2B]">
              {title}
            </h2>

            {/* Description */}
            <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.45] text-[#6B7280] max-w-[720px] whitespace-pre-line">
              {description}
            </p>

            {/* Info cards */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Proposed Fee */}
              <div className="rounded-[10px] bg-[#F3DEB6] px-6 py-5 text-center">
                <div className="text-[14px] text-[#2B2B2B]/70">Proposed Fee</div>
                <div className="mt-1 text-[22px] font-semibold text-[#2B2B2B]">
                  {proposedFee}
                </div>
              </div>

              {/* Due Date */}
              <div className="rounded-[10px] bg-[#E9ECEC] px-6 py-5 text-center">
                <div className="text-[14px] text-[#2B2B2B]/70">Due Date</div>
                <div className="mt-1 text-[18px] font-semibold text-[#2B2B2B]">
                  {dueDate}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => onAccept?.()}
                className={[
                  "h-[52px] rounded-[10px] font-semibold text-white",
                  "bg-[#DFA458] hover:bg-[#D39645] active:scale-[0.99]",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-[#DFA458]/40",
                ].join(" ")}
              >
                Accept Offer
              </button>

              <button
                type="button"
                onClick={() => onDecline?.()}
                className={[
                  "h-[52px] rounded-[10px] font-semibold text-white",
                  "bg-[#AEB7BA] hover:bg-[#9DA8AB] active:scale-[0.99]",
                  "transition-all duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-[#AEB7BA]/45",
                ].join(" ")}
              >
                Decline Offer
              </button>
            </div>
          </div>
        </div>

        {/* Optional close icon (top-right) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-white shadow border border-[#EEE] grid place-items-center hover:scale-[1.03] active:scale-95 transition"
        >
          <span className="text-[18px] leading-none text-[#2B2B2B]">×</span>
        </button>
      </div>
    </div>
  );
}