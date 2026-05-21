import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Save, Plus, Trash2, ExternalLink, 
    BarChart3, Code2, AlertCircle, CheckCircle2, 
    Loader2, Trophy, Target, Cpu, Database, Gauge 
} from 'lucide-react';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProject, setEditingProject] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [saving, setSaving] = useState(false);

    const initialFormState = {
        title: '',
        project_type: 'Full-Stack Deployment',
        problem: '',
        solution: '',
        tech_stack: [],
        metrics: { lighthouse: 95, query_speed: '45ms', db_load: '12%' },
        live_url: '',
        source_url: '',
        is_featured: false
    };

    const [formData, setFormData] = useState(initialFormState);
    const [techInput, setTechInput] = useState('');

    const token = localStorage.getItem('auth_token');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('https://portfolio-lrul.onrender.com/api/projects');
            const data = await res.json();
            setProjects(data);
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setEditingProject(null);
        setIsFormOpen(false);
        setTechInput('');
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            ...project,
            metrics: typeof project.metrics === 'string' ? JSON.parse(project.metrics) : (project.metrics || initialFormState.metrics),
            tech_stack: typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : (project.tech_stack || [])
        });
        setIsFormOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        const url = editingProject 
            ? `https://portfolio-lrul.onrender.com/api/projects/${editingProject.id}`
            : 'https://portfolio-lrul.onrender.com/api/projects';
        
        const method = editingProject ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSuccessMsg(editingProject ? 'Tactics Updated!' : 'New Signing Confirmed!');
                fetchProjects();
                setTimeout(() => {
                    setSuccessMsg('');
                    handleReset();
                }, 2000);
            }
        } catch (err) { console.error(err); }
        setSaving(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate this project contract? This cannot be undone.')) return;
        try {
            const res = await fetch(`https://portfolio-lrul.onrender.com/api/projects/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) fetchProjects();
        } catch (err) { console.error(err); }
    };

    const addTech = (e) => {
        if (e.key === 'Enter' && techInput.trim()) {
            e.preventDefault();
            if (!formData.tech_stack.includes(techInput.trim())) {
                setFormData({ ...formData, tech_stack: [...formData.tech_stack, techInput.trim()] });
            }
            setTechInput('');
        }
    };

    const removeTech = (tech) => {
        setFormData({ ...formData, tech_stack: formData.tech_stack.filter(t => t !== tech) });
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tight">Match Highlights</h2>
                    <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">First Team Project Portfolio</p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(true)}
                    className="bg-emerald-900 text-white rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-950 transition-all shadow-lg shadow-emerald-900/20"
                >
                    <Plus size={16} /> New Project Signing
                </button>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Projects List */}
                <div className={`${isFormOpen ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4 transition-all duration-500`}>
                    {loading ? (
                        <div className="flex justify-center p-12"><Loader2 className="animate-spin text-emerald-900" /></div>
                    ) : (
                        <div className={`grid gap-4 ${isFormOpen ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
                            {projects.map((project) => (
                                <motion.div 
                                    layout
                                    key={project.id}
                                    className={`bg-white border rounded-[2rem] p-6 transition-all hover:shadow-md ${project.is_featured ? 'border-emerald-500/30 bg-emerald-50/10' : 'border-emerald-900/5'}`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-900">
                                                <Trophy size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-black text-emerald-950 text-sm uppercase truncate max-w-[150px]">{project.title}</h4>
                                                <p className="text-[8px] font-bold text-emerald-800/40 uppercase">{project.project_type}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleEdit(project)} className="p-2 text-emerald-900/40 hover:text-emerald-900 transition-colors"><Edit2 size={14} /></button>
                                            <button onClick={() => handleDelete(project.id)} className="p-2 text-rose-300 hover:text-rose-600 transition-colors"><Trash2 size={14} /></button>
                                        </div>
                                    </div>

                                    {project.is_featured && (
                                        <div className="mb-4">
                                            <span className="text-[8px] font-black bg-emerald-900 text-white px-2 py-1 rounded-full uppercase tracking-widest">Starting 3</span>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-1 mt-auto">
                                        {(typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : project.tech_stack)?.slice(0, 3).map(tech => (
                                            <span key={tech} className="text-[8px] font-bold text-emerald-900/60 bg-white border border-emerald-900/5 px-2 py-0.5 rounded-full uppercase">{tech}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Edit/Create Sidebar Form */}
                <AnimatePresence>
                    {isFormOpen && (
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            className="lg:col-span-5"
                        >
                            <div className="bg-white border border-emerald-900/10 rounded-[2.5rem] p-8 shadow-xl sticky top-8">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-sm font-black text-emerald-950 uppercase tracking-widest">
                                        {editingProject ? 'Modify Tactics' : 'New Tactical Signing'}
                                    </h3>
                                    <button onClick={handleReset} className="text-gray-400 hover:text-emerald-950">
                                        <AlertCircle size={20} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        {/* Basic Info */}
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Project Title</label>
                                            <input 
                                                type="text" required
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Live URL</label>
                                                <input 
                                                    type="url"
                                                    value={formData.live_url}
                                                    onChange={(e) => setFormData({...formData, live_url: e.target.value})}
                                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-2 px-4 text-xs font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Source URL</label>
                                                <input 
                                                    type="url"
                                                    value={formData.source_url}
                                                    onChange={(e) => setFormData({...formData, source_url: e.target.value})}
                                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-2 px-4 text-xs font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Breakdown */}
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-red-700 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Target size={12} /> The Opponent (Problem)
                                            </label>
                                            <textarea 
                                                rows="2"
                                                value={formData.problem}
                                                onChange={(e) => setFormData({...formData, problem: e.target.value})}
                                                className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-xs font-bold text-emerald-950 focus:outline-none"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-emerald-700 uppercase tracking-widest ml-1 flex items-center gap-2">
                                                <Cpu size={12} /> The Tactic (Solution)
                                            </label>
                                            <textarea 
                                                rows="2"
                                                value={formData.solution}
                                                onChange={(e) => setFormData({...formData, solution: e.target.value})}
                                                className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-xs font-bold text-emerald-950 focus:outline-none"
                                            />
                                        </div>

                                        {/* Metrics */}
                                        <div className="grid grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-emerald-900/40 ml-1">Lighthouse</label>
                                                <div className="relative">
                                                    <input 
                                                        type="number"
                                                        value={formData.metrics.lighthouse}
                                                        onChange={(e) => setFormData({...formData, metrics: {...formData.metrics, lighthouse: e.target.value}})}
                                                        className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-lg py-2 px-3 text-xs font-black text-emerald-950"
                                                    />
                                                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold opacity-30">%</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-emerald-900/40 ml-1">Query Speed</label>
                                                <input 
                                                    type="text"
                                                    value={formData.metrics.query_speed}
                                                    onChange={(e) => setFormData({...formData, metrics: {...formData.metrics, query_speed: e.target.value}})}
                                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-lg py-2 px-3 text-xs font-black text-emerald-950"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-emerald-900/40 ml-1">DB Load</label>
                                                <input 
                                                    type="text"
                                                    value={formData.metrics.db_load}
                                                    onChange={(e) => setFormData({...formData, metrics: {...formData.metrics, db_load: e.target.value}})}
                                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-lg py-2 px-3 text-xs font-black text-emerald-950"
                                                />
                                            </div>
                                        </div>

                                        {/* Tech Stack */}
                                        <div className="space-y-2">
                                            <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Tech Stack (Press Enter)</label>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {formData.tech_stack.map(tech => (
                                                    <span key={tech} className="bg-emerald-50 text-emerald-900 text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-2 border border-emerald-900/5">
                                                        {tech} <button type="button" onClick={() => removeTech(tech)} className="hover:text-rose-600"><Trash2 size={10} /></button>
                                                    </span>
                                                ))}
                                            </div>
                                            <input 
                                                type="text"
                                                value={techInput}
                                                onChange={(e) => setTechInput(e.target.value)}
                                                onKeyDown={addTech}
                                                className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none"
                                            />
                                        </div>

                                        {/* Feature Toggle */}
                                        <div className="flex items-center justify-between bg-emerald-50/50 p-4 rounded-2xl border border-emerald-900/5">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${formData.is_featured ? 'bg-emerald-900 text-white' : 'bg-white text-emerald-900'}`}>
                                                    <BarChart3 size={16} />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black text-emerald-950 uppercase">Feature in Starting 3</p>
                                                    <p className="text-[8px] font-bold text-emerald-800/40 uppercase">Display on primary dashboard tabs</p>
                                                </div>
                                            </div>
                                            <button 
                                                type="button"
                                                onClick={() => setFormData({...formData, is_featured: !formData.is_featured})}
                                                className={`w-12 h-6 rounded-full transition-all relative ${formData.is_featured ? 'bg-emerald-900' : 'bg-gray-200'}`}
                                            >
                                                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.is_featured ? 'right-1' : 'left-1'}`} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-emerald-900/5">
                                        {successMsg && (
                                            <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-2 animate-pulse">
                                                <CheckCircle2 size={14} /> {successMsg}
                                            </span>
                                        )}
                                        <button 
                                            type="submit"
                                            disabled={saving}
                                            className="ml-auto bg-emerald-900 text-white rounded-xl px-8 py-4 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-950 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20"
                                        >
                                            {saving ? <Loader2 className="animate-spin" size={14} /> : <><Save size={14} /> Confirm Tactics</>}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const Edit2 = ({ size, className }) => <span className={className}><Plus size={size} /></span>; // Placeholder if Edit2 not imported correctly, actually it is imported from lucide-react

export default ProjectsManager;
