import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <p className="copyright">© {currentYear} AgeCalc. สงวนลิขสิทธิ์ทั้งหมด</p>
        </div>
        <div className="footer-links">
          <Link to="/about" className="footer-link">เกี่ยวกับเรา</Link>
          <span className="footer-bullet">•</span>
          <Link to="/privacy-policy" className="footer-link">นโยบายความเป็นส่วนตัว</Link>
        </div>
      </div>
    </footer>
  );
}
