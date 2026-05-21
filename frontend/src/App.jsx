import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import TrainingGround from './pages/TrainingGround';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FixtureList from './pages/FixtureList';

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
      <div className="h-screen w-full bg-[#F8F9FA] flex items-center justify-center font-mono">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-emerald-950 font-black text-xl tracking-tighter uppercase"
        >
          [ INITIALIZING TACTICAL BOARD... ]
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training-ground" element={<TrainingGround />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/fixtures" element={<FixtureList />} />
      </Routes>
    </Router>
  );
}