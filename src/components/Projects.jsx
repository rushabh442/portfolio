import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Briefcase, Github, ExternalLink, ArrowRight } from 'lucide-react';

const Projects = () => {
  const fallbackProjects = [
    {
      title: 'Learn Ladder',
      category: 'Web Application',
      description: 'E-learning platform with AI tutor, progress tracking, and smart recommendations to accelerate skill acquisition.',
      tech_line: 'React - Tailwind - Firebase',
      github_link: 'https://github.com',
      live_link: 'https://example.com',
      visual_type: 'dashboard'
    },
    {
      title: 'StarkBite Restaurant',
      category: 'E-commerce',
      description: 'Premium restaurant website with online reservation, dynamic menus, and automated order notifications.',
      tech_line: 'Next.js - Tailwind - MongoDB',
      github_link: 'https://github.com',
      live_link: 'https://example.com',
      visual_type: 'store'
    },
    {
      title: 'AI Content Studio',
      category: 'AI Automation',
      description: 'AI-powered content generation platform for blogs, social media posts, and advertising copy.',
      tech_line: 'Next.js - Supabase - OpenAI',
      github_link: 'https://github.com',
      live_link: 'https://example.com',
      visual_type: 'editor'
    }
  ];

  const [projectsList, setProjectsList] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setProjectsList(data);
        }
      } catch (err) {
        console.error("Error loading projects from Supabase:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Top Header Row with Title and Button */}
        <div className="projects-top-row">
          <div className="section-header reveal-slide-left">
            <div className="section-subtitle">
              <Briefcase size={14} />
              <span>Portfolio</span>
            </div>
            <h2 className="section-title">Featured Projects</h2>
            <div className="section-divider"></div>
          </div>
          <div className="reveal-slide-right">
            <a href="#contact" className="btn btn-secondary">
              View All Projects <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid-slider">
          {projectsList.map((project, idx) => (
            <div 
              key={project.id || idx} 
              className={`project-card-v2 glass-panel reveal-slide-up delay-${Math.min((idx + 1) * 100, 500)}`}
            >
              {/* Project Cover Mockup */}
              <div className="project-cover-mockup">
                <span className="card-project-badge">{project.category}</span>
                {project.image_url ? (
                  <img src={project.image_url} alt={project.title} className="project-thumbnail-img" />
                ) : (
                  <>
                    {project.visual_type === 'dashboard' && (
                      <div className="mock-ui dashboard">
                        <div className="mock-sidebar"></div>
                        <div className="mock-body">
                          <div className="mock-chart-line"></div>
                          <div className="mock-chart-bars">
                            <span className="bar" style={{ height: '50%', background: 'var(--accent-purple)' }}></span>
                            <span className="bar" style={{ height: '75%', background: 'var(--accent-blue)' }}></span>
                            <span className="bar" style={{ height: '40%', background: 'var(--accent-cyan)' }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                    {project.visual_type === 'store' && (
                      <div className="mock-ui store">
                        <div className="mock-store-grid">
                          <div className="mock-store-item">
                            <div className="item-img" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)' }}></div>
                            <div className="item-line"></div>
                          </div>
                          <div className="mock-store-item">
                            <div className="item-img" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(168, 85, 247, 0.2) 100%)' }}></div>
                            <div className="item-line"></div>
                          </div>
                        </div>
                      </div>
                    )}
                    {project.visual_type === 'editor' && (
                      <div className="mock-ui editor">
                        <div className="mock-editor-header">
                          <span className="mock-tab active">index.ts</span>
                        </div>
                        <div className="mock-editor-lines">
                          <div className="mock-line" style={{ width: '45%' }}></div>
                          <div className="mock-line" style={{ width: '80%', background: 'var(--accent-purple)' }}></div>
                          <div className="mock-line" style={{ width: '55%' }}></div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Project Info details */}
              <div className="project-details-body">
                <h3 className="project-title-v2">{project.title}</h3>
                <p className="project-desc-v2">{project.description}</p>
                <div className="project-tech-line">{project.tech_line}</div>

                <div className="project-links-v2">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Source / Preview</span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="project-link-btn" aria-label="GitHub">
                      <Github size={16} />
                    </a>
                    <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="project-link-btn" aria-label="Live Demo">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
