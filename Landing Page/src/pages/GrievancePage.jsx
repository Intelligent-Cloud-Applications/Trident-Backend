import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, ShieldAlert, FileText, Mail, Phone, Users, CheckCircle, AlertTriangle, ArrowRight, ClipboardList } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const PROCESS_STEPS = [
  { step: "01", title: "Submit Grievance", desc: "Fill out the online grievance form or submit a written application to the Grievance Cell.", icon: ClipboardList },
  { step: "02", title: "Acknowledgement", desc: "Receive an acknowledgement within 3 working days with a unique reference number.", icon: FileText },
  { step: "03", title: "Investigation", desc: "The Grievance Committee reviews and investigates the complaint within 15 working days.", icon: Users },
  { step: "04", title: "Resolution", desc: "A fair resolution is communicated to the complainant and implemented promptly.", icon: CheckCircle },
];

const CATEGORIES = [
  { title: "Academic Grievances", items: ["Examination-related issues", "Assessment and evaluation concerns", "Teaching quality feedback", "Course content discrepancies", "Project and internship issues"] },
  { title: "Administrative Grievances", items: ["Admission-related issues", "Fee-related concerns", "Certificate and document delays", "Scholarship and financial aid", "Transport and hostel facilities"] },
  { title: "Infrastructure Grievances", items: ["Laboratory equipment issues", "Library resource access", "Internet and IT services", "Classroom and campus maintenance", "Canteen and hygiene concerns"] },
];

const COMMITTEE = [
  { name: "Prof. (Dr.) Sasmita Mishra", role: "Chairperson", dept: "Administration" },
  { name: "Prof. Rajesh Kumar Sahoo", role: "Member Secretary", dept: "CSE Department" },
  { name: "Prof. Sanjay Kumar Das", role: "Member", dept: "ECE Department" },
  { name: "Prof. Priyanka Panda", role: "Member", dept: "Civil Department" },
  { name: "Ms. Sunita Behera", role: "Student Representative", dept: "Student Council" },
];

export default function GrievancePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
            {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#94A3B8]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#94A3B8]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#94A3B8]/10 border border-[#94A3B8]/20 mb-6">
              <ShieldAlert className="w-4 h-4 text-[#94A3B8]" />
              <span className="text-[12px] font-bold text-[#94A3B8] uppercase tracking-widest">Trident Academy</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              Grievance Redressal
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              A transparent and efficient mechanism to address student and stakeholder concerns with fairness and confidentiality.
            </p>
          </motion.div>
          
          {/* Right: Featured Image with Glassmorphism Float */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#94A3B8]/20">
              <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/50 to-transparent" />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#94A3B8]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#94A3B8]" />
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
          <span className="text-[#212529] font-bold">Grievance Redressal</span>
        </nav>

        {/* Process Steps */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1E293B] mb-2">How It Works</h2>
          <p className="text-gray-500 text-[15px] mb-10">A simple four-step process for grievance resolution.</p>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {PROCESS_STEPS.map((s, i) => (
            <FadeInUp key={i} delay={i * 100}>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow h-full relative overflow-hidden">
                <div className="absolute top-4 right-4 text-[48px] font-black text-gray-50 leading-none">{s.step}</div>
                <div className="w-12 h-12 rounded-xl bg-[#475569]/10 flex items-center justify-center mb-5">
                  <s.icon size={22} className="text-[#475569]" />
                </div>
                <h3 className="font-sans text-[18px] font-bold text-[#1E293B] mb-2 relative z-10">{s.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed relative z-10">{s.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Categories */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1E293B] mb-2">Grievance Categories</h2>
          <p className="text-gray-500 text-[15px] mb-10">Types of grievances handled by the committee.</p>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {CATEGORIES.map((cat, i) => (
            <FadeInUp key={i} delay={i * 100}>
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm h-full">
                <h3 className="font-sans text-[20px] font-bold text-[#1E293B] mb-6">{cat.title}</h3>
                <ul className="space-y-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-[14px] text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#94A3B8] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
          ))}
        </div>

        {/* Committee */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1E293B] mb-2">Grievance Committee</h2>
          <p className="text-gray-500 text-[15px] mb-10">Members constituting the Grievance Redressal Cell.</p>
        </FadeInUp>
        <FadeInUp delay={100}>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16 overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">Name</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">Role</th>
                  <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest pb-4">Department</th>
                </tr>
              </thead>
              <tbody>
                {COMMITTEE.map((m, i) => (
                  <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-[#f8f9fa] transition-colors">
                    <td className="py-4 text-[15px] font-bold text-[#1E293B]">{m.name}</td>
                    <td className="py-4 text-[14px] text-[#475569] font-medium">{m.role}</td>
                    <td className="py-4 text-[14px] text-gray-500">{m.dept}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInUp>

        {/* Contact */}
        <FadeInUp>
          <div className="bg-gradient-to-br from-[#475569] to-[#1E293B] rounded-3xl p-8 md:p-12 text-white mb-16">
            <h3 className="font-serif text-[28px] font-bold mb-6">Need to File a Grievance?</h3>
            <p className="text-white/70 text-[15px] mb-8 max-w-2xl">Contact the Grievance Redressal Cell through any of the following channels. All complaints are treated with strict confidentiality.</p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a href="mailto:grievance@trident.ac.in" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-4 rounded-xl">
                <Mail size={18} className="text-[#94A3B8]" />
                <span className="text-[14px] font-medium">grievance@trident.ac.in</span>
              </a>
              <a href="tel:+916742725113" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-colors px-6 py-4 rounded-xl">
                <Phone size={18} className="text-[#94A3B8]" />
                <span className="text-[14px] font-medium">+91 674 272 5113</span>
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
