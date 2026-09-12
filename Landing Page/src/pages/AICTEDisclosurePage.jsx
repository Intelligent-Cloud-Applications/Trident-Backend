import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, FileText, Download, ArrowUpRight } from 'lucide-react';


export default function AICTEDisclosurePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans overflow-x-hidden selection:bg-blue-200 selection:text-blue-900">
      
      {/* FULL BLEED BENTO HEADER & ABOUT */}
      <section className="relative w-full pt-28 lg:pt-36 px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 px-4">
            <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-blue-600">AICTE Disclosure</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Main Hero Blob Bento */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                  <FileText className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest">Mandatory Compliance</span>
                </div>
                <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-black text-white leading-[1.05] tracking-tight">
                  AICTE <br/> Disclosure.
                </h1>
              </div>
            </motion.div>

            {/* About / Context Bento */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-amber-50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              
              <h2 className="font-serif text-[28px] font-bold text-amber-900 mb-6 relative z-10">Regulatory Transparency</h2>
              <p className="text-amber-900/70 text-[16px] leading-[1.8] font-medium relative z-10 mb-8">
                As per the directives of the All India Council for Technical Education (AICTE), we mandatorily disclose institutional information for transparency and public access.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* BENTO GRID SECTIONS */}
      <section className="w-full px-4 lg:px-8 pb-24">
        <div className="max-w-[1600px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-emerald-50/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group transition-colors duration-500"
          >
            {/* Organic Blob Background Element */}
            <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-emerald-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl transform group-hover:rotate-12 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-emerald-900 shadow-sm">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-emerald-900 tracking-tight leading-none">
                    AICTE Approvals
                  </h3>
                  <p className="text-emerald-900/60 font-medium mt-2">Archive of institutional approval letters</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[
                  { year: "2026-2027", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/EOA-Report-2026-2027.pdf" },
                  { year: "2025-2026", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/aicte25-26.pdf" },
                  { year: "2024-2025", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/AICTE-EOA-TRIDENT-2024-2025.pdf" },
                  { year: "2023-2024", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/TAT-EOA-Report-2023-24.pdf" },
                  { year: "2022-2023", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/EOA-Report-22-23TAT-1.pdf" },
                  { year: "2021-2022", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2021.pdf" },
                  { year: "2020-2021", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2020.pdf" },
                  { year: "2019-2020", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2019.pdf" },
                  { year: "2018-2019", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2018.pdf" },
                  { year: "2017-2018", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2017.pdf" },
                  { year: "2016-2017", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2016.pdf" },
                  { year: "2015-2016", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2015.pdf" },
                  { year: "2014-2015", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2014.pdf" },
                  { year: "2013-2014", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2013.pdf" },
                  { year: "2012-2013", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2012.pdf" },
                  { year: "2011-2012", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2011.pdf" },
                  { year: "2010-2011", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2010.pdf" },
                  { year: "2009-2010", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2009.pdf" },
                  { year: "2008-2009", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2008.pdf" },
                  { year: "2007-2008", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2007.pdf" },
                  { year: "2006-2007", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2006.pdf" },
                  { year: "2005-2006", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/AICTE/2005.pdf" }
                ].map((item, idx) => (
                  <motion.a 
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx % 8) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-between bg-white/60 hover:bg-white backdrop-blur-md rounded-2xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-all group/btn"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover/btn:bg-emerald-600 group-hover/btn:text-white transition-colors">
                        <Download size={18} />
                      </div>
                      <div className="font-bold text-emerald-900 text-[15px]">
                        AICTE Approval
                        <div className="text-[12px] font-medium text-emerald-900/60 leading-tight">{item.year}</div>
                      </div>
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
