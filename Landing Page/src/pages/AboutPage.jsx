import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Building, Target, Eye, Heart, Award, Users, GraduationCap, MapPin, Sparkles } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const MILESTONES = [
  { year: "2005", title: "Foundation", desc: "Trident Academy of Technology established under The DF Group with AICTE approval." },
  { year: "2009", title: "First Batch Graduates", desc: "First cohort of engineering graduates pass out with excellent placement records." },
  { year: "2012", title: "NBA Accreditation", desc: "Multiple engineering programs receive NBA accreditation for quality education." },
  { year: "2015", title: "NAAC Accreditation", desc: "Awarded NAAC accreditation recognizing academic excellence and governance." },
  { year: "2018", title: "SIRO Recognition", desc: "Recognized as Scientific and Industrial Research Organisation by DSIR." },
  { year: "2022", title: "CISCO thingQbator", desc: "Launch of CISCO thingQbator innovation hub for IoT and entrepreneurship." },
  { year: "2024", title: "Continued Excellence", desc: "Ranked among top engineering institutions in Odisha with 5000+ alumni network." },
];

const VALUES = [
  { icon: Target, title: "Excellence", desc: "Pursuit of the highest standards in teaching, research, and institutional governance.", color: "#D97706" },
  { icon: Heart, title: "Integrity", desc: "Ethical conduct and transparency in all academic and administrative processes.", color: "#DC2626" },
  { icon: Sparkles, title: "Innovation", desc: "Fostering creativity, entrepreneurial thinking, and technology-driven solutions.", color: "#7C3AED" },
  { icon: Users, title: "Inclusivity", desc: "Embracing diversity and providing equal opportunities for all stakeholders.", color: "#0891B2" },
  { icon: GraduationCap, title: "Student-Centricity", desc: "Placing students at the heart of every initiative, policy, and decision.", color: "#059669" },
  { icon: Building, title: "Social Responsibility", desc: "Contributing to community development and sustainable practices.", color: "#2563EB" },
];

export default function AboutPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Hero — Warm Gold/Amber theme */}
      <div className="relative w-full h-[60vh] min-h-[450px] max-h-[550px] bg-[#78350F] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2000&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#451A03]/70 via-[#78350F]/50 to-[#92400E]/60" />
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#F59E0B]/20 blur-[120px]" />
          <div className="absolute bottom-[15%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#D97706]/15 blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#FFFBF5] to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 pt-32 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10">
              <Building className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <h1 className="font-serif text-[48px] md:text-[72px] font-black text-white leading-[1.1] mb-6 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#FCD34D]">TAT</span>
            </h1>
            <p className="text-white/80 text-[16px] md:text-[20px] max-w-3xl leading-relaxed font-light">
              Trident Academy of Technology — Where education meets excellence, shaping future leaders and innovators since 2005.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">About Us</span>
        </nav>

        {/* Vision & Mission — Unique split cards with amber accent */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <FadeInUp>
            <div className="py-12 border-b border-gray-100 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/5 rounded-bl-[80px]" />
              <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-6">
                <Eye size={24} className="text-[#D97706]" />
              </div>
              <h2 className="font-serif text-[28px] font-bold text-[#451A03] mb-4">Our Vision</h2>
              <p className="text-[#78716C] text-[15px] leading-[1.9]">
                To be a premier institution of academic excellence, producing world-class professionals and researchers who contribute to technological advancement and societal transformation. We aspire to create an ecosystem where knowledge, innovation, and ethics converge to empower every student for global leadership.
              </p>
            </div>
          </FadeInUp>
          <FadeInUp delay={150}>
            <div className="py-12 px-6 lg:px-12 bg-gray-50 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F59E0B]/10 rounded-bl-[80px]" />
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Target size={24} className="text-[#F59E0B]" />
              </div>
              <h2 className="font-serif text-[28px] font-bold text-white mb-4">Our Mission</h2>
              <ul className="space-y-3 text-white/70 text-[15px] leading-[1.8]">
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 flex-shrink-0" />Provide quality technical education with industry-relevant curriculum</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 flex-shrink-0" />Foster research, innovation, and entrepreneurial thinking</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 flex-shrink-0" />Develop holistic professionals with ethical values and social responsibility</li>
                <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-2.5 flex-shrink-0" />Build strong industry-academia partnerships for global exposure</li>
              </ul>
            </div>
          </FadeInUp>
        </div>

        {/* Stats — Amber-themed */}
        <FadeInUp>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
            {[
              { num: "5000+", label: "Alumni Network" }, { num: "200+", label: "Faculty Members" },
              { num: "15+", label: "Departments" }, { num: "50+", label: "Acre Campus" },
              { num: "100%", label: "AICTE Approved" }, { num: "20+", label: "Years of Excellence" },
            ].map((s,i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-[#FDE68A]/30 shadow-sm hover:shadow-md hover:border-[#F59E0B]/40 transition-all">
                <div className="text-[#D97706] text-[26px] font-black mb-1">{s.num}</div>
                <div className="text-[10px] font-bold text-[#A8A29E] uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeInUp>

        {/* Story */}
        <FadeInUp>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#FDE68A]/30 shadow-sm mb-16">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <h2 className="font-serif text-[32px] font-bold text-[#451A03] mb-6">Our Story</h2>
                <div className="text-[#78716C] text-[15px] leading-[1.9] space-y-4">
                  <p>Trident Academy of Technology (TAT), established in 2005 under the aegis of The DF Group, is one of the premier engineering institutions in Odisha, India. Located in the IT hub of Bhubaneswar at Chandaka Industrial Estate, the institution is approved by AICTE and affiliated to Biju Patnaik University of Technology (BPUT).</p>
                  <p>With a sprawling campus spanning over 50 acres, TAT offers undergraduate and postgraduate programs across multiple engineering disciplines. The institution is committed to producing industry-ready professionals through a blend of theoretical knowledge and practical skills development.</p>
                  <p>Over the years, TAT has earned recognition from multiple accreditation bodies including NAAC, NBA, NIRF, and DSIR (SIRO). The institution boasts world-class infrastructure, a vibrant campus life, and an extensive alumni network spread across global tech companies.</p>
                </div>
              </div>
              <div className="flex-1 w-full">
                <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop" alt="University Campus" className="w-full h-[400px] object-cover rounded-3xl shadow-xl" />
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Core Values — Multi-colored icon cards */}
        <FadeInUp><h2 className="font-serif text-[32px] font-bold text-[#451A03] mb-10">Core Values</h2></FadeInUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {VALUES.map((v, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="group bg-white p-8 rounded-2xl border border-[#FDE68A]/20 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors" style={{ background: `${v.color}15` }}>
                <v.icon size={22} style={{ color: v.color }} />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-[#451A03] mb-2">{v.title}</h3>
              <p className="text-[#78716C] text-[14px] leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <FadeInUp><h2 className="font-serif text-[32px] font-bold text-[#451A03] mb-10">Our Journey</h2></FadeInUp>
        <div className="relative mb-16">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#FDE68A] md:-translate-x-px" />
          {MILESTONES.map((m, i) => (
            <FadeInUp key={i} delay={i * 80}>
              <div className={`relative flex flex-col md:flex-row items-start mb-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-16 md:pl-0`}>
                  <div className="bg-white p-6 rounded-2xl border border-[#FDE68A]/30 shadow-sm inline-block text-left">
                    <span className="text-[#D97706] text-[13px] font-black uppercase tracking-widest">{m.year}</span>
                    <h3 className="font-sans text-[18px] font-bold text-[#451A03] mt-1 mb-2">{m.title}</h3>
                    <p className="text-[#78716C] text-[14px] leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-[#D97706] rounded-full border-4 border-[#FFFBF5] -translate-x-1.5 mt-8 z-10" />
                <div className="flex-1 hidden md:block" />
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Location CTA */}
        <FadeInUp>
          <div className="bg-gradient-to-br from-[#78350F] to-[#451A03] rounded-3xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <h3 className="font-serif text-[28px] font-bold mb-4">Visit Our Campus</h3>
                <p className="text-white/70 text-[15px] mb-6">Experience our world-class facilities and vibrant campus life firsthand.</p>
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#F59E0B] mt-1 flex-shrink-0" />
                  <span className="text-white/80 text-[14px] leading-relaxed">F2/A, Chandaka Industrial Estate, In front of Infocity, Bhubaneswar, Odisha, Pin: 751024, India</span>
                </div>
              </div>
              <a href="https://contactus-tat.tekkzy.com" className="bg-[#F59E0B] hover:bg-[#D97706] transition-colors px-6 py-3 rounded-xl text-[14px] font-bold text-[#451A03]">Contact Us</a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
