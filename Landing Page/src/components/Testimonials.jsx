import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, GraduationCap, Briefcase, ArrowRight } from "lucide-react";

import { alumniData } from "../data/alumniData";

/* ───── Real Alumni Data ───── */

/* ───── Real Recruiter Profile Photos ───── */
import imgRecruiterAnirban from "../assets/recruiter_anirban.jpg";
import imgRecruiterAtul from "../assets/recruiter_atul.jpg";
import imgRecruiterDpDas from "../assets/recruiter_dp_das.jpg";
import imgRecruiterDpSamantarai from "../assets/recruiter_dp_samantarai.jpg";
import imgRecruiterGajendra from "../assets/recruiter_gajendra.jpg";
import imgRecruiterNitin from "../assets/recruiter_nitin.jpg";
import imgRecruiterPuJacob from "../assets/recruiter_pu_jacob.jpg";

/* ───── Data ───── */
const testimonials = alumniData.slice(0, 30).map(alumni => {
  const parts = (alumni.designation || "").split(",");
  const company = parts.length > 1 ? parts[parts.length - 1].trim() : "Trident Alumni";
  const role = parts.length > 1 ? parts.slice(0, -1).join(",").trim() : alumni.designation;

  return {
    text: alumni.text || "Trident has given me the four best years of my life. The college gave me ample opportunities to prove my mettle.",
    author: alumni.name,
    role: role || "Alumni",
    branch: alumni.batch || "B.Tech",
    company: company,
    img: `/alumni/B.Tech/${alumni.image_file}`
  };
});

const recruiters = [
  { text: "It's a wonderful institute and I see it reflected in the students, their willingness to learn, their eagerness to benchmark themselves.", author: "Mr. Anirban Deep Ray", role: "Regional Head - Eastern India", company: "Tata Consultancy Services", img: imgRecruiterAnirban },
  { text: "The Campus Recruitment program was very well organized, well coordinated. One of the best experiences I have ever had at a campus event.", author: "Mr. Atul Shenoy", role: "Associate Executive HR", company: "Persistent Systems", img: imgRecruiterAtul },
  { text: "Excellent Infrastructure. I had wonderful experience during my visit at Trident. I am really thrilled to come across the faculties of Trident.", author: "Mr. D.P. Das", role: "D.G.M. (HR)", company: "L&T - ECC", img: imgRecruiterDpDas },
  { text: "The facilities available to students are world class and I was impressed by the enthusiasm the faculty members have about taking on new initiatives.", author: "Mr. D.P. Samantarai", role: "CEO", company: "Softtrends, Bangalore", img: imgRecruiterDpSamantarai },
  { text: "Great Campus experience. Great Campus and Team. Wonderful experience in hosting.", author: "Mr. Gajendra Menon", role: "Associate Director-Talent Acquisition", company: "NTT DATA Global Delivery Services", img: imgRecruiterGajendra },
  { text: "Trident Academy of Technology, Bhubaneswar is one of the preferred Engineering Institutes for us to recruit campus graduates.", author: "Mr. Nitin Kumar", role: "Senior Executive HR", company: "Exilant Technologies", img: imgRecruiterNitin },
  { text: "Promising Institute. Could develop as a leading private engineering college in India.", author: "Mr. P.U Jacob", role: "Associate V.P. HR", company: "Hexaware Technologies", img: imgRecruiterPuJacob },
];

/* ═══ Main Component ═══ */
export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("alumni");
  const [alumniIdx, setAlumniIdx] = useState(0);
  const [recruiterIdx, setRecruiterIdx] = useState(0);

  const data = activeTab === "alumni" ? testimonials : recruiters;
  const activeIdx = activeTab === "alumni" ? alumniIdx : recruiterIdx;
  const setActiveIdx = activeTab === "alumni" ? setAlumniIdx : setRecruiterIdx;

  const nextSlide = () => {
    setActiveIdx((prev) => (prev + 1) % data.length);
  };
  const prevSlide = () => {
    setActiveIdx((prev) => (prev - 1 + data.length) % data.length);
  };

  // Auto-play active slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [activeTab, data.length]);

  const item = data[activeIdx];

  return (
    <section className="relative bg-[#FAF9F6] py-24 md:py-32 overflow-hidden" id="testimonials">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-[50%] bg-[#2C3A8C]/5 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch rounded-3xl overflow-hidden shadow-2xl bg-white border border-[#3E3A36]/5">
          
          {/* Left Panel: 40% Grid (5 cols) - Navy Blue */}
          <div className="lg:col-span-5 bg-[#1A2660] text-white p-8 md:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Ambient glows */}
            <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#E8BD63]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-[#2C3A8C]/30 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E8BD63]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E8BD63]">
                  Voices of Trident
                </span>
              </div>

              <h2 className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                What they <br />
                <span className="italic text-[#E8BD63] font-serif font-light">say.</span>
              </h2>

              <p className="text-white/60 text-sm md:text-base font-medium leading-relaxed mb-10 max-w-sm">
                Hear from the outstanding alumni who built their careers and the corporate recruiters who trust Trident's talent.
              </p>

              {/* Dynamic Sliding Tab Switcher */}
              <div className="relative flex p-1 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 max-w-[280px]">
                {/* Active Indicator Background */}
                <div
                  className="absolute top-1 bottom-1 w-[calc(50%-6px)] rounded-lg bg-[#E8BD63] transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)"
                  style={{
                    transform: activeTab === "alumni" ? "translateX(0)" : "translateX(calc(100% + 4px))",
                    left: "4px",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
                  }}
                />

                <button
                  onClick={() => setActiveTab("alumni")}
                  className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors relative z-10 text-center ${
                    activeTab === "alumni" ? "text-[#1A2660]" : "text-white/60 hover:text-white"
                  }`}
                >
                  Alumni
                </button>
                <button
                  onClick={() => setActiveTab("recruiter")}
                  className={`flex-1 py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors relative z-10 text-center ${
                    activeTab === "recruiter" ? "text-[#1A2660]" : "text-white/60 hover:text-white"
                  }`}
                >
                  Recruiters
                </button>
              </div>

              {/* Call to Action for Alumni */}
              <div className="mt-10">
                <a 
                  href="https://alumni-tat.tekkzy.com/" 
                  className="group relative flex items-center justify-center gap-3 px-8 py-3.5 bg-transparent border border-[#E8BD63]/50 text-[#E8BD63] text-xs font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-500 hover:bg-[#E8BD63] text-decoration-none hover:shadow-[0_0_20px_rgba(232,189,99,0.15)] overflow-hidden w-full max-w-[280px]"
                >
                  {/* The primary text that slides up/out */}
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:-translate-y-full">
                    Learn More Here
                  </span>
                  
                  {/* The secondary text that slides up/in */}
                  <span className="absolute inset-0 flex items-center justify-center gap-2 text-[#1A2660] transition-transform duration-500 translate-y-full group-hover:translate-y-0">
                    Learn More Here <ArrowRight size={16} strokeWidth={3} />
                  </span>
                  
                  {/* Invisible placeholder to maintain button size */}
                  <span className="invisible flex items-center gap-2">Learn More Here <ArrowRight size={16} /></span>
                </a>
              </div>
            </div>

            {/* Bottom Section: Controls & Counter */}
            <div className="relative z-10 mt-16 lg:mt-0 flex items-center justify-between border-t border-white/10 pt-8">
              {/* Pagination Counter */}
              <div className="font-serif text-sm font-medium tracking-widest text-[#E8BD63]/80">
                <span className="text-lg font-bold text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
                <span className="mx-2 text-white/30">/</span>
                {String(data.length).padStart(2, "0")}
              </div>

              {/* Arrow Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:border-[#E8BD63] transition-all duration-300"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:border-[#E8BD63] transition-all duration-300"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: 60% Grid (7 cols) - Warm Cream Immersive Quotebox */}
          <div className="lg:col-span-7 bg-[#FAF9F6] p-8 md:p-12 lg:p-16 flex flex-col justify-between relative min-h-[450px]">
            {/* Huge watermark quote */}
            <div className="absolute top-6 left-6 text-[#1A2660]/[0.03] text-[180px] leading-none font-serif select-none pointer-events-none">
              “
            </div>

            {/* Quote content area */}
            <div className="flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeIdx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="min-h-[160px] flex flex-col justify-center"
                >
                  <blockquote className="serif text-[#1A2660] text-xl md:text-2xl lg:text-[27px] font-medium leading-relaxed italic pr-4">
                    "{item.text}"
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Author details block */}
            <div className="border-t border-[#3E3A36]/10 pt-8 mt-10 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${activeIdx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                  {/* Bio details */}
                  <div className="flex items-center gap-5">
                    {/* Portrait with Offset gold ring */}
                    <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
                      <div className="absolute inset-0 rounded-full border-2 border-[#E8BD63] translate-x-1.5 translate-y-1.5 z-0" />
                      <img
                        src={item.img}
                        alt={item.author}
                        className="relative z-10 w-full h-full rounded-full object-cover border-2 border-white shadow-md"
                      />
                    </div>

                    <div>
                      <h4 className="text-[#1A2660] font-bold text-lg md:text-xl leading-tight">
                        {item.author}
                      </h4>
                      <p className="text-[#3E3A36]/60 text-xs md:text-sm font-medium mt-1">
                        {item.role}
                      </p>
                      {item.branch && (
                        <p className="text-[#2C3A8C] text-[10px] font-medium uppercase tracking-widest mt-1">
                          {item.branch}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Badge Pill */}
                  <div className="flex-shrink-0 self-start sm:self-center">
                    <span className="inline-flex items-center gap-2 bg-[#1A2660]/5 text-[#1A2660] border border-[#1A2660]/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Briefcase size={12} className="text-[#E8BD63]" />
                      {item.company}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom thumbnail strip for micro-interaction */}
            <div className="mt-8 flex gap-2 overflow-x-auto py-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
              {data.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`flex-shrink-0 rounded-full p-[2px] transition-all duration-300 ${
                    i === activeIdx
                      ? "border-2 border-[#E8BD63] scale-110 shadow-md"
                      : "border-2 border-transparent hover:scale-105 opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={d.img}
                    alt={d.author}
                    className="w-9 h-9 rounded-full object-cover border border-white"
                  />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
