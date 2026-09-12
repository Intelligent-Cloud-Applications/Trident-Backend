import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SlideIn } from "../utils/animations";
import { ArrowRight, GraduationCap, ArrowUpRight } from "lucide-react";

/* ─── card tint overlays ─── */
const TINTS = [
  "linear-gradient(135deg, rgba(75,60,130,0.65) 0%, rgba(30,25,60,0.85) 100%)",      // Purple (Computing)
  "linear-gradient(135deg, rgba(30,95,115,0.65) 0%, rgba(10,40,55,0.85) 100%)",      // Cyan/Teal (Computer Applications)
  "linear-gradient(135deg, rgba(160,100,50,0.65) 0%, rgba(60,35,15,0.85) 100%)",     // Amber/Rust (Engineering)
  "linear-gradient(135deg, rgba(40,110,75,0.65) 0%, rgba(15,50,30,0.85) 100%)",      // Emerald Green (Biotechnology)
  "linear-gradient(135deg, rgba(135,45,75,0.65) 0%, rgba(55,15,30,0.85) 100%)",      // Plum/Crimson (Business)
];

import schoolOfEngineeringImg from "../assets/school_of_engineering.jpeg";

const DEPARTMENTS = [
  {
    name: "School of Computing",
    category: "B.Tech · M.Tech · Ph.D",
    est: "2005", duration: "4 Years", seats: 480,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80",
    link: "https://academics-tat.tekkzy.com/school-of-computing"
  },
  {
    name: "School of Computer Applications",
    category: "BCA · MCA",
    est: "2008", duration: "3 Years", seats: 120,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    link: "https://academics-tat.tekkzy.com/school-of-computer-applications"
  },
  {
    name: "School of Engineering",
    category: "B.Tech · M.Tech",
    est: "2005", duration: "4 Years", seats: 240,
    image: schoolOfEngineeringImg,
    link: "https://academics-tat.tekkzy.com/school-of-engineering"
  },
  {
    name: "School of Biotechnology",
    category: "B.Sc · M.Sc · Ph.D",
    est: "2015", duration: "3 Years", seats: 90,
    image: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1000&q=80",
    link: "https://academics-tat.tekkzy.com/biotechnology-engineering"
  },
  {
    name: "School of Business",
    category: "BBA · MBA",
    est: "2010", duration: "2 Years", seats: 180,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1000&q=80",
    link: "https://academics-tat.tekkzy.com/school-of-business"
  },
];

import { ParallaxLayer } from "../utils/animations";

/* ═══ Glass Department Card ═══ */
const DeptCard = ({ dept, index }) => {
  const tint = TINTS[index % TINTS.length];
  const Component = dept.link ? motion.a : motion.div;
  const linkProps = dept.link ? { href: dept.link, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component
      {...linkProps}
      className="dept-card group relative flex-shrink-0 cursor-pointer block"
      style={{
        width: 'clamp(280px, 30vw, 360px)',
        height: 'clamp(360px, 48vh, 440px)',
        zIndex: index + 1,
      }}
      whileHover={{ y: -14, scale: 1.04, zIndex: 20 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
    >
      <div
        className="relative w-full h-full overflow-hidden shadow-2xl isolate"
        style={{ 
          borderRadius: '24px', 
          transform: 'skewX(-6deg) translateZ(0)',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
          maskImage: 'radial-gradient(white, black)'
        }}
      >
        {/* Background image with Parallax effect */}
        <ParallaxLayer speed={0.15} className="absolute inset-[-40px] w-[calc(100%+80px)] h-[calc(100%+80px)]">
          <img
            src={dept.image}
            alt={dept.name}
            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            style={{ transform: 'skewX(6deg)' }}
            loading="lazy"
          />
        </ParallaxLayer>

        {/* Color tint overlay */}
        <div className="absolute inset-0" style={{ background: tint }} />

        {/* Glass frost effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backdropFilter: 'blur(1px)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 40%, transparent 70%, rgba(0,0,0,0.15) 100%)',
          }}
        />

        {/* Glass border */}
        <div
          className="absolute inset-0 pointer-events-none border border-white/[0.12] group-hover:border-white/25 transition-colors duration-500"
          style={{ borderRadius: '24px' }}
        />

        {/* Index number — top left */}
        <div className="absolute top-5 left-6 z-10" style={{ transform: 'skewX(6deg)' }}>
          <span className="text-white/40 text-[11px] font-medium tracking-wider">0{index + 1}</span>
        </div>

        {/* Content — bottom area */}
        <div className="absolute inset-x-0 bottom-0 p-6 z-10" style={{ transform: 'skewX(6deg)' }}>
          {/* Title */}
          <h3
            className="text-white text-xl md:text-2xl font-bold leading-[1.15] mb-3 tracking-tight"
            style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
          >
            {dept.name}
          </h3>

          {/* Meta row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-[10px] font-medium tracking-wider uppercase">{dept.category}</p>
              <p className="text-white/35 text-[10px] font-medium mt-0.5">{dept.duration} · {dept.seats} Seats</p>
            </div>

            {/* Arrow button */}
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:bg-white/15 group-hover:text-white group-hover:border-white/40 transition-all duration-400">
              <ArrowUpRight size={15} />
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(255,255,255,0.06) 0%, transparent 60%)',
          }}
        />
      </div>
    </Component>
  );
};

/* ═══ End CTA Card ═══ */
const CtaCard = () => (
  <motion.div
    className="group relative flex-shrink-0 cursor-pointer"
    style={{
      width: 'clamp(280px, 30vw, 360px)',
      height: 'clamp(360px, 48vh, 440px)',
      zIndex: DEPARTMENTS.length + 1,
    }}
    whileHover={{ y: -14, scale: 1.04, zIndex: 20 }}
    transition={{ type: "spring", stiffness: 280, damping: 24 }}
  >
    <div
      className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl"
      style={{
        borderRadius: '24px',
        background: 'linear-gradient(135deg, #1A2660 0%, #2C3A8C 50%, #3D4FA0 100%)',
        transform: 'skewX(-6deg)',
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Glass border */}
      <div
        className="absolute inset-0 pointer-events-none border border-white/[0.12] group-hover:border-white/25 transition-colors duration-500"
        style={{ borderRadius: '24px' }}
      />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-[35%] rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: '#E8BD63' }} />

      <div className="relative z-10 px-8" style={{ transform: 'skewX(6deg)' }}>
        <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#E8BD63] mb-6 mx-auto group-hover:scale-110 transition-all duration-500 backdrop-blur-sm">
          <GraduationCap size={24} />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-[1.1]" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          Explore More<br /><span className="text-[#E8BD63] italic">Opportunities</span>
        </h3>
        <p className="text-white/45 text-[12px] font-medium mb-6 max-w-[240px] mx-auto leading-relaxed">
          12 UG · 7 PG · 5 Diploma programs
        </p>
        <a href="https://academics-tat.tekkzy.com/" className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 active:scale-95 shrink-0 overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-8px_#E8BD63] text-white hover:text-[#1A2660]">
          {/* Hover fill background */}
          <div className="absolute inset-0 w-full h-full translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 bg-[#E8BD63]" />
          
          {/* Shine sweep effect */}
          <div className="absolute inset-0 w-[200%] h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[50%] z-10" />

          <span className="relative z-10 transition-colors duration-500">
            Explore More
          </span>
          
          {/* Dual Arrow Animation Container */}
          <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 bg-white/10 group-hover:bg-[#1A2660]/10">
             <ArrowRight size={13} strokeWidth={2.5} className="absolute transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[150%] group-hover:opacity-0 group-hover:text-[#1A2660]" />
             <ArrowRight size={13} strokeWidth={2.5} className="absolute -translate-x-[150%] opacity-0 text-[#1A2660] transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100" />
          </div>
        </a>
      </div>
    </div>
  </motion.div>
);

/* ═══ Scroll Progress Bar ═══ */
const ScrollProgressBar = ({ progress }) => {
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="w-48 h-[3px] rounded-full bg-[#E5DED6] overflow-hidden">
      <motion.div className="h-full rounded-full" style={{ width, background: '#2C3A8C' }} />
    </div>
  );
};

export default function Programs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.scrollWidth);
      }
    };
    measure();
    
    // Ensure accurate measurement after layout reflow (fonts, flex layout settling)
    const t1 = setTimeout(measure, 100);
    const t2 = setTimeout(measure, 500);

    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", measure);
    };
  }, [DEPARTMENTS]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Added extra translation buffer (150px) to guarantee the final CTA card is fully revealed
  const maxTranslate = trackWidth > 0
    ? Math.max(0, trackWidth - (typeof window !== 'undefined' ? window.innerWidth : 1200) + 150)
    : 0;

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  const smoothX = useSpring(rawX, {
    stiffness: 120,
    damping: 30,
    mass: 0.8,
  });

  const sectionHeight = maxTranslate > 0
    ? `calc(100vh + ${maxTranslate}px)`
    : "100vh";

  return (
    <section
      ref={sectionRef}
      className="relative z-20"
      style={{ height: sectionHeight, background: '#F9F7F5' }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">

        {/* ── Header ── */}
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 w-full shrink-0 pt-20 md:pt-24 pb-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <SlideIn direction="left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#E8BD63]/15 flex items-center justify-center">
                    <GraduationCap size={18} className="text-[#D4A84B]" />
                  </div>
                  <span className="text-[#D4A84B] text-[11px] font-medium tracking-[0.2em] uppercase">Our Programs</span>
                </div>
                <h2 className="serif text-[#3E3A36] text-5xl sm:text-6xl md:text-[72px] font-bold tracking-tight leading-[1.02]">
                  Academic <span className="italic text-[#2C3A8C]">Departments.</span>
                </h2>
              </SlideIn>
            </div>

            {/* Nav arrows + progress */}
            <div className="hidden md:flex items-center gap-5">
              <ScrollProgressBar progress={scrollYProgress} />
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full border border-[#3E3A36]/15 flex items-center justify-center text-[#3E3A36]/40 hover:text-[#3E3A36] hover:border-[#3E3A36]/30 transition-all cursor-pointer">
                  <ArrowRight size={16} className="rotate-180" />
                </div>
                <div className="w-10 h-10 rounded-full border border-[#3E3A36]/15 flex items-center justify-center text-[#3E3A36]/40 hover:text-[#3E3A36] hover:border-[#3E3A36]/30 transition-all cursor-pointer">
                  <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Horizontal Track ── */}
        <div className="flex-1 flex items-center">
          <motion.div
            ref={trackRef}
            className="flex items-center w-max will-change-transform gap-8"
            style={{
              x: smoothX,
              paddingLeft: 'clamp(24px, 5vw, 80px)',
              paddingRight: 'clamp(24px, 10vw, 160px)',
            }}
          >
            {DEPARTMENTS.map((dept, i) => (
              <DeptCard key={i} dept={dept} index={i} />
            ))}
            <CtaCard />
          </motion.div>
        </div>

        {/* Mobile progress */}
        <div className="flex md:hidden justify-center pb-6">
          <ScrollProgressBar progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
