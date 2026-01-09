import React from "react";
import Topbar from "../../components/Topbar";
import HeroImg1 from "../../assets/blog-hero-1.png";
import HeroImg2 from "../../assets/blog-hero-2.png";
import HeroImg3 from "../../assets/blog-hero-3.png";
import HeroImg4 from "../../assets/blog-hero-4.jpg";
import HeroImgFeatured from "../../assets/blog-featured.png";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function BlogDetails(){

const blogs = [ 
  { id: 1, img: HeroImg1, category: "Roofing Services", time: "08 min read" },
  { id: 2, img: HeroImg2, category: "Roofing Services", time: "08 min read" },
  { id: 3, img: HeroImg3, category: "Roofing Services", time: "08 min read" },
  { id: 4, img: HeroImg3, category: "Roofing Services", time: "08 min read" },
  { id: 5, img: HeroImg4, category: "Roofing Services", time: "08 min read" },
  { id: 6, img: HeroImg1, category: "Roofing Services", time: "08 min read" },
  { id: 7, img: HeroImg2, category: "Roofing Services", time: "08 min read" },
  { id: 8, img: HeroImg3, category: "Roofing Services", time: "08 min read" },];

const navigate = useNavigate();

    return(
        <>
        <Topbar />
         <div className="min-h-screen bg-white">
      {/* Container */}
      <div className="mx-auto w-full max-w-7xl mt-10 px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Title */}
        <h1 className="text-center text-2xl sm:text-4xl lg:text-5xl font-semibold text-[#012B37] leading-tight">
          How to Choose the Right Lawyer for <br className="hidden sm:block" />
          Your Case
        </h1>

        {/* Image card */}
        <div className="mt-6 sm:mt-10 mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-white">
          {/* Image */}
          <div className="w-full bg-[#F5F5F5]">
            <img
              // src={HeroImg}
              src={HeroImgFeatured}
              alt="Blog cover"
              className="h-42.4 sm:h-60 md:h-75 w-full object-cover"
            />
          </div>

          {/* Meta row */}
          <div className="flex items-center justify-between px-3 sm:px-5 py-3 text-xs sm:text-sm text-[#5F6B6F]">
            <span>Roofing Services</span>
            <span>08 min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-7 sm:mt-10 text-[#1D2021]">
          <p className="text-sm sm:text-base leading-7 text-[#3A3F41]">
            When it comes to legal matters, choosing the right lawyer is crucial
            to the success of your case. Whether you’re a client looking for
            legal assistance or a lawyer seeking new clients, finding the
            perfect match can make all the difference. Here’s a step-by-step
            guide on how to choose the right lawyer for your needs:
          </p>

          <div className="mt-6 space-y-6">
            {/* Item 1 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-[#012B37]">
                1. Understand Your Legal Needs
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
                The first step in choosing the right lawyer is to clearly
                understand your legal needs. Lawyers specialize in different
                areas of law, such as family law, criminal law, personal injury,
                or corporate law. Determining the nature of your case will help
                you narrow down the pool of potential lawyers to those with the
                relevant expertise.
              </p>
            </div>

            {/* Item 2 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-[#012B37]">
                2. Research Potential Lawyers
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
                Once you have a clear idea of your legal needs, start researching
                lawyers who specialize in your area of law. Look for reputable
                law firms or independent lawyers with experience handling cases
                similar to yours. Check online reviews, ask for recommendations
                from friends or colleagues, and review their websites for client
                testimonials and case results.
              </p>
            </div>

            {/* Item 3 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-[#012B37]">
                3. Schedule a Consultation
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
                Many lawyers offer free initial consultations to discuss your
                case. This is a great opportunity to ask questions, evaluate
                their experience, and assess whether you feel comfortable working
                with them. During the consultation, be sure to ask about their
                experience with cases like yours, their approach to handling
                cases, and their fee structure.
              </p>
            </div>

            {/* Item 4 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-[#012B37]">
                4. Consider Communication and Compatibility
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
                Effective communication is key to any legal relationship. Pay
                attention to how the lawyer communicates with you during the
                consultation. Are they responsive, clear, and respectful? Do
                they take the time to explain legal concepts in a way that makes
                sense to you? It’s important to feel comfortable with your
                lawyer and confident that they understand your goals.
              </p>
            </div>

            {/* Item 5 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-[#012B37]">
                5. Evaluate the Costs
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
                Legal fees can vary significantly depending on the complexity of
                the case and the lawyer’s experience. Some lawyers charge hourly
                rates, while others may work on a flat fee or contingency basis
                (only charging if they win your case). Be sure to discuss the
                cost upfront, and ensure that you understand how billing works
                before committing to a lawyer.
              </p>
            </div>

            {/* Item 6 */}
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-[#012B37]">
                6. Trust Your Instincts
              </h3>
              <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
                Finally, trust your instincts. If something doesn’t feel right
                or if you don’t feel confident in a lawyer’s ability to handle
                your case, don’t hesitate to seek out other options. Choosing
                the right lawyer is an important decision, and you should feel
                comfortable and confident in your choice.
              </p>
            </div>
          </div>

          {/* Conclusion */}
          <div className="mt-8 sm:mt-10">
            <h2 className="text-base sm:text-lg font-semibold text-[#012B37]">
              Conclusion
            </h2>
            <p className="mt-2 text-sm sm:text-base leading-7 text-[#3A3F41]">
              Choosing the right lawyer doesn’t have to be overwhelming. By
              understanding your legal needs, conducting thorough research, and
              trusting your instincts, you’ll be able to find a lawyer who is a
              perfect fit for your case. If you’re looking for a lawyer today,
              start by posting your case on Juriph and get connected with
              qualified professionals ready to assist you.
            </p>
          </div>
        </div>
      </div>
      <section className="bg-white">
      <div className="mx-auto max-w-7xl  lg:px-8 py-10 sm:py-14">
        {/* Heading */}
        <h2 className="text-center text-4xl sm:text-6xl font-semibold text-[#012B37]">
          Relevant Blogs
        </h2>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.slice(0, 3).map((b) => (
            <article
              key={b.id}
              className="group rounded-xl border border-[#E8C284]/40 bg-white overflow-hidden"
            >
              {/* Image */}
              <div className="p-3">
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={b.img}
                    alt={b.id}
                    className="h-44 sm:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
              </div>

              {/* Meta */}
              <div className="px-4 pb-1 flex items-center justify-between text-[11px] text-[#6B6F72]">
                <span>{b.category}</span>
                <span>{b.time}</span>
              </div>

              {/* Content */}
              <div className="px-4 pb-4 flex flex-col">
                <h3 className="mt-2 text-lg font-semibold text-[#012B37] leading-snug">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at mauris egestas.
                </h3>

                <p className="mt-2 text-sm leading-5 text-[#6B6F72]">
                  Lorem ipsum dolor sit amet consectetur. Eget leo justo at mauris egestas facilisi. Mattis imperdiet dignissim adipiscing vulputate vel in ultrices nullam.
                </p>

                {/* Button (same small pill look) */}
                <div className="mt-4">
                  <button 
                  onClick={()=>{navigate("/blog-details")}}
                  className="rounded-md bg-[#E8C284] cursor-pointer px-4 py-1.5  font-medium text-[#012B37] hover:bg-[#e2b766] transition">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </div>

    <Footer className="mt-20" />
        </>
    )
}
export default BlogDetails;