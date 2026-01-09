import React, { useMemo, useRef, useState } from "react";
import Client from "../../assets/client.png";
import Card from "../../assets/card.png"
import Paypal from "../../assets/paypal.png"

const RadioDot = ({ checked }) => (
  <span
    className={[
      "h-6 w-6 rounded-full cursor-pointer border-2 grid place-items-center",
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

const Input = ({ label, required, error, disabled, ...props }) => (
  <label className="block">
    <span className="block text-[13px] text-[#2C2C2C] mb-2">
      {label}
      {required ? <span className="text-red-500">*</span> : null}
    </span>
    <input
      {...props}
      disabled={disabled}
      className={[
        "w-full h-11 rounded-md border px-4 text-[14px] outline-none",
        "placeholder:text-[#9AA3A7] bg-white",
        disabled ? "bg-[#F3F3F3] text-[#8A8A8A] cursor-not-allowed" : "",
        error ? "border-red-400 focus:border-red-400" : "border-[#C9C9C9] focus:border-[#9C9C9C]",
      ].join(" ")}
    />
    {error ? <div className="mt-1 text-[12px] text-red-500">{error}</div> : null}
  </label>
);

const Select = ({ label, required, error, disabled, children, ...props }) => (
  <label className="block">
    <span className="block text-[13px] text-[#2C2C2C] mb-2">
      {label}
      {required ? <span className="text-red-500">*</span> : null}
    </span>
    <select
      {...props}
      disabled={disabled}
      className={[
        "w-full h-11 rounded-md border px-4 text-[14px] outline-none bg-white",
        disabled ? "bg-[#F3F3F3] text-[#8A8A8A] cursor-not-allowed" : "",
        error ? "border-red-400 focus:border-red-400" : "border-[#C9C9C9] focus:border-[#9C9C9C]",
      ].join(" ")}
    >
      {children}
    </select>
    {error ? <div className="mt-1 text-[12px] text-red-500">{error}</div> : null}
  </label>
);

function money(n) {
  return `$${Number(n || 0).toLocaleString()}`;
}

export default function Payment() {
  const cases = useMemo(
    () => [
      {
        id: 1,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id.",
        lawyer: "Lawyer Name",
        tagline: "Tagline Or Summary",
        proposedFee: 300,
        proposedFeeTo: null,
        due: "12-12-2024",
        avatar: "",
      },
      {
        id: 2,
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id.",
        lawyer: "Lawyer Name",
        tagline: "Tagline Or Summary",
        proposedFee: 300,
        proposedFeeTo: 1200,
        due: "12-12-2024",
        avatar: "",
      },
      { id: 3, title: "Case Title Goes here", desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id.", lawyer: "Lawyer Name", tagline: "Tagline Or Summary", proposedFee: 300, proposedFeeTo: null, due: "12-12-2024", avatar: "" },
      { id: 4, title: "Case Title Goes here", desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id.", lawyer: "Lawyer Name", tagline: "Tagline Or Summary", proposedFee: 300, proposedFeeTo: null, due: "12-12-2024", avatar: "" },
      { id: 5, title: "Case Title Goes here", desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id.", lawyer: "Lawyer Name", tagline: "Tagline Or Summary", proposedFee: 300, proposedFeeTo: null, due: "12-12-2024", avatar: "" },
    ],
    []
  );

  const [activeId, setActiveId] = useState(cases[0].id);
  const activeCase = cases.find((c) => c.id === activeId) || cases[0];

  const [method, setMethod] = useState("card");
  const [agree, setAgree] = useState(false);

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    country: "Pakistan",
    zip: "",
  });
  const [touched, setTouched] = useState({});

  const sliderRef = useRef(null);

  const escrow = Number(activeCase.proposedFee || 0);
  const platformFeeRate = 0.2;
  const platformFee = Math.round(escrow * platformFeeRate);
  const total = escrow + platformFee;

  const errors = useMemo(() => {
    const e = {};
    if (method === "card") {
      const digits = (form.cardNumber || "").replace(/\D/g, "");
      if (!digits) e.cardNumber = "Card number is required";
      else if (digits.length < 12) e.cardNumber = "Card number looks too short";

      if (!form.expiry) e.expiry = "Expiry date is required";
      else if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Use MM/YY";

      if (!form.cvv) e.cvv = "CVV is required";
      else if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = "Invalid CVV";

      if (!form.country) e.country = "Country is required";
      if (!form.zip) e.zip = "Zip/postal code is required";
    }
    return e;
  }, [form, method]);

  const isValid = method === "paypal" ? agree : Object.keys(errors).length === 0 && agree;

  const markTouched = (key) => setTouched((p) => ({ ...p, [key]: true }));

  const onSelectCase = (id, index) => {
    setActiveId(id);

    const el = sliderRef.current;
    if (!el) return;

    if (window.innerWidth < 1024) {
      const card = el.querySelector(`[data-case-index="${index}"]`);
      if (card) card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ cardNumber: true, expiry: true, cvv: true, country: true, zip: true });
    if (!isValid) return;

  };

  return (
   
    <div className="h-[100dvh] bg-white overflow-hidden">
      
      <div className="h-full min-h-0 grid grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[480px_1fr]">
        {/* LEFT - CASES */}
        <aside className="min-h-0 border-b lg:border-b-0 lg:border-r border-[#EEE] overflow-hidden">
          {/* Desktop */}
          <div className="hidden lg:block h-full min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 py-6">
            <div className="space-y-6 max-w-4xl mx-auto">
              {cases.map((c, idx) => {
                const selected = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectCase(c.id, idx)}
                    className={[
                      "w-full text-left cursor-pointer rounded-xl p-5 sm:p-6 transition",
                      "min-w-0 overflow-hidden",
                      selected ? "bg-[#F5F5F5]" : "opacity-70",
                    ].join(" ")}
                  >
                    <h3 className="text-[18px] font-semibold text-[#2C2C2C] break-words">{c.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#7B7B7B] break-words">{c.desc}</p>

                    <div className="mt-6 min-w-0">
                      <div className="text-[11px] text-[#8C8C8C] mb-2">Assigned Lawyer</div>
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={Client} alt="avatar" className="h-12 w-12 object-cover" />
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold text-[#2C2C2C] truncate">{c.lawyer}</div>
                          <div className="text-[12px] text-[#7B7B7B] truncate">{c.tagline}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 min-w-0">
                      <div className="rounded-lg bg-[#DFA458] text-white px-4 py-4 min-w-0 overflow-hidden">
                        <div className="text-[12px] opacity-90">Proposed Fee</div>
                        <div className="mt-1 text-[15px] sm:text-[16px] font-semibold break-words">
                          {c.proposedFeeTo ? `${money(c.proposedFee)} To ${money(c.proposedFeeTo)}` : money(c.proposedFee)}
                        </div>
                      </div>

                      <div className="rounded-lg bg-[#E6E6E6] text-[#2C2C2C] px-4 py-4 min-w-0 overflow-hidden">
                        <div className="text-[12px] opacity-80">Due Date</div>
                        <div className="mt-1 text-[15px] sm:text-[16px] font-semibold break-words">{c.due}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden h-full min-h-0 px-4 sm:px-6 py-5 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[14px] font-semibold text-[#2C2C2C]">Your Cases</div>
              <div className="text-[12px] text-[#7B7B7B]">Swipe left/right</div>
            </div>

            <div
              ref={sliderRef}
              className={[
                "overflow-x-auto overflow-y-hidden",
                "flex gap-4",
                "snap-x snap-mandatory",
                "[-webkit-overflow-scrolling:touch]",
                "pb-2",
              ].join(" ")}
            >
              {cases.map((c, idx) => {
                const selected = c.id === activeId;
                return (
                  <button
                    key={c.id}
                    data-case-index={idx}
                    type="button"
                    onClick={() => onSelectCase(c.id, idx)}
                    className={[
                      "shrink-0 snap-center",
                      "w-[86%] sm:w-[70%]",
                      "text-left rounded-xl p-5 transition bg-[#F5F5F5]",
                      "min-w-0 overflow-hidden",
                      selected ? "bg-[#F5F5F5]" : "opacity-70",
                    ].join(" ")}
                  >
                    <h3 className="text-[18px] font-semibold text-[#2C2C2C] break-words">{c.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#7B7B7B] break-words">{c.desc}</p>

                    <div className="mt-6 min-w-0">
                      <div className="text-[11px] text-[#8C8C8C] mb-2">Assigned Lawyer</div>
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={Client} alt="avatar" className="h-10 w-10 object-cover" />
                        <div className="min-w-0">
                          <div className="text-[14px] font-semibold text-[#2C2C2C] truncate">{c.lawyer}</div>
                          <div className="text-[12px] text-[#7B7B7B] truncate">{c.tagline}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4 min-w-0">
                      <div className="rounded-lg bg-[#DFA458] text-white px-4 py-4 min-w-0 overflow-hidden">
                        <div className="text-[12px] opacity-90">Proposed Fee</div>
                        <div className="mt-1 text-[15px] font-semibold break-words">
                          {c.proposedFeeTo ? `${money(c.proposedFee)} To ${money(c.proposedFeeTo)}` : money(c.proposedFee)}
                        </div>
                      </div>

                      <div className="rounded-lg bg-[#E6E6E6] text-[#2C2C2C] px-4 py-4 min-w-0 overflow-hidden">
                        <div className="text-[12px] opacity-80">Due Date</div>
                        <div className="mt-1 text-[15px] font-semibold break-words">{c.due}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* RIGHT - PAYMENT */}
        <main className="min-h-0 overflow-hidden">
          {/* ✅ FIX:  */}
          <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
              <h1 className="text-[26px] sm:text-[28px] font-semibold text-[#1F1F1F]">
                Secure Payment for Your Case
              </h1>
              <p className="mt-2 text-[14px] text-[#6F6F6F] max-w-[620px]">
                Your payment will be held securely in escrow and only released to the lawyer upon completion of the case.
              </p>

              <div className="mt-8 rounded-xl bg-[#FBF6EC] border border-[#F0E6D4] px-5 sm:px-6 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="min-w-0">
                    <div className="text-[13px] text-[#6D6D6D]">Escrow Amount</div>
                    <div className="mt-2 text-[22px] font-semibold text-[#1F1F1F]">{money(escrow)}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] text-[#6D6D6D]">Platform Fee (20%):</div>
                    <div className="mt-2 text-[22px] font-semibold text-[#1F1F1F]">{money(platformFee)}</div>
                  </div>
                  <div className="sm:text-right min-w-0">
                    <div className="text-[13px] text-[#6D6D6D]">Total Payment</div>
                    <div className="mt-2 text-[26px] font-semibold text-[#1F1F1F]">{money(total)}</div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-[18px] font-semibold text-[#1F1F1F]">Select your payment method</h2>

                <div className="mt-4 flex flex-wrap items-center gap-10">
                  <button type="button" onClick={() => setMethod("card")} className="flex items-center gap-4">
                    <RadioDot checked={method === "card"} />
                    <img src={Card} alt="icon" className="" />
                  </button>

                  <button type="button" onClick={() => setMethod("paypal")} className="flex items-center gap-4">
                    <RadioDot checked={method === "paypal"} />
                    <img src={Paypal} alt="icon" className="" />
                  </button>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-10">
                <h2 className="text-[18px] font-semibold text-[#1F1F1F]">Payment Information</h2>

                <div className="mt-4 space-y-5">
                  <Input
                    label="Card number"
                    required
                    placeholder="4111 222 333 4444"
                    value={form.cardNumber}
                    onChange={(e) => setForm((p) => ({ ...p, cardNumber: e.target.value }))}
                    onBlur={() => markTouched("cardNumber")}
                    disabled={method !== "card"}
                    error={method === "card" && touched.cardNumber ? errors.cardNumber : ""}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Input
                      label="Expiry date"
                      required
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => setForm((p) => ({ ...p, expiry: e.target.value }))}
                      onBlur={() => markTouched("expiry")}
                      disabled={method !== "card"}
                      error={method === "card" && touched.expiry ? errors.expiry : ""}
                    />
                    <Input
                      label="CVV"
                      required
                      placeholder="123"
                      value={form.cvv}
                      onChange={(e) => setForm((p) => ({ ...p, cvv: e.target.value }))}
                      onBlur={() => markTouched("cvv")}
                      disabled={method !== "card"}
                      error={method === "card" && touched.cvv ? errors.cvv : ""}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Select
                      label="Country"
                      required
                      value={form.country}
                      onChange={(e) => setForm((p) => ({ ...p, country: e.target.value }))}
                      onBlur={() => markTouched("country")}
                      disabled={method !== "card"}
                      error={method === "card" && touched.country ? errors.country : ""}
                    >
                      <option>Pakistan</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Saudi Arabia</option>
                      <option>Kuwait</option>
                    </Select>

                    <Input
                      label="Zip/postal code"
                      required
                      placeholder="95216"
                      value={form.zip}
                      onChange={(e) => setForm((p) => ({ ...p, zip: e.target.value }))}
                      onBlur={() => markTouched("zip")}
                      disabled={method !== "card"}
                      error={method === "card" && touched.zip ? errors.zip : ""}
                    />
                  </div>
                </div>

                <div className="mt-10">
                  <h2 className="text-[18px] font-semibold text-[#1F1F1F]">Billing Summary</h2>

                  <div className="mt-4 text-[14px] text-[#1F1F1F]">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-[#5C5C5C]">Escrow payment</span>
                      <span className="font-medium">{money(escrow)} USD</span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                      <span className="text-[#5C5C5C]">Platform fee</span>
                      <span className="font-medium">{money(platformFee)} USD</span>
                    </div>

                    <div className="mt-3 border-t border-[#D9D9D9]" />

                    <div className="flex items-center justify-between py-3 mt-2">
                      <span className="text-[#5C5C5C]">Total</span>
                      <span className="font-semibold">{money(total)} USD</span>
                    </div>
                  </div>
                </div>

                <label className="mt-6 flex items-start gap-3 select-none">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-5 w-5 rounded cursor-pointer border-[#BDBDBD]"
                  />
                  <span className="text-[13px] text-[#5C5C5C] leading-relaxed">
                    I agree to the escrow terms. Payment will only be released upon my approval.
                  </span>
                </label>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className={[
                      "h-12 px-8 rounded-md font-semibold text-white",
                      "bg-[#DFA458] transition-all",
                      !isValid ? "opacity-50 cursor-not-allowed" : "hover:brightness-[0.98] cursor-pointer active:scale-[0.99]",
                    ].join(" ")}
                  >
                    Confirm Payment
                  </button>
                </div>
              </form>

              <div className="h-6" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
