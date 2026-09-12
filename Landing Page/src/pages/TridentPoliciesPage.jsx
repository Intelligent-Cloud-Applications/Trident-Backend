import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, FileText, Download } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const POLICIES = [
  { title: "Zero Emission Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Zero-Emission-Policy.pdf" },
  { title: "Energy Conservation Pledge", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Energy-Conservation-Pledge.pdf" },
  { title: "Sustainable Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Sustainable-Policy.pdf" },
  { title: "Start-up Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Start-up-Policy.pdf" },
  { title: "Climate Action Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Climate-Action-Policy.pdf" },
  { title: "Policy to safeguard individuals reporting discrimination", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Policy-to-safeguard-individual-rights.pdf" },
  { title: "Anti-discrimination and Equal Employment Opportunity Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Anti-discrimination-and-Equal-employment-Policy.pdf" },
  { title: "Policy promoting women's applications and enrolment", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Policy-promoting-womens-applications-and-participation.pdf" },
  { title: "Smoke free Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Smoke-free-Policy.pdf" },
  { title: "Scholarship Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Scholarship_Policy.pdf" },
  { title: "Pay scale equality policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Pay-scale-equity-policy.pdf" },
  { title: "Annual Increment criteria for Academic Staff", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Annual-Increment-criteria-for-Academic-Staff.pdf" },
  { title: "Leave Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Leave-Policy.pdf" },
  { title: "Water Reuse Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Water-Reuse-Policy.pdf" },
  { title: "Food Waste Management Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Food-Waste-Management-Policy.pdf" },
  { title: "Energy Efficiency standards for buildings Policy", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Energy-Efficiency-standards-for-buildings-Policy.pdf" },
];

export default function TridentPoliciesPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50 rounded-bl-[100px]" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12">
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-10">
            <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-blue-600 font-bold">Trident Policies</span>
          </nav>
          
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 mb-6">
              <FileText className="w-4 h-4 text-blue-700" />
              <span className="text-[12px] font-bold text-blue-700 uppercase tracking-widest">Official Documents</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              Trident Policies
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <FadeInUp>
          <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-8 lg:p-12 mb-16">
            <div className="grid grid-cols-1 gap-3">
              {POLICIES.map((policy, idx) => (
                <a 
                  key={idx} 
                  href={policy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-blue-50 hover:border-blue-100 transition-all group"
                >
                  <span className="text-[15px] font-semibold text-gray-700 group-hover:text-blue-800 transition-colors">{policy.title}</span>
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:shadow-md transition-all">
                    <Download size={14} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
