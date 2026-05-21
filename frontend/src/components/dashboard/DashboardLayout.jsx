import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, User, FolderKanban, Briefcase, LogOut, ShieldCheck, ChevronRight, TrendingUp, Settings } from 'lucide-react';

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'Hero & Squad', icon: User, path: '/dashboard/hero-squad' },
        { name: 'Match Highlights', icon: FolderKanban, path: '/dashboard/projects' },
        { name: 'Transfer Window Logs', icon: Briefcase, path: '/dashboard/bids' },
        { name: 'Career Journey', icon: TrendingUp, path: '/dashboard/journey' },
        { name: 'Manager Profile', icon: Settings, path: '/dashboard/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] flex font-mono">
            {/* Sticky Sidebar */}
            <aside className="w-72 bg-white border-r border-emerald-900/10 h-screen sticky top-0 flex flex-col p-8 z-40">
                <div className="flex items-center gap-3 mb-12">
                    <div className="w-10 h-10 bg-emerald-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-sm font-black text-emerald-950 uppercase tracking-tighter">Tactical</h1>
                        <p className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest leading-none">Control Room</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link 
                                key={item.name} 
                                to={item.path}
                                className={`flex items-center justify-between w-full p-4 rounded-2xl transition-all group ${
                                    isActive 
                                    ? 'bg-emerald-900 text-white shadow-lg shadow-emerald-900/20' 
                                    : 'text-emerald-900/40 hover:bg-emerald-50 hover:text-emerald-900'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon size={18} />
                                    <span className="text-xs font-bold uppercase tracking-widest">{item.name}</span>
                                </div>
                                {isActive && <motion.div layoutId="activeArrow"><ChevronRight size={14} /></motion.div>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto pt-8 border-t border-emerald-900/5">
                    <div className="flex items-center gap-3 mb-6 px-2">
                        <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-900 font-bold text-xs">
                            {user.name?.charAt(0) || 'M'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-[10px] font-black text-emerald-950 truncate uppercase">{user.name || 'Manager'}</p>
                            <p className="text-[8px] font-bold text-emerald-800/40 uppercase tracking-tighter">Head of Operations</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 p-4 rounded-2xl text-rose-600 bg-rose-50 border border-rose-100 hover:bg-rose-100 transition-all text-xs font-black uppercase tracking-widest"
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 overflow-x-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
};

export default DashboardLayout;
