import React, { useState, useEffect, useRef } from 'react';
import { User, Check, ArrowRight } from 'lucide-react';

const AnimatedCounter = ({ target, duration = 2000, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            setCount(target);
          }
        };
        window.requestAnimationFrame(step);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const About = ({ config = {} }) => {
  const checklists = [
    config.about_check_1 || '2+ Years of hands-on experience',
    config.about_check_2 || 'Clean, scalable & maintainable code',
    config.about_check_3 || 'AI automation & modern integrations',
    config.about_check_4 || 'Fast communication & on-time delivery'
  ];

  const stats = [
    { 
      target: parseInt(config.stat_1_val || 20, 10), 
      suffix: config.stat_1_suffix || '+', 
      label: config.stat_1_label || 'Projects Completed' 
    },
    { 
      target: parseInt(config.stat_2_val || 15, 10), 
      suffix: config.stat_2_suffix || '+', 
      label: config.stat_2_label || 'Happy Clients' 
    },
    { 
      target: parseInt(config.stat_3_val || 2, 10), 
      suffix: config.stat_3_suffix || '+', 
      label: config.stat_3_label || 'Years Experience' 
    },
    { 
      target: parseInt(config.stat_4_val || 99, 10), 
      suffix: config.stat_4_suffix || '%', 
      label: config.stat_4_label || 'Client Satisfaction' 
    }
  ];

  const codeLines = [
    'const studio = {',
    '  name: "RV Digital Studio",',
    '  developer: "Rushya",',
    '  stack: ["Full Stack", "AI"],',
    '  passion: "Clean & Scaling code",',
    '  ready: true',
    '};'
  ];

  const [displayedCode, setDisplayedCode] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [currentCharIdx, setCurrentCharIdx] = useState(0);

  useEffect(() => {
    if (currentLineIdx >= codeLines.length) {
      const timer = setTimeout(() => {
        setDisplayedCode([]);
        setCurrentLineIdx(0);
        setCurrentCharIdx(0);
      }, 6000); // Wait 6 seconds before looping typing
      return () => clearTimeout(timer);
    }

    const currentLine = codeLines[currentLineIdx];
    if (currentCharIdx < currentLine.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => {
          const next = [...prev];
          next[currentLineIdx] = (next[currentLineIdx] || '') + currentLine[currentCharIdx];
          return next;
        });
        setCurrentCharIdx((prev) => prev + 1);
      }, 50); // typing speed
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIdx((prev) => prev + 1);
        setCurrentCharIdx(0);
      }, 350); // delay between lines
      return () => clearTimeout(timer);
    }
  }, [currentLineIdx, currentCharIdx]);

  const renderCodeLine = (line, isLastLine) => {
    if (!line) return <div key={Math.random()}>&nbsp;</div>;

    let parts = [];
    let remaining = line;

    if (remaining.startsWith('const ')) {
      parts.push(<span key="keyword" className="code-keyword">const </span>);
      remaining = remaining.substring(6);
    }

    if (remaining.startsWith('studio = {')) {
      parts.push(<span key="var">studio </span>);
      parts.push(<span key="op">= </span>);
      parts.push(<span key="brace">{"{"}</span>);
      remaining = '';
    }

    const keyMatch = remaining.match(/^(\s*)(\w+):/);
    if (keyMatch) {
      const spaces = keyMatch[1];
      const key = keyMatch[2];
      parts.push(<span key="spaces">{spaces}</span>);
      parts.push(<span key="key" className="code-key">{key}</span>);
      parts.push(<span key="colon">: </span>);
      remaining = remaining.substring(spaces.length + key.length + 2);
    }

    if (remaining.includes('"')) {
      const splitParts = remaining.split('"');
      for (let i = 0; i < splitParts.length; i++) {
        if (i % 2 === 1) {
          parts.push(<span key={`str-${i}`} className="code-string">"{splitParts[i]}"</span>);
        } else {
          parts.push(<span key={`text-${i}`}>{splitParts[i]}</span>);
        }
      }
      remaining = '';
    }

    if (remaining.includes('[') || remaining.includes(']')) {
      const arrayParts = remaining.split(/([\[\]])/);
      arrayParts.forEach((part, index) => {
        if (part === '[' || part === ']') {
          parts.push(<span key={`bracket-${index}`} style={{ color: '#facc15' }}>{part}</span>);
        } else {
          parts.push(<span key={`part-${index}`}>{part}</span>);
        }
      });
      remaining = '';
    }

    if (remaining) {
      parts.push(<span key="rem">{remaining}</span>);
    }

    return (
      <div key={line} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
        {parts}
        {isLastLine && <span className="code-cursor"></span>}
      </div>
    );
  };

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-slide-up">
          <div className="section-subtitle">
            <User size={14} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">Who I Am</h2>
          <div className="section-divider"></div>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Bio text column */}
          <div className="about-bio reveal-slide-left">
            <h3 className="about-lead-title">
              {config.about_lead_1 || 'Code. Solve.'} <br />
              {config.about_lead_2 ? (
                config.about_lead_2.includes('Impact.') ? (
                  <>
                    {config.about_lead_2.split('Impact.')[0]}
                    <span className="text-gradient">Impact.</span>
                  </>
                ) : <span className="text-gradient">{config.about_lead_2}</span>
              ) : (
                <>
                  Automate. <span className="text-gradient">Impact.</span>
                </>
              )}
            </h3>
            
            <p className="about-desc-text">
              {config.about_bio || "I'm Rushya, a passionate developer who loves building clean, modern, and high-performance digital solutions. I combine code, design thinking, and AI automation to solve real problems and create seamless experiences."}
            </p>

            <div className="about-checklists">
              {checklists.map((item, idx) => (
                <div key={idx} className="about-check-item">
                  <span className="check-icon">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1rem' }}>
              <a href="#contact" className="btn btn-secondary">
                More About Me <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Laptop Mockup & Stats Grid */}
          <div className="about-visual-center reveal-slide-right delay-200">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%' }}>
              {/* Laptop CSS mockup */}
              <div className="about-visual-laptop">
                <div className="laptop-code-mockup">
                  <div className="laptop-dots">
                    <span className="dot red" style={{ width: '6px', height: '6px' }}></span>
                    <span className="dot yellow" style={{ width: '6px', height: '6px' }}></span>
                    <span className="dot green" style={{ width: '6px', height: '6px' }}></span>
                  </div>
                  <div className="laptop-code-content">
                    {displayedCode.map((line, idx) => 
                      renderCodeLine(line, idx === displayedCode.length - 1 && currentLineIdx < codeLines.length)
                    )}
                    {displayedCode.length === 0 && <span className="code-cursor"></span>}
                  </div>
                </div>
                <div className="laptop-visual-glow"></div>
              </div>

              {/* Stats Grid */}
              <div className="about-stats-grid">
                {stats.map((stat, idx) => (
                  <div key={idx} className="about-stat-box glass-panel">
                    <span className="about-stat-number">
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                    </span>
                    <span className="about-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
