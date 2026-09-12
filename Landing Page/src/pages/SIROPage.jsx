import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Microscope, FlaskConical, BookOpen, Award, CheckCircle, Users, Lightbulb, FileText } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const BENEFITS = [
  { icon: FlaskConical, title: "Custom Duty Exemption", desc: "Import of equipment and materials for R&D purposes at concessional customs duty rates." },
  { icon: BookOpen, title: "Excise Duty Exemption", desc: "Exemption on excise duty for procurement of indigenous goods for research activities." },
  { icon: Lightbulb, title: "Research Grants", desc: "Eligibility to apply for government research grants from DST, CSIR, and other agencies." },
  { icon: Users, title: "Industry Collaboration", desc: "Enhanced credibility for industry-sponsored R&D partnerships and consultancy projects." },
  { icon: Award, title: "National Recognition", desc: "Recognition as a research-capable institution by the Government of India." },
  { icon: FileText, title: "Tax Benefits", desc: "Weighted tax deduction benefits under Section 35(2AB) of Income Tax Act for R&D expenditure." },
];

const RESEARCH_AREAS = [
  "Renewable Energy & Smart Grid Systems",
  "Internet of Things (IoT) & Embedded Systems",
  "Machine Learning & Artificial Intelligence",
  "Environmental Engineering & Sustainability",
  "Structural Engineering & Materials Science",
  "Biomedical Signal Processing",
  "VLSI Design & Microelectronics",
  "Data Science & Cloud Computing",
];

export default function SIROPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Hero Design — Non Card */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0F766E]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#0F766E]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0F766E]/10 border border-[#0F766E]/20 mb-6">
              <FlaskConical className="w-4 h-4 text-[#0F766E]" />
              <span className="text-[12px] font-bold text-[#0F766E] uppercase tracking-widest">Research Excellence</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              SIRO (DSIR)
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              Scientific and Industrial Research Organisation — recognized by the Department of Scientific and Industrial Research, Government of India.
            </p>
          </motion.div>
          
          {/* Right: Featured Image */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#0F766E]/20">
              <img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1000&auto=format&fit=crop" alt="SIRO (DSIR)" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">SIRO (DSIR)</span>
        </nav>

        {/* About */}
        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="inline-block px-4 py-1.5 bg-[#2E7D32]/10 text-[#2E7D32] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Research Excellence</div>
                <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-6">About SIRO Recognition</h2>
                <p className="text-gray-500 text-[15px] leading-[1.9] mb-4">
                  Trident Academy of Technology has been recognized as a Scientific and Industrial Research Organisation (SIRO) by the Department of Scientific and Industrial Research (DSIR), Ministry of Science and Technology, Government of India.
                </p>
                <p className="text-gray-500 text-[15px] leading-[1.9]">
                  This prestigious recognition acknowledges the institution's significant contributions to scientific research, technological innovation, and industry-oriented R&D activities. It validates TAT's research infrastructure, faculty competence, and research output.
                </p>
              </div>
              <div className="lg:w-[280px] flex-shrink-0 bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] rounded-2xl p-8 text-white flex flex-col justify-center text-center">
                <Microscope className="w-12 h-12 mx-auto mb-4 text-white/80" />
                <div className="text-[14px] font-bold mb-1">Recognized by</div>
                <div className="text-[20px] font-black mb-4">DSIR, Govt. of India</div>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-[24px] font-black">2018</div>
                  <div className="text-white/50 text-[11px] uppercase tracking-wider">Since</div>
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Benefits */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-10">Benefits of SIRO</h2>
        </FadeInUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {BENEFITS.map((b, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#2E7D32]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#2E7D32]/10 flex items-center justify-center mb-5 group-hover:bg-[#2E7D32] transition-colors">
                <b.icon size={22} className="text-[#2E7D32] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-[#1a2352] mb-2">{b.title}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Research Areas */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-10">Focus Research Areas</h2>
        </FadeInUp>
        <FadeInUp delay={100}>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESEARCH_AREAS.map((area, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-[#2E7D32]/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={14} className="text-[#2E7D32]" />
                  </div>
                  <span className="text-[15px] font-medium text-gray-700">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
