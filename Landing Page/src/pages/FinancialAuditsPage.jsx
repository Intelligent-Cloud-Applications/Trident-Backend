import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Download, FileText, PieChart } from 'lucide-react';

const AUDITS = [
  { year: "2022-2023", title: "Annual Financial Audit Report", size: "2.4 MB" },
  { year: "2021-2022", title: "Annual Financial Audit Report", size: "2.1 MB" },
  { year: "2020-2021", title: "Annual Financial Audit Report", size: "1.9 MB" },
  { year: "2019-2020", title: "Annual Financial Audit Report", size: "2.2 MB" },
];

export default function FinancialAuditsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans overflow-x-hidden selection:bg-cyan-200 selection:text-cyan-900">
      
      {/* FULL BLEED BENTO HEADER & ABOUT */}
      <section className="relative w-full pt-28 lg:pt-36 px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 px-4">
            <Link to="/" className="hover:text-cyan-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-cyan-600">Financial Audits</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                  <PieChart className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest">Transparency & Accountability</span>
                </div>
                <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-black text-white leading-[1.05] tracking-tight">
                  Financial <br/> Audits.
                </h1>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-cyan-50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              
              <h2 className="font-serif text-[28px] font-bold text-cyan-900 mb-6 relative z-10">Fiscal Discipline</h2>
              <p className="text-cyan-900/70 text-[16px] leading-[1.8] font-medium relative z-10">
                Annual audited financial statements reflecting the institution's commitment to rigorous financial discipline, infrastructure investments, and transparency.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* AUDITS LIST BENTO */}
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
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-blue-900 tracking-tight leading-none">
                    Audit Archive
                  </h3>
                  <p className="text-blue-900/60 font-medium mt-2">Downloadable statements for previous academic years.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {AUDITS.map((item, idx) => (
                  <motion.a 
                    href="#"
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white/60 hover:bg-white backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm hover:shadow-md transition-all group/btn flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-colors">
                        <FileText size={22} />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-400 flex items-center justify-center group-hover/btn:bg-blue-100 group-hover/btn:text-blue-600 transition-colors">
                        <Download size={16} />
                      </div>
                    </div>
                    
                    <h4 className="font-bold text-blue-900 text-[18px] leading-tight mb-2">
                      {item.title}
                    </h4>
                    
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-blue-100/50 text-[13px] font-bold text-blue-800">
                        {item.year}
                      </span>
                      <span className="text-[12px] font-medium text-blue-900/50">PDF • {item.size}</span>
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
