import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ExternalLink, Code, Target, ShieldAlert, Activity } from 'lucide-react';

const ProjectTabs = () => {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        const featured = data.filter(p => p.is_featured);
        if (featured.length > 0) {
          setActiveTab(featured[0].id);
        } else if (data.length > 0) {
          setActiveTab(data[0].id);
        }
        setLoading(false);
      });
  }, []);

  const featuredProjects = projects.filter(p => p.is_featured).slice(0, 3);
  
  const visibleProjects = featuredProjects;

  const activeProject = projects.find(p => p.id === activeTab);

  if (loading || !activeProject) {
    return <div className="max-w-7xl mx-auto px-6 w-full mb-32 text-center text-emerald-800 font-mono">Loading Match Highlights...</div>;
  }

  return (
    <section id="architectures" className="max-w-7xl mx-auto px-6 w-full mb-32">
      <div className="mb-16 md:mb-24 text-center md:text-left border-l-4 border-emerald-800 pl-6">
        <h2 className="text-5xl md:text-6xl font-black text-emerald-950 mb-4 tracking-tighter font-heading uppercase">Match Highlights</h2>
        <p className="text-red-700 font-mono text-sm tracking-widest uppercase font-bold">Project Carousel & Analytics.</p>
      </div>

      {/* Tabs Header */}
      <div className="flex flex-wrap items-center gap-4 mb-12 justify-center md:justify-start">
        {visibleProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => setActiveTab(project.id)}
            className={`px-6 py-3 font-mono font-bold uppercase text-[10px] rounded-full transition-all duration-300 border-2 ${
              activeTab === project.id 
                ? 'bg-emerald-800 text-white border-emerald-800 shadow-lg' 
                : 'bg-white text-emerald-800 border-emerald-900/10 hover:border-emerald-800'
            }`}
          >
            [ {project.title} ]
          </button>
        ))}

        {projects.length > 3 && (
          <Link
            to="/fixtures"
            className="px-6 py-3 font-mono font-bold uppercase text-[10px] rounded-full transition-all duration-300 border-2 border-dashed border-emerald-900/20 text-emerald-900/40 hover:border-emerald-800 hover:text-emerald-800 flex items-center gap-2"
          >
            [ 📊 VIEW FULL FIXTURE LIST ]
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="min-h-[600px] xl:min-h-[600px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-[2rem] border border-emerald-900/10 flex flex-col xl:flex-row items-stretch shadow-lg overflow-hidden h-full"
          >
          {/* Left Side: Tactical Breakdown */}
          <div className="w-full xl:w-[45%] p-8 md:p-10 border-r border-emerald-900/5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-red-700 animate-pulse rounded-full"></span>
                  <span className="text-red-700 text-xs font-bold uppercase tracking-[0.2em] font-mono">Match Breakdown</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-emerald-800 text-[10px] font-bold uppercase tracking-widest font-mono bg-emerald-50 px-3 py-1.5 rounded border border-emerald-100">
                  <Activity size={14} /> Analytics
                </div>
              </div>
              
              <h3 className="text-4xl font-black text-emerald-950 mb-8 uppercase font-heading tracking-tight">{activeProject.title}</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-10">
                <div className="flex-1 space-y-6">
                  <div className="bg-[#F8F9FA] border border-emerald-900/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-red-700 mb-2 font-mono text-xs font-bold uppercase">
                      <ShieldAlert size={14} /> The Opponent (Problem)
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{activeProject.problem}</p>
                  </div>

                  <div className="bg-[#F8F9FA] border border-emerald-900/5 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-emerald-800 mb-2 font-mono text-xs font-bold uppercase">
                      <Target size={14} /> The Tactic (Architecture)
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{activeProject.solution}</p>
                  </div>
                </div>

                {/* Post-Match Analytics Column */}
                <div className="w-full sm:w-1/3 bg-emerald-900 text-white p-5 rounded-xl flex flex-col justify-center gap-4 shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 blur-[30px] rounded-full pointer-events-none -mr-10 -mt-10"></div>
                   {Object.entries(activeProject.metrics || {}).map(([key, value]) => (
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
                {activeProject.tech_stack && activeProject.tech_stack.map((t) => (
                  <span key={t} className="px-3 py-1 bg-[#F8F9FA] text-emerald-800 text-xs font-mono font-bold uppercase border border-emerald-900/10 rounded">
                    {t}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {activeProject.live_url && (
                <a 
                  href={activeProject.live_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 text-white bg-red-700 px-6 py-3 font-mono font-bold uppercase text-xs hover:bg-red-800 transition-colors rounded shadow-md hover:shadow-lg"
                >
                  Review Footage <ExternalLink size={16} />
                </a>
                )}
                {activeProject.source_url && activeProject.source_url !== '#' && (
                  <a 
                    href={activeProject.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center justify-center gap-2 text-emerald-900 bg-white border border-emerald-200 px-6 py-3 font-mono font-bold uppercase text-xs hover:bg-[#F8F9FA] transition-colors rounded shadow-sm"
                  >
                    Tactical Board <Code size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: The Live Engine Window */}
          <div className="w-full xl:w-[55%] h-[500px] md:h-[600px] bg-[#EAEAEA] relative overflow-hidden">
            {/* Premium macOS Browser Top Bar */}
            <div className="absolute top-0 left-0 w-full h-12 bg-white/90 backdrop-blur-md flex items-center px-5 gap-2.5 z-20 border-b border-emerald-900/10">
               <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
               <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
               <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
               
               <div className="ml-6 flex-1 max-w-md mx-auto bg-[#F8F9FA] rounded-md h-7 flex items-center justify-center border border-emerald-900/10 shadow-inner relative">
                 <span className="text-[10px] font-mono text-emerald-800 select-none flex items-center gap-2 uppercase tracking-widest">
                   <svg className="w-3 h-3 text-emerald-800" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                   {activeProject.live_url ? new URL(activeProject.live_url).hostname : 'localhost'}
                 </span>
               </div>
            </div>
            
            {/* The Actual Live Website */}
            <div className="w-full h-full pt-12 bg-[#EAEAEA]">
              <iframe 
                src={activeProject.live_url} 
                title={activeProject.title}
                className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-700 relative z-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectTabs;
