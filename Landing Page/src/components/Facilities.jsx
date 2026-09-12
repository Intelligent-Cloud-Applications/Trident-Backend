import { useState, useEffect, useRef } from "react";
import { TextReveal } from "../utils/animations";
import { ScrollReveal } from "../utils/advanced-animations";
import { Link } from "react-router-dom";
import { BookMarked, FlaskConical, Dumbbell, Coffee, Wifi, Microscope, ArrowRight } from "lucide-react";

import libImg from "../assets/real_library.jpg";
import labImg from "../assets/real_lab.jpg";
import cafeImg from "../assets/new_cafeteria.jpeg";
import quadImg from "../assets/green_campus.jpeg";
import aerialImg from "../assets/Athletics.jpeg";
import researchImg from "../assets/real_research.jpg";

const FACILITIES = [
  { 
    title: "Central\nLibrary", 
    icon: BookMarked, 
    desc: "Every student should have access to knowledge without barriers. Our central library houses over 100,000 volumes, digital journal subscriptions, private study pods, and collaborative workspaces — open round-the-clock to support deep research and self-directed learning.",
    img: libImg,
    href: "/library",
  },
  { 
    title: "Advanced\nLaboratories", 
    icon: FlaskConical, 
    desc: "Hands-on learning is the foundation of real engineering skill. Our 25+ specialized labs — spanning AI, IoT, Robotics, and Biotechnology — are sponsored by leading industry partners and equipped with professional-grade instruments to bridge the gap between theory and practice.",
    img: labImg,
    href: "https://research-tat.tekkzy.com/",
  },
  { 
    title: "Cafeteria\n& Dining", 
    icon: Coffee, 
    desc: "Good nutrition fuels great thinking. Our multi-cuisine dining halls offer wholesome meals in spacious, naturally-lit settings designed to encourage conversation, collaboration, and community among students and faculty alike.",
    img: cafeImg,
    href: "https://campuslife-tat.tekkzy.com/",
  },
  { 
    title: "Smart Green\nCampus", 
    icon: Wifi, 
    desc: "A campus should inspire as much as any classroom. Our 10+ acre tech-enabled green spaces blend Wi-Fi connectivity with landscaped quadrangles, outdoor amphitheatres, and shaded walkways — creating an environment built for both focused study and creative reflection.",
    img: quadImg,
    href: "https://campuslife-tat.tekkzy.com/",
  },
  { 
    title: "Athletics\n& Wellness", 
    icon: Dumbbell, 
    desc: "Physical well-being is essential to academic excellence. Students have access to an indoor stadium, swimming pool, gymnasium, and expansive green fields across 8+ disciplines — ensuring a balanced and holistic approach to personal growth.",
    img: aerialImg,
    href: "https://campuslife-tat.tekkzy.com/",
  },
  { 
    title: "Research\n& Innovation", 
    icon: Microscope, 
    desc: "Breakthroughs begin with the right environment. Our dedicated incubation centres, DSIR-recognized research labs, and innovation hubs empower students and faculty to pursue original research, file patents, and contribute to real-world scientific progress.",
    img: researchImg,
    href: "https://research-tat.tekkzy.com/",
  }
];

export default function Facilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0.01 }
    );

    sectionRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative" id="facilities" style={{ backgroundColor: '#34785A' }}>

      {/* ═══ Top Header ═══ */}
      <div className="relative text-center pt-24 md:pt-32 pb-16 md:pb-20 px-6 overflow-hidden">
        
        <ScrollReveal from={{ opacity: 0, y: 30 }} className="relative z-10">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-white/30" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">Campus Ecosystem</span>
            <div className="h-[1px] w-10 bg-white/30" />
          </div>
          <h2 className="serif text-4xl md:text-5xl lg:text-[64px] font-bold text-white leading-[1.05] tracking-tight mb-4">
            <TextReveal blur={true} stagger={0.02}>World-Class</TextReveal>{' '}
            <TextReveal blur={true} stagger={0.02} delay={100} className="italic font-light text-white/90">Infrastructure.</TextReveal>
          </h2>
          <p className="text-white/90 text-[17px] md:text-[22px] font-normal leading-[1.7] max-w-2xl mx-auto">
            Six pillars of excellence designed to nurture intellectual exploration and holistic development.
          </p>
        </ScrollReveal>
      </div>

      {/* ═══ Split Scroll Layout ═══ */}
      <div ref={containerRef} className="relative lg:grid lg:grid-cols-2">

        {/* ── LEFT: Sticky Image ── */}
        <div className="lg:col-start-1 lg:row-start-1">
          <div className="w-full h-[50vh] lg:h-screen lg:sticky lg:top-0 relative" style={{ overflow: 'clip' }}>
            {FACILITIES.map((fac, i) => (
              <div
                key={fac.title}
                className="absolute inset-0"
                style={{
                  transform: i < activeIndex 
                    ? 'translate3d(-100%, 0, 0)' 
                    : i === activeIndex 
                      ? 'translate3d(0, 0, 0)' 
                      : 'translate3d(100%, 0, 0)',
                  transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  zIndex: activeIndex === i ? 2 : 1,
                }}
              >
                <img 
                  src={fac.img}
                  alt={fac.title}
                  className="w-full h-full object-cover"
                  style={{ willChange: 'auto' }}
                />
                {/* Gradient overlay + text on image */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 40%, transparent 70%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 lg:p-12 z-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/50 mb-3 block">
                    {String(i + 1).padStart(2, '0')} — Trident Campus
                  </span>
                  <h4 className="serif text-[28px] md:text-[34px] lg:text-[40px] font-bold text-white leading-[1.1] whitespace-pre-line">
                    {fac.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Scrolling Text Content (reference style) ── */}
        <div className="lg:col-start-2 lg:row-start-1 relative">
          
          {/* Right Column Geometric Sticky Background */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#34785A]">
               {/* Subtle Dot Pattern */}
               <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#E8BD63_1.5px,transparent_1.5px)]" style={{ backgroundSize: '30px 30px' }} />

               {/* Top Left Diagonal Panel */}
               <div className="absolute top-[-30%] left-[-30%] w-[90%] h-[80%] bg-[#286048] shadow-[15px_15px_40px_rgba(0,0,0,0.5)] border-b-[1.5px] border-r-[1.5px] border-[#E8BD63]/50 transform rotate-[35deg]" />

               {/* Bottom Right Diagonal Panel */}
               <div className="absolute bottom-[-30%] right-[-40%] w-[120%] h-[70%] bg-[#1E4B37] shadow-[-15px_-15px_40px_rgba(0,0,0,0.6)] border-t-[1.5px] border-l-[1.5px] border-[#E8BD63]/40 transform -rotate-[35deg]" />

               {/* Inner floating slice for extra depth */}
               <div className="absolute top-[30%] right-[-40%] w-[100%] h-[30%] bg-[#2A664B] shadow-[0_0_30px_rgba(0,0,0,0.3)] border-t-[1px] border-l-[1px] border-[#E8BD63]/30 transform -rotate-[45deg]" />

               {/* Bottom blend guard to hide sharp cutoff at the end of the section */}
               <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#34785A] via-[#34785A]/80 to-transparent" />
            </div>
          </div>
          {FACILITIES.map((fac, i) => {
            const Icon = fac.icon;

            return (
              <div
                key={fac.title}
                ref={el => sectionRefs.current[i] = el}
                className="relative z-10 min-h-screen flex items-center justify-center px-8 md:px-16 lg:px-20 xl:px-28"
              >
                <div className="text-center max-w-lg mx-auto py-20">
                  
                  {/* Circular Icon */}
                  <div className="flex justify-center mb-10">
                    <div className="w-[72px] h-[72px] rounded-full border-[1.5px] border-white/30 flex items-center justify-center text-white/70">
                      <Icon size={30} strokeWidth={1.2} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="serif text-[40px] md:text-[48px] lg:text-[56px] font-bold text-white leading-[1.05] mb-8 tracking-tight whitespace-pre-line">
                    {fac.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white text-[16px] md:text-[17px] font-normal leading-[1.8] mb-10 max-w-[420px] mx-auto">
                    {fac.desc}
                  </p>

                  {/* Learn More Link */}
                  {fac.href.startsWith("/") ? (
                    <Link 
                      to={fac.href}
                      className="inline-flex items-center gap-3 text-white font-bold text-[16px] tracking-wide group/link transition-all duration-300 hover:gap-5"
                    >
                      <span>Learn more</span>
                      <ArrowRight size={20} strokeWidth={2.5} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </Link>
                  ) : (
                    <a 
                      href={fac.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-white font-bold text-[16px] tracking-wide group/link transition-all duration-300 hover:gap-5"
                    >
                      <span>Learn more</span>
                      <ArrowRight size={20} strokeWidth={2.5} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
