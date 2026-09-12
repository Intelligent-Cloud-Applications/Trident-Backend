import { STATS } from "../data/constants";
import { Fade } from "../utils/animations";

export default function StatsBand() {
  return (
    <div className="bg-[#3E3A36] border-y border-soft/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map((s, i) => (
            <Fade key={s.label} delay={i * 60} className="py-8 px-6 text-center">
              <div className="serif text-3xl font-medium text-brand-yellow mb-1">{s.value}</div>
              <div className="text-white/60 text-xs font-medium uppercase tracking-wide">{s.label}</div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
}
