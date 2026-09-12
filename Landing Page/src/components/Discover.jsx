import { FadeInUp } from "../utils/animations";
import { ArrowRight, GraduationCap, Microscope, Compass, Sparkles } from "lucide-react";

import ugImg from "../assets/discover_graduation.png";
import ptImg from "../assets/discover_research_lab.jpg";
import campusLifeImg from "../assets/campus_life321.jpeg";

export default function Discover() {
  const nodes = [
    {
      title: "Programs",
      category: "Academics",
      desc: "Lay the foundation for a transformative career with our rigorous, future-ready curriculum designed for leaders.",
      img: ugImg,
      link: "Explore All Programs",
      href: "https://academics-tat.tekkzy.com/departemnts-of-engineering/",
      accent: "#2C3A8C",
      morph: "morph-programs",
      float: "float-slow",
      icon: GraduationCap,
      badgeText: "UG / PG",
      badgeColor: "#E8BD63",
      textColor: "#1A2660"
    },
    {
      title: "Research & Innovation",
      category: "Discovery",
      desc: "Join leading scholars in state-of-the-art labs addressing the world's most pressing scientific and technological challenges.",
      img: ptImg,
      link: "Discover Research",
      href: "https://research-tat.tekkzy.com/",
      accent: "#C41E3A",
      morph: "morph-research",
      float: "float-medium",
      icon: Microscope,
      badgeText: "SIRO Lab",
      badgeColor: "#C41E3A",
      textColor: "#FFFFFF"
    },
    {
      title: "Campus Life",
      category: "Community",
      desc: "Experience a vibrant community with endless opportunities for personal growth, creative arts, and visionary leadership.",
      img: campusLifeImg,
      link: "Life at Trident",
      href: "https://campuslife-tat.tekkzy.com/",
      accent: "#006738",
      morph: "morph-campus",
      float: "float-fast",
      icon: Compass,
      badgeText: "Campus",
      badgeColor: "#2E6DB4",
      textColor: "#FFFFFF"
    }
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden z-30" style={{ background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EEEC 50%, #FAF9F6 100%)' }}>
      <style>{`
        @keyframes morph-programs {
          0% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          33% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
          66% { border-radius: 50% 50% 30% 70% / 40% 60% 30% 70%; }
          100% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
        }

        @keyframes morph-research {
          0% { border-radius: 50% 50% 30% 70% / 50% 60% 40% 50%; }
          33% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          66% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
          100% { border-radius: 50% 50% 30% 70% / 50% 60% 40% 50%; }
        }

        @keyframes morph-campus {
          0% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
          33% { border-radius: 50% 50% 30% 70% / 40% 60% 30% 70%; }
          66% { border-radius: 42% 58% 70% 30% / 45% 45% 55% 55%; }
          100% { border-radius: 70% 30% 52% 48% / 60% 40% 60% 40%; }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(14px) rotate(-3deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1.5deg); }
        }

        .fluid-line-path {
          stroke-dasharray: 12 12;
          animation: fluidDash 35s linear infinite;
        }

        @keyframes fluidDash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>

      {/* High-End drifting ambient glow blobs in background */}
      <div className="absolute top-[10%] left-[5%] w-[350px] md:w-[450px] h-[350px] md:h-[450px] rounded-full bg-[#E8BD63]/8 blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[5%] w-[400px] md:w-[500px] h-[400px] md:h-[500px] rounded-full bg-[#2C3A8C]/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[10%] w-[380px] md:w-[480px] h-[380px] md:h-[480px] rounded-full bg-[#006738]/6 blur-[110px] pointer-events-none z-0" />

      {/* Decorative Layered Diagonal Triangle Accent on Right Side (Top) */}
      <div className="absolute top-[-150px] md:top-[-300px] right-[-10%] w-[300px] h-[500px] md:w-[500px] md:h-[800px] pointer-events-none z-0 transform rotate-[35deg]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C3A8C]/[0.07] to-transparent border-l-[2px] border-b-[2px] border-[#2C3A8C]/15 shadow-[-15px_15px_40px_rgba(44,58,140,0.05)] rounded-bl-[40px]" />
        <div className="absolute top-0 left-[80px] w-full h-[80%] bg-gradient-to-br from-[#C41E3A]/[0.05] to-transparent border-l-[1.5px] border-b-[1.5px] border-[#C41E3A]/15 rounded-bl-[30px]" />
        <div className="absolute top-0 left-[160px] w-full h-[60%] bg-gradient-to-br from-[#E8BD63]/[0.08] to-transparent border-l-[1px] border-b-[1px] border-[#E8BD63]/25 rounded-bl-[20px]" />
      </div>

      {/* Top blend guard to hide sharp cutoff below the wavy SectionDivider */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-48 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none z-0" />

      {/* Decorative Layered Diagonal Triangle Accent on Left Side (Bottom) */}
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[500px] md:w-[500px] md:h-[800px] pointer-events-none z-0 transform rotate-[215deg]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006738]/[0.07] to-transparent border-l-[2px] border-b-[2px] border-[#006738]/15 shadow-[-15px_15px_40px_rgba(0,103,56,0.05)] rounded-bl-[40px]" />
        <div className="absolute top-0 left-[80px] w-full h-[80%] bg-gradient-to-br from-[#E8BD63]/[0.05] to-transparent border-l-[1.5px] border-b-[1.5px] border-[#E8BD63]/15 rounded-bl-[30px]" />
        <div className="absolute top-0 left-[160px] w-full h-[60%] bg-gradient-to-br from-[#2C3A8C]/[0.08] to-transparent border-l-[1px] border-b-[1px] border-[#2C3A8C]/25 rounded-bl-[20px]" />
      </div>

      {/* Decorative dynamic winding line behind nodes on desktop */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full min-h-[900px]" viewBox="0 0 1200 1200" preserveAspectRatio="none" fill="none">
          <path
            d="M 300,280 C 300,480 900,320 900,650 C 900,980 300,820 300,1050"
            stroke="url(#fluid-grad)"
            strokeWidth="3"
            className="fluid-line-path"
          />
          <defs>
            <linearGradient id="fluid-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2C3A8C" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#C41E3A" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#006738" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title Area */}
        <div className="text-center mb-24 md:mb-32">
          <FadeInUp>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2C3A8C]/5 border border-[#2C3A8C]/10 mb-6">
              <Sparkles size={14} className="text-[#E8BD63] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2C3A8C]">
                Explore TAT Ecosystem
              </span>
            </div>
            <h2 className="serif text-5xl md:text-7xl font-bold text-[#3E3A36] mb-6">
              Discover <span className="italic font-light text-[#2C3A8C] font-serif">Trident.</span>
            </h2>
            <p className="text-[#3E3A36]/65 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              A fluid universe of creators, thinkers, and builders pushing the dynamic boundaries of education and impact.
            </p>
          </FadeInUp>
        </div>

        {/* Floating Asymmetric Flow Layout */}
        <div className="space-y-24 md:space-y-36 max-w-6xl mx-auto">
          {nodes.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const Icon = item.icon;

            return (
              <div 
                key={item.title}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                
                {/* 1. IMAGE BLOB CONTAINER COLUMN */}
                <div className={`lg:col-span-5 flex justify-center ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <FadeInUp delay={idx * 150}>
                    <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 group cursor-pointer">
                      
                      {/* Interactive Colored Ambient Halo Behind Blob */}
                      <div
                        className="absolute inset-0 blur-xl opacity-25 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                        style={{
                          background: `linear-gradient(135deg, ${item.accent}, ${item.accent}cc)`,
                          animation: `${item.morph} 10s ease-in-out infinite, ${item.float} 8s ease-in-out infinite`
                        }}
                      />

                      {/* Morphing Image Canvas Overlay */}
                      <div
                        className="absolute inset-0 overflow-hidden border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-700 group-hover:scale-[1.02] bg-[#3E3A36]"
                        style={{
                          animation: `${item.morph} 10s ease-in-out infinite, ${item.float} 8s ease-in-out infinite`
                        }}
                      >
                        <img
                          src={item.img}
                          alt={item.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[2.5s] ease-out"
                        />
                        {/* Elegant brand overlay on hover */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none mix-blend-overlay"
                          style={{ backgroundColor: item.accent }}
                        />
                      </div>

                      {/* Interactive Floating Circular Info Badge */}
                      <div 
                        className="absolute -top-3 -right-3 md:-top-4 md:-right-4 w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 z-20"
                        style={{ backgroundColor: item.badgeColor, color: item.textColor }}
                      >
                        <Icon size={18} className="mb-0.5" />
                        <span className="text-[8px] font-bold uppercase tracking-wider">{item.badgeText}</span>
                      </div>

                    </div>
                  </FadeInUp>
                </div>

                {/* 2. GLASS CONTENT CARD COLUMN */}
                <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <FadeInUp delay={idx * 150 + 100}>
                    <div className="bg-white/45 backdrop-blur-xl border border-white/70 p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_24px_50px_rgba(62,58,54,0.03)] relative z-10 hover:shadow-[0_32px_60px_rgba(62,58,54,0.06)] transition-all duration-500 hover:bg-white/60 hover:-translate-y-1 group">
                      
                      {/* Category label */}
                      <div className="flex items-center gap-3 mb-6">
                        <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: item.accent }} />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#3E3A36]/50">
                          {item.category}
                        </span>
                      </div>

                      {/* Serif Heading */}
                      <h3 className="serif text-3xl md:text-4.5xl lg:text-5xl font-bold text-[#3E3A36] leading-none mb-6">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#3E3A36]/70 text-base md:text-lg font-medium leading-relaxed mb-8">
                        {item.desc}
                      </p>

                      {/* Action Pill CTA */}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 active:scale-95 shrink-0 overflow-hidden bg-white/80 backdrop-blur-sm border border-[var(--item-accent-20)] shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-8px_var(--item-accent-60)] text-[var(--item-accent)] hover:text-white"
                        style={{
                          '--item-accent': item.accent,
                          '--item-accent-15': `${item.accent}15`,
                          '--item-accent-20': `${item.accent}20`,
                          '--item-accent-60': `${item.accent}60`,
                        }}
                      >
                        {/* Hover fill background */}
                        <div className="absolute inset-0 w-full h-full translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 bg-[var(--item-accent)]" />
                        
                        {/* Shine sweep effect */}
                        <div className="absolute inset-0 w-[200%] h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[50%] z-10" />

                        <span className="relative z-10 transition-colors duration-500">
                          {item.link}
                        </span>

                        {/* Dual Arrow Animation Container */}
                        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 bg-[var(--item-accent-15)] group-hover:bg-white/20">
                           <ArrowRight size={13} strokeWidth={2.5} className="absolute transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[150%] group-hover:opacity-0 group-hover:text-white" />
                           <ArrowRight size={13} strokeWidth={2.5} className="absolute -translate-x-[150%] opacity-0 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                      </a>

                    </div>
                  </FadeInUp>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
