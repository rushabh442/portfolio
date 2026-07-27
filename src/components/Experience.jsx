import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Calendar, Briefcase, Award } from 'lucide-react';

const Experience = () => {
  const defaultExperiences = [
    {
      role: 'Senior Fullstack Developer',
      company: 'TechNova Solutions',
      period: '2024 - Present',
      description: 'Lead developer for SaaS platform optimization. Re-architected front-end applications into Next.js/TypeScript resulting in a 40% improvement in load speeds. Mentored 4 junior developers and established CI/CD best practices.'
    },
    {
      role: 'Frontend Engineer',
      company: 'Appify Studio',
      period: '2022 - 2024',
      description: 'Designed and developed 10+ dynamic web portals. Collaborated closely with design teams to translate complex Figma screens into responsive React components. Integrated REST and GraphQL APIs with robust error handling.'
    },
    {
      role: 'Web Developer Intern',
      company: 'PixelFlow Agency',
      period: '2021 - 2022',
      description: 'Assisted in building custom WordPress themes and React-based landing pages. Focused on mobile-first optimization, semantic HTML markup, and basic unit testing to improve project deliverables.'
    }
  ];

  const [experienceList, setExperienceList] = useState(defaultExperiences);

  useEffect(() => {
    const fetchExperience = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('experience')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setExperienceList(data);
        }
      } catch (err) {
        console.error("Error loading experience from Supabase:", err);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-slide-up">
          <div className="section-subtitle">
            <Award size={16} />
            <span>My Path</span>
          </div>
          <h2 className="section-title">Professional Experience</h2>
          <div className="section-divider"></div>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {experienceList.map((exp, idx) => (
            <div key={exp.id || idx} className={`timeline-item reveal-slide-up delay-${Math.min((idx + 1) * 100, 500)}`}>
              {/* Timeline Indicator */}
              <div className="timeline-marker">
                <Briefcase size={18} />
              </div>

              {/* Timeline Content Card */}
              <div className="timeline-content-card glass-panel">
                <div className="timeline-header-card">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <h4 className="timeline-company">{exp.company}</h4>
                  </div>
                  <div className="timeline-date-badge">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
