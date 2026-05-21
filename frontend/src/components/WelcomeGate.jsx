import React from 'react';
import { motion } from 'framer-motion';

const WelcomeGate = ({ onEnter }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#F8F9FA] flex flex-col items-center justify-center font-mono overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border-[10px] border-emerald-900 rounded-full"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="font-bold text-4xl tracking-tighter text-emerald-900 font-heading mb-8">
          S<span className="text-red-700">.</span>DEV
        </span>

        <button 
          onClick={onEnter}
          className="group relative px-8 py-4 bg-emerald-900 text-white font-bold font-mono tracking-[0.2em] uppercase text-sm rounded shadow-2xl hover:bg-emerald-950 transition-all overflow-hidden"
        >
          <span className="relative z-10">[ INITIALIZE TACTICAL VIEW ]</span>
          <div className="absolute inset-0 h-full w-0 bg-red-700 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
        </button>
      </motion.div>
    </div>
  );
};

export default WelcomeGate;
