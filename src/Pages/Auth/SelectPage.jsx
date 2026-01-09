import React, { useState, useEffect } from "react";
import Frame from "../../assets/Frame.png";
import Law from "../../assets/law_3.png";
import Juriph from "../../assets/Juriph Logo.png";
import ActiveLawyer from "../../assets/activelawyer.png";
import InActiveLawyer from "../../assets/inactivelawyer.png";
import ActiveClient from "../../assets/activeclient.png";
import InActiveClient from "../../assets/inactiveclient.png";
import AuthFooter from "../../components/AuthFooter";
import { useNavigate } from "react-router-dom";

export default function SelectPage() {
  const [active, setActive] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const saved = localStorage.getItem("juriph_user_type");
  if (saved) {
    setActive(saved);
  }
}, []);
const userType = localStorage.getItem("juriph_user_type");

  const options = [
    {
      id: "client",
      text: (
        <>
          I need a lawyer to <br /> help with my case.
        </>
      ),
    },
    {
      id: "lawyer",
      text: (
        <>
          I want to join <br /> Juriph as a lawyer.
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2">
        {/* LEFT */}
        <div className="w-full flex items-center justify-center px-4 sm:px-6 py-10 md:py-0">
          <div className="w-full max-w-md sm:max-w-lg">
            {/* Logo + Heading */}
            <div className="flex flex-col items-center text-center">
              <img
                src={Juriph}
                alt="logo"
                className="w-28 sm:w-36 md:w-40 h-auto"
              />

              <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl md:text-4xl font-semibold text-[#1D2021] leading-snug">
                Choose your journey <br className="hidden sm:block" />
                with Juriph
              </h1>
            </div>

            {/* Cards */}
            <div className="mt-8 space-y-7">
              {options.map((opt) => {
                const isActive = active === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setActive(opt.id)}
                    className={`w-full cursor-pointer text-left rounded-lg p-5 transition-all border
                      ${
                        isActive
                          ? "bg-[#F5F6F6] border-[#DFA458] "
                          : "bg-[#F5F6F6] border-transparent hover:border-[#DFA458]/40 hover:bg-[#ECEDED]"
                      }`}
                  >
                    <div className="flex items-start gap-5">
                      <div className="flex gap-2 pt-1">
                        {opt.id === "client" &&
                          (isActive ? (
                            <img
                              src={ActiveClient}
                              alt=""
                              className="h-10 w-10"
                            />
                          ) : (
                            <img
                              src={InActiveClient}
                              alt=""
                              className="h-10 w-10"
                            />
                          ))}
                        {opt.id === "lawyer" &&
                          (isActive ? (
                            <img
                              src={ActiveLawyer}
                              alt=""
                              className="h-10 w-10"
                            />
                          ) : (
                            <img
                              src={InActiveLawyer}
                              alt=""
                              className="h-10 w-10"
                            />
                          ))}
                      </div>

                      <p className="text-[#012B37]  ">{opt.text}</p>
                    </div>
                  </button>
                );
              })}

              <button
                onClick={() => {
                  // store selected option
                  localStorage.setItem("juriph_user_type", active);

                  // navigate after saving
                  navigate("/sign-in");
                }}
                disabled={!active}
                className={`w-full p-3 mt-5 mb-10 rounded-lg font-medium transition
    ${
      active
        ? "cursor-pointer bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766]"
        : "cursor-not-allowed bg-gray-300 text-gray-500"
    }
  `}
              >
                Create Account
              </button>
            </div>
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
              Simplify Your <br className="hidden sm:block" />
              Legal Journey
            </h1>

            <p className="text-[#012B37] mt-4 text-sm sm:text-base leading-relaxed max-w-xl">
              Whether you need legal advice or want to offer your expertise,
              Juriph makes it simple and secure.
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
