import { ArrowRight, GraduationCap } from "lucide-react";

import { FadeInUp, SlideIn } from "../utils/animations";

// Import images for the dynamic grid
import ctaImg1 from "../assets/cta_convocation.jpg";
import ctaImg2 from "../assets/cta_research_scholars.jpg";
import ctaImg3 from "../assets/cta_innovation_lab.jpg";
import ctaImg4 from "../assets/cta_campus_reading.jpg";

export default function CallToAction() {
  return (
    <section className="relative py-12 bg-[#F5EEEC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Main Glassmorphic Container with Animated Border */}
        <div className="rounded-[32px] overflow-hidden flex flex-col lg:flex-row shadow-[0_40px_100px_-20px_rgba(15,23,42,0.5)] min-h-[420px] relative group/cta backdrop-blur-2xl bg-[#3E3A36]/90 border border-white/20">
          
          {/* Animated Background Mesh Gradient */}
          <div className="absolute inset-0 opacity-40 mix-blend-color-dodge pointer-events-none">
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-brand-blue to-transparent blur-[120px] rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-[spin_20s_linear_infinite]"></div>
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-gradient-to-tl from-brand-red to-transparent blur-[150px] rounded-full transform translate-x-1/3 translate-y-1/3 animate-[spin_30s_linear_infinite_reverse]"></div>
          </div>

          {/* Shimmer Effect on Hover */}
          <div className="absolute inset-0 w-[200%] h-[200%] bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] -translate-x-full group-hover/cta:translate-x-full transition-transform duration-[2000ms] pointer-events-none z-30"></div>
          
          {/* Main Content Side (Left) */}
          <div className="w-full lg:w-1/2 p-8 lg:p-14 relative overflow-hidden flex flex-col justify-center z-20">
            
            <div className="relative z-10">
              <FadeInUp>
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/20 text-white/95 text-[10px] font-medium uppercase tracking-[0.25em] px-5 py-2.5 rounded-full mb-6 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-colors">
                  <div className="relative flex items-center justify-center">
                    <GraduationCap size={14} className="text-brand-yellow relative z-10" />
                    <div className="absolute inset-0 bg-brand-yellow blur-md opacity-50"></div>
                  </div>
                  Admissions Open 2026–27
                </div>
              </FadeInUp>

              <FadeInUp delay={200}>
                <h2 className="serif text-4xl md:text-5xl lg:text-[52px] font-bold text-white mb-5 leading-[1.02] tracking-tight relative z-10 inline-block">
                  <span className="absolute -top-2 -left-4 w-40 h-16 bg-white/10 transform -rotate-2 -z-10 rounded-sm"></span>
                  <span className="relative z-10">Begin Your Journey</span><br/>
                  <span className="italic text-[#2C3A8C] relative inline-block">
                    at Trident.
                  </span>
                </h2>
              </FadeInUp>

              <FadeInUp delay={300}>
                <p className="text-white/80 text-lg max-w-md mb-8 leading-relaxed font-medium">
                  Join a community of innovators, researchers, and future leaders. Applications for the 2026–27 academic year are now open.
                </p>
              </FadeInUp>

              <FadeInUp delay={400}>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a href="https://admissions-tat.tekkzy.com" className="btn-creative relative group/btn1 overflow-hidden bg-gradient-to-r from-white to-[#F1F5F9] text-[#3E3A36] px-8 py-4 rounded-xl font-extrabold text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto hover:shadow-[0_20px_40px_-5px_rgba(255,255,255,0.4)] text-decoration-none">
                    <span className="relative z-10 flex items-center gap-2">Apply Now <ArrowRight size={16} className="group-hover/btn1:translate-x-1 transition-transform" /></span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent -translate-x-full group-hover/btn1:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                  </a>
                  <a href="https://contactus-tat.tekkzy.com" className="btn-creative border border-white/20 bg-white/5 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-extrabold text-[13px] uppercase tracking-wider flex items-center justify-center w-full sm:w-auto hover:border-white/50 hover:bg-white/10 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] relative text-decoration-none">
                    Schedule Visit
                  </a>
                </div>
              </FadeInUp>
            </div>
          </div>

          {/* Dynamic Interactive Image Grid Side (Right) - The "Stage" */}
          <div className="w-full lg:w-1/2 relative bg-[#0B1120]/40 backdrop-blur-sm min-h-[400px] lg:min-h-full overflow-hidden flex items-center justify-center pointer-events-auto [perspective:1200px] border-l border-white/10">
            
            {/* Soft dark masking gradients */}
            <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#3E3A36] via-[#3E3A36]/80 to-transparent z-30 pointer-events-none hidden lg:block"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#1A1817]/80 to-transparent z-30 pointer-events-none"></div>
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#1A1817]/80 to-transparent z-30 pointer-events-none"></div>

            {/* Cinematic Floating Particles/Dust */}
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className={`absolute w-1 h-1 bg-white rounded-full z-10 opacity-40 animate-pulse`}
                style={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  transform: `scale(${Math.random() * 2 + 0.5})`
                }}
              ></div>
            ))}

            {/* The 3D Suspended Image Cluster */}
            <div className="relative w-full h-[130%] lg:h-full flex items-center justify-center transform-style-3d transition-transform duration-1000 cubic-bezier(0.2,0.8,0.2,1) group-hover/cta:[transform:rotateY(-8deg)_rotateX(4deg)_scale(1.1)] group-hover/cta:-translate-x-4">
              
              {/* Image 1 (Top Left) */}
              <SlideIn direction="right" delay={100} duration={1000} className="absolute left-[5%] top-[8%] w-[45%] h-[40%] z-40">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] transform transition-all duration-700 hover:scale-[1.2] hover:z-50 hover:rotate-0 -rotate-6 group-hover/cta:-translate-y-10 group-hover/cta:-translate-x-8 border-2 border-white/20 group-hover/cta:shadow-[0_50px_100px_rgba(0,0,0,0.8)] [transform:translateZ(30px)] grayscale-[20%] hover:grayscale-0">
                  <img src={ctaImg1} alt="Graduation" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
              </SlideIn>

              {/* Image 2 (Top Right) */}
              <SlideIn direction="right" delay={300} duration={1200} className="absolute right-[5%] top-[5%] w-[38%] h-[35%] z-20">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 hover:scale-[1.2] hover:z-50 hover:rotate-0 rotate-12 group-hover/cta:-translate-y-6 group-hover/cta:translate-x-12 border border-white/10 opacity-70 hover:opacity-100 [transform:translateZ(-20px)] grayscale-[40%] hover:grayscale-0">
                  <img src={ctaImg2} alt="Research" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </SlideIn>

              {/* Image 3 (Bottom Left) */}
              <SlideIn direction="up" delay={500} duration={1200} className="absolute left-[8%] bottom-[8%] w-[40%] h-[38%] z-20">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-700 hover:scale-[1.2] hover:z-50 hover:rotate-0 -rotate-12 group-hover/cta:translate-y-10 group-hover/cta:-translate-x-10 border border-white/10 opacity-70 hover:opacity-100 [transform:translateZ(10px)] grayscale-[40%] hover:grayscale-0">
                  <img src={ctaImg3} alt="Engineering Lab" className="w-full h-full object-cover" loading="lazy" />
                </div>
              </SlideIn>

              {/* Image 4 (Bottom Right - The Hero Piece) */}
              <SlideIn direction="up" delay={400} duration={1200} className="absolute right-[2%] bottom-[5%] w-[52%] h-[45%] z-50">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] transform transition-all duration-700 hover:scale-[1.15] hover:rotate-0 rotate-6 group-hover/cta:translate-y-6 group-hover/cta:translate-x-6 border-2 border-brand-yellow/50 group-hover/cta:border-brand-yellow group-hover/cta:shadow-[0_60px_120px_rgba(250,204,21,0.3)] [transform:translateZ(60px)]">
                  <img src={ctaImg4} alt="Library" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-2xl pointer-events-none"></div>
                </div>
              </SlideIn>

              {/* Central Premium Emblem (Appears on Hover) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-32 h-32 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center transform transition-all duration-1000 scale-0 group-hover/cta:scale-100 opacity-0 group-hover/cta:opacity-100 [transform:translateZ(100px)]">
                <div className="absolute inset-2 rounded-full border border-brand-yellow/50 border-dashed animate-[spin_15s_linear_infinite]"></div>
                <GraduationCap size={40} className="text-brand-yellow" />
              </div>
              
              {/* Background technical rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/5 z-0 animate-[spin_50s_linear_infinite] [transform:translateZ(-50px)]"></div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
