import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const ScoutingModal = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-emerald-950 border border-emerald-800/50 shadow-2xl rounded-[2rem] max-w-lg w-full p-8 md:p-10 relative overflow-hidden"
      >
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#059669_1px,transparent_1px),linear-gradient(to_bottom,#059669_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-8 bg-emerald-900/50 px-3 py-1.5 rounded-full border border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Classified Dossier
          </div>
          
          <div className="w-24 h-24 mx-auto mb-8 rounded-full border-4 border-emerald-800/50 bg-emerald-900 overflow-hidden relative shadow-inner">
            <img 
              src="/profile.jpeg" 
              alt="Profile Placeholder"
              className="w-full h-full object-cover opacity-80"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>

          <h3 className="text-3xl font-black font-heading text-white uppercase tracking-tight mb-4">
            Scouting Report
          </h3>
          
          <div className="text-emerald-100/80 font-mono text-sm leading-relaxed mb-10 text-left space-y-4">
            <p>
              Soulayman is a 20-year-old Full-Stack Developer based in Tangier. 
            </p>
            <p>
              He is driven by a deep commitment to building practical, community-oriented software that solves real problems. 
            </p>
            <p>
              Grounded by a balanced approach to life, his ultimate mission is to leverage technology to provide a strong foundation for his family.
            </p>
          </div>

          <div className="border-t border-emerald-800/50 pt-6 flex items-center justify-center gap-3">
            <Activity className="text-emerald-500 animate-spin" size={16} />
            <span className="text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-widest animate-pulse">
              Establishing secure connection to database...
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoutingModal;
