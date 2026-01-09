import React, { useState } from "react";



const Toggle = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors duration-200",
        checked ? "bg-[#F2DDB6]" : "bg-[#E8E8E8]",
        "focus:outline-none focus:ring-2 focus:ring-[#E8C284]/45 focus:ring-offset-2 focus:ring-offset-white",
      ].join(" ")}
    >
      <span
        className={[
          "inline-block h-5 w-5 rounded-full bg-[#DFA458] shadow-sm transition-transform duration-200",
          checked ? "translate-x-5" : "translate-x-1",
        ].join(" ")}
      />
    </button>
  );
};

export default function Notification() {
  const [prefs, setPrefs] = useState({
    emailBids: true,
    caseUpdates: true,
    promos: true,
    sms: true,
  });

  const Row = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <p className="text-[15px] leading-snug text-[#4A4A4A]">{label}</p>
      <Toggle checked={value} onChange={onChange} />
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-white  ">
      <div className=" w-full max-w-[920px]  px-5 sm:px-7 py-1">
        <h1 className="text-[30px] font-semibold text-[#454545]">Notifications</h1>

        
          <Row
            label="Receive email notifications for new bids."
            value={prefs.emailBids}
            onChange={(v) => setPrefs((p) => ({ ...p, emailBids: v }))}
          />
          <Row
            label="Receive updates about cases in progress."
            value={prefs.caseUpdates}
            onChange={(v) => setPrefs((p) => ({ ...p, caseUpdates: v }))}
          />
          <Row
            label="Receive promotional emails and updates from Juriph."
            value={prefs.promos}
            onChange={(v) => setPrefs((p) => ({ ...p, promos: v }))}
          />
          <Row
            label="Receive SMS notifications."
            value={prefs.sms}
            onChange={(v) => setPrefs((p) => ({ ...p, sms: v }))}
          />
        
      </div>
    </div>
  );
}
