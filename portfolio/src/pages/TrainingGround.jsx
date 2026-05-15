import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Box, Code, ArrowLeft, Trophy, ExternalLink, Blocks, Database, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CloudLabs, DockerLabs, LaravelLabs, ReactLabs, CMSLabs, DatabaseLabs } from '../components/training/LabSections';
import Footer from '../components/Footer';

const TrainingGround = () => {
  const [activeTab, setActiveTab] = useState('laravel');

  const tabs = [
    { id: 'laravel', label: 'Laravel Architect', icon: <Code size={20} />, color: 'text-red-600', bg: 'bg-red-50' },
    { id: 'react', label: 'JS & React', icon: <Blocks size={20} />, color: 'text-sky-600', bg: 'bg-sky-50' },
    { id: 'cloud', label: 'Cloud & Node.js', icon: <Cloud size={20} />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 'docker', label: 'Docker Labs', icon: <Box size={20} />, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'cms', label: 'CMS & E-commerce', icon: <ShoppingBag size={20} />, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 'db', label: 'Databases & Tools', icon: <Database size={20} />, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-emerald-950">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-emerald-900/5 z-50 px-8 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-emerald-900 text-white group-hover:bg-red-700 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-900 group-hover:text-red-700 transition-colors">Back to Stadium</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 border border-emerald-200">
            <Trophy size={14} />
          </div>
          <span className="font-heading font-black text-lg tracking-tighter uppercase">Academic Archive</span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-40 pb-20 px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center md:text-left border-l-8 border-emerald-900 pl-8 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <span className="text-emerald-800 text-[10px] font-bold font-mono tracking-widest uppercase">Academy Dashboard v4.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-emerald-950 mb-4 tracking-tighter font-heading uppercase leading-[0.9]">
            The <br />
            <span className="text-red-700">Training Grounds.</span>
          </h1>
          <p className="text-gray-600 text-xl font-mono max-w-2xl mt-6">
            A comprehensive repository of practical laboratory work, theoretical assignments, and architectural prototypes.
          </p>
        </motion.div>

        {/* Tactical Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-emerald-900/10 pb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-3 px-8 py-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-widest transition-all
                ${activeTab === tab.id 
                  ? `${tab.bg} ${tab.color} border-2 border-current shadow-lg scale-105` 
                  : 'bg-white text-gray-400 border-2 border-transparent hover:border-gray-200'}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Content Area */}
        <main className="relative min-h-[600px]">
          {activeTab === 'laravel' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <a 
                href="https://jbala-peak.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-red-700 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-widest hover:bg-red-800 transition-all shadow-lg"
              >
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Launch Live Production (v3.1) <ExternalLink size={14} />
              </a>
            </motion.div>
          )}
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'cloud' && <CloudLabs />}
              {activeTab === 'docker' && <DockerLabs />}
              {activeTab === 'laravel' && <LaravelLabs />}
              {activeTab === 'react' && <ReactLabs />}
              {activeTab === 'cms' && <CMSLabs />}
              {activeTab === 'db' && <DatabaseLabs />}
            </motion.div>
          </AnimatePresence>
        </main>
      </header>

      <Footer />
    </div>
  );
};

export default TrainingGround;
