import React from "react";
import HeroImg1 from "../../assets/blog-hero-1.png";
import HeroImg2 from "../../assets/blog-hero-2.png";
import HeroImg3 from "../../assets/blog-hero-3.png";
import HeroImg4 from "../../assets/blog-hero-4.jpg";
import HeroImgFeatured from "../../assets/blog-featured.png";
import Topbar from "../../components/Topbar";
import Footer from "../../components/Footer";  
import { useNavigate } from "react-router-dom";

const posts = [
  { id: 1, img: HeroImg1, category: "Roofing Services", time: "08 min read" },
  { id: 2, img: HeroImg2, category: "Roofing Services", time: "08 min read" },
  { id: 3, img: HeroImg3, category: "Roofing Services", time: "08 min read" },
  { id: 4, img: HeroImg3, category: "Roofing Services", time: "08 min read" },
  { id: 5, img: HeroImg4, category: "Roofing Services", time: "08 min read" },
  { id: 6, img: HeroImg1, category: "Roofing Services", time: "08 min read" },
  { id: 7, img: HeroImg2, category: "Roofing Services", time: "08 min read" },
  { id: 8, img: HeroImg3, category: "Roofing Services", time: "08 min read" },
];

export default function BlogPage() {
    const navigate = useNavigate()
  return (
    <>
    <Topbar />
    <div className="min-h-screen bg-white ">
      {/* Container */}
      <div className=" px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* HERO */}
        <div className="text-center">
          <h1 className="text-[30px] leading-tight sm:text-5xl font-semibold text-[#012B37]">
            Empowering Clients &amp; Lawyers with <br />
            <span className="text-[#DFA458]">Legal Knowledge</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#6B7280] leading-relaxed">
            Stay updated with the latest legal news, tips, and expert insights.
            Whether you&apos;re a client or lawyer, our blog covers everything
            you need to know.
          </p>
        </div>

        {/* FEATURED CARD */}
        <div className="mt-10 sm:mt-12 mx-auto max-w-6xl rounded-2xl border border-[#EED9B6] ] p-3 sm:p-5">
          <div className="overflow-hidden rounded-xl bg-white">
            {/* Image */}
            <div className="h-52.5 sm:h-70 md:h-80 w-full overflow-hidden">
              <img
                src={HeroImgFeatured}
                alt="featured"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between text-[11px] sm:text-sm text-[#6B7280]">
                <span>Roofing Services</span>
                <span>08 min read</span>
              </div>

              <h2 className="mt-3 text-xl  font-semibold text-[#111827]">
                Lorem ipsum dolor sit amet consectetur. Eget leo justo at mauris
                egestas facilisi.
              </h2>

              <p className="mt-2 text-sm sm:text-sm leading-relaxed text-[#6B7280]">
                Lorem ipsum dolor sit amet consectetur. Eget leo justo at mauris
                egestas facilisi. Mattis imperdiet dignissim adipiscing
                parturient maecenas lectus nulla. Scelerisque pulvinar porttitor
                consequat sagittis a in. Facilisi tellus vulputate vel in
                ultrices nullam.
              </p>

              <div className="mt-4 flex justify-end">
                <button
                onClick={()=>{navigate("/blog-details")}}
                className="rounded-lg cursor-pointer bg-[#E8C284] px-5 py-2 sm:text-sm font-medium text-[#012B37] hover:bg-[#e2b766]  transition">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 CARDS GRID */}
        <div className="mt-10 mx-auto sm:max-w-7/8 sm:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          {posts.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-[#EED9B6] p-4 bg-white overflow-hidden hover:shadow-lg transition"
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={p.img}
                  alt="blog"
                  className="h-full w-full rounded-t-lg object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span>{p.category}</span>
                  <span>{p.time}</span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-[#111827]">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas.
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at
                  mauris egestas facilisi. Mattis imperdiet dignissim
                  adipiscing vulputate vel in ultrices nullam.
                </p>

                <button 
                 onClick={()=>{navigate(`/blog-details`)}}
                className="mt-5 rounded-lg cursor-pointer bg-[#E8C284] px-4 py-2  font-medium text-[#012B37] hover:bg-[#e2b766]  transition">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
    