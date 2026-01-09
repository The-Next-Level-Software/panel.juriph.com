import React, { useEffect, useMemo, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepTwo from "../../../assets/steptwo.png";
import AuthFooter from "../../../components/AuthFooter";
import { useNavigate } from "react-router-dom";



export default function ClientStep2() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("juriph_user_type");
    if (saved) setActive(saved);
  }, []);

  const legalOptions = useMemo(
    () => [
      { value: "Family Law", label: "Family Law" },
      { value: "Business Law", label: "Business Law" },
      { value: "Immigration", label: "Immigration" },
      { value: "Criminal Defense", label: "Criminal Defense" },
      { value: "Property Disputes", label: "Property Disputes" },
      { value: "Others", label: "Others" },
    ],
    []
  );

  const urgencyOptions = useMemo(
    () => [
      { value: "Urgent (within 24 hours)", label: "Urgent (within 24 hours)" },
      { value: "Within a week", label: "Within a week" },
      { value: "No rush", label: "No rush" },
    ],
    []
  );

  const [form, setForm] = useState({
    legalType: "",
    description: "",
    urgency: "",
  });

  const [touched, setTouched] = useState({
    legalType: false,
    description: false,
    urgency: false,
  });

  const [errors, setErrors] = useState({});

  const setField = (key, val) => setForm((p) => ({ ...p, [key]: val }));
  const touch = (key) => setTouched((p) => ({ ...p, [key]: true }));

  const validate = (values = form) => {
    const e = {};

    if (!values.legalType)
      e.legalType = "Please select a legal assistance type.";

    const desc = (values.description || "").trim();
    if (!desc) e.description = "Please briefly describe your case.";
    else if (desc.length < 10)
      e.description = "Description must be at least 10 characters.";
    else if (desc.length > 500)
      e.description = "Description must be 500 characters or less.";

    if (!values.urgency) e.urgency = "Please select when you need assistance.";

    return e;
  };

  const isValid = useMemo(() => {
    const e = validate(form);
    return Object.keys(e).length === 0;
  }, [form]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextTouched = { legalType: true, description: true, urgency: true };
    setTouched(nextTouched);

    const e2 = validate(form);
    setErrors(e2);

    if (Object.keys(e2).length === 0) {
      // ✅ success
      onNext?.(form);
      // or do navigate("/client-step-3")
      // console.log("Step2 data:", form);
    }
  };

  const showError = (key) => touched[key] && errors[key];

  const RadioCard = ({ name, value, label, checked, onChange }) => (
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

  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const handleNext = () => {
    // mark everything touched so errors show if user clicks Next
    setTouched({ fullName: true, city: true, state: true, country: true });

    if (!isValid) return;

    // ✅ optional: save step 1 data
    localStorage.setItem("juriph_client_step_1", JSON.stringify(form));

    // ✅ go next step (change route as per your app)
    navigate("/client-welcome/client-step-3");
  };

  const inputBase =
    "w-full h-14 rounded-lg bg-[#F3F4F6] px-5 text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#E8C284]";

  return (
    
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-10 overflow-hidden">
          {/* fixed column height, NO internal scroll */}
          <div className="w-full max-w-3xl items-center flex flex-col">
            {/* Top (Logo) */}
            <div className="flex flex-col items-center pt-8 md:pt-10 ">
              <div className="flex items-center justify-center">
                <img src={Juriph} alt="Juriph logo" className="h-11 sm:h-14 w-auto select-none" />
              </div>
            </div>

            {/* Form area (NO overflow-y-auto) */}
            <div className="flex-1 mt-4 md:mt-6 overflow-hidden">
              <form
                onSubmit={handleSubmit}
                className="w-full px-1 sm:px-2 md:px-5 pb-4"
                autoComplete="off"
              >
                {/* Legal Type */}
                <div className="mt-6 md:mt-8">
                  <h2 className="text-base sm:text-[17px] text-[#012B37]">
                    What type of legal assistance are you looking for?
                  </h2>

                  <div
                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    onBlur={() => {
                      touch("legalType");
                      setErrors(validate(form));
                    }}
                  >
                    {legalOptions.map((opt) => (
                      <RadioCard
                        key={opt.value}
                        name="legalType"
                        value={opt.value}
                        label={opt.label}
                        checked={form.legalType === opt.value}
                        onChange={(ev) => {
                          setField("legalType", ev.target.value);
                          setErrors(validate({ ...form, legalType: ev.target.value }));
                        }}
                      />
                    ))}
                  </div>

                  {showError("legalType") && (
                    <p className="mt-2 text-sm text-red-500">{errors.legalType}</p>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6 md:mt-8">
                  <h2 className="text-base sm:text-[17px] text-[#012B37]">
                    Briefly describe your case or legal issue.
                  </h2>

                  <div className="mt-4">
                    <textarea
                      value={form.description}
                      onChange={(e) => {
                        const value = e.target.value.slice(0, 500);
                        setField("description", value);
                        if (touched.description) setErrors(validate({ ...form, description: value }));
                      }}
                      onBlur={() => {
                        touch("description");
                        setErrors(validate(form));
                      }}
                      rows={4}
                      placeholder="Write here..."
                      className={`w-full rounded-xl bg-[#F5F6F6] p-5 text-sm text-[#012B37] placeholder:text-[#9AA3A7]
                      outline-none border transition
                      ${
                        showError("description")
                          ? "border-red-400 ring-2 ring-red-200"
                          : "border-transparent focus:border-[#E8C284] focus:ring-2 focus:ring-[#E8C284]/40"
                      }`}
                    />

                    <div className="mt-2 flex items-center justify-between">
                      {showError("description") ? (
                        <p className="text-sm text-red-500">{errors.description}</p>
                      ) : (
                        <span className="text-sm text-transparent">.</span>
                      )}

                      <span className="text-xs text-[#9AA3A7]">
                        {form.description.trim().length}/500
                      </span>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="mt-6 md:mt-8">
                  <h2 className="text-base sm:text-[17px] text-[#012B37]">
                    How soon do you need assistance? (Select one)
                  </h2>

                  <div
                    className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    onBlur={() => {
                      touch("urgency");
                      setErrors(validate(form));
                    }}
                  >
                    {urgencyOptions.map((opt) => (
                      <RadioCard
                        key={opt.value}
                        name="urgency"
                        value={opt.value}
                        label={opt.label}
                        checked={form.urgency === opt.value}
                        onChange={(ev) => {
                          setField("urgency", ev.target.value);
                          setErrors(validate({ ...form, urgency: ev.target.value }));
                        }}
                      />
                    ))}
                  </div>

                  {showError("urgency") && (
                    <p className="mt-2 text-sm text-red-500">{errors.urgency}</p>
                  )}
                </div>

                {/* Bottom */}
                <div className="mt-6 md:mt-8">
                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={handleNext}
                    className={`w-full rounded-xl py-4 font-medium text-[#012B37] transition
                      bg-[#E8C284] hover:bg-[#e2b766]
                      ${
                        !isValid
                          ? "opacity-50 cursor-not-allowed hover:bg-[#E8C284]"
                          : "opacity-100 cursor-pointer"
                      }`}
                  >
                    Next
                  </button>

                  <div className="mt-3 flex justify-end">
                    <span className="text-sm text-[#1B1B1B]">Step 2/4</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex flex-col">
          <img
            src={Frame}
            alt="frame"
            className="absolute"
          />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-12 lg:pt-16 text-left">
            <h1 className="text-4xl lg:text-5xl font-medium text-[#012B37] leading-tight">
              Tell us more about <br /> your legal <br /> requirements.
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end pb-6 lg:pb-10">
            <img
              src={StepTwo}
              alt="image"
              className="w-[88%] max-w-[560px] xl:max-w-[700px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Footer stays at bottom */}
      <div className="shrink-0">
        <AuthFooter />
      </div>
    </div>
  );
}
