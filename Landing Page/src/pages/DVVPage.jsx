import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, FileText } from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const TABLE_DATA = [
  { extended: "1.1", c1: "1.2.1", c2: "2.1.1", c3: "3.1.1", c4: "4.1.2", c5: "5.1.1", c6: "6.2.2", c7: "7.1.2" },
  { extended: "2.1", c1: "1.2.2", c2: "2.1.2", c3: "3.2.2", c4: "4.3.2", c5: "5.1.2", c6: "6.3.2", c7: "7.1.3" },
  { extended: "2.2", c1: "1.3.2", c2: "2.2.1", c3: "3.3.1", c4: "4.4.1", c5: "5.1.3", c6: "6.3.3", c7: "" },
  { extended: "3.1", c1: "1.4.1", c2: "2.4.1", c3: "3.3.2", c4: "", c5: "5.1.4", c6: "6.5.2", c7: "" },
  { extended: "", c1: "", c2: "2.4.2", c3: "3.4.3", c4: "", c5: "5.2.1", c6: "", c7: "" },
  { extended: "", c1: "", c2: "2.6.3", c3: "3.5.1", c4: "", c5: "5.2.2", c6: "", c7: "" },
  { extended: "", c1: "", c2: "", c3: "", c4: "", c5: "5.3.1", c6: "", c7: "" },
  { extended: "", c1: "", c2: "", c3: "", c4: "", c5: "5.3.2", c6: "", c7: "" }
];

export default function DVVPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#1e3a8a]/5 rounded-bl-[100px]" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12">
          <nav className="flex items-center gap-2 flex-wrap text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em] mb-10">
            <Link to="/" className="hover:text-[#1e3a8a] transition-colors flex items-center gap-1"><Home size={12} /> Home</Link>
            <ChevronRight size={10} />
            <Link to="/iqac" className="hover:text-[#1e3a8a] transition-colors">IQAC</Link>
            <ChevronRight size={10} />
            <span className="text-[#1e3a8a] font-bold">DVV</span>
          </nav>
          
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e3a8a]/10 border border-[#1e3a8a]/20 mb-6">
              <FileText className="w-4 h-4 text-[#1e3a8a]" />
              <span className="text-[12px] font-bold text-[#1e3a8a] uppercase tracking-widest">IQAC Report</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              Data Validation and Verification (DVV)
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 xl:px-12 mt-8">
        <FadeInUp>
          <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">Extended Profile</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">CRITERIA 1</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">CRITERIA 2</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">CRITERIA 3</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">CRITERIA 4</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">CRITERIA 5</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider border-r border-gray-200">CRITERIA 6</th>
                    <th className="py-4 px-6 font-bold text-gray-700 text-[14px] uppercase tracking-wider">CRITERIA 7</th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE_DATA.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.extended && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.extended}</a>}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.c1 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c1}</a>}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.c2 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c2}</a>}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.c3 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c3}</a>}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.c4 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c4}</a>}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.c5 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c5}</a>}
                      </td>
                      <td className="py-4 px-6 border-r border-gray-100">
                        {row.c6 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c6}</a>}
                      </td>
                      <td className="py-4 px-6">
                        {row.c7 && <a href="#" className="text-blue-600 hover:text-blue-800 underline underline-offset-4 decoration-blue-200 font-medium">{row.c7}</a>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
}
