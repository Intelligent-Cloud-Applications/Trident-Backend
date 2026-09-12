/**
 * ═══════════════════════════════════════════════════════════════
 * ADVANCED ANIMATION COMPONENTS
 * Ultra-premium cinematic effects library
 * Inspired by: Cuberto, Active Theory, Locomotive, Linear
 * ═══════════════════════════════════════════════════════════════
 */

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap-setup";

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. SCROLL-LINKED SECTION PIN (slides-over effect)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * PinnedSection — Pins content while next section slides over it
 * Creates a cinematic "fake camera" feeling
 */
export function PinnedSection({ children, className = "", pinDuration = "100%" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: `+=${pinDuration}`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
    });

    return () => st.kill();
  }, [pinDuration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. SCROLL-TRIGGERED COUNTER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * GSAPCounter — Buttery-smooth GSAP-powered number counter
 * Triggers on scroll into view
 */
export function GSAPCounter({ end, prefix = "", suffix = "", duration = 2, className = "", decimals = 0 }) {
  const ref = useRef(null);
  const counterRef = useRef({ val: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(counterRef.current, {
          val: end,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            const v = counterRef.current.val;
            el.textContent = prefix + (decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN")) + suffix;
          },
        });
      },
    });

    return () => st.kill();
  }, [end, prefix, suffix, duration, decimals]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. TEXT SCRAMBLE REVEAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * ScrambleText — Characters scramble/glitch before resolving to final text
 * Cyberpunk-inspired text reveal
 */
export function ScrambleText({ text, className = "", duration = 1.5, triggerOnScroll = true }) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated.current) return;

    el.textContent = text.replace(/./g, " ");

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      const chars = text.split("");
      const totalFrames = Math.floor(duration * 60);
      let frame = 0;

      const update = () => {
        frame++;
        const progress = frame / totalFrames;

        const result = chars.map((char, i) => {
          if (char === " ") return " ";
          const charProgress = (progress * chars.length - i) / 4;
          if (charProgress >= 1) return char;
          if (charProgress > 0) return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          return " ";
        }).join("");

        el.textContent = result;

        if (frame < totalFrames) {
          requestAnimationFrame(update);
        } else {
          el.textContent = text;
        }
      };

      requestAnimationFrame(update);
    };

    if (triggerOnScroll) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: animate,
      });
      return () => st.kill();
    } else {
      setTimeout(animate, 300);
    }
  }, [text, duration, triggerOnScroll]);

  return <span ref={ref} className={className} />;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. PERSPECTIVE 3D TILT ON HOVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Tilt3D — Element tilts toward cursor on hover
 * Liquid-like depth response
 */
export function Tilt3D({ children, className = "", intensity = 15, scale = 1.02 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: x * intensity,
        rotateX: -y * intensity,
        scale: scale,
        duration: 0.4,
        ease: "power2.out",
        transformPerspective: 800,
        transformOrigin: "center center",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [intensity, scale]);

  return (
    <div ref={ref} className={className} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. HORIZONTAL SCROLL SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * HorizontalScroll — Converts vertical scroll to horizontal movement
 * GSAP ScrollTrigger pin + scrub
 */
export function HorizontalScroll({ children, className = "", speed = 1 }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalWidth = track.scrollWidth - container.offsetWidth;

    const tl = gsap.to(track, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: `+=${totalWidth * speed}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => tl.scrollTrigger?.kill();
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex items-stretch w-max">
        {children}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. GLOW TRAIL (cursor-following glow on a specific element)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * GlowTrail — Adds a radial glow that follows cursor within element bounds
 */
export function GlowTrail({ children, className = "", color = "#2C3A8C", intensity = 0.12, size = 300 }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const glow = glowRef.current;
    if (!container || !glow || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      const rect = container.getBoundingClientRect();
      gsap.to(glow, {
        left: e.clientX - rect.left - size / 2,
        top: e.clientY - rect.top - size / 2,
        opacity: intensity,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.6 });
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);

    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [color, intensity, size]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={glowRef}
        className="absolute rounded-full pointer-events-none opacity-0 z-0"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. SCROLL-BASED OPACITY/TRANSFORM (generic scrub)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * ScrollReveal — GSAP ScrollTrigger-powered entrance
 * More powerful than CSS IntersectionObserver version
 */
export function ScrollReveal({ children, className = "", from = {}, to = {}, start = "top 85%", duration = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const defaults = { opacity: 0, y: 50, ...from };
    const target = { opacity: 1, y: 0, duration, ease: "power3.out", ...to };

    gsap.set(el, defaults);

    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => gsap.to(el, target),
    });

    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. BREATHING ANIMATION (subtle pulse)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Breathing — Subtle scale/opacity pulse for icons, buttons, badges
 */
export function Breathing({ children, className = "", intensity = 0.03, duration = 3 }) {
  return (
    <div
      className={className}
      style={{
        animation: `breathing ${duration}s ease-in-out infinite`,
      }}
    >
      <style>{`
        @keyframes breathing {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(${1 + intensity}); opacity: 0.85; }
        }
      `}</style>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. LINE DRAW ANIMATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * DrawLine — SVG line that draws itself on scroll
 */
export function DrawLine({ className = "", color = "#2C3A8C", thickness = 2, direction = "horizontal" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const line = el.querySelector("line");
    if (!line) return;

    const length = line.getTotalLength();
    gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power3.inOut",
        });
      },
    });

    return () => st.kill();
  }, []);

  const isHoriz = direction === "horizontal";

  return (
    <svg
      ref={ref}
      className={className}
      viewBox={isHoriz ? "0 0 200 2" : "0 0 2 200"}
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <line
        x1="0" y1={isHoriz ? "1" : "0"}
        x2={isHoriz ? "200" : "0"} y2={isHoriz ? "1" : "200"}
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
      />
    </svg>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. ANIMATED GRADIENT BACKGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * AnimatedGradient — Slowly shifting gradient mesh background
 */
export function AnimatedGradient({ 
  colors = ["#2C3A8C", "#C41E3A", "#006738", "#8B6914"], 
  className = "", 
  speed = 15,
  opacity = 0.08 
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <style>{`
        @keyframes gradient-orbit-1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30%,-20%) scale(1.2)} 66%{transform:translate(-20%,15%) scale(0.9)} }
        @keyframes gradient-orbit-2 { 0%,100%{transform:translate(0,0) scale(1.1)} 33%{transform:translate(-25%,25%) scale(0.8)} 66%{transform:translate(35%,-10%) scale(1.3)} }
        @keyframes gradient-orbit-3 { 0%,100%{transform:translate(0,0) scale(0.9)} 33%{transform:translate(15%,30%) scale(1.1)} 66%{transform:translate(-30%,-25%) scale(1)} }
      `}</style>
      {colors.slice(0, 4).map((color, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: "40%",
            height: "40%",
            top: `${[10, 60, 20, 50][i]}%`,
            left: `${[10, 50, 70, 20][i]}%`,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            opacity,
            animation: `gradient-orbit-${(i % 3) + 1} ${speed + i * 3}s ease-in-out infinite`,
            filter: "blur(60px)",
          }}
        />
      ))}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. STAGGER GRID REVEAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * StaggerGrid — Reveals grid items with a wave pattern
 * Items animate from bottom-right to top-left (or configurable)
 */
export function StaggerGrid({ children, className = "", stagger = 0.06, from = "start" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.children;
    if (!items.length) return;

    gsap.set(items, { opacity: 0, y: 30, scale: 0.95 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: { each: stagger, from },
          ease: "power3.out",
        });
      },
    });

    return () => st.kill();
  }, [stagger, from]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. VELOCITY-BASED SCROLL EFFECTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * useScrollVelocity — Returns current scroll velocity
 * For velocity-reactive animations
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    let rafId;
    const update = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      const dy = window.scrollY - lastScroll.current;
      
      if (dt > 0) {
        const v = Math.abs(dy / dt) * 16; // Normalize to ~pixels per frame
        setVelocity(prev => prev * 0.8 + v * 0.2); // Smooth
      }

      lastScroll.current = window.scrollY;
      lastTime.current = now;
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return velocity;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. MOUSE PARALLAX CONTAINER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * MouseParallax — Children move based on mouse position
 * depth: 0-1, higher = more movement
 */
export function MouseParallax({ children, className = "", depth = 0.02, invert = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * (invert ? -1 : 1);
      const y = (e.clientY / window.innerHeight - 0.5) * (invert ? -1 : 1);

      gsap.to(el, {
        x: x * depth * 100,
        y: y * depth * 100,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [depth, invert]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. SCROLL-TRIGGERED CLIP PATH REVEAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * ClipReveal — Content revealed via animated clip-path
 * Creates a cinematic wipe/curtain effect
 */
export function ClipReveal({ children, className = "", direction = "bottom", duration = 1.2 }) {
  const ref = useRef(null);

  const clipPaths = {
    bottom: { from: "inset(100% 0% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
    top: { from: "inset(0% 0% 100% 0%)", to: "inset(0% 0% 0% 0%)" },
    left: { from: "inset(0% 100% 0% 0%)", to: "inset(0% 0% 0% 0%)" },
    right: { from: "inset(0% 0% 0% 100%)", to: "inset(0% 0% 0% 0%)" },
    center: { from: "inset(50% 50% 50% 50%)", to: "inset(0% 0% 0% 0%)" },
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { from, to } = clipPaths[direction] || clipPaths.bottom;
    gsap.set(el, { clipPath: from });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: to,
          duration,
          ease: "expo.out",
        });
      },
    });

    return () => st.kill();
  }, [direction, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 15. SKEW ON SCROLL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * ScrollSkew — Elements subtly skew based on scroll velocity
 * Creates organic, alive feeling
 */
export function ScrollSkew({ children, className = "", maxSkew = 3 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let lastY = window.scrollY;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      const skew = Math.max(-maxSkew, Math.min(maxSkew, delta * 0.3));
      
      gsap.to(el, {
        skewY: skew,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(el, { skewY: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        },
      });

      lastY = currentY;
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [maxSkew]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
