import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreMatchLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Warming up the pitch...",
    "Reviewing tactical data...",
    "Lacing up boots...",
    "Connecting to stadium...",
    "Analyzing opponent formations...",
    "Preparing the starting XI..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F8F9FA] flex flex-col items-center justify-center font-mono overflow-hidden">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] border-[10px] border-emerald-900 rounded-full"></div>
      </div>
      
      {/* Pulsing Radar/Ball Animation */}
      <div className="relative mb-8">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 bg-emerald-900 rounded-full shadow-[0_0_20px_rgba(6,78,59,0.5)] flex items-center justify-center z-10 relative"
        >
          <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div>
        </motion.div>
        
        {/* Ripple Effects */}
        <motion.div
          animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 bg-emerald-700 rounded-full z-0"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 3.5], opacity: [0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4, ease: "easeOut" }}
          className="absolute inset-0 bg-emerald-500 rounded-full z-0"
        ></motion.div>
      </div>

      {/* Dynamic Text */}
      <div className="h-10 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={messageIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-emerald-950 font-black text-sm md:text-lg tracking-widest uppercase text-center"
          >
            [ {messages[messageIndex]} ]
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Loading Bar */}
      <div className="w-64 md:w-80 h-1 bg-emerald-900/10 rounded-full mt-6 overflow-hidden">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-emerald-700 rounded-full"
        ></motion.div>
      </div>
    </div>
  );
};

export default PreMatchLoader;
