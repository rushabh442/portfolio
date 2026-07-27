import React from 'react';
import { Github, Linkedin, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = ({ config = {} }) => {
  const emailVal = config.email || 'hello@rvdigitalstudio.com';
  const phoneVal = config.phone || '+91 12345 67890';
  const locationVal = config.location || 'India';

  return (
    <footer className="footer-container">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="footer-main-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-accent">{config.brand_name || 'RV.'}</span>
              <span style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '600', color: 'var(--text-secondary)' }}>{config.brand_subtitle || 'RV DIGITAL STUDIO'}</span>
            </div>
            <p className="footer-desc">
              Building modern web solutions and AI automations that drive measurable results. Let's create something remarkable.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ width: '36px', height: '36px' }} aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ width: '36px', height: '36px' }} aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" style={{ width: '36px', height: '36px' }} aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={`mailto:${emailVal}`} className="social-icon-btn" style={{ width: '36px', height: '36px' }} aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-column">
            <h4 className="footer-col-title">Quick Links</h4>
            <div className="footer-col-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#services">Services</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          {/* Services Column */}
          <div className="footer-column">
            <h4 className="footer-col-title">Services</h4>
            <div className="footer-col-links">
              <a href="#services">Web Development</a>
              <a href="#services">AI Automation</a>
              <a href="#services">Shopify Development</a>
              <a href="#services">WordPress Development</a>
              <a href="#services">Landing Pages</a>
              <a href="#services">UI/UX Design</a>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="footer-column">
            <h4 className="footer-col-title">Let's Connect</h4>
            <div className="footer-col-links" style={{ gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{emailVal}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{phoneVal}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{locationVal}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                <span className="status-dot" style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 8px #10b981' }}></span> Available for freelance
              </span>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} {config.footer_copyright || 'RV Digital Studio. All rights reserved.'}
          </p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
