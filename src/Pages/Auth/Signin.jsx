import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Juriph from "../../assets/Juriph Logo.png";
import Google from "../../assets/googleicons.png";
import { Eye, EyeOff } from "lucide-react";
import AuthFooter from "../../components/AuthFooter";
import Frame from "../../assets/Frame.png";
import Law from "../../assets/signinimage.png";

export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const newErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) newErrors.email = "Email is required";
    else if (!emailRegex.test(trimmedEmail))
      newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log({ email: email.trim(), password });
  };

  const inputBase =
    "w-full bg-[#F5F6F6] rounded-lg px-4 py-3 text-sm outline-none ring-1 ring-transparent focus:ring-2";
  const inputOk = "focus:ring-[#E8C284]";
  const inputErr = "ring-red-500 focus:ring-red-500";

  return (
     <div className="min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="flex justify-center px-4 py-10 overflow-y-auto">
          <div className="w-full max-w-md p-6 sm:p-8">
            {/* Logo */}
            <div className="flex mt-10 justify-center">
              <img src={Juriph} alt="Juriph logo" className="w-32 h-auto" />
            </div>

            {/* Heading */}
            <h1 className="text-2xl mt-5 sm:text-3xl font-semibold text-center text-[#1D2021] mt-6">
              Sign in
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
              Sign in with Google
            </button>

            <p className="text-center mt-5 text-sm text-gray-600">
              -or sign in with email
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 mt-5">
              {/* Email */}
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: "" }));
                  }}
                  placeholder="Enter Email Address"
                  className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                />
                {errors.email ? (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                ) : null}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password)
                        setErrors((p) => ({ ...p, password: "" }));
                    }}
                    placeholder="Enter Password"
                    className={`${inputBase} pr-12 ${
                      errors.password ? inputErr : inputOk
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

                {errors.password ? (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                ) : null}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-5 p-3 rounded-lg font-medium bg-[#E8C284] cursor-pointer text-[#012B37] hover:bg-[#e2b766] transition"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/sign-up")}
                className="font-medium text-[#DFA458] cursor-pointer hover:underline"
              >
                Create account
              </button>
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex flex-col min-h-[420px] md:min-h-full">
          <img
            src={Frame}
            alt="frame"
            className="absolute "
          />

          <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 pt-12 sm:pt-20 md:pt-24 lg:pt-28 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#012B37] leading-tight">
              Simplify Your<br className="hidden sm:block" />
              Legal Journey
            </h1>

            <p className="text-[#012B37] mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
             Let’s continue where you left off and make your legal needs hassle-free.
            </p>
          </div>

          <div className="relative mb-5 flex-1 flex justify-center items-end">
            <img
              src={Law}
              alt="law"
              className="w-[90%] max-w-[520px] md:max-w-[640px] h-auto"
            />
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
