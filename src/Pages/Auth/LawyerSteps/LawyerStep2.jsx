import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../../assets/frame.png"
import Juriph from "../../../assets/Juriph Logo.png";
import StepOne from "../../../assets/step-one.png";
import AuthFooter from "../../../components/AuthFooter";

export default function LawyerStep2() {
  const navigate = useNavigate(); // ✅ FIX: was missing
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    degreeFile: null, // required
    barMember: "", // required: "yes" | "no"
    barId: "", // required if barMember === "yes"
    experience: "", // required: "lt1" | "1_3" | "4_7" | "8p"
  });

  const [touched, setTouched] = useState({
    degreeFile: false,
    barMember: false,
    barId: false,
    experience: false,
  });

  const allowedTypes = useMemo(
    () => [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
    ],
    []
  );

  const validate = (next = form) => {
    const e = {};

    // Upload (required)
    if (!next.degreeFile) e.degreeFile = "Please upload your document.";
    else if (!allowedTypes.includes(next.degreeFile.type))
      e.degreeFile = "Supported formats: PDF, DOC/DOCX, PNG.";

    // Bar association yes/no (required)
    if (!next.barMember) e.barMember = "Please select Yes or No.";

    // Bar ID (required if yes)
    if (next.barMember === "yes") {
      const v = next.barId.trim();
      if (!v) e.barId = "Please enter your Bar Membership Number or ID.";
      else if (v.length < 4) e.barId = "Please enter a valid ID.";
    }

    // Experience (required)
    if (!next.experience) e.experience = "Please select your experience.";

    return e;
  };

  const errors = useMemo(() => validate(form), [form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const setField = (key, value) => {
    setForm((p) => {
      const next = { ...p, [key]: value };
      if (key === "barMember" && value === "no") next.barId = ""; // ✅ clear
      return next;
    });
  };

  const markTouched = (key) => setTouched((p) => ({ ...p, [key]: true }));

  const onPickFile = (e) => {
    const f = e.target.files?.[0] || null;
    setField("degreeFile", f);
    markTouched("degreeFile");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setTouched({
      degreeFile: true,
      barMember: true,
      barId: true,
      experience: true,
    });

    const e2 = validate(form);
    if (Object.keys(e2).length > 0) return;

    // ✅ proceed
    navigate("/lawyer-welcome/lawyer-step-3");
  };

  const UploadLabel = () => (
    <div className="flex items-center gap-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 16V4"
          stroke="#012B37"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M7 8l5-4 5 4"
          stroke="#012B37"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 16v4a2 2 0 002 2h12a2 2 0 002-2v-4"
          stroke="#012B37"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-sm font-medium text-[#012B37]">Upload</span>
    </div>
  );

  // ✅ FIX: Proper RadioPill API (label/value/onChange)
  const RadioPill = ({ name, value, label, checked, onChange }) => (
    <label
      className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl cursor-pointer select-none
        bg-[#F5F6F6] border transition
        ${
          checked
            ? "border-[#E8C284] ring-2 ring-[#E8C284]/40"
            : "border-transparent hover:border-[#E8C284]/60"
        }
      `}
    >
      <span
        className={`h-4 w-4 rounded-full border flex items-center justify-center
          ${checked ? "border-[#012B37]" : "border-[#9AA3A7]"}
        `}
      >
        <span
          className={`h-2 w-2 rounded-full transition
            ${checked ? "bg-[#012B37]" : "bg-transparent"}
          `}
        />
      </span>

      <input
        className="sr-only"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />

      <span className="text-sm text-[#012B37]">{label}</span>
    </label>
  );

  const ExpPill = ({ name, value, label, checked, onChange }) => {
    return (
      <label
        className={`w-full flex items-center gap-3 px-5 py-4 rounded-xl cursor-pointer select-none
        bg-[#F5F6F6] border transition
        ${
          checked
            ? "border-[#E8C284] ring-2 ring-[#E8C284]/40"
            : "border-transparent hover:border-[#E8C284]/60"
        }
      `}
      >
        {/* Custom radio */}
        <span
          className={`h-4 w-4 rounded-full border flex items-center justify-center
          ${checked ? "border-[#012B37]" : "border-[#9AA3A7]"}
        `}
        >
          <span
            className={`h-2 w-2 rounded-full transition
            ${checked ? "bg-[#012B37]" : "bg-transparent"}
          `}
          />
        </span>

        <input
          type="radio"
          className="sr-only"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
        />

        <span className="text-sm text-[#012B37]">{label}</span>
      </label>
    );
  };

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col overflow-hidden">
      {/* Main */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
        {/* LEFT */}
        <div className="min-h-0 bg-white flex">
          {/* On mobile: normal page scroll | On desktop: keep footer fixed, scroll only form */}
          <div className="w-full flex-1 flex justify-center px-4 sm:px-6 md:px-10">
            <div className="w-full max-w-[520px] min-h-0 flex flex-col py-8 md:py-10">
              {/* Logo (fixed) */}
              <div className="flex justify-center mb-8 md:mb-10 shrink-0">
                <img
                  src={Juriph}
                  alt="Juriph"
                  className="h-11 sm:h-14 w-auto select-none"
                />
              </div>

              {/* Form scroll area */}
              <div className="min-h-0 flex-1 overflow-visible md:overflow-y-auto md:pr-2">
                <form
                  onSubmit={onSubmit}
                  autoComplete="off"
                  className="space-y-8 pb-6"
                >
                  {/* Upload */}
                  <div>
                    <p className="text-[#012B37] text-[15px] mb-3">
                      Upload your law degree or certification.
                    </p>

                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/png"
                      className="hidden"
                      onChange={onPickFile}
                    />

                    <div className="flex flex-col items-start gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          fileRef.current?.click();
                          markTouched("degreeFile");
                        }}
                        className="w-[160px] h-[46px] cursor-pointer rounded-md bg-[#F4F5F5] flex items-center justify-center"
                      >
                        <UploadLabel />
                      </button>

                      {/* File name BELOW button */}
                      {form.degreeFile && (
                        <span className="text-xs text-[#6B7C85] max-w-[160px] truncate">
                          {form.degreeFile.name}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: PDF, DOC/DOCX, PNG
                    </p>

                    {touched.degreeFile && errors.degreeFile ? (
                      <p className="text-xs text-red-500 mt-2">
                        {errors.degreeFile}
                      </p>
                    ) : null}
                  </div>

                  {/* Bar association */}
                  <div>
                    <p className="text-[#012B37] text-[15px] mb-3">
                      Are you a member of any bar association?
                    </p>

                    {/* Responsive pills: stack on mobile, row on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <RadioPill
                        name="barMember"
                        value="yes"
                        label="Yes"
                        checked={form.barMember === "yes"}
                        onChange={() => {
                          setField("barMember", "yes");
                          markTouched("barMember");
                        }}
                      />
                      <RadioPill
                        name="barMember"
                        value="no"
                        label="No"
                        checked={form.barMember === "no"}
                        onChange={() => {
                          setField("barMember", "no");
                          markTouched("barMember");
                        }}
                      />
                    </div>

                    {touched.barMember && errors.barMember ? (
                      <p className="text-xs text-red-500 mt-2">
                        {errors.barMember}
                      </p>
                    ) : null}

                    <p className="text-gray-500 text-sm mt-4 mb-2">
                      If yes, provide your Bar Membership Number or ID.
                    </p>

                    <input
                      type="text"
                      value={form.barId}
                      onChange={(e) => setField("barId", e.target.value)}
                      onBlur={() => markTouched("barId")}
                      disabled={form.barMember !== "yes"}
                      placeholder="12345678"
                      className={[
                        "w-full h-[46px] rounded-md px-4 text-sm",
                        "bg-[#F4F5F5] placeholder:text-gray-400 text-[#012B37]",
                        "focus:outline-none focus:ring-2 focus:ring-[#E8C284]",
                        form.barMember !== "yes"
                          ? "opacity-60 cursor-not-allowed"
                          : "",
                      ].join(" ")}
                    />

                    {touched.barId && errors.barId ? (
                      <p className="text-xs text-red-500 mt-2">
                        {errors.barId}
                      </p>
                    ) : null}
                  </div>

                  {/* Experience */}
                  <div>
                    <p className="text-[#012B37] text-[15px] mb-4">
                      How many years of legal experience do you have? (Select
                      one)
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <ExpPill
                        name="experience"
                        value="lt1"
                        label="Less than 1 year"
                        checked={form.experience === "lt1"}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, experience: e.target.value }))
                        }
                      />
                      <ExpPill
                        name="experience"
                        value="1_3"
                        label="1–3 years"
                        checked={form.experience === "1_3"}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, experience: e.target.value }))
                        }
                      />
                      <ExpPill
                        name="experience"
                        value="4_7"
                        label="4–7 years"
                        checked={form.experience === "4_7"}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, experience: e.target.value }))
                        }
                      />
                      <ExpPill
                        name="experience"
                        value="8p"
                        label="8+ years"
                        checked={form.experience === "8p"}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, experience: e.target.value }))
                        }
                      />
                    </div>

                    {touched.experience && errors.experience ? (
                      <p className="text-xs text-red-500 mt-2">
                        {errors.experience}
                      </p>
                    ) : null}
                  </div>

                  {/* Next button */}
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={[
                      "w-full h-[52px] rounded-md font-medium",
                      "bg-[#E8C284] text-[#012B37]",
                      !isValid
                        ? "opacity-50 cursor-not-allowed"
                        : "opacity-100 cursor-pointer",
                    ].join(" ")}
                  >
                    Next
                  </button>

                  <div className="flex justify-end">
                    <span className="text-sm text-gray-600">Step 2/5</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {/* Hide image panel on mobile, show on md+ */}
        <div className="flex relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex-col">
          <img
            src={Frame}
            alt="frame"
            className="absolute"
          />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-12 lg:pt-16 text-left">
            <h1 className="text-4xl lg:text-5xl font-medium text-[#012B37] leading-tight">
              We need your <br /> credentials to verify <br /> your expertise.
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end pb-6 lg:pb-10">
            <img
              src={StepOne}
              alt="image"
              className="w-[88%] max-w-[560px] xl:max-w-[700px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer fixed */}
      <div className="shrink-0">
        <AuthFooter />
      </div>
    </div>
  );
}
