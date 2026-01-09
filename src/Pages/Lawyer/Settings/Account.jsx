import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import DeactivateConfirmModal from "../../../components/Lawyer/DeactivateConfirmModal";

const EyeIcon = ({ open }) =>
  open ? (
    // eye-open
    <Eye className="h-5 cursor-pointer w-5" />
  ) : (
    // eye-off
    <EyeOff className="h-5 cursor-pointer w-5" />
  );

export default function Account() {
  const [showPassword, setShowPassword] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true);
    try {
      // call your api...
      // await api.deactivate();
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="w-full max-w-[820px] px-6 ">
        <h1 className="text-[30px] font-semibold text-[#454545]">
          Account Settings
        </h1>

        {/* Password */}
        <div className="mt-7">
          <label className="block text-[14px] text-[#6B6B6B] mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value="********************"
              readOnly
              className={[
                "w-full h-[46px] rounded-md border border-[#c2c2c2] bg-white px-4 pr-12",
                "text-[14px] text-[#2B2B2B]  outline-none",
                "focus:ring-2 focus:ring-black/5 focus:border-[#CFCFCF]",
              ].join(" ")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#6F6F6F]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </button>
          </div>
        </div>

        {/* Change password */}
        <div className="mt-10">
          <div className="text-[14px] text-[#6B6B6B] mb-3">Change password</div>

          <div className="space-y-3">
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={[
                "w-full h-[46px] rounded-md border border-[#c2c2c2] bg-white px-4",
                "text-[14px] text-[#2B2B2B] outline-none",
                "placeholder:text-[#6D6D6D]",
                "focus:ring-2 focus:ring-black/5 focus:border-[#CFCFCF]",
              ].join(" ")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={[
                  "w-full h-[46px] rounded-md border border-[#c2c2c2] bg-white px-4",
                  "text-[14px] text-[#2B2B2B] outline-none",
                  "placeholder:text-[#6D6D6D]",
                  "focus:ring-2 focus:ring-black/5 focus:border-[#CFCFCF]",
                ].join(" ")}
              />

              <input
                type="password"
                placeholder="Confirm New password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className={[
                  "w-full h-[46px] rounded-md border border-[#c2c2c2] bg-white px-4",
                  "text-[14px] text-[#2B2B2B] outline-none",
                  "placeholder:text-[#6D6D6D]",
                  "focus:ring-2 focus:ring-black/5 focus:border-[#CFCFCF]",
                ].join(" ")}
              />
            </div>
          </div>
        </div>

        {/* Account Deactivation */}
        <div className="mt-10">
          <div className="text-[14px] text-[#6B6B6B] mb-3">
            Account Deactivation
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className={[
              "h-[42px] px-5 rounded-md",
              "bg-[#E9E9E9] text-[#4A4A4A] cursor-pointer text-[14px] font-medium",
              "hover:bg-[#E1E1E1] active:scale-[0.99] transition",
            ].join(" ")}
          >
            Deactivate Account
          </button>
          <DeactivateConfirmModal
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={onConfirm}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
