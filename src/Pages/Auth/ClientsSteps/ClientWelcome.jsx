import React, { useState, useEffect } from "react";
import Frame from "../../../assets/Frame.png";
import Juriph from "../../../assets/Juriph Logo.png";
import welcome from "../../../assets/welcomeimage.png";
import AuthFooter from "../../../components/AuthFooter";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ClientWelcome() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("juriph_user_type");
    if (saved) setActive(saved);
  }, []);

  const isWelcomeOnly = location.pathname === "/client-welcome";

  if (!isWelcomeOnly) {
    return <Outlet />;
  }

  // ✅ Otherwise show ONLY welcome UI
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 py-10 md:py-0 overflow-hidden">
          <div className="w-full max-w-md sm:max-w-lg">
            <div className="flex flex-col items-center text-center">
              <img
                src={Juriph}
                alt="logo"
                className="w-28 sm:w-36 md:w-40 h-auto"
              />

              <h1 className="mt-7 sm:mt-14 text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D2021] leading-snug">
                Welcome to Juriph!
              </h1>

              <p className="text-[#393E40] mt-5 text-md sm:text-base leading-relaxed max-w-xl">
                We’re here to help you connect with the right lawyer for your
                needs. Before you get started, we just need a bit more
                information about your legal requirements to personalize your
                experience.
              </p>
            </div>

            <div className="mt-8 space-y-7">
              <button
                onClick={() => navigate("/client-welcome/client-step-1")}
                disabled={!active}
                className={`w-full p-3 mt-5 mb-10 rounded-lg font-medium transition
                  ${
                    active
                      ? "cursor-pointer bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766]"
                      : "cursor-not-allowed bg-gray-300 text-gray-500"
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative overflow-hidden bg-gradient-to-b from-[#DFA458] to-[#E8C284] flex flex-col h-full">
          <img
            src={Frame}
            alt="frame"
            className="absolute"
          />

          <div className="relative z-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 pt-10 md:pt-16 lg:pt-20 text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#012B37] leading-tight">
              Juriph - Where clients <br className="hidden sm:block" />
              and lawyers connect <br className="hidden sm:block" />
              effortlessly.
            </h1>
          </div>

          <div className="relative z-10 flex-1 flex justify-center items-end overflow-hidden">
            <img
              src={welcome}
              alt="welcome"
              className="w-[90%] max-w-[520px] md:max-w-[680px] h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <AuthFooter />
    </div>
  );
}
