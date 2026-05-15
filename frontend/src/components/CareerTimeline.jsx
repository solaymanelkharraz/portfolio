import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const TimelineEvent = ({ year, title, description, side }) => {
  return (
    <div className={`relative flex items-center justify-between mb-24 w-full ${side === 'left' ? 'flex-row-reverse' : ''}`}>
      <div className="w-[45%]" />
      
      {/* Node */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-emerald-600 rounded-full z-10 shadow-[0_0_10px_rgba(5,150,105,0.4)]" />

      {/* Content */}
      <motion.div 
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-[45%] bg-white p-6 rounded-xl border border-emerald-900/10 shadow-sm hover:shadow-md transition-shadow ${side === 'left' ? 'text-right' : 'text-left'}`}
      >
        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-mono font-bold rounded-full mb-3 uppercase tracking-widest">
          {year}
        </span>
        <h3 className="text-xl font-black font-heading text-emerald-950 uppercase mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed font-mono">
          {description}
        </p>
      </motion.div>
    </div>
  );
};

const CareerTimeline = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="timeline" className="relative z-20 py-32 bg-[#F8F9FA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center md:text-left border-l-4 border-emerald-800 pl-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-4 shadow-sm">
            <span className="text-emerald-800 text-xs font-bold font-mono tracking-widest uppercase">
              📈 CAREER MODE
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-emerald-950 tracking-tighter font-heading uppercase">
            The Journey.
          </h2>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto pt-10">
          {/* Vertical Pitch Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-emerald-900/10 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-emerald-600 origin-top h-full"
              style={{ scaleY }}
            />
          </div>

          {/* Events */}
          <TimelineEvent 
            year="2006" 
            title="The Kickoff" 
            description="Born and started the journey. Building the foundation and early curiosity." 
            side="right"
          />
          <TimelineEvent 
            year="2018" 
            title="The Big Transfer" 
            description="Moved to Tangier for High School. Establishing the base and focusing on technical maturity." 
            side="left"
          />
          <TimelineEvent 
            year="2023" 
            title="Academy Signing" 
            description="Joined OFPPT Tangier. Deep diving into architecture and full-stack development." 
            side="right"
          />
          <TimelineEvent 
            year="2026" 
            title="The First Team" 
            description="PFE completion and professional career start. Open for high-performance contracts." 
            side="left"
          />
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
