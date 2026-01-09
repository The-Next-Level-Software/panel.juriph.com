import React, { useMemo, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepFour from "../../../assets/step-four.png";
import AuthFooter from "../../../components/AuthFooter";
import { useNavigate } from "react-router-dom";

export default function ClientStep4() {
  const navigate = useNavigate();

  const [heardAbout, setHeardAbout] = useState(""); // optional
  const [saveCase, setSaveCase] = useState(""); // required: "yes" | "no"

  const [touched, setTouched] = useState({
    heardAbout: false,
    saveCase: false,
  });

  const [errors, setErrors] = useState({});

  const validate = (next = { heardAbout, saveCase }) => {
    const e = {};
    // OPTIONAL: heardAbout (no validation)
    // REQUIRED: saveCase
    if (!next.saveCase) e.saveCase = "Please select Yes or No.";
    return e;
  };

  const isValid = useMemo(() => {
    return Object.keys(validate()).length === 0;
  }, [heardAbout, saveCase]);

  const handleNext = (e) => {
    e.preventDefault();

    const eMap = validate();
    setErrors(eMap);
    setTouched({ heardAbout: true, saveCase: true });

    if (Object.keys(eMap).length > 0) return;

    const payload = {
      heardAbout: heardAbout || null,
      saveCase: saveCase === "yes",
    };

    console.log("Step 4 payload:", payload);
    // navigate("/next-route");
  };

  const CardRadio = ({ name, value, label, selectedValue, onChange }) => {
    const checked = selectedValue === value;

    return (
      <label
        className={`w-full sm:w-[calc(50%-6px)] flex items-center gap-3 px-5 py-4 rounded-xl cursor-pointer select-none
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
          onChange={() => onChange(value)}
        />

        <span className="text-sm text-[#012B37]">{label}</span>
      </label>
    );
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-10">
          <div className="w-full max-w-[720px] py-10 sm:py-12">
            <form onSubmit={handleNext} autoComplete="off">
              {/* Logo */}
              <div className="flex justify-center mb-10">
                <img
                  src={Juriph}
                  alt="Juriph"
                  className="h-10 sm:h-12 w-auto select-none"
                  draggable={false}
                />
              </div>

              {/* Q1 */}
              <div className="mb-10">
                <p className="text-[15px] sm:text-[16px] text-[#0B2B35] mb-4">
                  How did you hear about Juriph?{" "}
                  <span className="text-[#70848B]">(Optional)</span>
                </p>

                <div className="flex flex-wrap gap-3">
                  <CardRadio
                    name="heardAbout"
                    value="google"
                    label="Google"
                    selectedValue={heardAbout}
                    onChange={(v) => {
                      setHeardAbout(v);
                      setTouched((p) => ({ ...p, heardAbout: true }));
                    }}
                  />
                  <CardRadio
                    name="heardAbout"
                    value="social"
                    label="Social Media"
                    selectedValue={heardAbout}
                    onChange={(v) => {
                      setHeardAbout(v);
                      setTouched((p) => ({ ...p, heardAbout: true }));
                    }}
                  />
                  <CardRadio
                    name="heardAbout"
                    value="referral"
                    label="Referral"
                    selectedValue={heardAbout}
                    onChange={(v) => {
                      setHeardAbout(v);
                      setTouched((p) => ({ ...p, heardAbout: true }));
                    }}
                  />
                  <CardRadio
                    name="heardAbout"
                    value="other"
                    label="Other"
                    selectedValue={heardAbout}
                    onChange={(v) => {
                      setHeardAbout(v);
                      setTouched((p) => ({ ...p, heardAbout: true }));
                    }}
                  />
                </div>
              </div>

              {/* Q2 */}
              <div className="mb-6">
                <p className="text-[15px] sm:text-[16px] text-[#0B2B35] mb-4">
                  Would you like to save this case for future edits before
                  posting?
                </p>

                <div className="flex flex-wrap gap-3">
                  <CardRadio
                    name="saveCase"
                    value="yes"
                    label="Yes"
                    selectedValue={saveCase}
                    onChange={(v) => {
                      setSaveCase(v);
                      setTouched((p) => ({ ...p, saveCase: true }));
                      setErrors(validate({ heardAbout, saveCase: v }));
                    }}
                  />
                  <CardRadio
                    name="saveCase"
                    value="no"
                    label="No"
                    selectedValue={saveCase}
                    onChange={(v) => {
                      setSaveCase(v);
                      setTouched((p) => ({ ...p, saveCase: true }));
                      setErrors(validate({ heardAbout, saveCase: v }));
                    }}
                  />
                </div>

                {/* Validation message */}
                {touched.saveCase && errors.saveCase && (
                  <p className="mt-3 text-sm text-red-600">{errors.saveCase}</p>
                )}
              </div>

              {/* Next Button */}
              <button
                type="submit"
                disabled={!isValid}
                onClick={()=>{navigate("/client-dashboard")}}
                className={[
                  "w-full mt-10",
                  "h-12 sm:h-14",
                  "rounded-lg",
                  "bg-[#E7C07B]",
                  "text-[#0B2B35] font-medium",
                  "transition",
                  !isValid
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:opacity-95 cursor-pointer active:scale-[0.99]",
                  "focus:outline-none focus:ring-2 focus:ring-[#0B2B35]/20",
                ].join(" ")}
              >
                Next
              </button>

              {/* Step */}
              <div className="mt-5 flex justify-end">
                <span className="text-sm text-[#0B2B35]">Step 4/4</span>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex flex-col">
          <img src={Frame} alt="frame" className="absolute" />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-12 lg:pt-16 text-left">
            <h1 className="text-4xl lg:text-5xl font-medium text-[#012B37] leading-tight">
              Almost there! Let’s  <br /> wrap this up.
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end pb-6 lg:pb-10">
            <img
              src={StepFour}
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
