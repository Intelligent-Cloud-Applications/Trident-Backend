import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, BookOpen, Download, ExternalLink, FileText, GraduationCap, Building, Users, Award, MapPin } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const HIGHLIGHTS = [
  { icon: GraduationCap, title: "15+ Programs", desc: "UG and PG programs across Engineering, Computing, and Biotechnology." },
  { icon: Building, title: "50+ Acre Campus", desc: "Modern infrastructure with smart classrooms, labs, and recreational facilities." },
  { icon: Users, title: "200+ Faculty", desc: "Highly qualified and experienced faculty with industry exposure." },
  { icon: Award, title: "NAAC & NBA", desc: "Accredited institution with consistent quality benchmarks." },
  { icon: MapPin, title: "IT Hub Location", desc: "Located in Bhubaneswar's IT corridor near Infocity for industry access." },
  { icon: FileText, title: "Research Excellence", desc: "SIRO-recognized institution with active research contributions." },
];

const BROCHURE_SECTIONS = [
  "Institutional overview and history",
  "Vision, Mission, and Core Values",
  "Academic programs and curriculum details",
  "Faculty profiles and research areas",
  "Campus infrastructure and facilities",
  "Library and digital learning resources",
  "Placement statistics and recruiter list",
  "Student life, clubs, and activities",
  "Accreditations and rankings (NAAC, NBA, NIRF)",
  "Admission process and fee structure",
  "Scholarships and financial aid",
  "Contact information and campus map",
];

export default function InformationBrochurePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Hero Design — Non Card */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1a2352]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1a2352]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a2352]/10 border border-[#1a2352]/20 mb-6">
              <BookOpen className="w-4 h-4 text-[#1a2352]" />
              <span className="text-[12px] font-bold text-[#1a2352] uppercase tracking-widest">Information & Admissions</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              Information Brochure
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              Comprehensive details about programs, admissions, facilities, and everything you need to know about Trident Academy of Technology.
            </p>
          </motion.div>
          
          {/* Right: Featured Image */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#1a2352]/20">
              <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1000&auto=format&fit=crop" alt="Information Brochure" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">Information Brochure</span>
        </nav>

        {/* Download CTA */}
        <FadeInUp>
          <div className="bg-gradient-to-br from-[#283B91] to-[#1a2352] rounded-3xl p-8 md:p-12 text-white mb-16 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h2 className="font-serif text-[32px] font-bold mb-4">Download Our Brochure</h2>
              <p className="text-white/70 text-[15px] max-w-xl leading-relaxed">
                Get a comprehensive overview of Trident Academy of Technology — from academic programs to campus life, placements to research initiatives.
              </p>
            </div>
            <a href="#" className="flex items-center gap-3 bg-[#E5AA3E] hover:bg-[#d4992e] text-[#1a2352] px-8 py-4 rounded-xl text-[13px] font-black uppercase tracking-widest transition-colors flex-shrink-0">
              <Download size={18} />
              Download PDF
            </a>
          </div>
        </FadeInUp>

        {/* Highlights */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-10">Institution at a Glance</h2>
        </FadeInUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {HIGHLIGHTS.map((h, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#283B91]/10 flex items-center justify-center mb-5">
                <h.icon size={22} className="text-[#283B91]" />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-[#1a2352] mb-2">{h.title}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">{h.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Brochure Contents */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-2">What's Inside</h2>
          <p className="text-gray-500 text-[15px] mb-10">Contents covered in the information brochure.</p>
        </FadeInUp>
        <FadeInUp delay={100}>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {BROCHURE_SECTIONS.map((section, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-[#E5AA3E]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#E5AA3E] text-[12px] font-black">{String(i+1).padStart(2, '0')}</span>
                  </div>
                  <span className="text-[15px] font-medium text-gray-700">{section}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
