import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Juriph from "../../assets/Juriph Logo.png";
import Google from "../../assets/googleicons.png";
import { Eye, EyeOff } from "lucide-react";
import AuthFooter from "../../components/AuthFooter";
import Frame from "../../assets/Frame.png";
import Law from "../../assets/signupimage.png";

export default function SignUp() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    country: "",
    language: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    country: false,
    language: false,
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(""); // ✅ added
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const getPasswordErrors = (pwd) => {
    const list = [];
    if (!pwd) return ["Password is required"];
    if (pwd.length < 8) list.push("At least 8 characters");
    if (!/[A-Z]/.test(pwd)) list.push("At least 1 uppercase letter (A-Z)");
    if (!/[a-z]/.test(pwd)) list.push("At least 1 lowercase letter (a-z)");
    if (!/\d/.test(pwd)) list.push("At least 1 number (0-9)");
    if (!/[^A-Za-z0-9]/.test(pwd)) list.push("At least 1 special character");
    return list;
  };

  const validateAll = (values = form) => {
    const newErrors = {};

    const trimmedEmail = values.email.trim();
    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!emailRegex.test(trimmedEmail))
      newErrors.email = "Enter a valid email address";

    const pwdIssues = getPasswordErrors(values.password);
    if (pwdIssues.length) newErrors.password = pwdIssues;

    if (!values.confirmPassword)
      newErrors.confirmPassword = "Please confirm your password";
    else if (values.confirmPassword !== values.password)
      newErrors.confirmPassword = "Passwords do not match";

    if (!values.country) newErrors.country = "Please select a country";
    if (!values.language) newErrors.language = "Please select a language";

    setErrors(newErrors);
    return newErrors;
  };

  const setField = (key, value) => {
    const next = { ...form, [key]: value };
    setForm(next);

    if (touched[key]) validateAll(next);
  };

  const markTouched = (key) => {
    setTouched((p) => ({ ...p, [key]: true }));
    validateAll();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(""); // ✅ reset

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      country: true,
      language: true,
    });

    const allErrors = validateAll();
    if (Object.keys(allErrors).length > 0) return;

    // ✅ payload you will send to api
    const payload = {
      email: form.email.trim(),
      password: form.password,
      country: form.country,
      language: form.language,
    };

    console.log("signup payload:", payload);

    // TODO: call signup api
    // const res = await signup(payload);

   
    const userType = (localStorage.getItem("juriph_user_type") || "").toLowerCase();

    if (userType === "client") {
      navigate("/client-welcome"); // 
    } else if (userType === "lawyer") {
      navigate("/lawyer-welcome"); // 
    } else {
      setSubmitError("User type not found. Please select Client or Lawyer first.");
      
    }
  };

  const inputBase =
    "w-full bg-[#F5F6F6] rounded-lg px-4 py-3 text-sm outline-none 0 ring-1 ring-transparent focus:ring-2";
  const inputOk = "focus:ring-[#E8C284]";
  const inputErr = "ring-red-500 focus:ring-red-500";

  const showFieldError = (key) => touched[key] && errors[key];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="flex justify-center px-4 py-10 overflow-y-auto">
          <div className="w-full max-w-md p-6 sm:p-8">
            <div className="flex justify-center">
              <img src={Juriph} alt="Juriph logo" className="w-32 h-auto" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#1D2021] mt-6">
              Create Account
            </h1>

            {/* Google */}
            <button
              type="button"
              className="w-full mt-7 flex p-3 border rounded-lg items-center gap-2 cursor-pointer justify-center border-[#E8C284] hover:bg-[#FCF8F0] transition"
              onClick={() => {
                // TODO: google sign in
              }}
            >
              <img src={Google} alt="icon" className="h-5 w-5" />
              Sign up with Google
            </button>

            <p className="text-center mt-5 text-sm text-gray-600">
              -or sign up with email
            </p>

            {/* ✅ submit error message */}
            {submitError ? (
              <div className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-red-600 text-sm">{submitError}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5 mt-5">
              {/* Email */}
              <div>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  onBlur={() => markTouched("email")}
                  placeholder="Enter Email Address"
                  className={`${inputBase} ${
                    showFieldError("email") ? inputErr : inputOk
                  }`}
                />
                {showFieldError("email") ? (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                ) : null}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => setField("password", e.target.value)}
                    onBlur={() => markTouched("password")}
                    placeholder="Enter Password"
                    className={`${inputBase} pr-12 ${
                      showFieldError("password") ? inputErr : inputOk
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#012B37] transition"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {showFieldError("password") ? (
                  <ul className="mt-2 text-xs text-red-500 space-y-1 list-disc pl-5">
                    {(Array.isArray(errors.password)
                      ? errors.password
                      : [errors.password]
                    ).map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                ) : (
                  form.password.length > 0 && (
                    <p className="text-[11px] text-gray-500 mt-2">
                      Use 8+ chars with upper, lower, number & special.
                    </p>
                  )
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={(e) => setField("confirmPassword", e.target.value)}
                    onBlur={() => markTouched("confirmPassword")}
                    placeholder="Re-Enter Password"
                    className={`${inputBase} pr-12 ${
                      showFieldError("confirmPassword") ? inputErr : inputOk
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#012B37] transition"
                    aria-label={showConfirm ? "Hide password" : "Show password"}
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {showFieldError("confirmPassword") ? (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              {/* Country */}
              <div>
                <select
                  value={form.country}
                  onChange={(e) => setField("country", e.target.value)}
                  onBlur={() => markTouched("country")}
                  className={`${inputBase} text-gray-500 cursor-pointer ${
                    showFieldError("country") ? inputErr : inputOk
                  }`}
                >
                  <option value="" disabled>
                    Select country
                  </option>
                  <option value="pk">Pakistan</option>
                </select>
                {showFieldError("country") ? (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                ) : null}
              </div>

              {/* Language */}
              <div>
                <select
                  value={form.language}
                  onChange={(e) => setField("language", e.target.value)}
                  onBlur={() => markTouched("language")}
                  className={`${inputBase} text-gray-500 cursor-pointer ${
                    showFieldError("language") ? inputErr : inputOk
                  }`}
                >
                  <option value="" disabled>
                    Preferred Language
                  </option>
                  <option value="en">English</option>
                  <option value="ur">Urdu</option>
                </select>
                {showFieldError("language") ? (
                  <p className="text-red-500 text-xs mt-1">{errors.language}</p>
                ) : null}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 p-3 rounded-lg font-medium bg-[#E8C284] cursor-pointer text-[#012B37] hover:bg-[#e2b766] transition"
              >
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/sign-in")}
                className="font-medium text-[#DFA458] cursor-pointer hover:underline"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex flex-col min-h-[420px] md:min-h-full">
          <img src={Frame} alt="frame" className="absolute" />

          <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 pt-12 sm:pt-20 md:pt-24 lg:pt-28 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#012B37] leading-tight">
              Your Legal Solutions,
              <br className="hidden sm:block" />
              Just a Signup Away
            </h1>

            <p className="text-[#012B37] mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
              Discover how we simplify finding and offering legal expertise globally.
            </p>
          </div>

          <div className="relative flex-1 flex justify-center items-end">
            <img
              src={Law}
              alt="law"
              className="w-[90%] max-w-130 md:max-w-170 h-auto"
            />
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
