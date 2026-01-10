import React, { useState } from "react";
import Topbar from "../../components/Topbar";
import Herologo from "../../assets/herologo.png";
import Tabpic from "../../assets/tab.png";
import Tabpic2 from "../../assets/tab2.png";
import vector from "../../assets/Vector.png";
import vector2 from "../../assets/Vector 2.png";
import global from "../../assets/global.png";
import study from "../../assets/case-study.png";
import Sectionimage from "../../assets/sectionimage.png";
import Man from "../../assets/man.png";
import Quote from "../../assets/quote.png";
import Card1 from "../../assets/card1.png";
import Card2 from "../../assets/card2.png";
import Card3 from "../../assets/card3.png";
import { MoveLeft, MoveRight, Search } from "lucide-react";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    "../../assets/sectionimage.png",
    "../../assets/sectionimage.png",
    "../../assets/sectionimage.png",
  ];

  const steps = [
    {
      title: "Post Your Case",
      desc: "Share the details of your legal needs.",
      active: true,
    },
    { title: "Receive Bids", desc: "", active: false },
    { title: "Select Your Lawyer", desc: "", active: false },
    { title: "Discuss Your Case", desc: "", active: false },
    { title: "Pay Securely", desc: "", active: false },
  ];

  const workingSteps = [
    {
      title: "Sign Up",
      desc: "Create your profile and share your expertise.",
      active: true,
    },
    { title: "Qualify", desc: "", active: false },
    { title: "Browse Cases", desc: "", active: false },
    { title: "Place Bids", desc: "", active: false },
    { title: "Get Paid", desc: "", active: false },
  ];

  return (
    <>
      <Topbar />
      <div id="Home" className="grid grid-cols-1 p-8 md:p-10 mt-5 lg:grid-cols-2">
        <div>
          <div className="pt-16 lg:p-24">
            <h1 className="text-[#012B37] font-semibold flex-wrap text-5xl md:text-6xl">
              Find the <span className="text-[#DFA458]">Right Lawyer</span> for
              Your Case, <span className="text-[#DFA458]">Anywhere</span> in the
              World
            </h1>
            <p className="flex-wrap text-gray-700 mt-5">
              Connect with trusted lawyers worldwide. Whether you need legal
              advice or want to offer your expertise, Juriph makes it simple and
              secure.
            </p>
            <div className=" mt-7 flex flex-col gap-5 w-60">
              <button className="px-6 py-2.5 cursor-pointer rounded-lg font-medium bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766] transition">
                Post a Case
              </button>
              <button className="px-6 py-2.5 cursor-pointer rounded-lg font-medium border border-[#E8C284] text-[#012B37] hover:bg-[#f5e5c7] transition">
                Sign Up as Lawyer
              </button>
            </div>
          </div>
        </div>
        <div className="flex mt-10 sm:mt-5 justify-center">
          <img src={Herologo} alt="herologo" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-20 px-6 sm:px-10 lg:px-20 py-5 sm:py-14">
        {/* LEFT: Search Section */}
        <div className="lg:col-span-3 mt-7">
          <div className="w-full border border-gray-300 rounded-xl px-4 py-3 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            {/* Search input */}
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Find lawyers by specialty, location, or keyword"
                className="w-full outline-none placeholder-gray-400 bg-transparent text-sm sm:text-base"
              />
            </div>

            {/* Filter */}
            <div className="w-full sm:w-28">
              <select
                name="skills"
                className="w-full border-t sm:border-t-0 sm:border-l border-gray-300 px-3 py-2 text-sm outline-none text-gray-500 bg-white cursor-pointer  sm:rounded-none"
              >
                <option value="">Skills</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <button className="w-full sm:w-auto mt-5 px-10 cursor-pointer py-2.5 rounded-lg font-medium bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766] transition">
            Search
          </button>
        </div>

        {/* RIGHT: Content */}
        <div className="lg:col-span-2">
          <h1 className="text-[#012B37] font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
            Start your search by specifying{" "}
            <span className="text-[#DFA458]">your needs.</span>
          </h1>

          <p className="text-gray-700 mt-5 text-sm sm:text-base leading-relaxed">
            Find the right lawyer based on specialty, budget, or location.
            Quickly connect with qualified legal professionals tailored to your
            case.
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div id="About" className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
        {/* LEFT */}
        <div className="order-1 lg:order-0 lg:col-span-2 bg-[#E8C284] text-[#012B37] px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0">
            <h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight text-center lg:text-left">
              Post a case and connect with qualified lawyers instantly.
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-center lg:text-left">
              Describe your legal needs, and our platform will connect you with
              experienced lawyers ready to assist. Review bids, compare
              expertise, and choose the best match—all in one secure platform.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button className="w-full sm:w-auto px-8 py-3 cursor-pointer bg-[#fff9ec] rounded-lg font-medium border border-[#E8C284] text-[#012B37] hover:bg-[#f5e5c7] transition">
                Post Your Case Now
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="order-2 lg:order-0 lg:col-span-3 bg-[#FCF8F0] flex items-center justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-0">
          <div className="w-full max-w-2xl lg:max-w-3xl">
            <img
              src={Tabpic}
              alt="Platform preview"
              className="w-full h-auto relative top-20 object-contain block mx-auto translate-y-6 sm:translate-y-10 lg:translate-y-0"
            />
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-5 overflow-hidden">
        {/* IMAGE (shows first on mobile, left on desktop) */}
        <div className="order-2 lg:order-0 lg:col-span-3 bg-[#FCF8F0] flex items-center justify-center px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-0">
          <div className="w-full max-w-2xl lg:max-w-3xl">
            <img
              src={Tabpic2}
              alt="Platform preview"
              className="w-full h-auto relative top-20 object-contain block mx-auto translate-y-6 sm:translate-y-10 lg:translate-y-0"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="order-1 lg:order-0 lg:col-span-2 bg-[#E8C284] text-[#012B37] px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0">
            <p className="text-sm sm:text-base font-medium text-[#393E40] text-center lg:text-left">
              If you are a Lawyer
            </p>

            <h1 className="font-semibold mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight text-center lg:text-left">
              Bid on cases matching your skills and grow your practice.
            </h1>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-center lg:text-left">
              Sign up to discover cases that match your skills. Bid on
              opportunities, communicate securely with clients, and build your
              reputation—all while managing your practice efficiently.
            </p>

            <div className="mt-8 flex justify-center lg:justify-start">
              <button className="w-full sm:w-auto cursor-pointer px-8 py-3 bg-[#fff9ec] rounded-lg font-medium border border-[#E8C284] text-[#012B37] hover:bg-[#f5e5c7] transition">
                Sign Up as Lawyer
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Section 3 */}
      <div id="Features" className="w-full bg-white">
        <div className=" px-4 sm:px-6 lg:px-36 pt-16 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-16 lg:py-20">
            {/* LEFT */}
            <div className="order-1 lg:order-1">
              <h1 className="text-[#012B37] font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight">
                Why Choose <span className="text-[#DFA458]">Juriph?</span>
              </h1>

              <div className="mt-8 sm:mt-10 space-y-6">
                {/* item */}
                <div className="flex gap-3 sm:gap-4">
                  <img
                    src={vector}
                    alt=""
                    className="w-6 h-6 mt-0.5 shrink-0"
                  />
                  <div>
                    <h2 className="font-semibold text-[#393E40]">
                      Secure Payments:
                    </h2>
                    <p className="text-[#393E40] mt-1 text-sm sm:text-base leading-relaxed">
                      Ensuring financial safety for all transactions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <img
                    src={vector2}
                    alt=""
                    className="w-6 h-6 mt-0.5 shrink-0"
                  />
                  <div>
                    <h2 className="font-semibold text-[#393E40]">
                      Private Chat:
                    </h2>
                    <p className="text-[#393E40] mt-1 text-sm sm:text-base leading-relaxed">
                      Seamless communication between clients and lawyers.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <img
                    src={global}
                    alt=""
                    className="w-6 h-6 mt-0.5 shrink-0"
                  />
                  <div>
                    <h2 className="font-semibold text-[#393E40]">
                      Global Accessibility:
                    </h2>
                    <p className="text-[#393E40] mt-1 text-sm sm:text-base leading-relaxed">
                      Connect with lawyers and clients worldwide.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <img src={study} alt="" className="w-6 h-6 mt-0.5 shrink-0" />
                  <div>
                    <h2 className="font-semibold text-[#393E40]">
                      Effortless Case Management:
                    </h2>
                    <p className="text-[#393E40] mt-1 text-sm sm:text-base leading-relaxed">
                      Streamlined workflows for both parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT (Slider) */}
            <div className="order-2 lg:order-2 flex flex-col items-center">
              {/* Keeps height stable across slides */}
              <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <div className="relative w-full aspect-4/3 sm:aspect-16/10 overflow-hidden rounded-2xl">
                  <img
                    src={Sectionimage}
                    alt={`Slide ${activeIndex + 1}`}
                    className="h-full w-full object-contain transition-opacity duration-500 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Dots */}
              <div className="mt-5 flex items-center gap-2">
                {images.map((_, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Go to slide ${index + 1}`}
                      className={`
                  h-2.5 w-2.5 rounded-full transition-all duration-300 ease-out
                  focus:outline-none focus:ring-2 focus:ring-[#DFA458]/40
                  ${
                    isActive
                      ? "bg-[#DFA458]"
                      : "bg-[#DFA458]/30 hover:bg-[#DFA458]/60"
                  }
                `}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4 */}
      <div id="How-it-works" className="bg-gradient-to-b from-[#E8C284] via-[#E8C284] to-[#f5e4c9] px-4 sm:px-6 md:px-10 lg:px-20 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="flex items-center justify-center">
          <div className="bg-white flex items-center justify-center rounded-md overflow-hidden w-full max-w-md sm:max-w-lg md:max-w-xl px-6 sm:px-10 py-10 sm:py-16 md:py-20">
            <img
              src={Sectionimage}
              alt="image"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full">
          <div className="w-full sm:max-w-xl lg:max-w-none mx-auto py-2 sm:py-4 md:p-0">
            {/* Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-medium leading-snug sm:leading-tight text-[#1D2021]">
              Easy Steps to Connect <br className="hidden sm:block" />
              with <span className="text-white">Trusted Lawyers</span>
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-[15px] md:text-base leading-relaxed text-[#1D2021] max-w-xl">
              Finding the right lawyer is easy with Juriph. Follow these simple
              steps:
            </p>

            {/* Steps */}
            <div className="mt-6">
              {steps.map((s, i) => {
                const isActive = s.active;
                return (
                  <div
                    key={i}
                    className="relative flex gap-3 sm:gap-4 pb-5 last:pb-0"
                  >
                    {/* Left side: number (DON'T TOUCH VERTICAL LINE) */}
                    <div className="relative flex flex-col items-center shrink-0">
                      <div
                        className={`grid place-items-center rounded-full font-semibold
                    ${
                      isActive
                        ? "h-10 w-10 bg-[#F7E2C2] text-[#1D2021]"
                        : "h-8 w-8 bg-[#F7E2C2]/70 text-xs text-[#1D2021]/70"
                    }`}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* Vertical line (UNCHANGED) */}
                    {i !== steps.length - 1 && (
                      <span className="absolute top-9 bottom-0 w-px bg-white/50" />
                    )}

                    {/* Right side: content */}
                    <div className="pt-1">
                      <h3
                        className={[
                          "text-[15px] sm:text-base font-semibold",
                          isActive
                            ? "text-[#1D2021]"
                            : "text-[#1D2021]/55 font-medium",
                        ].join(" ")}
                      >
                        {s.title}
                      </h3>

                      {s.desc ? (
                        <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-[#1D2021]/60 max-w-xl">
                          {s.desc}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Section 5 */}
      <div
        className="
    bg-gradient-to-b from-[#f5e4c9] via-[#E8C284] to-[#E8C284]
    px-4 sm:px-6 md:px-10 lg:px-20
    py-10 md:py-16
    grid grid-cols-1 lg:grid-cols-2
    gap-8 lg:gap-12
  "
      >
        {/* IMAGE (TOP on mobile, RIGHT on desktop) */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div
            className="
        bg-white
        flex items-center justify-center
        rounded-md overflow-hidden
        w-full max-w-md sm:max-w-lg md:max-w-xl
        px-6 sm:px-10
        py-10 sm:py-16 md:py-20
      "
          >
            <img
              src={Sectionimage}
              alt="How it works"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* CONTENT (BOTTOM on mobile, LEFT on desktop) */}
        <div className="order-2 lg:order-1 flex items-center">
          <div className="w-full sm:max-w-xl lg:max-w-none mx-auto lg:ml-32">
            {/* Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-medium leading-snug sm:leading-tight text-[#1D2021]">
              How It Works for Lawyers
            </h2>

            {/* Subtitle */}
            <p className="mt-3 text-sm sm:text-[15px] md:text-base leading-relaxed text-[#1D2021] max-w-xl">
              Expand your practice by easily connecting with clients in need of
              your expertise. Follow these simple steps:
            </p>

            {/* Steps */}
            <div className="mt-6">
              {workingSteps.map((s, i) => {
                const isActive = s.active;

                return (
                  <div
                    key={i}
                    className="relative flex gap-3 sm:gap-4 pb-5 last:pb-0"
                  >
                    {/* LEFT: NUMBER */}
                    <div className="relative flex flex-col items-center shrink-0">
                      <div
                        className={`grid place-items-center rounded-full font-semibold
                    ${
                      isActive
                        ? "h-10 w-10 bg-[#F7E2C2] text-[#1D2021]"
                        : "h-8 w-8 bg-[#F7E2C2]/70 text-xs text-[#1D2021]/70"
                    }`}
                      >
                        {i + 1}
                      </div>
                    </div>

                    {/* VERTICAL LINE (UNCHANGED) */}
                    {i !== workingSteps.length - 1 && (
                      <span className="absolute top-9 bottom-0 w-px bg-white/50" />
                    )}

                    {/* RIGHT: CONTENT */}
                    <div className="pt-1">
                      <h3
                        className={[
                          "text-[15px] sm:text-base font-semibold",
                          isActive
                            ? "text-[#1D2021]"
                            : "text-[#1D2021]/55 font-medium",
                        ].join(" ")}
                      >
                        {s.title}
                      </h3>

                      {s.desc && (
                        <p className="mt-1 text-sm sm:text-[15px] leading-relaxed text-[#1D2021]/60 max-w-xl">
                          {s.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Section 6 */}
      <div id="FAQs" className="px-4 sm:px-8 md:px-12 lg:px-20 py-14 mt-14 flex-1">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl text-[#012B37] font-medium">
            What Our Users Are Saying
          </h1>
          <p className="text-[#393E40] mt-4 text-md sm:text-base">
            Real experiences from clients and lawyers who have found success
            with Juriph.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="mt-10 bg-[#FCF8F0] rounded-xl px-5 sm:px-8 md:px-10 py-8 lg:mx-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start">
            {/* Image */}
            <div className="shrink-0">
              <img
                src={Man}
                alt="user"
                width="90%"
                className=" object-cover rounded-md"
              />
            </div>

            {/* Content */}
            <div className="w-full">
              <div className="flex items-start justify-between gap-4">
                <div className="mt-6 sm:mt-10">
                  <h2 className="text-lg sm:text-xl font-medium text-[#012B37]">
                    Nick Johnson
                  </h2>
                  <p className="mt-1 text-sm sm:text-base text-[#393E40]">
                    Destination goes here
                  </p>
                </div>

                <img
                  src={Quote}
                  alt="quote"
                  className="w-20 sm:w-24 md:w-32 opacity-80 flex shrink-0"
                />
              </div>

              <p className="mt-4 text-[#1D2021] text-sm sm:text-base lg:text-lg leading-relaxed">
                “Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in
                eu id. Vel imperdiet nunc commodo cursus nunc augue eu. Non in
                sit pretium non turpis eu sit. Molestie a nec sed nulla. Aliquam
                vitae eget cras fermentum et aliquet magna augue auctor. Eget
                elit sed.”
              </p>
            </div>
          </div>
          <div className="flex justify-end mt-5 gap-3">
            <button
              className="
      h-8 w-20 px-3
      border border-gray-500
      rounded-md
      flex items-center justify-start
      cursor-pointer
      transition-all duration-200
      hover:bg-gray-100
      hover:border-gray-700
      group
    "
            >
              <MoveLeft className="text-gray-500 transition-colors duration-200 group-hover:text-gray-700" />
            </button>

            <button
              className="
      h-8 w-20 px-3
      border border-gray-500
      rounded-md
      flex items-center justify-end
      cursor-pointer
      transition-all duration-200
      hover:bg-gray-100
      hover:border-gray-700
      group
    "
            >
              <MoveRight className="text-gray-500 transition-colors duration-200 group-hover:text-gray-700" />
            </button>
          </div>
        </div>
      </div>
      {/* Section 7 */}
      <div className="w-full bg-[#FCF8F0] mt-20 px-6 sm:px-10 lg:px-24 py-10 sm:py-14 ">
        <div className="flex-1 items-center justify-center mt-20 text-center">
          <h1 className="text-[#012B37] font-semibold text-3xl sm:text-5xl leading-tight">
            What's New?
          </h1>
          <p className="text-[#393E40] mt-4">
            Lorem ipsum dolor sit amet consectetur. Pellentesque sapien in eu
            id.
          </p>
          <button className="px-6 py-2.5 mt-14 cursor-pointer rounded-lg font-medium bg-[#E8C284] text-[#012B37] hover:bg-[#e2b766] transition">
            Visit Knowledge Base
          </button>
          <div className="w-full mt-20 md:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* card 1 */}
              <div className="p-5 border border-[#E8C284] bg-white rounded-xl flex flex-col">
                {/* Image */}
                <img
                  src={Card1}
                  alt="Card"
                  className="w-full h-48 sm:h-72 object-cover rounded-t-lg"
                />

                {/* Category & Read time */}
                <div className="flex justify-between items-center mt-4 text-xs text-[#393E40]">
                  <p className="font-medium py-1 px-2 bg-[#faecd0] rounded-md">Roofing Services</p>
                  <p>08 min read</p>
                </div>

                {/* Title */}
                <h2 className="mt-3 text-md sm:text-lg font-semibold text-black text-left">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas.
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-[#393E40] leading-relaxed text-left">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas facilisi. Mattis imperdiet dignissim adipiscing
                  vulputate vel in ultrices nullam.
                </p>

                {/* Button */}
                <button
                onClick={()=>{navigate("/blog-details")}}
                  className=" self-start px-6 py-2.5 mt-6 cursor-pointer rounded-lg font-medium 
                   bg-[#E8C284] text-[#012B37]
                   hover:bg-[#e2b766] transition"
                >
                  Read More
                </button>
              </div>
              {/* card 2 */}
              <div className="p-5 border border-[#E8C284] bg-white rounded-xl flex flex-col">
                {/* Image */}
                <img
                  src={Card2}
                  alt="Card"
                  className="w-full h-48 sm:h-72 object-cover rounded-t-lg"
                />

                {/* Category & Read time */}
                <div className="flex justify-between items-center mt-4 text-xs text-[#393E40]">
                  <p className="font-medium py-1 px-2 bg-[#faecd0] rounded-md">Roofing Services</p>
                  <p>08 min read</p>
                </div>

                {/* Title */}
                <h2 className="mt-3 text-md sm:text-lg font-semibold text-black text-left">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas.
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-[#393E40] leading-relaxed text-left">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas facilisi. Mattis imperdiet dignissim adipiscing
                  vulputate vel in ultrices nullam.
                </p>

                {/* Button */}
                <button
                onClick={()=>{navigate("/blog-details")}}
                  className=" self-start px-6 py-2.5 cursor-pointer mt-6 rounded-lg font-medium 
                   bg-[#E8C284] text-[#012B37]
                   hover:bg-[#e2b766] transition"
                >
                  Read More
                </button>
              </div>
              {/* card 3 */}
              <div className="p-5 border border-[#E8C284] bg-white rounded-xl flex flex-col">
                {/* Image */}
                <img
                  src={Card3}
                  alt="Card"
                  className="w-full h-48 sm:h-72 object-cover rounded-t-lg"
                />

                {/* Category & Read time */}
                <div className="flex justify-between items-center mt-4 text-xs text-[#393E40]">
                  <p className="font-medium py-1 px-2 bg-[#faecd0] rounded-md">Roofing Services</p>
                  <p>08 min read</p>
                </div>

                {/* Title */}
                <h2 className="mt-3 text-md sm:text-lg font-semibold text-black text-left">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas.
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-[#393E40] leading-relaxed text-left">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas facilisi. Mattis imperdiet dignissim adipiscing
                  vulputate vel in ultrices nullam.
                </p>

                {/* Button */}
                <button
                onClick={()=>{navigate("/blog-details")}}
                  className=" self-start px-6 py-2.5 cursor-pointer mt-6 rounded-lg font-medium 
                   bg-[#E8C284] text-[#012B37]
                   hover:bg-[#e2b766] transition"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default Home;
