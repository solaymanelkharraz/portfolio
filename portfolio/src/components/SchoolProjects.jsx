import React from 'react';
import { motion } from 'framer-motion';
import { Database, Layout, Code, Server, Smartphone, Globe } from 'lucide-react';

const projects = [
  {
    title: "EcoTrack Dashboard",
    type: "Frontend Engine",
    desc: "A responsive carbon footprint tracker visualizing user habits with modern charts and animated state transitions.",
    tech: ["React", "Tailwind", "Recharts"],
    icon: Layout,
    stats: { Logic: 88, UI: 92, DB: 75 }
  },
  {
    title: "AuthFlow Microservice",
    type: "Backend System",
    desc: "A robust JWT-based authentication API with role-based access control and rate-limiting defenses.",
    tech: ["Node.js", "Express", "MongoDB"],
    icon: Server,
    stats: { Logic: 95, UI: 60, DB: 88 }
  },
  {
    title: "Inventory API",
    type: "Database Logic",
    desc: "A relational database schema and API managing complex product variants, stock tracking, and supplier logs.",
    tech: ["Laravel", "MySQL", "Eloquent"],
    icon: Database,
    stats: { Logic: 90, UI: 65, DB: 94 }
  },
  {
    title: "TaskZero CLI",
    type: "Tooling",
    desc: "A lightweight command-line interface for rapid task management and developer workflow automation.",
    tech: ["Python", "Click", "SQLite"],
    icon: Code,
    stats: { Logic: 85, UI: 40, DB: 80 }
  },
  {
    title: "WeatherApp Concept",
    type: "Mobile UI",
    desc: "A weather application concept demonstrating complex API integration and dynamic state-based UI rendering.",
    tech: ["React Native", "Expo", "Axios"],
    icon: Smartphone,
    stats: { Logic: 78, UI: 88, DB: 60 }
  },
  {
    title: "Local Market Scraper",
    type: "Data Engineering",
    desc: "An automated web scraping script extracting and structuring pricing data from local marketplace HTML.",
    tech: ["Python", "BeautifulSoup", "Pandas"],
    icon: Globe,
    stats: { Logic: 92, UI: 30, DB: 85 }
  }
];

const StatBar = ({ label, value }) => {
  const isTop = value >= 90;
  return (
    <div className="mb-3">
      <div className="flex justify-between text-[10px] font-mono font-bold text-emerald-950 mb-1 tracking-wider uppercase">
        <span>{label}</span>
        <span className={isTop ? "text-red-700 font-black" : "text-emerald-800"}>{value}</span>
      </div>
      <div className="w-full h-1.5 bg-emerald-900/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className={`h-full ${isTop ? 'bg-red-700 shadow-[0_0_8px_rgba(185,28,28,0.6)]' : 'bg-emerald-800'}`}
        />
      </div>
    </div>
  );
};

const SchoolProjects = () => {
  return (
    <section id="archives" className="relative z-20 py-32 bg-[#EAEAEA] border-t border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:mb-24 text-center md:text-left border-l-4 border-emerald-800 pl-6">
          <h2 className="text-5xl md:text-6xl font-black text-emerald-950 mb-4 tracking-tighter font-heading uppercase">La Masia</h2>
          <p className="text-red-700 font-mono text-sm tracking-widest uppercase font-bold">Youth Academy Scouting Reports.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-emerald-900/10 shadow-md rounded-2xl p-6 hover:shadow-xl hover:border-emerald-800/30 transition-all duration-300 relative flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-red-700 mb-1 font-mono">{proj.type}</div>
                  <h3 className="text-xl font-bold text-emerald-950 font-heading tracking-tight uppercase leading-tight w-4/5">{proj.title}</h3>
                </div>
                <div className="w-10 h-10 bg-[#F5F5F0] rounded-full flex items-center justify-center border border-emerald-900/10 shrink-0">
                  <proj.icon className="text-emerald-800" size={18} />
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed min-h-[60px]">{proj.desc}</p>
              
              <div className="bg-[#F5F5F0] p-4 rounded-xl mb-6 border border-emerald-900/5">
                <StatBar label="Logic" value={proj.stats.Logic} />
                <StatBar label="UI / Design" value={proj.stats.UI} />
                <StatBar label="DB / Architecture" value={proj.stats.DB} />
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-emerald-900/10">
                {proj.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-white text-emerald-800 rounded text-[10px] font-bold uppercase border border-emerald-800/20 shadow-sm font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchoolProjects;
