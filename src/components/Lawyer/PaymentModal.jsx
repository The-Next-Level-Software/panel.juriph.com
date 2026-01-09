import React, { useEffect, useMemo, useState } from "react";
import Card from "../../assets/card.png"
import Paypal from "../../assets/paypal.png"

export default function PaymentMethod({
  open,
  onClose,
  onChange,
  onSubmit,
  initialValue,
}) {
  const defaultForm = useMemo(
    () => ({
      paymentMethod: "card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      country: "Pakistan",
      postalCode: "",
      agree: false,
    }),
    []
  );

  const [form, setForm] = useState(() => ({ ...defaultForm, ...(initialValue || {}) }));

  // keep state updated if parent changes initialValue (edit mode etc.)
  useEffect(() => {
    if (initialValue) setForm((p) => ({ ...p, ...initialValue }));
  }, [initialValue]);

  const method = form.paymentMethod;

  /* 🔁 Emit changes to parent */
  useEffect(() => {
    onChange?.(form);
  }, [form, onChange]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const isCard = method === "card";

  const validate = () => {
    if (!form.agree) return "Please agree to the terms & conditions.";
    if (isCard) {
      if (!form.cardNumber.trim()) return "Card number is required.";
      if (!form.expiryDate.trim()) return "Expiry date is required.";
      if (!form.cvv.trim()) return "CVV is required.";
      if (!form.postalCode.trim()) return "Postal code is required.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      
      return;
    }
    onSubmit?.(form);
  };

  const RadioDot = ({ checked }) => (
    <span
      className={[
        "h-6 w-6 rounded-full cursor-pointer border-2 grid place-items-center transition",
        checked ? "border-[#DFA458]" : "border-[#2C2C2C]",
      ].join(" ")}
    >
      <span
        className={[
          "h-3.5 w-3.5 rounded-full",
          checked ? "bg-[#DFA458]" : "bg-transparent",
        ].join(" ")}
      />
    </span>
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        // click outside to close
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="w-full max-w-lg rounded-xl bg-white p-6 relative">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 h-9 w-9 cursor-pointer grid place-items-center rounded-full hover:bg-black/5"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-lg text-[#454545] font-medium mb-5">
          Select your payment method
        </h2>

        {/* Payment Method */}
        <div className="mt-4 flex flex-wrap items-center gap-10">
          <button
            type="button"
            onClick={() => update("paymentMethod", "card")}
            className="flex items-center gap-4"
          >
            <RadioDot checked={method === "card"} />
            <img src={Card} alt="icon" className="" />
          </button>

          <button
            type="button"
            onClick={() => update("paymentMethod", "paypal")}
            className="flex items-center gap-4"
          >
            <RadioDot checked={method === "paypal"} />
            <img src={Paypal} alt="icon" className="" />
          </button>
        </div>

        <h3 className="text-sm font-medium mb-4 mt-6">
          {isCard ? "Payment Information" : "PayPal Information"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          
            <>
              <Input
                label="Card number"
                value={form.cardNumber}
                placeholder="4111 222 333 444"
                onChange={(v) => update("cardNumber", v)}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Expiry date"
                  placeholder="MM/YY"
                  value={form.expiryDate}
                  onChange={(v) => update("expiryDate", v)}
                />
                <Input
                  label="CVV"
                  type="password"
                  placeholder="123"
                  value={form.cvv}
                  onChange={(v) => update("cvv", v)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Country"
                  value={form.country}
                  onChange={(v) => update("country", v)}
                  options={["Pakistan", "USA", "UK"]}
                />
                <Input
                  label="Zip / postal code"
                  value={form.postalCode}
                  onChange={(v) => update("postalCode", v)}
                  placeholder="95216"
                />
              </div>
            </>
          

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
            />
            I agree to the terms & Conditions.
          </label>

          <div className="flex justify-end gap-3 pt-4">
            

            <button
              type="submit"
              className="h-[42px] px-6 rounded-md cursor-pointer bg-[#E3A44F] text-white
                         hover:bg-[#D8963E] transition"
            >
              {isCard ? "Add Card" : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Reusable Fields ---------- */

const Input = ({ label, value, onChange, ...props }) => (
  <div>
    <label className="text-sm mb-1 block">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      {...props}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full h-[44px] rounded-md border border-[#6D6D6D] px-4"
    />
  </div>
);

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm mb-1 block">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full h-[44px] rounded-md border border-[#6D6D6D] px-3"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);
