import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Inline SVG logos — pixel-perfect recreations of uploaded images
   ───────────────────────────────────────────────────────────────── */

function AICTELogo({ size = 64 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-label="AICTE">
      {/* Gear teeth */}
      {Array.from({ length: 18 }).map((_, i) => {
        const a = (i / 18) * Math.PI * 2;
        const cx = 60 + 51 * Math.cos(a), cy = 60 + 51 * Math.sin(a);
        return (
          <rect key={i} x={cx - 4} y={cy - 7} width="8" height="14" rx="2"
            fill="#F5A623" transform={`rotate(${(i / 18) * 360}, ${cx}, ${cy})`} />
        );
      })}
      {/* Gear body */}
      <circle cx="60" cy="60" r="43" fill="#F5A623" />
      <circle cx="60" cy="60" r="36" fill="white" />
      {/* Inner blue-red circle */}
      <circle cx="60" cy="60" r="30" fill="#1B4BAB" />
      <circle cx="60" cy="60" r="23" fill="#CC2929" />
      {/* White cross/triforce in red circle - simplified */}
      <circle cx="60" cy="54" r="5" fill="white" opacity="0.9" />
      <circle cx="52" cy="66" r="5" fill="white" opacity="0.9" />
      <circle cx="68" cy="66" r="5" fill="white" opacity="0.9" />
      {/* AICTE label */}
      <text x="60" y="96" textAnchor="middle" fill="#3B2200" fontSize="7.5"
        fontWeight="900" fontFamily="Arial, sans-serif" letterSpacing="0.8">AICTE</text>
      {/* Arc text */}
      <path id="at1" d="M22,58 a38,38 0 0,1 76,0" fill="none" />
      <text fontSize="5.2" fontWeight="700" fontFamily="Arial" fill="#3B2200">
        <textPath href="#at1" startOffset="6%">All India Council for Technical Education</textPath>
      </text>
    </svg>
  );
}

function NBALogo({ size = 80 }) {
  return (
    <svg viewBox="0 0 140 100" width={size * 1.4} height={size} aria-label="NBA">
      {/* Outer frame */}
      <rect x="3" y="3" width="134" height="94" rx="6" fill="none"
        stroke="#003580" strokeWidth="4" />
      <rect x="9" y="9" width="122" height="82" rx="4" fill="none"
        stroke="#003580" strokeWidth="1.5" />
      {/* NBA letters */}
      <text x="14" y="82" fill="#003580" fontSize="76" fontWeight="900"
        fontFamily="Arial Black, sans-serif" letterSpacing="-3">NBA</text>
      {/* Tagline */}
      <text x="70" y="95" textAnchor="middle" fill="#003580" fontSize="6.5"
        fontWeight="700" fontFamily="Arial" letterSpacing="0.8">
        NATIONAL BOARD OF ACCREDITATION
      </text>
    </svg>
  );
}

function NAACLogo({ size = 64 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-label="NAAC">
      <defs>
        <path id="nt" d="M8,60 a52,52 0 0,1 104,0" />
        <path id="nb" d="M12,65 a48,48 0 0,0 96,0" />
      </defs>
      {/* Outer red circle */}
      <circle cx="60" cy="60" r="58" fill="#B91C1C" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="#7F1D1D" strokeWidth="1.2" />
      {/* Arc text top */}
      <text fontSize="6" fontWeight="800" fontFamily="Arial" fill="white">
        <textPath href="#nt" startOffset="4%">NATIONAL ASSESSMENT AND ACCREDITATION COUNCIL</textPath>
      </text>
      {/* Arc text bottom */}
      <text fontSize="5.5" fontWeight="700" fontFamily="Arial" fill="white">
        <textPath href="#nb" startOffset="8%">EXCELLENCE • CREDIBILITY • RELEVANCE</textPath>
      </text>
      {/* Inner circle */}
      <circle cx="60" cy="57" r="36" fill="#991B1B" />
      {/* India silhouette (simplified) */}
      <path
        d="M60 30C52 30 44 36 42 44C40 52 44 56 44 62C44 68 42 74 44 78C46 82 52 86 60 86C68 86 74 82 76 78C78 74 76 68 76 62C76 56 80 52 78 44C76 36 68 30 60 30Z"
        fill="white" opacity="0.92" />
      {/* Diamond badge with Q */}
      <rect x="51" y="48" width="18" height="18" rx="2" fill="#1C1C1C"
        transform="rotate(45 60 57)" />
      <text x="60" y="62" textAnchor="middle" fill="white" fontSize="12"
        fontWeight="900" fontFamily="serif">Q</text>
      {/* NAAC bottom label */}
      <text x="60" y="106" textAnchor="middle" fill="white" fontSize="9.5"
        fontWeight="900" fontFamily="Arial" letterSpacing="3">NAAC</text>
    </svg>
  );
}

function DSIRLogo({ size = 64 }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-label="DSIR SIRO">
      <defs>
        <path id="dt" d="M10,57 a50,50 0 0,1 100,0" />
        <path id="db" d="M14,65 a46,46 0 0,0 92,0" />
      </defs>
      {/* Outer circle */}
      <circle cx="60" cy="60" r="57" fill="white" stroke="#1D3461" strokeWidth="3.5" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="#1D3461" strokeWidth="1" />
      {/* Arc texts */}
      <text fontSize="5.5" fontWeight="700" fontFamily="Arial" fill="#1D3461">
        <textPath href="#dt" startOffset="2%">DEPARTMENT OF SCIENTIFIC &amp; INDUSTRIAL RESEARCH, GOVT. OF INDIA</textPath>
      </text>
      {/* Ashoka emblem area */}
      <circle cx="60" cy="47" r="17" fill="#F5EEEC" stroke="#1D3461" strokeWidth="1.5" />
      {/* Ashoka wheel spokes */}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <line key={i}
            x1={60 + 6 * Math.cos(a)} y1={47 + 6 * Math.sin(a)}
            x2={60 + 14 * Math.cos(a)} y2={47 + 14 * Math.sin(a)}
            stroke="#1D3461" strokeWidth="0.85" />
        );
      })}
      <circle cx="60" cy="47" r="6" fill="#1D3461" opacity="0.2" />
      <circle cx="60" cy="47" r="3" fill="#1D3461" />
      <circle cx="60" cy="47" r="14" fill="none" stroke="#1D3461" strokeWidth="1" />
      {/* DSIR pill */}
      <rect x="33" y="68" width="54" height="16" rx="3" fill="#1D3461" />
      <text x="60" y="80.5" textAnchor="middle" fill="white" fontSize="10.5"
        fontWeight="900" fontFamily="Arial" letterSpacing="2.5">DSIR</text>
      {/* RECOGNIZED */}
      <text x="60" y="97" textAnchor="middle" fill="#1D3461" fontSize="6"
        fontWeight="700" fontFamily="Arial" letterSpacing="1">RECOGNIZED</text>
      {/* Stars */}
      <text x="28" y="98" fill="#1D3461" fontSize="6.5">★</text>
      <text x="85" y="98" fill="#1D3461" fontSize="6.5">★</text>
      {/* SIRO */}
      <text x="60" y="110" textAnchor="middle" fill="#1D3461" fontSize="9"
        fontWeight="900" fontFamily="Arial" letterSpacing="3.5">SIRO</text>
    </svg>
  );
}

function ISOLogo({ size = 72 }) {
  return (
    <svg viewBox="0 0 120 80" width={size * 1.5} height={size} aria-label="ISO 9001:2015">
      {/* ISO big text */}
      <text x="60" y="58" textAnchor="middle" fill="#003E8A" fontSize="58"
        fontWeight="900" fontFamily="Arial Black, sans-serif" letterSpacing="4">ISO</text>
      {/* Rule */}
      <line x1="4" y1="63" x2="116" y2="63" stroke="#003E8A" strokeWidth="2.5" />
      <line x1="4" y1="67" x2="116" y2="67" stroke="#003E8A" strokeWidth="1" />
      {/* Number */}
      <text x="60" y="78" textAnchor="middle" fill="#374151" fontSize="9"
        fontWeight="800" fontFamily="Arial" letterSpacing="2">9001 : 2015</text>
    </svg>
  );
}

function HESILogo({ size = 54 }) {
  return (
    <svg viewBox="0 0 220 70" width={220 * (size / 70)} height={size} aria-label="HESI">
      {/* Left laurel */}
      <path d="M10 55 C6 46 7 35 13 26 C15 31 14 42 10 55Z" fill="#4ADE80" />
      <path d="M16 52 C11 43 12 30 20 22 C22 29 19 41 16 52Z" fill="#22C55E" />
      {/* Right laurel */}
      <path d="M54 55 C58 46 57 35 51 26 C49 31 50 42 54 55Z" fill="#4ADE80" />
      <path d="M48 52 C53 43 52 30 44 22 C42 29 45 41 48 52Z" fill="#22C55E" />
      {/* Drop shape */}
      <path d="M32 4 C23 16 15 26 15 37 C15 49 23 57 32 57 C41 57 49 49 49 37 C49 26 41 16 32 4Z"
        fill="#0EA5E9" />
      {/* Grad cap square */}
      <rect x="20" y="32" width="24" height="18" rx="3" fill="white" opacity="0.95" />
      {/* Cap triangle */}
      <polygon points="32,22 20,32 44,32" fill="white" opacity="0.95" />
      <circle cx="32" cy="22" r="2.5" fill="#0EA5E9" />
      {/* HESI text */}
      <text x="70" y="48" fill="#0369A1" fontSize="42" fontWeight="900"
        fontFamily="Arial Black, sans-serif" letterSpacing="-1">HESI</text>
      {/* Subtitle */}
      <text x="70" y="58" fill="#475569" fontSize="7.5" fontWeight="600"
        fontFamily="Arial">Higher Education</text>
      <text x="70" y="68" fill="#475569" fontSize="7.5" fontWeight="600"
        fontFamily="Arial">Sustainability Initiative</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Data
   ───────────────────────────────────────────────────────────────── */
const items = [
  {
    id: "aicte", label: "Approved By", name: "AICTE",
    full: "All India Council for Technical Education",
    Logo: AICTELogo, accent: "#D97706",
  },
  {
    id: "nba", label: "Accredited By", name: "NBA",
    full: "National Board of Accreditation",
    Logo: NBALogo, accent: "#003580",
  },
  {
    id: "naac", label: "Accredited By", name: "NAAC",
    full: "National Assessment & Accreditation Council",
    Logo: NAACLogo, accent: "#B91C1C",
  },
  {
    id: "dsir", label: "DSIR SIRO Center", name: "DSIR SIRO",
    full: "Dept. of Scientific & Industrial Research",
    Logo: DSIRLogo, accent: "#1D3461",
  },
  {
    id: "iso", label: "ISO Certified", name: "ISO 9001:2015",
    full: "International Organisation for Standardisation",
    Logo: ISOLogo, accent: "#003E8A",
  },
  {
    id: "hesi", label: "Member Of", name: "HESI",
    full: "Higher Education Sustainability Initiative",
    Logo: HESILogo, accent: "#0369A1",
  },
];

/* ─────────────────────────────────────────────────────────────────
   Card
   ───────────────────────────────────────────────────────────────── */
function Card({ item, index }) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVis(true), index * 100 + 120);
    return () => clearTimeout(t);
  }, [index]);

  return (
    <div
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.45s ease ${index * 0.08}s, transform 0.45s ease ${index * 0.08}s`,
      }}
      className="group flex flex-col items-center bg-white rounded-2xl px-5 py-6 border border-[#EDE4DC] hover:border-[#C9B8AC] hover:shadow-[0_8px_32px_-8px_rgba(62,58,54,0.12)] transition-all duration-300"
      role="article" aria-label={item.full}
    >
      {/* Label pill */}
      <span
        className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4"
        style={{ color: item.accent, background: item.accent + "14" }}
      >
        {item.label}
      </span>

      {/* Logo */}
      <div className="flex items-center justify-center h-[68px] w-full mb-4 group-hover:scale-[1.04] transition-transform duration-300">
        <item.Logo size={60} />
      </div>

      {/* Divider */}
      <div className="w-full h-px mb-3" style={{ background: `linear-gradient(to right, transparent, ${item.accent}30, transparent)` }} />

      {/* Name + full name */}
      <div className="text-center">
        <div className="font-bold text-[13px] text-[#1A1817] leading-tight">{item.name}</div>
        <div className="text-[9.5px] text-[#9A8C82] font-medium mt-1 leading-snug">{item.full}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Section
   ───────────────────────────────────────────────────────────────── */
export default function Accreditations() {
  return (
    <section
      id="accreditations"
      aria-label="Accreditations and Recognitions"
      className="py-16 bg-white border-bottom border-soft mt-8"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Centered Heading */}
        <div className="flex justify-center items-center gap-5 mb-10 w-full">
          <div className="flex-1 h-px bg-[#EAE0D5]" />
          <div className="flex items-center gap-2.5">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L1.5 3.5V7C1.5 10.15 3.9 13.1 7 14C10.1 13.1 12.5 10.15 12.5 7V3.5L7 1Z" fill="#333" opacity="0.8" />
            </svg>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#333] whitespace-nowrap">
              Accreditations &amp; Recognitions
            </p>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L1.5 3.5V7C1.5 10.15 3.9 13.1 7 14C10.1 13.1 12.5 10.15 12.5 7V3.5L7 1Z" fill="#333" opacity="0.8" />
            </svg>
          </div>
          <div className="flex-1 h-px bg-[#EAE0D5]" />
        </div>

        {/* 6-card grid forced into a single row on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, i) => (
            <Card key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
