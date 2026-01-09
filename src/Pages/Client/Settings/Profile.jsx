import React, { useMemo, useState } from "react";
import Client from "../../../assets/client.png";
import { Pencil } from "lucide-react";

const PencilIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12.5 6.5 17.5 11.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 20h4l10.6-10.6a2 2 0 0 0 0-2.8l-0.2-0.2a2 2 0 0 0-2.8 0L5 17v3Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const Label = ({ children }) => (
  <div className="text-[12px] sm:text-[13px] text-[#2B2B2B] mb-2">{children}</div>
);

const TextInput = ({ value, onChange, placeholder, disabled }) => (
  <input
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    placeholder={placeholder}
    disabled={disabled}
    className={[
      "w-full h-[52px] rounded-md border border-[#c2c2c2] bg-white px-4",
      "text-[14px] text-[#2B2B2B] placeholder:text-[#6D6D6D]",
      "outline-none focus:border-[#DFA458] focus:ring-4 focus:ring-[#DFA458]/15",
      disabled ? "bg-[#F4F4F4] text-[#6D6D6D] cursor-not-allowed" : "",
    ].join(" ")}
  />
);

const Select = ({ value, onChange, placeholder, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={[
        "w-full h-[52px] rounded-md border border-[#c2c2c2] bg-white px-4 pr-10",
        "text-[14px] text-[#2B2B2B] outline-none appearance-none",
        "focus:border-[#DFA458] focus:ring-4 focus:ring-[#DFA458]/15",
        value ? "" : "text-[#6D6D6D]",
      ].join(" ")}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} className="text-[#2B2B2B]">
          {o}
        </option>
      ))}
    </select>

    {/* chevron */}
    <svg
      viewBox="0 0 24 24"
      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#6F6F6F]"
      fill="none"
    >
      <path
        d="M6 9l6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

export default function ProfileSettingsPage() {
  const countries = useMemo(() => ["Pakistan", "United States", "Canada", "UAE", "Saudi Arabia"], []);
  const cities = useMemo(() => ["Lahore", "Karachi", "Islamabad", "Peshawar", "Quetta"], []);
  const states = useMemo(() => ["Punjab", "Sindh", "KPK", "Balochistan"], []);

  const [fullName, setFullName] = useState("Ali Marsad");
  const [email, setEmail] = useState("123@gmail.com");
  const [phone, setPhone] = useState("+000000000000000");
  const [city, setCity] = useState("");
  const [stateProv, setStateProv] = useState("");
  const [country, setCountry] = useState("");

  const onSave = (e) => {
    e.preventDefault();
    // Hook your save logic here
    console.log({ fullName, email, phone, city, stateProv, country });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className=" w-full max-w-[760px] px-5 sm:px-8 ">
        <form onSubmit={onSave} className="space-y-6">
          {/* Avatar */}
          <div className="flex items-start">
            <div className="relative">
              <div className="h-[85px] w-[85px] rounded-full overflow-hidden bg-[#E9E9E9]">
                <img
                  src={Client}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>

              {/* edit icon */}
              <button
                type="button"
                className={[
                  "absolute -right-1 cursor-pointer -bottom-1 h-10 w-10 rounded-full",
                  "bg-white border border-[#E2E2E2] shadow-sm",
                  "grid place-items-center",
                ].join(" ")}
                aria-label="Edit profile photo"
              >
                <Pencil className="h-4.5 w-4.5 text-[#111]" />
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <Label>Full Name</Label>
            <TextInput  placeholder="Ali Marsad" />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <TextInput  placeholder="123@gmail.com" />
            <div className="mt-2 text-[12px] text-[#6F6F6F]">
              *Contact Support to edit or change email.
            </div>
          </div>

          {/* Phone */}
          <div className="max-w-[320px]">
            <Label>Phone Number</Label>
            <TextInput  placeholder="+000000000000000" />
          </div>

          {/* Location */}
          <div>
            <Label>Location</Label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select value={city} onChange={setCity} placeholder="City" options={cities} />
              <Select
                value={stateProv}
                onChange={setStateProv}
                placeholder="State/Province"
                options={states}
              />
            </div>

            <div className="mt-4">
              <Select value={country} onChange={setCountry} placeholder="Country" options={countries} />
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className={[
              "w-full h-[52px] rounded-md",
              "bg-[#DFA458] text-white text-[16px] font-medium",
              "transition-all cursor-pointer duration-200",
              "hover:brightness-[0.98] active:scale-[0.99]",
              "focus:outline-none focus:ring-4 focus:ring-[#DFA458]/25",
            ].join(" ")}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
