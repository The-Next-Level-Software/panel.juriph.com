import { ChevronDown } from "lucide-react";
import React, { useMemo, useRef, useState } from "react";


export default function PostACase() {
  const fileRef = useRef(null);

  const categories = useMemo(
    () => ["Family Law", "Criminal Law", "Corporate", "Property", "Immigration"],
    []
  );

  const budgets = useMemo(() => [100, 200, 300, 500, 800, 1200, 2000], []);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deadline: "",
    budgetFrom: "",
    budgetTo: "",
    files: [],
  });

  const [dragOver, setDragOver] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    category: false,
    deadline: false,
    budgetFrom: false,
    budgetTo: false,
    files: false,
  });

  const markTouched = (key) => setTouched((p) => ({ ...p, [key]: true }));

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const todayISO = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const validate = (next = form) => {
    const e = {};

    // Title
    if (!next.title.trim()) e.title = "Case title is required.";
    else if (next.title.trim().length < 3) e.title = "Minimum 3 characters.";

    // Description
    if (!next.description.trim()) e.description = "Case description is required.";
    else if (next.description.trim().length < 10)
      e.description = "Minimum 10 characters.";

    // Category
    if (!next.category) e.category = "Please select a category.";

    // Deadline (required, must be today or later)
    if (!next.deadline) {
      e.deadline = "Please select a deadline.";
    } else {
      const picked = new Date(next.deadline);
      const t = new Date(todayISO());
      if (picked < t) e.deadline = "Deadline cannot be in the past.";
    }

    // Budgets
    if (!next.budgetFrom) e.budgetFrom = "Select starting budget.";
    if (!next.budgetTo) e.budgetTo = "Select ending budget.";

    if (next.budgetFrom && next.budgetTo) {
      const from = Number(next.budgetFrom);
      const to = Number(next.budgetTo);
      if (Number.isNaN(from) || Number.isNaN(to)) {
        e.budgetFrom = "Invalid budget.";
        e.budgetTo = "Invalid budget.";
      } else if (from > to) {
        e.budgetTo = "Budget To must be greater than or equal to Budget From.";
      }
    }

    return e;
  };

  const errors = useMemo(() => validate(form), [form]);
  const isValid = Object.keys(errors).length === 0;

  const showError = (key) => touched[key] && errors[key];

  const addFiles = (fileList) => {
    const incoming = Array.from(fileList || []);
    if (!incoming.length) return;

    // Optional: basic type/size checks
    const MAX_MB = 10;
    const allowed = incoming.filter((f) => f.size <= MAX_MB * 1024 * 1024);

    setForm((p) => ({
      ...p,
      files: [...p.files, ...allowed],
    }));
  };

  const removeFile = (idx) => {
    setForm((p) => ({
      ...p,
      files: p.files.filter((_, i) => i !== idx),
    }));
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    markTouched("files");
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // touch all
    setTouched({
      title: true,
      description: true,
      category: true,
      deadline: true,
      budgetFrom: true,
      budgetTo: true,
      files: true,
    });

    const e2 = validate(form);
    if (Object.keys(e2).length) return;

    // ✅ submit payload
    const payload = {
      ...form,
      budgetFrom: Number(form.budgetFrom),
      budgetTo: Number(form.budgetTo),
    };

    console.log("POST CASE payload:", payload);
    
  };

  return (
    <div className="min-h-screen  bg-white">
      {/* Centered container like screenshot */}
      <div className="mx-auto w-full max-w-[860px] px-4 sm:px-6 py-8 sm:py-10">
        <form onSubmit={onSubmit} className="space-y-7">
          {/* Case Title */}
          <div>
            <label className="block text-[14px] font-medium text-[#454545] mb-2">
              Case Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              onBlur={() => markTouched("title")}
              placeholder="Need Help with...."
              className={`w-full h-[52px] rounded-md border px-4 text-[14px] outline-none transition
                ${
                  showError("title")
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-[#D7D7D7] focus:border-[#C9A25E] focus:ring-2 focus:ring-[#E8C284]/40"
                }`}
            />
            {showError("title") && (
              <p className="mt-2 text-[12px] text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Case Description */}
          <div>
            <label className="block text-[14px] font-medium text-[#454545] mb-2">
              Case Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              onBlur={() => markTouched("description")}
              placeholder="Description Here"
              rows={5}
              className={`w-full min-h-[140px] rounded-md border px-4 py-3 text-[14px] outline-none transition resize-none
                ${
                  showError("description")
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-[#D7D7D7] focus:border-[#C9A25E] focus:ring-2 focus:ring-[#E8C284]/40"
                }`}
            />
            {showError("description") && (
              <p className="mt-2 text-[12px] text-red-500">
                {errors.description}
              </p>
            )}
          </div>

          {/* 2 columns: category + deadline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Category */}
            <div>
              <label className="block text-[14px] font-medium text-[#454545] mb-2">
                Case category
              </label>

              <div className="relative">
                <select
                  value={form.category}
                  onChange={(e) => setField("category", e.target.value)}
                  onBlur={() => markTouched("category")}
                  className={`w-full h-[52px] cursor-pointer  appearance-none text-[#6B6B6B] rounded-md border px-4 pr-10 text-[14px] outline-none transition bg-white
                    ${
                      showError("category")
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-[#D7D7D7] focus:border-[#C9A25E] focus:ring-2 focus:ring-[#E8C284]/40"
                    }`}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

                {/* caret */}
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                  <ChevronDown />
                </span>
              </div>

              {showError("category") && (
                <p className="mt-2 text-[12px] text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-[14px] font-medium text-[#454545] mb-2">
                Deadline
              </label>

              <div className="relative">
                <input
                  type="date"
                  value={form.deadline}
                  min={todayISO()}
                  onChange={(e) => setField("deadline", e.target.value)}
                  onBlur={() => markTouched("deadline")}
                  className={`w-full h-[52px] rounded-md text-[#6B6B6B] border px-4 pr-10 text-[14px] outline-none transition bg-white
                    ${
                      showError("deadline")
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-[#D7D7D7] focus:border-[#C9A25E] focus:ring-2 focus:ring-[#E8C284]/40"
                    }`}
                />
                
              </div>

              {showError("deadline") && (
                <p className="mt-2 text-[12px] text-red-500">{errors.deadline}</p>
              )}
            </div>
          </div>

          {/* 2 columns: budget from + to */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Budget from */}
            <div>
              <label className="block text-[14px] font-medium text-[#454545] mb-2">
                Budget from
              </label>

              <div className="relative">
                <select
                  value={form.budgetFrom}
                  onChange={(e) => setField("budgetFrom", e.target.value)}
                  onBlur={() => markTouched("budgetFrom")}
                  className={`w-full h-[52px] cursor-pointer text-[#6B6B6B] appearance-none rounded-md border px-4 pr-10 text-[14px] outline-none transition bg-white
                    ${
                      showError("budgetFrom")
                        ? "border-red-400  focus:ring-2 focus:ring-red-200"
                        : "border-[#D7D7D7] focus:border-[#C9A25E] focus:ring-2 focus:ring-[#E8C284]/40"
                    }`}
                >
                  <option value="" disabled>
                    $200
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      ${b}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                  <ChevronDown />
                </span>
              </div>

              {showError("budgetFrom") && (
                <p className="mt-2 text-[12px] text-red-500">
                  {errors.budgetFrom}
                </p>
              )}
            </div>

            {/* Budget to */}
            <div>
              <label className="block text-[14px] font-medium text-[#2A2A2A] mb-2">
                To
              </label>

              <div className="relative">
                <select
                  value={form.budgetTo}
                  onChange={(e) => setField("budgetTo", e.target.value)}
                  onBlur={() => markTouched("budgetTo")}
                  className={`w-full cursor-pointer h-[52px] text-[#6B6B6B] appearance-none rounded-md border px-4 pr-10 text-[14px] outline-none transition bg-white
                    ${
                      showError("budgetTo")
                        ? "border-red-400 focus:ring-2 focus:ring-red-200"
                        : "border-[#D7D7D7] focus:border-[#C9A25E] focus:ring-2 focus:ring-[#E8C284]/40"
                    }`}
                >
                  <option value="" disabled>
                    $200
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      ${b}
                    </option>
                  ))}
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]">
                  <ChevronDown />
                </span>
              </div>

              {showError("budgetTo") && (
                <p className="mt-2 text-[12px] text-red-500">{errors.budgetTo}</p>
              )}
            </div>
          </div>

          {/* Supporting Files */}
          <div>
            <label className="block text-[14px] font-medium text-[#454545] mb-2">
              Supporting Files
            </label>

            <div
              onDragEnter={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragOver(false);
              }}
              onDrop={onDrop}
              className={`w-full rounded-md border bg-white transition
                ${dragOver ? "border-[#C9A25E] ring-2 ring-[#E8C284]/40" : "border-[#D7D7D7]"}
              `}
            >
              <div className="h-[130px] flex flex-col items-center justify-center text-center px-4">
                <p className="text-[14px] text-[#2A2A2A] leading-6">
                  Drag and Drop here
                  <br />
                  <span className="text-[#6B6B6B]">or</span>
                  <br />
                  <button
                    type="button"
                    onClick={() => {
                      fileRef.current?.click();
                      markTouched("files");
                    }}
                    className="text-[#454545] cursor-pointer hover:opacity-80"
                  >
                    Upload a file
                  </button>
                </p>

                {/* small upload icon */}
                <svg
                  className="mt-3 opacity-60"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 16V4"
                    stroke="#2A2A2A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7 8l5-4 5 4"
                    stroke="#2A2A2A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 20h16"
                    stroke="#2A2A2A"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>

                <input
                  ref={fileRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    markTouched("files");
                    addFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>

              {/* Selected files list */}
              {form.files.length > 0 && (
                <div className="border-t border-[#EEEEEE] px-4 py-3">
                  <p className="text-[12px] text-[#6B6B6B] mb-2">
                    Selected files:
                  </p>
                  <div className="flex flex-col gap-2">
                    {form.files.map((f, idx) => (
                      <div
                        key={`${f.name}-${idx}`}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="text-[13px] text-[#2A2A2A] truncate">
                          {f.name}
                          <span className="text-[#6B6B6B]">
                            {" "}
                            ({Math.round(f.size / 1024)} KB)
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-[12px] cursor-pointer text-[#FF3B30] hover:opacity-80"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* (Files optional) — no validation message */}
          </div>

          {/* Submit */}
          <button
            
            className={`w-full h-[52px] rounded-md text-white font-medium transition
              ${isValid ? "bg-[#DFA458] cursor-pointer hover:opacity-95 active:scale-[0.99]" : "bg-[#DFA458]/70"}
              focus:outline-none cursor-not-allowed focus:ring-2 focus:ring-[#DFA458]/30
            `}
          >
            Post Case
          </button>
        </form>
      </div>
    </div>
  );
}
