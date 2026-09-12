import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, TrendingUp, BarChart3, Award, ExternalLink, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const RANKINGS = [
  { year: "2024", rank: "151–200", band: "Innovator", category: "Engineering", score: "42.56", trend: "up" },
  { year: "2023", rank: "151–200", band: "Innovator", category: "Engineering", score: "40.12", trend: "up" },
  { year: "2022", rank: "201–250", band: "Performer", category: "Engineering", score: "37.89", trend: "same" },
  { year: "2021", rank: "201–250", band: "Performer", category: "Engineering", score: "36.45", trend: "up" },
  { year: "2020", rank: "251–300", band: "—", category: "Engineering", score: "33.21", trend: "same" },
];

const PARAMETERS = [
  { name: "Teaching, Learning & Resources (TLR)", weight: "30%", desc: "Faculty-student ratio, financial resources, and combined metric.", color: "#283B91" },
  { name: "Research & Professional Practice (RP)", weight: "30%", desc: "Publications, patents, projects, and faculty with PhD.", color: "#2E7D32" },
  { name: "Graduation Outcomes (GO)", weight: "20%", desc: "Placements, higher education, median salary, and entrepreneurship.", color: "#E5AA3E" },
  { name: "Outreach & Inclusivity (OI)", weight: "10%", desc: "Regional diversity, women's ratio, economically challenged students.", color: "#C5282F" },
  { name: "Peer Perception (PR)", weight: "10%", desc: "Academic peer perception and employer perception of graduates.", color: "#6D28D9" },
];

export default function NIRFPage() {
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
              <BarChart3 className="w-4 h-4 text-[#1a2352]" />
              <span className="text-[12px] font-bold text-[#1a2352] uppercase tracking-widest">Rankings & Recognition</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              NIRF Rankings
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              National Institutional Ranking Framework — India's premier methodology for ranking institutions of higher education.
            </p>
          </motion.div>
          
          {/* Right: Featured Image */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#1a2352]/20">
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000&auto=format&fit=crop" alt="NIRF Rankings" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">NIRF</span>
        </nav>

        {/* About */}
        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="inline-block px-4 py-1.5 bg-[#283B91]/10 text-[#283B91] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Government of India</div>
            <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-6">About NIRF</h2>
            <p className="text-gray-500 text-[15px] leading-[1.9]">
              The National Institutional Ranking Framework (NIRF) was launched by the Ministry of Education, Government of India, to rank institutions of higher education. NIRF evaluates institutions on five broad parameters: Teaching, Learning & Resources, Research & Professional Practice, Graduation Outcomes, Outreach & Inclusivity, and Peer Perception. Trident Academy of Technology has consistently participated in NIRF and has been ranked among the top engineering institutions in India.
            </p>
          </div>
        </FadeInUp>

        {/* Rankings Table */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-2">Ranking History</h2>
          <p className="text-gray-500 text-[15px] mb-10">TAT's NIRF rankings across years in the Engineering category.</p>
        </FadeInUp>
        <FadeInUp delay={100}>
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm mb-20 overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {["Year", "Rank Band", "Category", "Score", "Trend"].map(h => (
                    <th key={h} className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {RANKINGS.map((r, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-5 text-[16px] font-black text-[#1a2352]">{r.year}</td>
                    <td className="py-5">
                      <span className="bg-[#283B91]/10 text-[#283B91] text-[13px] font-bold px-4 py-1.5 rounded-full">{r.rank}</span>
                    </td>
                    <td className="py-5 text-[14px] text-gray-500 font-medium">{r.category}</td>
                    <td className="py-5 text-[15px] font-bold text-[#1a2352]">{r.score}</td>
                    <td className="py-5">
                      {r.trend === "up" && <ArrowUp size={16} className="text-[#2E7D32]" />}
                      {r.trend === "down" && <ArrowDown size={16} className="text-[#C5282F]" />}
                      {r.trend === "same" && <Minus size={16} className="text-gray-400" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        {/* Parameters */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-10">Ranking Parameters</h2>
        </FadeInUp>
        <div className="space-y-4 mb-16">
          {PARAMETERS.map((p, i) => (
            <FadeInUp key={i} delay={i * 80}>
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.color}15` }}>
                  <BarChart3 size={22} style={{ color: p.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[17px] font-bold text-[#1a2352] mb-1">{p.name}</h3>
                  <p className="text-gray-500 text-[14px]">{p.desc}</p>
                </div>
                <div className="bg-[#f8f9fa] px-5 py-2.5 rounded-lg flex-shrink-0">
                  <span className="text-[18px] font-black" style={{ color: p.color }}>{p.weight}</span>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
}
