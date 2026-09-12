import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, AlertTriangle } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const SECTIONS = [
  { title: "1. General Disclaimer", content: "The information provided on this website is for general informational purposes only. Trident Academy of Technology ('TAT') makes every effort to ensure that the information on this website is accurate and up-to-date, but makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website." },
  { title: "2. Academic Information", content: "Academic programs, course structures, syllabi, and admission criteria described on this website are subject to change without prior notice as per the directives of AICTE, BPUT, and the Government of Odisha. Prospective students and stakeholders are advised to verify all academic details directly with the admissions office before making any decisions." },
  { title: "3. No Professional Advice", content: "The content on this website does not constitute professional advice of any kind. Users should not rely solely on the information provided here and should seek independent advice from qualified professionals before making any decisions based on the content of this website." },
  { title: "4. External Links", content: "This website may contain links to external websites that are not under the control of Trident Academy of Technology. TAT has no control over the nature, content, and availability of those sites. The inclusion of any external links does not necessarily imply a recommendation or endorsement of the views expressed within them." },
  { title: "5. Limitation of Liability", content: "In no event shall Trident Academy of Technology be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from the use of this website. Through this website you are able to link to other websites which are not under the control of TAT." },
  { title: "6. Image & Media Usage", content: "Photographs and media content displayed on this website are for representational purposes only. They may include stock images, campus photographs, and event images. The actual campus, facilities, and experiences may differ from the representations on this website." },
  { title: "7. Placement Data", content: "Placement statistics and salary figures mentioned on this website are based on historical data and are shared for informational purposes. Past performance does not guarantee future results. Individual placement outcomes depend on various factors including student performance, market conditions, and industry demands." },
  { title: "8. Updates to Disclaimer", content: "TAT reserves the right to modify this disclaimer at any time without prior notice. Users are encouraged to review this page periodically for any changes. Continued use of the website constitutes acceptance of the modified disclaimer." },
];

export default function DisclaimerPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative w-full h-[40vh] min-h-[300px] max-h-[400px] bg-[#1a2352] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-[#1a2352]/50 to-[#283B91]/60" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#f4f7f9] to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 pt-32 max-w-5xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/10 mx-auto">
            <AlertTriangle className="w-7 h-7 text-[#E5AA3E]" />
          </div>
          <h1 className="font-serif text-[40px] md:text-[56px] font-black text-white leading-[1.1] mb-4 tracking-tight">Disclaimer</h1>
          <p className="text-white/60 text-[14px]">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">Disclaimer</span>
        </nav>

        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0">
            <p className="text-gray-500 text-[15px] leading-[1.9] mb-10">
              By accessing and using the Trident Academy of Technology website, you acknowledge and agree to the following terms and conditions. If you do not agree with any part of this disclaimer, please do not continue to use the website.
            </p>
            <div className="space-y-10">
              {SECTIONS.map((s, i) => (
                <div key={i}>
                  <h2 className="font-sans text-[20px] font-bold text-[#1a2352] mb-3">{s.title}</h2>
                  <p className="text-gray-500 text-[15px] leading-[1.9]">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
