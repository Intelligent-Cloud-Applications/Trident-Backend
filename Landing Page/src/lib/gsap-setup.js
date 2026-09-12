import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once at app level
gsap.registerPlugin(ScrollTrigger);

// Global GSAP defaults — premium feel
gsap.defaults({
  ease: "power3.out",
  duration: 1,
});

// Custom easing curves inspired by Apple/Linear
export const EASE = {
  // Smooth deceleration — feels expensive
  smooth: "power3.out",
  // Dramatic entrance
  dramatic: "power4.out",
  // Elastic spring — organic feel
  elastic: "elastic.out(1, 0.5)",
  // Sharp snap
  snap: "back.out(1.7)",
  // Ultra-smooth for scroll-linked
  scroll: "none",
  // Cinematic slow reveal
  cinematic: "expo.out",
  // Buttery ease for transforms
  butter: "circ.out",
  // Custom cubic — Apple-style
  apple: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
};

// Performance: Use will-change sparingly, only during animation
export function optimizeElement(el) {
  el.style.willChange = "transform, opacity";
  return () => {
    el.style.willChange = "auto";
  };
}

// Batch ScrollTrigger refresh after lazy loads
let refreshTimeout;
export function scheduleRefresh() {
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 200);
}

export { gsap, ScrollTrigger };
