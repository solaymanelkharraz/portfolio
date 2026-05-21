import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Globe, ChevronLeft, ExternalLink, Code, Trophy, Target, Cpu, Activity, Filter } from 'lucide-react';
import FloatingDock from '../components/FloatingDock';
import Footer from '../components/Footer';

const FixtureList = ({ projectsData: projects = [] }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTech, setSelectedTech] = useState('All');
    const navigate = useNavigate();

    const allTechs = ['All', ...new Set(projects.flatMap(p => typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : (p.tech_stack || [])))];

    const filteredProjects = projects
        .filter(p => {
            const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                p.description?.toLowerCase().includes(searchQuery.toLowerCase());
            const techStack = typeof p.tech_stack === 'string' ? JSON.parse(p.tech_stack) : (p.tech_stack || []);
            const matchesTech = selectedTech === 'All' || techStack.includes(selectedTech);
            return matchesSearch && matchesTech;
        })
        .sort((a, b) => {
            if (a.is_featured && !b.is_featured) return -1;
            if (!a.is_featured && b.is_featured) return 1;
            return 0;
        });

    return (
        <div className="min-h-screen bg-[#F8F9FA] selection:bg-emerald-900 selection:text-white relative">
            {/* Logo */}
            <div className="fixed top-8 left-8 z-50">
                <Link to="/" className="font-bold text-2xl tracking-tighter text-emerald-900 font-heading">
                    S<span className="text-red-700">.</span>DEV
                </Link>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-24">
                {/* Header Section */}
                <div className="mb-16 mt-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-widest mb-8 hover:gap-4 transition-all">
                        <ChevronLeft size={14} /> Back to Technical Board
                    </Link>
                    <div className="border-l-4 border-emerald-800 pl-6">
                        <h1 className="text-5xl md:text-7xl font-black text-emerald-950 mb-4 tracking-tighter font-heading uppercase">Full Fixture List</h1>
                        <p className="text-red-700 font-mono text-sm tracking-widest uppercase font-bold">Total Portfolio Analysis & Technical Records.</p>
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col gap-8 mb-12">
                    <div className="relative w-full">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-900/30" size={24} />
                        <input 
                            type="text"
                            placeholder="Search project title, tactics, or stack..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-emerald-900/10 rounded-[2rem] py-6 pl-16 pr-8 text-lg font-bold text-emerald-950 focus:outline-none focus:ring-8 focus:ring-emerald-900/5 transition-all shadow-sm placeholder:text-emerald-900/20"
                        />
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.2em] px-2">
                            <Filter size={14} /> Tactical Stack (Language Chooser)
                        </div>
                        <div className="flex flex-wrap gap-3">
                        {allTechs.map(tech => (
                            <button
                                key={tech}
                                onClick={() => setSelectedTech(tech)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                                    selectedTech === tech 
                                    ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' 
                                    : 'bg-white text-emerald-800 border-emerald-900/10 hover:border-emerald-800'
                                }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

                {/* Projects Grid */}
                {projects.length === 0 ? (
                    <div className="flex justify-center p-32"><Activity className="animate-spin text-emerald-900" size={48} /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, i) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                key={project.id}
                                className={`group bg-white rounded-[2.5rem] border p-8 flex flex-col transition-all hover:shadow-2xl hover:-translate-y-2 ${
                                    project.is_featured ? 'border-emerald-500/20 shadow-lg shadow-emerald-900/5' : 'border-emerald-900/10'
                                }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-900 rounded-2xl flex items-center justify-center shadow-inner">
                                        <Trophy size={24} />
                                    </div>
                                    {project.is_featured && (
                                        <span className="bg-emerald-900 text-white text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-md">
                                            First Team
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-2xl font-black text-emerald-950 mb-2 uppercase font-heading tracking-tight group-hover:text-emerald-800 transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-red-700 font-mono text-[10px] font-bold uppercase tracking-widest mb-6">
                                    {project.project_type || 'Full-Stack Solution'}
                                </p>

                                <div className="space-y-4 mb-8 flex-1">
                                    <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-emerald-900/5">
                                        <div className="flex items-center gap-2 text-[8px] font-black text-emerald-900/40 uppercase mb-2">
                                            <Target size={12} /> The Opponent
                                        </div>
                                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{project.problem}</p>
                                    </div>
                                    <div className="bg-[#F8F9FA] p-4 rounded-2xl border border-emerald-900/5">
                                        <div className="flex items-center gap-2 text-[8px] font-black text-emerald-900/40 uppercase mb-2">
                                            <Cpu size={12} /> The Tactic
                                        </div>
                                        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{project.solution}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {(typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : project.tech_stack)?.map(tech => (
                                        <span key={tech} className="bg-white border border-emerald-900/10 px-3 py-1 rounded-full text-[9px] font-bold text-emerald-800 uppercase font-mono">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-3 pt-6 border-t border-emerald-900/5">
                                    {project.live_url && (
                                        <a href={project.live_url} target="_blank" rel="noreferrer" className="flex-1 bg-emerald-900 text-white text-[9px] font-black uppercase py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-950 transition-all shadow-md">
                                            Footage <ExternalLink size={12} />
                                        </a>
                                    )}
                                    {project.source_url && (
                                        <a href={project.source_url} target="_blank" rel="noreferrer" className="flex-1 bg-white border border-emerald-900/10 text-emerald-900 text-[9px] font-black uppercase py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                                            Board <Code size={12} />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {projects.length > 0 && filteredProjects.length === 0 && (
                    <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-emerald-900/10">
                        <Search size={48} className="mx-auto text-emerald-900/10 mb-6" />
                        <h3 className="text-xl font-black text-emerald-950 uppercase mb-2">No Match Records Found</h3>
                        <p className="text-gray-400 text-sm font-mono">Adjust your search or tactical filters to explore other fixtures.</p>
                    </div>
                )}
            </main>
            <FloatingDock />
            <Footer />
        </div>
    );
};

export default FixtureList;
