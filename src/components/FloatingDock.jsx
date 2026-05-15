import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, TrendingUp, Zap, Layout, FileSignature } from 'lucide-react';

const FloatingDock = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const links = [
    { icon: Server, label: "Starting XI", href: "#ecosystem" },
    { icon: TrendingUp, label: "Career Mode", href: "#timeline" },
    { icon: Zap, label: "Highlights", href: "#architectures" },
    { icon: Layout, label: "Academy", href: "#archives" },
    { icon: FileSignature, label: "Transfers", href: "#transfer" },
  ];

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-emerald-900/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
        {links.map((link, idx) => (
          <a 
            key={idx}
            href={link.href}
            className="relative group"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 2, scale: 0.8 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-emerald-900 text-white text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded whitespace-nowrap shadow-xl border border-emerald-800"
                >
                  {link.label}
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div
              animate={{
                width: hoveredIndex === idx ? 56 : 48,
                height: hoveredIndex === idx ? 56 : 48,
                y: hoveredIndex === idx ? -4 : 0
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`flex items-center justify-center rounded-xl transition-colors ${hoveredIndex === idx ? 'bg-red-700 shadow-lg' : 'bg-[#F5F5F0] hover:bg-emerald-50'}`}
            >
              <link.icon className={`${hoveredIndex === idx ? 'text-white' : 'text-emerald-800'}`} size={20} />
            </motion.div>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingDock;