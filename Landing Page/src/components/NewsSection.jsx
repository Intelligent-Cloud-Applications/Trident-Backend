import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NEWS } from "../data/constants";
import { ArrowRight, Newspaper } from "lucide-react";
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
  Academics:     { color: "#2C3A8C", bg: "rgba(44, 58, 140, 0.08)" },
  General:       { color: "#6B7280", bg: "rgba(107, 114, 128, 0.08)" },
  Admission:     { color: "#0891B2", bg: "rgba(8, 145, 178, 0.08)" },
};

/* ─── Slug helper ─── */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function getNewsId(item) {
  return item.id || slugify(item.title);
}

export default function NewsSection() {
  const [apiNews, setApiNews] = useState([]);

  useEffect(() => {
    let cancelled = false;
    getNews()
      .then(news => {
        if (!cancelled) {
          const mapped = news.map(n => ({
            id: n.id,
            date: n.date,
            cat: n.category || 'General',
            title: n.title,
            desc: n.description || '',
            featured: n.featured || false,
            coverImage: n.coverImage || '',
            imageUrl: n.imageUrl || '',
            img: n.img || '',
            images: n.images || [],
            pdfs: n.pdfs || [],
            linkUrl: n.linkUrl || '',
          }));
          setApiNews(mapped);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const allNews = apiNews.length > 0 ? apiNews : NEWS.map(n => ({ ...n, cat: n.cat }));
  const featured = allNews.find((n) => n.featured) || allNews[0];
  const filtered = allNews.filter((n) => n !== featured).slice(0, 3);

  const getImgSrc = (item) => item.coverImage || item.imageUrl || IMG_MAP[item.img] || '';

  return (
    <section className="relative z-10 bg-[#F4F7F9] py-24 md:py-32 overflow-hidden" id="news-events">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* ═══ HEADER ═══ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <span className="block text-[11px] font-bold uppercase tracking-[0.3em] text-[#E8BD63] mb-3">
              THE TAT JOURNAL & REVIEWS
            </span>
            <h2 className="serif text-5xl md:text-6xl font-bold text-[#3E3A36] leading-[1.05] tracking-tight">
              News & <span className="italic font-light text-[#2C3A8C] font-serif">Updates.</span>
            </h2>
            <p className="text-[#3E3A36]/60 text-base font-medium mt-3 max-w-lg">
              Stay updated with achievements, institutional updates, and research initiatives from Trident Academy of Technology.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col items-end gap-3 shrink-0"
          >
            {/* Decorative script text */}
            <span className="hidden md:block italic text-[#3E3A36]/20 text-lg font-serif tracking-wide">Learn. Innovate. Grow.</span>
            <Link 
              to="/news"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group bg-[#2C3A8C] text-white"
            >
              <span>View All News</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* ═══ FEATURED NEWS ═══ */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)] mb-20"
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Side */}
              <div className="md:w-[48%] relative min-h-[320px] md:min-h-[420px]">
                <img 
                  src={getImgSrc(featured)} 
                  alt={featured.title}
                  className="w-full h-full object-cover absolute inset-0"
                />
                {/* Date Stamp */}
                <div className="absolute top-5 left-5 bg-[#E8BD63] text-[#1A2660] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg z-10">
                  {featured.date}
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-[52%] p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8BD63] bg-[#E8BD63]/10 px-3 py-1 rounded-full">⭐ Featured</span>
                  <span 
                    className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                    style={{ 
                      color: CAT_CONFIG[featured.cat]?.color || '#2C3A8C',
                      backgroundColor: CAT_CONFIG[featured.cat]?.bg || 'rgba(44,58,140,0.08)'
                    }}
                  >
                    {featured.cat}
                  </span>
                </div>
                
                <h3 className="serif text-2xl md:text-3xl font-bold text-[#3E3A36] leading-[1.15] mb-4">
                  {featured.title}
                </h3>
                
                <p className="text-[#3E3A36]/60 text-sm md:text-base font-medium leading-relaxed mb-6">
                  {featured.desc}
                </p>

                {/* Read More Button */}
                <Link
                  to={`/news/${getNewsId(featured)}`}
                  state={{ newsItem: featured }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-[0.1em] w-max transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg group border-2 border-[#2C3A8C] text-[#2C3A8C] hover:bg-[#2C3A8C] hover:text-white"
                >
                  <span>Read More</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ LATEST UPDATES ═══ */}
        {filtered.length > 0 && (
          <div>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <h3 className="serif text-2xl md:text-3xl font-bold text-[#3E3A36]">Latest Updates</h3>
                <div className="hidden md:block w-24 h-px bg-[#3E3A36]/15" />
              </div>
              <Link 
                to="/news"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#2C3A8C] hover:text-[#1A2660] transition-colors group"
              >
                <span>View All News</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.title + i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 group h-full flex flex-col">
                    {/* Image — flush edge-to-edge, no frame */}
                    <div className="relative h-52 w-full overflow-hidden">
                      <img 
                        src={getImgSrc(item)} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] block rounded-none" 
                      />
                      
                      {/* Category Badge — top right */}
                      <span 
                        className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md shadow-sm"
                        style={{ color: CAT_CONFIG[item.cat]?.color || '#2C3A8C' }}
                      >
                        {item.cat}
                      </span>
                      {/* Media badges */}
                      {(item.images?.length > 0 || item.pdfs?.length > 0) && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                          {item.images?.length > 0 && <span className="text-[9px] font-bold bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-blue-600">📸 {item.images.length}</span>}
                          {item.pdfs?.length > 0 && <span className="text-[9px] font-bold bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-amber-600">📄 {item.pdfs.length}</span>}
                        </div>
                      )}
                    </div>

                    {/* Text Body */}
                    <div className="flex flex-col flex-1 p-5 pt-4">
                      {/* Date — below image */}
                      <span className="text-[11px] font-medium text-[#3E3A36]/40 uppercase tracking-wider mb-2">
                        {item.date}
                      </span>

                      <h3 className="serif text-lg font-bold text-[#3E3A36] leading-snug mb-2 group-hover:text-[#2C3A8C] transition-colors duration-300 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-[#3E3A36]/55 text-sm font-medium leading-relaxed line-clamp-3 flex-1 mb-4">
                        {item.desc}
                      </p>

                      {/* Read More link — underlined */}
                      <Link 
                        to={`/news/${getNewsId(item)}`}
                        state={{ newsItem: item }}
                        className="inline-flex items-center gap-1.5 text-[#2C3A8C] text-sm font-semibold w-max border-b border-[#2C3A8C]/30 hover:border-[#2C3A8C] pb-0.5 transition-colors group/link"
                      >
                        <span>Read More</span>
                        <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
