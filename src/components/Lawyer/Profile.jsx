import React, { useMemo, useState } from "react";
import Client from "../../assets/client.png";
import Madel from "../../assets/madel.png"
import { ChevronLeft, ChevronRight } from "lucide-react";

const StarRow = ({ value = 5 }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="flex items-center gap-1">
      {stars.map((on, idx) => (
        <svg
          key={idx}
          viewBox="0 0 24 24"
          className="h-9 w-9"
          aria-hidden="true"
        >
          <path
            d="M12 17.27l-5.18 3.1 1.4-5.92L3 9.24l6.05-.52L12 3l2.95 5.72 6.05.52-5.22 5.21 1.4 5.92L12 17.27z"
            fill={on ? "#F5B301" : "#E6E6E6"}
          />
        </svg>
      ))}
    </div>
  );
};

const PencilIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={["h-4 w-4", className].join(" ")}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm2.92 2.83H5v-.92l9.06-9.06.92.92L5.92 20.08ZM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82Z"
    />
  </svg>
);

const MedalIcon = ({ className = "" }) => (
  <svg
    viewBox="0 0 24 24"
    className={["h-7 w-7", className].join(" ")}
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M12 2a5 5 0 0 0-3.5 8.6L7 22l5-2.2L17 22l-1.5-11.4A5 5 0 0 0 12 2Zm0 2a3 3 0 1 1 0 6a3 3 0 0 1 0-6Z"
    />
  </svg>
);

const ProfilePage = () => {
  const [name, setName] = useState("Ali Marsad");
  const [tagline, setTagline] = useState("Tagline Goes here");

  const [bio1, setBio1] = useState(
    "Description: Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu. Description: Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu."
  );
  const [bio2, setBio2] = useState(
    "Description: Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.Description: Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu."
  );

  const [skills, setSkills] = useState([
    "Skill 123",
    "3456789",
    "Skill 123",
    "Good to work",
    "Skill 123",
    "Skill 123",
    "Skill 123",
  ]);

  const portfolio = useMemo(
    () => [
      {
        id: "p1",
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu. ",
        reviewer: "Client Name",
        location: "Location",
        rating: 5,
        quote:
          "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu. in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
      },
      {
        id: "p2",
        title: "Case Title Goes here",
        desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
        reviewer: "Client Name",
        location: "Location",
        rating: 5,
        quote:
          "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu. in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
      },
    ],
    []
  );

  const [certs, setCerts] = useState([
    {
      id: "c1",
      title: "Certificate Title",
      desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu. ",
    },
    {
      id: "c2",
      title: "Certificate Title",
      desc: "Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu id. Vel imperdiet nunc commodo cursus nunc augue eu.",
    },
  ]);

  const [editing, setEditing] = useState({
    tagline: false,
    bio: false,
  });



  return (
    <div className="h-full bg-white">
      {/* page max width like screenshot */}
      <div className=" w-full max-w-full px-4 py-6">
        {/* Header: avatar + name + tagline */}
        <div id="Profile" className="flex-1 items-start gap-4">
          <div className="flex">
            <div className="relative">
              <img
                src={Client}
                alt="avatar"
                className="h-22 w-22 rounded-full object-cover"
              />
              <button
                type="button"
                className="absolute -right-1 -bottom-1  grid h-9 w-9 place-items-center cursor-pointer rounded-full border border-[#F9EFDB] bg-[#F9EFDB] text-[#585a5c] shadow-sm hover:text-[#6B7280]"
                aria-label="Edit avatar"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 mt-7">
            <div className="text-[18px] font-semibold text-[#414749]">
              {name}
            </div>

            <div className="mt-1 flex items-center gap-2">
              {editing.tagline ? (
                <input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  onBlur={() => setEditing((p) => ({ ...p, tagline: false }))}
                  className="w-full rounded-md border border-[#E5E7EB] bg-white px-2 py-1 text-[14px] text-[#374151] outline-none"
                  autoFocus
                />
              ) : (
                <>
                  <div className="text-[12px] text-[#6B7280]">{tagline}</div>
                  <button
                    type="button"
                    className="text-[#9CA3AF] cursor-pointer hover:text-[#6B7280]"
                    aria-label="Edit tagline"
                    onClick={() => setEditing((p) => ({ ...p, tagline: true }))}
                  >
                    <PencilIcon />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <div className="text-[16px] font-semibold text-[#414749]">Bio</div>
            <button
              type="button"
              className="text-[#9CA3AF] cursor-pointer hover:text-[#6B7280]"
              aria-label="Edit bio"
              onClick={() => setEditing((p) => ({ ...p, bio: !p.bio }))}
            >
              <PencilIcon />
            </button>
          </div>

          <div className="mt-2 space-y-3 text-[12px] leading-5 text-[#6B7280]">
            {editing.bio ? (
              <>
                <textarea
                  value={bio1}
                  onChange={(e) => setBio1(e.target.value)}
                  className="min-h-[90px] w-full rounded-md border border-[#E5E7EB] bg-white p-2 text-[14px] text-[#374151] outline-none"
                />
                <textarea
                  value={bio2}
                  onChange={(e) => setBio2(e.target.value)}
                  className="min-h-[90px] w-full rounded-md border border-[#E5E7EB] bg-white p-2 text-[14px] text-[#374151] outline-none"
                />
              </>
            ) : (
              <>
                <p className=" text-[14px]">{bio1}</p>
                <p className=" text-[14px]">{bio2}</p>
              </>
            )}
          </div>
        </div>

        {/* Skills */}
        <div id="Skill" className="mt-6">
          <div className="text-[16px] font-semibold text-[#414749]">Skills</div>

          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s, idx) => (
              <span
                key={`${s}-${idx}`}
                className="rounded-md bg-[#F3F4F6] px-2.5 py-1 text-[14px] text-[#6B7280]"
              >
                {s}
              </span>
            ))}
          </div>

          <button
            type="button"
           
            className="mt-3 rounded-md cursor-pointer border border-[#E5E7EB] bg-white px-3 py-1.5 text-[14px] text-[#414749] hover:bg-[#F9FAFB]"
          >
            Add
          </button>
        </div>

        {/* Portfolio */}
        <div id="Portfolio" className="mt-8">
          <div className="flex items-center justify-between">
            <div className="text-[16px] font-semibold text-[#414749]">
              Portfolio
            </div>
            <button
              type="button"
              className="rounded-md cursor-pointer bg-[#E5E7EB] px-3 py-1.5 text-[14px] text-[#414749] hover:bg-[#D1D5DB]"
            >
              Add Case
            </button>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {portfolio.map((p) => (
              <div
                key={p.id}
                className="overflow-hidden rounded-lg border border-[#E6B277] bg-[#FFF7EE]"
              >
                <div className="p-4">
                  <div className="text-[17px] font-semibold text-[#414749]">
                    {p.title}
                  </div>
                  <div className="mt-1 text-[14px] leading-5 text-[#6B7280]">
                    {p.desc}
                  </div>
                </div>

                <div className="bg-[#FFF7EE] ">
                  <div className="text-[14px] px-5 font-medium text-[#6B7280]">
                    Review by
                  </div>

                  <div className="mt-2 px-5 pb-5 flex items-center gap-3">
                    <img
                      src={Client}
                      alt="reviewer"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-[14px] font-semibold text-[#414749]">
                        {p.reviewer}
                      </div>
                      <div className="text-[12px] text-[#6B7280]">
                        {p.location}
                      </div>
                    </div>
                  </div>
                    <div className="bg-white px-5 py-5">
                  <div className="mt-3">
                    <StarRow value={p.rating} />
                  </div>

                  <div className="mt-3 text-[14px] leading-5 text-[#6B7280]">
                    “{p.quote}”
                  </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-4 text-[14px] text-[#6B7280]">
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 hover:text-[#111827]"
            >
              <span className="text-[14px] leading-none"><ChevronLeft/></span> Previous
            </button>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 hover:text-[#111827]"
            >
              Next <span className="text-[14px] leading-none"><ChevronRight/></span>
            </button>
          </div>
        </div>

        {/* Certifications */}
        <div id="Certificate" className="mt-8">
          <div className="flex items-center justify-between">
            <div className="text-[16px] font-semibold text-[#414749]">
              Certifications
            </div>
            <button
              type="button"
              className="rounded-md bg-[#E5E7EB] cursor-pointer px-3 py-1.5 text-[14px] text-[#414749] hover:bg-[#D1D5DB]"
            >
              Add Certificate
            </button>
          </div>

          <div className="mt-3 space-y-4">
            {certs.map((c) => (
              <div
                key={c.id}
                className="rounded-lg border border-[#E6B277] bg-white p-5"
              >
                <div className="flex gap-3">
                  <div className="mt-0.5 text-[#E2A34B]">
                    <img src={Madel} alt="image" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[16px] font-semibold text-[#414749]">
                      {c.title}
                    </div>
                    <div className="mt-1 text-[14px] text-[#6B7280]">
                      <span className="font-semibold text-[#6B7280]">
                        Description:
                      </span>{" "}
                      <br />
                      {c.desc}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}
        <button
          type="button"
          className="mt-8 w-full rounded-md cursor-pointer bg-[#D6A15A] py-3 text-[14px] font-semibold text-white hover:opacity-95 active:opacity-90"
        >
          Save Changes
        </button>

        {/* small bottom spacing like screenshot */}
        <div className="h-6" />
      </div>
    </div>
  );
};

export default ProfilePage;
