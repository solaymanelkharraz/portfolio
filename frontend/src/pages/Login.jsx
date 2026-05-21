import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('https://portfolio-lrul.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('auth_token', data.access_token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            setError('Connection error. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center p-6 font-mono">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-[2rem] border border-emerald-900/10 shadow-2xl overflow-hidden"
            >
                <div className="p-8 md:p-12">
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-emerald-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <Shield size={32} />
                        </div>
                    </div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-emerald-950 uppercase tracking-tighter mb-2">Control Room</h1>
                        <p className="text-emerald-800/60 text-xs font-bold uppercase tracking-widest">Tactical Authentication Required</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-bold mb-6 flex items-center gap-3"
                        >
                            <Lock size={14} /> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest mb-2 ml-1">Secure Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30" size={18} />
                                <input 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-4 pl-12 pr-4 text-emerald-950 placeholder-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all font-bold"
                                    placeholder="admin@tactical.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-bold text-emerald-900 uppercase tracking-widest mb-2 ml-1">Access Code</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-900/30" size={18} />
                                <input 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#F8F9FA] border border-emerald-900/5 rounded-xl py-4 pl-12 pr-4 text-emerald-950 placeholder-emerald-900/20 focus:outline-none focus:ring-2 focus:ring-emerald-900/10 transition-all font-bold"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-900 text-white rounded-xl py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-emerald-950 transition-all shadow-lg hover:shadow-emerald-900/20 disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <>Initiate Login <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>
                </div>

                <div className="bg-[#F8F9FA] p-6 text-center border-t border-emerald-900/5">
                    <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-[0.2em]">Restricted Access Area</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
