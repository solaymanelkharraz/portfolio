import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Building2, Briefcase, MessageSquare, Calendar, Trash2, ShieldAlert, FileSignature } from 'lucide-react';

const BidLogs = () => {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const token = localStorage.getItem('auth_token');
                const res = await fetch('https://portfolio-lrul.onrender.com/api/bids', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                });
                if (!res.ok) throw new Error('Failed to fetch bids');
                const data = await res.json();
                setBids(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBids();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Terminate this negotiation record?')) return;
        
        try {
            const token = localStorage.getItem('auth_token');
            const res = await fetch(`https://portfolio-lrul.onrender.com/api/bids/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (res.ok) {
                setBids(bids.filter(b => b.id !== id));
            }
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    if (loading) return <div className="flex justify-center p-20 font-mono text-emerald-800 animate-pulse">[ SCANNING INCOMING BIDS... ]</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-end border-b-4 border-emerald-900/10 pb-6">
                <div>
                    <h2 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter">Transfer Window Logs</h2>
                    <p className="text-red-700 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Incoming Contract Negotiations & Official Bids.</p>
                </div>
                <div className="bg-emerald-900 text-white px-4 py-2 rounded-lg font-mono text-xs font-bold shadow-lg">
                    TOTAL BIDS: {bids.length}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3">
                    <ShieldAlert size={20} />
                    <span className="font-bold text-sm">{error}</span>
                </div>
            )}

            <div className="grid gap-6">
                {bids.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-emerald-900/10">
                        <FileSignature className="mx-auto text-emerald-900/10 mb-6" size={48} />
                        <h3 className="text-xl font-black text-emerald-950 uppercase">The Window is Quiet</h3>
                        <p className="text-gray-400 text-sm font-mono mt-2 uppercase tracking-widest">No official bids recorded in the database yet.</p>
                    </div>
                ) : (
                    bids.map((bid, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            key={bid.id}
                            className="bg-white border border-emerald-900/10 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-900"></div>
                            
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-6">
                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-900 shadow-inner">
                                                <Building2 size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Contracting Club</p>
                                                <h4 className="text-lg font-black text-emerald-950 uppercase leading-none">{bid.company}</h4>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-700 shadow-inner">
                                                <Mail size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Agent Email</p>
                                                <p className="text-sm font-bold text-emerald-900">{bid.email}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-700 shadow-inner">
                                                <Briefcase size={18} />
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Proposed Deal</p>
                                                <span className="text-[10px] font-black px-3 py-1 bg-blue-100 text-blue-900 rounded-full uppercase tracking-tight whitespace-nowrap">
                                                    {bid.deal_type}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#F8F9FA] p-6 rounded-2xl border border-emerald-900/5 relative group">
                                        <div className="absolute top-4 right-6 text-emerald-900/10">
                                            <MessageSquare size={32} />
                                        </div>
                                        <p className="text-[8px] font-black text-emerald-900/40 uppercase tracking-widest mb-3">Official Terms</p>
                                        <p className="text-sm text-gray-600 leading-relaxed italic">"{bid.message}"</p>
                                    </div>
                                </div>

                                <div className="md:w-48 flex flex-col justify-between items-end">
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                            <Calendar size={12} /> Date Logged
                                        </div>
                                        <p className="text-xs font-bold text-emerald-950">
                                            {new Date(bid.created_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handleDelete(bid.id)}
                                        className="mt-6 flex items-center gap-2 text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                    >
                                        <Trash2 size={14} /> Terminate Record
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BidLogs;
