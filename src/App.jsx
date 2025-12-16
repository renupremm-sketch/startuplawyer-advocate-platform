import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Drafting from './pages/Drafting';
import SmartDraft from './pages/SmartDraft';
import Research from './pages/Research';
import CaseDiary from './pages/CaseDiary';
import CourtIntel from './pages/CourtIntel';
import Clients from './pages/Clients';
import StudentZone from './pages/StudentZone';
import Ethics from './pages/Ethics';
import Evidence from './pages/Evidence';
import AIConfig from './pages/AIConfig';
import Agreements from './pages/Agreements';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drafting" element={<Drafting />} />
          <Route path="/smart-draft" element={<SmartDraft />} />
          <Route path="/research" element={<Research />} />
          <Route path="/case-diary" element={<CaseDiary />} />
          <Route path="/court-intel" element={<CourtIntel />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/student-zone" element={<StudentZone />} />
          <Route path="/ethics" element={<Ethics />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/ai-config" element={<AIConfig />} />
          <Route path="/agreements" element={<Agreements />} />
          <Route path="*" element={<div style={{ padding: '2rem' }}><h1>404</h1><p>Page not found.</p></div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
