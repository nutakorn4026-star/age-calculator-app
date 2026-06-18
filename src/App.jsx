import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import './App.css';

function AppContent() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  
  const location = useLocation();

  const syncInnerTheme = (targetTheme) => {
    setTimeout(() => {
      const el = document.querySelector('.age-calc-wrapper');
      if (el) {
        const isInnerLight = el.classList.contains('light');
        const targetIsLight = targetTheme === 'light';
        if (isInnerLight !== targetIsLight) {
          const btn = el.querySelector('.theme-toggle');
          if (btn) {
            btn.click();
          }
        }
      }
    }, 50);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    syncInnerTheme(nextTheme);
  };

  useEffect(() => {
    // Sync on page load/navigate
    syncInnerTheme(theme);
    
    // Observer for when inner component's button is clicked
    const observer = new MutationObserver(() => {
      const el = document.querySelector('.age-calc-wrapper');
      if (el) {
        const isInnerLight = el.classList.contains('light');
        const expectedTheme = isInnerLight ? 'light' : 'dark';
        setTheme((prev) => {
          if (prev !== expectedTheme) {
            localStorage.setItem('theme', expectedTheme);
            return expectedTheme;
          }
          return prev;
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [location.pathname, theme]);

  return (
    <div className={`app-container ${theme}`}>
      {/* Grid background SVG */}
      <div className="grid-background-svg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-app" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--grid-color)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow-app" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--text-color)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--bg-color)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-app)" />
          <rect width="100%" height="100%" fill="url(#glow-app)" />
        </svg>
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
