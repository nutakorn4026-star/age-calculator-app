import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Premium design tokens and styles using pure CSS variables
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  .age-calc-wrapper {
    --bg-color: #000000;
    --text-color: #ffffff;
    --card-bg: rgba(10, 10, 10, 0.75);
    --border-color: rgba(255, 255, 255, 0.08);
    --grid-color: rgba(255, 255, 255, 0.05);
    --grid-line-color: rgba(255, 255, 255, 0.02);
    --accent-color: #ffffff;
    --accent-glow: rgba(255, 255, 255, 0.15);
    --dropdown-bg: #0d0d0d;
    --dropdown-hover: rgba(255, 255, 255, 0.06);
    --shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px 0 rgba(255, 255, 255, 0.02);
    --input-bg: rgba(255, 255, 255, 0.03);
    --text-muted: rgba(255, 255, 255, 0.5);

    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    position: relative;
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
  }

  .age-calc-wrapper.light {
    --bg-color: #f8fafc;
    --text-color: #0f172a;
    --card-bg: rgba(255, 255, 255, 0.8);
    --border-color: rgba(15, 23, 42, 0.08);
    --grid-color: rgba(0, 0, 0, 0.05);
    --grid-line-color: rgba(0, 0, 0, 0.015);
    --accent-color: #000000;
    --accent-glow: rgba(0, 0, 0, 0.08);
    --dropdown-bg: #ffffff;
    --dropdown-hover: rgba(0, 0, 0, 0.04);
    --shadow: 0 30px 60px -15px rgba(15, 23, 42, 0.1), 0 0 50px 0 rgba(0, 0, 0, 0.02);
    --input-bg: rgba(0, 0, 0, 0.02);
    --text-muted: rgba(15, 23, 42, 0.5);
  }

  .grid-background-svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .calculator-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 480px;
    padding: 3rem;
    border-radius: 28px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    transition: background-color 0.5s, border-color 0.5s, box-shadow 0.5s;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-title {
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .theme-toggle {
    background: none;
    border: 1px solid var(--border-color);
    color: var(--text-color);
    padding: 0.625rem;
    border-radius: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s, border-color 0.2s, transform 0.2s;
  }

  .theme-toggle:hover {
    background-color: var(--dropdown-hover);
    border-color: var(--text-color);
    transform: translateY(-1px);
  }

  .theme-toggle:active {
    transform: translateY(0);
  }

  .dropdowns-grid {
    display: grid;
    grid-template-columns: 1fr 1.3fr 1.1fr;
    gap: 0.875rem;
  }

  @media (max-width: 480px) {
    .dropdowns-grid {
      grid-template-columns: 1fr;
      gap: 1.25rem;
    }
    .calculator-card {
      padding: 2rem 1.5rem;
      margin: 1.25rem;
      gap: 2rem;
    }
  }

  .custom-dropdown-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
  }

  .dropdown-label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
  }

  .dropdown-trigger {
    background: var(--input-bg);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 0.9rem 1.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.95rem;
    transition: border-color 0.2s, box-shadow 0.2s, background-color 0.2s;
    user-select: none;
  }

  .dropdown-trigger:hover {
    border-color: var(--text-color);
    background: var(--dropdown-hover);
  }

  .dropdown-trigger.active {
    border-color: var(--text-color);
    box-shadow: 0 0 0 3px var(--accent-glow);
  }

  .chevron-icon {
    display: flex;
    align-items: center;
    opacity: 0.6;
    transition: transform 0.2s;
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    width: 100%;
    max-height: 200px;
    background: var(--dropdown-bg);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
    z-index: 100;
    overflow-y: auto;
    padding: 0.375rem;
    list-style: none;
    margin: 0;
    backdrop-filter: blur(10px);
  }

  /* Scrollbar design */
  .dropdown-menu::-webkit-scrollbar {
    width: 6px;
  }
  .dropdown-menu::-webkit-scrollbar-track {
    background: transparent;
  }
  .dropdown-menu::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 10px;
  }
  .dropdown-menu::-webkit-scrollbar-thumb:hover {
    background: var(--text-muted);
  }

  .dropdown-item {
    padding: 0.625rem 0.875rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: background-color 0.15s, color 0.15s;
    color: var(--text-color);
  }

  .dropdown-item:hover {
    background-color: var(--dropdown-hover);
  }

  .dropdown-item.selected {
    background-color: var(--text-color);
    color: var(--bg-color);
  }

  .divider {
    height: 1px;
    background: var(--border-color);
  }

  .results-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .result-row {
    display: flex;
    align-items: baseline;
    gap: 0.625rem;
    font-size: 2.75rem;
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .result-number-wrapper {
    display: inline-flex;
    position: relative;
    color: var(--text-color);
    min-width: 1.5ch;
  }

  .result-label {
    color: var(--text-muted);
    font-weight: 600;
    font-size: 2rem;
    letter-spacing: -0.02em;
  }

  .empty-state {
    text-align: center;
    padding: 1.5rem 0;
    font-size: 0.95rem;
    color: var(--text-muted);
    font-weight: 500;
    line-height: 1.5;
  }

  .error-message {
    color: #ef4444;
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
  }
`;

// Dropdown Helper Component with Framer Motion animations
const CustomDropdown = ({ label, value, options, onChange, placeholder, activeDropdown, setActiveDropdown }) => {
  const isOpen = activeDropdown === label;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isOpen) setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, label, setActiveDropdown]);

  const toggleDropdown = () => {
    if (isOpen) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <label className="dropdown-label">{label}</label>
      <div 
        className={`dropdown-trigger ${isOpen ? 'active' : ''}`} 
        onClick={toggleDropdown}
      >
        <span>{value ? options.find(o => o.value === value)?.label || value : placeholder}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="chevron-icon"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="dropdown-menu"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className={`dropdown-item ${value === option.value ? 'selected' : ''}`}
                onClick={() => {
                  onChange(option.value);
                  setActiveDropdown(null);
                }}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AgeCalculator() {
  const [theme, setTheme] = useState('dark');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState(null);
  const [error, setError] = useState('');
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Inject styles to head on mount
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Recalculate age when inputs change
  useEffect(() => {
    if (day && month && year) {
      calculateAge();
    } else {
      setAge(null);
      setError('');
    }
  }, [day, month, year]);

  // Adjust day option if month/year change results in invalid dates (e.g. Feb 31 -> Feb 29)
  useEffect(() => {
    if (day && month) {
      const maxDays = getDaysInMonth(month, year);
      if (day > maxDays) {
        setDay(maxDays);
      }
    }
  }, [month, year, day]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getDaysInMonth = (m, y) => {
    // 0 day of next month yields last day of current month
    return new Date(y || 2000, m, 0).getDate();
  };

  const calculateAge = () => {
    const d = parseInt(day, 10);
    const m = parseInt(month, 10) - 1; // Months are 0-indexed in Date objects
    const y = parseInt(year, 10);

    const birthDate = new Date(y, m, d);
    const today = new Date();

    // Reset hour fields to compare only exact dates
    today.setHours(0, 0, 0, 0);
    birthDate.setHours(0, 0, 0, 0);

    if (birthDate > today) {
      setError('Date cannot be in the future');
      setAge(null);
      return;
    }

    setError('');

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    setAge({ years, months, days });
  };

  // Generate Dropdown Options
  const monthsList = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const daysInMonth = getDaysInMonth(month || 1, year);
  const daysList = Array.from({ length: daysInMonth }, (_, idx) => ({
    value: idx + 1,
    label: String(idx + 1).padStart(2, '0')
  }));

  const currentYear = new Date().getFullYear();
  const yearsList = Array.from({ length: 150 }, (_, idx) => ({
    value: currentYear - idx,
    label: String(currentYear - idx)
  }));

  return (
    <div className={`age-calc-wrapper ${theme}`}>
      {/* Grid background SVG */}
      <div className="grid-background-svg">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--grid-color)" strokeWidth="1" />
            </pattern>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--text-color)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--bg-color)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#glow)" />
        </svg>
      </div>

      <div className="calculator-card">
        <div className="card-header">
          <div className="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>Age Calculator</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.svg
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </motion.svg>
              ) : (
                <motion.svg
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="dropdowns-grid">
          <CustomDropdown
            label="Day"
            value={day}
            options={daysList}
            onChange={setDay}
            placeholder="DD"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <CustomDropdown
            label="Month"
            value={month}
            options={monthsList}
            onChange={setMonth}
            placeholder="Month"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
          <CustomDropdown
            label="Year"
            value={year}
            options={yearsList}
            onChange={setYear}
            placeholder="YYYY"
            activeDropdown={activeDropdown}
            setActiveDropdown={setActiveDropdown}
          />
        </div>

        {error && (
          <div className="error-message">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {error}
          </div>
        )}

        <div className="divider"></div>

        <div className="results-container">
          {age ? (
            <>
              <div className="result-row">
                <span className="result-number-wrapper">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={age.years}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 150, damping: 14 }}
                    >
                      {age.years}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="result-label">years</span>
              </div>
              
              <div className="result-row">
                <span className="result-number-wrapper">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={age.months}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 150, damping: 14 }}
                    >
                      {age.months}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="result-label">months</span>
              </div>

              <div className="result-row">
                <span className="result-number-wrapper">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={age.days}
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -15, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 150, damping: 14 }}
                    >
                      {age.days}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="result-label">days</span>
              </div>
            </>
          ) : (
            <div className="empty-state">
              Select your birth date details above to<br />calculate your exact age in real-time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
