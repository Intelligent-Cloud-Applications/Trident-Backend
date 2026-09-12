import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInUp, SlideIn, AmbientParticles } from "../utils/animations";
import { GSAPCounter, ScrambleText, Tilt3D, AnimatedGradient, ScrollReveal, GlowTrail } from "../utils/advanced-animations";
import { TrendingUp, Building2, Award, Users, ArrowRight, ChevronLeft, ChevronRight, BadgeCheck, Briefcase } from "lucide-react";
import { logos as CompanyLogos } from "../data/companyLogos";
import { alumniData } from "../data/alumniData";

/* ─── Data ──────────────────────────────────────────────────────────── */
const stats = [
  { icon: <TrendingUp size={28} />, value: 7.5,   label: "Highest Package", color: "#D1D5DB", prefix: "₹", suffix: " LPA", decimals: 1 },
  { icon: <Award size={28} />,       value: 4.5,  label: "Average Package", color: "#C41E3A", prefix: "₹", suffix: " LPA", decimals: 1 },
  { icon: <Building2 size={28} />,   value: 120,      label: "Companies Visited", color: "#2E6DB4", prefix: "", suffix: "+", decimals: 0 },
  { icon: <Users size={28} />,       value: 94,        label: "Placement Rate", color: "#3EA644", prefix: "", suffix: "%", decimals: 0 },
];

const domains = {
  giants: {
    label: "Tech Giants & Product",
    companies: ["Amazon", "Microsoft", "Google", "Goldman Sachs", "JP Morgan", "Morgan Stanley", "Atlassian", "Oracle", "SAP", "Flipkart", "PhonePe", "Zepto", "Paytm", "Persistent"]
  },
  consulting: {
    label: "Consulting & Services",
    companies: ["TCS", "Infosys", "Wipro", "HCL", "Capgemini", "Accenture", "Cognizant", "Tech Mahindra", "IBM", "Deloitte", "EY India", "KPMG India", "PwC India"]
  },
  core: {
    label: "Core & Infrastructure",
    companies: ["Siemens", "Schneider Electric", "ABB India", "Bosch India", "Tata Power", "JSW Steel", "L&T Construction", "Godrej & Boyce", "HDFC Bank", "ICICI Bank", "Axis Bank"]
  }
};

const dummyPlacements = alumniData.slice(0, 30);

const CARD_GRADIENTS = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  'linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)',
  'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  'linear-gradient(135deg, #cfd9df 0%, #e2ebf0 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
];

function AlumniCard({ alumni, imagePrefix, index }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const designation = alumni.designation || '';
  const batch = alumni.batch || '';

  const commaIdx = designation.lastIndexOf(',');
  let role = designation;
  let workplace = '';
  if (commaIdx > 0) {
    const parts = designation.split(',').map(s => s.trim());
    if (parts.length >= 3) {
      workplace = parts.slice(-2).join(', ');
      role = parts.slice(0, -2).join(', ');
    } else if (parts.length === 2) {
      role = parts[0];
      workplace = parts[1];
    }
  }

  const displayName = alumni.name.replace('Dr:', 'Dr.').replace('Dr:', 'Dr.');
  const initials = displayName.split(' ').filter(w => w.length > 1 && w !== 'Dr.').map(w => w[0]).slice(0, 2).join('').toUpperCase();

  return (
    <div className="group relative w-[280px] bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] flex-shrink-0"
         style={{ minHeight: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      
      {/* ── Top Gradient Banner ── */}
      <div className="h-28 w-full relative" style={{ background: gradient }}>
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
        {/* Dark overlay at bottom of banner for smoother transition */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* ── Card Content ── */}
      <div className="px-6 pb-6 flex flex-col items-center text-center relative z-10 -mt-14 h-[calc(100%-7rem)]">
        
        {/* Avatar */}
        <div className="relative mb-3 flex flex-col items-center">
          <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden border-[4px] border-white shadow-md bg-white">
            <img
              src={`${imagePrefix}${alumni.image_file}`}
              alt={displayName}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="absolute inset-0 items-center justify-center hidden" style={{ background: gradient }}>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '28px', fontWeight: 800, color: 'white' }}>{initials}</span>
            </div>
          </div>
          {/* Badge */}
          {batch && (
            <div className="mt-2 px-3 py-1 rounded-full shadow-sm border border-white" style={{ background: gradient }}>
               <span className="text-white text-[10px] font-bold tracking-wider whitespace-nowrap">
                 {batch}
               </span>
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-gray-900 font-bold text-[19px] leading-tight mt-1 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          {displayName}
        </h3>

        {/* Role */}
        <p className="text-[#1A2660] font-semibold text-[13px] mb-3 leading-snug">
          {role || designation}
        </p>

        {/* Divider */}
        <div className="w-10 h-[3px] rounded-full mb-4 opacity-50" style={{ background: gradient }} />

        {/* Organization */}
        {workplace && (
          <div className="mt-auto w-full bg-gray-50/80 rounded-xl p-3 flex flex-col items-center justify-center border border-gray-100 group-hover:bg-[#1A2660]/5 transition-colors duration-300">
            <span className="text-gray-400 text-[9px] font-bold uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
              <Building2 size={11} className="text-gray-400" />
              Organization
            </span>
            <p className="text-gray-800 text-[13px] font-bold leading-tight">
              {workplace}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}


const getBrandStyle = (name) => {
  const styles = {
    // Giants
    "Amazon": { border: "hover:border-[#FF9900]", glow: "hover:shadow-[#FF9900]/40", text: "group-hover:text-[#FF9900]" },
    "Microsoft": { border: "hover:border-[#F25022]", glow: "hover:shadow-[#00A4EF]/40", text: "group-hover:text-[#00A4EF]" },
    "Google": { border: "hover:border-[#EA4335]", glow: "hover:shadow-[#4285F4]/40", text: "group-hover:text-[#4285F4]" },
    "Goldman Sachs": { border: "hover:border-[#C39B62]", glow: "hover:shadow-[#C39B62]/40", text: "group-hover:text-[#C39B62]" },
    "JP Morgan": { border: "hover:border-[#003087]", glow: "hover:shadow-[#003087]/40", text: "group-hover:text-[#003087]" },
    "Morgan Stanley": { border: "hover:border-[#1A5C9A]", glow: "hover:shadow-[#1A5C9A]/40", text: "group-hover:text-[#1A5C9A]" },
    "Atlassian": { border: "hover:border-[#2684FF]", glow: "hover:shadow-[#0052CC]/40", text: "group-hover:text-[#0052CC]" },
    "Oracle": { border: "hover:border-[#F80000]", glow: "hover:shadow-[#F80000]/40", text: "group-hover:text-[#F80000]" },
    "SAP": { border: "hover:border-[#00A3E0]", glow: "hover:shadow-[#00A3E0]/40", text: "group-hover:text-[#00A3E0]" },
    "Flipkart": { border: "hover:border-[#2874F0]", glow: "hover:shadow-[#FFE11B]/40", text: "group-hover:text-[#2874F0]" },
    "PhonePe": { border: "hover:border-[#5f259f]", glow: "hover:shadow-[#5f259f]/40", text: "group-hover:text-[#5f259f]" },
    "Zepto": { border: "hover:border-[#5c14ab]", glow: "hover:shadow-[#FF6B35]/40", text: "group-hover:text-[#5c14ab]" },
    "Paytm": { border: "hover:border-[#00b9f1]", glow: "hover:shadow-[#002970]/40", text: "group-hover:text-[#00b9f1]" },
    "Persistent": { border: "hover:border-[#FF5E00]", glow: "hover:shadow-[#1B4FBF]/40", text: "group-hover:text-[#FF5E00]" },

    // Consulting
    "TCS": { border: "hover:border-[#003366]", glow: "hover:shadow-[#003366]/40", text: "group-hover:text-[#003366]" },
    "Infosys": { border: "hover:border-[#004B8D]", glow: "hover:shadow-[#FA6804]/40", text: "group-hover:text-[#004B8D]" },
    "Wipro": { border: "hover:border-[#7B2D8B]", glow: "hover:shadow-[#7B2D8B]/40", text: "group-hover:text-[#7B2D8B]" },
    "HCL": { border: "hover:border-[#0077B5]", glow: "hover:shadow-[#0077B5]/40", text: "group-hover:text-[#0077B5]" },
    "Capgemini": { border: "hover:border-[#0070AD]", glow: "hover:shadow-[#0070AD]/40", text: "group-hover:text-[#0070AD]" },
    "Accenture": { border: "hover:border-[#A100FF]", glow: "hover:shadow-[#A100FF]/40", text: "group-hover:text-[#A100FF]" },
    "Cognizant": { border: "hover:border-[#0033A0]", glow: "hover:shadow-[#00B5E2]/40", text: "group-hover:text-[#0033A0]" },
    "Tech Mahindra": { border: "hover:border-[#C8102E]", glow: "hover:shadow-[#C8102E]/40", text: "group-hover:text-[#C8102E]" },
    "IBM": { border: "hover:border-[#1F70C1]", glow: "hover:shadow-[#1F70C1]/40", text: "group-hover:text-[#1F70C1]" },
    "Deloitte": { border: "hover:border-[#86BC25]", glow: "hover:shadow-[#86BC25]/40", text: "group-hover:text-[#86BC25]" },
    "EY India": { border: "hover:border-[#FFE600]", glow: "hover:shadow-[#FFE600]/40", text: "group-hover:text-[#FFE600]" },
    "KPMG India": { border: "hover:border-[#00338D]", glow: "hover:shadow-[#00338D]/40", text: "group-hover:text-[#00338D]" },
    "PwC India": { border: "hover:border-[#E0301E]", glow: "hover:shadow-[#F37021]/40", text: "group-hover:text-[#E0301E]" },

    // Core
    "Siemens": { border: "hover:border-[#00828A]", glow: "hover:shadow-[#00828A]/40", text: "group-hover:text-[#00828A]" },
    "Schneider Electric": { border: "hover:border-[#3DCD58]", glow: "hover:shadow-[#3DCD58]/40", text: "group-hover:text-[#3DCD58]" },
    "ABB India": { border: "hover:border-[#FF0000]", glow: "hover:shadow-[#FF0000]/40", text: "group-hover:text-[#FF0000]" },
    "Bosch India": { border: "hover:border-[#E30613]", glow: "hover:shadow-[#005691]/40", text: "group-hover:text-[#E30613]" },
    "Tata Power": { border: "hover:border-[#00A4EF]", glow: "hover:shadow-[#00A4EF]/40", text: "group-hover:text-[#00A4EF]" },
    "JSW Steel": { border: "hover:border-[#002D62]", glow: "hover:shadow-[#FF0000]/40", text: "group-hover:text-[#002D62]" },
    "L&T Construction": { border: "hover:border-[#FDB913]", glow: "hover:shadow-[#1A1A1A]/40", text: "group-hover:text-[#FDB913]" },
    "Godrej & Boyce": { border: "hover:border-[#C41E3A]", glow: "hover:shadow-[#C41E3A]/40", text: "group-hover:text-[#C41E3A]" },
    "HDFC Bank": { border: "hover:border-[#004C8F]", glow: "hover:shadow-[#FF0000]/40", text: "group-hover:text-[#004C8F]" },
    "ICICI Bank": { border: "hover:border-[#F37021]", glow: "hover:shadow-[#7A2500]/40", text: "group-hover:text-[#F37021]" },
    "Axis Bank": { border: "hover:border-[#841439]", glow: "hover:shadow-[#841439]/40", text: "group-hover:text-[#841439]" }
  };
  return styles[name] || { border: "hover:border-[#D1D5DB]", glow: "hover:shadow-[#D1D5DB]/30", text: "group-hover:text-[#D1D5DB]" };
};

function RecruiterCircle({ name }) {
  const Logo = CompanyLogos[name];
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const brand = getBrandStyle(name);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col items-center gap-3"
    >
      {/* Circle Badge with elegant white backdrop to display crisp full-color branding logos */}
      <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center bg-white border border-white/20 transition-all duration-500 hover:scale-110 hover:shadow-2xl ${brand.border} ${brand.glow} shadow-md relative overflow-hidden`}>
        {/* Subtle hover soft light overlay */}
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
        
        {/* Logo or Initials */}
        <div className="relative z-10 transform transition-all duration-500 group-hover:scale-105 flex items-center justify-center w-14 h-14 md:w-16 md:h-16">
          {Logo ? (
            <div className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain">
              <Logo size={44} />
            </div>
          ) : (
            <span className="text-base font-bold tracking-wider text-[#1A2660]/75">{initials}</span>
          )}
        </div>
      </div>
      
      {/* Label with dynamic corporate brand color matching on hover */}
      <span className={`text-white/60 text-[10px] md:text-xs font-bold tracking-widest uppercase text-center transition-all duration-300 w-24 truncate ${brand.text}`}>
        {name}
      </span>
    </motion.div>
  );
}

export default function Placements() {
  const [activeTab, setActiveTab] = useState("giants");
  const scrollRef = useRef(null);

  // Horizontal carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const cardsPerView = 3;
  const totalSlides = Math.ceil(dummyPlacements.length / cardsPerView);
  const goNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    const autoSlide = setInterval(goNext, 4000);
    return () => clearInterval(autoSlide);
  }, [totalSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 344, behavior: 'smooth' });
        }
      }
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const scrollLeftBtn = () => scrollRef.current?.scrollBy({ left: -344, behavior: 'smooth' });
  const scrollRightBtn = () => scrollRef.current?.scrollBy({ left: 344, behavior: 'smooth' });

  return (
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#0B112A]">
      {/* Layered Wave Background — dark blue to light blue gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          {/* Layer 1 — lightest, covers most area */}
          <path
            d="M1440,0 L1440,900 L0,900 L0,600 C200,500 400,700 600,580 C800,460 1000,620 1200,500 C1350,420 1420,300 1440,200 Z"
            fill="#F9FAFB"
            opacity="0.2"
          />
          {/* Layer 2 */}
          <path
            d="M1440,0 L1440,900 L0,900 L0,650 C180,540 380,720 580,620 C780,520 960,660 1160,540 C1320,440 1400,350 1440,280 Z"
            fill="#E5E7EB"
            opacity="0.25"
          />
          {/* Layer 3 */}
          <path
            d="M1440,0 L1440,900 L0,900 L0,700 C160,590 360,750 560,660 C760,570 940,700 1120,580 C1290,470 1380,400 1440,360 Z"
            fill="#E5E7EB"
            opacity="0.3"
          />
          {/* Layer 4 */}
          <path
            d="M1440,200 L1440,900 L0,900 L0,740 C200,640 340,780 540,700 C740,620 920,740 1100,620 C1260,520 1370,450 1440,420 Z"
            fill="#D1D5DB"
            opacity="0.35"
          />
          {/* Layer 5 */}
          <path
            d="M1440,300 L1440,900 L0,900 L0,770 C220,680 320,810 520,740 C720,670 900,780 1080,660 C1240,560 1360,500 1440,480 Z"
            fill="#9CA3AF"
            opacity="0.4"
          />
          {/* Layer 6 */}
          <path
            d="M1440,400 L1440,900 L0,900 L0,800 C240,720 300,840 500,780 C700,720 880,820 1060,710 C1220,610 1350,550 1440,540 Z"
            fill="#6B7280"
            opacity="0.45"
          />
          {/* Layer 7 */}
          <path
            d="M1440,500 L1440,900 L0,900 L0,830 C260,760 280,860 480,810 C680,760 860,850 1040,760 C1200,670 1340,600 1440,600 Z"
            fill="#4B5563"
            opacity="0.5"
          />
          {/* Layer 8 — darkest, smallest area */}
          <path
            d="M1440,600 L1440,900 L0,900 L0,860 C280,800 260,880 460,840 C660,800 840,880 1020,810 C1180,740 1330,660 1440,660 Z"
            fill="#374151"
            opacity="1"
          />
        </svg>

        {/* Subtle glowing orbs for depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#2C3A8C] blur-[120px] opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#4A6CC4] blur-[150px] opacity-15 animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        
        {/* Seamless blend guard at the bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#374151] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <SlideIn direction="right">
            <div className="inline-flex items-center gap-3 border border-white/15 text-white/70 text-[11px] font-medium uppercase tracking-[0.35em] px-8 py-3 rounded-full mb-10 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#3EA644]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
              Placements 2025–26
            </div>
          </SlideIn>
          <FadeInUp delay={200}>
            <h2 className="serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
              Our graduates are everywhere{" "}
              <br className="hidden md:block" />
              <span className="italic text-[#D1D5DB] font-serif font-light">
                that matters.
              </span>
            </h2>
          </FadeInUp>
          <FadeInUp delay={400}>
            <p className="text-white/50 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
              Over 120+ industry leaders trust Trident Academy of Technology to source top-tier engineering and management talent.
            </p>
          </FadeInUp>
        </div>

      </div>

      {/* "At a Glance" Style Metrics Dashboard */}
      <div className="relative z-10 w-full mb-16 py-16 lg:py-24 overflow-hidden">
        {/* Slanted Background Blocks */}
        <div className="absolute inset-0 bg-[#D1D5DB] skew-x-[-12deg] scale-125 origin-center shadow-2xl opacity-90" />
        <div className="absolute inset-0 bg-[#E5E7EB] skew-x-[-12deg] scale-125 translate-x-[25%] opacity-50" />
        
        {/* Decorative Wireframe Diamond */}
        <div className="absolute right-[5%] lg:right-[15%] top-1/2 -translate-y-1/2 w-40 h-40 border border-[#1A2660]/15 rotate-45 pointer-events-none hidden md:block" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap lg:flex-nowrap justify-center items-center gap-y-12 lg:gap-y-0">
            {stats.map((s, i) => (
              <FadeInUp key={s.label} delay={200 + i * 100} className="w-full sm:w-1/2 lg:flex-1 flex justify-center">
                <div className={`relative flex flex-col items-center text-center w-full 
                  ${i % 2 !== 0 ? 'sm:border-l sm:border-[#1A2660]/10' : ''} 
                  ${i !== 0 ? 'lg:border-l lg:border-[#1A2660]/10' : ''}
                `}>
                  
                  {/* Icon in Rounded Box */}
                  <div className="w-14 h-14 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center text-[#1A2660] mb-5 shadow-inner">
                    {s.icon}
                  </div>
                  
                  {/* Big Serif Number */}
                  <div className="serif text-5xl lg:text-6xl font-bold mb-3 text-[#1A2660] drop-shadow-sm">
                    <GSAPCounter end={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </div>
                  
                  {/* Small Tracked Label */}
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] md:tracking-[0.3em] text-[#1A2660]/70">
                    {s.label}
                  </div>
                  
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Connecting Line Divider */}
        <div className="flex items-center gap-0 mb-20 mt-2">
          <div className="h-[1.5px] flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <div className="h-[2px] w-24 bg-[#D1D5DB]" />
          <div className="h-[1.5px] flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </div>

        {/* Luminous Section Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6B8FDE]/50 to-transparent mb-16 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-1 bg-[#6B8FDE] blur-md opacity-50"></div>
        </div>

        {/* Dashboard Constellation Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* LEFT: Domain Recruiter Constellation (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D1D5DB] block mb-3">
                Industry Alignments
              </span>
              <h3 className="serif text-3xl font-medium text-white mb-6">
                Recruiter <span className="italic font-light text-[#D1D5DB] font-serif">Networks.</span>
              </h3>

              {/* Central Domain Switcher Selector Tab */}
              <div className="flex flex-wrap p-1 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 max-w-full md:max-w-max gap-1">
                {Object.entries(domains).map(([key, domain]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-3 px-6 text-[10px] md:text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 whitespace-nowrap ${
                      activeTab === key
                        ? "bg-[#D1D5DB] text-[#1A2660] shadow-lg scale-105"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {domain.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Glowing Recruiter Bubble Network */}
            <div className="flex-1 min-h-[380px] flex items-center justify-center lg:pr-8">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center w-full">
                <AnimatePresence mode="wait">
                  {domains[activeTab].companies.map((name) => (
                    <RecruiterCircle key={name} name={name} />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: SVG Chart Dashboard (5 cols) - Glassmorphic Container */}
          <div className="lg:col-span-5 relative flex flex-col justify-between h-full p-8 lg:p-10 bg-gradient-to-br from-[#1E4490]/40 to-[#162F6E]/40 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            {/* Chart Header */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1D5DB] block mb-1">
                Trend Analysis
              </span>
              <h4 className="serif text-2xl font-bold text-white">Year-wise Performance</h4>
              <p className="text-white/50 text-xs font-medium uppercase tracking-wider mt-1">Offers and Recruiter Trends</p>
            </div>

            {/* SVG Graph */}
            <div className="w-full my-8">
              <svg viewBox="0 0 650 350" className="w-full h-auto font-sans" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="offersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E57345" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#E57345" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="recruitersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2E6DB4" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#2E6DB4" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.1" />
                  </filter>
                  <filter id="glowOffers" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="glowRecruiters" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Y-axis Grid Lines & Labels */}
                {[0, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((val) => {
                  const y = 310 - (val / 900) * 270;
                  return (
                    <g key={val}>
                      <line x1="35" y1={y} x2="630" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                      <text x="25" y={y + 4} fill="rgba(255,255,255,0.4)" fontSize="11" textAnchor="end" fontWeight="700">{val}</text>
                    </g>
                  );
                })}

                {/* X-axis Labels */}
                {["2020-21", "2021-22", "2022-23", "2023-24", "2024-25"].map((year, i) => {
                  const x = 60 + (540 / 4) * i;
                  return (
                    <text key={year} x={x} y="335" fill="rgba(255,255,255,0.6)" fontSize="13" textAnchor="middle" fontWeight="bold">
                      {year}
                    </text>
                  );
                })}

                <style dangerouslySetInnerHTML={{__html: `
                  @keyframes drawGraphLine {
                    to { stroke-dashoffset: 0; }
                  }
                  @keyframes fadePoint {
                    to { opacity: 1; transform: translateY(0); }
                  }
                  .svg-path-anim {
                    stroke-dasharray: 2000;
                    stroke-dashoffset: 2000;
                    animation: drawGraphLine 2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                  }
                  .svg-point-anim {
                    opacity: 0;
                    transform: translateY(10px);
                    animation: fadePoint 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
                  }
                `}} />

                {/* Offers Area Gradient */}
                <path
                  className="svg-path-anim"
                  d="M 60,169.6 L 195,61.9 L 330,139.6 L 465,112.6 L 600,108.4 L 600,310 L 60,310 Z"
                  fill="url(#offersGrad)"
                  style={{ animationDelay: '0.1s' }}
                />

                {/* Recruiters Area Gradient */}
                <path
                  className="svg-path-anim"
                  d="M 60,276.4 L 195,230.5 L 330,273.4 L 465,272.8 L 600,274.0 L 600,310 L 60,310 Z"
                  fill="url(#recruitersGrad)"
                  style={{ animationDelay: '0.3s' }}
                />

                {/* Offers Line (Orange) */}
                <path
                  className="svg-path-anim"
                  d="M 60,169.6 L 195,61.9 L 330,139.6 L 465,112.6 L 600,108.4"
                  fill="none"
                  stroke="#E57345"
                  strokeWidth="4"
                  filter="url(#shadow)"
                  style={{ animationDelay: '0.2s' }}
                />

                {/* Recruiters Line (Blue) */}
                <path
                  className="svg-path-anim"
                  d="M 60,276.4 L 195,230.5 L 330,273.4 L 465,272.8 L 600,274.0"
                  fill="none"
                  stroke="#2E6DB4"
                  strokeWidth="4"
                  filter="url(#shadow)"
                  style={{ animationDelay: '0.4s' }}
                />

                {/* Offers Data Points */}
                {[
                  { x: 60, y: 169.6, val: 468 },
                  { x: 195, y: 61.9, val: 827 },
                  { x: 330, y: 139.6, val: 568 },
                  { x: 465, y: 112.6, val: 658 },
                  { x: 600, y: 108.4, val: 672 },
                ].map((pt, i) => (
                  <g key={`offer-${i}`} className="svg-point-anim" style={{ animationDelay: `${0.6 + i * 0.2}s` }}>
                    <circle cx={pt.x} cy={pt.y} r="6" fill="#E57345" stroke="#1A2660" strokeWidth="2.5" filter="url(#shadow)" />
                    <text x={pt.x} y={pt.y - 14} fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="800">
                      {pt.val}
                    </text>
                  </g>
                ))}

                {/* Recruiters Data Points */}
                {[
                  { x: 60, y: 276.4, val: 112 },
                  { x: 195, y: 230.5, val: 265 },
                  { x: 330, y: 273.4, val: 122 },
                  { x: 465, y: 272.8, val: 124 },
                  { x: 600, y: 274.0, val: 120 },
                ].map((pt, i) => (
                  <g key={`recruiter-${i}`} className="svg-point-anim" style={{ animationDelay: `${0.6 + i * 0.2}s` }}>
                    <circle cx={pt.x} cy={pt.y} r="6" fill="#2E6DB4" stroke="#1A2660" strokeWidth="2.5" filter="url(#shadow)" />
                    <text x={pt.x} y={pt.y - 14} fill="#ffffff" fontSize="12" textAnchor="middle" fontWeight="800">
                      {pt.val}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-8 border-t border-white/10 pt-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-1.5 rounded-full" style={{ background: '#2E6DB4' }} />
                <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Recruiters</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-1.5 rounded-full" style={{ background: '#E57345' }} />
                <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Offers Secured</span>
              </div>
            </div>
          </div>

        </div>

        {/* Student Placements — Infinite Loop Carousel */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll-cards {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .cards-track {
            will-change: transform;
            backface-visibility: hidden;
          }
          .cards-carousel:hover .cards-track {
            animation-play-state: paused !important;
          }
        `}} />

        <div className="text-center mb-14">
          <FadeInUp delay={600}>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D1D5DB] to-transparent mx-auto mb-6 opacity-80" />
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-[#D1D5DB] mb-2 block" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              Where Our Students Work
            </span>
            <h3 className="serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 drop-shadow-xl" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
              Success <span className="italic font-light text-[#D1D5DB] font-serif">Stories.</span>
            </h3>
          </FadeInUp>
        </div>

        <FadeInUp delay={650}>
          <div className="relative cards-carousel">
            {/* Left & right gradient masks */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0B112A] to-transparent z-30 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0B112A] to-transparent z-30 pointer-events-none" />

            <div className="overflow-hidden">
              <div
                className="cards-track flex gap-6"
                style={{ animation: 'scroll-cards 90s linear infinite', width: 'max-content' }}
              >
                {[...dummyPlacements, ...dummyPlacements].map((student, i) => (
                  <div key={i} className="flex-shrink-0">
                    <AlumniCard alumni={student} imagePrefix="/alumni/B.Tech/" index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={800}>
          <div className="text-center mt-16">
            <a href="https://placement-tat.tekkzy.com" className="group relative inline-flex items-center gap-4 pl-8 pr-2.5 py-2.5 rounded-full text-[11px] md:text-[12px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 active:scale-95 overflow-hidden bg-white/80 backdrop-blur-sm border border-[#1A2660]/20 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-8px_rgba(26,38,96,0.6)] text-[#1A2660] hover:text-white">
              {/* Hover fill background */}
              <div className="absolute inset-0 w-full h-full translate-y-[101%] rounded-full transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-y-0 bg-[#1A2660]" />
              
              {/* Shine sweep effect */}
              <div className="absolute inset-0 w-[200%] h-full -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[50%] z-10" />

              <span className="relative z-10 transition-colors duration-500">
                View Full Placement Report
              </span>
              
              {/* Dual Arrow Animation Container */}
              <div className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 bg-[#1A2660]/10 group-hover:bg-white/20">
                 <ArrowRight size={15} strokeWidth={2.5} className="absolute transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-[150%] group-hover:opacity-0 group-hover:text-white" />
                 <ArrowRight size={15} strokeWidth={2.5} className="absolute -translate-x-[150%] opacity-0 text-white transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </a>
          </div>
        </FadeInUp>

      </div>

    </section>
  );
}
