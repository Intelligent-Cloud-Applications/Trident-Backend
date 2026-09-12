import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Quote, Star, GraduationCap, Briefcase, CheckCircle } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

import { alumniData } from '../data/alumniData';

const TESTIMONIALS = alumniData.slice(0, 30).map(alumni => ({
  name: alumni.name,
  role: alumni.designation || 'Alumni',
  batch: alumni.batch || 'B.Tech',
  text: alumni.text || "Trident gave me the foundation I needed to excel in my career.",
  rating: 5,
  color: "#BE123C",
  image: `/alumni/B.Tech/${alumni.image_file}`
}));

export default function TestimonialsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Split testimonials for masonry layout
  const col1 = TESTIMONIALS.filter((_, i) => i % 3 === 0);
  const col2 = TESTIMONIALS.filter((_, i) => i % 3 === 1);
  const col3 = TESTIMONIALS.filter((_, i) => i % 3 === 2);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FB7185]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FB7185]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FB7185]/10 border border-[#FB7185]/20 mb-6">
              <Quote className="w-4 h-4 text-[#FB7185]" />
              <span className="text-[12px] font-bold text-[#FB7185] uppercase tracking-widest">Alumni Network</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              Success Stories
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              Hear from our alumni and students about their transformative journey and how Trident Academy of Technology shaped their careers.
            </p>
          </motion.div>
          
          {/* Right: Featured Image with Glassmorphism Float */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#FB7185]/20">
              <img src="/indian_students_hero.png" alt="Indian Students Celebrating" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/50 to-transparent" />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#FB7185]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#FB7185]" />
              </div>
              <div>
                <div className="text-[20px] font-black text-[#1a2352]">5000+</div>
                <div className="text-[12px] font-bold text-gray-500 uppercase">Global Alumni</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#9F1239] uppercase tracking-[0.2em] mb-12 border-b border-gray-100 pb-8">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">Testimonials</span>
        </nav>

        {/* Masonry Layout for Testimonials - Editorial Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-8">
            {col1.map((t, i) => (
              <TestimonialCard key={`col1-${i}`} t={t} delay={i * 0.1} />
            ))}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-8 lg:mt-16">
            {col2.map((t, i) => (
              <TestimonialCard key={`col2-${i}`} t={t} delay={i * 0.1 + 0.2} />
            ))}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-8 lg:mt-8">
            {col3.map((t, i) => (
              <TestimonialCard key={`col3-${i}`} t={t} delay={i * 0.1 + 0.4} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

// Separate component for the testimonial block to keep code clean
function TestimonialCard({ t, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group p-8 border-b border-r border-gray-100 hover:bg-gray-50 transition-all duration-300 relative"
    >
      <Quote size={32} className="text-[#FB7185]/20 mb-6 group-hover:text-[#FB7185]/40 transition-colors" />
      
      <p className="text-gray-700 text-[16px] leading-[1.8] font-serif italic mb-8">
        "{t.text}"
      </p>

      <div className="flex items-center gap-4">
        <div className="relative">
          <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover" />
          <div className="absolute inset-0 rounded-full border border-black/10" />
        </div>
        <div>
          <h3 className="font-sans text-[16px] font-bold text-[#881337]">{t.name}</h3>
          <div className="flex items-center gap-1.5 text-[12px] text-gray-500 mt-0.5">
            <Briefcase size={12} />
            <span className="truncate">{t.role}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#9F1239] mt-1.5">
            <GraduationCap size={12} />
            <span>Batch {t.batch}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
