/**
 * All Events Page — /events
 * 
 * Premium full-page event board with search, type filters,
 * animations, and a beautiful card-based layout.
 * Events are managed via the Admin Dashboard.
 */

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft, Search, X, Calendar, Filter, Sparkles, MapPin, ArrowUpRight,
  GraduationCap, Briefcase, PartyPopper, FlaskConical, Wrench, Megaphone,
  Trophy, Music, BookOpen, Users, Lightbulb,
} from "lucide-react";
import { getEvents } from "../services/tridentService";
import { EVENTS } from "../data/constants";

/* ─── Type icons & gradients ─── */
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

/* ─── Event Card (News-style layout: image → content → read more) ─── */
function EventCard({ event, index }) {
  const color = typeColors[event.type] || '#A59381';
  const gradient = typeGradients[event.type] || 'linear-gradient(135deg, #A59381, #C4A882)';
  const imgSrc = event.imageUrl || '';
  const attachmentUrl = event.fileUrl || event.imageUrl;
  const TypeIcon = typeIcons[event.type] || Calendar;

  const cardInner = (
    <>
      {/* Image */}
      {imgSrc ? (
        <div className="relative w-full h-52 overflow-hidden">
          <img
            src={imgSrc}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
          />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />

          {/* Type badge on image */}
          <span
            className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-white/90 backdrop-blur-md shadow-sm"
            style={{ color }}
          >
            {event.type}
          </span>

          {/* New badge */}
          {event.isNew && (
            <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded text-white flex items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', boxShadow: '0 0 8px rgba(239,68,68,0.4)' }}>
              <Sparkles size={9} /> New
            </span>
          )}
        </div>
      ) : (
        /* No image — gradient placeholder with icon */
        <div className="relative w-full h-52 overflow-hidden flex items-center justify-center"
          style={{ background: gradient }}>
          <TypeIcon size={48} className="text-white/20" strokeWidth={1.5} />

          {/* Type badge */}
          <span
            className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded bg-white/90 backdrop-blur-md shadow-sm"
            style={{ color }}
          >
            {event.type}
          </span>

          {/* New badge */}
          {event.isNew && (
            <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded text-white flex items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', boxShadow: '0 0 8px rgba(239,68,68,0.4)' }}>
              <Sparkles size={9} /> New
            </span>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Date & venue */}
        <div className="flex items-center gap-4 mb-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-[#3E3A36]/25" />
            <span className="text-[11px] text-[#3E3A36]/30 font-medium">{event.date}</span>
          </div>
          {event.venue && (
            <div className="flex items-center gap-1.5">
              <MapPin size={11} className="text-[#3E3A36]/25" />
              <span className="text-[11px] text-[#3E3A36]/30 font-medium">{event.venue}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-[#3E3A36] leading-snug mb-2 group-hover:text-[#2C3A8C] transition-colors duration-300">
          {event.title}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-[13px] text-[#3E3A36]/45 font-medium leading-relaxed line-clamp-3">
            {event.description}
          </p>
        )}

        {/* Read more / View attachment */}
        <span className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-medium text-[#2C3A8C] group-hover:text-[#E8BD63] transition-colors">
          {attachmentUrl ? 'View Details' : 'Read More'} <ArrowUpRight size={12} />
        </span>
      </div>
    </>
  );

  return (
    <Link
      to={`/events/${event.id}`}
      state={{ eventItem: event }}
      className="group relative block rounded-2xl bg-white border border-gray-100/80 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 cursor-pointer"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {cardInner}
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

export default function AllEvents() {
  const [apiEvents, setApiEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('All');
  const searchRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getEvents()
      .then(events => {
        if (!cancelled) {
          const mapped = events.map(ev => ({
            id: ev.id,
            date: ev.date,
            title: ev.title,
            type: ev.type || 'Event',
            venue: ev.venue || '',
            description: ev.description || '',
            isNew: ev.isNew ?? true,
            imageUrl: ev.imageUrl || '',
            fileUrl: ev.fileUrl || '',
          }));
          setApiEvents(mapped);
        }
      })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Merge: API events first, then hardcoded fallback events
  const allEvents = [...apiEvents, ...EVENTS.map((ev, i) => ({
    id: `hardcoded-${i}`,
    date: ev.date,
    title: ev.title,
    type: ev.type || 'Event',
    venue: ev.venue || '',
    description: '',
    isNew: false,
  }))];

  const types = ['All', ...new Set(allEvents.map(e => e.type).filter(Boolean))];

  const filtered = allEvents.filter(event => {
    const matchesType = activeType === 'All' || event.type === activeType;
    const matchesSearch = !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const newCount = allEvents.filter(e => e.isNew).length;

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
                <Calendar size={28} className="text-[#E8BD63]" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white serif leading-tight tracking-tight">
                  Events <span className="italic text-[#E8BD63]">Calendar</span>
                </h1>
                <p className="text-white/40 text-sm font-medium mt-2 max-w-md">
                  Discover upcoming seminars, workshops, cultural fests, and academic events at Trident Academy of Technology.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 flex-wrap">
              <StatCard icon={Calendar} label="Total Events" value={allEvents.length} color="#2C3A8C" />
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
                placeholder="Search events by title, venue, or description..."
                className="w-full pl-11 pr-10 py-3 rounded-xl bg-[#FAFAF8] border border-gray-200/60 text-sm text-[#3E3A36] placeholder-[#3E3A36]/25 font-medium outline-none focus:ring-2 focus:ring-[#2C3A8C]/15 focus:border-[#2C3A8C]/25 transition-all"
              />
              {searchQuery && (
                <button onClick={() => { setSearchQuery(''); searchRef.current?.focus(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3E3A36]/20 hover:text-[#3E3A36]/50 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Type pills */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter size={13} className="text-[#3E3A36]/25 hidden md:block" />
              {types.map(type => {
                const isActive = activeType === type;
                const typColor = type === 'All' ? '#2C3A8C' : (typeColors[type] || '#A59381');
                return (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive
                        ? 'text-white shadow-md scale-[1.02]'
                        : 'bg-[#FAFAF8] text-[#3E3A36]/40 hover:text-[#3E3A36]/70 border border-gray-200/60 hover:border-gray-300'
                    }`}
                    style={isActive ? { background: typColor, boxShadow: `0 4px 12px ${typColor}30` } : {}}
                  >
                    {type}
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
            {activeType !== 'All' && <> in <span className="text-[#2C3A8C]">{activeType}</span></>}
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

        {/* Events grid */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((event, idx) => (
              <EventCard key={event.id || idx} event={event} index={idx} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 rounded-3xl bg-[#2C3A8C]/5 flex items-center justify-center mx-auto mb-5">
              <Calendar size={32} className="text-[#2C3A8C]/20" />
            </div>
            <h3 className="text-lg font-semibold text-[#3E3A36]/60 mb-2">No events found</h3>
            <p className="text-[#3E3A36]/30 text-sm font-medium max-w-sm mx-auto">
              {searchQuery
                ? `We couldn't find any events matching "${searchQuery}". Try a different search term.`
                : 'No events are available in this category yet.'}
            </p>
            {(searchQuery || activeType !== 'All') && (
              <button
                onClick={() => { setSearchQuery(''); setActiveType('All'); }}
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
            Trident Academy of Technology • Events Calendar
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
