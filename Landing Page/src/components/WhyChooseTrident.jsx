import { useState, useEffect, useRef } from "react";
import { FadeInUp, TextReveal } from "../utils/animations";
import { ScrollReveal, GSAPCounter, ScrambleText } from "../utils/advanced-animations";
import { 
  Trophy, 
  Briefcase, 
  Award, 
  TrendingUp, 
  Users, 
  MapPin, 
  Globe, 
  Microscope,
  Sparkles,
  ArrowRight
} from "lucide-react";

function AnimatedStat({ stat, color }) {
  return (
    <h3 className="serif text-4xl md:text-5xl font-bold tracking-tight leading-none" style={{ color }}>
      {stat}
    </h3>
  );
}

export default function WhyChooseTrident() {
  const [activePillar, setActivePillar] = useState("academics");

  const pillars = [
    { id: "academics", num: "01", title: "Academic Excellence", short: "Academics", color: "#2C3A8C", lightBg: "rgba(44, 58, 140, 0.04)", link: "https://academics-tat.tekkzy.com/" },
    { id: "careers", num: "02", title: "Career Ascendancy", short: "Careers", color: "#C41E3A", lightBg: "rgba(196, 30, 58, 0.04)", link: "https://admissions-tat.tekkzy.com/" },
    { id: "ecosystem", num: "03", title: "Vibrant Ecosystem", short: "Ecosystem", color: "#006738", lightBg: "rgba(0, 103, 56, 0.04)", link: "https://campuslife-tat.tekkzy.com/" },
  ];

  const achievements = [
    { id: "top-ranked", stat: "Top-Ranked", label: "Premier Technical Institution", desc: "Consistently recognized as a leading engineering and technology destination in Eastern India.", icon: Trophy, color: "#2C3A8C", pillar: "academics" },
    { id: "nba", stat: "6", label: "NBA Accredited Programmes", desc: "Demonstrating high academic rigor across core engineering disciplines.", icon: Award, color: "#006738", pillar: "academics" },
    { id: "faculty", stat: "200+", label: "Expert Faculty Members", desc: "Guided by dedicated professors and industry practitioners pushing boundaries.", icon: Users, color: "#8B6914", pillar: "academics" },
    { id: "placements", stat: "5,000+", label: "Impactful Career Placements", desc: "Empowering thousands of graduates to join leading global conglomerates and tech leaders.", icon: Briefcase, color: "#C41E3A", pillar: "careers" },
    { id: "placement-rate", stat: "94%", label: "Placement Rate", desc: "Delivering continuous career launchpads through robust active networks.", icon: TrendingUp, color: "#2C3A8C", pillar: "careers" },
    { id: "partnerships", stat: "15+", label: "Global Partnerships", desc: "Collaborating with renowned international academic and research institutions.", icon: Globe, color: "#8B6914", pillar: "careers" },
    { id: "naac", stat: "NAAC", label: "Accredited Institution", desc: "Validated by the highest national assessment bodies for our quality standards and excellence.", icon: Award, color: "#2C3A8C", pillar: "ecosystem" },
    { id: "research", stat: "Research-Led", label: "Innovation & Discovery", desc: "Driving local and global breakthroughs inside state-of-the-art labs.", icon: Microscope, color: "#C41E3A", pillar: "ecosystem" },
    { id: "campus", stat: "10+ Acres", label: "Smart Green Campus", desc: "A sprawling, vibrant ecosystem located in the academic heart of Bhubaneswar.", icon: MapPin, color: "#006738", pillar: "ecosystem" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(entry => { if (entry.isIntersecting) setActivePillar(entry.target.id); }); },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    pillars.forEach(p => { const el = document.getElementById(`section-${p.id}`); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#F9F7F5] border-t border-[#EFE7DF]/50">

      {/* Neumorphic Light Background Circles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          .neumorphic-circle {
            position: absolute;
            border-radius: 50%;
            background: #F9F7F5;
            box-shadow: 14px 14px 30px #e0ddd9, -14px -14px 30px #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.4);
          }
          .neumorphic-circle-sm {
            position: absolute;
            border-radius: 50%;
            background: #F9F7F5;
            box-shadow: 8px 8px 16px #e0ddd9, -8px -8px 16px #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.4);
          }
          @keyframes checkmark-pop {
            0% { transform: scale(0) rotate(-45deg); opacity: 0; }
            60% { transform: scale(1.3) rotate(0deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .node-active {
             box-shadow: 0 0 0 4px var(--ring-color);
          }
          .checkmark-enter { animation: checkmark-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        `}} />
        
        {/* Top Left Cluster */}
        <div className="neumorphic-circle w-96 h-96 top-16 -left-16" style={{ backgroundColor: "rgba(44, 58, 140, 0.15)" }} /> {/* Blue */}
        <div className="neumorphic-circle w-64 h-64 top-48 left-10" style={{ backgroundColor: "rgba(196, 30, 58, 0.12)" }} /> {/* Red */}
        <div className="neumorphic-circle-sm w-32 h-32 top-10 left-64" style={{ backgroundColor: "rgba(232, 189, 99, 0.25)" }} /> {/* Gold */}
        
        {/* Middle Cluster */}
        <div className="neumorphic-circle w-[400px] h-[400px] top-[40%] -left-20" style={{ backgroundColor: "rgba(0, 103, 56, 0.12)" }} /> {/* Green */}
        <div className="neumorphic-circle-sm w-40 h-40 top-[50%] left-60" style={{ backgroundColor: "rgba(44, 58, 140, 0.15)" }} /> {/* Blue */}
        
        {/* Top Right Cluster */}
        <div className="neumorphic-circle w-80 h-80 top-16 -right-10" style={{ backgroundColor: "rgba(0, 103, 56, 0.12)" }} /> {/* Green */}
        <div className="neumorphic-circle-sm w-24 h-24 top-20 right-64" style={{ backgroundColor: "rgba(232, 189, 99, 0.25)" }} /> {/* Gold */}
        
        {/* Bottom Right Cluster */}
        <div className="neumorphic-circle w-[450px] h-[450px] bottom-16 -right-20" style={{ backgroundColor: "rgba(196, 30, 58, 0.12)" }} /> {/* Red */}
        <div className="neumorphic-circle w-72 h-72 bottom-56 right-10" style={{ backgroundColor: "rgba(44, 58, 140, 0.15)" }} /> {/* Blue */}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-start relative z-10">
        
        {/* ─── LEFT COLUMN: Sticky Navigation Panel ─── */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-20 h-max lg:pt-12 lg:pb-10 py-16 z-20 flex flex-col justify-center min-h-[calc(100vh-100px)]">
          
          {/* Header */}
          <ScrollReveal from={{ opacity: 0, y: 30 }} className="mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C41E3A] block mb-4">
              The Trident Advantage
            </span>
            <h2 className="serif text-5xl md:text-5xl lg:text-[64px] font-bold text-[#1A1817] leading-[1.02] tracking-tight mb-4">
              <TextReveal blur={true} stagger={0.02}>Why students</TextReveal>
              <TextReveal blur={true} stagger={0.02} delay={100} className="italic font-light text-[#8A7B6B]">choose us.</TextReveal>
            </h2>
            <p className="text-[#3E3A36]/90 text-base md:text-[17px] font-medium leading-relaxed max-w-md">
              Discover the pillars that make Trident Academy of Technology the premier destination for future-ready education.
            </p>
          </ScrollReveal>

          {/* Interactive Node Navigation */}
          <ScrollReveal from={{ opacity: 0, x: -20 }} delay={200} className="hidden lg:block relative">
            <div className="flex flex-col gap-2 relative">
              {pillars.map((item, idx) => {
                const isActive = activePillar === item.id;
                const activeIdx = pillars.findIndex(p => p.id === activePillar);
                const isPassed = idx < activeIdx;
                const isUpcoming = idx > activeIdx;
                return (
                  <button key={item.id} onClick={() => handleScrollTo(item.id)}
                    className={`group flex items-center gap-4 py-4 px-4 text-left w-full rounded-2xl relative overflow-hidden transition-all duration-700 ease-out ${isActive ? "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.06)]" : "hover:bg-white/50"}`}>
                    <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-700 ${isActive ? 'node-active' : ''}`}
                      style={{ borderColor: isUpcoming ? "#C5BDB5" : item.color, backgroundColor: isUpcoming ? "#F9F7F5" : item.color, '--ring-color': `${item.color}20`, '--glow-color': `${item.color}30`, transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>
                      {isPassed ? <span className="checkmark-enter text-white text-[14px] font-bold">✓</span> : <span className="text-[11px] font-bold" style={{ color: isUpcoming ? "#7A736B" : "#FFF" }}>{item.num}</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: isActive ? item.color : isPassed ? item.color : "#6B655F", opacity: isUpcoming ? 0.9 : 1 }}>{item.short}</span>
                      <span className="font-serif text-[22px] font-medium leading-tight" style={{ color: isActive ? item.color : isPassed ? "#2A2725" : "#4A4540", opacity: isUpcoming ? 0.9 : 1, transform: isActive ? 'translateX(4px)' : 'translateX(0)' }}>{item.title}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* ─── RIGHT COLUMN: No containers, blends with background ─── */}
        <div className="w-full lg:w-[65%] lg:py-24 pb-20 z-10">

            {pillars.map((pillar, pillarIdx) => {
              const pillarStats = achievements.filter(a => a.pillar === pillar.id);
              
              return (
                <div key={pillar.id} id={`section-${pillar.id}`} className="relative scroll-mt-24">
                  
                  {/* Pillar heading — colored line separator & button */}
                  <ScrollReveal from={{ opacity: 0, y: 20 }}>
                    <div className={`flex items-center gap-4 ${pillarIdx > 0 ? 'mt-16 md:mt-20 pt-10 md:pt-14 border-t border-[#EFE7DF]' : ''} mb-10 md:mb-12`}>
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: pillar.color }} />
                      <span className="text-xs font-bold uppercase tracking-[0.25em] whitespace-nowrap" style={{ color: pillar.color }}>
                        {pillar.title}
                      </span>
                      <div className="flex-1 h-[2px] rounded-full min-w-[20px]" style={{ backgroundColor: `${pillar.color}15` }} />
                      <span className="text-xs font-mono hidden md:block" style={{ color: `${pillar.color}40` }}>{pillar.num}</span>
                      
                      <a 
                        href={pillar.link}
                        className="group relative inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5 active:scale-95 shrink-0 ml-2 overflow-hidden bg-white/80 backdrop-blur-sm border border-[var(--pillar-color-20)] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_-6px_var(--pillar-color-60)] text-[var(--pillar-color)] hover:text-white"
                        style={{ 
                          '--pillar-color': pillar.color,
                          '--pillar-color-15': `${pillar.color}15`,
                          '--pillar-color-20': `${pillar.color}20`,
                          '--pillar-color-60': `${pillar.color}60`,
                        }}
                      >
                        {/* Hover fill background */}
                        <div className="absolute inset-0 w-full h-full translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 bg-[var(--pillar-color)]" />
                        
                        {/* Shine sweep effect */}
                        <div className="absolute inset-0 w-[200%] h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[50%] z-10" />

                        <span className="relative z-10 transition-colors duration-500">
                          Explore {pillar.short}
                        </span>
                        
                        {/* Dual Arrow Animation Container */}
                        <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 bg-[var(--pillar-color-15)] group-hover:bg-white/20">
                           {/* Arrow 1: Exits right */}
                           <ArrowRight size={12} strokeWidth={2.5} className="absolute transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[150%] group-hover:opacity-0 group-hover:text-white" />
                           {/* Arrow 2: Enters from left */}
                           <ArrowRight size={12} strokeWidth={2.5} className="absolute -translate-x-[150%] opacity-0 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100" />
                        </div>
                      </a>
                    </div>
                  </ScrollReveal>

                  {/* Stats rows — floating directly on the page background */}
                  <div className="flex flex-col">
                    {pillarStats.map((stat, idx) => {
                      const Icon = stat.icon;
                      const isLast = idx === pillarStats.length - 1;

                      return (
                        <ScrollReveal key={stat.id} from={{ opacity: 0, x: 20 }} delay={idx * 100}>
                          <div className="group cursor-default">
                            <div className="flex items-start gap-5 md:gap-7 py-6 md:py-8 transition-all duration-500 group-hover:translate-x-1">
                              
                              {/* Solid colored icon */}
                              <div 
                                className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                                style={{ backgroundColor: stat.color, color: '#FFFFFF', boxShadow: `0 4px 14px ${stat.color}30` }}
                              >
                                <Icon size={22} strokeWidth={1.5} />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A59381] group-hover:text-[#7A7570] transition-colors duration-400 block mb-2">
                                  {stat.label}
                                </span>
                                <AnimatedStat stat={stat.stat} color={stat.color} />
                                <p className="text-[#5A554F] text-sm md:text-[15px] leading-relaxed mt-2.5 max-w-md group-hover:text-[#3E3A36] transition-colors duration-400">
                                  {stat.desc}
                                </p>
                              </div>


                            </div>

                            {/* Thin separator between rows */}
                            {!isLast && (
                              <div className="ml-[68px] md:ml-[80px] h-[1px] bg-[#EFE7DF] group-hover:bg-[#D5CCC4] transition-colors duration-400" />
                            )}
                          </div>
                        </ScrollReveal>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
}
