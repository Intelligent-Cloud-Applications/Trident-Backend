/**
 * ═══════════════════════════════════════════════════════════════
 * PREMIUM ANIMATION UTILITIES
 * Ultra-premium GSAP + Framer Motion animation components
 * Inspired by: Apple, Linear, Awwwards, Cuberto, Active Theory
 * ═══════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap, ScrollTrigger, EASE } from "../lib/gsap-setup";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// KEEP ALL ORIGINAL EXPORTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// eslint-disable-next-line react-refresh/only-export-components
export function useVisible(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );
    const node = ref.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold]);

  return [ref, isVisible];
}

export function FadeInUp({ children, delay = 0, duration = 800, className = "" }) {
  const [ref, isVisible] = useVisible(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function SlideIn({ children, delay = 0, direction = "left", duration = 800, className = "" }) {
  const [ref, isVisible] = useVisible(0.1);
  const translateVal = direction === "left" ? "-50px" : "50px";
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : `translateX(${translateVal})`,
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function ScaleReveal({ children, delay = 0, duration = 1000, className = "" }) {
  const [ref, isVisible] = useVisible(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.95)",
        transition: `all ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
}

export function Fade({ children, delay = 0, className = "" }) {
  const [ref, isVisible] = useVisible(0.1);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity 800ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEW: PREMIUM ANIMATION COMPONENTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * TextReveal — Character-by-character reveal with blur-to-clear
 * Uses SplitType for character splitting + GSAP for stagger animation
 */
export function TextReveal({ children, className = "", delay = 0, stagger = 0.03, blur = true }) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || hasAnimated.current) return;

    // Dynamic import to avoid SSR issues
    import("split-type").then(({ default: SplitType }) => {
      const split = new SplitType(el, { types: "chars,words" });
      
      gsap.set(split.chars, {
        opacity: 0,
        y: 20,
        rotateX: blur ? 40 : 0,
        filter: blur ? "blur(8px)" : "none",
        transformOrigin: "bottom center",
      });

      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          hasAnimated.current = true;
          gsap.to(split.chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: stagger,
            delay: delay / 1000,
            ease: EASE.dramatic,
            onComplete: () => {
              // Clean up — remove inline styles for perf
              split.revert();
            },
          });
        },
      });
    });
  }, [delay, stagger, blur]);

  return (
    <div ref={containerRef} className={className} style={{ perspective: "600px" }}>
      {children}
    </div>
  );
}

/**
 * MaskReveal — Content slides up through a masked overflow
 * Premium "curtain lift" effect
 */
export function MaskReveal({ children, className = "", delay = 0, direction = "up" }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || hasAnimated.current) return;

    const yFrom = direction === "up" ? "100%" : "-100%";

    gsap.set(inner, { y: yFrom, opacity: 0 });

    ScrollTrigger.create({
      trigger: outer,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(inner, {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          delay: delay / 1000,
          ease: EASE.cinematic,
        });
      },
    });
  }, [delay, direction]);

  return (
    <div ref={outerRef} className={`overflow-hidden ${className}`}>
      <div ref={innerRef}>{children}</div>
    </div>
  );
}

/**
 * ParallaxLayer — GSAP ScrollTrigger parallax
 * Speed: positive = slower than scroll, negative = faster
 */
export function ParallaxLayer({ children, speed = 0.3, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.to(el, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    return () => tl.scrollTrigger?.kill();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * ScrollScale — Element scales based on scroll position
 * Great for images, hero sections
 */
export function ScrollScale({ children, from = 1, to = 1.15, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.fromTo(el,
      { scale: from },
      {
        scale: to,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );

    return () => tl.scrollTrigger?.kill();
  }, [from, to]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

/**
 * MagneticButton — Button subtly pulls toward cursor
 * Inspired by Cuberto/Active Theory
 */
export function MagneticButton({ children, className = "", strength = 0.3, style = {} }) {
  const btnRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
    };

    btn.addEventListener("mousemove", handleMove);
    btn.addEventListener("mouseleave", handleLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMove);
      btn.removeEventListener("mouseleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={btnRef} className={className} style={style}>
      {children}
    </div>
  );
}

/**
 * FloatingElement — Organic random floating motion
 * CSS-based for GPU performance
 */
export function FloatingElement({ children, className = "", range = 15, duration = 6, delay = 0 }) {
  const id = useRef(`float-${Math.random().toString(36).substr(2, 6)}`);

  return (
    <>
      <style>{`
        @keyframes ${id.current} {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(${range * 0.4}px, -${range}px) rotate(${range * 0.2}deg); }
          50% { transform: translate(-${range * 0.3}px, ${range * 0.5}px) rotate(-${range * 0.15}deg); }
          75% { transform: translate(${range * 0.6}px, ${range * 0.3}px) rotate(${range * 0.1}deg); }
        }
      `}</style>
      <div
        className={className}
        style={{
          animation: `${id.current} ${duration}s ease-in-out ${delay}s infinite`,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </>
  );
}

/**
 * MouseGlow — Radial gradient that follows cursor inside a container
 */
export function MouseGlow({ className = "", color = "rgba(44, 58, 140, 0.08)", size = 400 }) {
  const ref = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const container = ref.current;
    const glow = glowRef.current;
    if (!container || !glow || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x - size / 2,
        y: y - size / 2,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    const handleEnter = () => gsap.to(glow, { opacity: 1, duration: 0.4 });
    const handleLeave = () => gsap.to(glow, { opacity: 0, duration: 0.4 });

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseenter", handleEnter);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseenter", handleEnter);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [size]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div
        ref={glowRef}
        className="absolute pointer-events-none rounded-full opacity-0"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          zIndex: 0,
        }}
      />
    </div>
  );
}

/**
 * StaggerChildren — Staggers all direct children with GSAP
 * Drop-in wrapper for any list/grid
 */
export function StaggerChildren({ children, className = "", stagger = 0.08, y = 40, duration = 0.8 }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    const items = el.children;
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: EASE.dramatic,
        });
      },
    });
  }, [stagger, y, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/**
 * ScrollProgress — Returns a 0-1 progress value for scroll position
 * Hook for custom scroll-linked effects
 */
export function useScrollProgress(ref, start = "top bottom", end = "bottom top") {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => st.kill();
  }, [ref, start, end]);

  return progress;
}

/**
 * CinematicEntry — Page load animation
 * White curtain that lifts away with expo easing
 */
export function CinematicEntry() {
  const curtainRef = useRef(null);

  useEffect(() => {
    const curtain = curtainRef.current;
    if (!curtain) return;

    const tl = gsap.timeline();
    tl.to(curtain, {
      yPercent: -100,
      duration: 1.4,
      delay: 0.3,
      ease: "expo.inOut",
    });
    tl.set(curtain, { display: "none" });
  }, []);

  return (
    <div
      ref={curtainRef}
      className="fixed inset-0 z-[9999] bg-[#EFE7DF] flex items-center justify-center pointer-events-none"
    >
      <div className="w-8 h-8 border-2 border-[#2C3A8C] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

/**
 * NoiseOverlay — Subtle animated grain texture
 * Uses CSS for zero JS overhead
 */
export function NoiseOverlay({ opacity = 0.02 }) {
  return (
    <>
      <style>{`
        @keyframes noise-shift {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
          100% { transform: translate(5%, 0); }
        }
      `}</style>
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{ opacity, mixBlendMode: "overlay" }}
      >
        <svg className="w-full h-full" style={{ animation: "noise-shift 8s steps(10) infinite" }}>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
    </>
  );
}

/**
 * CursorGlow — Global cursor-following radial glow
 */
export function CursorGlow({ color = "rgba(44, 58, 140, 0.06)", size = 600 }) {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow || window.matchMedia("(pointer: coarse)").matches) {
      if (glow) glow.style.display = "none";
      return;
    }

    const handleMove = (e) => {
      gsap.to(glow, {
        x: e.clientX - size / 2,
        y: e.clientY - size / 2,
        duration: 0.8,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [size]);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 pointer-events-none z-[50] rounded-full"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        willChange: "transform",
      }}
    />
  );
}

/**
 * ScrollVelocityBlur — Adds motion-blur illusion based on scroll speed
 * Attaches to a ref'd element
 */
export function useScrollVelocityBlur(ref, maxBlur = 3) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let velocity = 0;
    let lastScroll = window.scrollY;

    const update = () => {
      const current = window.scrollY;
      velocity = Math.abs(current - lastScroll);
      lastScroll = current;

      const blur = Math.min(velocity * 0.1, maxBlur);
      el.style.filter = blur > 0.2 ? `blur(${blur}px)` : "none";

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [ref, maxBlur]);
}

/**
 * AmbientParticles — Floating subtle particles
 * Pure CSS for performance
 */
export function AmbientParticles({ count = 20, color = "rgba(232, 189, 99, 0.15)", section = false }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`${section ? "absolute" : "fixed"} inset-0 pointer-events-none overflow-hidden z-[1]`}>
      <style>{`
        @keyframes particle-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          25% { transform: translate(30px, -60px) scale(1.2); }
          50% { transform: translate(-20px, -120px) scale(0.8); }
          75% { transform: translate(40px, -80px) scale(1.1); }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            backgroundColor: color,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
