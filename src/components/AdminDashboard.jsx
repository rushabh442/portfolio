import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { 
  LogOut, Settings, Briefcase, Cpu, Award, Inbox, Plus, Trash, Edit, Save, X, Sparkles, Check, Database, FileText 
} from 'lucide-react';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('config');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [seedingTech, setSeedingTech] = useState(false);
  const [seedingProjects, setSeedingProjects] = useState(false);
  const [seedingServices, setSeedingServices] = useState(false);
  const [seedingExp, setSeedingExp] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Grouped configuration state
  const [config, setConfig] = useState({
    brand_name: '',
    brand_subtitle: '',
    hero_badge: '',
    hero_status: '',
    hero_title: '',
    hero_subtitle: '',
    hero_badge_text: '',
    about_lead_1: '',
    about_lead_2: '',
    about_bio: '',
    about_check_1: '',
    about_check_2: '',
    about_check_3: '',
    about_check_4: '',
    stat_1_val: '',
    stat_1_suffix: '',
    stat_1_label: '',
    stat_2_val: '',
    stat_2_suffix: '',
    stat_2_label: '',
    stat_3_val: '',
    stat_3_suffix: '',
    stat_3_label: '',
    stat_4_val: '',
    stat_4_suffix: '',
    stat_4_label: '',
    email: '',
    phone: '',
    location: '',
    contact_response_time: '',
    footer_copyright: '',
    social_github: '',
    social_linkedin: '',
    social_instagram: '',
    social_whatsapp: '',
    social_glow_color: '',
    resume_url: ''
  });

  // Database collections
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [experience, setExperience] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

  // CRUD Form States
  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '', category: '', description: '', tech_line: '', github_link: '', live_link: '', visual_type: 'dashboard', image_url: ''
  });

  const [editingService, setEditingService] = useState(null);
  const [newService, setNewService] = useState({ title: '', description: '', icon: 'globe' });

  const [editingExp, setEditingExp] = useState(null);
  const [newExp, setNewExp] = useState({ role: '', company: '', period: '', description: '' });

  const [editingTech, setEditingTech] = useState(null);
  const [newTech, setNewTech] = useState({ name: '', category: 'Frontend', color: '#61dafb', icon_text: 'Atom' });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const fetchData = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      if (activeTab === 'config') {
        const { data, error } = await supabase.from('portfolio_config').select('*');
        if (error) throw error;
        
        const configMap = {};
        data.forEach(item => {
          configMap[item.key] = item.value;
        });
        
        // Define expanded defaults
        const defaults = {
          brand_name: 'RV.',
          brand_subtitle: 'RV DIGITAL STUDIO',
          hero_badge: 'FULL STACK DEVELOPER & AI AUTOMATION SPECIALIST',
          hero_status: 'AVAILABLE FOR FREELANCE',
          hero_title: 'I Build Digital Experiences That Drive Results.',
          hero_subtitle: 'I help startups and brands build modern, fast, and scalable websites, web apps & AI-powered solutions that create real impact.',
          hero_badge_text: 'Building Fast. Automating Smarter. Delivering Results.',
          about_lead_1: 'Code. Solve.',
          about_lead_2: 'Automate. Impact.',
          about_bio: "I'm Rushya, a passionate developer who loves building clean, modern, and high-performance digital solutions.",
          about_check_1: '2+ Years of hands-on experience',
          about_check_2: 'Clean, scalable & maintainable code',
          about_check_3: 'AI automation & modern integrations',
          about_check_4: 'Fast communication & on-time delivery',
          stat_1_val: '20',
          stat_1_suffix: '+',
          stat_1_label: 'Projects Completed',
          stat_2_val: '15',
          stat_2_suffix: '+',
          stat_2_label: 'Happy Clients',
          stat_3_val: '2',
          stat_3_suffix: '+',
          stat_3_label: 'Years Experience',
          stat_4_val: '99',
          stat_4_suffix: '%',
          stat_4_label: 'Client Satisfaction',
          email: 'hello@rvdigitalstudio.com',
          phone: '+91 12345 67890',
          location: 'India',
          contact_response_time: 'Within 24 Hours',
          footer_copyright: 'RV Digital Studio. All rights reserved.',
          social_github: 'https://github.com',
          social_linkedin: 'https://linkedin.com',
          social_instagram: 'https://instagram.com',
          social_whatsapp: 'https://wa.me/911234567890',
          social_glow_color: '#a855f7',
          resume_url: '#'
        };

        let updated = false;
        const finalConfig = { ...config };
        for (const k in defaults) {
          if (configMap[k] !== undefined) {
            finalConfig[k] = configMap[k];
          } else {
            finalConfig[k] = defaults[k];
            await supabase.from('portfolio_config').upsert({ key: k, value: defaults[k] });
            updated = true;
          }
        }
        setConfig(finalConfig);
        if (updated) showMessage("Config keys seeded in database.");
      } 
      
      else if (activeTab === 'projects') {
        const { data, error } = await supabase.from('projects').select('*').order('order_index', { ascending: true });
        if (error) throw error;
        setProjects(data || []);
      } 
      
      else if (activeTab === 'services') {
        const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true });
        if (error) throw error;
        setServices(data || []);
      } 
      
      else if (activeTab === 'experience') {
        const { data, error } = await supabase.from('experience').select('*').order('order_index', { ascending: true });
        if (error) throw error;
        setExperience(data || []);
      } 
      
      else if (activeTab === 'tech') {
        const { data, error } = await supabase.from('technologies').select('*').order('order_index', { ascending: true });
        if (error) throw error;
        setTechnologies(data || []);
      }
      
      else if (activeTab === 'messages') {
        const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        setMessagesList(data || []);
      }
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
    }
    onLogout();
  };

  // ----- Config Save CRUD -----
  const handleSaveConfig = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      const promises = Object.keys(config).map(k => 
        supabase.from('portfolio_config').upsert({ key: k, value: config[k] })
      );
      await Promise.all(promises);
      showMessage("Site configuration saved successfully.");
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  // ----- Projects Tab CRUD -----
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      const payload = editingProject ? editingProject : newProject;
      if (!editingProject) {
        payload.order_index = projects.length;
      }
      const { error } = await supabase.from('projects').upsert(payload);
      if (error) throw error;

      showMessage(editingProject ? "Project updated." : "Project created.");
      setEditingProject(null);
      setNewProject({ title: '', category: '', description: '', tech_line: '', github_link: '', live_link: '', visual_type: 'dashboard', image_url: '' });
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!supabase || !window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      showMessage("Project deleted.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFileToStorage(file);
  };

  const handleFileDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await uploadFileToStorage(file);
  };

  const uploadFileToStorage = async (file) => {
    if (!supabase) return;
    
    if (!file.type.startsWith('image/')) {
      showMessage("Please upload an image file.", "error");
      return;
    }

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      if (editingProject) {
        setEditingProject({ ...editingProject, image_url: data.publicUrl });
      } else {
        setNewProject({ ...newProject, image_url: data.publicUrl });
      }
      showMessage("Image uploaded successfully.");
    } catch (err) {
      console.error("Upload error:", err);
      showMessage("Upload failed. Make sure a public bucket named 'portfolio-assets' exists in Supabase Storage.", "error");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadResumeToStorage(file);
  };

  const handleResumeDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await uploadResumeToStorage(file);
  };

  const uploadResumeToStorage = async (file) => {
    if (!supabase) return;
    
    if (file.type !== 'application/pdf') {
      showMessage("Please upload a PDF document.", "error");
      return;
    }

    setUploadingResume(true);
    try {
      const fileName = `resume-${Date.now()}.pdf`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      // Save directly to database config
      const { error: dbError } = await supabase
        .from('portfolio_config')
        .upsert({ key: 'resume_url', value: data.publicUrl });
      
      if (dbError) throw dbError;

      setConfig(prev => ({ ...prev, resume_url: data.publicUrl }));
      showMessage("Resume PDF uploaded successfully.");
    } catch (err) {
      console.error("Resume upload error:", err);
      showMessage("Upload failed. Check your Supabase storage permissions.", "error");
    } finally {
      setUploadingResume(false);
    }
  };

  // ----- Services Tab CRUD -----
  const handleSaveService = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      const payload = editingService ? editingService : newService;
      if (!editingService) {
        payload.order_index = services.length;
      }
      const { error } = await supabase.from('services').upsert(payload);
      if (error) throw error;

      showMessage(editingService ? "Service updated." : "Service created.");
      setEditingService(null);
      setNewService({ title: '', description: '', icon: 'globe' });
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!supabase || !window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
      showMessage("Service deleted.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  // ----- Experience Tab CRUD -----
  const handleSaveExp = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      const payload = editingExp ? editingExp : newExp;
      if (!editingExp) {
        payload.order_index = experience.length;
      }
      const { error } = await supabase.from('experience').upsert(payload);
      if (error) throw error;

      showMessage(editingExp ? "Timeline node updated." : "Timeline node created.");
      setEditingExp(null);
      setNewExp({ role: '', company: '', period: '', description: '' });
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExp = async (id) => {
    if (!supabase || !window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from('experience').delete().eq('id', id);
      if (error) throw error;
      showMessage("Timeline node deleted.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  // ----- Tech Stack Tab CRUD -----
  const handleSaveTech = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);
    try {
      const payload = editingTech ? editingTech : newTech;
      if (!editingTech) {
        payload.order_index = technologies.length;
      }
      const { error } = await supabase.from('technologies').upsert(payload);
      if (error) throw error;

      showMessage(editingTech ? "Technology updated." : "Technology created.");
      setEditingTech(null);
      setNewTech({ name: '', category: 'Frontend', color: '#61dafb', icon_text: 'Atom' });
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTech = async (id) => {
    if (!supabase || !window.confirm("Are you sure you want to delete this technology icon?")) return;
    try {
      const { error } = await supabase.from('technologies').delete().eq('id', id);
      if (error) throw error;
      showMessage("Technology deleted.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    }
  };

  // Seed Default Technologies list helper
  const handleSeedDefaultTech = async () => {
    if (!supabase || seedingTech) return;
    if (!window.confirm("Do you want to seed the default 22 technology stack items?")) return;
    setSeedingTech(true);
    try {
      const defaultTechItems = [
        { name: 'HTML5', icon_text: 'code2', color: '#e34f26', category: 'Frontend', order_index: 0 },
        { name: 'CSS3', icon_text: 'layout', color: '#1572b6', category: 'Frontend', order_index: 1 },
        { name: 'JavaScript', icon_text: 'JS', color: '#f7df1e', category: 'Frontend', order_index: 2 },
        { name: 'React', icon_text: 'Atom', color: '#61dafb', category: 'Frontend', order_index: 3 },
        { name: 'Next.js', icon_text: 'Nx', color: '#ffffff', category: 'Frontend', order_index: 4 },
        { name: 'Tailwind CSS', icon_text: 'TW', color: '#38bdf8', category: 'Frontend', order_index: 5 },
        { name: 'TypeScript', icon_text: 'TS', color: '#3178c6', category: 'Frontend', order_index: 6 },
        { name: 'Node.js', icon_text: 'cpu', color: '#339933', category: 'Backend', order_index: 7 },
        { name: 'Express.js', icon_text: 'terminal', color: '#ffffff', category: 'Backend', order_index: 8 },
        { name: 'PostgreSQL', icon_text: 'database', color: '#4169e1', category: 'Backend', order_index: 9 },
        { name: 'MongoDB', icon_text: 'database', color: '#47a248', category: 'Backend', order_index: 10 },
        { name: 'Python', icon_text: 'Py', color: '#3776ab', category: 'AI & Automation', order_index: 11 },
        { name: 'LangChain', icon_text: 'cpu', color: '#139c5a', category: 'AI & Automation', order_index: 12 },
        { name: 'OpenAI API', icon_text: 'AI', color: '#10a37f', category: 'AI & Automation', order_index: 13 },
        { name: 'Make / n8n', icon_text: 'settings', color: '#ff6f59', category: 'AI & Automation', order_index: 14 },
        { name: 'WordPress', icon_text: 'WP', color: '#21759b', category: 'CMS', order_index: 15 },
        { name: 'Shopify', icon_text: 'SF', color: '#95bf47', category: 'CMS', order_index: 16 },
        { name: 'Strapi', icon_text: 'SR', color: '#4945ff', category: 'CMS', order_index: 17 },
        { name: 'Git', icon_text: 'Git', color: '#f05032', category: 'Tools & Others', order_index: 18 },
        { name: 'Docker', icon_text: 'settings', color: '#2496ed', category: 'Tools & Others', order_index: 19 },
        { name: 'Figma', icon_text: 'layout', color: '#f24e1e', category: 'Tools & Others', order_index: 20 },
        { name: 'Postman', icon_text: 'terminal', color: '#ff6c37', category: 'Tools & Others', order_index: 21 }
      ];

      const { error } = await supabase.from('technologies').insert(defaultTechItems);
      if (error) throw error;
      
      showMessage("Successfully seeded default technologies.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSeedingTech(false);
    }
  };

  // Seed Default Projects list helper
  const handleSeedDefaultProjects = async () => {
    if (!supabase || seedingProjects) return;
    if (!window.confirm("Do you want to seed the default 3 projects?")) return;
    setSeedingProjects(true);
    try {
      const defaultProjectsItems = [
        {
          title: 'Learn Ladder',
          category: 'Web Application',
          description: 'E-learning platform with AI tutor, progress tracking, and smart recommendations to accelerate skill acquisition.',
          tech_line: 'React - Tailwind - Firebase',
          github_link: 'https://github.com',
          live_link: 'https://example.com',
          visual_type: 'dashboard',
          order_index: 0
        },
        {
          title: 'StarkBite Restaurant',
          category: 'E-commerce',
          description: 'Premium restaurant website with online reservation, dynamic menus, and automated order notifications.',
          tech_line: 'Next.js - Tailwind - MongoDB',
          github_link: 'https://github.com',
          live_link: 'https://example.com',
          visual_type: 'store',
          order_index: 1
        },
        {
          title: 'AI Content Studio',
          category: 'AI Automation',
          description: 'AI-powered content generation platform for blogs, social media posts, and advertising copy.',
          tech_line: 'Next.js - Supabase - OpenAI',
          github_link: 'https://github.com',
          live_link: 'https://example.com',
          visual_type: 'editor',
          order_index: 2
        }
      ];

      const { error } = await supabase.from('projects').insert(defaultProjectsItems);
      if (error) throw error;
      
      showMessage("Successfully seeded default projects.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSeedingProjects(false);
    }
  };

  // Seed Default Services list helper
  const handleSeedDefaultServices = async () => {
    if (!supabase || seedingServices) return;
    if (!window.confirm("Do you want to seed the default 6 services?")) return;
    setSeedingServices(true);
    try {
      const defaultServicesItems = [
        { title: 'Web Development', description: 'Modern, responsive websites built for performance.', icon: 'globe', order_index: 0 },
        { title: 'AI Automation', description: 'Automate workflows and integrate AI tools to save time.', icon: 'cpu', order_index: 1 },
        { title: 'Shopify Development', description: 'Custom Shopify stores that convert and scale your business.', icon: 'shopping-bag', order_index: 2 },
        { title: 'WordPress Development', description: 'SEO-friendly, fast & scalable WordPress sites.', icon: 'code', order_index: 3 },
        { title: 'Landing Pages', description: 'High-converting landing pages for products & campaigns.', icon: 'rocket', order_index: 4 },
        { title: 'UI/UX Design', description: 'Clean, modern & user-friendly design that stands out.', icon: 'layout', order_index: 5 }
      ];

      const { error } = await supabase.from('services').insert(defaultServicesItems);
      if (error) throw error;
      
      showMessage("Successfully seeded default services.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSeedingServices(false);
    }
  };

  // Seed Default Experience list helper
  const handleSeedDefaultExperience = async () => {
    if (!supabase || seedingExp) return;
    if (!window.confirm("Do you want to seed the default 3 experience timeline items?")) return;
    setSeedingExp(true);
    try {
      const defaultExpItems = [
        {
          role: 'Senior Fullstack Developer',
          company: 'TechNova Solutions',
          period: '2024 - Present',
          description: 'Lead developer for SaaS platform optimization. Re-architected front-end applications into Next.js/TypeScript resulting in a 40% improvement in load speeds. Mentored 4 junior developers and established CI/CD best practices.',
          order_index: 0
        },
        {
          role: 'Frontend Engineer',
          company: 'Appify Studio',
          period: '2022 - 2024',
          description: 'Designed and developed 10+ dynamic web portals. Collaborated closely with design teams to translate complex Figma screens into responsive React components. Integrated REST and GraphQL APIs with robust error handling.',
          order_index: 1
        },
        {
          role: 'Web Developer Intern',
          company: 'PixelFlow Agency',
          period: '2021 - 2022',
          description: 'Assisted in building custom WordPress themes and React-based landing pages. Focused on mobile-first optimization, semantic HTML markup, and basic unit testing to improve project deliverables.',
          order_index: 2
        }
      ];

      const { error } = await supabase.from('experience').insert(defaultExpItems);
      if (error) throw error;
      
      showMessage("Successfully seeded default experience timeline.");
      fetchData();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSeedingExp(false);
    }
  };

  return (
    <div className="admin-dashboard-wrapper">
      {/* Header */}
      <header className="admin-dash-header">
        <div className="dash-logo">
          <Sparkles size={20} className="logo-icon" />
          <span>Rushya <span className="logo-accent">Admin Control</span></span>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary logout-btn">
          <LogOut size={16} /> Sign Out
        </button>
      </header>

      <div className="admin-dash-container">
        {/* Sidebar Tabs */}
        <aside className="admin-dash-sidebar glass-panel">
          <button 
            className={`sidebar-tab ${activeTab === 'config' ? 'active' : ''}`}
            onClick={() => setActiveTab('config')}
          >
            <Settings size={18} /> Site Config
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveTab('tech')}
          >
            <Cpu size={18} /> Tech Stack CMS
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Briefcase size={18} /> Projects CMS
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <Sparkles size={18} /> Services CMS
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Award size={18} /> Experience CMS
          </button>
          <button 
            className={`sidebar-tab ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            <Inbox size={18} /> Inbox Messages
          </button>
        </aside>

        {/* Content Body */}
        <main className="admin-dash-content glass-panel">
          {message.text && (
            <div className={`admin-dash-alert ${message.type}`}>
              <Check size={16} />
              <span>{message.text}</span>
            </div>
          )}

          {loading ? (
            <div className="admin-loading-state">Loading data from Supabase...</div>
          ) : (
            <>
              {/* Tab 1: Config Editor */}
              {activeTab === 'config' && (
                <form onSubmit={handleSaveConfig} className="dash-form">
                  <h3>Edit Homepage Text Configuration</h3>
                  <p className="tab-subtitle">Modify everything from logos, headers, checklist items, to statistic values.</p>
                  
                  {/* Group 1: Logo & Branding */}
                  <div className="dash-form-section">
                    <h4>Header Brand Logo</h4>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Logo Brand Title (e.g. RV.)</label>
                        <input 
                          type="text" 
                          value={config.brand_name} 
                          onChange={(e) => setConfig({...config, brand_name: e.target.value})} 
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label>Sub-branding Text (e.g. RV DIGITAL STUDIO)</label>
                        <input 
                          type="text" 
                          value={config.brand_subtitle} 
                          onChange={(e) => setConfig({...config, brand_subtitle: e.target.value})} 
                          className="form-input" 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Group 2: Hero Section */}
                  <div className="dash-form-section" style={{ marginTop: '2rem' }}>
                    <h4>Hero Banner Details</h4>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Hero Upper Badge</label>
                        <input 
                          type="text" 
                          value={config.hero_badge} 
                          onChange={(e) => setConfig({...config, hero_badge: e.target.value})} 
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label>Hero Availability Status</label>
                        <input 
                          type="text" 
                          value={config.hero_status} 
                          onChange={(e) => setConfig({...config, hero_status: e.target.value})} 
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Hero Primary Title</label>
                      <input 
                        type="text" 
                        value={config.hero_title} 
                        onChange={(e) => setConfig({...config, hero_title: e.target.value})} 
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group">
                      <label>Hero Description</label>
                      <textarea 
                        value={config.hero_subtitle} 
                        onChange={(e) => setConfig({...config, hero_subtitle: e.target.value})} 
                        rows="2" 
                        className="form-input"
                      ></textarea>
                    </div>

                    <div className="form-group">
                      <label>Orbit Workspace floating Badge Text</label>
                      <input 
                        type="text" 
                        value={config.hero_badge_text} 
                        onChange={(e) => setConfig({...config, hero_badge_text: e.target.value})} 
                        className="form-input" 
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '1rem' }}>
                      <label>Resume Document (PDF)</label>
                      {(config.resume_url && config.resume_url !== '#' && config.resume_url !== '') ? (
                        <div className="admin-image-preview-container glass-panel">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-blue)' }}>
                            <FileText size={20} />
                            <a href={config.resume_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'underline', fontSize: '0.9rem' }}>
                              View Uploaded Resume PDF
                            </a>
                          </div>
                          <button 
                            type="button" 
                            onClick={async () => {
                              setConfig(prev => ({ ...prev, resume_url: '#' }));
                              if (supabase) {
                                await supabase
                                  .from('portfolio_config')
                                  .upsert({ key: 'resume_url', value: '#' });
                              }
                              showMessage("Resume removed successfully.");
                            }} 
                            className="btn btn-secondary remove-img-btn"
                          >
                            <X size={14} /> Remove Resume
                          </button>
                        </div>
                      ) : (
                        <div 
                          className={`admin-drag-drop-zone glass-panel ${uploadingResume ? 'uploading' : ''}`}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={handleResumeDrop}
                          style={{ padding: '1.75rem 1rem' }}
                        >
                          <input 
                            type="file" 
                            id="resume-upload-input" 
                            accept="application/pdf" 
                            onChange={handleResumeUpload} 
                            style={{ display: 'none' }} 
                          />
                          <label htmlFor="resume-upload-input" className="upload-label-trigger">
                            {uploadingResume ? (
                              <span className="upload-spinner">Uploading PDF...</span>
                            ) : (
                              <>
                                <Plus size={20} style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }} />
                                <span>Drag & drop resume PDF here, or <strong>click to browse</strong></span>
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Supports PDF only</span>
                              </>
                            )}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Group 3: About Section */}
                  <div className="dash-form-section" style={{ marginTop: '2rem' }}>
                    <h4>About Me Section details</h4>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Lead Title Line 1</label>
                        <input 
                          type="text" 
                          value={config.about_lead_1} 
                          onChange={(e) => setConfig({...config, about_lead_1: e.target.value})} 
                          className="form-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label>Lead Title Line 2</label>
                        <input 
                          type="text" 
                          value={config.about_lead_2} 
                          onChange={(e) => setConfig({...config, about_lead_2: e.target.value})} 
                          className="form-input" 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>About Paragraph Narrative</label>
                      <textarea 
                        value={config.about_bio} 
                        onChange={(e) => setConfig({...config, about_bio: e.target.value})} 
                        rows="3" 
                        className="form-input"
                      ></textarea>
                    </div>

                    <div className="form-group-row" style={{ marginTop: '1rem' }}>
                      <div className="form-group">
                        <label>Checklist Point 1</label>
                        <input type="text" value={config.about_check_1} onChange={(e) => setConfig({...config, about_check_1: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Checklist Point 2</label>
                        <input type="text" value={config.about_check_2} onChange={(e) => setConfig({...config, about_check_2: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Checklist Point 3</label>
                        <input type="text" value={config.about_check_3} onChange={(e) => setConfig({...config, about_check_3: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Checklist Point 4</label>
                        <input type="text" value={config.about_check_4} onChange={(e) => setConfig({...config, about_check_4: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>

                  {/* Group 4: Statistics Grid */}
                  <div className="dash-form-section" style={{ marginTop: '2rem' }}>
                    <h4>Statistics Counters (Count up when visible)</h4>
                    {/* Stat 1 & Stat 2 */}
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Stat 1 Value</label>
                        <input type="text" value={config.stat_1_val} onChange={(e) => setConfig({...config, stat_1_val: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 1 Suffix</label>
                        <input type="text" value={config.stat_1_suffix} onChange={(e) => setConfig({...config, stat_1_suffix: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 1 Label</label>
                        <input type="text" value={config.stat_1_label} onChange={(e) => setConfig({...config, stat_1_label: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Stat 2 Value</label>
                        <input type="text" value={config.stat_2_val} onChange={(e) => setConfig({...config, stat_2_val: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 2 Suffix</label>
                        <input type="text" value={config.stat_2_suffix} onChange={(e) => setConfig({...config, stat_2_suffix: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 2 Label</label>
                        <input type="text" value={config.stat_2_label} onChange={(e) => setConfig({...config, stat_2_label: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    {/* Stat 3 & Stat 4 */}
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Stat 3 Value</label>
                        <input type="text" value={config.stat_3_val} onChange={(e) => setConfig({...config, stat_3_val: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 3 Suffix</label>
                        <input type="text" value={config.stat_3_suffix} onChange={(e) => setConfig({...config, stat_3_suffix: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 3 Label</label>
                        <input type="text" value={config.stat_3_label} onChange={(e) => setConfig({...config, stat_3_label: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Stat 4 Value</label>
                        <input type="text" value={config.stat_4_val} onChange={(e) => setConfig({...config, stat_4_val: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 4 Suffix</label>
                        <input type="text" value={config.stat_4_suffix} onChange={(e) => setConfig({...config, stat_4_suffix: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Stat 4 Label</label>
                        <input type="text" value={config.stat_4_label} onChange={(e) => setConfig({...config, stat_4_label: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>

                  {/* Group 5: Contact details */}
                  <div className="dash-form-section" style={{ marginTop: '2rem' }}>
                    <h4>Contact Info & Sockets</h4>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Contact Email</label>
                        <input type="email" value={config.email} onChange={(e) => setConfig({...config, email: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Contact Phone</label>
                        <input type="text" value={config.phone} onChange={(e) => setConfig({...config, phone: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Location</label>
                        <input type="text" value={config.location} onChange={(e) => setConfig({...config, location: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>Response Time Text</label>
                        <input type="text" value={config.contact_response_time} onChange={(e) => setConfig({...config, contact_response_time: e.target.value})} className="form-input" />
                      </div>
                    </div>
                  </div>

                  {/* Group 6: Social Profiles & Sockets Glow */}
                  <div className="dash-form-section" style={{ marginTop: '2rem' }}>
                    <h4>Social Profiles & Sockets Glow</h4>
                    <div className="form-group-row">
                      <div className="form-group">
                        <label>GitHub Profile URL</label>
                        <input type="text" value={config.social_github || ''} onChange={(e) => setConfig({...config, social_github: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>LinkedIn Profile URL</label>
                        <input type="text" value={config.social_linkedin || ''} onChange={(e) => setConfig({...config, social_linkedin: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group-row">
                      <div className="form-group">
                        <label>Instagram Profile URL</label>
                        <input type="text" value={config.social_instagram || ''} onChange={(e) => setConfig({...config, social_instagram: e.target.value})} className="form-input" />
                      </div>
                      <div className="form-group">
                        <label>WhatsApp Link / Number (e.g. https://wa.me/911234567890)</label>
                        <input type="text" value={config.social_whatsapp || ''} onChange={(e) => setConfig({...config, social_whatsapp: e.target.value})} className="form-input" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Social Sockets Glowing Color Hex (e.g. #a855f7 or rgba(168,85,247,0.5))</label>
                      <input type="text" value={config.social_glow_color || ''} onChange={(e) => setConfig({...config, social_glow_color: e.target.value})} placeholder="#a855f7" className="form-input" />
                    </div>
                  </div>

                  {/* Group 7: Footer copyrights */}
                  <div className="dash-form-section" style={{ marginTop: '2rem' }}>
                    <h4>Footer Copyright</h4>
                    <div className="form-group">
                      <label>Footer Copyright text notice</label>
                      <input 
                        type="text" 
                        value={config.footer_copyright} 
                        onChange={(e) => setConfig({...config, footer_copyright: e.target.value})} 
                        className="form-input" 
                      />
                    </div>
                  </div>

                  <button type="submit" disabled={saving} className="btn btn-primary dash-save-btn">
                    <Save size={16} /> {saving ? 'Saving Config...' : 'Save Configuration'}
                  </button>
                </form>
              )}

              {/* Tab 2: Tech Stack CRUD */}
              {activeTab === 'tech' && (
                <div className="dash-crud-layout">
                  <div className="crud-editor">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3>{editingTech ? 'Edit Tech Icon' : 'Add Tech Icon'}</h3>
                      {technologies.length === 0 && (
                        <button 
                          type="button" 
                          onClick={handleSeedDefaultTech} 
                          disabled={seedingTech} 
                          className="btn btn-secondary" 
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                        >
                          <Database size={12} /> {seedingTech ? 'Seeding...' : 'Seed Default 22 Techs'}
                        </button>
                      )}
                    </div>
                    
                    <form onSubmit={handleSaveTech} className="dash-form">
                      <div className="form-group">
                        <label>Technology Name</label>
                        <input 
                          type="text" 
                          required 
                          value={editingTech ? editingTech.name : newTech.name}
                          onChange={(e) => editingTech 
                            ? setEditingTech({...editingTech, name: e.target.value})
                            : setNewTech({...newTech, name: e.target.value})}
                          placeholder="e.g. React" 
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label>Category Group</label>
                        <select 
                          value={editingTech ? editingTech.category : newTech.category}
                          onChange={(e) => editingTech 
                            ? setEditingTech({...editingTech, category: e.target.value})
                            : setNewTech({...newTech, category: e.target.value})}
                          className="form-input form-select"
                        >
                          <option value="Frontend">Frontend</option>
                          <option value="Backend">Backend</option>
                          <option value="AI & Automation">AI & Automation</option>
                          <option value="CMS">CMS</option>
                          <option value="Tools & Others">Tools & Others</option>
                        </select>
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label>Brand Hex Color (e.g. #61dafb)</label>
                          <input 
                            type="text" 
                            required 
                            value={editingTech ? editingTech.color : newTech.color}
                            onChange={(e) => editingTech 
                              ? setEditingTech({...editingTech, color: e.target.value})
                              : setNewTech({...newTech, color: e.target.value})}
                            placeholder="#ffffff" 
                            className="form-input" 
                          />
                        </div>
                        <div className="form-group">
                          <label>Icon Type / Abbr (e.g. Atom, JS, WP, code2, layout, cpu)</label>
                          <input 
                            type="text" 
                            required 
                            value={editingTech ? editingTech.icon_text : newTech.icon_text}
                            onChange={(e) => editingTech 
                              ? setEditingTech({...editingTech, icon_text: e.target.value})
                              : setNewTech({...newTech, icon_text: e.target.value})}
                            placeholder="code2" 
                            className="form-input" 
                          />
                        </div>
                      </div>

                      <div className="crud-form-actions">
                        {editingTech && (
                          <button type="button" onClick={() => setEditingTech(null)} className="btn btn-secondary">
                            <X size={16} /> Cancel
                          </button>
                        )}
                        <button type="submit" disabled={saving} className="btn btn-primary">
                          <Save size={16} /> {saving ? 'Saving...' : 'Save Technology'}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="crud-list">
                    <h3>Technologies Inventory ({technologies.length})</h3>
                    <div className="dash-items-container">
                      {technologies.map((tech) => (
                        <div key={tech.id} className="dash-item-card glass-panel" style={{ borderLeft: `3px solid ${tech.color}` }}>
                          <div>
                            <h5>{tech.name}</h5>
                            <span style={{ fontSize: '0.75rem' }}>{tech.category} &bull; Symbol: {tech.icon_text}</span>
                          </div>
                          <div className="item-card-actions">
                            <button onClick={() => setEditingTech(tech)} className="icon-btn-edit" aria-label="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteTech(tech.id)} className="icon-btn-delete" aria-label="Delete">
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Projects CMS */}
              {activeTab === 'projects' && (
                <div className="dash-crud-layout">
                  <div className="crud-editor">
                    <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                    <form onSubmit={handleSaveProject} className="dash-form">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input 
                          type="text"
                          required
                          value={editingProject ? editingProject.title : newProject.title}
                          onChange={(e) => editingProject 
                            ? setEditingProject({...editingProject, title: e.target.value})
                            : setNewProject({...newProject, title: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label>Category</label>
                          <input 
                            type="text"
                            required
                            value={editingProject ? editingProject.category : newProject.category}
                            onChange={(e) => editingProject 
                              ? setEditingProject({...editingProject, category: e.target.value})
                              : setNewProject({...newProject, category: e.target.value})}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>Visual Interface Mockup</label>
                          <select 
                            value={editingProject ? editingProject.visual_type : newProject.visual_type}
                            onChange={(e) => editingProject 
                              ? setEditingProject({...editingProject, visual_type: e.target.value})
                              : setNewProject({...newProject, visual_type: e.target.value})}
                            className="form-input form-select"
                          >
                            <option value="dashboard">Dashboard Chart Mock</option>
                            <option value="store">Store Grid Mock</option>
                            <option value="editor">IDE Text Editor Mock</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Description</label>
                        <textarea 
                          required
                          value={editingProject ? editingProject.description : newProject.description}
                          onChange={(e) => editingProject 
                            ? setEditingProject({...editingProject, description: e.target.value})
                            : setNewProject({...newProject, description: e.target.value})}
                          rows="3"
                          className="form-input"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label>Tech Stack Summary</label>
                        <input 
                          type="text"
                          value={editingProject ? editingProject.tech_line : newProject.tech_line}
                          onChange={(e) => editingProject 
                            ? setEditingProject({...editingProject, tech_line: e.target.value})
                            : setNewProject({...newProject, tech_line: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Project Thumbnail Cover</label>
                        {(editingProject ? editingProject.image_url : newProject.image_url) ? (
                          <div className="admin-image-preview-container glass-panel">
                            <img 
                              src={editingProject ? editingProject.image_url : newProject.image_url} 
                              alt="Thumbnail Preview" 
                              className="admin-image-preview" 
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                if (editingProject) {
                                  setEditingProject({ ...editingProject, image_url: '' });
                                } else {
                                  setNewProject({ ...newProject, image_url: '' });
                                }
                              }} 
                              className="btn btn-secondary remove-img-btn"
                            >
                              <X size={14} /> Remove Image
                            </button>
                          </div>
                        ) : (
                          <div 
                            className={`admin-drag-drop-zone glass-panel ${uploadingImage ? 'uploading' : ''}`}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleFileDrop}
                          >
                            <input 
                              type="file" 
                              id="thumbnail-upload" 
                              accept="image/*" 
                              onChange={handleFileUpload} 
                              style={{ display: 'none' }} 
                            />
                            <label htmlFor="thumbnail-upload" className="upload-label-trigger">
                              {uploadingImage ? (
                                <span className="upload-spinner">Uploading Image...</span>
                              ) : (
                                <>
                                  <Plus size={24} style={{ color: 'var(--accent-blue)', marginBottom: '0.5rem' }} />
                                  <span>Drag & drop thumbnail here, or <strong>click to browse</strong></span>
                                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Supports PNG, JPG, WEBP</span>
                                </>
                              )}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label>GitHub Code Link</label>
                          <input 
                            type="text"
                            value={editingProject ? editingProject.github_link : newProject.github_link}
                            onChange={(e) => editingProject 
                              ? setEditingProject({...editingProject, github_link: e.target.value})
                              : setNewProject({...newProject, github_link: e.target.value})}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>Live Preview Link</label>
                          <input 
                            type="text"
                            value={editingProject ? editingProject.live_link : newProject.live_link}
                            onChange={(e) => editingProject 
                              ? setEditingProject({...editingProject, live_link: e.target.value})
                              : setNewProject({...newProject, live_link: e.target.value})}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="crud-form-actions">
                        {editingProject && (
                          <button type="button" onClick={() => setEditingProject(null)} className="btn btn-secondary">
                            <X size={16} /> Cancel
                          </button>
                        )}
                        <button type="submit" disabled={saving} className="btn btn-primary">
                          <Save size={16} /> {saving ? 'Saving...' : 'Save Project'}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="crud-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3>Project Inventory</h3>
                      {projects.length === 0 && (
                        <button 
                          type="button" 
                          onClick={handleSeedDefaultProjects} 
                          disabled={seedingProjects} 
                          className="btn btn-secondary" 
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                        >
                          <Database size={12} /> {seedingProjects ? 'Seeding...' : 'Seed Default Projects'}
                        </button>
                      )}
                    </div>
                    <div className="dash-items-container">
                      {projects.map((proj) => (
                        <div key={proj.id} className="dash-item-card glass-panel">
                          <div>
                            <h5>{proj.title}</h5>
                            <span>{proj.category}</span>
                          </div>
                          <div className="item-card-actions">
                            <button onClick={() => setEditingProject(proj)} className="icon-btn-edit" aria-label="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteProject(proj.id)} className="icon-btn-delete" aria-label="Delete">
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Services CMS */}
              {activeTab === 'services' && (
                <div className="dash-crud-layout">
                  <div className="crud-editor">
                    <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
                    <form onSubmit={handleSaveService} className="dash-form">
                      <div className="form-group">
                        <label>Service Name</label>
                        <input 
                          type="text"
                          required
                          value={editingService ? editingService.title : newService.title}
                          onChange={(e) => editingService 
                            ? setEditingService({...editingService, title: e.target.value})
                            : setNewService({...newService, title: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group">
                        <label>Description</label>
                        <textarea 
                          required
                          value={editingService ? editingService.description : newService.description}
                          onChange={(e) => editingService 
                            ? setEditingService({...editingService, description: e.target.value})
                            : setNewService({...newService, description: e.target.value})}
                          rows="3"
                          className="form-input"
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label>Icon Identifier (e.g. globe, cpu, shopping-bag, code, rocket, layout)</label>
                        <input 
                          type="text"
                          required
                          value={editingService ? editingService.icon : newService.icon}
                          onChange={(e) => editingService 
                            ? setEditingService({...editingService, icon: e.target.value})
                            : setNewService({...newService, icon: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="crud-form-actions">
                        {editingService && (
                          <button type="button" onClick={() => setEditingService(null)} className="btn btn-secondary">
                            <X size={16} /> Cancel
                          </button>
                        )}
                        <button type="submit" disabled={saving} className="btn btn-primary">
                          <Save size={16} /> {saving ? 'Saving...' : 'Save Service'}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="crud-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3>Services Inventory</h3>
                      {services.length === 0 && (
                        <button 
                          type="button" 
                          onClick={handleSeedDefaultServices} 
                          disabled={seedingServices} 
                          className="btn btn-secondary" 
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                        >
                          <Database size={12} /> {seedingServices ? 'Seeding...' : 'Seed Default Services'}
                        </button>
                      )}
                    </div>
                    <div className="dash-items-container">
                      {services.map((serv) => (
                        <div key={serv.id} className="dash-item-card glass-panel">
                          <div>
                            <h5>{serv.title}</h5>
                            <span style={{ fontSize: '0.75rem' }}>Icon: {serv.icon}</span>
                          </div>
                          <div className="item-card-actions">
                            <button onClick={() => setEditingService(serv)} className="icon-btn-edit" aria-label="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteService(serv.id)} className="icon-btn-delete" aria-label="Delete">
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Experience CMS */}
              {activeTab === 'experience' && (
                <div className="dash-crud-layout">
                  <div className="crud-editor">
                    <h3>{editingExp ? 'Edit Timeline Role' : 'Add Timeline Role'}</h3>
                    <form onSubmit={handleSaveExp} className="dash-form">
                      <div className="form-group">
                        <label>Job Role</label>
                        <input 
                          type="text"
                          required
                          value={editingExp ? editingExp.role : newExp.role}
                          onChange={(e) => editingExp 
                            ? setEditingExp({...editingExp, role: e.target.value})
                            : setNewExp({...newExp, role: e.target.value})}
                          className="form-input"
                        />
                      </div>

                      <div className="form-group-row">
                        <div className="form-group">
                          <label>Company</label>
                          <input 
                            type="text"
                            required
                            value={editingExp ? editingExp.company : newExp.company}
                            onChange={(e) => editingExp 
                              ? setEditingExp({...editingExp, company: e.target.value})
                              : setNewExp({...newExp, company: e.target.value})}
                            className="form-input"
                          />
                        </div>
                        <div className="form-group">
                          <label>Time Period (e.g. 2024 - Present)</label>
                          <input 
                            type="text"
                            required
                            value={editingExp ? editingExp.period : newExp.period}
                            onChange={(e) => editingExp 
                              ? setEditingExp({...editingExp, period: e.target.value})
                              : setNewExp({...newExp, period: e.target.value})}
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Description Details</label>
                        <textarea 
                          required
                          value={editingExp ? editingExp.description : newExp.description}
                          onChange={(e) => editingExp 
                            ? setEditingExp({...editingExp, description: e.target.value})
                            : setNewExp({...newExp, description: e.target.value})}
                          rows="4"
                          className="form-input"
                        ></textarea>
                      </div>

                      <div className="crud-form-actions">
                        {editingExp && (
                          <button type="button" onClick={() => setEditingExp(null)} className="btn btn-secondary">
                            <X size={16} /> Cancel
                          </button>
                        )}
                        <button type="submit" disabled={saving} className="btn btn-primary">
                          <Save size={16} /> {saving ? 'Saving...' : 'Save Role'}
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="crud-list">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <h3>Experience Timeline</h3>
                      {experience.length === 0 && (
                        <button 
                          type="button" 
                          onClick={handleSeedDefaultExperience} 
                          disabled={seedingExp} 
                          className="btn btn-secondary" 
                          style={{ fontSize: '0.8rem', padding: '0.4rem 0.85rem' }}
                        >
                          <Database size={12} /> {seedingExp ? 'Seeding...' : 'Seed Default Experience'}
                        </button>
                      )}
                    </div>
                    <div className="dash-items-container">
                      {experience.map((exp) => (
                        <div key={exp.id} className="dash-item-card glass-panel">
                          <div>
                            <h5>{exp.role}</h5>
                            <span>{exp.company} ({exp.period})</span>
                          </div>
                          <div className="item-card-actions">
                            <button onClick={() => setEditingExp(exp)} className="icon-btn-edit" aria-label="Edit">
                              <Edit size={16} />
                            </button>
                            <button onClick={() => handleDeleteExp(exp.id)} className="icon-btn-delete" aria-label="Delete">
                              <Trash size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 6: Inbox Messages */}
              {activeTab === 'messages' && (
                <div className="inbox-layout">
                  <h3>Contact Inbox Submissions</h3>
                  <p className="tab-subtitle">View inquiries submitted by portfolio visitors.</p>

                  <div className="inbox-messages-container">
                    {messagesList.length === 0 ? (
                      <div className="inbox-empty">No message submissions found in database.</div>
                    ) : (
                      messagesList.map((msg) => (
                        <div key={msg.id} className="message-item-card glass-panel">
                          <div className="msg-header">
                            <div>
                              <h4>{msg.name}</h4>
                              <a href={`mailto:${msg.email}`}>{msg.email}</a>
                            </div>
                            <span className="msg-date">
                              {new Date(msg.created_at).toLocaleString()}
                            </span>
                          </div>
                          {msg.service && (
                            <div className="msg-badge">
                              Service Requested: <strong>{msg.service}</strong>
                            </div>
                          )}
                          <p className="msg-body">{msg.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
