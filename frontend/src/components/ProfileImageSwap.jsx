import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ProfileImageSwap = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipped(prev => !prev);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-80 h-[450px] relative group mx-auto lg:mx-0 mt-8 lg:mt-0" style={{ perspective: "1000px" }}>
      
      {/* 3D Rotating Container */}
      <motion.div
        className="w-full h-full relative shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl border-4 border-white bg-white z-10"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Profile */}
        <div className="absolute inset-0 rounded-xl overflow-hidden bg-white" style={{ backfaceVisibility: "hidden" }}>
          <img 
            src="/profile.jpeg" 
            alt="Soulayman Elkharraz" 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop' }} 
          />
        </div>
        
        {/* Back - Goat */}
        <div className="absolute inset-0 rounded-xl overflow-hidden bg-white" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <img 
            src="/goat.jpg" 
            alt="Soulayman Illustration" 
            className="w-full h-full object-cover" 
            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=800&auto=format&fit=crop' }} 
          />
        </div>
      </motion.div>

      {/* Floating Ultimate Team Stats (These stay static above the rotation) */}
      <div className="absolute top-4 -right-6 z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: 6 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="bg-white/90 backdrop-blur-md border border-emerald-100 shadow-xl rounded-xl p-3 flex flex-col items-center justify-center"
        >
          <span className="text-2xl mb-1">🇲🇦</span>
          <span className="text-[10px] font-mono font-bold text-emerald-900 tracking-widest uppercase">Tangier</span>
        </motion.div>
      </div>

      <div className="absolute -bottom-6 -left-6 z-20 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -4 }}
          transition={{ delay: 1, type: "spring" }}
          className="bg-emerald-900 border-2 border-white shadow-xl rounded-xl p-4 flex flex-col items-center justify-center"
        >
          <span className="text-[10px] font-mono text-emerald-300 font-bold tracking-widest uppercase mb-1">Playmaker</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black font-heading text-white tracking-tighter">99</span>
            <span className="text-xs text-emerald-400 font-bold">OVR</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 -left-5 -translate-y-1/2 z-20 pointer-events-none">
         <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="bg-rose-700 border-2 border-white shadow-lg rounded-full w-12 h-12 flex items-center justify-center"
         >
            <span className="text-white font-bold font-mono text-sm">ST</span>
         </motion.div>
      </div>

    </div>
  );
};

export default ProfileImageSwap;