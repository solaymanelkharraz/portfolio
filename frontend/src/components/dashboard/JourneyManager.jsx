import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, Layout, AlignLeft, AlignRight, Save, X, History, TrendingUp } from 'lucide-react';

const JourneyManager = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        year: '',
        title: '',
        description: '',
        side: 'left'
    });

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('https://portfolio-lrul.onrender.com/api/journey');
            const data = await res.json();
            setEvents(data);
        } catch (err) {
            console.error('Fetch failed:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('auth_token');
        const url = editingEvent 
            ? `https://portfolio-lrul.onrender.com/api/journey/${editingEvent.id}` 
            : 'https://portfolio-lrul.onrender.com/api/journey';
        const method = editingEvent ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                fetchEvents();
                resetForm();
            }
        } catch (err) {
            console.error('Submit failed:', err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Erase this milestone from history?')) return;
        const token = localStorage.getItem('auth_token');

        try {
            const res = await fetch(`https://portfolio-lrul.onrender.com/api/journey/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (res.ok) fetchEvents();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    const handleEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            year: event.year,
            title: event.title,
            description: event.description,
            side: event.side
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setEditingEvent(null);
        setFormData({ year: '', title: '', description: '', side: 'left' });
        setShowForm(false);
    };

    if (loading) return <div className="flex justify-center p-20 font-mono text-emerald-800 animate-pulse">[ ANALYZING CAREER DATA... ]</div>;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end border-b-4 border-emerald-900/10 pb-6">
                <div>
                    <h2 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter">Career Journey Manager</h2>
                    <p className="text-red-700 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Timeline Archives & Professional Milestones.</p>
                </div>
                <button 
                    onClick={() => setShowForm(true)}
                    className="bg-emerald-900 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-950 transition-all shadow-lg"
                >
                    <Plus size={16} /> Add Milestone
                </button>
            </div>

            <AnimatePresence>
                {showForm && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border-2 border-emerald-900/10 rounded-[2.5rem] p-8 overflow-hidden shadow-xl"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-black text-emerald-950 uppercase tracking-tight">
                                {editingEvent ? 'Edit Milestone' : 'New Milestone Archive'}
                            </h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-red-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Milestone Year</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/20" size={18} />
                                        <input 
                                            type="text" 
                                            value={formData.year}
                                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                                            className="w-full bg-[#F8F9FA] border border-emerald-900/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-4 focus:ring-emerald-900/5 transition-all"
                                            placeholder="e.g. 2026"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Event Headline</label>
                                    <div className="relative">
                                        <History className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/20" size={18} />
                                        <input 
                                            type="text" 
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full bg-[#F8F9FA] border border-emerald-900/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-4 focus:ring-emerald-900/5 transition-all"
                                            placeholder="e.g. First Professional Signing"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Tactical Alignment</label>
                                    <div className="flex gap-4">
                                        <button 
                                            type="button"
                                            onClick={() => setFormData({...formData, side: 'left'})}
                                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border ${formData.side === 'left' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white text-emerald-900 border-emerald-900/10 hover:border-emerald-900/40'}`}
                                        >
                                            <AlignLeft size={16} /> Left Wing
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => setFormData({...formData, side: 'right'})}
                                            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-[10px] uppercase tracking-widest transition-all border ${formData.side === 'right' ? 'bg-emerald-900 text-white border-emerald-900 shadow-md' : 'bg-white text-emerald-900 border-emerald-900/10 hover:border-emerald-900/40'}`}
                                        >
                                            <AlignRight size={16} /> Right Wing
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Match Report (Description)</label>
                                    <textarea 
                                        rows="8"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                        className="w-full bg-[#F8F9FA] border border-emerald-900/10 rounded-2xl p-6 text-sm font-medium text-emerald-950 focus:outline-none focus:ring-4 focus:ring-emerald-900/5 transition-all resize-none"
                                        placeholder="Detailed breakdown of this career phase..."
                                        required
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    className="w-full bg-emerald-900 text-white font-black text-[10px] uppercase tracking-[0.2em] py-5 rounded-2xl hover:bg-emerald-950 transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    <Save size={18} /> {editingEvent ? 'Update Record' : 'Save Milestone'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-6">
                {events.map((event, i) => (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={event.id}
                        className="bg-white border border-emerald-900/10 rounded-3xl p-6 md:p-8 flex items-center gap-8 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="w-24 h-24 bg-emerald-50 rounded-2xl flex flex-col items-center justify-center text-emerald-900 shadow-inner shrink-0">
                            <span className="text-[10px] font-black opacity-40 uppercase tracking-tighter">Season</span>
                            <span className="text-2xl font-black tracking-tighter">{event.year}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-xl font-black text-emerald-950 uppercase truncate tracking-tight">{event.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${event.side === 'left' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'}`}>
                                    {event.side} Wing
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm line-clamp-1 italic">{event.description}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => handleEdit(event)}
                                className="w-12 h-12 bg-[#F8F9FA] text-emerald-900 rounded-xl flex items-center justify-center hover:bg-emerald-900 hover:text-white transition-all shadow-sm"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button 
                                onClick={() => handleDelete(event.id)}
                                className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default JourneyManager;
