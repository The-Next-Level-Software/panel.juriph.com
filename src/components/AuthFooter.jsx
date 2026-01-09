import React from "react";
import { useNavigate } from "react-router-dom";

function AuthFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1B1B1B] text-white text-sm py-5">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-6 px-4 text-center">
        {/* Copyright */}
        <span>© Juriph 2024. All Rights Reserved.</span>

        

        
        <button
          
          className="hover:underline cursor-pointer transition"
        >
          Privacy Policy
        </button>

        
        <span className="hidden sm:inline">|</span>

        
        <button
          
          className="hover:underline cursor-pointer transition"
        >
          Terms of Service
        </button>
      </div>
    </footer>
  );
}

export default AuthFooter;
