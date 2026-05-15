import React from 'react';

const Footer = () => {
  return (
    <footer className="py-10 border-t border-emerald-900/10 bg-[#F5F5F0] relative z-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-bold text-2xl tracking-tighter text-emerald-950 font-heading">
            S<span className="text-red-700">.</span>DEV
          </span>
          <p className="text-gray-600 text-sm mt-2 font-mono">Architecting digital reality.</p>
        </div>
        
        <div className="text-emerald-800 font-bold text-sm font-mono flex items-center gap-2 bg-white px-4 py-2 border border-emerald-900/10 rounded-full shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-700 animate-pulse"></span>
          All systems operational
        </div>
      </div>
    </footer>
  );
};

export default Footer;
