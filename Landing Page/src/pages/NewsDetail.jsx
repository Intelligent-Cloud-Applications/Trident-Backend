/**
 * News Detail Page — /news/:id
 *
 * Clean editorial layout: heading + two-column (image | content).
 * Data is passed via router state for instant load, with API fallback.
 */

import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft, Calendar, Sparkles, Newspaper, ArrowUpRight, Tag,
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
  Admission:     '#0D7377',
  General:       '#A59381',
};

/* ─── Related News Card ─── */
function RelatedCard({ item }) {
  const imgSrc = item.imageUrl || IMG_MAP[item.img] || '';
  const color = CAT_COLORS[item.cat] || '#A59381';

  return (
    <Link
      to={`/news/${item.id}`}
      state={{ newsItem: item }}
      className="group block rounded-2xl bg-white border border-gray-100/80 overflow-hidden transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1"
    >
      {imgSrc && (
        <div className="relative w-full h-40 overflow-hidden">
          <img src={imgSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors pointer-events-none" />
        </div>
      )}
      <div className="p-4">
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md inline-block mb-2"
          style={{ background: `${color}12`, color }}
        >
          {item.cat}
        </span>
        <h4 className="text-sm font-semibold text-[#3E3A36] leading-snug group-hover:text-[#2C3A8C] transition-colors line-clamp-2">
          {item.title}
        </h4>
        <p className="text-[11px] text-[#3E3A36]/30 font-medium mt-1.5">{item.date}</p>
      </div>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════
   Main Page
   ═══════════════════════════════════════════════════════════ */

export default function NewsDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [newsItem, setNewsItem] = useState(location.state?.newsItem || null);
  const [allNews, setAllNews] = useState([]);
  const [loading, setLoading] = useState(!newsItem);

  useEffect(() => {
    let cancelled = false;

    getNews()
      .then(news => {
        if (cancelled) return;
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

        // Merge with hardcoded
        const hardcoded = NEWS.map((n, i) => ({
          id: slugify(n.title),
          date: n.date,
          cat: n.cat,
          title: n.title,
          desc: n.desc,
          featured: n.featured || false,
          imageUrl: '',
          img: n.img || '',
          linkUrl: '',
        }));

        const merged = [...mapped, ...hardcoded];
        setAllNews(merged);

        // If we don't have the item from router state, find it
        if (!newsItem) {
          const found = merged.find(n => n.id === id);
          setNewsItem(found || null);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  const imgSrc = newsItem ? (newsItem.imageUrl || IMG_MAP[newsItem.img] || '') : '';
  const color = newsItem ? (CAT_COLORS[newsItem.cat] || '#A59381') : '#A59381';

  // Related news: same category, excluding current
  const related = allNews
    .filter(n => n.id !== id && n.cat === newsItem?.cat)
    .slice(0, 3);

  // If no same-category, show latest
  const relatedToShow = related.length > 0
    ? related
    : allNews.filter(n => n.id !== id).slice(0, 3);

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-[100px]">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-gray-100 rounded w-32" />
            <div className="h-10 bg-gray-100 rounded w-3/4" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="h-[400px] bg-gray-100 rounded-2xl" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-100 rounded w-24" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── Not Found ─── */
  if (!newsItem) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-[100px]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#2C3A8C]/5 flex items-center justify-center mx-auto mb-5">
            <Newspaper size={32} className="text-[#2C3A8C]/20" />
          </div>
          <h2 className="text-2xl font-bold text-[#3E3A36] mb-2">News Not Found</h2>
          <p className="text-[#3E3A36]/40 text-sm font-medium mb-6">
            The news article you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#2C3A8C] hover:bg-[#1A2660] transition-colors"
          >
            <ArrowLeft size={14} /> Back to News
          </Link>
        </div>
      </div>
    );
  }

  /* ─── Main Render ─── */
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="max-w-6xl mx-auto px-6 pt-[110px] pb-16">

        {/* ── Back Navigation ── */}
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-[#3E3A36]/35 hover:text-[#2C3A8C] text-sm font-medium mb-8 transition-all duration-300 hover:gap-3 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to News Archive
        </Link>

        {/* ── Category + Featured Badges ── */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg"
            style={{ background: `${color}14`, color }}
          >
            <Tag size={10} />
            {newsItem.cat}
          </span>
          {newsItem.featured && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg text-white"
              style={{ background: 'linear-gradient(135deg, #E8BD63, #C99E47)', boxShadow: '0 2px 8px rgba(232,189,99,0.35)' }}
            >
              <Sparkles size={9} /> Featured
            </span>
          )}
        </div>

        {/* ── Title ── */}
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#3E3A36] leading-tight tracking-tight mb-4 max-w-3xl">
          {newsItem.title}
        </h1>

        {/* ── Date ── */}
        <div className="flex items-center gap-2 mb-10">
          <Calendar size={13} className="text-[#3E3A36]/25" />
          <span className="text-sm text-[#3E3A36]/35 font-medium">{newsItem.date}</span>
        </div>

        {/* ── Two-Column: Image | Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]">
            {imgSrc ? (
              <>
                <img
                  src={imgSrc}
                  alt={newsItem.title}
                  className="w-full h-auto min-h-[280px] max-h-[480px] object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              <div className="w-full h-[360px] flex flex-col items-center justify-center bg-gradient-to-br from-[#2C3A8C]/5 to-[#E8BD63]/5">
                <Newspaper size={48} className="text-[#2C3A8C]/15 mb-3" />
                <p className="text-[#3E3A36]/20 text-sm font-medium">No image available</p>
              </div>
            )}
          </div>

          {/* Right — Content */}
          <div className="flex flex-col">
            {/* Article Body */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-8 md:p-10 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full" style={{ background: color }} />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#3E3A36]/30">Article Details</h2>
              </div>

              <p className="text-[15px] md:text-base text-[#3E3A36]/70 font-medium leading-[1.85] whitespace-pre-line">
                {newsItem.desc || 'No additional details available for this news article.'}
              </p>

              {/* External link */}
              {newsItem.linkUrl && (
                <a
                  href={newsItem.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: color }}
                >
                  Read Full Article <ArrowUpRight size={14} />
                </a>
              )}
            </div>

            {/* Quick Info Bar */}
            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100/80">
                <Calendar size={13} className="text-[#2C3A8C]" />
                <span className="text-xs font-semibold text-[#3E3A36]/50">Published: {newsItem.date}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100/80">
                <Tag size={13} style={{ color }} />
                <span className="text-xs font-semibold text-[#3E3A36]/50">Category: {newsItem.cat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related News ── */}
        {relatedToShow.length > 0 && (
          <div className="mt-20">
            {/* Section divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent mb-12" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2C3A8C]/5 flex items-center justify-center">
                  <Newspaper size={18} className="text-[#2C3A8C]/40" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3E3A36]">
                    {related.length > 0 ? 'Related' : 'More'} <span className="italic text-[#2C3A8C] font-serif">News</span>
                  </h2>
                  <p className="text-[11px] text-[#3E3A36]/30 font-medium mt-0.5">
                    {related.length > 0
                      ? `More from ${newsItem.cat}`
                      : 'Other recent articles'}
                  </p>
                </div>
              </div>
              <Link
                to="/news"
                className="text-xs font-semibold text-[#2C3A8C] hover:text-[#E8BD63] transition-colors flex items-center gap-1"
              >
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedToShow.map((item, idx) => (
                <RelatedCard key={item.id || idx} item={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer line ── */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="text-center pt-8" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
          <p className="text-[#3E3A36]/15 text-[11px] font-medium">
            Trident Academy of Technology • News Article
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .max-w-6xl > * {
          animation: fadeIn 0.5s ease both;
        }
      `}</style>
    </div>
  );
}
