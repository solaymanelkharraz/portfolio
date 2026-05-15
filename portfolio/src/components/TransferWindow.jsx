import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileSignature, ChevronRight } from 'lucide-react';

const TransferWindow = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="transfer" className="relative z-20 py-32 bg-[#F8F9FA] border-t border-emerald-900/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6 shadow-sm">
            <span className="text-emerald-800 text-xs font-bold font-mono tracking-widest uppercase">
              📝 TRANSFER WINDOW
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tighter font-heading uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-rose-700 block drop-shadow-sm pb-2">
              CONTRACT NEGOTIATIONS.
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Side: Player Status & Valuation (The Dossier) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[45%] bg-white shadow-lg rounded-xl border-l-4 border-emerald-600 p-8 md:p-10 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Watermark */}
            <div className="absolute -bottom-10 -right-10 opacity-5 text-[150px] pointer-events-none transform -rotate-12 select-none grayscale">
              🇲🇦
            </div>
            <div className="absolute top-10 right-10 w-32 h-32 border-[8px] border-emerald-900/5 rounded-full pointer-events-none flex items-center justify-center transform rotate-45">
               <span className="text-emerald-900/5 font-bold font-heading text-xl uppercase tracking-widest">OFFICIAL</span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-emerald-900/10 pb-4 mb-8">
                <span className="font-mono font-bold text-xs tracking-widest text-emerald-800 uppercase">Market Status</span>
                <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                  <span className="font-mono font-bold text-[10px] uppercase tracking-widest text-emerald-900">OPEN</span>
                </div>
              </div>

              <div className="mb-10">
                <span className="block font-mono font-bold text-xs tracking-widest text-gray-500 uppercase mb-3">Availability Target</span>
                <p className="text-xl font-heading font-black text-emerald-950 uppercase leading-snug">
                  <span className="text-rose-700">JUNIOR FULL-STACK ROLES</span> <br/>
                  / FREELANCE FIXTURES
                </p>
              </div>

              <div className="mb-12">
                <span className="block font-mono font-bold text-xs tracking-widest text-gray-500 uppercase mb-3">Player Valuation</span>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <ChevronRight className="text-emerald-600 w-4 h-4" />
                    <span className="font-medium text-emerald-900 text-sm">High Work Rate.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="text-emerald-600 w-4 h-4" />
                    <span className="font-medium text-emerald-900 text-sm">Scalable Output.</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <ChevronRight className="text-emerald-600 w-4 h-4" />
                    <span className="font-medium text-emerald-900 text-sm">Tactical Discipline.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Agent Lines & CVs */}
            <div className="relative z-10 pt-6 border-t border-emerald-900/10 mt-auto">
              <span className="block font-mono font-bold text-[10px] tracking-widest text-emerald-800 uppercase mb-4">Direct Agent Lines</span>
              <div className="flex flex-wrap gap-4 mb-6">
                <a href="mailto:contact@sdev.ma" className="flex items-center gap-2 bg-[#F8F9FA] hover:bg-emerald-50 border border-emerald-100 px-4 py-2 rounded text-emerald-900 text-sm font-bold font-mono transition-colors shadow-sm">
                  <Mail size={16} className="text-rose-700" />
                  Email
                </a>
                <a href="#" className="flex items-center gap-2 bg-[#F8F9FA] hover:bg-emerald-50 border border-emerald-100 px-4 py-2 rounded text-emerald-900 text-sm font-bold font-mono transition-colors shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-700">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                  LinkedIn
                </a>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-emerald-800 text-white font-bold font-mono text-[10px] uppercase tracking-widest py-3 rounded hover:bg-emerald-900 transition-all shadow-md">
                  📄 DOWNLOAD CV (EN)
                </button>
                <button className="flex-1 bg-white text-emerald-800 border-2 border-emerald-800 font-bold font-mono text-[10px] uppercase tracking-widest py-3 rounded hover:bg-emerald-50 transition-all shadow-md">
                  📄 DOWNLOAD CV (FR)
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Side: The Official Bid (The Form) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-[55%] bg-white rounded-xl border border-emerald-900/10 shadow-xl p-8 md:p-12 relative"
          >
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-emerald-900/10">
               <h3 className="text-2xl font-black font-heading text-emerald-950 uppercase tracking-tight">Official Bid Document</h3>
               <FileSignature className="text-emerald-800/40 w-8 h-8" />
            </div>

            <form 
              className="flex flex-col gap-6" 
              action="https://formspree.io/f/xpwgdnnk" 
              method="POST"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                    Club / Company Name
                  </label>
                  <input 
                    type="text" 
                    name="company"
                    required
                    className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-none px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all shadow-inner"
                    placeholder="e.g. Tech FC"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                    Representative Email
                  </label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-none px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all shadow-inner"
                    placeholder="scout@club.com"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                  Proposed Deal
                </label>
                <select 
                  name="deal_type"
                  defaultValue="Full-Time Signing (Long-term contract)" 
                  className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-none px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all shadow-inner appearance-none"
                >
                  <option value="Full-Time Signing (Long-term contract)">Full-Time Signing (Long-term contract)</option>
                  <option value="Freelance Fixture (Short-term project)">Freelance Fixture (Short-term project)</option>
                  <option value="Tactical Collaboration (Partnership)">Tactical Collaboration (Partnership)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold font-mono text-emerald-800 tracking-widest uppercase">
                  Terms & Message
                </label>
                <textarea 
                  name="message"
                  rows="5"
                  required
                  className="w-full bg-[#F8F9FA] border border-emerald-900/20 rounded-none px-4 py-3 text-sm text-emerald-950 font-medium focus:outline-none focus:border-rose-700 focus:ring-1 focus:ring-rose-700 transition-all resize-none shadow-inner"
                  placeholder="Outline your proposal here..."
                ></textarea>
              </div>

              <motion.button 
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full bg-rose-700 text-white font-bold font-mono text-sm uppercase tracking-widest py-4 rounded-lg shadow-[0_10px_20px_rgba(190,24,93,0.3)] hover:shadow-[0_15px_25px_rgba(190,24,93,0.4)] hover:bg-rose-800 transition-all flex items-center justify-center gap-2"
              >
                {isHovered ? "SIGN S.DEV" : "SUBMIT OFFICIAL BID"}
              </motion.button>
            </form>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TransferWindow;
