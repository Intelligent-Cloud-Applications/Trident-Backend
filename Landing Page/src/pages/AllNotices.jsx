/**
 * All Notices Page — /notice
 * 
 * Premium full-page notice board with search, category filters,
 * animations, and a beautiful card-based layout.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Pin, ArrowLeft, Search, Download, ChevronRight, X, Calendar, Filter, Bell, Sparkles,
  GraduationCap, Briefcase, PartyPopper, ScrollText, Building2, ClipboardCheck,
  UserPlus, Lightbulb, FlaskConical, Wrench, Megaphone,
} from "lucide-react";
import { getNotices } from "../services/tridentService";
import { dummyNotices, catColors } from "../components/NoticeBoard";

/* ─── Category icons & gradients ─── */
const catIcons = {
  Academic: GraduationCap,
  Placement: Briefcase,
  Event: PartyPopper,
  General: ScrollText,
  Administration: Building2,
  Examination: ClipboardCheck,
  Admissions: UserPlus,
  Innovation: Lightbulb,
  Research: FlaskConical,
  Workshop: Wrench,
};

const catGradients = {
  Academic: 'linear-gradient(135deg, #2C3A8C, #4F5FD5)',
  Placement: 'linear-gradient(135deg, #006738, #10B981)',
  Event: 'linear-gradient(135deg, #C41E3A, #F97316)',
  General: 'linear-gradient(135deg, #A59381, #C4A882)',
  Administration: 'linear-gradient(135deg, #B8860B, #E8BD63)',
  Examination: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
  Admissions: 'linear-gradient(135deg, #0891B2, #22D3EE)',
  Innovation: 'linear-gradient(135deg, #EA580C, #FBBF24)',
  Research: 'linear-gradient(135deg, #4338CA, #818CF8)',
  Workshop: 'linear-gradient(135deg, #059669, #34D399)',
};

/* ─── Notice Card (premium version for /notice page) ─── */
function NoticeCard({ notice, index }) {
  const hasFile = notice.fileUrl;
  const hasLink = notice.linkUrl;
  const isClickable = hasFile || hasLink;
  const dateParts = notice.date?.split(' ') || [];
  const color = catColors[notice.category] || '#A59381';

  const handleClick = () => {
    if (hasFile) {
      const a = document.createElement('a');
      a.href = notice.fileUrl;
      a.download = notice.title.replace(/[^a-zA-Z0-9 ]/g, '') + '.pdf';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else if (hasLink) {
      window.open(notice.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      className={`group relative rounded-2xl bg-white border border-gray-100/80 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? handleClick : undefined}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }} />

      <div className="p-6">
        <div className="flex items-start gap-5">
          {/* Category Icon — vibrant gradient */}
          {(() => {
            const CatIcon = catIcons[notice.category] || Megaphone;
            const gradient = catGradients[notice.category] || 'linear-gradient(135deg, #A59381, #C4A882)';
            return (
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: gradient, boxShadow: `0 8px 20px ${color}30` }}>
                <CatIcon size={22} className="text-white" strokeWidth={2} />
              </div>
            );
          })()}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Tags row */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider"
                style={{ background: `${color}12`, color }}
              >
                {notice.category}
              </span>
              {notice.isNew && (
                <span className="new-badge text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider text-white flex items-center gap-1"
                  style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', boxShadow: '0 0 8px rgba(239,68,68,0.4)' }}>
                  <Sparkles size={9} /> New
                </span>
              )}
              {hasFile && (
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-emerald-500/10 text-emerald-600 flex items-center gap-1">
                  <Download size={8} /> PDF
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-[#3E3A36] leading-snug mb-1.5 group-hover:text-[#2C3A8C] transition-colors duration-300">
              {notice.title}
            </h3>

            {/* Description */}
            {notice.desc && (
              <p className="text-[13px] text-[#3E3A36]/45 font-medium leading-relaxed line-clamp-2">
                {notice.desc}
              </p>
            )}

            {/* Date line */}
            <div className="flex items-center gap-2 mt-3">
              <Calendar size={11} className="text-[#3E3A36]/25" />
              <span className="text-[11px] text-[#3E3A36]/30 font-medium">{notice.date}</span>
              {isClickable && (
                <span className="text-[11px] text-[#2C3A8C]/50 font-medium ml-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {hasFile ? 'Download' : 'Open'} <ChevronRight size={10} />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
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

export default function AllNotices() {
  const [apiNotices, setApiNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const searchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNotices()
      .then(notices => {
        if (!cancelled) {
          const mapped = notices.map(n => ({
            id: n.id,
            date: n.date,
            title: n.title,
            category: n.category,
            desc: n.description || '',
            fileUrl: n.fileUrl || '',
            linkUrl: n.linkUrl || '',
            isNew: n.isNew ?? true,
          }));
          setApiNotices(mapped);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const allNotices = [...apiNotices, ...dummyNotices];
  const categories = ['All', ...new Set(allNotices.map(n => n.category).filter(Boolean))];

  const filtered = allNotices.filter(notice => {
    const matchesCategory = activeCategory === 'All' || notice.category === activeCategory;
    const matchesSearch = !searchQuery ||
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.desc?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const downloadableCount = allNotices.filter(n => n.fileUrl).length;
  const newCount = allNotices.filter(n => n.isNew).length;

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
                <Pin size={28} className="text-[#E8BD63] -rotate-45" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white serif leading-tight tracking-tight">
                  Notice <span className="italic text-[#E8BD63]">Board</span>
                </h1>
                <p className="text-white/40 text-sm font-medium mt-2 max-w-md">
                  Stay informed with the latest official notices, academic updates, and important announcements from Trident Academy of Technology.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 flex-wrap">
              <StatCard icon={Bell} label="Total Notices" value={allNotices.length} color="#2C3A8C" />
              {downloadableCount > 0 && <StatCard icon={Download} label="Downloads" value={downloadableCount} color="#059669" />}
              {newCount > 0 && <StatCard icon={Sparkles} label="New" value={newCount} color="#DC2626" />}
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
                placeholder="Search notices by title or description..."
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
                const isActive = activeCategory === cat;
                const catColor = cat === 'All' ? '#2C3A8C' : (catColors[cat] || '#A59381');
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
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
            {activeCategory !== 'All' && <> in <span className="text-[#2C3A8C]">{activeCategory}</span></>}
          </p>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100/80 p-6 animate-pulse">
                <div className="flex gap-5">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl" />
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-100 rounded-lg w-20" />
                    <div className="h-5 bg-gray-100 rounded-lg w-3/4" />
                    <div className="h-3 bg-gray-100 rounded-lg w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Notices grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((notice, idx) => (
              <NoticeCard key={notice.id || idx} notice={notice} index={idx} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-[#2C3A8C]/5 flex items-center justify-center mx-auto mb-5">
              <Pin size={32} className="text-[#2C3A8C]/20 -rotate-45" />
            </div>
            <h3 className="text-lg font-semibold text-[#3E3A36]/60 mb-2">No notices found</h3>
            <p className="text-[#3E3A36]/30 text-sm font-medium max-w-sm mx-auto">
              {searchQuery
                ? `We couldn't find any notices matching "${searchQuery}". Try a different search term.`
                : 'No notices are available in this category yet.'}
            </p>
            {(searchQuery || activeCategory !== 'All') && (
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
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
            Trident Academy of Technology • Official Notice Board • TRID2373
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
