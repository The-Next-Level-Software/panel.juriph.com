import React, { useMemo, useRef, useState } from "react";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import StepFive from "../../../assets/step-five.png";   
import AuthFooter from "../../../components/AuthFooter";
import { useNavigate } from "react-router-dom";

export default function LawyerStep5({ onNext }) {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    bio: "",
    profilePic: null, 
    ready: "", 
  });

  const [touched, setTouched] = useState({
    bio: false,
    profilePic: false,
    ready: false,
  });

  const [errors, setErrors] = useState({});

  const allowedTypes = useMemo(() => ["image/jpeg", "image/png"], []);
  const maxBytes = 5 * 1024 * 1024; // 5MB 
  const markTouched = (key) => setTouched((p) => ({ ...p, [key]: true }));

  const validate = (next = form) => {
    const e = {};

    // ✅ Bio is OPTIONAL (no validation)

    // ✅ Profile picture OPTIONAL, but if provided must be JPG/PNG and within size
    if (next.profilePic) {
      if (!allowedTypes.includes(next.profilePic.type)) {
        e.profilePic = "Only JPG or PNG is allowed.";
      } else if (next.profilePic.size > maxBytes) {
        e.profilePic = "File size must be 5MB or less.";
      }
    }

    // ✅ Required: ready yes/no
    if (!next.ready) e.ready = "Please select Yes or No.";

    return e;
  };

  const isValid = useMemo(() => Object.keys(validate()).length === 0, [form]); // live validity

  const setField = (key, value) => {
    const next = { ...form, [key]: value };
    setForm(next);
    setErrors(validate(next));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const nextTouched = { bio: true, profilePic: true, ready: true };
    setTouched(nextTouched);

    const eMap = validate(form);
    setErrors(eMap);

    if (Object.keys(eMap).length) return;

    // ✅ pass data forward
    const payload = {
      bio: form.bio.trim(),
      profilePic: form.profilePic,
      ready: form.ready,
    };

    if (onNext) onNext(payload);
    else navigate("/lawyer-dashboard"); // change route if needed
  };

  const RadioCard = ({ label, value }) => {
    const checked = form.ready === value;
    return (
      <button
        type="button"
        onClick={() => {
          setField("ready", value);
          markTouched("ready");
        }}
        className={`h-[52px] w-[120px] cursor-pointer rounded-xl px-4 flex items-center justify-center gap-3
          text-[14px] font-medium transition border bg-[#F4F5F5]
          ${
            checked
              ? "border-[#E8C284] ring-2 ring-[#E8C284]/40"
              : "border-transparent hover:border-[#E8C284]/60"
          }`}
      >
        <span
          className={`h-4 w-4 rounded-full border flex items-center justify-center
            ${checked ? "border-[#012B37]" : "border-[#9AA3A7]"}`}
        >
          <span
            className={`h-2 w-2 rounded-full transition
              ${checked ? "bg-[#012B37]" : "bg-transparent"}`}
          />
        </span>
        <span className="text-[#012B37]">{label}</span>
      </button>
    );
  };

  return (
    <div className="sm:min-h-[100dvh] flex flex-col bg-white">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 min-h-0">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-10">
          <div className="w-full max-w-[520px]">
            {/* Logo */}
            <div className="flex justify-center pt-10 sm:pt-12 mb-8 sm:mb-10">
              <img
                src={Juriph}
                alt="Juriph"
                className="h-10 sm:h-12 w-auto select-none"
                draggable={false}
              />
            </div>

            <form onSubmit={onSubmit} autoComplete="off" className="space-y-0">
              {/* Bio */}
              <p className="text-[#012B37] text-[14px] sm:text-[15px] mb-3">
                Would you like to add a brief bio for your profile? (Optional)
              </p>

              <textarea
                value={form.bio}
                onChange={(e) => setField("bio", e.target.value)}
                onBlur={() => markTouched("bio")}
                placeholder="I'm a seasoned business lawyer with 5+ years of experience helping startups and SMEs navigate legal challenges."
                className="w-full min-h-[74px] resize-none rounded-lg bg-[#F4F5F5]
                  px-4 py-3 text-[14px] text-[#012B37] placeholder:text-[#7A868B]
                  outline-none border border-transparent focus:border-[#E8C284]"
              />

              <div className="h-7" />

              {/* Upload */}
              <p className="text-[#012B37] text-[14px] sm:text-[15px] mb-3">
                Upload a profile picture (Optional).
              </p>

              <input
                ref={fileRef}
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setField("profilePic", file);
                  markTouched("profilePic");
                }}
              />

              <button
                type="button"
                onClick={() => {
                  fileRef.current?.click();
                  markTouched("profilePic");
                }}
                className="h-[44px] w-[120px] cursor-pointer rounded-md bg-[#F4F5F5]
                  flex items-center justify-center gap-2 text-[#012B37]
                  border border-transparent hover:border-[#E8C284]/60 transition"
              >
                <span className="inline-flex items-center justify-center">
                  {/* upload icon */}
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
                      d="M5 20h14"
                      stroke="#012B37"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <span className="text-[14px] font-medium">Upload</span>
              </button>

              {/* file name + error */}
              <div className="mt-2 space-y-1">
                <p className="text-[13px] text-[#7A868B]">
                  Supported formats: JPG, PNG
                </p>

                {form.profilePic?.name ? (
                  <p className="text-[13px] text-[#012B37]">
                    Selected:{" "}
                    <span className="font-medium">{form.profilePic.name}</span>
                  </p>
                ) : null}

                {touched.profilePic && errors.profilePic ? (
                  <p className="text-[13px] text-red-600">
                    {errors.profilePic}
                  </p>
                ) : null}
              </div>

              <div className="h-7" />

              {/* Ready */}
              <p className="text-[#012B37] text-[14px] sm:text-[15px] mb-4">
                Are you ready to submit your profile for approval?
              </p>

              <div className="flex items-center gap-4">
                <RadioCard label="Yes" value="yes" />
                <RadioCard label="No" value="no" />
              </div>

              {touched.ready && errors.ready ? (
                <p className="mt-2 text-[13px] text-red-600">{errors.ready}</p>
              ) : (
                <div className="h-5" />
              )}

              {/* Next */}
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={!isValid}
                  className={`w-full h-[52px] rounded-xl font-medium transition
                    bg-[#E8C284] text-[#012B37]
                    ${
                      !isValid
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:opacity-95 cursor-pointer"
                    }`}
                >
                  Next
                </button>

                <div className="mt-3 flex items-center justify-end">
                  <p className="text-[14px] text-[#012B37]">Step 5/5</p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex mt-5 sm:mt-0 relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex-col min-h-0">
          <img src={Frame} alt="frame" className="absolute" />

          <div className="relative z-10 px-6 lg:px-12 xl:px-20 pt-10 lg:pt-14 text-left">
            <h1 className="text-3xl lg:text-5xl font-medium text-[#012B37] leading-tight">
              Add the finishing <br /> touches to your profile. 
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end pb-6 lg:pb-10">
            <img
              src={StepFive}
              alt="image"
              className="w-[88%] max-w-[560px] xl:max-w-[800px] h-auto object-contain"
            />
          </div>
        </div>
      </div>
      {/* Footer (if you use it on all auth screens) */}
      <div className="shrink-0">
        <AuthFooter />
      </div>
    </div>
  );
}
