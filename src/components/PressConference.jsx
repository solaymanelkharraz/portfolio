import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Send } from 'lucide-react';

const SponsorWall = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none overflow-hidden flex flex-wrap content-start">
      {/* Create a repeating pattern of S.DEV and 🇲🇦 */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div key={i} className="w-1/4 h-20 flex items-center justify-center gap-4">
          <span className="font-heading font-black text-2xl">S.DEV</span>
          <span className="text-xl grayscale">🇲🇦</span>
        </div>
      ))}
    </div>
  );
};

const Microphone = ({ rotation, delay }) => {
  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      className={`relative group cursor-pointer flex flex-col items-center ${rotation}`}
    >
      {/* Mic Head */}
      <div className="w-8 h-12 bg-slate-800 rounded-t-full border-b-4 border-slate-600 relative z-10 shadow-lg group-hover:shadow-[0_0_15px_rgba(6,78,59,0.6)] transition-shadow duration-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1)_100%)] bg-[length:4px_4px]"></div>
        <Mic className="text-slate-400 w-5 h-5 relative z-20 group-hover:text-emerald-400 transition-colors" />
      </div>
      
      {/* S.DEV Flag */}
      <div className="w-10 h-8 bg-red-700 border-2 border-white flex items-center justify-center z-20 -mt-2 shadow-md">
        <span className="text-[8px] font-black font-mono text-white tracking-widest">S.DEV</span>
      </div>
      
      {/* Stand Base */}
      <div className="w-2 h-16 bg-gradient-to-b from-slate-400 to-slate-700 z-0 -mt-1"></div>
      <div className="w-12 h-3 bg-slate-800 rounded-t-full border-b-2 border-slate-900 shadow-md"></div>
    </motion.div>
  );
};

const PressConference = () => {
  return (
    <section id="contact" className="relative z-20 py-32 bg-[#F8F9FA] border-t border-emerald-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center md:text-left border-l-4 border-emerald-800 pl-6"
        >
          <div className="flex items-center gap-3 mb-2 justify-center md:justify-start">
            <span className="text-red-700 font-bold uppercase tracking-[0.2em] font-mono text-xs">
              [ 🎙️ PRESS CONFERENCE ]
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tighter font-heading uppercase">
            Post-Match Q&A
          </h2>
          <p className="text-red-700 font-mono text-sm tracking-widest uppercase font-bold mt-2">
            Inquiries & Contract Negotiations.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-stretch">
          
          {/* Left Side: The Press Desk */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 bg-white rounded-2xl border border-emerald-900/10 shadow-xl relative overflow-hidden flex flex-col justify-end min-h-[400px]"
          >
            <SponsorWall />
            
            {/* The Microphones */}
            <div className="relative z-10 flex justify-center gap-8 mb-6 pt-32">
              <Microphone rotation="-rotate-12" delay={0.2} />
              <Microphone rotation="rotate-0 scale-110" delay={0.4} />
              <Microphone rotation="rotate-12" delay={0.6} />
            </div>

            {/* The Desk Surface */}
            <div className="relative z-20 w-full h-24 bg-gradient-to-b from-emerald-900 to-emerald-950 border-t-8 border-emerald-800 flex items-center justify-center shadow-[0_-10px_30px_rgba(0,0,0,0.2)]">
              {/* Nameplate */}
              <div className="bg-[#EAEAEA] border-4 border-white shadow-lg px-8 py-3 rounded transform -translate-y-6">
                <span className="block text-center text-[10px] font-mono text-slate-500 font-bold tracking-[0.3em] uppercase mb-1">
                  Gaffer
                </span>
                <span className="block text-center text-xl font-black font-heading text-emerald-900 uppercase tracking-tighter">
                  Soulayman Elkharraz
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Side: The Inquiries Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 bg-white rounded-2xl border border-emerald-900/10 shadow-xl p-8 md:p-10 relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[40px] rounded-full pointer-events-none"></div>

            <form className="flex flex-col gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                  Full Name / Publication
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-lg px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all"
                  placeholder="e.g. John Doe - The Athletic"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                  Email Address
                </label>
                <input 
                  type="email" 
                  className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-lg px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all"
                  placeholder="john@publication.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                  Subject / Inquiry Type
                </label>
                <select className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-lg px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all appearance-none">
                  <option>Project Contract Offer</option>
                  <option>Technical Consultation</option>
                  <option>General Media Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                  Question / Message
                </label>
                <textarea 
                  rows="4"
                  className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-lg px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 transition-all resize-none"
                  placeholder="Draft your inquiry here..."
                ></textarea>
              </div>

              <button className="mt-4 w-full bg-red-700 hover:bg-red-800 text-white font-bold font-mono text-xs uppercase tracking-widest py-4 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group">
                Submit Question / Send Offer
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PressConference;
