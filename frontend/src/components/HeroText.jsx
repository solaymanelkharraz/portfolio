import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroText = ({ hero }) => {
  const [showAlternative, setShowAlternative] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowAlternative(prev => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (!hero) return null;

  return (
    <div className="w-full lg:w-[55%] relative z-10">
      <motion.div 
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        {/* Kickoff Badge */}
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full shadow-sm">
            <span className="text-emerald-800 text-xs font-bold font-mono tracking-widest uppercase">
              ⚽ {hero.status || 'KICKOFF'}
            </span>
          </div>
        </div>

        {/* Headline with Rotation */}
        <div className="h-[200px] md:h-[240px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showAlternative ? (
              <motion.h1 
                key="name"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-6xl md:text-[5.5rem] font-black leading-[1.05] tracking-tighter uppercase font-heading"
              >
                <span className="text-emerald-900 block drop-shadow-sm">
                  {hero.name.split(' ')[0]}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-rose-700 block drop-shadow-sm pb-2">
                  {hero.name.split(' ').slice(1).join(' ')}
                </span>
              </motion.h1>
            ) : (
              <motion.h1 
                key="alt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-6xl md:text-[5rem] font-black leading-[1.05] tracking-tighter uppercase font-heading"
              >
                <span className="text-emerald-900 block drop-shadow-sm">
                  Engineering
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-rose-700 block drop-shadow-sm pb-2">
                  Digital Reality.
                </span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
        
        {/* The Player Profile Stats Box */}
        <div className="bg-white/80 backdrop-blur-md border-l-4 border-emerald-800 p-6 rounded-r-xl shadow-lg max-w-xl">
          <div className="grid grid-cols-1 gap-4 font-mono">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-900/10 pb-3">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 sm:mb-0">Role</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-950 font-bold text-sm bg-emerald-50 px-2 py-1 rounded border border-emerald-900/5 shadow-sm">{hero.title}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-emerald-900/10 pb-3">
              <span className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1 sm:mb-0">Base</span>
              <span className="text-emerald-950 font-bold text-sm bg-emerald-50 px-2 py-1 rounded border border-emerald-900/5 shadow-sm">{hero.location} 🇲🇦</span>
            </div>
            
            <div className="flex flex-col border-b border-emerald-900/10 pb-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Style of Play</span>
              <span className="text-emerald-950 font-bold text-sm leading-relaxed">{hero.style_of_play || 'High-speed UI (React) grounded by rock-solid architecture (Laravel).'}</span>
            </div>
            
            <div className="flex flex-col pt-1">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2">Mission</span>
              <span className="text-gray-700 text-sm leading-relaxed">{hero.bio}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroText;
