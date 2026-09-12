/**
 * Accurate inline SVG logos for all 40+ placement companies.
 * Each logo is a React component returning an <svg> element.
 * Colors match official brand guidelines.
 */

export const logos = {

  TCS: ({ size = 48 }) => (
    <svg viewBox="0 0 120 48" width={size * 2.5} height={size} aria-label="TCS">
      <text x="0" y="40" fontFamily="Arial Black, sans-serif" fontWeight="900"
        fontSize="40" fill="#003366" letterSpacing="-1">TCS</text>
    </svg>
  ),

  Infosys: ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Infosys">
      {/* Colored bar accent */}
      <rect x="0" y="38" width="20" height="4" fill="#FA6804" rx="1" />
      <rect x="22" y="38" width="20" height="4" fill="#004B8D" rx="1" />
      <rect x="44" y="38" width="20" height="4" fill="#2DAA4F" rx="1" />
      <text x="0" y="33" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="28" fill="#004B8D" letterSpacing="0.5">infosys</text>
    </svg>
  ),

  Wipro: ({ size = 44 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="Wipro">
      {/* Wipro flower/circle mark */}
      <circle cx="22" cy="25" r="20" fill="none" stroke="#7B2D8B" strokeWidth="3" />
      {[0,60,120,180,240,300].map((a, i) => {
        const r = a * Math.PI / 180;
        const x = 22 + 12 * Math.cos(r), y = 25 + 12 * Math.sin(r);
        const colors = ["#F7941D","#A0C42A","#00AEEF","#7B2D8B","#ED1C24","#00A651"];
        return <circle key={i} cx={x} cy={y} r="5" fill={colors[i]} />;
      })}
      <circle cx="22" cy="25" r="4" fill="white" />
      <text x="48" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900"
        fontSize="26" fill="#7B2D8B" letterSpacing="1">WIPRO</text>
    </svg>
  ),

  HCL: ({ size = 44 }) => (
    <svg viewBox="0 0 100 50" width={size * 2} height={size} aria-label="HCL">
      <rect x="0" y="0" width="96" height="48" rx="6" fill="#0077B5" />
      <text x="12" y="36" fontFamily="Arial Black, sans-serif" fontWeight="900"
        fontSize="30" fill="white" letterSpacing="2">HCL</text>
    </svg>
  ),

  Capgemini: ({ size = 40 }) => (
    <svg viewBox="0 0 220 50" width={size * 4.4} height={size} aria-label="Capgemini">
      {/* Blue C-arc */}
      <path d="M22 8 A18 18 0 1 0 22 42" fill="none" stroke="#0070AD" strokeWidth="7" strokeLinecap="round" />
      <text x="50" y="36" fontFamily="Arial, sans-serif" fontWeight="bold"
        fontSize="28" fill="#0070AD">capgemini</text>
    </svg>
  ),

  Accenture: ({ size = 40 }) => (
    <svg viewBox="0 0 210 56" width={size * 3.75} height={size} aria-label="Accenture">
      <text x="0" y="40" fontFamily="Arial, sans-serif" fontWeight="bold"
        fontSize="28" fill="#A100FF">Accenture</text>
      {/* > arrow */}
      <polygon points="192,12 202,28 192,44" fill="#A100FF" />
    </svg>
  ),

  Cognizant: ({ size = 40 }) => (
    <svg viewBox="0 0 220 50" width={size * 4.4} height={size} aria-label="Cognizant">
      {/* Blue circle */}
      <circle cx="22" cy="25" r="18" fill="#0033A0" />
      <circle cx="22" cy="25" r="11" fill="#00B5E2" />
      <circle cx="22" cy="25" r="5" fill="white" />
      <text x="48" y="34" fontFamily="Arial, sans-serif" fontWeight="bold"
        fontSize="22" fill="#0033A0">Cognizant</text>
    </svg>
  ),

  "Tech Mahindra": ({ size = 40 }) => (
    <svg viewBox="0 0 240 56" width={size * 4.3} height={size} aria-label="Tech Mahindra">
      {/* M rising bars */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={4+i*8} y={36-(i<3?i*8:(4-i)*8)} width="5"
          height={8+(i<3?i*8:(4-i)*8)} fill="#C8102E" rx="1" />
      ))}
      <text x="50" y="36" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="20" fill="#C8102E">Tech Mahindra</text>
    </svg>
  ),

  "L&T Infotech": ({ size = 40 }) => (
    <svg viewBox="0 0 230 56" width={size * 4.1} height={size} aria-label="LTIMindtree">
      <rect x="0" y="8" width="44" height="34" rx="4" fill="#007A4D" />
      <text x="6" y="32" fontFamily="Arial Black" fontWeight="900"
        fontSize="18" fill="white">LTI</text>
      <text x="52" y="25" fontFamily="Arial, sans-serif" fontWeight="800"
        fontSize="14" fill="#007A4D">Mindtree</text>
      <text x="52" y="42" fontFamily="Arial, sans-serif" fontWeight="600"
        fontSize="11" fill="#555">a Larsen & Toubro Group Company</text>
    </svg>
  ),

  IBM: ({ size = 40 }) => (
    <svg viewBox="0 0 120 44" width={size * 3} height={size} aria-label="IBM">
      {/* IBM striped letters */}
      {"IBM".split("").map((letter, li) => (
        <g key={li} transform={`translate(${li * 38}, 0)`}>
          <text x="0" y="38" fontFamily="Arial Black, sans-serif" fontWeight="900"
            fontSize="42" fill="#1F70C1">{letter}</text>
          {/* stripes */}
          {[12,20,28].map(y => (
            <rect key={y} x={0} y={y} width="34" height="3.5" fill="white" />
          ))}
        </g>
      ))}
    </svg>
  ),

  Hexaware: ({ size = 40 }) => (
    <svg viewBox="0 0 200 50" width={size * 4} height={size} aria-label="Hexaware">
      {/* Hex shape */}
      <polygon points="16,5 30,5 38,18 30,31 16,31 8,18" fill="#E31837" />
      <text x="46" y="34" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="24" fill="#1A1A1A">Hexaware</text>
    </svg>
  ),

  Mphasis: ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Mphasis">
      {/* M letter mark */}
      <path d="M4 38 L4 12 L16 28 L28 12 L28 38" fill="none" stroke="#E31837" strokeWidth="4" strokeLinejoin="round" />
      <text x="36" y="34" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="24" fill="#1A1A1A">phasis</text>
    </svg>
  ),

  Amazon: ({ size = 40 }) => (
    <svg viewBox="0 0 180 56" width={size * 3.2} height={size} aria-label="Amazon">
      <text x="0" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900"
        fontSize="32" fill="#1A1A1A" letterSpacing="-0.5">amazon</text>
      {/* Arrow underline */}
      <path d="M4 44 Q88 58 164 44" fill="none" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" />
      <polygon points="156,38 168,44 156,50" fill="#FF9900" />
    </svg>
  ),

  Microsoft: ({ size = 40 }) => (
    <svg viewBox="0 0 210 48" width={size * 4.4} height={size} aria-label="Microsoft">
      {/* 4-square Windows logo */}
      <rect x="0"  y="0"  width="18" height="18" fill="#F25022" rx="1" />
      <rect x="20" y="0"  width="18" height="18" fill="#7FBA00" rx="1" />
      <rect x="0"  y="20" width="18" height="18" fill="#00A4EF" rx="1" />
      <rect x="20" y="20" width="18" height="18" fill="#FFB900" rx="1" />
      <text x="48" y="32" fontFamily="Segoe UI, Arial, sans-serif" fontWeight="600"
        fontSize="26" fill="#737373" letterSpacing="0.3">Microsoft</text>
    </svg>
  ),

  Google: ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Google">
      <text x="0" y="38" fontFamily="Product Sans, Arial, sans-serif" fontWeight="700" fontSize="40">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">l</tspan>
        <tspan fill="#EA4335">e</tspan>
      </text>
    </svg>
  ),

  "Goldman Sachs": ({ size = 40 }) => (
    <svg viewBox="0 0 220 50" width={size * 4.4} height={size} aria-label="Goldman Sachs">
      <rect x="0" y="0" width="218" height="48" rx="3" fill="#1B2C6B" />
      <text x="10" y="20" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="13" fill="white" letterSpacing="1">GOLDMAN</text>
      <text x="10" y="40" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="13" fill="white" letterSpacing="1">SACHS</text>
    </svg>
  ),

  "JP Morgan": ({ size = 40 }) => (
    <svg viewBox="0 0 200 50" width={size * 4} height={size} aria-label="JP Morgan">
      {/* Blue octagon */}
      <polygon points="14,4 30,4 38,14 38,34 30,44 14,44 6,34 6,14" fill="#003087" />
      <text x="13" y="29" fontFamily="Arial Black" fontWeight="900"
        fontSize="13" fill="white">JP</text>
      <text x="46" y="20" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="14" fill="#003087">JPMORGAN</text>
      <text x="46" y="38" fontFamily="Arial, sans-serif" fontWeight="400"
        fontSize="12" fill="#555" letterSpacing="0.8">CHASE & CO.</text>
    </svg>
  ),

  "Morgan Stanley": ({ size = 40 }) => (
    <svg viewBox="0 0 240 50" width={size * 4.8} height={size} aria-label="Morgan Stanley">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="15" fill="#002D62" letterSpacing="1.5">MORGAN STANLEY</text>
      <line x1="0" y1="28" x2="238" y2="28" stroke="#1A5C9A" strokeWidth="2.5" />
      <text x="0" y="44" fontFamily="Arial, sans-serif" fontWeight="400"
        fontSize="11" fill="#555" letterSpacing="2">WEALTH  MANAGEMENT</text>
    </svg>
  ),

  Deloitte: ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Deloitte">
      <text x="0" y="38" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="32" fill="#1A1A1A" letterSpacing="-0.5">Deloitte</text>
      {/* Green dot */}
      <circle cx="120" cy="30" r="5" fill="#86BC25" />
    </svg>
  ),

  Atlassian: ({ size = 40 }) => (
    <svg viewBox="0 0 210 50" width={size * 4.2} height={size} aria-label="Atlassian">
      {/* A-shape mark */}
      <path d="M14 38 C8 24 10 14 20 8 C20 8 26 22 16 38Z" fill="#2684FF" />
      <path d="M20 8 C30 14 32 24 26 38 L16 38 C26 22 20 8 20 8Z" fill="#0052CC" />
      <text x="36" y="34" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="22" fill="#0052CC">Atlassian</text>
    </svg>
  ),

  Persistent: ({ size = 40 }) => (
    <svg viewBox="0 0 230 50" width={size * 4.6} height={size} aria-label="Persistent">
      {/* P hexagon */}
      <polygon points="16,4 28,4 34,14 28,26 16,26 10,14" fill="#FF5E00" />
      <text x="9" y="20" fontFamily="Arial Black" fontWeight="900"
        fontSize="13" fill="white">P</text>
      <text x="42" y="30" fontFamily="Arial, sans-serif" fontWeight="800"
        fontSize="19" fill="#1B4FBF">PERSISTENT</text>
    </svg>
  ),

  Mindtree: ({ size = 40 }) => (
    <svg viewBox="0 0 200 50" width={size * 4} height={size} aria-label="Mindtree">
      {/* Tree circles */}
      <circle cx="20" cy="16" r="10" fill="#009900" opacity="0.85" />
      <circle cx="32" cy="22" r="8" fill="#009900" opacity="0.65" />
      <rect x="21" y="26" width="4" height="14" rx="2" fill="#7B4F2E" />
      <text x="44" y="32" fontFamily="Arial, sans-serif" fontWeight="700"
        fontSize="20" fill="#1A1A1A">mindtree</text>
    </svg>
  ),

  Oracle: ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Oracle">
      {/* Red ellipse */}
      <ellipse cx="22" cy="25" rx="20" ry="14" fill="#F80000" />
      <ellipse cx="22" cy="25" rx="12" ry="8" fill="white" />
      <text x="48" y="34" fontFamily="Arial, sans-serif" fontWeight="900"
        fontSize="26" fill="#F80000">ORACLE</text>
    </svg>
  ),

  SAP: ({ size = 40 }) => (
    <svg viewBox="0 0 110 50" width={size * 2.2} height={size} aria-label="SAP">
      <rect x="0" y="0" width="108" height="48" rx="5" fill="#00A3E0" />
      <text x="8" y="36" fontFamily="Arial Black, sans-serif" fontWeight="900"
        fontSize="36" fill="white" letterSpacing="1">SAP</text>
    </svg>
  ),

  /* ───── Newly Added Colorful Company Logos ───── */

  Flipkart: ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="Flipkart">
      <rect x="5" y="5" width="38" height="38" rx="8" fill="#2874F0" />
      <path d="M12 18 L36 18 C36 18 36 34 24 34 C12 34 12 18 12 18 Z" fill="#FFE11B" />
      <circle cx="24" cy="25" r="3" fill="#2874F0" />
      <path d="M19 25 Q24 30 29 25" stroke="#2874F0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <text x="50" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#2874F0">Flipkart</text>
    </svg>
  ),

  PhonePe: ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="PhonePe">
      <rect x="5" y="5" width="38" height="38" rx="8" fill="#5f259f" />
      <path d="M18 13 C18 13 26 13 26 21 C26 29 18 29 18 29 L18 35" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="21" cy="21" r="2.5" fill="white" />
      <text x="50" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="21" fill="#5f259f">PhonePe</text>
    </svg>
  ),

  Zepto: ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="Zepto">
      <text x="5" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="30" fill="#5c14ab">zepto</text>
      <polygon points="98,12 112,12 104,24 116,24 100,42 106,28 96,28" fill="#FF6B35" />
    </svg>
  ),

  Paytm: ({ size = 40 }) => (
    <svg viewBox="0 0 140 50" width={size * 2.8} height={size} aria-label="Paytm">
      <text x="0" y="35" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="34">
        <tspan fill="#00b9f1">pay</tspan>
        <tspan fill="#002970">tm</tspan>
      </text>
    </svg>
  ),

  Siemens: ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="Siemens">
      <text x="5" y="36" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="28" fill="#00828A" letterSpacing="0.5">SIEMENS</text>
    </svg>
  ),

  "Schneider Electric": ({ size = 40 }) => (
    <svg viewBox="0 0 240 50" width={size * 4.8} height={size} aria-label="Schneider Electric">
      <rect x="5" y="10" width="30" height="30" rx="3" fill="#3DCD58" />
      <path d="M12 25 L20 17 L28 25 L20 33 Z" fill="white" />
      <text x="45" y="32" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="18" fill="#3DCD58">Schneider</text>
      <text x="135" y="32" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="18" fill="#3E3A36">Electric</text>
    </svg>
  ),

  "ABB India": ({ size = 40 }) => (
    <svg viewBox="0 0 130 50" width={size * 2.6} height={size} aria-label="ABB">
      {["A", "B", "B"].map((char, i) => (
        <g key={i} transform={`translate(${i * 34}, 6)`}>
          <rect x="0" y="0" width="30" height="36" fill="#FF0000" />
          <text x="6" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="white">{char}</text>
        </g>
      ))}
    </svg>
  ),

  "Bosch India": ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="Bosch">
      <circle cx="22" cy="25" r="16" fill="none" stroke="#E30613" strokeWidth="4" />
      <rect x="12" y="22" width="20" height="6" fill="#005691" />
      <text x="46" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#1A1A1A">BOSCH</text>
    </svg>
  ),

  "Tata Power": ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Tata Power">
      <circle cx="22" cy="25" r="16" fill="#00A4EF" />
      <path d="M14 17 L30 17 M22 17 L22 33" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <text x="46" y="27" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="#1A1A1A">TATA</text>
      <text x="46" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#00A4EF">POWER</text>
    </svg>
  ),

  "JSW Steel": ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="JSW Steel">
      <path d="M10 10 L22 10 Q28 18 20 28 Q14 36 6 22 Z" fill="#002D62" />
      <path d="M22 10 Q34 14 30 28 Q24 38 12 38 Z" fill="#FF0000" />
      <text x="38" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#002D62">JSW</text>
      <text x="38" y="42" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="12" fill="#FF0000">Steel</text>
    </svg>
  ),

  "L&T Construction": ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="L&T Construction">
      <rect x="5" y="5" width="38" height="38" rx="4" fill="#1A1A1A" />
      <text x="10" y="32" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#FDB913">L&T</text>
      <text x="50" y="27" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="16" fill="#1A1A1A">Larsen & Toubro</text>
      <text x="50" y="42" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="11" fill="#777">Construction</text>
    </svg>
  ),

  "Godrej & Boyce": ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="Godrej & Boyce">
      <text x="5" y="34" fontFamily="Georgia, serif" fontWeight="900" fontSize="30" fill="#C41E3A" italic="true">Godrej</text>
    </svg>
  ),

  "HDFC Bank": ({ size = 40 }) => (
    <svg viewBox="0 0 180 50" width={size * 3.6} height={size} aria-label="HDFC Bank">
      <rect x="5" y="10" width="30" height="30" fill="#004C8F" rx="3" />
      <rect x="12" y="17" width="16" height="16" fill="white" />
      <rect x="16" y="21" width="8" height="8" fill="#FF0000" />
      <text x="42" y="28" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="#004C8F">HDFC BANK</text>
      <text x="42" y="42" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="10" fill="#777" letterSpacing="0.5">We understand your world</text>
    </svg>
  ),

  "ICICI Bank": ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="ICICI Bank">
      <circle cx="22" cy="25" r="16" fill="#F37021" />
      <path d="M16 25 H28 M22 17 V33" stroke="white" strokeWidth="3" />
      <text x="44" y="30" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="18" fill="#7A2500">ICICI Bank</text>
    </svg>
  ),

  "Axis Bank": ({ size = 40 }) => (
    <svg viewBox="0 0 160 50" width={size * 3.2} height={size} aria-label="Axis Bank">
      <polygon points="22,6 38,38 6,38" fill="#841439" />
      <polygon points="22,14 32,34 12,34" fill="white" />
      <text x="48" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="24" fill="#841439" letterSpacing="0.5">AXIS BANK</text>
    </svg>
  ),

  "EY India": ({ size = 40 }) => (
    <svg viewBox="0 0 120 50" width={size * 2.4} height={size} aria-label="EY">
      <rect x="5" y="8" width="34" height="34" fill="#1A1A1A" rx="4" />
      <text x="10" y="32" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="#FFE600">EY</text>
    </svg>
  ),

  "KPMG India": ({ size = 40 }) => (
    <svg viewBox="0 0 140 50" width={size * 2.8} height={size} aria-label="KPMG">
      <text x="5" y="36" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="30" fill="#00338D" letterSpacing="-1">KPMG</text>
    </svg>
  ),

  "PwC India": ({ size = 40 }) => (
    <svg viewBox="0 0 140 50" width={size * 2.8} height={size} aria-label="PwC">
      <rect x="5" y="10" width="14" height="14" fill="#E0301E" />
      <rect x="21" y="10" width="14" height="14" fill="#F37021" />
      <rect x="5" y="26" width="14" height="14" fill="#FFE11B" />
      <text x="42" y="34" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="26" fill="#1A1A1A">pwc</text>
    </svg>
  ),
};
