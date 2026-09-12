import { useState, useRef, useEffect } from "react";
import { FadeInUp } from "../utils/animations";
import { getNotices } from "../services/tridentService";
import {
  Megaphone,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  GraduationCap,
  Trophy,
  Lightbulb,
  Briefcase,
  Beaker,
  Wrench,
  Zap,
} from "lucide-react";

/* ─── Scoped CSS ─── */
const scopedCSS = `
  @keyframes ann-ticker {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  .ann-ticker-track {
    animation: ann-ticker var(--ticker-speed, 22s) linear infinite;
  }
  .ann-ticker-track:hover {
    animation-play-state: paused;
  }
`;

/* ─── Icon Map ─── */
const categoryIcons = {
  Examination: Calendar,
  Admissions: GraduationCap,
  Innovation: Lightbulb,
  Research: Beaker,
  Placements: Briefcase,
  Events: Trophy,
  Workshop: Wrench,
  Default: Zap,
};

/* ─── Announcements Data ─── */
const announcements = [
  {
    id: 1,
    title: "Even Sem. Repeat Mid-Term (Reg. & Back) Exam Schedule 2025-26",
    category: "Examination",
    date: "Mar 25, 2026",
    isNew: true,
  },
  {
    id: 2,
    title: "ADMISSION NOTICE 2026-27",
    category: "Admissions",
    date: "Mar 22, 2026",
    isNew: true,
  },
  {
    id: 3,
    title: "Even Sem. Mid-Term UG & PG Exam. Schedule (Reg. & Back) 2025-26",
    category: "Examination",
    date: "Mar 20, 2026",
    isNew: true,
  },
  {
    id: 4,
    title: "AICTE IDEA Lab at Silicon University",
    category: "Innovation",
    date: "Mar 18, 2026",
    isNew: false,
  },
  {
    id: 5,
    title: "Registration for SUAT (Ph.D. Admissions Jan 2026)",
    category: "Research",
    date: "Mar 15, 2026",
    isNew: false,
  },
  {
    id: 6,
    title: "Campus Recruitment Drive — TCS, Infosys & Wipro (March 2026)",
    category: "Placements",
    date: "Mar 12, 2026",
    isNew: true,
  },
  {
    id: 7,
    title: "National Level Hackathon TRIDENT HACK 2026 — Register Now",
    category: "Events",
    date: "Mar 10, 2026",
    isNew: true,
  },
  {
    id: 8,
    title: "Workshop on IoT & Embedded Systems by Industry Experts",
    category: "Workshop",
    date: "Mar 8, 2026",
    isNew: false,
  },
];

/* ─── Single Announcement Row ─── */
function AnnouncementRow({ item, index }) {
  const Icon = categoryIcons[item.category] || categoryIcons.Default;

  return (
    <a
      href="#"
      className="group flex items-center gap-5 py-5 px-6 transition-all duration-400 hover:bg-[#2C3A8C]/[0.03] rounded-xl cursor-pointer"
      style={{ borderBottom: "1px solid rgba(62,58,54,0.06)" }}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[#2C3A8C]/[0.05] group-hover:bg-[#2C3A8C]/[0.1] transition-colors duration-400">
        <Icon size={18} className="text-[#2C3A8C]/60" strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#2C3A8C]/40">
            {item.category}
          </span>
          {item.isNew && (
            <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-[#C41E3A] bg-[#C41E3A]/8 px-2 py-0.5 rounded-full">
              <span className="w-1 h-1 bg-[#C41E3A] rounded-full animate-pulse" />
              New
            </span>
          )}
        </div>
        <p className="text-[14px] text-[#3E3A36]/80 font-medium leading-snug truncate group-hover:text-[#2C3A8C] transition-colors duration-300">
          {item.title}
        </p>
      </div>

      {/* Date */}
      <span className="hidden sm:block flex-shrink-0 text-[11px] font-medium text-[#3E3A36]/30 tabular-nums">
        {item.date}
      </span>

      {/* Arrow */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-400">
        <ArrowUpRight size={14} className="text-[#2C3A8C]/50" />
      </div>
    </a>
  );
}


/* ─── Main Component ─── */
export default function Announcements() {
  const [showAll, setShowAll] = useState(false);
  const [apiAnnouncements, setApiAnnouncements] = useState([]);

  // Fetch admin-created notices from DynamoDB via Amplify
  useEffect(() => {
    let cancelled = false;
    getNotices()
      .then(notices => {
        if (!cancelled) {
          const mapped = notices.map(n => ({
            id: `api-${n.id}`,
            title: n.title,
            category: n.category || 'General',
            date: n.date,
            isNew: n.isNew ?? true,
          }));
          setApiAnnouncements(mapped);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // API data first, then hardcoded data
  const allAnnouncements = [...apiAnnouncements, ...announcements];
  const displayedItems = showAll ? allAnnouncements : allAnnouncements.slice(0, 5);

  return (
    <section className="pt-12 pb-28 relative overflow-hidden" style={{ background: "#F5EEEC" }}>
      <style>{scopedCSS}</style>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2C3A8C 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* ── Header ── */}
        <div className="mb-14">
          <FadeInUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-10 bg-[#2C3A8C]/30" />
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#2C3A8C]/50">
                Notice Board
              </span>
            </div>
          </FadeInUp>

          <FadeInUp delay={100}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="serif text-5xl md:text-6xl font-bold text-[#3E3A36] leading-[1.05]">
                Announce
                <span
                  className="italic"
                  style={{
                    background:
                      "linear-gradient(135deg, #2C3A8C 0%, #4F5BD5 60%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  ments
                </span>
              </h2>
              <p className="text-[#3E3A36]/40 text-sm font-medium max-w-xs">
                Latest news, schedules, and campus updates.
              </p>
            </div>
          </FadeInUp>
        </div>

        {/* ── Announcements List ── */}
        <FadeInUp delay={200}>
          <div
            className="relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(20px)",
              borderRadius: "24px",
            }}
          >
            {/* Top accent */}
            <div className="flex h-[2px]">
              <div className="flex-1 bg-[#2C3A8C]" />
              <div className="flex-1 bg-[#8B5CF6]" />
              <div className="flex-1 bg-[#C41E3A]" />
              <div className="flex-1 bg-[#E8A823]" />
            </div>

            {/* List */}
            <div className="py-2">
              {displayedItems.map((item, i) => (
                <AnnouncementRow key={item.id} item={item} index={i} />
              ))}
            </div>

            {/* Show more / less */}
            {allAnnouncements.length > 5 && (
              <div className="px-6 pb-5 pt-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full py-3 rounded-xl text-[12px] font-medium uppercase tracking-[0.15em] text-[#2C3A8C]/60 hover:text-[#2C3A8C] hover:bg-[#2C3A8C]/[0.04] transition-all duration-400"
                >
                  {showAll ? "Show Less" : `View All ${allAnnouncements.length} Announcements`}
                </button>
              </div>
            )}
          </div>
        </FadeInUp>

        {/* ── Bottom link ── */}
        <FadeInUp delay={400}>
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-[#3E3A36]/8">
            <p className="text-[#3E3A36]/35 text-[13px] font-medium">
              Updates are posted regularly.
            </p>
            <a
              href="#"
              className="group relative inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 active:scale-95 shrink-0 overflow-hidden bg-white border border-[#2C3A8C]/15 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_-8px_#2C3A8C] text-[#2C3A8C] hover:text-white"
            >
              {/* Hover fill background */}
              <div className="absolute inset-0 w-full h-full translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 bg-[#2C3A8C]" />
              
              {/* Shine sweep effect */}
              <div className="absolute inset-0 w-[200%] h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[50%] z-10" />

              <span className="relative z-10 transition-colors duration-500">
                Subscribe to alerts
              </span>
              
              {/* Dual Arrow Animation Container */}
              <div className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 bg-[#2C3A8C]/10 group-hover:bg-white/20">
                 <ArrowRight size={12} strokeWidth={2.5} className="absolute transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[150%] group-hover:opacity-0 group-hover:text-white" />
                 <ArrowRight size={12} strokeWidth={2.5} className="absolute -translate-x-[150%] opacity-0 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
