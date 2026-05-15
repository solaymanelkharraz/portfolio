import React, { useRef } from 'react';
import { ExternalLink, Code, Target, ShieldAlert, Activity } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const LiveProjectPreview = ({ title, tech, problem, solution, liveUrl, sourceUrl, metrics }) => {
  const containerRef = useRef(null);
  
  // Subtle scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yParallax = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Mouse tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-2deg", "2deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={containerRef}
      style={{ y: yParallax, rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-white rounded-[2rem] border border-emerald-900/10 flex flex-col xl:flex-row items-stretch group transition-all duration-700 hover:border-emerald-800/30 hover:shadow-2xl mb-16 relative shadow-lg"
    >
      {/* Left Side: Tactical Breakdown */}
      <div className="w-full xl:w-[45%] p-8 md:p-10 border-r border-emerald-900/5 relative z-10 flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 bg-red-700 animate-pulse rounded-full"></span>
              <span className="text-red-700 text-xs font-bold uppercase tracking-[0.2em] font-mono">Match Breakdown</span>
            </div>
            
            {/* Post-Match Analytics Header */}
            <div className="hidden sm:flex items-center gap-2 text-emerald-800 text-[10px] font-bold uppercase tracking-widest font-mono bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100">
              <Activity size={14} /> Analytics
            </div>
          </div>
          
          <h3 className="text-4xl font-black text-emerald-950 mb-8 uppercase font-heading tracking-tight">{title}</h3>
          
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <div className="flex-1 space-y-6">
              <div className="bg-[#F5F5F0] border border-emerald-900/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-red-700 mb-2 font-mono text-xs font-bold uppercase">
                  <ShieldAlert size={14} /> The Opponent (Problem)
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{problem}</p>
              </div>

              <div className="bg-[#F5F5F0] border border-emerald-900/5 p-4 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-800 mb-2 font-mono text-xs font-bold uppercase">
                  <Target size={14} /> The Tactic (Architecture)
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{solution}</p>
              </div>
            </div>

            {/* Post-Match Analytics Column */}
            <div className="w-full sm:w-1/3 bg-emerald-900 text-white p-5 rounded-xl flex flex-col justify-center gap-4 shadow-inner relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-[30px] rounded-full pointer-events-none -mr-10 -mt-10"></div>
               {Object.entries(metrics).map(([key, value]) => (
                 <div key={key} className="border-b border-emerald-800/50 pb-3 mb-1 last:border-0 last:pb-0 last:mb-0 relative z-10">
                   <div className="text-[10px] text-emerald-300 font-mono uppercase tracking-wider mb-1">{key}</div>
                   <div className="text-2xl font-black font-heading tracking-tighter text-white">{value}</div>
                 </div>
               ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex flex-wrap gap-2 mb-8">
            {tech.map((t) => (
              <span key={t} className="px-3 py-1 bg-[#F5F5F0] text-emerald-800 text-xs font-mono font-bold uppercase border border-emerald-900/10 rounded">
                {t}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 text-white bg-red-700 px-6 py-3 font-mono font-bold uppercase text-xs hover:bg-red-800 transition-colors rounded shadow-md hover:shadow-lg"
            >
              Review Footage <ExternalLink size={16} />
            </a>
            {sourceUrl && (
              <a 
                href={sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 text-emerald-900 bg-white border border-emerald-200 px-6 py-3 font-mono font-bold uppercase text-xs hover:bg-[#F5F5F0] transition-colors rounded shadow-sm"
              >
                Tactical Board <Code size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Right Side: The Live Engine Window */}
      <div className="w-full xl:w-[55%] h-[500px] md:h-[600px] rounded-r-[2rem] border-l border-emerald-900/5 relative bg-[#EAEAEA] overflow-hidden" style={{ transform: "translateZ(50px)" }}>
        {/* Premium macOS Browser Top Bar */}
        <div className="absolute top-0 left-0 w-full h-12 bg-white/90 backdrop-blur-md flex items-center px-5 gap-2.5 z-20 border-b border-emerald-900/10">
           <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
           <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
           <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
           
           <div className="ml-6 flex-1 max-w-md mx-auto bg-[#F5F5F0] rounded-md h-7 flex items-center justify-center border border-emerald-900/10 shadow-inner relative">
             <span className="text-[10px] font-mono text-emerald-800 select-none flex items-center gap-2 uppercase tracking-widest">
               <svg className="w-3 h-3 text-emerald-800" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
               {new URL(liveUrl).hostname}
             </span>
           </div>
        </div>
        
        {/* The Actual Live Website */}
        <div className="w-full h-full pt-12 bg-[#EAEAEA]">
          <iframe 
            src={liveUrl} 
            title={title}
            className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-700 relative z-0"
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LiveProjectPreview;