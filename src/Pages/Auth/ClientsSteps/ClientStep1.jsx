import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepOne from "../../../assets/step-one.png";
import AuthFooter from "../../../components/AuthFooter";

export default function ClientStep1() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("juriph_user_type");
    if (saved) setActive(saved);
  }, []);

  const [form, setForm] = useState({
    fullName: "",
    city: "",
    state: "",
    country: "",
  });

  const [touched, setTouched] = useState({
    fullName: false,
    city: false,
    state: false,
    country: false,
  });

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const onBlur = (key) => () => setTouched((p) => ({ ...p, [key]: true }));

  const errors = useMemo(() => {
    const e = {};
    const fullName = form.fullName.trim();
    const city = form.city.trim();
    const state = form.state.trim();
    const country = form.country.trim();

    if (!fullName) e.fullName = "Full name is required";
    else if (fullName.length < 3) e.fullName = "Enter a valid full name";

    if (!city) e.city = "City is required";
    if (!state) e.state = "State/Province is required";
    if (!country) e.country = "Country is required";

    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleNext = () => {
    // mark everything touched so errors show if user clicks Next
    setTouched({ fullName: true, city: true, state: true, country: true });

    if (!isValid) return;

    // ✅ optional: save step 1 data
    localStorage.setItem("juriph_client_step_1", JSON.stringify(form));

    // ✅ go next step (change route as per your app)
    navigate("/client-welcome/client-step-2");
  };

  const inputBase =
    "w-full h-14 rounded-lg bg-[#F3F4F6] px-5 text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#E8C284]";

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 py-8 md:py-0">
          {/* Make ONLY left content scroll if needed */}
          <div className="w-full max-w-[700px]  sm:px-10 place-content-center md:h-[calc(100dvh-64px)] md:overflow-y-auto md:py-10">
            {/* Logo */}
            <div className="flex justify-center pt-4">
              <img
                src={Juriph}
                alt="Juriph logo"
                className="h-11 sm:h-14 w-auto select-none"
              />
            </div>

            {/* Form */}
            <div className="mt-10 sm:mt-14">
              {/* Full name */}
              <label className="block text-[15px] sm:text-[18px] text-[#0F172A] mb-3">
                What is your full name?
              </label>
              <input
                value={form.fullName}
                onChange={onChange("fullName")}
                onBlur={onBlur("fullName")}
                placeholder="John Doe"
                className={`${inputBase} ${
                  touched.fullName && errors.fullName
                    ? "ring-2 ring-red-400 focus:ring-red-400"
                    : ""
                }`}
              />
              {touched.fullName && errors.fullName && (
                <p className="mt-2 text-sm text-red-500">{errors.fullName}</p>
              )}

              {/* Location */}
              <div className="mt-8">
                <label className="block text-[15px] sm:text-[18px] text-[#0F172A] mb-3">
                  Where are you located?
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      value={form.city}
                      onChange={onChange("city")}
                      onBlur={onBlur("city")}
                      placeholder="City"
                      className={`${inputBase} ${
                        touched.city && errors.city
                          ? "ring-2 ring-red-400 focus:ring-red-400"
                          : ""
                      }`}
                    />
                    {touched.city && errors.city && (
                      <p className="mt-2 text-sm text-red-500">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <input
                      value={form.state}
                      onChange={onChange("state")}
                      onBlur={onBlur("state")}
                      placeholder="State/Province"
                      className={`${inputBase} ${
                        touched.state && errors.state
                          ? "ring-2 ring-red-400 focus:ring-red-400"
                          : ""
                      }`}
                    />
                    {touched.state && errors.state && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <input
                    value={form.country}
                    onChange={onChange("country")}
                    onBlur={onBlur("country")}
                    placeholder="Country"
                    className={`${inputBase} ${
                      touched.country && errors.country
                        ? "ring-2 ring-red-400 focus:ring-red-400"
                        : ""
                    }`}
                  />
                  {touched.country && errors.country && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.country}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 sm:mt-12 flex flex-col gap-4 pb-6">
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!isValid}
                  className={`w-full h-12 sm:h-14 rounded-lg bg-[#E8C284] text-[#0B2B35] font-medium transition
                ${isValid ? "hover:brightness-[0.98] active:scale-[0.99]" : ""}
              `}
                  style={{
                    opacity: isValid ? 1 : 0.5,
                    cursor: isValid ? "pointer" : "not-allowed",
                  }}
                >
                  Next
                </button>

                <div className="flex justify-end">
                  <span className="text-sm text-[#111827]">Step 1/4</span>
                </div>
              </div>
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
              We need some basic <br />
              details to get started.
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

      {/* Footer stays at bottom */}
      <div className="shrink-0">
        <AuthFooter />
      </div>
    </div>
  );
}
