import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Activity, Code, Network, Cpu, Shield, Database, Layout, Server, Box, GitBranch } from 'lucide-react';

const playerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

const Player = ({ name, icon: Icon, position, type, constraintsRef }) => {
  const isAttackOrMid = type === 'attack' || type === 'midfield';
  const borderClass = isAttackOrMid ? 'border-rose-600' : 'border-blue-600';
  const ringClass = isAttackOrMid ? 'group-hover:border-rose-600' : 'group-hover:border-blue-600';

  return (
    <motion.div 
      variants={playerVariants}
      animate={{ 
        top: position.top, 
        left: position.left,
        x: 0, 
        y: 0 
      }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      whileDrag={{ scale: 1.2, zIndex: 50 }}
      className="absolute z-20 pointer-events-auto" 
      style={{ 
        marginTop: "-28px",
        marginLeft: "-28px"
      }}
    >
      <motion.div 
        whileHover={{ scale: 1.15 }}
        className="flex flex-col items-center justify-center group cursor-grab active:cursor-grabbing"
      >
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-4 ${borderClass} bg-white shadow-[0_10px_20px_rgba(0,0,0,0.4)] flex items-center justify-center transition-colors relative`}>
          <Icon className={`text-slate-900`} size={22} />
          <div className={`absolute inset-0 rounded-full border-2 ${ringClass} opacity-0 group-hover:animate-ping`}></div>
        </div>
        <span className="mt-2 text-[10px] font-mono font-bold tracking-widest uppercase bg-white px-2 py-1 rounded text-slate-900 border border-slate-200 whitespace-nowrap shadow-md pointer-events-none">
          {name}
        </span>
      </motion.div>
    </motion.div>
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

const iconMap = {
  Layout: Layout,
  Zap: Zap,
  Activity: Activity,
  Network: Network,
  Code: Code,
  Cpu: Cpu,
  Box: Box,
  Shield: Shield,
  Database: Database,
  Server: Server,
  GitBranch: GitBranch
};

const presetFormations = {
  '4-3-3': [
    { y: '85%', x: '50%' }, // GK
    { y: '70%', x: '20%' }, // LB
    { y: '75%', x: '35%' }, // LCB
    { y: '75%', x: '65%' }, // RCB
    { y: '70%', x: '80%' }, // RB
    { y: '45%', x: '30%' }, // LCM
    { y: '55%', x: '50%' }, // CM
    { y: '45%', x: '70%' }, // RCM
    { y: '20%', x: '25%' }, // LW
    { y: '15%', x: '50%' }, // ST
    { y: '20%', x: '75%' }  // RW
  ],
  '4-4-2': [
    { y: '85%', x: '50%' }, // GK
    { y: '70%', x: '20%' }, // LB
    { y: '75%', x: '35%' }, // LCB
    { y: '75%', x: '65%' }, // RCB
    { y: '70%', x: '80%' }, // RB
    { y: '45%', x: '20%' }, // LM
    { y: '50%', x: '40%' }, // LCM
    { y: '50%', x: '60%' }, // RCM
    { y: '45%', x: '80%' }, // RM
    { y: '20%', x: '35%' }, // LST
    { y: '20%', x: '65%' }  // RST
  ],
  '3-5-2': [
    { y: '85%', x: '50%' }, // GK
    { y: '75%', x: '25%' }, // LCB
    { y: '78%', x: '50%' }, // CB
    { y: '75%', x: '75%' }, // RCB
    { y: '55%', x: '25%' }, // LDM
    { y: '60%', x: '50%' }, // CDM
    { y: '55%', x: '75%' }, // RDM
    { y: '35%', x: '20%' }, // LM
    { y: '35%', x: '80%' }, // RM
    { y: '15%', x: '35%' }, // LST
    { y: '15%', x: '65%' }  // RST
  ]
};

const TacticalPitch = ({ skills = [] }) => {
  const [formation, setFormation] = React.useState('custom');
  const pitchRef = React.useRef(null);

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 relative">
      
      {/* Tactical Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-10 relative z-30">
        <span className="text-[10px] font-bold font-mono text-emerald-900 uppercase tracking-widest mr-2">Formation:</span>
        {[
          { id: 'custom', label: "Manager's Setup" },
          { id: '4-3-3', label: '4-3-3' },
          { id: '4-4-2', label: '4-4-2' },
          { id: '3-5-2', label: '3-5-2' }
        ].map(f => (
          <button 
            key={f.id}
            onClick={() => setFormation(f.id)}
            className={`px-5 py-2 font-mono font-bold uppercase text-[10px] rounded-full transition-all duration-300 border-2 shadow-sm ${
              formation === f.id 
                ? 'bg-emerald-800 text-white border-emerald-800 scale-105' 
                : 'bg-white text-emerald-800 border-emerald-900/10 hover:border-emerald-800 hover:scale-105'
            }`}
          >
            [ {f.label} ]
          </button>
        ))}
      </div>
      
      {/* Manager Badge (Moved into Pitch so it doesn't overlap buttons) */}

      {/* The Pitch Container */}
      <div 
        ref={pitchRef} 
        className="w-full h-[700px] relative rounded-xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-b from-emerald-800 to-emerald-950"
        style={{ position: 'relative' }}
      >
        
        {/* Manager Badge Overlay */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/95 backdrop-blur-md border border-emerald-900/10 shadow-xl rounded-xl p-3 flex flex-col items-start justify-center"
          >
            <span className="text-[10px] font-mono font-bold text-red-700 tracking-widest uppercase mb-1">Manager: Soulayman</span>
            <span className="text-xs font-heading font-black text-emerald-950 uppercase">System: Full-Stack Tiki-Taka</span>
          </motion.div>
        </div>

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

        {/* --- THE SQUAD (Dynamic from API) --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {skills.filter(s => s.is_starter && s.is_starter !== '0' && s.is_starter !== 0).map((skill, index) => {
            const isCustom = formation === 'custom';
            
            // If custom, use DB percentages. If preset, map directly by index!
            const mappedPos = isCustom ? null : presetFormations[formation][index % 11];
              
            const pos = mappedPos ? { top: mappedPos.y, left: mappedPos.x } : { 
              top: typeof skill.position_y === 'number' ? `${skill.position_y}%` : skill.position_y, 
              left: typeof skill.position_x === 'number' ? `${skill.position_x}%` : skill.position_x 
            };
            
            return (
              <Player 
                key={skill.id}
                name={skill.name} 
                icon={iconMap[skill.icon_name] || Layout} 
                position={pos} 
                type={skill.category.toLowerCase()} 
                constraintsRef={pitchRef}
              />
            );
          })}
        </motion.div>
        
      </div>

      {/* The Bench */}
      <div className="w-full mt-6 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="text-sm font-bold font-mono text-emerald-900 uppercase tracking-widest border-b md:border-b-0 md:border-r border-slate-200 pb-2 md:pb-0 md:pr-6">
          Substitutes Bench:
        </div>
        <div className="flex gap-6 overflow-x-auto w-full justify-center md:justify-start py-2">
          {skills.filter(s => !s.is_starter || s.is_starter === '0' || s.is_starter === 0).map(skill => (
            <SubPlayer key={skill.id} name={skill.name} icon={iconMap[skill.icon_name] || Layout} />
          ))}
          {skills.filter(s => !s.is_starter || s.is_starter === '0' || s.is_starter === 0).length === 0 && (
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">No substitutes selected</span>
          )}
        </div>
      </div>

    </div>
  );
};

export default TacticalPitch;
