import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Code, Network, Cpu, Shield, Database, Layout, Server, Box, GitBranch } from 'lucide-react';

const Player = ({ name, icon: Icon, position, type }) => {
  const isAttackOrMid = type === 'attack' || type === 'midfield';
  const borderClass = isAttackOrMid ? 'border-rose-600' : 'border-blue-600';
  const ringClass = isAttackOrMid ? 'group-hover:border-rose-600' : 'group-hover:border-blue-600';

  return (
    <div className="absolute z-20" style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)' }}>
      <motion.div 
        whileHover={{ scale: 1.15 }}
        className="flex flex-col items-center justify-center group cursor-pointer"
      >
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-4 ${borderClass} bg-white shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all duration-300 relative`}>
          <Icon className={`text-slate-900`} size={22} />
          <div className={`absolute inset-0 rounded-full border-2 ${ringClass} opacity-0 group-hover:animate-ping`}></div>
        </div>
        <span className="mt-2 text-[10px] font-mono font-bold tracking-widest uppercase bg-white px-2 py-1 rounded text-slate-900 border border-slate-200 whitespace-nowrap shadow-md">
          {name}
        </span>
      </motion.div>
    </div>
  );
};

const SubPlayer = ({ name, icon: Icon }) => (
  <motion.div 
    whileHover={{ scale: 1.1 }}
    className="flex flex-col items-center justify-center group cursor-pointer"
  >
    <div className={`w-10 h-10 rounded-full border-2 border-slate-400 bg-white shadow-md flex items-center justify-center transition-all duration-300`}>
      <Icon className={`text-slate-600`} size={18} />
    </div>
    <span className="mt-1 text-[9px] font-mono font-bold tracking-wider uppercase text-slate-600">
      {name}
    </span>
  </motion.div>
);

const TacticalPitch = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 relative">
      
      {/* Manager Badge */}
      <div className="absolute -top-4 -left-2 md:-left-6 z-30 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/90 backdrop-blur-md border border-emerald-900/10 shadow-xl rounded-xl p-3 flex flex-col items-start justify-center"
        >
          <span className="text-[10px] font-mono font-bold text-red-700 tracking-widest uppercase mb-1">Manager: Soulayman</span>
          <span className="text-xs font-heading font-black text-emerald-950 uppercase">System: Full-Stack Tiki-Taka</span>
        </motion.div>
      </div>

      {/* The Pitch Container */}
      <div className="w-full h-[700px] relative rounded-xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-b from-emerald-800 to-emerald-950">
        
        {/* Background Grass Pattern (Subtle stripes) */}
        <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_40px,#000_40px,#000_80px)] pointer-events-none z-0"></div>

        {/* Pitch Lines - Chalk White */ }
        <div className="absolute inset-6 border-2 border-white/30 pointer-events-none z-10"></div>
        <div className="absolute top-1/2 left-0 w-full border-t-2 border-white/30 pointer-events-none z-10"></div>
        
        {/* Center Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/30 rounded-full pointer-events-none z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white/50 rounded-full pointer-events-none z-10"></div>

        {/* Penalty Areas */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-64 h-32 border-2 border-t-0 border-white/30 pointer-events-none z-10"></div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-32 border-2 border-b-0 border-white/30 pointer-events-none z-10"></div>
        
        {/* Goal Areas */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-12 border-2 border-t-0 border-white/30 pointer-events-none z-10"></div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-32 h-12 border-2 border-b-0 border-white/30 pointer-events-none z-10"></div>

        {/* Corner Arcs */}
        <div className="absolute top-6 left-6 w-8 h-8 border-r-2 border-b-2 border-white/30 rounded-br-full pointer-events-none z-10"></div>
        <div className="absolute top-6 right-6 w-8 h-8 border-l-2 border-b-2 border-white/30 rounded-bl-full pointer-events-none z-10"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-r-2 border-t-2 border-white/30 rounded-tr-full pointer-events-none z-10"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-l-2 border-t-2 border-white/30 rounded-tl-full pointer-events-none z-10"></div>

        {/* --- THE SQUAD (4-3-3 Formation) --- */}
        
        {/* ATTACKERS */}
        <Player name="Tailwind v4" icon={Layout} position={{ top: '20%', left: '25%' }} type="attack" />
        <Player name="React 19" icon={Zap} position={{ top: '15%', left: '50%' }} type="attack" />
        <Player name="Framer Motion" icon={Activity} position={{ top: '20%', left: '75%' }} type="attack" />

        {/* MIDFIELD */}
        <Player name="APIs" icon={Network} position={{ top: '42%', left: '30%' }} type="midfield" />
        <Player name="JavaScript" icon={Code} position={{ top: '35%', left: '50%' }} type="midfield" />
        <Player name="n8n" icon={Cpu} position={{ top: '42%', left: '70%' }} type="midfield" />

        {/* DEFENSE */}
        <Player name="Docker" icon={Box} position={{ top: '65%', left: '20%' }} type="defense" />
        <Player name="Laravel 11" icon={Shield} position={{ top: '70%', left: '40%' }} type="defense" />
        <Player name="PHP" icon={Code} position={{ top: '70%', left: '60%' }} type="defense" />
        <Player name="MongoDB" icon={Database} position={{ top: '65%', left: '80%' }} type="defense" />

        {/* GOALKEEPER */}
        <Player name="MySQL" icon={Database} position={{ top: '88%', left: '50%' }} type="defense" />
        
      </div>

      {/* The Bench */}
      <div className="w-full mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="text-sm font-bold font-mono text-emerald-900 uppercase tracking-widest border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-6">
          Substitutes:
        </div>
        <div className="flex gap-6 overflow-x-auto w-full justify-center md:justify-start">
          <SubPlayer name="Figma" icon={Layout} />
          <SubPlayer name="Python" icon={Code} />
          <SubPlayer name="Cloudinary" icon={Server} />
          <SubPlayer name="Git" icon={GitBranch} />
        </div>
      </div>

    </div>
  );
};

export default TacticalPitch;
