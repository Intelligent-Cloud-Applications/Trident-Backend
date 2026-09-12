/**
 * All News Page — /news
 * 
 * Premium full-page news archive with search, category filters,
 * animations, and a beautiful card-based layout.
 * News is managed via the Admin Dashboard.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Search, X, Filter, Sparkles, Newspaper, Calendar, ArrowUpRight,
} from "lucide-react";
import { getNews } from "../services/tridentService";
import { NEWS } from "../data/constants";

/* ───── image imports (for hardcoded fallback NEWS) ───── */
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

/* ─── Slug helper ─── */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

const CAT_COLORS = {
  Accreditation: '#2C3A8C',
  Placement:     '#1B5E20',
  Achievement:   '#E65100',
  Innovation:    '#6A1B9A',
  Event:         '#C41E3A',
  Research:      '#01579B',
};

const CAT_GRADIENTS = {
  Accreditation: 'linear-gradient(135deg, #2C3A8C, #4F5FD5)',
  Placement:     'linear-gradient(135deg, #1B5E20, #10B981)',
  Achievement:   'linear-gradient(135deg, #E65100, #F97316)',
  Innovation:    'linear-gradient(135deg, #6A1B9A, #A78BFA)',
  Event:         'linear-gradient(135deg, #C41E3A, #F97316)',
  Research:      'linear-gradient(135deg, #01579B, #818CF8)',
};

/* ─── News Card ─── */
function NewsCard({ item, index }) {
  const color = CAT_COLORS[item.cat] || '#A59381';
  const gradient = CAT_GRADIENTS[item.cat] || 'linear-gradient(135deg, #A59381, #C4A882)';
  const imgSrc = item.imageUrl || IMG_MAP[item.img] || '';

  return (
    <Link
      to={`/news/${item.id}`}
      state={{ newsItem: item }}
      className="group relative rounded-2xl bg-white border border-gray-100/80 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 block cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Image */}
      {imgSrc && (
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={imgSrc}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
          
          {/* Category badge on image */}
          <span
            className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-white/90 backdrop-blur-md shadow-sm"
            style={{ color }}
          >
            {item.cat}
          </span>

          {/* Featured badge */}
          {item.featured && (
            <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded text-white flex items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', boxShadow: '0 2px 8px rgba(232,189,99,0.4)' }}>
              <Sparkles size={9} /> Featured
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Tags row — shown only when no image */}
        {!imgSrc && (
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider"
              style={{ background: `${color}12`, color }}
            >
              {item.cat}
            </span>
            {item.featured && (
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider text-white flex items-center gap-1"
                style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)' }}>
                <Sparkles size={9} /> Featured
              </span>
            )}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center gap-1.5 mb-2">
          <Calendar size={11} className="text-[#3E3A36]/25" />
          <span className="text-[11px] text-[#3E3A36]/30 font-medium">{item.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-[#3E3A36] leading-snug mb-2 group-hover:text-[#2C3A8C] transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description */}
        {item.desc && (
          <p className="text-[13px] text-[#3E3A36]/45 font-medium leading-relaxed line-clamp-3">
            {item.desc}
          </p>
        )}

        {/* Read more indicator */}
        <span className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium text-[#2C3A8C] group-hover:text-[#E8BD63] transition-colors">
          Read More <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  );
}

/* ─── Stats Card ─── */
function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/70 backdrop-blur border border-gray-100/50">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${color}12` }}>
        <Icon size={16} style={{ color }} />
      </div>
      <div>
        <div className="text-lg font-bold text-[#3E3A36]">{value}</div>
        <div className="text-[10px] font-medium uppercase tracking-wider text-[#3E3A36]/30">{label}</div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════ */

export default function AllNews() {
  const [apiNews, setApiNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const searchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNews()
      .then(news => {
        if (!cancelled) {
          const mapped = news.map(n => ({
            id: slugify(n.title),
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
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Merge: API news first (sorted by date, newest first), then hardcoded fallback
  const allNews = [...apiNews, ...NEWS.map((n, i) => ({
    id: slugify(n.title),
    date: n.date,
    cat: n.cat,
    title: n.title,
    desc: n.desc,
    featured: n.featured || false,
    imageUrl: '',
    img: n.img || '',
    linkUrl: '',
  }))];

  const categories = ['All', ...new Set(allNews.map(n => n.cat).filter(Boolean))];

  const filtered = allNews.filter(item => {
    const matchesCat = activeCat === 'All' || item.cat === activeCat;
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cat?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const featuredCount = allNews.filter(n => n.featured).length;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ─── Hero Header ─── */}
      <div className="relative overflow-hidden pt-[80px]"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1A2660 40%, #2C3A8C 100%)' }}>

        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-[#E8BD63]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-[#2C3A8C]/30 rounded-full blur-[80px]" />
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative z-10">
          {/* Back link */}
          <Link to="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm font-medium mb-8 transition-all duration-300 hover:gap-3 group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            {/* Title */}
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg shadow-black/10">
                <Newspaper size={28} className="text-[#E8BD63]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white serif leading-tight tracking-tight">
                  News <span className="italic text-[#E8BD63]">Archive</span>
                </h1>
                <p className="text-white/40 text-sm font-medium mt-2 max-w-md">
                  Stay updated with achievements, institutional updates, placements, and research initiatives at Trident Academy of Technology.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 flex-wrap">
              <StatCard icon={Newspaper} label="Total News" value={allNews.length} color="#2C3A8C" />
              {featuredCount > 0 && <StatCard icon={Sparkles} label="Featured" value={featuredCount} color="#E8BD63" />}
            </div>
          </div>
        </div>

        {/* Curved bottom edge */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-[40px]">
            <path d="M0,0 C300,60 900,60 1200,0 L1200,60 L0,60 Z" fill="#FAFAF8" />
          </svg>
        </div>
      </div>

      {/* ─── Search & Filters ─── */}
      <div className="max-w-7xl mx-auto px-6 -mt-4 relative z-20">
        <div className="bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border border-gray-100/80 p-4 md:p-5">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3E3A36]/25" />
              <input
                ref={searchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news by title, description, or category..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200/60 text-sm text-[#3E3A36] placeholder-[#3E3A36]/25 font-medium outline-none focus:ring-2 focus:ring-[#2C3A8C]/15 focus:border-[#2C3A8C]/25 transition-all"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3E3A36]/20 hover:text-[#3E3A36]/50 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={13} className="text-[#3E3A36]/25 hidden md:block" />
              {categories.map(cat => {
                const isActive = activeCat === cat;
                const catColor = cat === 'All' ? '#2C3A8C' : (CAT_COLORS[cat] || '#A59381');
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'text-white shadow-md scale-[1.02]'
                        : 'bg-[#FAFAF8] text-[#3E3A36]/40 hover:text-[#3E3A36]/70 border border-gray-200/60 hover:border-gray-300'
                    }`}
                    style={isActive ? { background: catColor, boxShadow: `0 4px 12px ${catColor}30` } : {}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Results ─── */}
      <div className="max-w-7xl mx-auto px-6 py-8 md:py-10">
        {/* Result count */}
        {searchQuery && (
          <p className="text-[#3E3A36]/30 text-sm font-medium mb-6">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for "<span className="text-[#2C3A8C]">{searchQuery}</span>"
            {activeCat !== 'All' && <> in <span className="text-[#2C3A8C]">{activeCat}</span></>}
          </p>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100/80 overflow-hidden animate-pulse">
                <div className="w-full h-52 bg-gray-100" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-100 rounded-lg w-20" />
                  <div className="h-5 bg-gray-100 rounded-lg w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-lg w-full" />
                  <div className="h-3 bg-gray-100 rounded-lg w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* News grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <NewsCard key={item.id || idx} item={item} index={idx} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-[#2C3A8C]/5 flex items-center justify-center mx-auto mb-5">
              <Newspaper size={32} className="text-[#2C3A8C]/20" />
            </div>
            <h3 className="text-lg font-semibold text-[#3E3A36]/60 mb-2">No news found</h3>
            <p className="text-[#3E3A36]/30 text-sm font-medium max-w-sm mx-auto">
              {searchQuery
                ? `We couldn't find any news matching "${searchQuery}". Try a different search term.`
                : 'No news articles are available in this category yet.'}
            </p>
            {(searchQuery || activeCat !== 'All') && (
              <button
                onClick={() => { setSearchQuery(''); setActiveCat('All'); }}
                className="mt-4 px-5 py-2.5 rounded-xl text-sm font-medium text-[#2C3A8C] bg-[#2C3A8C]/5 hover:bg-[#2C3A8C]/10 transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ─── Footer ─── */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="text-center pt-8" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
          <p className="text-[#3E3A36]/15 text-[11px] font-medium">
            Trident Academy of Technology • News Archive
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .grid > div {
          animation: fadeInUp 0.5s ease both;
        }
      `}</style>
    </div>
  );
}
