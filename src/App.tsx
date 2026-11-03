import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CaseStudyPlaceholderPage } from './pages/CaseStudyPlaceholderPage';
import { AlumatesCaseStudyPage } from './pages/AlumatesCaseStudyPage';
import { BalanceSpotCaseStudyPage } from './pages/BalanceSpotCaseStudyPage';
import { ScheduleCallModal } from './components/ScheduleCallModal';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const isDedicatedCaseStudy =
    location.pathname === '/work/alumates-pro' ||
    location.pathname === '/work/balancespot-gym-manager' ||
    location.pathname === '/work/balanceport-gym-manager';

  if (isDedicatedCaseStudy) {
    return (
      <Routes>
        <Route path="/work/alumates-pro" element={<AlumatesCaseStudyPage />} />
        <Route path="/work/balancespot-gym-manager" element={<BalanceSpotCaseStudyPage />} />
        <Route path="/work/balanceport-gym-manager" element={<BalanceSpotCaseStudyPage />} />
      </Routes>
    );
  }

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-electric-blue selection:text-on-primary">
      <Navbar />
      <main className="w-full pt-14 bg-surface flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPlaceholderPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
      <ScheduleCallModal />
    </BrowserRouter>
  );
};

export default App;
