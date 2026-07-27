import React from 'react';
import { ArrowRight, MessageSquare, Github, Linkedin, Instagram, MessageCircle, Mail, Sparkles, Code2 } from 'lucide-react';

const Hero = ({ config = {} }) => {
  const formatHeroTitle = (title) => {
    if (!title) {
      return (
        <>
          I Build Digital <br />
          Experiences That <br />
          <span className="text-gradient">Drive Results.</span>
        </>
      );
    }
    
    const words = title.split(' ');
    if (words.length <= 2) {
      return <span className="text-gradient">{title}</span>;
    }
    
    const normal = words.slice(0, -2).join(' ');
    const gradient = words.slice(-2).join(' ');
    return (
      <>
        {normal} <br />
        <span className="text-gradient">{gradient}</span>
      </>
    );
  };

  return (
    <section id="home" className="hero-section">
      {/* Left side coordinates indicator */}
      <div className="hero-status-aside">
        <span className="status-dot"></span>
        <span>{config.hero_status || 'AVAILABLE FOR FREELANCE'}</span>
      </div>

      <div className="container hero-container">
        {/* Left Side Content */}
        <div className="hero-content reveal-slide-left">
          <div className="hero-badge">
            <Sparkles size={12} style={{ color: 'var(--accent-blue)' }} />
            <span>{config.hero_badge || 'FULL STACK DEVELOPER & AI AUTOMATION SPECIALIST'}</span>
          </div>

          <h1 className="hero-title">
            {formatHeroTitle(config.hero_title)}
          </h1>

          <p className="hero-description">
            {config.hero_subtitle || "I help startups and brands build modern, fast, and scalable websites, web apps & AI-powered solutions that create real impact."}
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary" style={{ gap: '0.65rem' }}>
              <MessageSquare size={16} /> Let's Talk
            </a>
          </div>

          <div className="hero-socials" style={{ '--social-glow-color': config.social_glow_color || 'rgba(99, 102, 241, 0.5)' }}>
            <a href={config.social_github || "https://github.com"} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={config.social_linkedin || "https://linkedin.com"} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={config.social_instagram || "https://instagram.com"} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href={config.social_whatsapp || "https://wa.me/911234567890"} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
            <a href={`mailto:${config.email || 'hello@rvdigitalstudio.com'}`} className="social-icon-btn" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Side Visual Orbit */}
        <div className="hero-visual reveal-slide-right delay-200">
          <div className="orbit-decor-wrapper">
            {/* Center Card */}
            <div className="central-workspace-card">
              <div className="workspace-dots">
                <span className="dot red" style={{ width: '8px', height: '8px' }}></span>
                <span className="dot yellow" style={{ width: '8px', height: '8px' }}></span>
                <span className="dot green" style={{ width: '8px', height: '8px' }}></span>
              </div>
              <div className="workspace-center-symbol">
                <Code2 size={32} />
              </div>
            </div>

            {/* Orbiting Icons */}
            <div className="orbiting-node node-react" title="React">
              <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#60a5fa' }}>Atom</span>
            </div>
            <div className="orbiting-node node-next" title="Next.js">
              <span style={{ fontStyle: 'italic', fontWeight: '800', fontFamily: 'var(--font-sans)', fontSize: '0.95rem' }}>Nx</span>
            </div>
            <div className="orbiting-node node-js" title="JavaScript">
              <span style={{ fontWeight: '800', color: '#facc15', fontSize: '0.85rem' }}>JS</span>
            </div>
            <div className="orbiting-node node-wordpress" title="WordPress">
              <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#38bdf8' }}>WP</span>
            </div>
            <div className="orbiting-node node-firebase" title="Firebase">
              <span style={{ fontWeight: '800', color: '#f97316', fontSize: '0.85rem' }}>FB</span>
            </div>

            {/* Floating text badge */}
            <div className="floating-visual-badge glass-panel">
              <div className="visual-badge-header">
                <Sparkles size={12} />
                <span>Quick Stats</span>
              </div>
              <p className="visual-badge-text">
                {config.hero_badge_text || 'Building Fast. Automating Smarter. Delivering Results.'}
              </p>
              <a href="#about" className="visual-badge-link">
                Explore More <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
