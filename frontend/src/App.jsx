import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TrainingGround from './pages/TrainingGround';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FixtureList from './pages/FixtureList';
import WelcomeGate from './components/WelcomeGate';
import ScoutingModal from './components/ScoutingModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [heroData, setHeroData] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [journeyData, setJourneyData] = useState([]);

  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        const [heroRes, skillsRes, projectsRes, journeyRes] = await Promise.all([
          fetch('https://portfolio-lrul.onrender.com/api/hero').catch(() => console.log('Waiting for backend...')),
          fetch('https://portfolio-lrul.onrender.com/api/skills'),
          fetch('https://portfolio-lrul.onrender.com/api/projects'),
          fetch('https://portfolio-lrul.onrender.com/api/career-events')
        ]);

        if (heroRes && heroRes.ok) setHeroData(await heroRes.json());
        if (skillsRes && skillsRes.ok) setSkillsData(await skillsRes.json());
        if (projectsRes && projectsRes.ok) setProjectsData(await projectsRes.json());
        if (journeyRes && journeyRes.ok) setJourneyData(await journeyRes.json());
      } catch (error) {
        console.error("Backend connection issue", error);
      } finally {
        setLoading(false);
      }
    };

    wakeUpBackend();
  }, []);

  if (!hasEntered) {
    return <WelcomeGate onEnter={() => setHasEntered(true)} />;
  }

  return (
    <>
      {loading && <ScoutingModal />}
      <Router>
        <Routes>
          <Route path="/" element={<Home isLoading={loading} heroData={heroData} skillsData={skillsData} projectsData={projectsData} journeyData={journeyData} />} />
          <Route path="/training-ground" element={<TrainingGround />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/fixtures" element={<FixtureList projectsData={projectsData} />} />
        </Routes>
      </Router>
    </>
  );
}
