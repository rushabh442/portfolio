import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Cpu, Code2, Database, Layout, Settings, Terminal } from 'lucide-react';

const TechStack = () => {
  const [activeTab, setActiveTab] = useState('Frontend');
  const [techList, setTechList] = useState([]);

  const categories = [
    'Frontend',
    'Backend',
    'AI & Automation',
    'CMS',
    'Tools & Others'
  ];

  const fallbackTech = [
    // Frontend
    { name: 'HTML5', icon_text: 'code2', color: '#e34f26', category: 'Frontend' },
    { name: 'CSS3', icon_text: 'layout', color: '#1572b6', category: 'Frontend' },
    { name: 'JavaScript', icon_text: 'JS', color: '#f7df1e', category: 'Frontend' },
    { name: 'React', icon_text: 'Atom', color: '#61dafb', category: 'Frontend' },
    { name: 'Next.js', icon_text: 'Nx', color: '#ffffff', category: 'Frontend' },
    { name: 'Tailwind CSS', icon_text: 'TW', color: '#38bdf8', category: 'Frontend' },
    { name: 'TypeScript', icon_text: 'TS', color: '#3178c6', category: 'Frontend' },
    // Backend
    { name: 'Node.js', icon_text: 'cpu', color: '#339933', category: 'Backend' },
    { name: 'Express.js', icon_text: 'terminal', color: '#ffffff', category: 'Backend' },
    { name: 'PostgreSQL', icon_text: 'database', color: '#4169e1', category: 'Backend' },
    { name: 'MongoDB', icon_text: 'database', color: '#47a248', category: 'Backend' },
    // AI
    { name: 'Python', icon_text: 'Py', color: '#3776ab', category: 'AI & Automation' },
    { name: 'LangChain', icon_text: 'cpu', color: '#139c5a', category: 'AI & Automation' },
    { name: 'OpenAI API', icon_text: 'AI', color: '#10a37f', category: 'AI & Automation' },
    { name: 'Make / n8n', icon_text: 'settings', color: '#ff6f59', category: 'AI & Automation' },
    // CMS
    { name: 'WordPress', icon_text: 'WP', color: '#21759b', category: 'CMS' },
    { name: 'Shopify', icon_text: 'SF', color: '#95bf47', category: 'CMS' },
    { name: 'Strapi', icon_text: 'SR', color: '#4945ff', category: 'CMS' },
    // Tools
    { name: 'Git', icon_text: 'Git', color: '#f05032', category: 'Tools & Others' },
    { name: 'Docker', icon_text: 'settings', color: '#2496ed', category: 'Tools & Others' },
    { name: 'Figma', icon_text: 'layout', color: '#f24e1e', category: 'Tools & Others' },
    { name: 'Postman', icon_text: 'terminal', color: '#ff6c37', category: 'Tools & Others' }
  ];

  useEffect(() => {
    const fetchTechList = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('technologies')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setTechList(data);
        } else {
          setTechList(fallbackTech);
        }
      } catch (err) {
        console.error("Error loading technologies from Supabase:", err);
        setTechList(fallbackTech);
      }
    };
    fetchTechList();
  }, []);

  const getTechIcon = (tech) => {
    const iconName = tech.icon_text?.trim();
    if (!iconName) return <Code2 size={24} />;

    // Direct text rendering (like React "Atom", WordPress "WP")
    if (['Atom', 'Nx', 'JS', 'TS', 'WP', 'SF', 'SR', 'Git', 'Py', 'AI', 'TW'].includes(iconName)) {
      return <span style={{ fontWeight: '800' }}>{iconName}</span>;
    }

    switch (iconName.toLowerCase()) {
      case 'code2': return <Code2 size={24} />;
      case 'layout': return <Layout size={24} />;
      case 'cpu': return <Cpu size={24} />;
      case 'terminal': return <Terminal size={24} />;
      case 'database': return <Database size={24} />;
      case 'settings': return <Settings size={24} />;
      default: return <Code2 size={24} />;
    }
  };

  // Filter tech stack by active tab category
  const filteredTech = techList.filter(tech => tech.category === activeTab);

  return (
    <section id="skills" className="techstack-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-slide-up">
          <div className="section-subtitle">
            <Cpu size={14} />
            <span>My Tech Stack</span>
          </div>
          <h2 className="section-title">Technologies I Use</h2>
          <div className="section-divider"></div>
        </div>

        {/* Tab Buttons Capsule */}
        <div className="tabs-capsule-container reveal-slide-up delay-100">
          <div className="tabs-capsule">
            {categories.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tech Grid */}
        <div className="tech-grid reveal-slide-up delay-200">
          {filteredTech.map((tech, idx) => (
            <div 
              key={tech.id || `${activeTab}-${tech.name}`} 
              className="tech-tile glass-panel"
              style={{ 
                '--tech-color': tech.color, 
                animationDelay: `${idx * 0.06}s` 
              }}
            >
              <div className="tech-icon-container" style={{ color: tech.color }}>
                {getTechIcon(tech)}
              </div>
              <span className="tech-name">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
