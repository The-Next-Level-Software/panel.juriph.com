import React from "react";
import Juriph from "../../assets/Juriph Logo.png";
import { Menu, Search } from "lucide-react";
import Client from "../../assets/Client.png";
import Bell from "../../assets/Bell.png";

export default function Topbar({ onToggle }) {
  return (
    <div className="w-full  py-3 flex items-center bg-[#FCF8F0] justify-between px-6 lg:px-12 xl:px-20 shrink-0">
      <img src={Juriph} alt="Juriph Logo" className="h-11 w-32" />
      <div className="hidden sm:flex items-center gap-7">
        <div
          className="bg-white w-80 rounded-md flex items-center gap-2 h-10 px-3 border border-gray-200 
                focus-within:border-[#e6b576] focus-within:ring-2 focus-within:ring-[#e6b576]/20"
        >
          <Search className="text-gray-400 h-4.5 w-4.5 flex-shrink-0" />

          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-[14px] text-[#0B2B33]
               placeholder:text-gray-400"
          />
        </div>

        <div className="flex bg-white px-3 py-3 cursor-pointer rounded-full items-center">
          <img src={Bell} alt="Notifications" />
        </div>
        <div className="flex cursor-pointer rounded-full items-center">
          <img src={Client} alt="Client Avatar" className="h-13 w-13" />
        </div>
      </div>

      <div className=" flex sm:hidden">
        <Menu onClick={onToggle} className="text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}
