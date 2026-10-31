import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CaseStudyPlaceholderPage } from './pages/CaseStudyPlaceholderPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
};

export default App;

