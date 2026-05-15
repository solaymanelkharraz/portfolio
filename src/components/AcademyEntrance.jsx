import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const AcademyEntrance = () => {
  return (
    <section id="archives" className="relative z-20 py-32 bg-[#EAEAEA] border-t border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] border border-emerald-900/10 shadow-xl overflow-hidden group cursor-pointer"
        >
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Side: Visual */}
            <div className="w-full md:w-1/3 bg-emerald-900 h-64 md:h-80 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_20px,#000_20px,#000_40px)]" />
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative z-10 text-9xl grayscale opacity-20 select-none"
              >
                🏟️
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent" />
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-2/3 p-10 md:p-16 flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
                <span className="text-emerald-800 text-xs font-bold font-mono tracking-widest uppercase">
                  LA MASIA
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black text-emerald-950 mb-6 tracking-tighter font-heading uppercase leading-tight">
                ENTER THE <br />
                <span className="text-rose-700">TRAINING GROUNDS.</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-10 font-mono max-w-xl">
                Explore Academic Projects & Technical Exercises (TPs). A deep archive of theoretical foundations and practical laboratory work.
              </p>

              <Link 
                to="/training-ground"
                className="bg-emerald-800 text-white font-bold font-mono text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-lg hover:bg-emerald-900 transition-all flex items-center gap-3 no-underline"
              >
                Access Archive <ExternalLink size={18} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AcademyEntrance;

