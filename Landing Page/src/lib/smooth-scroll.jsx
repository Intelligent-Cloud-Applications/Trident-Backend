import { useEffect, useRef, createContext, useContext } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap-setup";

const LenisContext = createContext(null);

/**
 * Lenis Smooth Scroll Provider
 * Wraps the app with buttery-smooth inertial scrolling
 * and syncs with GSAP ScrollTrigger for perfect interop.
 */
export function SmoothScrollProvider({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP's ticker for frame-perfect scroll
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}

/**
 * Hook to access the Lenis instance
 * Useful for programmatic scrollTo or pause/resume
 */
export function useLenis() {
  const ref = useContext(LenisContext);
  return ref?.current ?? null;
}
