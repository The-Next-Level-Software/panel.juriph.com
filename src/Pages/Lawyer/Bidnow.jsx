import React, { useMemo, useState } from "react";
import Location from "../../assets/location.png";
import Client from "../../assets/client.png";

export default function CaseDetailsBidPage() {
  const attachments = useMemo(
    () => [
      { id: 1, name: "File Name", meta: "File Type, Jpeg, PDF" },
      { id: 2, name: "File Name", meta: "File Type, Jpeg, PDF" },
      { id: 3, name: "File Name", meta: "File Type, Jpeg, PDF" },
    ],
    []
  );

  // Editable form values
  const [form, setForm] = useState({
    amount: "300",
    timeline: "12-12-2024",
    coverLetter:
      "Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu I Vel Imperdiet Nunc Commodo Cursus Nund. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
  });

  // Saved snapshot (what user submitted)
  const [savedBid, setSavedBid] = useState(null);

  const [mode, setMode] = useState("new");

  const locked = mode === "view";

  const update = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handlePrimaryAction = (e) => {
    e.preventDefault();

    // If locked view -> switch to edit mode
    if (mode === "view") {
      setMode("edit");
      return;
    }

    // If new or edit -> save
    const payload = {
      ...form,
      savedAt: new Date().toISOString(),
    };

    setSavedBid(payload);
    setMode("view");

    // Example: replace with API call
    console.log("Saved bid:", payload);
  };

  const primaryLabel =
    mode === "new" ? "Bid Now" : mode === "view" ? "Edit" : "Bid Now";

  const Chip = ({ children }) => (
    <span className="inline-flex items-center h-10 px-5 rounded-md border border-[#E5E7EB] bg-[#F7F7F7] text-[14px] text-[#6B7280]">
      {children}
    </span>
  );

  const Stat = ({ label, value }) => (
    <div className="min-w-[140px]">
      <div className="text-[14px] text-[#657475]">{label}</div>
      <div className="mt-1 text-[18px] font-semibold text-[#414749]">
        {value}
      </div>
    </div>
  );

  const FieldLabel = ({ children }) => (
    <div className="mb-2 text-[14px] font-medium text-[#475569]">
      {children}
    </div>
  );

  const ReadMoreText = ({ text, limit = 50 }) => {
    const [expanded, setExpanded] = useState(false);

    const words = useMemo(() => text.trim().split(/\s+/), [text]);
    const isLong = words.length > limit;

    const visibleText = expanded ? text : words.slice(0, limit).join(" ");

    return (
      <p className="text-[15px] leading-7 text-[#657475]">
        {visibleText}
        {isLong && !expanded && "... "}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((p) => !p)}
            className="ml-1 text-[#4A5254] font-medium underline cursor-pointer"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </p>
    );
  };

  const Select = ({ value, onChange, disabled, children }) => (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={[
        "w-full h-[52px] rounded-md  px-4 text-[15px] outline-none transition",
        disabled
          ? "border-none bg-[#F5F6F6] appearance-none bg-no-repeat text-center text-[#414749] cursor-default"
          : "border border-[#D1D5DB] cursor-pointer bg-white text-[#414749] focus:ring-2 focus:ring-[#DFA458]/35 focus:border-[#DFA458]/60",
      ].join(" ")}
    >
      {children}
    </select>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1480px] px-5 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10">
          {/* LEFT */}
          <section className="min-w-0">
            <button
              type="button"
              className="text-[14px] cursor-pointer text-[#64748B] font-medium hover:text-[#0F172A] transition"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>

            <h1 className="mt-3 text-[28px] leading-tight font-semibold text-[#0F172A]">
              Case Title Goes here, Case Title Goes here, Case Title Goes here.
            </h1>

            <div className="mt-6 space-y-6">
              <ReadMoreText
                text={`Description: Lorem Ipsum Dolor Sit Amet Consectetur.
    Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus
    Nunc Augue Eu. Description: Lorem Ipsum Dolor Sit Amet
    Consectetur. Pellentesque Sapien In Eu I Vel Imperdiet Nunc
    Commodo Cursus Nund. Vel Imperdiet Nunc Commodo Cursus Nunc
    Augue Eu.Description: Lorem Ipsum Dolor Sit Amet Consectetur.
    Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus
    Nunc Augue Eu. Description: Loremamet Consectetur. Pellentesque
    Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue
    Eu. Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellpsum
    Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel
    Imperdiet Nunc Commodo Cursus Nunc Augue Eu.Description: Lorem
    Ipsum Dolor Sit Amet Coentesque Sapien In Eu Id. Vel Imperdiet
    Nunc Commodo Cursus Nunc Augue Eu.`}
              />
            </div>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-10">
              <Stat label="Budget" value="$300-$600" />
              <Stat label="Deadline" value="12-12-2024" />
              <Stat label="Client Preference" value="Vidoe Call" />
            </div>

            {/* Tags */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Chip>Case Type</Chip>
              <Chip>Urgent</Chip>
              <Chip>Any Other Tag</Chip>
            </div>

            {/* Attachments */}
            <div className="mt-10">
              <div className="text-[15px] font-semibold text-[#393E40]">
                Attached Documents
              </div>

              <div className="mt-5 space-y-5">
                {attachments.map((a) => (
                  <div key={a.id} className="flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="h-14 w-14 rounded-md overflow-hidden bg-[#E5E7EB] shrink-0 border border-[#E5E7EB]">
                      <div className="h-full w-full bg-[linear-gradient(135deg,#111827_0%,#334155_50%,#0f172a_100%)] opacity-90" />
                    </div>

                    <div className="min-w-0">
                      <div className="text-[15px] font-medium text-[#393E40]">
                        {a.name}
                      </div>
                      <div className="text-[12px] text-[#657475]">{a.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT */}
          <section className="min-w-0">
            {/* User card */}
            <div className="rounded-xl bg-[#F3F4F6] p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-[#111827] shrink-0">
                  <img src={Client} alt="lawyer" />
                </div>
                <div className="min-w-0">
                  <div className="text-[17px] mt-2 font-semibold text-[#0F172A] truncate">
                    Ali Marsad
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[14px] text-[#94A3B8]">
                    <img src={Location} alt="icon" />
                    <span>Pakistan</span>
                  </div>
                </div>
              </div>

              <div className="text-[13px] text-[#94A3B8] whitespace-nowrap">
                08:12 PM
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePrimaryAction} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="min-w-0">
                  <FieldLabel>Proposed Amount</FieldLabel>
                  <Select
                    value={form.amount}
                    onChange={(v) => update("amount", v)}
                    disabled={locked}
                  >
                    <option value="300">$300</option>
                    <option value="350">$350</option>
                    <option value="400">$400</option>
                    <option value="500">$500</option>
                    <option value="600">$600</option>
                  </Select>
                </div>

                <div className="min-w-0">
                  <FieldLabel>Timeline</FieldLabel>
                  <Select
                    value={form.timeline}
                    onChange={(v) => update("timeline", v)}
                    disabled={locked}
                  >
                    <option value="12-12-2024">12-12-2024</option>
                    <option value="15-12-2024">15-12-2024</option>
                    <option value="20-12-2024">20-12-2024</option>
                    <option value="01-01-2025">01-01-2025</option>
                  </Select>
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel>Cover Letter</FieldLabel>
                <textarea
                  value={form.coverLetter}
                  onChange={(e) => update("coverLetter", e.target.value)}
                  disabled={locked}
                  className={[
                    "w-full min-h-[330px] rounded-md p-4 text-[14px] leading-7 outline-none resize-none transition",
                    locked
                      ? "border-none bg-transparent text-[#64748B] cursor-default"
                      : "border border-[#D1D5DB] bg-white text-[#64748B] focus:ring-2 focus:ring-[#DFA458]/35 focus:border-[#DFA458]/60",
                  ].join(" ")}
                />
              </div>

              <button
                type="submit"
                className={[
                  "mt-6 w-full h-[52px] rounded-md",
                  "bg-[#DFA458] text-white font-semibold",
                  "transition-all cursor-pointer duration-200",
                  "hover:brightness-[0.98] active:scale-[0.99]",
                  "focus:outline-none focus:ring-2 focus:ring-[#DFA458]/45",
                ].join(" ")}
              >
                {primaryLabel}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
