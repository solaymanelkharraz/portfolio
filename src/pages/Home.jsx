import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FloatingDock from '../components/FloatingDock';
import HeroText from '../components/HeroText';
import ProfileImageSwap from '../components/ProfileImageSwap';
import TacticalPitch from '../components/TacticalPitch';
import CareerTimeline from '../components/CareerTimeline';
import ProjectTabs from '../components/ProjectTabs';
import AcademyEntrance from '../components/AcademyEntrance';
import ArchiveModal from '../components/ArchiveModal';
import TransferWindow from '../components/TransferWindow';
import Footer from '../components/Footer';

const Home = () => {
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans bg-[#F8F9FA] text-emerald-950 selection:bg-red-700 selection:text-white relative">
      
      {/* Stadium Spotlight Entrance */}
      <motion.div 
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none z-0 origin-top"
        style={{ clipPath: "polygon(20% 0, 80% 0, 100% 100%, 0% 100%)" }}
      />

      <FloatingDock />

      {/* Logo */}
      <div className="fixed top-8 left-8 z-50 pointer-events-none">
        <span className="font-bold text-2xl tracking-tighter text-emerald-900 font-heading">
          S<span className="text-red-700">.</span>DEV
        </span>
      </div>

      <main className="relative z-10 w-full pt-32 pb-40">
        
        {/* 1. HERO SECTION (The Player Card) */}
        <section id="home" className="max-w-7xl mx-auto px-6 w-full mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-10 w-full"
          >
            <HeroText />
            <div className="w-full lg:w-[45%] flex justify-center lg:justify-end">
              <ProfileImageSwap />
            </div>
          </motion.div>
        </section>

        {/* 2. TACTICAL PITCH SECTION (Starting XI) */}
        <section id="ecosystem" className="max-w-7xl mx-auto px-6 w-full mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="mb-12 text-center md:text-left border-l-4 border-emerald-800 pl-6">
              <h2 className="text-5xl md:text-6xl font-black text-emerald-950 mb-2 tracking-tighter font-heading uppercase">Starting XI</h2>
              <p className="text-red-700 font-mono text-sm tracking-widest uppercase font-bold">The Tactical Board.</p>
            </div>
            <TacticalPitch />
          </motion.div>
        </section>

        {/* 3. MATCH HIGHLIGHTS (Project Selection/Carousel) */}
        <ProjectTabs />

        {/* 4. THE JOURNEY (Career Mode Timeline) */}
        <CareerTimeline />

        {/* 5. THE TRAINING GROUNDS (Academy Entrance) */}
        <AcademyEntrance onOpenArchive={() => setIsArchiveOpen(true)} />

        {/* 6. THE TRANSFER WINDOW (The Official Bid/Contact) */}
        <TransferWindow />
      </main>

      {/* Archive Modal */}
      <ArchiveModal 
        isOpen={isArchiveOpen} 
        onClose={() => setIsArchiveOpen(false)} 
      />

      <Footer />
    </div>
  );
};

export default Home;
