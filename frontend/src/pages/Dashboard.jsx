import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import HeroAndSkills from '../components/dashboard/HeroAndSkills';
import ProjectsManager from '../components/dashboard/ProjectsManager';
import BidLogs from '../components/dashboard/BidLogs';
import JourneyManager from '../components/dashboard/JourneyManager';

const Overview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-emerald-900 text-white p-8 rounded-[2rem] shadow-lg">
            <h3 className="text-xs font-black uppercase tracking-widest mb-2 opacity-60">System Health</h3>
            <p className="text-3xl font-black mb-4 tracking-tighter">OPTIMAL</p>
            <div className="h-1 bg-emerald-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 w-[95%]"></div>
            </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-emerald-900/10 shadow-sm">
            <h3 className="text-xs font-black text-emerald-900/40 uppercase tracking-widest mb-2">Active Squad</h3>
            <p className="text-3xl font-black text-emerald-950 mb-4 tracking-tighter">11 PLAYERS</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">STARTING XI READY</span>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-emerald-900/10 shadow-sm">
            <h3 className="text-xs font-black text-emerald-900/40 uppercase tracking-widest mb-2">Pending Bids</h3>
            <p className="text-3xl font-black text-emerald-950 mb-4 tracking-tighter">0 OFFERS</p>
            <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">WINDOW OPEN</span>
        </div>
    </div>
);



const Dashboard = () => {
    return (
        <DashboardLayout>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/hero-squad" element={<HeroAndSkills />} />
                <Route path="/projects" element={<ProjectsManager />} />
                <Route path="/bids" element={<BidLogs />} />
                <Route path="/journey" element={<JourneyManager />} />
            </Routes>
        </DashboardLayout>
    );
};

export default Dashboard;
