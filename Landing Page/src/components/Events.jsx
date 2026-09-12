import { FadeInUp } from "../utils/animations";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export default function Events() {
  const evts = [
    { day: "14", month: "Nov", title: "Annual Science & Technology Symposium", type: "Conference", loc: "Main Auditorium", time: "09:00 AM", color: "brand-blue" },
    { day: "22", month: "Nov", title: "Global Alumni Leadership Summit 2026", type: "Networking", loc: "Executive Hall", time: "10:30 AM", color: "brand-orange" },
    { day: "05", month: "Dec", title: "Winter Commencement Ceremony", type: "Ceremony", loc: "Campus Quad", time: "04:00 PM", color: "brand-green" },
  ];

  return (
    <section className="py-24 bg-bg-light relative border-t border-soft">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-end mb-16 gap-6">
          <FadeInUp>
            <span className="rose-rule"></span>
            <h2 className="serif text-4xl md:text-5xl font-bold text-[#3E3A36] relative z-10 inline-block">
              <span className="absolute -top-2 -left-4 w-32 h-14 bg-soft transform -rotate-3 -z-10 rounded-sm"></span>
              Upcoming <span className="italic text-[#2C3A8C]">Events.</span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={200}>
            <a href="#" className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#3E3A36]/60 hover:text-primary transition-colors hover:translate-x-1 duration-300">
               Full Calendar <ArrowRight size={14} />
            </a>
          </FadeInUp>
        </div>

        <div className="space-y-6">
          {evts.map((e, i) => (
            <FadeInUp key={i} delay={i * 100}>
               <a href="#" className={`group flex flex-col md:flex-row items-center bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.15)] border border-transparent hover:border-${e.color}/30 transition-all duration-500 gap-6 md:gap-10 transform hover:-translate-y-1`}>
                 
                 {/* Date Block */}
                 <div className={`flex-shrink-0 flex flex-col items-center justify-center bg-bg-light rounded-xl w-24 h-24 border border-soft group-hover:bg-${e.color} transition-colors duration-500`}>
                    <span className={`text-[11px] font-medium uppercase tracking-widest text-${e.color} group-hover:text-white/80 mb-1`}>{e.month}</span>
                    <span className="serif text-4xl font-bold text-[#3E3A36] group-hover:text-white leading-none">{e.day}</span>
                 </div>

                 {/* Content */}
                 <div className="flex-1 text-center md:text-left">
                    <div className="text-[10px] font-medium uppercase tracking-widest text-secondary mb-2">{e.type}</div>
                    <h3 className={`serif text-2xl font-medium text-[#3E3A36] mb-3 group-hover:text-${e.color} transition-colors`}>{e.title}</h3>
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-[#3E3A36]/60">
                       <span className="flex items-center gap-1.5"><Calendar size={14} /> {e.time}</span>
                       <span className="hidden sm:block text-soft">|</span>
                       <span className="flex items-center gap-1.5"><MapPin size={14} /> {e.loc}</span>
                    </div>
                 </div>

                 {/* Action */}
                 <div className="flex-shrink-0 mt-4 md:mt-0">
                    <div className={`w-12 h-12 rounded-full border border-soft flex items-center justify-center text-[#3E3A36] group-hover:bg-${e.color} group-hover:text-white group-hover:border-${e.color} transition-all duration-500`}>
                       <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>

               </a>
            </FadeInUp>
          ))}
        </div>

      </div>
    </section>
  );
}
