import React, { useMemo, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepThree from "../../../assets/step-three.png";
import AuthFooter from "../../../components/AuthFooter";
import { useNavigate } from "react-router-dom";

export default function LawyerStep3() {
  const navigate = useNavigate();

  function ExpertisePill({ label, checked, onClick, showError }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          "h-[48px] sm:h-[52px] cursor-pointer w-full sm:w-auto rounded-xl px-4 sm:px-5",
          "flex items-center gap-3 transition bg-[#F4F5F5]",
          checked ? "ring-2 ring-[#E8C284]/55" : "",
          showError ? "ring-2 ring-red-400/60" : "",
        ].join(" ")}
      >
        <span
          className={[
            "h-4 w-4 rounded-full border flex items-center justify-center",
            checked ? "border-[#0B2B33]" : "border-[#9AA3A7]",
          ].join(" ")}
        >
          <span
            className={[
              "h-2 w-2 rounded-full transition",
              checked ? "bg-[#0B2B33]" : "bg-transparent",
            ].join(" ")}
          />
        </span>

        <span className="text-[14px] text-[#0B2B33]">{label}</span>
      </button>
    );
  }

  function FeeTypePill({ label, checked, onClick }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={[
          "h-[44px] w-full cursor-pointer sm:w-auto px-6 rounded-xl",
          "bg-[#F4F5F5] flex items-center gap-3 transition",
          checked ? "ring-2 ring-[#E8C284]/55" : "",
        ].join(" ")}
      >
        <span
          className={[
            "h-4 w-4 rounded-full border flex items-center justify-center",
            checked ? "border-[#0B2B33]" : "border-[#9AA3A7]",
          ].join(" ")}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              checked ? "bg-[#0B2B33]" : "bg-transparent"
            }`}
          />
        </span>
        <span className="text-[14px] text-[#0B2B33]">{label}</span>
      </button>
    );
  }

  const areas = useMemo(
    () => [
      "Family Law",
      "Business Law",
      "Intellectual Property",
      "Immigration",
      "Criminal Law",
      "Corporate Law",
      "Others",
    ],
    []
  );

  const [form, setForm] = useState({
    expertise: [],
    preferredCases: "",
    feeType: "hourly",
    feeFrom: "500",
    feeTo: "500",
  });

  const [touched, setTouched] = useState({
    expertise: false,
    preferredCases: false,
    feeType: false,
    feeFrom: false,
    feeTo: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const markTouched = (key) =>
    setTouched((p) => ({ ...p, [key]: true }));

  const toggleExpertise = (label) => {
    markTouched("expertise");
    setForm((p) => ({
      ...p,
      expertise: p.expertise.includes(label)
        ? p.expertise.filter((x) => x !== label)
        : [...p.expertise, label],
    }));
  };

  const setValue = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = (v) => {
    const e = {};
    if (!v.expertise.length) {
      e.expertise = "Please select at least one area of expertise.";
    }

    const isNum = (s) => /^\d+(\.\d+)?$/.test(s);
    if (v.feeFrom && !isNum(v.feeFrom)) e.feeFrom = "Enter a valid number.";
    if (v.feeTo && !isNum(v.feeTo)) e.feeTo = "Enter a valid number.";
    if (isNum(v.feeFrom) && isNum(v.feeTo) && +v.feeFrom > +v.feeTo) {
      e.feeTo = "To must be greater than or equal to From.";
    }
    return e;
  };

  const errors = validate(form);
  const isValid = Object.keys(errors).length === 0;
  const showError = (k) => (submitted || touched[k]) && errors[k];

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched((p) => ({ ...p, expertise: true, feeFrom: true, feeTo: true }));
    if (!isValid) return;
  };

  const handleNext = () => {
    setTouched((p) => ({ ...p, expertise: true, feeFrom: true, feeTo: true }));
    if (!isValid) return;
    localStorage.setItem("juriph_Lawyer_step_3", JSON.stringify(form));
    navigate("/lawyer-welcome/lawyer-step-4");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="w-full flex justify-center px-4 sm:px-6 md:px-10 overflow-y-auto">
          <div className="w-full max-w-[520px] py-10">
            <div className="flex justify-center mb-8 sm:mb-10">
              <img src={Juriph} alt="Juriph" className="h-12 sm:h-14" />
            </div>

            <form onSubmit={onSubmit}>
              <h2 className="text-[15px] sm:text-[16px]  mb-4">
                What are your areas of expertise? (Select one or more)
              </h2>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                {areas.map((label) => (
                  <ExpertisePill
                    key={label}
                    label={label}
                    checked={form.expertise.includes(label)}
                    onClick={() => toggleExpertise(label)}
                    showError={!!showError("expertise")}
                  />
                ))}
              </div>

              {showError("expertise") && (
                <p className="mt-2 text-[13px] text-red-500">
                  {errors.expertise}
                </p>
              )}

              <div className="mt-8">
                <div className="flex gap-2 mb-3">
                  <h3 className="text-[15px] sm:text-[16px] ">
                    What type of legal cases do you prefer?
                  </h3>
                  <span className="text-[13px] text-[#95A1A6]">(Optional)</span>
                </div>

                <div className="rounded-xl bg-[#F4F5F5] px-4 py-4">
                  <input
                    value={form.preferredCases}
                    onChange={setValue("preferredCases")}
                    placeholder="Drafting contracts, Legal disputes..."
                    className="w-full bg-transparent outline-none text-[14px]"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-[15px] sm:text-[16px] mb-4">
                  Fee Range
                </h3>

                <div className="flex flex-wrap gap-3 mb-5">
                  <FeeTypePill
                    label="Hourly"
                    checked={form.feeType === "hourly"}
                    onClick={() => setForm((p) => ({ ...p, feeType: "hourly" }))}
                  />
                  <FeeTypePill
                    label="Per Case"
                    checked={form.feeType === "per_case"}
                    onClick={() =>
                      setForm((p) => ({ ...p, feeType: "per_case" }))
                    }
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["feeFrom", "feeTo"].map((k, i) => (
                    <div key={k}>
                      <label className="text-[13px] block mb-2">
                        {i === 0 ? "From" : "To"}
                      </label>
                      <div className="rounded-xl bg-[#F4F5F5] px-4 py-4 flex items-center gap-2">
                        <span>$</span>
                        <input
                          value={form[k]}
                          onChange={setValue(k)}
                          className="w-full bg-transparent outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                onClick={handleNext}
                disabled={!isValid}
                className="w-full h-[52px] disabled:cursor-not-allowed cursor-pointer rounded-md bg-[#E8C284] mt-8 font-medium disabled:opacity-50"
              >
                Next
              </button>

              <div className="flex justify-end mt-4">
                <span className="text-[13px]">Step 3/5</span>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex-col min-h-0">
          <img src={Frame} alt="frame" className="absolute" />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-10 lg:pt-14 text-left">
            <h1 className="text-3xl lg:text-5xl font-medium text-[#012B37] leading-tight">
               Tell us about your <br /> expertise and <br /> services.
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end ">
            <img
              src={StepThree}
              alt="image"
              className="w-[70%] max-w-[560px] xl:max-w-[700px]  object-contain"
            />
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
