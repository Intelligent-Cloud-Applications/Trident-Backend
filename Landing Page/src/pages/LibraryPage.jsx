import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, BookOpen, Users, Wifi, Monitor, BookMarked, Search, Globe, Bookmark } from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReactLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

const FACILITIES = [
  { icon: BookMarked, title: "Vast Collection", desc: "Over 50,000+ books, journals, and periodicals across engineering and science disciplines.", stat: "50,000+" },
  { icon: Monitor, title: "Digital Library", desc: "Access to e-journals, e-books, and online databases including IEEE, Springer, and Elsevier.", stat: "10,000+" },
  { icon: Wifi, title: "Wi-Fi Enabled", desc: "High-speed internet connectivity throughout the library for seamless digital access.", stat: "24/7" },
  { icon: Users, title: "Reading Hall", desc: "Spacious air-conditioned reading hall with seating capacity for 300+ students simultaneously.", stat: "300+" },
  { icon: Globe, title: "DELNET Member", desc: "Member of Developing Library Network for inter-library loan and resource sharing.", stat: "Active" },
  { icon: Search, title: "OPAC System", desc: "Online Public Access Catalogue for easy search and discovery of library resources.", stat: "Digital" },
];

const E_RESOURCES = [
  "IEEE Xplore Digital Library", "Springer Nature Journals", "Elsevier ScienceDirect", "NPTEL Video Lectures",
  "National Digital Library (NDL)", "DELNET Resources", "Shodhganga (PhD Theses)", "J-Gate Plus",
];

const DEPARTMENTS = [
  "Computer Science Engineering", "Electronics & Telecommunication Engineering", "Electrical & Electronics Engineering",
  "Electrical Engineering", "Civil Engineering", "Mechanical Engineering", "Physics", "Chemistry", "Mathematics", "English"
];

export default function LibraryPage() {
  const container = useRef();

  useGSAP(() => {
    // ─── 1. HERO ANIMATIONS ───
    gsap.from('.gsap-hero-badge', { opacity: 0, y: -20, duration: 1, ease: 'power3.out' });
    gsap.from('.gsap-hero-title', { opacity: 0, y: 50, duration: 1.2, delay: 0.1, ease: 'power4.out' });
    gsap.from('.gsap-hero-desc', { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: 'power3.out' });
    gsap.from('.gsap-hero-stat', { opacity: 0, y: 30, duration: 0.8, stagger: 0.1, delay: 0.5, ease: 'power3.out' });
    
    // Parallax background image
    gsap.to('.gsap-hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: '.gsap-hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Hero image reveal
    gsap.from('.gsap-hero-image-wrapper', {
      opacity: 0, scale: 0.8, rotation: -10,
      duration: 1.5, delay: 0.3, ease: 'elastic.out(1, 0.7)'
    });

    // Continuous floating animations for decorative elements
    gsap.to('.gsap-float-1', { y: -15, rotation: 3, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
    gsap.to('.gsap-float-2', { y: 15, rotation: -5, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 1 });
    gsap.to('.gsap-spin', { rotation: 360, duration: 40, repeat: -1, ease: 'linear' });

    // ─── 2. DEPARTMENT LIBRARIES ───
    gsap.fromTo('.gsap-dept-header',
      { opacity: 0, y: 30 },
      { scrollTrigger: { trigger: '.gsap-dept-section', start: 'top 85%' }, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );
    
    // Batch scroll animation for department cards (staggered spring effect)
    ScrollTrigger.batch('.gsap-dept-card', {
      start: 'top 85%',
      onEnter: batch => gsap.fromTo(batch, 
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)', overwrite: true }
      ),
      onLeaveBack: batch => gsap.set(batch, { opacity: 0, scale: 0.8, y: 20, overwrite: true })
    });

    // ─── 3. FACILITIES & RESOURCES ───
    gsap.fromTo('.gsap-facility-header',
      { opacity: 0, y: 30 },
      { scrollTrigger: { trigger: '.gsap-facilities-section', start: 'top 80%' }, opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.gsap-facility-card',
      { opacity: 0, y: 50, rotationX: -15 },
      {
        scrollTrigger: { trigger: '.gsap-facilities-grid', start: 'top 80%' },
        opacity: 1, y: 0, rotationX: 0,
        transformOrigin: 'top center',
        duration: 0.8, stagger: 0.1, ease: 'power3.out'
      }
    );

    // Parallax for decorative shapes in Wavy Section
    gsap.to('.gsap-facility-shape-1', {
      y: -150,
      scrollTrigger: { trigger: '.gsap-facilities-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.gsap-facility-shape-2', {
      y: 150,
      scrollTrigger: { trigger: '.gsap-facilities-section', start: 'top bottom', end: 'bottom top', scrub: 1 }
    });

    // ─── 4. E-RESOURCES ───
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.gsap-eresources-section',
        start: 'top 75%'
      }
    });
    tl.fromTo('.gsap-eresources-bg', { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.gsap-eresources-content', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .fromTo('.gsap-eresource-pill', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.5, ease: 'back.out(2)' }, '-=0.4');

  }, { scope: container });

  return (
    <ReactLenis root>
      <div ref={container} className="bg-white min-h-screen pb-24 overflow-hidden">

        {/* ═══════════════════ HERO ═══════════════════ */}
        <div className="relative w-full min-h-[560px] overflow-hidden gsap-hero-section">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1507842217343-581384b0818b?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero Background" 
              className="w-full h-full object-cover gsap-hero-bg scale-110" 
            />
            <div className="absolute inset-0 bg-[#134E4A]/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#042F2E]/80 via-[#134E4A]/50 to-transparent" />
          </div>
          
          {/* Decorative floating shapes */}
          <div className="absolute top-12 right-[8%] w-48 h-48 border border-[#5EEAD4]/15 rounded-3xl gsap-float-1" />
          <div className="absolute top-32 right-[15%] w-24 h-24 border border-[#5EEAD4]/10 rounded-2xl gsap-float-2" />
          <div className="absolute bottom-20 right-[5%] w-36 h-36 bg-[#5EEAD4]/5 rounded-full blur-md" />
          
          {/* Gradient mesh overlay */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#0D9488]/20 to-transparent pointer-events-none" />
          
          {/* Bottom diagonal cut */}
          <div className="absolute bottom-0 left-0 w-full h-24 z-20">
            <svg viewBox="0 0 1440 96" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path d="M0 96L1440 96L1440 0C1200 80 720 96 0 40L0 96Z" fill="white"/>
            </svg>
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 pt-40 pb-24">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-[#5EEAD4]/10 border border-[#5EEAD4]/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-md gsap-hero-badge">
                  <BookOpen size={14} className="text-[#5EEAD4]" />
                  <span className="text-[11px] font-bold text-[#5EEAD4] uppercase tracking-widest">Knowledge Hub</span>
                </div>
                
                <h1 className="font-serif text-[52px] md:text-[76px] font-black text-white leading-[1.05] mb-6 tracking-tight gsap-hero-title">
                  Central<br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5EEAD4] to-[#99F6E4]">Library</span>
                </h1>
                
                <p className="text-white/80 text-[17px] md:text-[19px] max-w-lg leading-relaxed font-light mb-10 gsap-hero-desc">
                  A modern knowledge ecosystem empowering academic excellence with vast physical and digital collections.
                </p>
                
                <div className="flex flex-wrap gap-10">
                  {[{ n: "50K+", l: "Books" }, { n: "10K+", l: "E-Resources" }, { n: "300+", l: "Seats" }].map((s, i) => (
                    <div key={i} className="text-left gsap-hero-stat hover:scale-105 transition-transform duration-300 cursor-default">
                      <div className="text-[32px] font-black text-[#5EEAD4] tracking-tight">{s.n}</div>
                      <div className="text-[11px] text-white/50 uppercase tracking-widest font-bold mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex w-[350px] h-[350px] items-center justify-center relative gsap-hero-image-wrapper">
                {/* Outer decorative ring */}
                <div className="absolute inset-0 border border-[#5EEAD4]/10 rounded-full border-dashed gsap-spin" />
                
                <div className="relative z-10 group">
                  <div 
                    className="w-[280px] h-[320px] rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl shadow-[#042F2E] rotate-3 bg-[#134E4A] transform-gpu transition-all duration-500 ease-out hover:rotate-0 hover:scale-105"
                    style={{ WebkitMaskImage: '-webkit-radial-gradient(white, black)' }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=800&auto=format&fit=crop" 
                      alt="Majestic Library Interior" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-[#042F2E]/20 mix-blend-multiply pointer-events-none" />
                  </div>
                  
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#14B8A6] to-[#0D9488] flex items-center justify-center shadow-xl shadow-[#14B8A6]/40 -rotate-12 border border-white/20 backdrop-blur-md gsap-float-1">
                    <Search size={28} className="text-white" />
                  </div>
                  
                  <div className="absolute -bottom-4 -left-8 w-16 h-16 rounded-xl bg-gradient-to-br from-[#FCD34D] to-[#F59E0B] flex items-center justify-center shadow-lg shadow-[#F59E0B]/30 rotate-12 border border-white/20 gsap-float-2">
                    <Bookmark size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════ MAIN CONTENT ═══════════════════ */}
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12 pt-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#78716C] uppercase tracking-[0.2em] mb-12">
            <Link to="/" className="hover:text-[#134E4A] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-[#134E4A] font-bold">Library</span>
          </nav>

          {/* ─── 1. DEPARTMENT LIBRARIES (Overview / Intro) ─── */}
          <div className="mb-20 gsap-dept-section">
            <div className="flex flex-col lg:flex-row gap-12 items-center bg-gray-50/50 p-8 md:p-12 rounded-[2rem] border border-gray-100">
              <div className="flex-1 lg:max-w-xl gsap-dept-header">
                <div className="inline-flex items-center gap-2 bg-[#E5AA3E]/10 rounded-full px-4 py-1.5 mb-6">
                  <BookOpen size={14} className="text-[#D97706]" />
                  <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-widest">Network</span>
                </div>
                <h2 className="font-serif text-[36px] md:text-[42px] font-bold text-[#134E4A] mb-6 leading-tight tracking-tight">Department Libraries</h2>
                <p className="text-gray-600 text-[16px] leading-relaxed mb-8">
                  The TAT Library consists of a Central Library and 10 Departmental libraries which collectively support the teaching, research and extension programmes of the Institute. All students and faculty members are entitled to make use of the Library facilities on taking library membership.
                </p>
              </div>
              
              <div className="flex-1 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DEPARTMENTS.map((dept, i) => (
                    <div 
                      key={i}
                      className="gsap-dept-card bg-white px-5 py-4 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-gray-100 flex items-center gap-3 group hover:scale-[1.02] hover:translate-x-1 transition-all duration-300 cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E5AA3E] group-hover:scale-150 transition-transform" />
                      <span className="text-[14px] font-semibold text-gray-700 group-hover:text-[#D97706] transition-colors leading-snug">{dept}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div> {/* Close main container to allow full width section */}

        {/* ─── WAVY SECTION: FACILITIES & RESOURCES ─── */}
        <div className="relative w-full bg-[#134E4A] py-32 mt-8 mb-20 overflow-hidden gsap-facilities-section perspective-[1000px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#042F2E]/80 via-[#134E4A] to-[#042F2E]/80" />
          
          {/* Top Wave (Flipped vertically to transition from white to dark) */}
          <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-10">
            <svg viewBox="0 0 1440 96" fill="none" className="w-full h-10 md:h-20" preserveAspectRatio="none">
              <path d="M0 96L1440 96L1440 0C1200 80 720 96 0 40L0 96Z" fill="white"/>
            </svg>
          </div>
          
          {/* Decorative background shapes inside the wavy section (Parallax) */}
          <div className="absolute top-40 left-10 w-64 h-64 bg-[#5EEAD4]/10 rounded-full blur-3xl gsap-facility-shape-1" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5EEAD4]/5 rounded-full blur-3xl gsap-facility-shape-2" />

          <div className="max-w-[1400px] mx-auto px-6 xl:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 gsap-facility-header">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#5EEAD4]/10 rounded-full px-4 py-1.5 mb-4 border border-[#5EEAD4]/20">
                  <BookMarked size={14} className="text-[#5EEAD4]" />
                  <span className="text-[11px] font-bold text-[#5EEAD4] uppercase tracking-widest">Discover</span>
                </div>
                <h2 className="font-serif text-[36px] md:text-[42px] font-bold text-white mb-3 leading-tight tracking-tight">Facilities & Resources</h2>
                <p className="text-white/80 text-[16px] max-w-2xl">Our state-of-the-art library provides everything students need for academic research, collaborative learning, and deep focus.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 gsap-facilities-grid">
              {FACILITIES.map((f, i) => (
                <div key={i}
                  className="gsap-facility-card group relative bg-white p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start overflow-hidden transform-style-3d"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#0F766E] to-[#2DD4BF] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
                  
                  <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-[#0F766E]/5 to-[#0F766E]/[0.02] flex items-center justify-center group-hover:from-[#0F766E] group-hover:to-[#115E59] transition-all duration-500 shadow-inner">
                    <f.icon size={26} className="text-[#0F766E] group-hover:text-white transition-colors duration-500" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2 gap-4">
                      <h3 className="font-sans text-[20px] font-bold text-[#134E4A] group-hover:text-[#0F766E] transition-colors">{f.title}</h3>
                      <span className="text-[#0F766E] text-[11px] font-black uppercase tracking-widest bg-[#0F766E]/10 px-3 py-1.5 rounded-full whitespace-nowrap">{f.stat}</span>
                    </div>
                    <p className="text-gray-500 text-[15px] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Wave (Transitions back from dark to white) */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
            <svg viewBox="0 0 1440 96" fill="none" className="w-full h-10 md:h-20" preserveAspectRatio="none">
              <path d="M0 96L1440 96L1440 0C1200 80 720 96 0 40L0 96Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* Re-open main container for E-Resources */}
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-10 gsap-eresources-section">

          {/* ─── 3. E-RESOURCES (Strong Closer) ─── */}
          <div className="mb-20">
            <div className="gsap-eresources-bg p-8 md:p-12 bg-gradient-to-br from-[#042F2E] to-[#134E4A] rounded-[2rem] shadow-2xl text-white relative overflow-hidden">
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#5EEAD4]/10 rounded-full blur-3xl" />
              <div className="absolute top-10 right-10 w-40 h-40 border border-white/5 rounded-full" />
              <div className="absolute top-20 right-20 w-20 h-20 border border-white/10 rounded-full" />
              
              <div className="flex items-center gap-5 mb-10 relative z-10 gsap-eresources-content">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <Globe size={28} className="text-[#5EEAD4]" />
                </div>
                <div>
                  <h3 className="font-serif text-[30px] font-bold text-white leading-tight">E-Resources</h3>
                  <p className="text-[#5EEAD4]/80 text-sm mt-1">Premium Digital Access</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {E_RESOURCES.map((r,i) => (
                  <div 
                    key={i} 
                    className="gsap-eresource-pill flex items-center gap-3 py-3.5 px-5 rounded-2xl bg-white/5 border border-white/10 transition-colors cursor-pointer group shadow-sm hover:shadow-md hover:bg-white/10"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-full bg-black/20 flex items-center justify-center group-hover:bg-[#5EEAD4]/20 transition-colors">
                      <Bookmark size={16} className="text-[#5EEAD4]" />
                    </div>
                    <span className="text-[14px] font-medium text-white/90 group-hover:text-white leading-snug">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </ReactLenis>
  );
}
