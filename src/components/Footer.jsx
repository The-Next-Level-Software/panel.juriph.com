import React from "react";
import JuriphLogoWhite from "../assets/Juriph-white-Logo.png";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();
  return (
    <footer className="mt-7 bg-[#012B37]">
      {/* Top */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32 pt-12 sm:pt-16 lg:pt-24 pb-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          {/* Left */}
          <div className="max-w-xl">
            <img
              src={JuriphLogoWhite}
              alt="Juriph Logo"
              className="h-15 w-auto"
            />

            {/* Links */}
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-white text-sm sm:text-base">
              <button onClick={()=>{navigate("#About")}} className="cursor-pointer hover:underline">About</button>
              <span className="text-white/60">|</span>
              <button onClick={()=>{navigate("#FAQs")}} className="cursor-pointer hover:underline">FAQs</button>
              <span className="text-white/60">|</span>
              <button onClick={()=>{navigate("#How-it-works")}} className="cursor-pointer hover:underline">
                How it works
              </button>
              <span className="text-white/60">|</span>
              <button onClick={()=>{navigate("/#Features")}} className="cursor-pointer hover:underline">Features</button>
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-auto">
            <div className="flex items-start gap-3">
              <MapPin className="text-[#E8C284] mt-0.5 shrink-0" />
              <p className="text-white text-sm sm:text-base leading-relaxed">
                Office #1, Floor 2, abc city, xyz.
              </p>
            </div>

            <div className="flex items-start gap-3 mt-4">
              <Mail className="text-[#E8C284] mt-0.5 shrink-0" />
              <a
                href="mailto:support@juriph.com"
                className="text-white text-sm sm:text-base hover:underline"
              >
                support@juriph.com
              </a>
            </div>

            {/* Socials */}
            <div className="mt-5 flex gap-2 lg:justify-end">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#E8C284] text-[#012B37]
                             flex items-center justify-center cursor-pointer
                             transition hover:opacity-90 active:scale-95"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#0F5A7D] px-4 sm:px-6 md:px-10 lg:px-20 xl:px-24 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-white text-sm sm:text-base">
            © 2024 Juriph, All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <button className="text-white text-sm sm:text-base hover:underline">
              Privacy Policy
            </button>
            <button className="text-white text-sm sm:text-base hover:underline">
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
