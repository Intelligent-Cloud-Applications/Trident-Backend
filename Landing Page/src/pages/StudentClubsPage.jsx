import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ChevronRight, Music, Palette, Trophy, Code, Camera, Mic, Dumbbell, Globe, Heart, Users, Zap, BookOpen , CheckCircle} from 'lucide-react';
import { FadeInUp } from '../utils/animations';

const CLUBS = [
  { icon: Code, name: "Coding Club", category: "Technical", color: "#283B91", members: "200+", desc: "Competitive programming, hackathons, and coding workshops fostering algorithmic thinking and software development skills." },
  { icon: Zap, name: "Robotics Club", category: "Technical", color: "#283B91", members: "80+", desc: "Designing and building autonomous robots, participating in national robotics competitions and innovation challenges." },
  { icon: Camera, name: "Photography Club", category: "Cultural", color: "#E5AA3E", members: "120+", desc: "Capturing campus life, organizing photo walks, exhibitions, and workshops on digital photography and editing." },
  { icon: Music, name: "Music Club (Sur Sadhana)", category: "Cultural", color: "#E5AA3E", members: "100+", desc: "Vocal and instrumental performances, band practices, and cultural event performances across genres." },
  { icon: Palette, name: "Art & Design Club", category: "Cultural", color: "#E5AA3E", members: "90+", desc: "Painting, sketching, digital art, and design thinking workshops encouraging creative expression." },
  { icon: Mic, name: "Debate & Literary Club", category: "Cultural", color: "#2E7D32", members: "75+", desc: "Debates, essay competitions, poetry slams, and Model United Nations preparation." },
  { icon: Trophy, name: "Sports Club", category: "Sports", color: "#C5282F", members: "300+", desc: "Cricket, football, basketball, badminton, athletics, and inter-college sports tournament participation." },
  { icon: Dumbbell, name: "Fitness Club", category: "Sports", color: "#C5282F", members: "150+", desc: "Yoga sessions, gym training, marathon running, and wellness programs for holistic health." },
  { icon: Globe, name: "Eco Club (Green Brigade)", category: "Social", color: "#2E7D32", members: "100+", desc: "Environmental awareness drives, tree plantation, waste management, and sustainability campaigns." },
  { icon: Heart, name: "NSS Unit", category: "Social", color: "#2E7D32", members: "200+", desc: "National Service Scheme — community service, blood donation camps, rural development initiatives." },
  { icon: Users, name: "Entrepreneurship Cell", category: "Technical", color: "#283B91", members: "60+", desc: "Startup mentoring, business plan competitions, ideation workshops, and investor pitch events." },
  { icon: BookOpen, name: "Quiz Club", category: "Cultural", color: "#E5AA3E", members: "80+", desc: "Inter-college quizzes, weekly quiz sessions, and knowledge-sharing events across diverse domains." },
];

const CATEGORIES = ["All", "Technical", "Cultural", "Sports", "Social"];

export default function StudentClubsPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filtered = activeCategory === "All" ? CLUBS : CLUBS.filter(c => c.category === activeCategory);

  return (
    <div className="bg-white min-h-screen pb-24">
            {/* Premium Hero Design */}
      <div className="relative w-full pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-white">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#3B82F6]/5 rounded-bl-[100px]" />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 xl:px-12 flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Content */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex-1 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6">
              <Users className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[12px] font-bold text-[#3B82F6] uppercase tracking-widest">Trident Academy</span>
            </div>
            <h1 className="font-serif text-[48px] lg:text-[64px] font-black text-[#1a2352] leading-[1.1] mb-6">
              Student Clubs
            </h1>
            <p className="text-gray-500 text-[18px] leading-relaxed max-w-xl mb-8">
              Explore your passion beyond the classroom through our vibrant student clubs and organizations.
            </p>
          </motion.div>
          
          {/* Right: Featured Image with Glassmorphism Float */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto">
            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/3] shadow-2xl shadow-[#3B82F6]/20">
              <img src="https://images.unsplash.com/photo-1511632765486-a51c4c2ce181?q=80&w=1000&auto=format&fit=crop" alt="Hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2352]/50 to-transparent" />
            </div>
            {/* Floating Element */}
            <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#3B82F6]" />
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
          <span className="text-[#212529] font-bold">Student Clubs</span>
        </nav>

        {/* Category Filter */}
        <FadeInUp>
          <div className="flex flex-wrap gap-3 mb-12">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-[#283B91] text-white border-[#283B91] shadow-lg shadow-[#283B91]/20"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#283B91]/30 hover:text-[#283B91]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeInUp>

        {/* Clubs Grid */}
        <motion.div
          key={activeCategory}
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {filtered.map((club, i) => (
            <motion.div key={club.name}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }}
              className="group p-8 border-l-2 border-transparent hover:border-[currentColor]/30 transition-all hover:bg-gray-50 duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-[60px] opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" style={{ background: club.color }} />
              
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${club.color}15` }}>
                  <club.icon size={22} style={{ color: club.color }} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ color: club.color, background: `${club.color}10` }}>
                  {club.category}
                </span>
              </div>

              <h3 className="font-sans text-[20px] font-bold text-[#1E3A5F] mb-2">{club.name}</h3>
              <p className="text-gray-500 text-[14px] leading-relaxed mb-5">{club.desc}</p>
              
              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400">
                <Users size={14} />
                <span>{club.members} Members</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
