import { useEffect, useRef, useState } from "react";
import { FadeInUp } from "../utils/animations";
import { Users, Award, Briefcase, Globe } from "lucide-react";

/* ─── Animated counter hook ─── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = Date.now();
          const timer = setInterval(() => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress >= 1) { setCount(target); clearInterval(timer); }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ icon, val, suffix, label, delay }) {
  const { count, ref } = useCountUp(val, 2200);

  return (
    <FadeInUp delay={delay}>
      <div ref={ref} className="flex flex-col items-center text-center group py-6 md:py-0">
        <div className="w-14 h-14 rounded-2xl bg-[#212529]/10 flex items-center justify-center mb-5 text-[#212529] group-hover:bg-[#212529] group-hover:text-white group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>
        <div className="serif text-[48px] md:text-[64px] font-bold text-[#212529] leading-none mb-2 tracking-tight">
          {count.toLocaleString()}<span className="text-[#8B6914]">{suffix}</span>
        </div>
        <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#212529]/45">{label}</div>
      </div>
    </FadeInUp>
  );
}

export default function AtAGlance() {
  const stats = [
    { label: "Students", val: 12000, suffix: "+", icon: <Users size={24} /> },
    { label: "Faculty", val: 200, suffix: "+", icon: <Award size={24} /> },
    { label: "Partner Institutions", val: 45, suffix: "", icon: <Globe size={24} /> },
    { label: "Placement Rate", val: 94, suffix: "%", icon: <Briefcase size={24} /> },
  ];

  return (
    <section className="relative py-14 md:py-20 overflow-hidden bg-[#F0BB51]">
      {/* Skewed accent */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-[#E5AA3E] transform origin-top-right -skew-x-12 opacity-50 z-0" />

      {/* Decorative shapes */}
      <div className="absolute top-[20%] right-[15%] w-20 h-20 border-2 border-[#212529]/10 rotate-45 z-0 hidden md:block" />
      <div className="absolute bottom-[10%] left-[8%] w-12 h-12 bg-[#D99A2B]/30 rounded-full z-0 hidden md:block" />

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 relative z-10">
        <FadeInUp>
          <div className="text-center mb-10 md:mb-14">
            <h2 className="relative z-10 font-serif text-[36px] md:text-[50px] font-bold text-[#212529] leading-[1.1] tracking-tight">
              Trident, <span className="italic">At a Glance.</span>
            </h2>
            <p className="text-[#3E3A36] text-[16px] md:text-[18px] font-medium leading-relaxed max-w-2xl mx-auto mt-4">
              A legacy of excellence defined by the measurable impact of our community across the globe.
            </p>
          </div>
        </FadeInUp>

        {/* Floating counters — NO cards, just numbers on the gold bg */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 md:divide-x md:divide-[#212529]/10">
          {stats.map((s, idx) => (
            <StatCounter key={s.label} icon={s.icon} val={s.val} suffix={s.suffix} label={s.label} delay={idx * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
