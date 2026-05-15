import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import TrainingGround from './pages/TrainingGround';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center overflow-hidden">
        <div className="relative text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-[3px] bg-red-700 shadow-[0_0_15px_rgba(185,28,28,0.4)] mb-6 mx-auto"
            style={{ maxWidth: "300px" }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-emerald-900 font-mono font-bold tracking-[0.3em] uppercase text-xl"
          >
            Entering Stadium...
          </motion.h1>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training-ground" element={<TrainingGround />} />
      </Routes>
    </Router>
  );
}