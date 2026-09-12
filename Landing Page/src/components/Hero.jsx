import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/gsap-setup';
import { AmbientParticles, ParallaxLayer } from '../utils/animations';


import heroSlide2 from "../assets/slide_2.jpg";
import heroSlide4 from "../assets/slide_4.jpg";
import heroSlide5 from "../assets/slide_5.png";
import heroSlide6 from "../assets/slide_6.png";
import heroSlide7 from "../assets/slide_7.png";
import heroSlide8 from "../assets/slide_8.jpeg";
import heroSlide9 from "../assets/slide_9.jpeg";

/* ─── Slide data — each slide: full-bleed image + unique copy ─── */
const SLIDES = [
  {
    image: heroSlide6,
    heading: <>Shaping<br />tomorrow's<br />engineers</>,
    subtext: "From state-of-the-art classrooms to hands-on workshops, Trident provides the environment where curiosity transforms into expertise.",
  },
  {
    image: heroSlide5,
    heading: <>Pioneering<br />research with<br />real impact</>,
    subtext: "₹2.5 Cr DST-funded AI Research Centre, 50+ patents filed, and a culture of relentless innovation. Discover what makes Trident a research powerhouse.",
  },
  {
    image: heroSlide7,
    heading: <>A legacy of<br />excellence &<br />innovation</>,
    subtext: "Two decades of academic distinction, industry partnerships, and a vibrant community — Trident continues to set the benchmark in technical education.",
  },
  {
    image: heroSlide4,
    heading: <>A campus<br />designed to<br />inspire</>,
    subtext: "A corporate-styled campus in the heart of Bhubaneswar — advanced labs, vibrant student clubs, cultural festivals, and spaces that spark creativity.",
  },
  {
    image: heroSlide2,
    heading: <>Where knowledge<br />meets<br />innovation</>,
    subtext: "Immerse yourself in Odisha's premier technical ecosystem. Rigorous academics meet world-class innovation labs to forge the leaders of tomorrow.",
  },

  {
    image: heroSlide8,
    heading: <>Connecting<br />education with<br />opportunity</>,
    subtext: "At Trident Academy of Technology, we're focused on one goal: shaping the engineers, leaders, and innovators of tomorrow through world-class education.",
  },
  {
    image: heroSlide9,
    heading: <>Building careers<br />that matter,<br />since 2005</>,
    subtext: "120+ recruiting companies, thousands of placed graduates, and a legacy of career-readiness. Where ambition meets real-world opportunity.",
  },
];

const INTERVAL = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const [animState, setAnimState] = useState('visible');
  const [loaded, setLoaded] = useState(false);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const gradientRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // ── GSAP: Scroll-triggered hero zoom + fade ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(section, {
      scale: 1.1,
      opacity: 0.3,
      ease: "none",
    });

    return () => tl.scrollTrigger?.kill();
  }, []);

  // ── Cinematic intro animation ──
  useEffect(() => {
    if (!loaded) return;

    const heading = headingRef.current;
    const subtext = subtextRef.current;

    if (heading) {
      // Animate heading with a cinematic entrance
      gsap.fromTo(heading,
        { y: 60, opacity: 0, clipPath: "inset(100% 0% 0% 0%)" },
        { y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, delay: 0.8, ease: "expo.out" }
      );
    }

    if (subtext) {
      gsap.fromTo(subtext,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 1.2, ease: "power3.out" }
      );
    }
  }, [loaded]);

  // ── Mouse-reactive parallax + gradient glow ──
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };

      // Move gradient glow
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          x: e.clientX - 300,
          y: e.clientY - 300,
          duration: 1.2,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const transition = useCallback((nextIdx) => {
    setAnimState('exiting');
    setTimeout(() => {
      setActive(typeof nextIdx === 'function' ? nextIdx : () => nextIdx);
      setAnimState('entering');

      // Animate new slide content in
      setTimeout(() => {
        setAnimState('visible');
        const heading = headingRef.current;
        const subtext = subtextRef.current;

        if (heading) {
          gsap.fromTo(heading,
            { y: 40, opacity: 0, filter: "blur(6px)" },
            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }
          );
        }
        if (subtext) {
          gsap.fromTo(subtext,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, delay: 0.15, ease: "power3.out" }
          );
        }
      }, 60);
    }, 500);
  }, []);

  const goTo = useCallback((idx) => {
    if (idx === active || animState !== 'visible') return;
    transition(idx);
  }, [active, animState, transition]);

  // Auto-play
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      transition(p => (p + 1) % SLIDES.length);
    }, INTERVAL);
  }, [transition]);

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, [startTimer]);

  const handleNav = useCallback((idx) => {
    goTo(idx);
    startTimer();
  }, [goTo, startTimer]);

  const slide = SLIDES[active];
  const isOut = animState === 'exiting';

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen min-h-[600px] max-h-[1080px] overflow-hidden"
      style={{ transformOrigin: "center center" }}
    >

      {/* ═══ Background images — crossfade + Ken Burns + scroll parallax ═══ */}
      <ParallaxLayer speed={0.4} className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)] pointer-events-none z-0">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === active ? 1 : 0,
              transition: 'opacity 1200ms ease-in-out',
              zIndex: i === active ? 1 : 0,
            }}
          >
            <img
              src={s.image}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transform: i === active
                  ? `scale(1.08) translate(${(mousePos.current.x - 0.5) * -8}px, ${(mousePos.current.y - 0.5) * -8}px)`
                  : 'scale(1.12)',
                transition: 'transform 10s ease-out',
              }}
              loading={i < 2 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </ParallaxLayer>

      {/* ═══ Overlay — cinematic gradient ═══ */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* ═══ Mouse-reactive gradient mesh ═══ */}
      <div
        ref={gradientRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-[3] opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(44, 58, 140, 0.3) 0%, transparent 70%)',
        }}
      />

      {/* ═══ Ambient floating particles ═══ */}
      <div className="absolute inset-0 z-[3] pointer-events-none">
        <AmbientParticles count={15} color="rgba(255,255,255,0.06)" section={true} />
      </div>

      {/* ═══ Dynamic light ray ═══ */}
      <div
        className="absolute top-0 right-[20%] w-[1px] h-full z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(232,189,99,0.08) 30%, rgba(232,189,99,0.03) 60%, transparent 100%)',
          animation: 'light-sway 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-0 right-[40%] w-[1px] h-full z-[3] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.04) 40%, transparent 100%)',
          animation: 'light-sway 12s ease-in-out 2s infinite',
        }}
      />

      {/* ═══ Content ═══ */}
      <div className="relative z-10 h-full flex items-center pt-36 pb-28">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-14 w-full">
          <div className="max-w-[800px]">

            {/* ── Heading — cinematic reveal ── */}
            <h1
              ref={headingRef}
              className="font-serif drop-shadow-2xl"
              style={{
                fontFamily: "'Source Serif 4', Georgia, serif",
                fontSize: 'clamp(3.5rem, 7vw, 5.75rem)',
                color: '#ffffff',
                lineHeight: '1.05',
                letterSpacing: '-0.03em',
                marginBottom: '1.75rem',
                textShadow: '0 10px 40px rgba(0,0,0,0.5)',
                opacity: isOut ? 0 : undefined,
                transform: isOut ? 'translateY(20px)' : undefined,
                transition: isOut ? 'all 500ms ease-out' : undefined,
              }}
            >
              {slide.heading}
            </h1>

            {/* ── Subtext ── */}
            <p
              ref={subtextRef}
              className="drop-shadow-lg"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
                lineHeight: 1.65,
                letterSpacing: '0.015em',
                color: 'rgba(255,255,255,0.85)',
                maxWidth: '580px',
                marginBottom: '3rem',
                textShadow: '0 4px 12px rgba(0,0,0,0.3)',
                opacity: isOut ? 0 : undefined,
                transform: isOut ? 'translateY(16px)' : undefined,
                transition: isOut ? 'all 400ms ease-out 50ms' : undefined,
              }}
            >
              {slide.subtext}
            </p>

          </div>
        </div>
      </div>

      {/* ═══ Bottom Navigation ═══ */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-[1400px] mx-auto px-6 xl:px-14 pb-8">
          <div className="flex items-end justify-between">

            {/* Progress bars */}
            <div className="flex items-center gap-2.5">
              {SLIDES.map((s, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="relative rounded-full overflow-hidden transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === active ? 52 : 20,
                    height: 3,
                    background: 'rgba(255,255,255,0.2)',
                  }}
                >
                  {i === active && (
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: '#fff',
                        animation: `slideProgress ${INTERVAL}ms linear forwards`,
                      }}
                    />
                  )}
                </button>
              ))}
              <span
                className="ml-3 tabular-nums"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.35)',
                  letterSpacing: '0.08em',
                }}
              >
                {String(active + 1).padStart(2, '0')}
                <span style={{ color: 'rgba(255,255,255,0.15)', margin: '0 3px' }}>/</span>
                {String(SLIDES.length).padStart(2, '0')}
              </span>
            </div>

            {/* Prev / Next — magnetic buttons */}
            <div className="flex items-center gap-2">
              {[
                { icon: <ChevronLeft size={16} strokeWidth={2} />, idx: (active - 1 + SLIDES.length) % SLIDES.length, label: 'Previous' },
                { icon: <ChevronRight size={16} strokeWidth={2} />, idx: (active + 1) % SLIDES.length, label: 'Next' },
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(btn.idx)}
                  aria-label={btn.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:bg-white/10"
                  style={{
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {btn.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Scroll indicator — breathing animation ═══ */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <div className="w-[1px] h-8 relative overflow-hidden">
          <div className="absolute inset-x-0 h-full bg-white/30" style={{ animation: 'scroll-line 2s ease-in-out infinite' }} />
        </div>
      </div>

      {/* ═══ Keyframes ═══ */}
      <style>{`
        @keyframes slideProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes light-sway {
          0%, 100% { transform: translateX(0) skewX(0deg); opacity: 0.5; }
          50% { transform: translateX(30px) skewX(-2deg); opacity: 1; }
        }
        @keyframes scroll-line {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(0%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  );
}
