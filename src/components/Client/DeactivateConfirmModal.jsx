import React, { useEffect } from "react";

export default function DeactivateConfirmModal({
  open,
  onClose,
  onConfirm,
  loading = false,
}) {
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
        className="absolute inset-0 bg-black/30"
      />

      {/* Modal */}
      <div className="relative w-full max-w-[540px] rounded-2xl border border-[#E7E1D6] bg-white px-6 sm:px-8 py-7 shadow-[0_14px_40px_rgba(0,0,0,0.10)]">
        <div className="text-center">
          <p className="text-[14px] sm:text-[15px] font-medium text-[#6F6F6F]">
            Are you sure you want to deactivate
          </p>
          <p className="text-[14px] sm:text-[15px] font-medium text-[#6F6F6F]">
            your account?
          </p>

          <p className="mt-3 text-[12px] sm:text-[13px] text-[#A3A3A3]">
            This action cannot be undone
          </p>
        </div>

        <div className="mt-7 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={[
              "h-[46px] w-full max-w-[220px] cursor-pointer rounded-md",
              "bg-[#D6A25A] text-white text-[14px] font-medium",
              "transition active:scale-[0.99]",
              loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-[0.98]",
            ].join(" ")}
          >
            {loading ? "Deactivating..." : "Yes Deactivate"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className={[
              "h-[46px] w-full cursor-pointer max-w-[220px] rounded-md",
              "border border-[#CFCFCF] bg-white text-[#7A7A7A]",
              "text-[14px] font-medium transition",
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#FAFAFA]",
            ].join(" ")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
