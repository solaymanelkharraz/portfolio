import React from 'react';
import { motion } from 'framer-motion';

const HeroText = () => {
  return (
    <div className="w-full lg:w-[55%] relative z-10">
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        {/* Kickoff Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6 shadow-sm">
          <span className="text-emerald-800 text-xs font-bold font-mono tracking-widest uppercase">
            ⚽ KICKOFF
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-6xl md:text-[5.5rem] font-black leading-[1.05] mb-10 tracking-tighter uppercase font-heading">
          <span className="text-emerald-900 block drop-shadow-sm">
            ENGINEERING
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-rose-700 block drop-shadow-sm pb-2">
            DIGITAL REALITY.
          </span>
        </h1>
        
        {/* The Player Profile Stats Box */}
        <div className="bg-white/80 backdrop-blur-md border-l-4 border-emerald-800 p-6 rounded-r-xl shadow-lg max-w-xl">
          <div className="grid grid-cols-1 gap-4 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-900/10 pb-3">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 sm:mb-0">Role</span>
              <span className="text-emerald-950 font-bold text-sm bg-emerald-50 px-2 py-1 rounded border border-emerald-900/5 shadow-sm">Full-Stack Playmaker</span>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-900/10 pb-3">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 sm:mb-0">Base</span>
              <span className="text-emerald-950 font-bold text-sm bg-emerald-50 px-2 py-1 rounded border border-emerald-900/5 shadow-sm">Tangier, Morocco 🇲🇦</span>
            </div>
            
            <div className="flex flex-col border-b border-emerald-900/10 pb-3">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Style of Play</span>
              <span className="text-gray-700 text-sm leading-relaxed">High-speed UI (React) grounded by rock-solid architecture (Laravel).</span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-2">Mission</span>
              <span className="text-gray-700 text-sm leading-relaxed">Building robust B2B platforms. No fluff, just scalable results.</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;