import logo from "../assets/logo.png";
import { FadeInUp } from "../utils/animations";
import { Link } from "react-router-dom";

import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram, ArrowRight, Youtube } from "lucide-react";

const XIcon = ({ size = 20, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#1A1817] text-[#EFE7DF] pt-24 pb-12 relative overflow-hidden font-sans border-t-4 border-[#E5AA3E]">
      
      {/* Skewed Background Accent */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-white/[0.02] -skew-x-12 translate-x-20 pointer-events-none"></div>

      {/* Subtle Background Logo Watermark */}
      <div className="absolute right-0 bottom-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03] flex items-end justify-end">
        <img src={logo} alt="" className="w-[400px] h-[400px] object-contain transform translate-y-16 translate-x-16" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 relative z-10">
        


        <FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
            
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <a href="https://tat.tekkzy.com" className="flex items-center gap-3.5 group cursor-pointer text-decoration-none mb-10">
                <img src={logo} alt="TAT Logo" className="w-[52px] h-[52px] object-contain flex-shrink-0 drop-shadow-sm transition-all duration-500" />
                <div className="flex flex-col justify-center items-start">
                  <div className="font-serif text-[28px] font-black leading-none uppercase transition-colors duration-500 text-white" style={{ fontFamily: "'Playfair Display', 'Source Serif 4', serif", fontWeight: 900, letterSpacing: "0.02em" }}>TRIDENT</div>
                  <div className="w-full h-[1px] my-[4px] transition-all duration-500 bg-white/30"></div>
                  <div className="font-sans text-[10.5px] font-bold tracking-[0.25em] uppercase leading-none transition-colors duration-500 text-white/90">ACADEMY OF TECHNOLOGY</div>
                </div>
              </a>
              
              <p className="text-gray-200 text-[16px] leading-[1.8] mb-10">
                Where Education Meets Excellence — Trident Academy of Technology empowers future professionals with quality education, innovation, and industry-ready skills.
              </p>
              
              <div className="grid grid-cols-1 gap-6">
                <a href="https://contactus-tat.tekkzy.com" className="flex items-start gap-4 hover:text-white transition-colors group text-decoration-none">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#C4A49B] flex-shrink-0"><MapPin size={20}/></div>
                  <div className="text-sm font-medium leading-relaxed text-gray-200">F2/A, Chandaka Industrial Estate,<br/>In front of Infocity, Bhubaneswar,<br/>Odisha, Pin: 751024, India</div>
                </a>
                <a href="tel:+919861191195" className="flex items-center gap-4 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#C4A49B]"><Phone size={20}/></div>
                  <div className="text-sm font-medium text-gray-200">+91 98611 91195</div>
                </a>
                <a href="mailto:info@trident.ac.in" className="flex items-center gap-4 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#C4A49B]"><Mail size={20}/></div>
                  <div className="text-sm font-medium text-gray-200">info@trident.ac.in</div>
                </a>
              </div>
            </div>


            {/* Links Columns */}
            <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                { h:"Academics & Student Life", ls:[
                  { t:"Library", h:"https://tat.tekkzy.com/library" },
                  { t:"IQAC", h:"/iqac" },
                  { t:"Placement", h:"https://placement-tat.tekkzy.com", ext: true },
                  { t:"Testimonials", h:"/testimonials" },
                  { t:"Student Clubs", h:"/student-clubs" },
                  { t:"CISCO thingQbator", h:"/cisco-thingqbator" },
                  { t:"E-Governance Portal", h:"https://ais.tat.ac.in/ais/", ext: true },
                  { t:"Grievance", h:"/grievance" },
                  { t:"ICC", h:"/icc" },
                ] },
                { h:"About the Institution", ls:[
                  { t:"About Us", h:"/about" },
                  { t:"NAAC", h:"/naac" },
                  { t:"NBA", h:"/nba" },
                  { t:"NIRF", h:"/nirf" },
                  { t:"SIRO (DSIR)", h:"/siro" },
                  { t:"AICTE Mandatory Disclosure", h:"/aicte-disclosure" },
                  { t:"Career", h:"/career" },
                  { t:"Information Brochure", h:"/information-brochure" },
                ] },
                { h:"Trident Group Websites", ls:[
                  { t:"Trident Academy of Creative Technology (TACT)", h:"https://tact.ac.in/", ext: true },
                  { t:"Trident Academy of Professional Studies (TAPS)", h:"https://taps.ac.in/", ext: true },
                  { t:"Trident School of Biotech Sciences (TSBS)", h:"https://tsbs.ac.in/", ext: true },
                  { t:"The DF Group", h:"https://dfgroup.in/", ext: true },
                ] },
              ].map((col) => (
                <div key={col.h}>
                  <div className="relative mb-10">
                    <div className="absolute -left-4 top-0 w-8 h-8 bg-[#8B6E66]/10 -skew-x-12"></div>
                    <h5 className="font-serif text-white font-bold text-[15px] uppercase tracking-widest relative z-10 whitespace-nowrap">{col.h}</h5>
                  </div>
                  <ul className="space-y-5">
                    {col.ls.map((link) => (
                      <li key={link.t}>
                        {link.ext ? (
                          <a href={link.h} target="_blank" rel="noopener noreferrer" className="text-[14px] font-medium text-gray-200 hover:text-[#E5AA3E] transition-all flex items-center gap-3 group">
                            <span className="w-0 h-[1px] bg-[#E5AA3E] group-hover:w-4 transition-all duration-300" />
                            {link.t}
                          </a>
                        ) : (
                          <Link to={link.h} className="text-[14px] font-medium text-gray-200 hover:text-[#E5AA3E] transition-all flex items-center gap-3 group">
                            <span className="w-0 h-[1px] bg-[#E5AA3E] group-hover:w-4 transition-all duration-300" />
                            {link.t}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
        
        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center">
            <span className="text-[11px] font-bold uppercase tracking-[.2em] text-gray-300">
              © 2026 Trident Academy of Technology. All rights reserved.
            </span>
            <div className="flex gap-4 text-[11px] font-medium text-gray-300">
               {[{t:"Privacy Policy",h:"/privacy-policy"}, {t:"Disclaimer",h:"/disclaimer"}, {t:"Terms of Use",h:"/terms-of-use"}].map(l=>(
                 <Link key={l.t} to={l.h} className="hover:text-[#E5AA3E] transition-colors uppercase tracking-wider">{l.t}</Link>
               ))}
            </div>
          </div>
          
          <div className="flex items-center gap-5">
            {[
              { Icon: Facebook, href: "https://www.facebook.com/tat.trident" },
              { Icon: XIcon, href: "https://x.com/Trident_tat" },
              { Icon: Youtube, href: "https://www.youtube.com/@trident_tat" },
              { Icon: Instagram, href: "https://www.instagram.com/trident_tat/" },
              { Icon: Linkedin, href: "https://www.linkedin.com/school/trident-academy-of-technology-tat-bhubaneswar/" }
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#E5AA3E] transition-colors">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Built by credit */}
        <div className="text-center mt-8 pt-6 border-t border-white/5">
          <span className="text-[11px] font-medium text-gray-300 tracking-wider">
            Crafted with AI by <a href="https://tekkzy.com" className="text-gray-300 hover:text-[#E5AA3E] transition-colors font-medium">Tekkzy</a> — AI-Powered Intelligent Cloud Solutions
          </span>
        </div>
        
      </div>
    </footer>
  );
}
