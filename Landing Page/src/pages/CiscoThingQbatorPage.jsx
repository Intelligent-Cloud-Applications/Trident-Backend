import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Cpu, Lightbulb, Rocket, Wifi, Users, Wrench, Printer, CircuitBoard, Target, Award , CheckCircle} from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const FEATURES = [
  { icon: Lightbulb, title: "Ideation Lab", desc: "A creative space for brainstorming, prototyping, and validating innovative ideas with expert mentorship." },
  { icon: Cpu, title: "IoT Workshop", desc: "Hands-on experience with Internet of Things devices, sensors, Arduino, Raspberry Pi, and embedded systems." },
  { icon: CircuitBoard, title: "Electronics Prototyping", desc: "PCB design, soldering stations, and electronic component testing for hardware project development." },
  { icon: Wrench, title: "3D Printing Lab", desc: "Rapid prototyping with industrial-grade 3D printers for creating functional models and product designs." },
  { icon: Wifi, title: "Networking Lab", desc: "CISCO networking equipment for hands-on training in routing, switching, and network security." },
  { icon: Rocket, title: "Startup Incubation", desc: "End-to-end support for student startups including mentoring, funding guidance, and market access." },
];

const PROGRAMS = [
  { title: "CISCO Entrepreneur Institute", desc: "Global entrepreneurship curriculum designed by CISCO to develop business acumen and innovation skills.", tag: "Certification" },
  { title: "IoT Specialization Track", desc: "Industry-aligned IoT program covering smart devices, cloud connectivity, and data analytics.", tag: "Training" },
  { title: "Maker Marathon", desc: "48-hour innovation sprint where students build working prototypes to solve real-world problems.", tag: "Event" },
  { title: "Industry Connect Sessions", desc: "Regular interactions with industry leaders, tech innovators, and successful entrepreneurs.", tag: "Mentorship" },
  { title: "Patent Filing Support", desc: "Guidance and financial support for students to file patents for their innovative inventions.", tag: "IP Support" },
  { title: "Hackathon Series", desc: "Quarterly hackathons on themes like sustainability, healthcare, and smart cities with cash prizes.", tag: "Competition" },
];

export default function CiscoThingQbatorPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
            {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00BCEB]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00BCEB]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00BCEB]/10 border border-[#00BCEB]/20 mb-6">
              <Cpu className="w-4 h-4 text-[#00BCEB]" />
              <span className="text-[12px] font-bold text-[#00BCEB] uppercase tracking-widest">Trident Academy</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              CISCO thingQbator
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              An innovation hub powered by CISCO — enabling students to ideate, prototype, and launch technology solutions for real-world challenges.
            </p>
          </motion.div>
          
          {/* Right: Featured Image with Glassmorphism Float */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#00BCEB]/20">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/50 to-transparent" />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#00BCEB]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#00BCEB]" />
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
          <span className="text-[#212529] font-bold">CISCO thingQbator</span>
        </nav>

        {/* About Section */}
        <FadeInUp>
          <div className="py-12 border-b border-gray-100 last:border-0 mb-16">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="flex-1">
                <div className="inline-block px-4 py-1.5 bg-[#00BCEB]/10 text-[#0077B6] text-[10px] font-bold uppercase tracking-widest rounded-full mb-6">Innovation Hub</div>
                <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-6">What is thingQbator?</h2>
                <p className="text-gray-500 text-[15px] leading-[1.9] mb-6">
                  CISCO thingQbator is an IoT innovation hub established at Trident Academy of Technology in collaboration with CISCO and NASSCOM. It provides students with access to cutting-edge technology, mentorship, and resources to transform their innovative ideas into working prototypes and viable products.
                </p>
                <p className="text-gray-500 text-[15px] leading-[1.9]">
                  The lab is equipped with IoT kits, 3D printers, electronic workstations, and high-speed connectivity — serving as a launchpad for student-driven innovation and entrepreneurship.
                </p>
              </div>
              <div className="lg:w-[300px] flex-shrink-0 grid grid-cols-2 gap-4">
                {[
                  { num: "500+", label: "Students Trained" },
                  { num: "50+", label: "Projects Built" },
                  { num: "10+", label: "Patents Filed" },
                  { num: "5+", label: "Startups Incubated" },
                ].map((s,i) => (
                  <div key={i} className="bg-[#f8f9fa] rounded-2xl p-5 text-center">
                    <div className="text-[#0077B6] text-[24px] font-black">{s.num}</div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInUp>

        {/* Features Grid */}
        <FadeInUp delay={100}>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-2">Lab Facilities</h2>
          <p className="text-gray-500 text-[15px] mb-10">World-class infrastructure for innovation and prototyping.</p>
        </FadeInUp>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {FEATURES.map((f, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#00BCEB]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#00BCEB]/10 flex items-center justify-center mb-5 group-hover:bg-[#0077B6] transition-colors">
                <f.icon size={22} className="text-[#0077B6] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-sans text-[20px] font-bold text-[#1a2352] mb-2">{f.title}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Programs */}
        <FadeInUp>
          <h2 className="font-serif text-[32px] font-bold text-[#1a2352] mb-2">Programs & Activities</h2>
          <p className="text-gray-500 text-[15px] mb-10">Structured programs to nurture innovation at every stage.</p>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PROGRAMS.map((p, i) => (
            <FadeInUp key={i} delay={i * 80}>
              <div className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0077B6] bg-[#00BCEB]/10 rounded-full mb-4">{p.tag}</span>
                <h3 className="font-sans text-[18px] font-bold text-[#1a2352] mb-3">{p.title}</h3>
                <p className="text-gray-500 text-[14px] leading-relaxed">{p.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
}
