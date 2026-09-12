import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, ScrollText } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const SECTIONS = [
  { title: "1. Acceptance of Terms", content: "By accessing and using the Trident Academy of Technology website ('the Website'), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you should not use or access this website. These terms apply to all visitors, users, and others who access or use the website." },
  { title: "2. Use of Website", content: "You agree to use this website only for lawful purposes. You may not use this website in any way that breaches any applicable local, national, or international law, or in any way that is fraudulent or harmful. The website is intended for informational purposes about Trident Academy of Technology and its academic programs." },
  { title: "3. Intellectual Property", content: "All content on this website, including but not limited to text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of Trident Academy of Technology or its content suppliers and is protected by Indian and international copyright laws. Unauthorized reproduction, modification, distribution, or reuse of any content is strictly prohibited." },
  { title: "4. User Submissions", content: "By submitting any information through our website forms (including admission inquiries, feedback, and contact forms), you grant TAT a non-exclusive, royalty-free right to use, reproduce, and process the submitted information for institutional purposes. You represent that you have the right to share such information and that it is accurate." },
  { title: "5. Account Security", content: "If you access any password-protected areas of the website (such as the E-Governance portal or student login), you are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account. TAT shall not be liable for any loss arising from unauthorized access to your account." },
  { title: "6. Limitation of Liability", content: "Trident Academy of Technology shall not be held liable for any damages, losses, or expenses arising out of or in connection with the use of this website. This includes, but is not limited to, direct, indirect, incidental, punitive, and consequential damages. The total liability shall not exceed the amount paid by you, if any, for accessing this website." },
  { title: "7. Indemnification", content: "You agree to indemnify and hold harmless Trident Academy of Technology, its officers, directors, employees, agents, and affiliates from any claims, damages, losses, or expenses (including legal fees) arising out of your use of the website, violation of these terms, or infringement of any intellectual property or other rights of any person or entity." },
  { title: "8. Modifications", content: "Trident Academy of Technology reserves the right to revise these terms of use at any time without prior notice. By using this website, you agree to be bound by the current version of these Terms of Use. Changes become effective immediately upon posting on the website." },
  { title: "9. Governing Law", content: "These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Bhubaneswar, Odisha, India." },
  { title: "10. Contact", content: "For any questions regarding these Terms of Use, please contact: The Registrar, Trident Academy of Technology, F2/A, Chandaka Industrial Estate, Bhubaneswar, Odisha, 751024. Email: info@trident.ac.in" },
];

export default function TermsOfUsePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative w-full h-[40vh] min-h-[300px] max-h-[400px] bg-[#1a2352] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1450101499161-2cce6d25a66a?q=80&w=2000&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-[#1a2352]/50 to-[#283B91]/60" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#f4f7f9] to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 pt-32 max-w-5xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/10 mx-auto">
            <ScrollText className="w-7 h-7 text-[#E5AA3E]" />
          </div>
          <h1 className="font-serif text-[40px] md:text-[56px] font-black text-white leading-[1.1] mb-4 tracking-tight">Terms of Use</h1>
          <p className="text-white/60 text-[14px]">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">Terms of Use</span>
        </nav>

        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0">
            <p className="text-gray-500 text-[15px] leading-[1.9] mb-10">
              Please read these Terms of Use carefully before using the Trident Academy of Technology website. These terms govern your use of the website and all associated services provided by the institution.
            </p>
            <div className="space-y-10">
              {SECTIONS.map((s, i) => (
                <div key={i}>
                  <h2 className="font-sans text-[20px] font-bold text-[#1a2352] mb-3">{s.title}</h2>
                  <p className="text-gray-500 text-[15px] leading-[1.9]">{s.content}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
