import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Building2, Download, GraduationCap, CheckCircle } from 'lucide-react';

const AFFILIATION_LETTERS = [
  { year: "2026-27", url: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/BPUT+Affiliation+2026-27.pdf", color: "bg-blue-100", text: "text-blue-900" },
  { year: "2025-26", url: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/BPUT+Affiliation+2025-26.pdf", color: "bg-emerald-100", text: "text-emerald-900" },
  { year: "2023-24", url: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/BPUT+Affiliation+2023-24.pdf", color: "bg-amber-100", text: "text-amber-900" },
  { year: "2022-23", url: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/BPUT+Affiliation+2022-23.pdf", color: "bg-rose-100", text: "text-rose-900" },
  { year: "2021-22", url: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/BPUT+Affiliation+2021-22.pdf", color: "bg-purple-100", text: "text-purple-900" },
  { year: "2020-21", url: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/BPUT+Affiliation+2020-21.pdf", color: "bg-cyan-100", text: "text-cyan-900" }
];

export default function BPUTAffiliationPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      {/* FULL BLEED BENTO HEADER & ABOUT */}
      <section className="relative w-full pt-28 lg:pt-36 px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 px-4">
            <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-blue-600">BPUT Affiliation</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 xl:col-span-8 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                  <Building2 className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest">University Affiliation</span>
                </div>
                <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-black text-white leading-[1.05] tracking-tight">
                  BPUT <br/> Affiliation.
                </h1>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 xl:col-span-4 bg-blue-50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              
              <h2 className="font-serif text-[28px] font-bold text-blue-900 mb-6 relative z-10">Official Recognition</h2>
              <p className="text-blue-900/70 text-[16px] leading-[1.8] font-medium relative z-10 mb-8">
                Permanently affiliated to the Biju Patnaik University of Technology (BPUT), Odisha, ensuring our academic curriculum meets the highest standards.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* AFFILIATED COURSES BENTO */}
      <section className="w-full px-4 lg:px-8 pb-24">
        <div className="max-w-[1600px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-blue-100 shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Download size={28} />
              </div>
              <div>
                <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-gray-900 tracking-tight leading-none">
                  Affiliation Letters
                </h3>
                <p className="text-gray-500 font-medium mt-2">BPUT affiliation documents by academic year.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {AFFILIATION_LETTERS.map((item, idx) => (
                <div key={idx} className={`${item.color} rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className={item.text} />
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${item.text} bg-white/50 px-3 py-1 rounded-full`}>
                        Affiliation
                      </span>
                    </div>
                  </div>
                  
                  <h4 className={`font-bold text-[24px] leading-tight ${item.text} mb-6 flex-grow`}>
                    Year {item.year}
                  </h4>
                  
                  <div className={`mt-auto pt-4 border-t border-black/5 flex items-center justify-between`}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 bg-white/50 hover:bg-white ${item.text} px-4 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider transition-colors shadow-sm`}>
                      <Download size={14} />
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
          </motion.div>

        </div>
      </section>

    </div>
  );
}
