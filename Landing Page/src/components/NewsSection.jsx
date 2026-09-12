import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NEWS, EVENTS } from "../data/constants";
import { ArrowRight, Calendar, ArrowUpRight, MapPin, Sparkles, Newspaper } from "lucide-react";
import { getEvents } from "../services/tridentService";
import { getNews } from "../services/tridentService";
import { Link } from "react-router-dom";

/* ───── image imports ───── */
import imgNba from "../assets/news_nba.png";
import imgPlacement from "../assets/news_placement.png";
import imgHackathon from "../assets/news_hackathon.png";
import imgInnovation from "../assets/news_innovation_lab.png";
import imgTrifest from "../assets/news_trifest.png";
import imgConvocation from "../assets/news_convocation.png";

const IMG_MAP = {
  news_nba: imgNba,
  news_placement: imgPlacement,
  news_hackathon: imgHackathon,
  news_innovation_lab: imgInnovation,
  news_trifest: imgTrifest,
  news_convocation: imgConvocation,
};

const CAT_CONFIG = {
  Accreditation: { color: "#2C3A8C", bg: "rgba(44, 58, 140, 0.08)" },
  Placement:     { color: "#1B5E20", bg: "rgba(27, 94, 32, 0.08)" },
  Achievement:   { color: "#E65100", bg: "rgba(230, 81, 0, 0.08)" },
  Innovation:    { color: "#6A1B9A", bg: "rgba(106, 27, 154, 0.08)" },
  Event:         { color: "#C41E3A", bg: "rgba(196, 30, 58, 0.08)" },
  Research:      { color: "#01579B", bg: "rgba(1, 87, 155, 0.08)" },
};

export default function NewsSection() {
  const [apiEvents, setApiEvents] = useState([]);
  const [apiNews, setApiNews] = useState([]);

  // Fetch admin-created events from DynamoDB via API
  useEffect(() => {
    let cancelled = false;
    getEvents()
      .then(events => {
        if (!cancelled) {
          const mapped = events.map(ev => ({
            date: ev.date,
            month: ev.month || ev.date?.split(' ')[0],
            day: ev.day || ev.date?.split(' ')[1],
            title: ev.title,
            venue: ev.venue,
            type: ev.type,
          }));
          setApiEvents(mapped);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Fetch admin-created news from DynamoDB via API
  useEffect(() => {
    let cancelled = false;
    getNews()
      .then(news => {
        if (!cancelled) {
          const mapped = news.map(n => ({
            date: n.date,
            cat: n.category || 'General',
            title: n.title,
            desc: n.description || '',
            featured: n.featured || false,
            imageUrl: n.imageUrl || '',
            img: n.img || '',
            linkUrl: n.linkUrl || '',
          }));
          setApiNews(mapped);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Merge: API events first, then hardcoded events
  const allEvents = [...apiEvents, ...EVENTS];

  // Merge: API news first (sorted by date, newest first), then hardcoded NEWS as fallback
  const allNews = apiNews.length > 0 ? [...apiNews, ...NEWS] : NEWS;
  const featured = allNews.find((n) => n.featured) || allNews[0];
  const filtered = allNews.filter((n) => n !== featured).slice(0, 2);

  // Helper to resolve image source — supports both uploaded URLs and legacy IMG_MAP keys
  const getImgSrc = (item) => item.imageUrl || IMG_MAP[item.img] || '';

  return (
    <section className="relative z-10 bg-[#F5EEEC] py-24 md:py-32 overflow-hidden" id="news-events">
      {/* Editorial Watermark Behind */}
      <div className="absolute top-10 left-10 text-[120px] font-bold text-[#3E3A36]/[0.02] select-none pointer-events-none serif leading-none uppercase">
        Chronicle
      </div>

      {/* Dark background panel for right column — contained within section */}
      <div className="hidden lg:block absolute top-0 right-0 w-[35%] h-[calc(100%-40px)] bg-[#1A2660] z-0 rounded-tl-[40px] rounded-bl-[40px] shadow-2xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Grid Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-20 items-stretch">
          
          {/* ── LEFT COLUMN: The News Chronicle (65%) ── */}
          <div className="lg:col-span-8 pr-0 lg:pr-6">
            
            {/* Header Section */}
            <div className="border-b border-[#3E3A36]/15 pb-8 mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8BD63] mb-4">
                  THE TAT JOURNAL & REVIEWS
                </span>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h2 className="serif text-5xl md:text-7xl font-bold text-[#3E3A36] leading-[1.05] tracking-tight">
                      News & <span className="italic font-light text-[#2C3A8C] font-serif">Events.</span>
                    </h2>
                    <p className="text-[#3E3A36]/60 text-base md:text-lg font-medium mt-4 max-w-xl">
                      Stay updated with achievements, institutional updates, and research initiatives.
                    </p>
                  </div>
                  <Link 
                    to="/news"
                    className="shrink-0 inline-flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group border border-[#2C3A8C]/20 hover:border-[#2C3A8C]/40 bg-white/80 backdrop-blur-sm text-[#2C3A8C]"
                  >
                    <Newspaper size={16} />
                    <span>View All News</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* News Feed Stream */}
            <div className="space-y-16">
              
              {/* Featured Cover block */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                    <Link 
                      to="/news" 
                      className="group block relative"
                    >
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
                      {/* Image Frame with Art Offset Border */}
                      <div className="md:w-1/2 relative min-h-[260px] md:min-h-auto">
                        {/* Offset Golden Wireframe */}
                        <div className="absolute inset-0 border border-[#E8BD63]/50 rounded-xl translate-x-3 translate-y-3 group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-500 z-0" />
                        
                        {/* Image box */}
                        <div className="relative w-full h-full min-h-[260px] overflow-hidden rounded-xl z-10 aspect-[4/3] md:aspect-auto">
                          <img 
                            src={getImgSrc(featured)} 
                            alt={featured.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                          />
                          {/* Color tint */}
                          <div className="absolute inset-0 bg-[#2C3A8C]/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        </div>
                        
                        {/* Date Stamp */}
                        <div className="absolute -top-3 -left-3 bg-[#E8BD63] text-[#1A2660] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded shadow-lg z-20">
                          {featured.date}
                        </div>
                      </div>

                      {/* Content text */}
                      <div className="md:w-1/2 flex flex-col justify-center py-2 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8BD63] bg-[#E8BD63]/10 px-2 py-1 rounded">⭐ Featured</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3E3A36]/30" />
                          <span 
                            className="text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded"
                            style={{ 
                              color: CAT_CONFIG[featured.cat]?.color || '#2C3A8C',
                              backgroundColor: CAT_CONFIG[featured.cat]?.bg || 'rgba(44,58,140,0.05)'
                            }}
                          >
                            {featured.cat}
                          </span>
                        </div>
                        
                        <h3 className="serif text-3xl lg:text-4xl font-medium text-[#3E3A36] leading-[1.1] mb-5 group-hover:text-[#2C3A8C] transition-colors duration-300">
                          {featured.title}
                        </h3>
                        
                        <p className="text-[#3E3A36]/70 text-lg lg:text-xl font-medium leading-relaxed mb-6">
                          {featured.desc}
                        </p>
                      </div>
                    </div>
                    </Link>
                </motion.div>
              )}

              {/* Journal 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#3E3A36]/15 mt-10 pt-10">
                {filtered.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  >
                    <Link 
                      to="/news" 
                      className="group relative flex flex-col transition-all duration-500 h-full"
                    >
                      {/* Image */}
                      <div className="relative w-full h-56 overflow-hidden rounded-xl">
                        <img 
                          src={getImgSrc(item)} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
                        />
                        <div className="absolute inset-0 bg-black/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                        
                        {/* Category Badge */}
                        <span 
                          className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-white/90 backdrop-blur-md shadow-sm"
                          style={{ 
                            color: CAT_CONFIG[item.cat]?.color || '#2C3A8C',
                          }}
                        >
                          {item.cat}
                        </span>
                      </div>

                      {/* Text Body */}
                      <div className="flex flex-col flex-1 py-5">
                        <span className="text-[10px] font-medium text-[#3E3A36]/40 uppercase tracking-widest mb-2">
                          {item.date}
                        </span>
                        
                        <h3 className="serif text-lg font-medium text-[#3E3A36] leading-snug mb-2 group-hover:text-[#2C3A8C] transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h3>
                        
                        <p className="text-[#3E3A36]/55 text-base font-medium leading-relaxed line-clamp-4 flex-1">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>

          {/* ── RIGHT COLUMN: The Events Agenda (35%) ── */}
          <div className="lg:col-span-4 relative text-white lg:text-white flex flex-col justify-between">
            {/* Dark background panel for mobile only (rendered inside layout stream) */}
            <div className="lg:hidden absolute inset-0 -mx-6 bg-[#1A2660] -z-10 py-16 px-6 animate-none" style={{ height: "calc(100% + 48px)", transform: "translateY(-24px)" }} />
            
            <div className="relative z-10 pt-4 lg:pt-0 pl-0 lg:pl-10">
              
              {/* Events Title */}
              <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/10 lg:border-white/10">
                <Sparkles size={22} className="text-[#E8BD63] animate-pulse" />
                <h3 className="serif text-3xl font-medium text-white">
                  Upcoming <span className="italic font-light text-[#E8BD63] font-serif">Agenda.</span>
                </h3>
              </div>

              {/* Auto-scrolling Events Container */}
              <style>{`
                @keyframes vertical-marquee {
                  0% { transform: translateY(0); }
                  100% { transform: translateY(-50%); }
                }
                .animate-vertical-marquee {
                  animation: vertical-marquee 25s linear infinite;
                }
                .animate-vertical-marquee:hover {
                  animation-play-state: paused;
                }
              `}</style>
              
              <div className="relative max-h-[500px] overflow-hidden pr-2">
                {/* Fade masks for top/bottom edges to blend with the background */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#1A2660] lg:from-[#1A2660] to-transparent z-20 pointer-events-none hidden lg:block" />
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#1A2660] lg:from-[#1A2660] to-transparent z-20 pointer-events-none hidden lg:block" />
                
                <div className="flex flex-col animate-vertical-marquee">
                  {[...allEvents, ...allEvents].map((ev, i) => (
                    <div
                      key={i}
                      className="pb-2"
                    >
                      <a 
                        href="https://tat.ac.in/events/" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group relative flex flex-col md:flex-row items-start md:items-center py-5 border-b border-white/10 hover:border-white/30 transition-all duration-500 w-full min-w-0"
                      >
                        {/* Date Block */}
                        <div className="w-24 flex-shrink-0 flex flex-col items-start justify-center text-[#E8BD63] pb-3 md:pb-0 md:pr-4 font-medium select-none">
                          <span className="text-[10px] uppercase tracking-widest opacity-80">{ev.month}</span>
                          <span className="serif text-3xl font-bold leading-none">{ev.day}</span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-col justify-between min-w-0 pr-4">
                          <div className="min-w-0">
                            <span className="inline-block text-[9px] uppercase tracking-widest border border-[#E8BD63]/40 text-[#E8BD63] px-2 py-0.5 rounded-full mb-2 font-medium">
                              {ev.type}
                            </span>
                            <h4 className="serif text-base font-medium text-white leading-snug group-hover:text-[#E8BD63] transition-colors duration-300 line-clamp-2 min-w-0">
                              {ev.title}
                            </h4>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/50">
                            <MapPin size={12} className="text-[#E8BD63] flex-shrink-0" />
                            <span className="truncate max-w-[150px]">{ev.venue || ev.loc}</span>
                          </div>
                        </div>

                        {/* Arrow Right */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 group-hover:text-[#E8BD63] transition-all duration-300">
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Full Calendar CTA */}
              <div className="mt-12 pt-6 border-t border-white/10 flex flex-col gap-3">
                <a 
                  href="/events"
                  className="flex items-center justify-center gap-3 w-full px-8 py-5 rounded-2xl text-sm font-medium uppercase tracking-[0.15em] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_30px_-8px_rgba(232,189,99,0.4)] group"
                  style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', color: '#1A2660' }}
                >
                  <Calendar size={18} />
                  <span>View All Events</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>

              </div>

              {/* Admissions Apply Now Block - Minimalist List Item */}
              <div className="mt-8 border-t border-white/10 pt-6 group transition-colors duration-500">
                
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8BD63] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E8BD63]"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#E8BD63]">Admissions 2026</span>
                  </div>
                  
                  <h4 className="font-serif text-2xl font-medium text-white mb-2 leading-tight">
                    Your Future Starts Here.
                  </h4>
                  <p className="text-white/60 text-sm font-medium mb-6 leading-relaxed pr-2">
                    Applications are now open for all undergraduate and postgraduate programs.
                  </p>
                  
                  <a 
                    href="https://tat.ac.in/admissions/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-4 text-[#E8BD63] font-medium text-sm group/btn w-max transition-colors"
                  >
                    <span className="uppercase tracking-widest text-[11px] border-b border-[#E8BD63]/30 pb-1 group-hover/btn:border-[#E8BD63] transition-colors">Begin Application</span>
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
