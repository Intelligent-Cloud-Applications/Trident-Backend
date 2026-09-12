import { useRef, useState, useEffect } from "react";
import { FadeInUp, TextReveal, ParallaxLayer, MaskReveal } from "../utils/animations";
import { GSAPCounter, ScrollReveal, GlowTrail, Tilt3D } from "../utils/advanced-animations";
import aboutImg2 from "../assets/mission_img1.jpeg";
import aboutImg1 from "../assets/mission_img2.png";
import { Award, BookOpen, Shield, GraduationCap, Eye, Target, ArrowRight } from "lucide-react";

export default function AboutSection() {
  const badges = [
    { label: "NAAC Accredited", icon: <Award size={13} />, color: "#E8BD63" },
    { label: "NBA — 6 Programmes", icon: <BookOpen size={13} />, color: "#C41E3A" },
    { label: "Approved by AICTE", icon: <Shield size={13} />, color: "#2E6DB4" },
    { label: "Affiliated to BPUT", icon: <GraduationCap size={13} />, color: "#3EA644" },
    { label: "DSIR SIRO", icon: <Shield size={13} />, color: "#8B5CF6" },
    { label: "Member of HESI", icon: <Award size={13} />, color: "#A59381" },
  ];

  const stats = [
    { number: "20", suffix: "+", label: "Years of\nLegacy", color: "#E8BD63" },
    { number: "200", suffix: "+", label: "Expert\nFaculty", color: "#4ECDC4" },
    { number: "94", suffix: "%", label: "Placement\nRate", color: "#FF6B6B" },
    { number: "120", suffix: "+", label: "Top\nRecruiters", color: "#A78BFA" },
  ];

  const missionPoints = [
    "To foster holistic excellence in the new generation of students.",
    "To instill in them, the power of aggressive positive thinking, insatiable desire for information and knowledge, a penchant for out-of-the-box ideation and capacity of execution.",
    "To contribute to the society with honesty and integrity through innovative research in the multi-disciplinary areas of evolving and upcoming technologies.",
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-[#F5EEEC]">


      {/* ═══ Main Content: Dramatic Split ═══ */}
      <div className="relative pb-10">

        {/* Background split — dark left, light right */}
        <div className="absolute inset-0 hidden lg:flex">
          <div className="w-[45%] bg-[#111827]" />
          <div className="w-[55%] bg-[#F5EEEC]" />
        </div>

        {/* Mobile: full dark top section */}
        <div className="absolute inset-0 lg:hidden bg-[#111827]" style={{ height: '520px' }} />

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start">

            {/* ═══ LEFT: Dark Immersive Panel ═══ */}
            <div className="lg:col-span-5 relative px-6 md:px-10 lg:pl-10 lg:pr-0 pt-10 pb-16 lg:py-20">

              {/* Decorative elements */}
              <div className="absolute top-10 left-10 w-24 h-24 border border-white/[0.04] rounded-full hidden lg:block" />
              <div className="absolute bottom-32 left-6 w-40 h-40 border border-white/[0.03] rounded-full hidden lg:block" />

              {/* Section heading on dark */}
              <ScrollReveal from={{ opacity: 0, y: 30 }} className="mb-10 relative z-10">
                <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-[#E8BD63]/70 block mb-4">
                  Est. 2005 · Bhubaneswar
                </span>
                <h2 className="serif text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.05] tracking-tight">
                  <TextReveal blur={true} stagger={0.02}>Built on a</TextReveal>
                  <TextReveal blur={true} stagger={0.02} delay={100}>foundation of</TextReveal>
                  <TextReveal blur={true} stagger={0.02} delay={200} className="italic text-[#E8BD63]">excellence.</TextReveal>
                </h2>
              </ScrollReveal>

              {/* Image composition with Parallax */}
              <ScrollReveal from={{ opacity: 0, scale: 0.95 }} delay={200} className="relative z-10 mb-12">
                <ParallaxLayer speed={0.05}>
                  <Tilt3D intensity={5}>
                    {/* Main image */}
                    <div className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)]" style={{ aspectRatio: '4/3' }}>
                      <img src={aboutImg2} alt="Engineering workshop" className="w-full h-full object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  </Tilt3D>
                </ParallaxLayer>

                {/* Overlapping secondary image */}
                <ParallaxLayer speed={-0.1} className="absolute -bottom-8 -right-4 md:-right-8 w-[45%] z-20">
                  <Tilt3D intensity={10} scale={1.05}>
                    <div className="rounded-xl overflow-hidden shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] border-[3px] border-[#111827] ring-1 ring-white/10" style={{ aspectRatio: '3/4' }}>
                      <img src={aboutImg1} alt="Students studying" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </Tilt3D>
                </ParallaxLayer>
              </ScrollReveal>

              {/* Stats Grid — Card-Free Typographic Constellation */}
              <ScrollReveal
                from={{ opacity: 0, y: 30 }}
                delay={400}
                className="relative z-10 grid grid-cols-2 gap-x-12 gap-y-16 px-4 py-8"
              >
                {/* Custom keyframes injected */}
                <style dangerouslySetInnerHTML={{ __html: `
                  @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                  }
                  @keyframes float-gentle-1 {
                    0%, 100% { transform: translateY(0px) translateX(-5px); }
                    50% { transform: translateY(-8px) translateX(-5px); }
                  }
                  @keyframes float-gentle-2 {
                    0%, 100% { transform: translateY(15px) translateX(5px); }
                    50% { transform: translateY(7px) translateX(5px); }
                  }
                  @keyframes float-gentle-3 {
                    0%, 100% { transform: translateY(5px) translateX(-15px); }
                    50% { transform: translateY(-3px) translateX(-15px); }
                  }
                  @keyframes float-gentle-4 {
                    0%, 100% { transform: translateY(30px) translateX(10px); }
                    50% { transform: translateY(22px) translateX(10px); }
                  }
                  @keyframes morph-blob {
                    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
                    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
                  }
                  @keyframes morph-blob-reverse {
                    0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                    50% { border-radius: 70% 30% 30% 70% / 60% 40% 60% 40%; }
                    100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
                  }
                  .orbit-ring {
                    transform-origin: center;
                    animation: spin-slow 18s linear infinite;
                  }
                `}} />



                {stats.map((s, i) => {
                  const floatAnim = `float-gentle-${i + 1} ${6 + i * 0.7}s ease-in-out infinite`;
                  return (
                    <div
                      key={i}
                      className="group relative flex flex-col items-start transition-all duration-500 z-10 cursor-default"
                      style={{ animation: floatAnim }}
                    >
                      {/* Ambient Glow spotlight behind metrics on hover */}
                      <div 
                        className="absolute -inset-10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[40px] pointer-events-none scale-90 group-hover:scale-100"
                        style={{
                          background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)`
                        }}
                      />



                      {/* Number Content */}
                      <div className="relative z-10 flex items-baseline">
                        <div className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none tracking-tight mb-2 flex items-baseline transform transition-transform duration-500 group-hover:scale-105">
                          <GSAPCounter end={parseInt(s.number)} duration={2.5} />
                          <span 
                            style={{ color: s.color }} 
                            className="ml-1 text-2xl md:text-3xl font-light transform transition-transform duration-500 group-hover:scale-110 select-none"
                          >
                            {s.suffix}
                          </span>
                        </div>
                      </div>

                      {/* Descriptive Label */}
                      <div className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.22em] text-white/30 group-hover:text-white/60 transition-colors duration-500 whitespace-pre-line leading-relaxed relative z-10">
                        {s.label}
                      </div>

                      {/* Interactive Mini Accent Wave that draws on hover */}
                      <div className="w-16 h-[2px] mt-2.5 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-500 relative z-10">
                        <svg className="w-full h-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                          <path 
                            d="M0,5 Q25,0 50,5 T100,5" 
                            fill="none" 
                            stroke={s.color} 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                          />
                        </svg>
                      </div>
                    </div>
                  );
                })}
                </ScrollReveal>
            </div>

            {/* ═══ RIGHT: Vision & Mission on Light ═══ */}
            <div className="lg:col-span-7 relative bg-[#F5EEEC] lg:bg-transparent px-6 md:px-10 lg:pl-16 xl:pl-24 lg:pr-10 py-16 lg:py-20">

              {/* --- Abstract Fluid Background Design --- */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Massive faint watermark text */}
                <div className="absolute top-0 right-[-5%] text-[150px] md:text-[200px] leading-none font-bold text-[#2C3A8C]/[0.02] select-none serif tracking-tighter italic">
                  Vision.
                </div>
                
                {/* Sweeping concentric orbital rings */}
                <div className="absolute top-[-10%] right-[-20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border-[1px] border-[#2C3A8C]/[0.05]" />
                <div className="absolute top-[5%] right-[-10%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full border-[1px] border-[#E8BD63]/[0.06]" />
                
                {/* Soft ambient glowing orbs */}
                <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] md:w-[300px] md:h-[300px] bg-[#E8BD63]/[0.05] rounded-full blur-[80px]" />
                <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[#2C3A8C]/[0.04] rounded-full blur-[100px]" />
                
                {/* Subtle dotted matrix patch */}
                <div className="absolute bottom-[15%] right-[5%] w-[150px] h-[150px] md:w-[200px] md:h-[200px] bg-[radial-gradient(#2C3A8C_1.5px,transparent_1.5px)] opacity-[0.05]" style={{ backgroundSize: '20px 20px' }} />
              </div>

              {/* Decorative vertical line */}
              <div className="absolute top-20 left-0 w-px h-[60%] bg-gradient-to-b from-[#E8BD63]/20 via-[#2C3A8C]/10 to-transparent hidden lg:block z-0" />

              <div className="relative z-10">

                {/* ── VISION ── */}
                <ScrollReveal from={{ opacity: 0, y: 30 }} delay={300} className="mb-14">
                  <div className="mb-7">
                    <h3 className="serif text-3xl font-bold text-[#3E3A36] tracking-tight leading-none">Vision</h3>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="w-10 h-[3px] rounded-full bg-[#E8BD63]" />
                      <div className="w-3 h-[3px] rounded-full bg-[#E8BD63]/30" />
                      <div className="w-1.5 h-[3px] rounded-full bg-[#E8BD63]/15" />
                    </div>
                  </div>

                  <div className="relative group mt-4">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-[#E8BD63]/40 to-[#D4A84B]/20 blur-[50px] -z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-700"
                      style={{ animation: 'morph-blob 12s ease-in-out infinite alternate' }}
                    />
                    <div 
                      className="relative p-8 md:p-12 bg-white/50 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_30px_60px_-15px_rgba(232,189,99,0.3)] transition-all duration-700"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.4) 100%)',
                        animation: 'morph-blob 10s ease-in-out infinite'
                      }}
                    >
                      <div className="absolute -top-8 -left-4 text-[140px] leading-none select-none pointer-events-none" style={{ fontFamily: "'Source Serif 4', Georgia, serif", color: '#E8BD63', opacity: 0.2 }}>"</div>
                      
                      {/* Dreamy floating bubbles */}
                      <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-white animate-[float-gentle-1_6s_ease-in-out_infinite]" />
                      <div className="absolute -bottom-12 -left-12 w-8 h-8 rounded-full bg-white/70 backdrop-blur-sm shadow-md border border-white/80 animate-[float-gentle-2_5s_ease-in-out_infinite]" />
                      <div className="absolute -bottom-2 -left-16 w-4 h-4 rounded-full bg-white/50 backdrop-blur-sm border border-white/50 animate-[float-gentle-3_4s_ease-in-out_infinite]" />

                      <blockquote className="relative z-10 text-[#3E3A36]/90 text-[18px] md:text-[22px] leading-[1.9] font-medium italic">
                        To become a sustainable institution of excellence, advancing innovative education, research and skill development.
                      </blockquote>
                    </div>
                  </div>
                </ScrollReveal>

                {/* ── Ornamental Divider ── */}
                <div className="flex items-center gap-5 mb-14 max-w-lg">
                  <div className="h-px flex-1 bg-gradient-to-r from-[#E8BD63]/20 to-transparent" />
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-[#E8BD63]/25" />
                    <div className="w-2 h-2 rotate-45 border border-[#3E3A36]/10" />
                    <div className="w-1 h-1 rounded-full bg-[#2C3A8C]/25" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-l from-[#2C3A8C]/15 to-transparent" />
                </div>

                {/* ── MISSION ── */}
                <ScrollReveal from={{ opacity: 0, y: 30 }} delay={450}>
                  <div className="mb-9">
                    <h3 className="serif text-3xl font-bold text-[#3E3A36] tracking-tight leading-none">Mission</h3>
                    <div className="flex items-center gap-1.5 mt-2">
                      <div className="w-10 h-[3px] rounded-full bg-[#2C3A8C]" />
                      <div className="w-3 h-[3px] rounded-full bg-[#2C3A8C]/30" />
                      <div className="w-1.5 h-[3px] rounded-full bg-[#2C3A8C]/15" />
                    </div>
                  </div>

                  <div className="space-y-8 relative pb-4">
                    {/* Ethereal connecting line */}
                    <div className="absolute left-6 md:left-8 top-10 bottom-10 w-px bg-gradient-to-b from-[#2C3A8C]/30 via-[#2C3A8C]/10 to-transparent border-dashed hidden md:block" />

                    {missionPoints.map((point, i) => {
                      const isEven = i % 2 === 0;
                      return (
                        <ScrollReveal
                          key={i}
                          from={{ opacity: 0, y: 30 }}
                          delay={550 + i * 150}
                          className="relative z-10"
                        >
                          <div className={`relative group ${isEven ? 'md:ml-12' : 'md:mr-12'}`}>
                            <div 
                              className="absolute inset-0 bg-gradient-to-r from-[#2C3A8C]/30 to-[#3D4FA0]/10 blur-[40px] -z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"
                              style={{ animation: `morph-blob${isEven ? '' : '-reverse'} ${10 + i}s ease-in-out infinite` }}
                            />
                            <div 
                              className="relative p-7 md:p-9 backdrop-blur-2xl border-[1.5px] border-white/80 shadow-[0_20px_50px_-12px_rgba(44,58,140,0.15)] transition-all duration-700 hover:shadow-[0_30px_60px_-12px_rgba(44,58,140,0.25)]"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 100%)',
                                animation: `morph-blob${isEven ? '-reverse' : ''} ${8 + i}s ease-in-out infinite`
                              }}
                            >
                              {/* Connecting dot */}
                              <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-left-12' : '-right-12'} w-3 h-3 rounded-full bg-[#2C3A8C]/40 border-2 border-white shadow-sm hidden md:block group-hover:bg-[#2C3A8C]/80 group-hover:scale-[2] transition-all duration-500`} />

                              {/* Dreamy floating accent bubble */}
                              <div className={`absolute -top-5 ${isEven ? '-right-5' : '-left-5'} w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border-[1.5px] border-white shadow-[0_10px_20px_-5px_rgba(44,58,140,0.2)] animate-[float-gentle-${(i % 4) + 1}_5s_ease-in-out_infinite]`} />
                              <div className={`absolute -top-2 ${isEven ? '-right-10' : '-left-10'} w-5 h-5 rounded-full bg-white/70 backdrop-blur-sm border-[1px] border-white shadow-sm animate-[float-gentle-${((i+1) % 4) + 1}_4s_ease-in-out_infinite]`} />
                            
                              <p className="relative z-10 text-[#3E3A36]/90 text-[15px] md:text-[17px] leading-[1.85] font-medium">
                                {point}
                              </p>
                            </div>
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </ScrollReveal>

                {/* ── CTA ── */}
                <ScrollReveal from={{ opacity: 0 }} delay={850}>
                  <a
                    href="https://about-tat.tekkzy.com/"
                    className="mt-16 group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[11px] font-medium uppercase tracking-[0.2em] border-2 border-[#2C3A8C]/15 text-[#2C3A8C] hover:bg-[#2C3A8C] hover:border-[#2C3A8C] hover:text-white transition-all duration-500 hover:shadow-[0_10px_30px_-8px_rgba(44,58,140,0.35)]"
                  >
                    Read Our Full Story
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-400" />
                  </a>
                </ScrollReveal>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
