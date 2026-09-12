import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Award, FileText, CheckCircle, Users, Activity, FileCheck, Anchor, ArrowRight } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const MEMBERS = [
  "Prof.(Dr.) B.K. Nanda, Eminent Professor, Management Representative",
  "Dr. A Baral, Professor",
  "Dr. Munmun Mohanty, Professor",
  "Dr. Prasant Kumar Rout, Asst. Professor",
  "Er. Subhadarshi Mishra, Industrialist",
  "Mr. B.R. Nanda, DGM (Admin)",
  "Mr. Lohit Ku. Sahoo, Asst. Professor",
  "Mr. Deepak Ku. Mohapatra, Asst. Professor",
  "Mr. A.K. Pattanayak, A.O",
  "Mr. Tara Sankar Mishra, Employer",
  "Mr. Subash Das, Parent",
  "Mrs. Tiyasha Mohanty, Alumna",
  "Mr. Kaushik Das, Student",
];

const RIGHT_BUTTONS = [
  { title: "Institutional Perspective Plan", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Institutionalperspective.pdf" },
  { title: "MoM IQAC", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/iqacmom.pdf" },
  { title: "AQAR 2016-2017", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/AQAR_report-2016-2017.pdf" },
  { title: "AQAR 2017-2018", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/NAAC-AQAR-2017-18-V1.1.pdf" },
  { title: "AQAR 2018-2019", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/NAAC-AQAR-2018-19-V1.0.pdf" },
  { title: "AQAR 2019-2020", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/AQAR2019-2020.pdf" },
  { title: "AQAR 2020-2021", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/AQAR2020-2021.pdf" },
  { title: "AQAR 2021-2022", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/AQAR2021-2022.pdf" },
  { title: "DVV", link: "/dvv" },
];

const AUDIT_BUTTONS = [
  { title: "TRIDENT POLICIES", link: "/trident-policies" },
  { title: "GREEN AUDIT REPORT 22-23", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Trident-Green-Audit-Report-2022-23.pdf" },
  { title: "ENVIRONMENT AUDIT REPORT 22-23", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Trident-Environment-Audit-Report-2022-23.pdf" },
  { title: "ENERGY AUDIT REPORT 22-23", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/Trident-Energy-Audit-Report-2022-23.pdf" },
  { title: "IQAC Internal Audit 22-23", link: "https://site-generator-documents.s3.eu-north-1.amazonaws.com/Accreditation/IQAC+internal+audits.pdf" }
];

const ACTIVITIES = [
  "Internal as well as external academic audit was done under IQAC and committee analyzed the report.",
  "External peer review conducted by academic monitoring committee under IQAC headed by academic director.",
  "IQAC connected to all stake holders by means of feedback responses from students, parents, employee, alumni, etc for quality related processes.",
  "Performance appraisal form of staffs was analyzed.",
  "Introduction of international quality standards in different academic process",
  "Introduction of required ongoing professional skills to the students in addition to academic program",
  "Monitored the operations inside the institute by the quality monitoring committee under IQAC.",
  "Augmentation of required infrastructure for the quality improvement."
];

const MORE_BUTTONS = [
  "MoU",
  "Extension Activity 1",
  "Extension Activity 2",
  "Feedback",
  "Add-On Courses"
];

export default function IQACPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#7C3AED]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12">
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-10">
            <Link to="/" className="hover:text-[#7C3AED] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <span className="text-[#7C3AED] font-bold">IQAC</span>
          </nav>
          
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-6">
                <Award className="w-4 h-4 text-[#7C3AED]" />
                <span className="text-[12px] font-bold text-[#7C3AED] uppercase tracking-widest">Quality Assurance</span>
              </div>
              <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
                Internal Quality <br/> Assurance Cell
              </h1>
              <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
                TRIDENT ACADEMY OF TECHNOLOGY(TAT) is aiming for education and research based environment which will be fruitful to the students.
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
              <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#7C3AED]/20 bg-gradient-to-br from-[#7C3AED] to-[#581C87] p-12 text-white flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
                <div className="relative z-10">
                  <div className="text-[64px] font-black mb-2">16.07.2015</div>
                  <div className="text-white/60 text-[14px] font-bold uppercase tracking-widest mb-8">Established Date</div>
                  <p className="text-white/80 leading-relaxed text-[16px]">
                    Established as per the NAAC guidelines, taking care of all activities required for improving academic quality.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        
        {/* Intro Text */}
        <FadeInUp>
          <div className="bg-gray-50/50 rounded-3xl p-8 lg:p-12 mb-16 border border-gray-100">
            <div className="prose prose-lg text-gray-600 max-w-none">
              <p className="mb-6">
                System's productivity can be improved when system will follow the process cycle like "planning-developing-executing-monitoring-analyzing" just like this, TRIDENT ACADEMY OF TECHNOLOGY(TAT) is aiming for education and research based environment which will be fruitful to the students, follow a process structure executed by Internal Quality Assessment Cell(IQAC) working under guidelines of NAAC.
              </p>
              <p className="mb-6">
                IQAC in TRIDENT ACADEMY OF TECHNOLOGY is working as the backbone of the processes including planning and monitoring the mechanisms to achieve the Institute's vision. IQAC helps to create, to enhance and to maintain the standard and momentum of the quality, what institute aiming for.
              </p>
              <p>
                IQAC in trident academy of technology has been established as per the NAAC guidelines and start functioning from 16.07.2015. This takes care of all the activities required for improving academic quality from the beginning of calendar year by analyzing the previous academic data available.
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* Layout: Committee vs Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Committee / Hierarchy */}
          <div className="lg:col-span-8">
            <FadeInUp>
              <h2 className="font-serif text-[32px] font-bold text-[#3B0764] mb-8 flex items-center gap-3">
                <Users className="text-[#7C3AED]" /> IQAC Committee
              </h2>
              
              <div className="bg-white rounded-[2rem] border border-gray-200 p-8 shadow-sm">
                
                {/* Flowchart */}
                <div className="flex flex-col items-center mb-10">
                  <div className="bg-blue-50 border border-blue-200 text-blue-900 rounded-xl px-8 py-4 text-center min-w-[300px]">
                    <div className="font-bold text-[18px]">Chairman</div>
                    <div className="text-[14px] opacity-80">(Prof.(Dr.) D.N. Pattanayak)</div>
                    <div className="text-[14px] opacity-80">Principal</div>
                  </div>
                  <div className="h-8 w-px bg-blue-300 relative">
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 border-r-2 border-b-2 border-blue-300 rotate-45" />
                  </div>
                  <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl px-8 py-4 text-center min-w-[300px]">
                    <div className="font-bold text-[18px]">Co-ordinator IQAC</div>
                    <div className="text-[14px] opacity-80">(Dr. Sidhartha Sankar Mohapatra)</div>
                    <div className="text-[14px] opacity-80">Asso. Professor</div>
                  </div>
                  <div className="h-8 w-px bg-indigo-300 relative">
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 border-r-2 border-b-2 border-indigo-300 rotate-45" />
                  </div>
                  <div className="bg-purple-50 border border-purple-200 text-purple-900 rounded-xl px-8 py-2 text-center min-w-[300px] font-bold">
                    Members
                  </div>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  {MEMBERS.map((member, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-2 flex-shrink-0" />
                      <span className="text-[14px] text-gray-700 font-medium leading-snug">{member}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Right Side Buttons */}
          <div className="lg:col-span-4">
            <FadeInUp delay={100}>
              <h2 className="font-serif text-[32px] font-bold text-[#3B0764] mb-8 flex items-center gap-3">
                <FileText className="text-[#7C3AED]" /> Quick Links
              </h2>
              <div className="flex flex-col gap-3">
                {RIGHT_BUTTONS.map((btn, i) => (
                  btn.link.startsWith('/') ? (
                    <Link to={btn.link} key={i} className="group bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3.5 px-6 font-bold text-[15px] text-center transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                      <span>{btn.title}</span>
                      <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  ) : (
                    <a href={btn.link} target="_blank" rel="noopener noreferrer" key={i} className="group bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3.5 px-6 font-bold text-[15px] text-center transition-all shadow-sm hover:shadow-md flex items-center justify-between">
                      <span>{btn.title}</span>
                      <ArrowRight size={16} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                  )
                ))}
              </div>
            </FadeInUp>
          </div>
          
        </div>

        {/* Policy & Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <FadeInUp>
            <div className="bg-indigo-50/50 rounded-[2rem] p-10 h-full border border-indigo-100">
              <h2 className="font-serif text-[24px] font-bold text-indigo-900 mb-6 uppercase border-b border-indigo-200 pb-4">Quality Policy</h2>
              <p className="text-indigo-900/80 text-[15px] leading-relaxed font-semibold uppercase">
                TO ACCOMMODATE QUALITY EDUCATION WITH RESEARCH AND TRAINING LEADING TO DEGREE IN ENGINEERING GIVING RESPECT TO THE SOCIAL AND ETHICAL VALUE OF PROFESSION OF ENGINEERING EDUCATION AND AIMING TO STAND AMONG THE BESTS OF GLOBAL EDUCATION INSTITUTION BY EXPANDING ITS ABILITY AND QUALITY AMONG ALL THE STAKE HOLDERS.
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={100}>
            <div className="bg-purple-50/50 rounded-[2rem] p-10 h-full border border-purple-100">
              <h2 className="font-serif text-[24px] font-bold text-purple-900 mb-6 uppercase border-b border-purple-200 pb-4">Objective</h2>
              <ul className="space-y-4">
                {[
                  "To fix a strategy or plan accordance to last year's academic report.",
                  "To ensure continuous improvement in the internal operation of the institution.",
                  "To ensure stakeholders connected with higher education, parents, teachers, staffs, would be employers, alumni and society in general, of its own quality and integrity."
                ].map((obj, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                    <span className="text-[15px] text-purple-900/80 leading-relaxed font-medium">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </div>

        {/* Audit Buttons Row */}
        <FadeInUp>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {AUDIT_BUTTONS.map((btn, i) => (
              btn.link.startsWith('/') ? (
                <Link to={btn.link} key={i} className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3.5 px-6 font-bold text-[13px] uppercase tracking-wide text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  {btn.title}
                </Link>
              ) : (
                <a href={btn.link} target="_blank" rel="noopener noreferrer" key={i} className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3.5 px-6 font-bold text-[13px] uppercase tracking-wide text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  {btn.title}
                </a>
              )
            ))}
          </div>
        </FadeInUp>

        {/* Activities */}
        <FadeInUp>
          <div className="bg-white rounded-[2rem] border border-gray-200 p-10 shadow-sm mb-16">
            <h2 className="font-serif text-[24px] font-bold text-[#3B0764] mb-8 uppercase border-b border-gray-100 pb-4 flex items-center gap-3">
              <Activity className="text-[#7C3AED]" /> Activities
            </h2>
            <ul className="space-y-4">
              {ACTIVITIES.map((act, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={12} className="text-[#7C3AED]" />
                  </div>
                  <span className="text-[15px] text-gray-700 leading-relaxed">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeInUp>

        {/* More Buttons Row */}
        <FadeInUp>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {MORE_BUTTONS.map((btn, i) => (
              <a href="#" key={i} className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl py-3.5 px-8 font-bold text-[14px] text-center transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                {btn}
              </a>
            ))}
          </div>
        </FadeInUp>

      </div>
    </div>
  );
}
