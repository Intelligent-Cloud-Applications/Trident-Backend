import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Award, CheckCircle, BarChart3, ArrowUpRight } from 'lucide-react';


const OUTCOMES = [
  "Outcome Based Education (OBE) framework implementation across all programs",
  "Clearly defined Program Outcomes (POs) and Program Specific Outcomes (PSOs)",
  "Continuous assessment through Course Outcomes (COs) mapping",
  "Regular curriculum revision based on industry feedback and NBA guidelines",
  "Faculty training in OBE pedagogy and assessment methods",
  "Attainment calculation and gap analysis for continuous improvement",
];

export default function NBAPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans overflow-x-hidden selection:bg-purple-200 selection:text-purple-900">
      
      {/* FULL BLEED BENTO HEADER */}
      <section className="relative w-full pt-28 lg:pt-36 px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 px-4">
            <Link to="/" className="hover:text-purple-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-purple-600">NBA Accreditation</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-gradient-to-br from-purple-600 to-fuchsia-700 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-fuchsia-400/20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                  <Award className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest">Quality Assurance</span>
                </div>
                <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-black text-white leading-[1.05] tracking-tight">
                  NBA <br/> Accreditation.
                </h1>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-fuchsia-50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              
              <h2 className="font-serif text-[28px] font-bold text-fuchsia-900 mb-6 relative z-10">Program Excellence</h2>
              <p className="text-fuchsia-900/70 text-[16px] leading-[1.8] font-medium relative z-10">
                The National Board of Accreditation (NBA) evaluates technical programs on the basis of Outcome Based Education (OBE), ensuring global quality standards are met.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PROGRAMS & OBE BENTO */}
      <section className="w-full px-4 lg:px-8 pb-24">
        <div className="max-w-[1600px] mx-auto">
          <div className="max-w-[1000px] mx-auto">
            
            {/* OBE Framework */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-indigo-50/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group"
            >
              <div className="absolute -right-16 -bottom-16 w-96 h-96 bg-indigo-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl transform group-hover:-rotate-12 transition-transform duration-1000" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-indigo-900 shadow-sm mb-8">
                  <BarChart3 size={28} />
                </div>
                
                <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-indigo-900 mb-8 tracking-tight">
                  OBE Framework
                </h3>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {OUTCOMES.map((o, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2.5 flex-shrink-0" />
                      <span className="text-[16px] font-medium text-indigo-900/80 leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ACCREDITATION DOCUMENTS BENTO */}
      <section className="w-full px-4 lg:px-8 pb-24">
        <div className="max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-blue-50/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group transition-colors duration-500"
          >
            <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-blue-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl transform group-hover:-rotate-12 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-blue-900 shadow-sm">
                  <Award size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-blue-900 tracking-tight leading-none">
                    Accreditation Documents
                  </h3>
                  <p className="text-blue-900/60 font-medium mt-2">Download official NBA accreditation letters</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "NBA Accreditation MBA (2026-2028)", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/NBA-MBA.pdf" },
                  { title: "NBA Accreditation CSE/ETC (2026-2028)", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/nba26-28-cse-etc.pdf" },
                  { title: "NBA Accreditation Mechanical/EEE/MCA (2024-2027)", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/nba-mech-eee-mca.pdf" },
                  { title: "NBA Accreditation CSE/ETC 2019-2022", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/NBA_CsEtc_31-7-2019.pdf" },
                  { title: "NBA Accreditation CSE/ETC 2018-2019", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/nbacs-etc-2018-19.pdf" },
                  { title: "NBA Accreditation CSE/ETC 2016-2018", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/nba-cs-etc2016-18.pdf" }
                ].map((item, idx) => (
                  <motion.a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4 bg-white/60 hover:bg-white backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm hover:shadow-md transition-all group/btn"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-colors">
                      <ArrowUpRight size={20} />
                    </div>
                    <div className="font-bold text-blue-900 text-[15px] leading-tight">
                      {item.title}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
