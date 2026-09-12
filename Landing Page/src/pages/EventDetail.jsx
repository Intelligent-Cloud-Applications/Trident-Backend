/**
 * Event Detail Page — /events/:id
 *
 * Clean editorial layout: heading + two-column (image | content).
 * Data is passed via router state for instant load, with API fallback.
 */

import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft, Calendar, Sparkles, ArrowUpRight, Tag, MapPin, ExternalLink,
  GraduationCap, Briefcase, PartyPopper, FlaskConical, Wrench, Megaphone,
  Trophy, Music, BookOpen, Users, Lightbulb,
} from "lucide-react";
import { getEvents } from "../services/tridentService";
import { EVENTS } from "../data/constants";

/* ─── Slug helper ─── */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

/* ─── Type icons & colors ─── */
const typeIcons = {
  Seminar: BookOpen,
  Publication: Megaphone,
  Reunion: Users,
  Research: FlaskConical,
  Academic: GraduationCap,
  Workshop: Wrench,
  Sports: Trophy,
  Cultural: Music,
  Innovation: Lightbulb,
  Placement: Briefcase,
  Event: PartyPopper,
};

const typeColors = {
  Seminar: '#2C3A8C',
  Publication: '#A59381',
  Reunion: '#B8860B',
  Research: '#4338CA',
  Academic: '#2C3A8C',
  Workshop: '#059669',
  Sports: '#DC2626',
  Cultural: '#C41E3A',
  Innovation: '#EA580C',
  Placement: '#006738',
  Event: '#C41E3A',
};

const typeGradients = {
  Seminar: 'linear-gradient(135deg, #2C3A8C, #4F5FD5)',
  Publication: 'linear-gradient(135deg, #A59381, #C4A882)',
  Reunion: 'linear-gradient(135deg, #B8860B, #E8BD63)',
  Research: 'linear-gradient(135deg, #4338CA, #818CF8)',
  Academic: 'linear-gradient(135deg, #2C3A8C, #4F5FD5)',
  Workshop: 'linear-gradient(135deg, #059669, #34D399)',
  Sports: 'linear-gradient(135deg, #DC2626, #F87171)',
  Cultural: 'linear-gradient(135deg, #C41E3A, #F97316)',
  Innovation: 'linear-gradient(135deg, #EA580C, #FBBF24)',
  Placement: 'linear-gradient(135deg, #006738, #10B981)',
  Event: 'linear-gradient(135deg, #C41E3A, #F97316)',
};

/* ─── Related Event Card ─── */
function RelatedCard({ item }) {
  const imgSrc = item.imageUrl || '';
  const color = typeColors[item.type] || '#A59381';
  const gradient = typeGradients[item.type] || 'linear-gradient(135deg, #A59381, #C4A882)';
  const TypeIcon = typeIcons[item.type] || Calendar;

  return (
    <Link
      to={`/events/${item.id}`}
      state={{ eventItem: item }}
      className="group block rounded-2xl bg-white border border-gray-100/80 overflow-hidden transition-all duration-500 hover:shadow-[0_16px_48px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1"
    >
      {imgSrc ? (
        <div className="relative w-full h-40 overflow-hidden">
          <img src={imgSrc} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.2s]" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors pointer-events-none" />
        </div>
      ) : (
        <div className="relative w-full h-40 overflow-hidden flex items-center justify-center" style={{ background: gradient }}>
          <TypeIcon size={36} className="text-white/20" strokeWidth={1.5} />
        </div>
      )}
      <div className="p-4">
        <span
          className="text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md inline-block mb-2"
          style={{ background: `${color}12`, color }}
        >
          {item.type}
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

export default function EventDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [eventItem, setEventItem] = useState(location.state?.eventItem || null);
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(!eventItem);

  useEffect(() => {
    let cancelled = false;

    getEvents()
      .then(events => {
        if (cancelled) return;
        const mapped = events.map(ev => ({
          id: ev.id,
          date: ev.date,
          title: ev.title,
          type: ev.type || 'Event',
          venue: ev.venue || '',
          description: ev.description || '',
          isNew: ev.isNew ?? false,
          imageUrl: ev.imageUrl || '',
          fileUrl: ev.fileUrl || '',
        }));

        // Merge with hardcoded
        const hardcoded = EVENTS.map((ev, i) => ({
          id: `hardcoded-${i}`,
          date: ev.date,
          title: ev.title,
          type: ev.type || 'Event',
          venue: ev.venue || '',
          description: '',
          isNew: false,
          imageUrl: '',
          fileUrl: '',
        }));

        const merged = [...mapped, ...hardcoded];
        setAllEvents(merged);

        // If we don't have the item from router state, find it
        if (!eventItem) {
          const found = merged.find(e => e.id === id);
          setEventItem(found || null);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [id]);

  const imgSrc = eventItem ? (eventItem.imageUrl || '') : '';
  const color = eventItem ? (typeColors[eventItem.type] || '#A59381') : '#A59381';
  const gradient = eventItem ? (typeGradients[eventItem.type] || 'linear-gradient(135deg, #A59381, #C4A882)') : '';
  const TypeIcon = eventItem ? (typeIcons[eventItem.type] || Calendar) : Calendar;
  const attachmentUrl = eventItem ? (eventItem.fileUrl || '') : '';

  // Related events: same type, excluding current
  const related = allEvents
    .filter(e => e.id !== id && e.type === eventItem?.type)
    .slice(0, 3);

  // If no same-type, show latest
  const relatedToShow = related.length > 0
    ? related
    : allEvents.filter(e => e.id !== id).slice(0, 3);

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
  if (!eventItem) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-[100px]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-3xl bg-[#2C3A8C]/5 flex items-center justify-center mx-auto mb-5">
            <Calendar size={32} className="text-[#2C3A8C]/20" />
          </div>
          <h2 className="text-2xl font-bold text-[#3E3A36] mb-2">Event Not Found</h2>
          <p className="text-[#3E3A36]/40 text-sm font-medium mb-6">
            The event you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-[#2C3A8C] hover:bg-[#1A2660] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Events
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
          to="/events"
          className="inline-flex items-center gap-2 text-[#3E3A36]/35 hover:text-[#2C3A8C] text-sm font-medium mb-8 transition-all duration-300 hover:gap-3 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Events Calendar
        </Link>

        {/* ── Type + New Badges ── */}
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg"
            style={{ background: `${color}14`, color }}
          >
            <Tag size={10} />
            {eventItem.type}
          </span>
          {eventItem.isNew && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg text-white"
              style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', boxShadow: '0 2px 8px rgba(239,68,68,0.35)' }}
            >
              <Sparkles size={9} /> New
            </span>
          )}
        </div>

        {/* ── Title ── */}
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#3E3A36] leading-tight tracking-tight mb-4 max-w-3xl">
          {eventItem.title}
        </h1>

        {/* ── Date & Venue ── */}
        <div className="flex items-center gap-5 mb-10 flex-wrap">
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-[#3E3A36]/25" />
            <span className="text-sm text-[#3E3A36]/35 font-medium">{eventItem.date}</span>
          </div>
          {eventItem.venue && (
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-[#3E3A36]/25" />
              <span className="text-sm text-[#3E3A36]/35 font-medium">{eventItem.venue}</span>
            </div>
          )}
        </div>

        {/* ── Two-Column: Image | Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — Image */}
          <div className="relative rounded-2xl overflow-hidden bg-gray-50 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)]">
            {imgSrc ? (
              <>
                <img
                  src={imgSrc}
                  alt={eventItem.title}
                  className="w-full h-auto min-h-[280px] max-h-[480px] object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
              </>
            ) : (
              <div
                className="w-full h-[360px] flex flex-col items-center justify-center"
                style={{ background: gradient }}
              >
                <TypeIcon size={64} className="text-white/15 mb-3" strokeWidth={1.5} />
                <p className="text-white/30 text-sm font-medium">No image available</p>
              </div>
            )}
          </div>

          {/* Right — Content */}
          <div className="flex flex-col">
            {/* Article Body */}
            <div className="bg-white rounded-2xl border border-gray-100/80 p-8 md:p-10 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-1 h-6 rounded-full" style={{ background: color }} />
                <h2 className="text-xs font-bold uppercase tracking-widest text-[#3E3A36]/30">Event Details</h2>
              </div>

              <p className="text-[15px] md:text-base text-[#3E3A36]/70 font-medium leading-[1.85] whitespace-pre-line">
                {eventItem.description || 'No additional details available for this event.'}
              </p>

              {/* Attachment / File link */}
              {attachmentUrl && (
                <a
                  href={attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ background: color }}
                >
                  View Attachment <ExternalLink size={14} />
                </a>
              )}
            </div>

            {/* Quick Info Bar */}
            <div className="flex items-center gap-4 mt-5 flex-wrap">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100/80">
                <Calendar size={13} className="text-[#2C3A8C]" />
                <span className="text-xs font-semibold text-[#3E3A36]/50">Date: {eventItem.date}</span>
              </div>
              {eventItem.venue && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100/80">
                  <MapPin size={13} style={{ color }} />
                  <span className="text-xs font-semibold text-[#3E3A36]/50">Venue: {eventItem.venue}</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-100/80">
                <Tag size={13} style={{ color }} />
                <span className="text-xs font-semibold text-[#3E3A36]/50">Type: {eventItem.type}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Events ── */}
        {relatedToShow.length > 0 && (
          <div className="mt-20">
            {/* Section divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent mb-12" />

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2C3A8C]/5 flex items-center justify-center">
                  <Calendar size={18} className="text-[#2C3A8C]/40" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3E3A36]">
                    {related.length > 0 ? 'Related' : 'More'} <span className="italic text-[#2C3A8C] font-serif">Events</span>
                  </h2>
                  <p className="text-[11px] text-[#3E3A36]/30 font-medium mt-0.5">
                    {related.length > 0
                      ? `More ${eventItem.type} events`
                      : 'Other upcoming events'}
                  </p>
                </div>
              </div>
              <Link
                to="/events"
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
            Trident Academy of Technology • Event Details
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
