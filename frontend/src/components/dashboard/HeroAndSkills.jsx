import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, MapPin, AlignLeft, Info, Activity, Edit2, Loader2, CheckCircle, LogOut } from 'lucide-react';

const HeroAndSkills = () => {
    const [hero, setHero] = useState({ name: '', title: '', tactical_position: '', ovr: 99, location: '', bio: '', status: '' });
    const [skills, setSkills] = useState([]);
    const [editingSkillId, setEditingSkillId] = useState(null);
    const [tempSkillName, setTempSkillName] = useState('');
    const [newSkill, setNewSkill] = useState({ name: '', category: 'Midfield' });
    const [loadingHero, setLoadingHero] = useState(true);
    const [loadingSkills, setLoadingSkills] = useState(true);
    const [savingHero, setSavingHero] = useState(false);
    const [savingSkillId, setSavingSkillId] = useState(null);
    const [addingSkill, setAddingSkill] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const token = localStorage.getItem('auth_token');

    const categoryPositions = {
        'Attack': { x: '50%', y: '15%' },
        'Midfield': { x: '50%', y: '35%' },
        'Defense': { x: '50%', y: '70%' },
        'GK': { x: '50%', y: '88%' }
    };

    useEffect(() => {
        fetchHero();
        fetchSkills();
    }, []);

    const fetchHero = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/hero');
            const data = await res.json();
            if (data) setHero(data);
        } catch (err) { console.error(err); }
        setLoadingHero(false);
    };

    const fetchSkills = async () => {
        try {
            const res = await fetch('http://127.0.0.1:8000/api/skills');
            const data = await res.json();
            setSkills(data);
        } catch (err) { console.error(err); }
        setLoadingSkills(false);
    };

    const handleHeroSubmit = async (e) => {
        e.preventDefault();
        setSavingHero(true);
        try {
            const res = await fetch('http://127.0.0.1:8000/api/hero', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(hero)
            });
            if (res.ok) {
                setSuccessMsg('Tactical profile synchronized!');
                setTimeout(() => setSuccessMsg(''), 3000);
            }
        } catch (err) { console.error(err); }
        setSavingHero(false);
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.name) return;
        setAddingSkill(true);
        const pos = categoryPositions[newSkill.category] || { x: '50%', y: '50%' };
        try {
            const res = await fetch('http://127.0.0.1:8000/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...newSkill, position_x: pos.x, position_y: pos.y })
            });
            if (res.ok) {
                const data = await res.json();
                setSkills([...skills, data]);
                setNewSkill({ name: '', category: 'Midfield' });
            }
        } catch (err) { console.error(err); }
        setAddingSkill(false);
    };

    const handleSkillUpdate = async (skillId, fields) => {
        setSavingSkillId(skillId);
        const skill = skills.find(s => s.id === skillId);
        const updatedSkill = { ...skill, ...fields };
        
        if (fields.category) {
            const pos = categoryPositions[fields.category];
            updatedSkill.position_x = pos.x;
            updatedSkill.position_y = pos.y;
        }

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/skills/${skillId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedSkill)
            });
            if (res.ok) {
                const data = await res.json();
                setSkills(skills.map(s => s.id === skillId ? data : s));
                setEditingSkillId(null);
            }
        } catch (err) { console.error(err); }
        setSavingSkillId(null);
    };

    const handleDeleteSkill = async (skillId) => {
        if (!window.confirm('Release this player from the squad?')) return;
        setSavingSkillId(skillId);
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/skills/${skillId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setSkills(skills.filter(s => s.id !== skillId));
            }
        } catch (err) { console.error(err); }
        setSavingSkillId(null);
    };

    return (
        <div className="space-y-12 pb-20">
            {/* Tactical Identity Management */}
            <section className="bg-white rounded-[2rem] border border-emerald-900/10 p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center">
                            <User size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-emerald-950 uppercase tracking-tight">Tactical Identity</h2>
                            <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Player Card & Global Stats</p>
                        </div>
                    </div>
                </div>

                {loadingHero ? (
                    <div className="flex justify-center p-12"><Loader2 className="animate-spin text-emerald-900" /></div>
                ) : (
                    <form onSubmit={handleHeroSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Full Name</label>
                                <input 
                                    type="text"
                                    value={hero.name}
                                    onChange={(e) => setHero({...hero, name: e.target.value})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Professional Title (e.g. Full-Stack Playmaker)</label>
                                <input 
                                    type="text"
                                    value={hero.title}
                                    onChange={(e) => setHero({...hero, title: e.target.value})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Role Badge (e.g. ST, CAM)</label>
                                <input 
                                    type="text"
                                    maxLength="3"
                                    value={hero.role_badge || ''}
                                    onChange={(e) => setHero({...hero, role_badge: e.target.value.toUpperCase()})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">OVR Rating (1-99)</label>
                                <input 
                                    type="number"
                                    min="1" max="99"
                                    value={hero.ovr || 99}
                                    onChange={(e) => setHero({...hero, ovr: parseInt(e.target.value)})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Base Location</label>
                                <input 
                                    type="text"
                                    value={hero.location}
                                    onChange={(e) => setHero({...hero, location: e.target.value})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Status</label>
                                <input 
                                    type="text"
                                    value={hero.status}
                                    onChange={(e) => setHero({...hero, status: e.target.value})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Tactical Position (e.g. Playmaker)</label>
                                <input 
                                    type="text"
                                    value={hero.tactical_position || ''}
                                    onChange={(e) => setHero({...hero, tactical_position: e.target.value})}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Style of Play</label>
                            <textarea 
                                value={hero.style_of_play || ''}
                                onChange={(e) => setHero({...hero, style_of_play: e.target.value})}
                                rows="2"
                                className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest ml-1">Mission (Bio)</label>
                            <textarea 
                                value={hero.bio}
                                onChange={(e) => setHero({...hero, bio: e.target.value})}
                                rows="2"
                                className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                            />
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            {successMsg && (
                                <span className="text-[10px] font-bold text-emerald-600 uppercase flex items-center gap-2 animate-pulse">
                                    <CheckCircle size={14} /> {successMsg}
                                </span>
                            )}
                            <button 
                                type="submit"
                                disabled={savingHero}
                                className="ml-auto bg-emerald-900 text-white rounded-xl px-8 py-3 text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-emerald-950 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20"
                            >
                                {savingHero ? <Loader2 className="animate-spin" size={14} /> : <><Save size={14} /> Synchronize Identity</>}
                            </button>
                        </div>
                    </form>
                )}
            </section>

            {/* Squad Management */}
            <section className="bg-white rounded-[2rem] border border-emerald-900/10 p-8 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-center">
                            <Activity size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-emerald-950 uppercase tracking-tight">Squad Management</h2>
                            <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Starting XI vs Substitutes</p>
                        </div>
                    </div>

                    <form onSubmit={handleAddSkill} className="flex items-center gap-2 bg-[#F8F9FA] p-2 rounded-2xl border border-emerald-900/5 shadow-inner">
                        <input 
                            type="text"
                            placeholder="Add New Skill..."
                            value={newSkill.name}
                            onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                            className="bg-white border-none rounded-xl py-2 px-4 text-xs font-bold text-emerald-950 focus:ring-0 w-48"
                        />
                        <button 
                            type="submit"
                            disabled={addingSkill || !newSkill.name}
                            className="bg-emerald-900 text-white px-4 py-2 rounded-xl hover:bg-emerald-950 transition-all disabled:opacity-50 shadow-md text-[10px] font-black uppercase"
                        >
                            {addingSkill ? <Loader2 className="animate-spin" size={14} /> : 'Add Player'}
                        </button>
                    </form>
                </div>

                {loadingSkills ? (
                    <div className="flex justify-center p-12"><Loader2 className="animate-spin text-emerald-900" /></div>
                ) : (
                    <div className="space-y-12">
                        {/* Starting XI */}
                        <div>
                            <h3 className="text-xs font-black text-emerald-900 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Starting XI (On Pitch)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {skills.filter(s => s.is_starter).map(skill => (
                                    <SkillCard 
                                        key={skill.id} 
                                        skill={skill} 
                                        onUpdate={handleSkillUpdate} 
                                        onDelete={handleDeleteSkill}
                                        savingId={savingSkillId}
                                    />
                                ))}
                                {skills.filter(s => s.is_starter).length === 0 && (
                                    <div className="col-span-full border-2 border-dashed border-emerald-900/5 rounded-[2rem] p-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        No players assigned to the pitch.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Substitutes */}
                        <div className="pt-8 border-t border-emerald-900/5">
                            <h3 className="text-xs font-black text-emerald-900/40 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <div className="w-2 h-2 bg-gray-300 rounded-full" /> Substitutes Bench
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {skills.filter(s => !s.is_starter).map(skill => (
                                    <SkillCard 
                                        key={skill.id} 
                                        skill={skill} 
                                        onUpdate={handleSkillUpdate} 
                                        onDelete={handleDeleteSkill}
                                        savingId={savingSkillId}
                                    />
                                ))}
                                {skills.filter(s => !s.is_starter).length === 0 && (
                                    <div className="col-span-full border-2 border-dashed border-emerald-900/5 rounded-[2rem] p-8 text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        No substitutes on the bench.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    );
};

const SkillCard = ({ skill, onUpdate, onDelete, savingId }) => {
    const [name, setName] = useState(skill.name);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        setName(skill.name);
        setHasChanged(false);
    }, [skill]);

    const handleSave = () => {
        if (name !== skill.name) {
            onUpdate(skill.id, { name });
        }
    };

    return (
        <div className={`p-6 rounded-[2rem] border transition-all group relative shadow-sm ${skill.is_starter ? 'bg-white border-emerald-900/10' : 'bg-gray-50 border-gray-100 opacity-80'}`}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex flex-wrap items-center gap-2">
                    <button 
                        onClick={() => onUpdate(skill.id, { is_starter: !skill.is_starter })}
                        className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all shadow-sm ${
                            skill.is_starter ? 'bg-emerald-900 text-white' : 'bg-white border border-gray-200 text-gray-400'
                        }`}
                    >
                        {skill.is_starter ? 'Starter' : 'Bench'}
                    </button>
                    
                    {skill.is_starter && (
                        <select 
                            value={skill.position_code || ''}
                            onChange={(e) => onUpdate(skill.id, { position_code: e.target.value })}
                            className="bg-[#F8F9FA] border border-emerald-900/5 rounded-full px-3 py-1.5 text-[9px] font-black text-blue-700 uppercase tracking-widest focus:ring-0 cursor-pointer shadow-inner"
                        >
                            <option value="">POS</option>
                            <option value="ST">ST</option>
                            <option value="LW">LW</option>
                            <option value="RW">RW</option>
                            <option value="CAM">CAM</option>
                            <option value="CM">CM</option>
                            <option value="LCM">LCM</option>
                            <option value="RCM">RCM</option>
                            <option value="CDM">CDM</option>
                            <option value="LDM">LDM</option>
                            <option value="RDM">RDM</option>
                            <option value="LB">LB</option>
                            <option value="RB">RB</option>
                            <option value="CB">CB</option>
                            <option value="LCB">LCB</option>
                            <option value="RCB">RCB</option>
                            <option value="GK">GK</option>
                        </select>
                    )}

                    <select 
                        value={skill.category}
                        onChange={(e) => onUpdate(skill.id, { category: e.target.value })}
                        className="bg-[#F8F9FA] border border-emerald-900/5 rounded-full px-3 py-1.5 text-[9px] font-black text-red-700 uppercase tracking-widest focus:ring-0 cursor-pointer shadow-inner"
                    >
                        <option value="Attack">Attack</option>
                        <option value="Midfield">Midfield</option>
                        <option value="Defense">Defense</option>
                        <option value="GK">GK</option>
                    </select>
                </div>
                <button 
                    onClick={() => onDelete(skill.id)}
                    className="text-gray-300 hover:text-rose-600 transition-colors p-1"
                    title="Release Player"
                >
                    <LogOut size={16} className="rotate-180" />
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="relative group">
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setHasChanged(true);
                        }}
                        onBlur={handleSave}
                        placeholder="Skill Name"
                        className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-3 px-4 text-sm font-bold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all shadow-inner"
                    />
                    {hasChanged && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <button 
                                onClick={handleSave}
                                className="bg-emerald-900 text-white p-1.5 rounded-lg shadow-md animate-bounce"
                            >
                                {savingId === skill.id ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    {skill.is_starter ? `Assigned Position: ${skill.position_code || 'None'}` : 'Positioning: Fixed on bench'}
                </p>
            </div>
        </div>
    );
};

export default HeroAndSkills;
