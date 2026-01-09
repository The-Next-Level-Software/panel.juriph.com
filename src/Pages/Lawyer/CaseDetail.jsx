import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, MapPin, User } from "lucide-react";
import Location from "../../assets/location.png"
import Client from "../../assets/client.png"
import Kid from "../../assets/kid.png"

export default function CaseDetailsPage() {
  const navigate = useNavigate();

  const caseData = {
    title:
      "Case Title Goes here, Case Title Goes here, Case Title Goes here.",
    description1:
      "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu. Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu. Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
    description2:
      "Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.Description: Loremamet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.Description: Lorem Ipsum Dolor Sit Amet Consectetur. Pelpsum Dolor Sit Amet Consectetur. Pellentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.Description: lorem Ipsum Dolor Sit Amet Coentesque Sapien In Eu Id. Vel Imperdiet Nunc Commodo Cursus Nunc Augue Eu.",
    budget: "$300-$600",
    deadline: "12-12-2024",
    preference: "Video Call",
    tags: ["Case Type", "Urgent", "Any Other Tag"],
    attachments: [
      { id: 1, name: "File Name", meta: "File Type, Jpeg, PDF" },
      { id: 2, name: "File Name", meta: "File Type, Jpeg, PDF" },
      { id: 3, name: "File Name", meta: "File Type, Jpeg, PDF" },
    ],
    client: {
      name: "Ali Marsad",
      country: "Pakistan",
      time: "08:12 PM",
      avatarUrl:
        Client,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-[1480px] px-6 py-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
          {/* LEFT CONTENT */}
          <section className="min-w-0">
            {/* Go back */}
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-[14px] cursor-pointer font-medium text-[#6B7280] hover:text-[#111827] transition"
            >
             
              Go Back
            </button>

            {/* Title */}
            <h1 className="mt-4 text-[30px] leading-tight font-semibold text-[#0F172A]">
              {caseData.title}
            </h1>

            {/* Description block 1 */}
            <p className="mt-5 text-[15px] leading-7 text-[#657475]">
              {caseData.description1}
            </p>

            

            {/* Description block 2 */}
            <p className="text-[15px] mt-6 leading-7 text-[#64748B]">
              {caseData.description2}
            </p>

            {/* Budget / Deadline / Preference */}
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              <InfoStat label="Budget" value={caseData.budget} />
              <InfoStat label="Deadline" value={caseData.deadline} />
              <InfoStat label="Client Prefrence" value={caseData.preference} />
            </div>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-3">
              {caseData.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] text-[#6B7280]"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Attached Documents */}
            <div className="mt-10">
              <h3 className="text-[16px] font-semibold text-[#111827]">
                Attached Documents
              </h3>

              <div className="mt-4 space-y-4">
                {caseData.attachments.map((file) => (
                  <AttachmentRow key={file.id} name={file.name} meta={file.meta} />
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <aside className="w-full">
            {/* Top actions */}
            <div className="flex items-center justify-end gap-3">
              <button
              onClick={()=>{navigate("bid-now")}}
                type="button"
                className="h-[44px] w-[220px] rounded-md cursor-pointer bg-[#DFA458] text-white text-[16px]  shadow-sm hover:opacity-95 active:scale-[0.99] transition"
              >
                Bid Now
              </button>

              <button
                type="button"
                aria-label="favorite"
                className="grid h-[44px] w-[44px] cursor-pointer place-items-center rounded-md bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#6B7280] transition"
              >
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Client card */}
            <div className="mt-5 rounded-xl bg-[#F5F6F6] p-6 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
              <div className="flex flex-col items-center text-center">
                <div className="h-[110px] w-[110px] overflow-hidden rounded-full bg-[#111827]/5">
                  <img
                    src={caseData.client.avatarUrl}
                    alt="client"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="mt-4 text-[18px] font-semibold text-[#111827]">
                  {caseData.client.name}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-[14px] text-[#6B7280]">
                  
                  <span className="inline-flex items-center gap-1">
                    <img src={Location} alt="icon" className="h-5 w-5" />
                    {caseData.client.country}
                  </span>
                </div>

                <div className="mt-2 text-[14px] text-[#9CA3AF]">
                  {caseData.client.time}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- Small UI pieces ---------- */

function InfoStat({ label, value }) {
  return (
    <div>
      <div className="text-[14px] text-[#6B7280]">{label}</div>
      <div className="mt-2 text-[18px] font-semibold text-[#414749]">
        {value}
      </div>
    </div>
  );
}

function AttachmentRow({ name, meta }) {
  return (
    <div className="flex items-center gap-4">
      {/* Thumbnail */}
      <div className="h-[44px] w-[44px] rounded-md bg-[#F3F4F6] border border-[#E5E7EB] overflow-hidden shrink-0">
        {/* simple placeholder (replace with real thumbnails) */}
        <img src={Kid} alt="image" className="h-[44px] w-[44px]" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <div className="text-[15px]  text-[#414749]">{name}</div>
        <div className="mt-0.5 text-[12px] text-[#9CA3AF]">{meta}</div>
      </div>
    </div>
  );
}
