import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Award, FileText, ExternalLink, Shield, CheckCircle } from 'lucide-react';

const CRITERIA = [
  { num: "1", title: "Curricular Aspects", desc: "Curriculum design, academic flexibility, and learning outcomes aligned with industry needs.", weight: "150" },
  { num: "2", title: "Teaching-Learning & Evaluation", desc: "Student-centric learning, faculty competence, and effective evaluation reforms.", weight: "200" },
  { num: "3", title: "Research & Innovations", desc: "Research publications, funded projects, innovation ecosystem, and community engagement.", weight: "250" },
  { num: "4", title: "Infrastructure & Resources", desc: "Physical infrastructure, IT facilities, library resources, and maintenance systems.", weight: "100" },
  { num: "5", title: "Student Support & Progression", desc: "Scholarships, placements, student activities, and alumni engagement.", weight: "100" },
  { num: "6", title: "Governance & Leadership", desc: "Institutional vision, strategy, governance, and financial management.", weight: "100" },
  { num: "7", title: "Institutional Values", desc: "Gender equity, environmental consciousness, inclusiveness, and innovation.", weight: "100" },
];



export default function NAACPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      
      {/* FULL BLEED BENTO HEADER */}
      <section className="relative w-full pt-28 lg:pt-36 px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 px-4">
            <Link to="/" className="hover:text-rose-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-rose-600">NAAC Accreditation</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-gradient-to-br from-rose-600 to-orange-600 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                  <Award className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest">A+ Grade Institution</span>
                </div>
                <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-black text-white leading-[1.05] tracking-tight">
                  NAAC <br/> Accreditation.
                </h1>
              </div>
              
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-orange-50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group text-center"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              
              <Shield className="w-16 h-16 mx-auto text-orange-600 mb-6 relative z-10" />
              <div className="text-[72px] font-black text-orange-600 leading-none mb-2 relative z-10">A+</div>
              <div className="text-orange-900/60 text-[14px] font-bold uppercase tracking-widest relative z-10">NAAC Grade</div>
              
              <div className="mt-8 pt-6 border-t border-orange-900/10 relative z-10">
                <div className="text-[24px] font-black text-orange-900">3.25 <span className="text-[16px] text-orange-900/50">/ 4.0</span></div>
                <div className="text-orange-900/50 text-[11px] uppercase tracking-wider font-bold">CGPA Score</div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* CRITERIA BENTO GRID */}
      <section className="w-full px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            
            <div className="lg:col-span-full mb-4 px-4">
              <h2 className="font-serif text-[32px] font-bold text-gray-900">Assessment Criteria</h2>
              <p className="text-gray-500 font-medium">NAAC evaluates institutions across seven quality criteria.</p>
            </div>

            {CRITERIA.map((c, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-orange-100 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-[20px] mb-6">
                    {c.num}
                  </div>
                  
                  <h3 className="font-bold text-[20px] text-gray-900 mb-3 leading-tight">{c.title}</h3>
                  <p className="text-gray-500 text-[14px] leading-relaxed mb-6 flex-grow">{c.desc}</p>
                  
                  <div className="inline-flex items-center gap-2 mt-auto">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[12px] font-bold">
                      {c.weight} <span className="opacity-60 font-medium">marks</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>
      {/* ACCREDITATION CERTIFICATES BENTO */}
      <section className="w-full px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-orange-50/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group transition-colors duration-500"
          >
            <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-orange-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl transform group-hover:-rotate-12 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-orange-900 shadow-sm">
                  <Award size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-orange-900 tracking-tight leading-none">
                    NAAC Accreditation
                  </h3>
                  <p className="text-orange-900/60 font-medium mt-2">Download official NAAC accreditation certificates</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {[
                  { title: "NAAC Accreditation 2025-2030", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/naac2ndcycle.jpg" },
                  { title: "NAAC Accreditation 2016-2021", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/naac2016.pdf" }
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
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex-shrink-0 flex items-center justify-center text-orange-600 group-hover/btn:bg-orange-600 group-hover/btn:text-white transition-colors">
                      <ExternalLink size={20} />
                    </div>
                    <div className="font-bold text-orange-900 text-[15px] leading-tight pr-4">
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
