import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, ShieldAlert, Phone, Mail, AlertTriangle, Users } from 'lucide-react';

const COMMITTEE = [
  { name: "Dr. Abhaya Kumar Samal", role: "Principal / Chairman", phone: "+91-9437142646" },
  { name: "Dr. D.N. Pattanayak", role: "HOD (Basic Science) / Convenor", phone: "+91-9437340645" },
  { name: "Prof. S.B. Senapati", role: "HOD (Civil) / Member", phone: "+91-9861136125" },
  { name: "Prof. R.N. Sahoo", role: "Chief Warden / Member", phone: "+91-9437633215" },
];

export default function AntiRaggingPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-gray-800 font-sans overflow-x-hidden selection:bg-red-200 selection:text-red-900">
      
      {/* FULL BLEED BENTO HEADER & ABOUT */}
      <section className="relative w-full pt-28 lg:pt-36 px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-8 px-4">
            <Link to="/" className="hover:text-red-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-red-600">Anti-Ragging Policy</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-gradient-to-br from-red-600 to-rose-700 rounded-[3rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between min-h-[400px]"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-400/20 rounded-full blur-2xl transform -translate-x-1/4 translate-y-1/4" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white mb-8">
                  <ShieldAlert className="w-4 h-4" />
                  <span className="text-[12px] font-bold uppercase tracking-widest">Zero Tolerance Policy</span>
                </div>
                <h1 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] font-black text-white leading-[1.05] tracking-tight">
                  Anti-Ragging <br/> Policy.
                </h1>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-red-50 rounded-[3rem] p-10 md:p-16 flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-xl transform group-hover:scale-150 transition-transform duration-700" />
              
              <h2 className="font-serif text-[28px] font-bold text-red-900 mb-6 relative z-10">Safe Campus</h2>
              <p className="text-red-900/70 text-[16px] leading-[1.8] font-medium relative z-10 mb-8">
                Trident Academy of Technology maintains a strict zero-tolerance policy towards ragging in any form, ensuring a safe environment for all students.
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* POLICY RULES & HELPLINE BENTO */}
      <section className="w-full px-4 lg:px-8 pb-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
            
            {/* Policy Guidelines */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 bg-white/60 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-red-100 shadow-sm relative overflow-hidden"
            >
              <h3 className="font-serif text-[32px] font-bold text-gray-900 mb-8 tracking-tight">
                Prohibition of Ragging
              </h3>
              
              <div className="bg-amber-50/80 rounded-2xl p-6 mb-10 flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 flex-shrink-0" />
                <p className="text-amber-900 text-[15px] font-medium leading-[1.8]">
                  Any student found guilty of participating in or abetting ragging will be dealt with severely. Punishments may range from suspension, rustication from the institution, and lodging an FIR with local police authorities.
                </p>
              </div>

              <h4 className="font-bold text-[20px] text-gray-900 mb-6">What Constitutes Ragging?</h4>
              <ul className="space-y-4">
                {[
                  "Any conduct by words spoken or written, or by an act which has the effect of teasing, treating or handling with rudeness a fresher or any other student.",
                  "Indulging in rowdy or indisciplined activities which causes annoyance, hardship, or psychological harm.",
                  "Asking any student to do any act which such student will not in the ordinary course do, causing a sense of shame or embarrassment.",
                  "Any act of physical abuse including all variants of it: sexual abuse, homosexual assaults, stripping, forcing obscene acts.",
                  "Any act that affects the mental health and self-confidence of a fresher."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                    <span className="text-gray-600 text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Helpline Bento */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-4 bg-orange-50/80 rounded-[3rem] p-8 md:p-12 relative overflow-hidden group flex flex-col justify-center"
            >
              <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-orange-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl transform group-hover:-rotate-12 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <h3 className="font-serif text-[32px] font-bold text-orange-900 mb-4 tracking-tight">
                  Emergency Helpline
                </h3>
                <p className="text-orange-900/70 text-[15px] leading-relaxed mb-10">
                  If you are a victim of ragging or a witness to it, please immediately contact the Anti-Ragging Committee or use the national toll-free helpline.
                </p>
                
                <div className="space-y-6 mb-10">
                  <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-orange-900/50 mb-1">National Helpline</div>
                      <div className="text-[18px] font-black text-orange-900">1800-180-5522</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-widest text-orange-900/50 mb-1">Email Report</div>
                      <div className="text-[15px] font-black text-orange-900">helpline@antiragging.in</div>
                    </div>
                  </div>
                </div>

                <a href="https://www.antiragging.in" target="_blank" rel="noopener noreferrer" className="block w-full py-4 bg-orange-600 hover:bg-orange-700 rounded-2xl text-white text-[13px] font-bold uppercase tracking-widest text-center transition-colors shadow-lg shadow-orange-600/20">
                  File Online Complaint
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SQUAD BENTO */}
      <section className="w-full px-4 lg:px-8 pb-24">
        <div className="max-w-[1600px] mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="bg-indigo-50/80 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute -left-32 -bottom-32 w-96 h-96 bg-indigo-200/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl transform group-hover:rotate-12 transition-transform duration-1000" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center text-indigo-900 shadow-sm">
                  <Users size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-[32px] md:text-[40px] font-bold text-indigo-900 tracking-tight leading-none">
                    Anti-Ragging Squad
                  </h3>
                  <p className="text-indigo-900/60 font-medium mt-2">Institutional committee ensuring a ragging-free campus.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {COMMITTEE.map((member, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/60 hover:bg-white backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                      <Users size={20} />
                    </div>
                    <h4 className="font-bold text-indigo-900 text-[18px] mb-2">{member.name}</h4>
                    <p className="text-[13px] font-bold text-indigo-900/50 mb-6 flex-grow">{member.role}</p>
                    <div className="flex items-center gap-2 text-indigo-600 font-black text-[14px] mt-auto">
                      <Phone size={14} />
                      {member.phone}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
}
