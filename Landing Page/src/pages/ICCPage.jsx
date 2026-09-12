import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Shield, Users, FileText, AlertTriangle, Phone, Mail, Scale, CheckCircle, BookOpen } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const OBJECTIVES = [
  "Prevent sexual harassment at the workplace and educational institution",
  "Provide a safe and secure environment for women students, faculty, and staff",
  "Address complaints of sexual harassment in a time-bound manner",
  "Ensure fair and impartial inquiry process with complete confidentiality",
  "Create awareness about gender sensitization and women's rights",
  "Recommend appropriate action against the perpetrators",
];

const COMMITTEE_MEMBERS = [
  { name: "Prof. (Dr.) Sujata Mohanty", role: "Presiding Officer", desc: "Senior woman faculty member" },
  { name: "Prof. Priyanka Nayak", role: "Member", desc: "Department of CSE" },
  { name: "Prof. Smita Rath", role: "Member", desc: "Department of ECE" },
  { name: "Ms. Ranjita Das", role: "External Member", desc: "Legal Practitioner / NGO Representative" },
  { name: "Ms. Sneha Mishra", role: "Student Representative", desc: "Student Council Member" },
];

const RIGHTS = [
  { title: "Right to Fair Hearing", desc: "Every complainant has the right to a fair, unbiased, and confidential hearing process." },
  { title: "Right to Confidentiality", desc: "Identity and details of the complainant are kept strictly confidential throughout the process." },
  { title: "Right to Interim Relief", desc: "The committee can recommend interim measures to protect the complainant during inquiry." },
  { title: "Right to Appeal", desc: "Both parties have the right to appeal against the ICC's recommendations within 90 days." },
];

export default function ICCPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
            {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#E5AA3E]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#E5AA3E]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E5AA3E]/10 border border-[#E5AA3E]/20 mb-6">
              <Shield className="w-4 h-4 text-[#E5AA3E]" />
              <span className="text-[12px] font-bold text-[#E5AA3E] uppercase tracking-widest">Trident Academy</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              ICC
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              Internal Complaints Committee — Ensuring a safe, respectful, and harassment-free environment as per the POSH Act, 2013.
            </p>
          </motion.div>
          
          {/* Right: Featured Image with Glassmorphism Float */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#E5AA3E]/20">
              <img src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1000&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/50 to-transparent" />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E5AA3E]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#E5AA3E]" />
              </div>
              <div>
                <div className="text-[20px] font-black text-[#1a2352]">Verified</div>
                <div className="text-[12px] font-bold text-gray-500 uppercase">Information</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">ICC</span>
        </nav>

        {/* About ICC */}
        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="flex-1">
                <div className="inline-block px-4 py-1.5 bg-[#C5282F]/10 text-[#C5282F] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">POSH Act 2013</div>
                <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-6">About the Committee</h2>
                <p className="text-gray-500 text-[15px] leading-[1.9] mb-6">
                  The Internal Complaints Committee (ICC) at Trident Academy of Technology has been constituted as per the provisions of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 and UGC Regulations 2015.
                </p>
                <p className="text-gray-500 text-[15px] leading-[1.9] mb-8">
                  The ICC is committed to providing a safe and conducive learning and working environment for all students, faculty, and staff, free from any form of sexual harassment or gender-based discrimination.
                </p>
                <div className="bg-[#FDF2F0] rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Scale className="w-6 h-6 text-[#C5282F]" />
                    <div className="text-[14px] font-bold text-[#1a2352]">Legal Framework</div>
                  </div>
                  <ul className="grid grid-cols-2 gap-2 text-[13px] text-gray-600">
                    <li>• POSH Act, 2013</li>
                    <li>• UGC Regulations, 2015</li>
                    <li>• Vishakha Guidelines</li>
                    <li>• AICTE Directives</li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 w-full">
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000&auto=format&fit=crop" alt="Women Professionals Meeting" className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Objectives */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-2">Objectives</h2>
          <p className="text-gray-500 text-[15px] mb-10">Core objectives of the Internal Complaints Committee.</p>
        </FadeInUp>
        <FadeInUp delay={100}>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBJECTIVES.map((obj, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-[#f8f9fa] transition-colors">
                  <div className="w-7 h-7 rounded-lg bg-[#C5282F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-[#C5282F]" />
                  </div>
                  <span className="text-[14px] text-gray-600 leading-relaxed">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Rights */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-10">Your Rights</h2>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {RIGHTS.map((r, i) => (
            <FadeInUp key={i} delay={i * 80}>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="w-8 h-1 bg-[#C5282F] rounded-full mb-5" />
                <h3 className="font-sans text-[18px] font-bold text-[#1a2352] mb-3">{r.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">{r.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Committee Members */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-10">Committee Members</h2>
        </FadeInUp>
        <FadeInUp delay={100}>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">Name</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">Designation</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">Description</th>
                </tr>
              </thead>
              <tbody>
                {COMMITTEE_MEMBERS.map((m, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-4 text-[15px] font-bold text-[#1a2352]">{m.name}</td>
                    <td className="py-4"><span className="text-[12px] font-bold text-[#C5282F] bg-[#C5282F]/10 px-3 py-1 rounded-full">{m.role}</span></td>
                    <td className="py-4 text-[14px] text-gray-500">{m.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        {/* Contact */}
        <FadeInUp>
          <div className="bg-gradient-to-br from-[#C5282F] to-[#8B1A1A] rounded-3xl p-8 md:p-12 text-white mb-16">
            <h3 className="font-serif text-[28px] font-bold mb-4">Report a Complaint</h3>
            <p className="text-white/70 text-[15px] mb-8 max-w-2xl">All complaints are handled with utmost confidentiality. You can reach the ICC through the following channels.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="mailto:icc@trident.ac.in" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-4 rounded-xl">
                <Mail size={18} className="text-[#E5AA3E]" />
                <span className="text-[14px] font-medium">icc@trident.ac.in</span>
              </a>
              <a href="tel:+916742725113" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-4 rounded-xl">
                <Phone size={18} className="text-[#E5AA3E]" />
                <span className="text-[14px] font-medium">+91 674 272 5113</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
