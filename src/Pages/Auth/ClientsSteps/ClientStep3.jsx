import React, { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepThree from "../../../assets/step-three.png";
import AuthFooter from "../../../components/AuthFooter";

export default function ClientStep3() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("juriph_user_type");
    if (saved) setActive(saved);
  }, []);

  const fileRef = useRef(null);

  const [preferred, setPreferred] = useState(""); // required
  const [budgetFrom, setBudgetFrom] = useState("500");
  const [budgetTo, setBudgetTo] = useState("500");
  const [fileName, setFileName] = useState("");

  const [errors, setErrors] = useState({
    preferred: "",
    budget: "",
    file: "",
  });

  const options = useMemo(
    () => [
      { id: "text_chat", label: "Text Chat" },
      { id: "call", label: "Video/Audio Call" },
      { id: "in_person", label: "In-person (if possible)" },
      { id: "no_preference", label: "No Preference" },
    ],
    []
  );

  const onPickFile = () => fileRef.current?.click();

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    setErrors((p) => ({ ...p, file: "" }));

    if (!f) {
      setFileName("");
      return;
    }

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
    ];

    const ext = f.name.split(".").pop()?.toLowerCase();
    const allowedExt = ["pdf", "doc", "docx", "png"];

    if ((!allowed.includes(f.type) && !allowedExt.includes(ext)) || !ext) {
      setFileName("");
      e.target.value = "";
      setErrors((p) => ({
        ...p,
        file: "Unsupported file. Use PDF, DOC, DOCX, or PNG.",
      }));
      return;
    }

    const maxBytes = 5 * 1024 * 1024;
    if (f.size > maxBytes) {
      setFileName("");
      e.target.value = "";
      setErrors((p) => ({
        ...p,
        file: "File is too large. Max 5MB allowed.",
      }));
      return;
    }

    setFileName(f.name);
  };

  const validate = () => {
    const nextErrors = { preferred: "", budget: "", file: "" };

    if (!preferred) nextErrors.preferred = "Please select one option.";

    const fromStr = (budgetFrom ?? "").toString().trim();
    const toStr = (budgetTo ?? "").toString().trim();
    const fromNum = fromStr ? Number(fromStr) : null;
    const toNum = toStr ? Number(toStr) : null;

    if ((fromStr && Number.isNaN(fromNum)) || (toStr && Number.isNaN(toNum))) {
      nextErrors.budget = "Budget must be a valid number.";
    } else if (fromNum !== null && toNum !== null && fromNum > toNum) {
      nextErrors.budget = '"From" must be less than or equal to "To".';
    }

    if (errors.file) nextErrors.file = errors.file;

    setErrors(nextErrors);
    return !nextErrors.preferred && !nextErrors.budget && !nextErrors.file;
  };

  const isValid = useMemo(() => {
    if (!preferred) return false;

    const fromStr = (budgetFrom ?? "").toString().trim();
    const toStr = (budgetTo ?? "").toString().trim();
    const fromNum = fromStr ? Number(fromStr) : null;
    const toNum = toStr ? Number(toStr) : null;

    const budgetInvalid =
      (fromStr && Number.isNaN(fromNum)) ||
      (toStr && Number.isNaN(toNum)) ||
      (fromNum !== null && toNum !== null && fromNum > toNum);

    if (budgetInvalid) return false;
    if (errors.file) return false;
    return true;
  }, [preferred, budgetFrom, budgetTo, errors.file]);

  const handleNext = () => {
    const ok = validate();
    if (!ok) return;

    const form = {
      preferred,
      budgetFrom: budgetFrom ? Number(budgetFrom) : null,
      budgetTo: budgetTo ? Number(budgetTo) : null,
      fileName,
    };

    localStorage.setItem("juriph_client_step_3", JSON.stringify(form));
    navigate("/client-welcome/client-step-4");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* Main */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
        {/* LEFT */}
        <div className="w-full items-center flex justify-center px-4 sm:px-6 md:px-10">
         
          <div className="w-full max-w-2xl flex flex-col min-h-0">
            {/* Form scroll area (desktop only) */}
            <div className="flex-1 md:pr-2">
              <form
                onSubmit={onSubmit}
                className="w-full py-6 sm:py-8 md:py-10"
                autoComplete="off"
              >
                {/* Logo */}
                <div className="flex justify-center mb-5 sm:mb-6">
                  <img
                    src={Juriph}
                    alt="Juriph"
                    className="h-11 sm:h-14 w-auto select-none"
                  />
                </div>

                {/* Question */}
                <div className="text-[15px] sm:text-[17px] md:text-[18px] mt-6 sm:mt-8 md:mt-10 text-[#012B37] mb-2">
                  What’s your preferred way to work with a lawyer? (Select one)
                </div>

                {errors.preferred ? (
                  <div className="text-xs text-red-600 mb-3">
                    {errors.preferred}
                  </div>
                ) : (
                  <div className="mb-3" />
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {options.map((opt) => {
                    const isActive = preferred === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => {
                          setPreferred(opt.id);
                          setErrors((p) => ({ ...p, preferred: "" }));
                        }}
                        className={[
                          "w-full flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3",
                          "bg-[#F5F6F6] text-[#012B37] text-sm sm:text-[14px]",
                          "border transition",
                          isActive
                            ? "border-[#E8C284] ring-2 ring-[#E8C284]/60"
                            : "border-transparent hover:border-[#E8C284]/60",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-4 w-4 rounded-full border flex items-center justify-center shrink-0",
                            isActive ? "border-[#012B37]" : "border-gray-400",
                          ].join(" ")}
                          aria-hidden="true"
                        >
                          {isActive ? (
                            <span className="h-2 w-2 rounded-full bg-[#012B37]" />
                          ) : null}
                        </span>
                        <span className="text-left">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Budget */}
                <div className="text-[15px] sm:text-[17px] md:text-[18px] mt-8 sm:mt-10 text-[#012B37] mb-4">
                  Do you have a specific budget range in mind? (Optional)
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm text-gray-500 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#012B37]">
                        $
                      </span>
                      <input
                        value={budgetFrom}
                        onChange={(e) => {
                          const v = e.target.value.replace(/[^\d]/g, "");
                          setBudgetFrom(v);
                          setErrors((p) => ({ ...p, budget: "" }));
                        }}
                        inputMode="numeric"
                        placeholder="500"
                        className="w-full bg-[#F5F6F6] rounded-lg px-7 py-3 text-sm text-[#012B37]
                          focus:outline-none focus:ring-2 focus:ring-[#E8C284]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 mb-2">To</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#012B37]">
                        $
                      </span>
                      <input
                        value={budgetTo}
                        onChange={(e) => {
                          const v = e.target.value.replace(/[^\d]/g, "");
                          setBudgetTo(v);
                          setErrors((p) => ({ ...p, budget: "" }));
                        }}
                        inputMode="numeric"
                        placeholder="500"
                        className="w-full bg-[#F5F6F6] rounded-lg px-7 py-3 text-sm text-[#012B37]
                          focus:outline-none focus:ring-2 focus:ring-[#E8C284]"
                      />
                    </div>
                  </div>
                </div>

                {errors.budget ? (
                  <div className="text-xs text-red-600 mb-4">
                    {errors.budget}
                  </div>
                ) : (
                  <div className="mb-4" />
                )}

                {/* Upload */}
                <div className="text-[15px] sm:text-[17px] md:text-[18px] mt-8 sm:mt-10 text-[#012B37] mb-3">
                  Do you have any supporting documents to share? (Optional)
                </div>

                <div className="mb-7">
                  <input
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.png"
                    onChange={onFileChange}
                    className="hidden"
                  />

                  <div className="flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={onPickFile}
                      className="inline-flex cursor-pointer items-center gap-2 px-4 py-2.5 rounded-lg
                        bg-[#F5F6F6] text-[#012B37] text-sm border border-transparent
                        hover:border-[#E8C284]/70 transition"
                    >
                      Upload
                    </button>

                    {fileName ? (
                      <span className="text-sm text-[#012B37] truncate w-full sm:w-auto sm:max-w-[340px] max-w-full">
                        {fileName}
                      </span>
                    ) : null}
                  </div>

                  <div className="mt-3 text-xs text-gray-500">
                    Supported formats: PDF, DOC, PNG
                  </div>

                  {errors.file ? (
                    <div className="mt-2 text-xs text-red-600">
                      {errors.file}
                    </div>
                  ) : null}
                </div>

                {/* Next */}
                <button
                  type="button"
                  disabled={!isValid}
                  onClick={handleNext}
                  className={[
                    "w-full mt-4 sm:mt-5 p-3 rounded-lg font-medium transition-all",
                    isValid
                      ? "bg-[#E8C284] text-[#012B37] opacity-100 cursor-pointer hover:bg-[#e2b766]"
                      : "bg-[#E8C284] text-[#012B37] opacity-50 cursor-not-allowed",
                  ].join(" ")}
                >
                  Next
                </button>

                <div className="mt-3 text-right text-sm text-gray-700">
                  Step 3/4
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT (hidden on mobile, shown on md+) */}
        <div className="flex relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex-col min-h-0">
          <img src={Frame} alt="frame" className="absolute " />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-10 lg:pt-14 text-left">
            <h1 className="text-3xl lg:text-5xl font-medium text-[#012B37] leading-tight">
              Your preferences help <br /> us personalize your <br /> experience.
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end pb-6 lg:pb-10">
            <img
              src={StepThree}
              alt="image"
              className="w-[88%] max-w-[560px] xl:max-w-[700px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0">
        <AuthFooter />
      </div>
    </div>
  );
}
