import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Services from './components/Services';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Custom Admin Portal Gate
const AdminPage = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="admin-loading-state">Checking session status...</div>;
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  return <AdminDashboard onLogout={() => setSession(null)} />;
};

function App() {
  const [config, setConfig] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-reveal');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    });

    const observeElements = () => {
      const revealElements = document.querySelectorAll('[class*="reveal-"]');
      revealElements.forEach((el) => {
        if (!el.classList.contains('active-reveal')) {
          observer.observe(el);
        }
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchConfig = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase.from('portfolio_config').select('*');
        if (error) throw error;
        
        const configMap = {};
        data.forEach(item => {
          configMap[item.key] = item.value;
        });
        setConfig(configMap);

        // Dynamically update document title and description for SEO
        const brandName = configMap.brand_name || 'Rushya';
        const brandSubtitle = configMap.brand_subtitle || 'Full Stack Developer';
        document.title = `${brandName} | ${brandSubtitle}`;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && configMap.hero_subtitle) {
          metaDesc.setAttribute('content', configMap.hero_subtitle);
        }
      } catch (err) {
        console.error("Error loading configs from Supabase:", err);
      }
    };
    fetchConfig();
  }, []);

  return (
    <Routes>
      {/* Public Home */}
      <Route path="/" element={
        <>
          <Navbar config={config} />
          <main>
            <Hero config={config} />
            <About config={config} />
            <TechStack />
            <Projects />
            <Services />
            <Experience />
            <Contact config={config} />
          </main>
          <Footer config={config} />
        </>
      } />

      {/* Admin Dashboard Control Gate */}
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
