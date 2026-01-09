import React, { useEffect, useMemo, useState } from "react";



export default function OfferModal({
  open,
  onClose,
  onChange,
  onSubmit,
  initialValue,
}) {
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    caseTitle: "",
    scopeOfWork: "",
    price: "$300",
    dueDate: "12-12-2024",
  });

  /* Reset when modal opens */
  useEffect(() => {
    if (open) {
      setTouched({});
      setForm({
        caseTitle: "",
        scopeOfWork: "",
        price: "$300",
        dueDate: "12-12-2024",
        ...(initialValue || {}),
      });
    }
  }, [open, initialValue]);

  /* Emit changes */
  useEffect(() => {
    onChange?.(form);
  }, [form, onChange]);

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  /* Validation */
  const errors = useMemo(() => {
    const e = {};
    if (!form.caseTitle.trim()) e.caseTitle = "Case title is required";
    if (!form.scopeOfWork.trim()) e.scopeOfWork = "Scope of work is required";
    if (!form.price) e.price = "Price is required";
    if (!form.dueDate) e.dueDate = "Due date is required";
    return e;
  }, [form]);

  const hasErrors = Object.keys(errors).length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      caseTitle: true,
      scopeOfWork: true,
      price: true,
      dueDate: true,
    });
    if (hasErrors) return;
    onSubmit?.(form);
  };

  if (!open) return null;

  return (
 <div
    className="fixed inset-0 z-50 flex items-center justify-center px-4"
    onClick={onClose} // 👈 CLOSE ON ANYWHERE CLICK
  >
    {/* BACKDROP (visual only) */}
    <div className="absolute inset-0 bg-black/30" />

    {/* MODAL */}
    <div
      className="relative w-full max-w-[620px] rounded-2xl bg-white
                 shadow-[0_18px_60px_rgba(0,0,0,0.15)]"
      onClick={(e) => e.stopPropagation()} // ❌ prevent closing on inside click
    >
      <form onSubmit={handleSubmit} className="p-6 sm:p-8">
        {/* Case Title */}
        <FieldLabel label="Case Title" />
        <Input
          value={form.caseTitle}
          onChange={(v) => update("caseTitle", v)}
          placeholder="Auto Fill"
          error={touched.caseTitle ? errors.caseTitle : ""}
          onBlur={() =>
            setTouched((p) => ({ ...p, caseTitle: true }))
          }
        />

        {/* Scope of work */}
        <div className="mt-5" />
        <FieldLabel label="Scope of work" />
        <Textarea
          value={form.scopeOfWork}
          onChange={(v) => update("scopeOfWork", v)}
          placeholder="Details Here"
          error={touched.scopeOfWork ? errors.scopeOfWork : ""}
          onBlur={() =>
            setTouched((p) => ({ ...p, scopeOfWork: true }))
          }
        />

        {/* Price + Due Date */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel label="Price" />
            <Select
              value={form.price}
              onChange={(v) => update("price", v)}
              options={["$100", "$200", "$300", "$400", "$500"]}
              error={touched.price ? errors.price : ""}
              onBlur={() =>
                setTouched((p) => ({ ...p, price: true }))
              }
            />
          </div>

          <div>
            <FieldLabel label="Due Date" />
            <Select
              value={form.dueDate}
              onChange={(v) => update("dueDate", v)}
              options={[
                "12-12-2024",
                "15-12-2024",
                "20-12-2024",
                "25-12-2024",
              ]}
              error={touched.dueDate ? errors.dueDate : ""}
              onBlur={() =>
                setTouched((p) => ({ ...p, dueDate: true }))
              }
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 w-full cursor-pointer h-[52px] rounded-lg bg-[#D9A05A]
                     text-white text-[15px] font-semibold
                     hover:brightness-[0.97] active:brightness-[0.95]
                     transition"
        >
          Send Offer
        </button>
      </form>
    </div>
  </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function FieldLabel({ label }) {
  return (
    <div className="mb-2 text-[14px] font-medium text-[#2B2B2B]">
      {label}
    </div>
  );
}

function Input({ value, onChange, placeholder, error, onBlur }) {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={[
          "w-full h-[52px] rounded-lg border px-4 text-[14px]",
          "text-[#2B2B2B] placeholder:text-[#9AA4A6] bg-white",
          error
            ? "border-red-400 focus:border-red-400"
            : "border-[#D9D9D9] focus:border-[#C9C9C9]",
          "focus:outline-none",
        ].join(" ")}
      />
      {error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

function Textarea({ value, onChange, placeholder, error, onBlur }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={[
          "w-full min-h-[120px] resize-none rounded-lg border px-4 py-3",
          "text-[14px] text-[#2B2B2B] placeholder:text-[#9AA4A6]",
          error
            ? "border-red-400 focus:border-red-400"
            : "border-[#D9D9D9] focus:border-[#C9C9C9]",
          "focus:outline-none",
        ].join(" ")}
      />
      {error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

function Select({ value, onChange, options, error, onBlur }) {
  return (
    <div>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onBlur={onBlur}
          className={[
            "w-full h-[52px] cursor-pointer rounded-lg border bg-white px-4 pr-10",
            "text-[14px] text-[#2B2B2B] appearance-none",
            error
              ? "border-red-400 focus:border-red-400"
              : "border-[#D9D9D9] focus:border-[#C9C9C9]",
            "focus:outline-none",
          ].join(" ")}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {/* caret */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.24 4.5a.75.75 0 0 1-1.08 0l-4.24-4.5a.75.75 0 0 1 .02-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}
