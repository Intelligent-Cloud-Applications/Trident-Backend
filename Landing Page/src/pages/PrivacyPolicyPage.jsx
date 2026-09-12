import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Shield } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const SECTIONS = [
  { title: "1. Information We Collect", content: "We may collect personal information such as your name, email address, phone number, and academic details when you voluntarily provide them through forms on our website. We also automatically collect certain technical data including your IP address, browser type, device information, and browsing patterns through cookies and similar technologies." },
  { title: "2. How We Use Your Information", content: "The information collected is used to process admissions and inquiries, communicate important updates about academic programs and events, improve our website functionality and user experience, comply with legal obligations and institutional requirements, and send relevant notifications about placement opportunities and campus activities." },
  { title: "3. Data Sharing & Disclosure", content: "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except as required by law, regulatory bodies, or affiliated universities (such as BPUT) for academic and administrative purposes. Trusted third-party service providers who assist us in operating our website are bound by confidentiality agreements." },
  { title: "4. Cookies & Tracking", content: "Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device that help us remember your preferences and understand how you interact with our website. You may choose to disable cookies through your browser settings, though this may affect certain functionalities of the website." },
  { title: "5. Data Security", content: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, and regular security audits. However, no method of electronic transmission or storage is 100% secure." },
  { title: "6. Third-Party Links", content: "Our website may contain links to third-party websites such as BPUT, AICTE, UGC, and partner institutions. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies before providing any personal information." },
  { title: "7. Your Rights", content: "You have the right to access, correct, or request deletion of your personal information held by us. You may also opt out of receiving communications from us at any time. To exercise these rights, please contact our data protection officer at the email address provided below." },
  { title: "8. Changes to This Policy", content: "We reserve the right to update this privacy policy at any time. Changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we protect your information." },
  { title: "9. Contact Us", content: "If you have any questions about this Privacy Policy, please contact us at info@trident.ac.in or write to: The Registrar, Trident Academy of Technology, F2/A, Chandaka Industrial Estate, Bhubaneswar, Odisha, 751024." },
];

export default function PrivacyPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="relative w-full h-[40vh] min-h-[300px] max-h-[400px] bg-[#1a2352] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2000&auto=format&fit=crop" alt="Hero Background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a]/70 via-[#1a2352]/50 to-[#283B91]/60" />
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#f4f7f9] to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 pt-32 max-w-5xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 border border-white/10 mx-auto">
            <Shield className="w-7 h-7 text-[#E5AA3E]" />
          </div>
          <h1 className="font-serif text-[40px] md:text-[56px] font-black text-white leading-[1.1] mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-white/60 text-[14px]">Last updated: June 2026</p>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 xl:px-12 mt-8">
        <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-[#8B6E66] uppercase tracking-[0.2em] mb-12">
          <Link to="/" className="hover:text-[#212529] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
          <ChevronRight size={10} />
          <span className="text-[#212529] font-bold">Privacy Policy</span>
        </nav>

        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0">
            <p className="text-gray-500 text-[15px] leading-[1.9] mb-10">
              Trident Academy of Technology ("TAT", "we", "us") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or interact with our services.
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
