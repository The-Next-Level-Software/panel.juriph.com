import {useState} from "react";
import PaymentModal from "../../../components/Client/PaymentModal"

export default function SavedCards() {
     const [open, setOpen] = useState(false);
  const [paymentDraft, setPaymentDraft] = useState(null);

  return (
    <div className="max-w-[620px]">
      {/* Title */}
      <h2 className="text-[30px] font-semibold text-[#454545] mb-6">
        Saved Cards
      </h2>

      {/* Card Item */}
      <CardRow />
      <CardRow />

      {/* Add New Card */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 h-[44px] cursor-pointer px-6 rounded-md
                   bg-[#E0A24A] text-white text-[14px] font-medium
                   hover:bg-[#D4963E]
                   active:scale-[0.98]
                   transition"
      >
        Add New Card
      </button>
       <PaymentModal
        open={open}
        onClose={() => setOpen(false)}
        onChange={(data) => setPaymentDraft(data)}
        onSubmit={(data) => {
          console.log("FINAL SUBMIT:", data);
          setOpen(false);
        }}
      />
    </div>
  );
}

/* -------- Card Row Component -------- */
function CardRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_140px] gap-4 items-end mb-4">
      {/* Card Number */}
      <div>
        <label className="block text-[14px] text-[#333] mb-1">
          Card number <span className="text-red-500">*</span>
        </label>
        <input
          disabled
          value="********1234"
          className="w-full h-[42px] px-3 rounded-md
                     border border-[#D9D9D9]
                     bg-[#F9F9F9]
                     text-[14px] text-[#555]"
        />
      </div>

      {/* Expiry Date */}
      <div>
        <label className="block text-[14px] text-[#333] mb-1">
          Expiry date <span className="text-red-500">*</span>
        </label>
        <input
          disabled
          placeholder="MM/YY"
          className="w-full h-[42px] cursor-pointer px-3 rounded-md
                     border border-[#D9D9D9]
                     bg-[#F9F9F9]
                     text-[14px] text-[#555]"
        />
      </div>

      {/* Remove Button */}
      <button
        type="button"
        className="h-[42px] cursor-pointer px-3 rounded-md
                   bg-[#E5E5E5]
                   text-[#444] text-[15px] font-medium
                   hover:bg-[#DADADA]
                   transition"
      >
        Remove Card
      </button>
    </div>
  );
}
