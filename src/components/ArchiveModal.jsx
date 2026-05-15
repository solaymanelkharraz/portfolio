import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Database, Layout, Code, Server, Smartphone, Globe } from 'lucide-react';

const projects = [
  {
    title: "EcoTrack Dashboard",
    type: "Frontend Engine",
    desc: "A responsive carbon footprint tracker visualizing user habits with modern charts and animated state transitions.",
    tech: ["React", "Tailwind", "Recharts"],
    icon: Layout,
    stats: { Logic: 88, UI: 92, DB: 75 }
  },
  {
    title: "AuthFlow Microservice",
    type: "Backend System",
    desc: "A robust JWT-based authentication API with role-based access control and rate-limiting defenses.",
    tech: ["Node.js", "Express", "MongoDB"],
    icon: Server,
    stats: { Logic: 95, UI: 60, DB: 88 }
  },
  {
    title: "Inventory API",
    type: "Database Logic",
    desc: "A relational database schema and API managing complex product variants, stock tracking, and supplier logs.",
    tech: ["Laravel", "MySQL", "Eloquent"],
    icon: Database,
    stats: { Logic: 90, UI: 65, DB: 94 }
  }
];

const StatBar = ({ label, value }) => {
  const isTop = value >= 90;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] font-mono font-bold text-emerald-950 mb-1 tracking-wider uppercase">
        <span>{label}</span>
        <span className={isTop ? "text-rose-700 font-black" : "text-emerald-800"}>{value}</span>
      </div>
      <div className="w-full h-1.5 bg-emerald-900/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${isTop ? 'bg-rose-700 shadow-[0_0_8px_rgba(185,28,28,0.6)]' : 'bg-emerald-800'}`}
        />
      </div>
    </div>
  );
};

const ArchiveModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
        >
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-emerald-950/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-6xl bg-[#F8F9FA] rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-emerald-900/10 flex items-center justify-between bg-white">
              <div>
                <h3 className="text-3xl font-black font-heading text-emerald-950 uppercase tracking-tighter">
                  Training Grounds Archive
                </h3>
                <p className="text-rose-700 font-mono text-xs font-bold uppercase tracking-widest">
                  Academic Projects & Lab Exercises (TPs)
                </p>
              </div>
              <button 
                onClick={onClose}
                className="group bg-emerald-50 hover:bg-rose-50 p-3 rounded-full transition-colors flex items-center gap-2 text-emerald-800 hover:text-rose-700"
              >
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest hidden sm:inline-block">Return to Pitch</span>
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Grid */}
            <div className="p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj, i) => (
                <motion.div
                  key={proj.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-emerald-900/10 shadow-sm rounded-2xl p-6 hover:shadow-md hover:border-emerald-800/30 transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-rose-700 mb-1 font-mono">{proj.type}</div>
                      <h3 className="text-xl font-bold text-emerald-950 font-heading tracking-tight uppercase leading-tight">{proj.title}</h3>
                    </div>
                    <div className="w-10 h-10 bg-[#F8F9FA] rounded-full flex items-center justify-center border border-emerald-900/10 shrink-0">
                      <proj.icon className="text-emerald-800" size={18} />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">{proj.desc}</p>
                  
                  <div className="bg-[#F8F9FA] p-4 rounded-xl mb-6 border border-emerald-900/5">
                    <StatBar label="Logic" value={proj.stats.Logic} />
                    <StatBar label="UI / Design" value={proj.stats.UI} />
                    <StatBar label="DB / Architecture" value={proj.stats.DB} />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-emerald-900/10">
                    {proj.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-white text-emerald-800 rounded text-[10px] font-bold uppercase border border-emerald-800/20 shadow-sm font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer decoration */}
            <div className="h-2 bg-gradient-to-r from-emerald-800 via-rose-700 to-emerald-800" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArchiveModal;
