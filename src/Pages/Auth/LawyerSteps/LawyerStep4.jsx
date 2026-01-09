import React, { useMemo, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepFour from "../../../assets/step-four.png";
import AuthFooter from "../../../components/AuthFooter";
import { useNavigate } from "react-router-dom";


export default function LawyerStep4({ onNext }) {

const navigate = useNavigate();

  function OptionCard({ label, checked, onClick }) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`h-[52px] cursor-pointer rounded-xl px-4 flex items-center justify-center
        text-[14px] font-medium transition border
        ${
          checked
            ? "bg-[#F4F5F5] border-[#E8C284] ring-2 ring-[#E8C284]/40"
            : "bg-[#F4F5F5] border-transparent hover:border-[#E8C284]/60"
        }
      `}
      >
        <span className="flex items-center gap-3">
          {/* radio */}
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

          <span className="text-[#012B37]">{label}</span>
        </span>
      </button>
    );
  }

  const caseOptions = useMemo(
    () => [
      { label: "1 - 2", value: "1_2" },
      { label: "3 - 5", value: "3_5" },
      { label: "6 - 10", value: "6_10" },
      { label: "No limit", value: "no_limit" },
    ],
    []
  );

  const workOptions = useMemo(
    () => [
      { label: "Text Chat", value: "text_chat" },
      { label: "Video/Audio Call", value: "video_audio" },
      { label: "In-person (if possible)", value: "in_person" },
      { label: "Flexible", value: "flexible" },
    ],
    []
  );

  const [form, setForm] = useState({
    casesAtATime: "", // required
    preferredWork: "", // required
    scheduling: "", // optional
  });

  const [touched, setTouched] = useState({
    casesAtATime: false,
    preferredWork: false,
    scheduling: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const validate = (next = form) => {
    const e = {};
    if (!next.casesAtATime) e.casesAtATime = "Please select one option.";
    if (!next.preferredWork) e.preferredWork = "Please select one option.";
    return e;
  };

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const markTouched = (key) => setTouched((p) => ({ ...p, [key]: true }));
  const showError = (key) => (submitted || touched[key]) && errors[key];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    // ✅ mark required fields touched so errors appear
    setTouched((p) => ({ ...p, casesAtATime: true, preferredWork: true }));

    const e2 = validate(form);
    if (Object.keys(e2).length) return;

    onNext?.(form);


    
  };

   const handleNext = () => {
    // mark everything touched so errors show if user clicks Next
   setTouched((p) => ({ ...p, casesAtATime: true, preferredWork: true }));

    if (!isValid) return;

    // ✅ optional: save step 1 data
    localStorage.setItem("juriph_Lawyer_step_4", JSON.stringify(form));

    // ✅ go next step (change route as per your app)
    navigate("/lawyer-welcome/lawyer-step-5");

  };

  return (
    <div className="sm:h-[100dvh] overflow-y-scroll flex flex-col bg-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-10 min-h-0">
          <div className="min-h-0 bg-white flex flex-col">
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="w-full max-w-[680px]">
                {/* Logo */}
                <div className="flex justify-center pt-10 sm:pt-12 mb-10">
                  <img
                    src={Juriph}
                    alt="Juriph"
                    className="h-12 sm:h-14 w-auto select-none"
                    draggable={false}
                  />
                </div>

                <form onSubmit={handleSubmit} autoComplete="off">
                  {/* Q1 */}
                  <div className="mb-9">
                    <p className="text-[15px] sm:text-[16px] text-[#012B37] mb-4">
                      How many cases can you take at a time? (Select one)
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {caseOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          checked={form.casesAtATime === opt.value}
                          onClick={() => {
                            setForm((p) => ({ ...p, casesAtATime: opt.value }));
                            markTouched("casesAtATime");
                          }}
                        />
                      ))}
                    </div>

                    {showError("casesAtATime") && (
                      <p className="mt-2 text-[12px] text-red-600">
                        {errors.casesAtATime}
                      </p>
                    )}
                  </div>

                  {/* Q2 */}
                  <div className="mb-9">
                    <p className="text-[15px] sm:text-[16px] text-[#012B37] mb-4">
                      What’s your preferred way to work with a lawyer? (Select
                      one)
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {workOptions.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          checked={form.preferredWork === opt.value}
                          onClick={() => {
                            setForm((p) => ({
                              ...p,
                              preferredWork: opt.value,
                            }));
                            markTouched("preferredWork");
                          }}
                        />
                      ))}
                    </div>

                    {showError("preferredWork") && (
                      <p className="mt-2 text-[12px] text-red-600">
                        {errors.preferredWork}
                      </p>
                    )}
                  </div>

                  {/* Q3 */}
                  <div className="mb-10">
                    <p className="text-[15px] sm:text-[16px] text-[#012B37] mb-4">
                      Do you have any scheduling preferences? (Optional)
                    </p>

                    <textarea
                      value={form.scheduling}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, scheduling: e.target.value }))
                      }
                      onBlur={() => markTouched("scheduling")}
                      placeholder="I’m available weekdays 9 AM - 5 PM EST."
                      rows={2}
                      className="w-full resize-none rounded-xl bg-[#F4F5F5] px-4 py-4 text-[14px] text-[#0B2B33] placeholder:text-[#9AA3A7] outline-none focus:ring-2 focus:ring-[#E8C284]/60"
                    />
                  </div>

                  {/* Next */}
                  <button
                    type="submit"
                    disabled={!isValid}
                    onClick={handleNext}
                    className={[
                      "w-full h-[54px] rounded-xl font-medium transition",
                      "bg-[#E8C284] text-[#012B37]",
                      !isValid
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:brightness-[0.98] cursor-pointer",
                    ].join(" ")}
                  >
                    Next
                  </button>

                  {/* Step */}
                  <div className="flex justify-end pt-4 pb-10">
                    <span className="text-[13px] text-[#0B2B33]/80">
                      Step 4/5
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex-col min-h-0">
          <img src={Frame} alt="frame" className="absolute" />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-10 lg:pt-14 text-left">
            <h1 className="text-3xl lg:text-5xl font-medium text-[#012B37] leading-tight">
              Let us know when <br />  you’re available.
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
      <div className="shrink-0">
        <AuthFooter />
      </div>
    </div>
  );
}
