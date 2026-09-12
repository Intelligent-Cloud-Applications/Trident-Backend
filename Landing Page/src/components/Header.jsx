import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Users, Menu, X, FileText, ChevronDown, Award, CheckCircle, ShieldCheck, FileSpreadsheet, ShieldAlert, BookOpen, ArrowRight, Facebook, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";
import { NAV_LINKS } from "../data/constants";
import logo from "../assets/logo.png";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const location = useLocation();
  
  const isHomePage = location.pathname === "/";
  const isCollapsed = scrolled || hovered || mobileOpen;
  const isTransparent = isHomePage && !isCollapsed;
  const navActive = !isTransparent;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const mandatoryLinks = [
    { label: "AICTE Approvals", href: "/aicte-disclosure", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", hover: "group-hover/link:bg-emerald-600" },
    { label: "BPUT Affiliation", href: "/bput-affiliation", icon: Award, color: "text-blue-600", bg: "bg-blue-50", hover: "group-hover/link:bg-blue-600" },
    { label: "NAAC Certificate", href: "/naac", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50", hover: "group-hover/link:bg-purple-600" },
    { label: "NBA Documents", href: "/nba", icon: FileSpreadsheet, color: "text-amber-600", bg: "bg-amber-50", hover: "group-hover/link:bg-amber-600" },
    { label: "Financial Audits", href: "/financial-audits", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50", hover: "group-hover/link:bg-indigo-600" },
    { label: "Anti-Ragging Policy", href: "/anti-ragging", icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50", hover: "group-hover/link:bg-rose-600" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Slim Utility Bar */}
      <div className={"hidden lg:block border-b border-white/5 transition-all duration-500 " + (scrolled ? "max-h-0 overflow-hidden py-0 border-b-0" : "max-h-20 py-1.5")} style={{ background: 'linear-gradient(135deg, #1a2660 0%, #2C3A8C 60%, #3a4aad 100%)' }}>
        <div className="max-w-[1400px] mx-auto px-6 xl:px-12 flex items-center justify-between">
          <div className="flex-1 flex items-center gap-2 lg:gap-3 pl-2">
            <a href="https://www.facebook.com/tat.trident" target="_blank" rel="noreferrer" aria-label="Facebook" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#1877F2]/80 hover:text-white hover:border-[#1877F2]/50 hover:shadow-[0_0_12px_rgba(24,119,242,0.6)] hover:-translate-y-0.5 transition-all duration-300">
              <Facebook size={13} strokeWidth={2} />
            </a>
            <a href="https://x.com/Trident_tat" target="_blank" rel="noreferrer" aria-label="Twitter (X)" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/20 hover:text-white hover:border-white/50 hover:shadow-[0_0_12px_rgba(255,255,255,0.4)] hover:-translate-y-0.5 transition-all duration-300">
              <Twitter size={13} strokeWidth={2} />
            </a>
            <a href="https://www.linkedin.com/school/trident-academy-of-technology-tat-bhubaneswar/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#0A66C2]/80 hover:text-white hover:border-[#0A66C2]/50 hover:shadow-[0_0_12px_rgba(10,102,194,0.6)] hover:-translate-y-0.5 transition-all duration-300">
              <Linkedin size={13} strokeWidth={2} />
            </a>
            <a href="https://www.instagram.com/trident_tat/" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#E1306C]/80 hover:text-white hover:border-[#E1306C]/50 hover:shadow-[0_0_12px_rgba(225,48,108,0.6)] hover:-translate-y-0.5 transition-all duration-300">
              <Instagram size={13} strokeWidth={2} />
            </a>
            <a href="https://www.youtube.com/@trident_tat" target="_blank" rel="noreferrer" aria-label="YouTube" className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-[#FF0000]/80 hover:text-white hover:border-[#FF0000]/50 hover:shadow-[0_0_12px_rgba(255,0,0,0.6)] hover:-translate-y-0.5 transition-all duration-300">
              <Youtube size={13} strokeWidth={2} />
            </a>
          </div>
          <div className="flex items-center gap-5">
            {/* Mandatory Disclosure Dropdown (Hover) */}
            <div className="relative group/md pb-0">
              <button 
                className="flex items-center gap-1.5 text-[10px] font-medium text-white/80 uppercase tracking-widest group-hover/md:text-white transition-colors whitespace-nowrap outline-none py-2"
              >
                <FileText size={11} />
                Mandatory Disclosure
                <ChevronDown size={11} className={`transition-transform duration-300 group-hover/md:rotate-180`} />
              </button>
              
              {/* Dropdown Menu — invisible bridge + panel */}
              <div className="absolute top-full right-0 w-[260px] opacity-0 translate-y-2 pointer-events-none group-hover/md:opacity-100 group-hover/md:translate-y-0 group-hover/md:pointer-events-auto transition-all duration-300 origin-top z-50">
                {/* Invisible bridge to prevent hover gap */}
                <div className="h-2" />
                {/* The actual visible box */}
                <div 
                  className="w-full bg-white rounded-xl shadow-[0_20px_40px_-10px_rgba(26,38,96,0.3)] overflow-hidden"
                  style={{ border: '1px solid rgba(26,38,96,0.08)' }}
                >
                <div className="flex flex-col p-2 gap-1 relative overflow-hidden">
                  {/* Decorative background glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
                  
                  {mandatoryLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={idx} 
                        href={link.href} 
                        className="group/link flex items-center gap-3 text-[#3E3A36] px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-all duration-300 relative overflow-hidden"
                      >
                        {/* Subtle colored background on hover */}
                        <div className={`absolute inset-0 opacity-0 group-hover/link:opacity-100 ${link.bg} transition-opacity duration-300 -z-10`}></div>
                        
                        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 bg-white shadow-sm border border-slate-100 ${link.color} group-hover/link:shadow-md transition-all duration-300 group-hover/link:scale-110`}>
                          <Icon size={14} strokeWidth={2.5} />
                        </div>
                        
                        <span className="text-[12.5px] font-semibold tracking-wide flex-1 group-hover/link:translate-x-0.5 transition-transform duration-300">
                          {link.label}
                        </span>
                        
                        <ChevronDown size={14} className="opacity-0 -rotate-90 -translate-x-2 text-slate-400 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            </div>




            {/* Alumni Portal */}
            <a href="https://alumni-tat.tekkzy.com/" className="flex items-center gap-1.5 text-[10px] font-medium text-[#E8BD63] uppercase tracking-widest hover:text-[#F0D080] transition-colors whitespace-nowrap text-decoration-none">
              <Users size={11}/> Alumni
            </a>
          </div>
        </div>
      </div>

      <header 
        className={`relative transition-all duration-500 ${isTransparent ? 'bg-transparent py-5' : `bg-white shadow-[0_4px_20px_-4px_rgba(15,23,42,0.12)] ${isCollapsed ? 'py-3' : 'py-5'}`}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="mx-auto px-6 xl:px-12 flex items-center justify-between">
            
          {/* Logo Lockup */}
          <a href="https://tat.tekkzy.com" className="flex items-center gap-3.5 group cursor-pointer text-decoration-none">
            <img src={logo} alt="TAT Logo" className="w-12 h-12 md:w-[52px] md:h-[52px] object-contain flex-shrink-0 drop-shadow-sm" />
            <div className="hidden sm:flex flex-col justify-center items-start">
              <div className={`font-serif text-[24px] md:text-[28px] font-black leading-none uppercase transition-colors duration-500 ${navActive ? "text-[#3E3A36]" : "text-white"}`} style={{ fontFamily: "'Playfair Display', 'Source Serif 4', serif", fontWeight: 900, letterSpacing: "0.02em" }}>TRIDENT</div>
              <div className={`w-full h-[1px] my-[4px] transition-all duration-500 bg-gradient-to-r ${navActive ? "from-[#1B4D8E]" : "from-white/60"} to-transparent`}></div>
              <div className={`font-sans text-[9px] md:text-[10.5px] font-bold tracking-[0.25em] uppercase leading-none transition-colors duration-500 ${navActive ? "text-[#1B4D8E]" : "text-white/80"}`}>ACADEMY OF TECHNOLOGY</div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:block">
            <ul className={`flex items-center gap-6 list-none m-0 p-0 ${navActive ? 'nav-solid' : 'nav-transparent'}`}>
              {NAV_LINKS.map(item => (
                  <li key={item.label} className="relative py-1">
                    <a href={item.href} className={`nav-link text-[14px] uppercase tracking-[0.14em] cursor-pointer whitespace-nowrap font-extrabold transition-colors duration-500 text-decoration-none ${navActive ? "text-[#3E3A36] hover:text-[#1B4D8E]" : "text-white hover:text-white/70"}`}>
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          {/* CTA Elements */}
          <div className="hidden lg:flex items-center gap-5">
            <a href="https://apply-now.tekkzy.com" className="text-[12px] font-bold px-7 py-3 rounded uppercase whitespace-nowrap text-decoration-none transition-all duration-500 hover:opacity-90" style={{ backgroundColor: '#D3494B', color: '#ffffff' }}>Apply Now</a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className={"lg:hidden p-2 rounded-lg transition-colors active:scale-95 z-50 relative text-primary bg-soft hover:bg-primary/10"}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div 
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.2)] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-top overflow-hidden border-t border-primary/10 ${
            mobileOpen ? "max-h-[85vh] opacity-100 py-6" : "max-h-0 opacity-0 py-0 pointer-events-none"
          }`}
        >
          <div className="px-6 flex flex-col h-full overflow-y-auto pb-4">
            {NAV_LINKS.map((item, i) => {
              const isAcademics = item.label.toLowerCase() === 'academics';
              return (
              <a 
                key={item.label} 
                href={item.href} 
                onClick={() => setMobileOpen(false)}
                className={`block py-3.5 text-[15px] font-extrabold text-[#3E3A36] uppercase tracking-[0.14em] hover:text-primary hover:bg-soft/50 rounded-lg px-3 transition-all duration-500 transform text-decoration-none ${
                  mobileOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                } ${isAcademics ? 'text-[#1B4D8E]' : ''}`}
                style={{ 
                  transitionDelay: `${mobileOpen ? i * 40 + 100 : 0}ms`, 
                  borderBottom: i !== NAV_LINKS.length - 1 ? "1px solid rgba(27,77,142,0.1)" : "none" 
                }}
              >
                {item.label}
              </a>
            )})}
            <div 
              className={`pt-8 px-2 transition-all duration-700 transform ${
                mobileOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-8 opacity-0 scale-95"
              }`} 
              style={{ transitionDelay: `${mobileOpen ? NAV_LINKS.length * 40 + 150 : 0}ms` }}
            >
              <a onClick={() => setMobileOpen(false)} href="https://apply-now.tekkzy.com" className="block text-center text-[13px] tracking-widest text-[#fff] font-extrabold px-6 py-4 rounded-xl shadow-lg transition-opacity hover:opacity-90 text-decoration-none" style={{ backgroundColor: '#D3494B' }}>
                START APPLICATION
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
