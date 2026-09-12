import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FadeInUp } from "../utils/animations";
import {
  ChevronRight, Pin, ArrowRight, Download, Sparkles,
  GraduationCap, Briefcase, PartyPopper, ScrollText, Building2,
  ClipboardCheck, UserPlus, Lightbulb, FlaskConical, Wrench, Megaphone,
} from "lucide-react";
import { getNotices } from "../services/tridentService";

/* ─── Category icons & gradients ─── */
const catIcons = {
  Academic: GraduationCap, Placement: Briefcase, Event: PartyPopper,
  General: ScrollText, Administration: Building2, Examination: ClipboardCheck,
  Admissions: UserPlus, Innovation: Lightbulb, Research: FlaskConical, Workshop: Wrench,
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

/* ─── Hardcoded fallback notices (NEVER modified) ─── */
const dummyNotices = [
  { id: 1, date: "15 May 2026", title: "Semester Exams Scheduled", category: "Academic", desc: "The final semester examinations for all B.Tech branches will commence from June 1st. Check the detailed timetable on the student portal." },
  { id: 2, date: "12 May 2026", title: "Campus Recruitment Drive", category: "Placement", desc: "TCS and Infosys will be visiting the campus for the Phase II recruitment drive. Eligible students must register by May 20th." },
  { id: 3, date: "08 May 2026", title: "Tech Symposium 2026", category: "Event", desc: "Registrations are now open for the annual Tech Symposium. Submit your project abstracts before the deadline." },
  { id: 4, date: "05 May 2026", title: "Library Clearance Notice", category: "General", desc: "All issued books must be returned to the central library before the commencement of the end-semester exams to get clearance." },
  { id: 5, date: "01 May 2026", title: "Hostel Allotment List Published", category: "Administration", desc: "The hostel room allotment list for the upcoming academic year has been published on the notice board outside the chief warden's office." },
];

export const catColors = {
  Academic: "#2C3A8C",
  Placement: "#006738",
  Event: "#C41E3A",
  General: "#A59381",
  Administration: "#E8BD63",
  Examination: "#7C3AED",
  Admissions: "#0891B2",
  Innovation: "#EA580C",
  Research: "#4338CA",
  Workshop: "#059669",
};

/* ─── Shared: exported so /notice page can reuse ─── */
export { dummyNotices };

/* ─── Single Notice Row (shared between homepage & /notice page) ─── */
export function NoticeRow({ notice }) {
  const hasFile = notice.fileUrl;
  const hasLink = notice.linkUrl;
  const isClickable = hasFile || hasLink;

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

  const dateParts = notice.date?.split(' ') || [];

  const CatIcon = catIcons[notice.category] || Megaphone;
  const gradient = catGradients[notice.category] || 'linear-gradient(135deg, #A59381, #C4A882)';
  const color = catColors[notice.category] || '#A59381';

  return (
    <div
      className={`group flex items-start gap-4 px-5 py-4 rounded-2xl transition-all duration-300 border-l-[3px] border-transparent 
        ${isClickable ? 'cursor-pointer hover:bg-[#2C3A8C]/[0.04] hover:border-l-[#E5AA3E] hover:translate-x-1' : 'hover:bg-gray-50'}`}
      onClick={isClickable ? handleClick : undefined}
      title={hasFile ? 'Click to download' : hasLink ? 'Click to open' : ''}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110"
        style={{ background: gradient, boxShadow: `0 4px 12px ${color}25` }}>
        <CatIcon size={18} className="text-white" strokeWidth={2.2} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span
            className="text-[9px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider"
            style={{ background: `${catColors[notice.category] || '#A59381'}12`, color: catColors[notice.category] || '#A59381' }}
          >
            {notice.category}
          </span>
          {notice.isNew && (
            <span className="new-badge text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-white flex items-center gap-1"
              style={{ background: 'linear-gradient(135deg, #EF4444, #F97316)', boxShadow: '0 0 8px rgba(239,68,68,0.4)' }}>
              <Sparkles size={8} /> New
            </span>
          )}
          {hasFile && (
            <span className="text-[9px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider bg-emerald-500/10 text-emerald-600 flex items-center gap-1">
              <Download size={8} /> Download
            </span>
          )}
        </div>
        <h4 className="text-[15px] font-medium text-[#3E3A36] leading-snug mb-1">{notice.title}</h4>
        <p className="text-[13px] text-[#3E3A36]/40 font-medium line-clamp-1">{notice.desc}</p>
      </div>

      <ChevronRight size={14} className={`flex-shrink-0 mt-2 ${isClickable ? 'text-[#2C3A8C]/40' : 'text-[#3E3A36]/15'}`} />
    </div>
  );
}

/* ─── Homepage NoticeBoard — static, shows max 5, "View All" → /notice ─── */
const MAX_HOMEPAGE_NOTICES = 5;

export default function NoticeBoard() {
  const [apiNotices, setApiNotices] = useState([]);

  useEffect(() => {
    let cancelled = false;
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
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // API notices first (newest), then hardcoded — show max 5 on homepage
  const allNotices = [...apiNotices, ...dummyNotices].slice(0, MAX_HOMEPAGE_NOTICES);

  return (
    <section className="py-16 md:py-20 relative bg-[#FAFAF8]" id="notice-board">
      {/* Subtle bg decor */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-[#2C3A8C]/3 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <FadeInUp>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#2C3A8C] flex items-center justify-center text-white shadow-lg">
                <Pin size={20} className="-rotate-45" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#3E3A36] serif leading-tight">
                  Notice <span className="italic text-[#2C3A8C]">Board</span>
                </h2>
                <p className="text-[13px] text-[#3E3A36]/40 font-medium mt-0.5">Updates & Announcements</p>
              </div>
            </div>
            <Link to="/notice" className="inline-flex items-center gap-2 text-sm font-medium text-[#2C3A8C] hover:text-[#E5AA3E] transition-colors group">
              View All
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </FadeInUp>

        {/* Static notice list */}
        <FadeInUp delay={100}>
          <div className="bg-white rounded-[20px] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] border border-gray-100/80 overflow-hidden">
            <div className="divide-y divide-gray-100/60">
              {allNotices.map((notice, idx) => (
                <NoticeRow key={notice.id || idx} notice={notice} />
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}

/* New badge pulse animation */
const newBadgeStyle = document.createElement('style');
newBadgeStyle.textContent = `
  @keyframes newPulse {
    0%, 100% { box-shadow: 0 0 6px rgba(239,68,68,0.4); }
    50% { box-shadow: 0 0 14px rgba(239,68,68,0.6), 0 0 20px rgba(249,115,22,0.2); }
  }
  .new-badge { animation: newPulse 2s ease-in-out infinite; }
`;
document.head.appendChild(newBadgeStyle);
