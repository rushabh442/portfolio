import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Globe, Cpu, ShoppingBag, Code2, Rocket, Layout, Sparkles } from 'lucide-react';

const Services = () => {
  const defaultServices = [
    {
      title: 'Web Development',
      description: 'Modern, responsive websites built for performance.',
      icon: 'globe'
    },
    {
      title: 'AI Automation',
      description: 'Automate workflows and integrate AI tools to save time.',
      icon: 'cpu'
    },
    {
      title: 'Shopify Development',
      description: 'Custom Shopify stores that convert and scale your business.',
      icon: 'shopping-bag'
    },
    {
      title: 'WordPress Development',
      description: 'SEO-friendly, fast & scalable WordPress sites.',
      icon: 'code'
    },
    {
      title: 'Landing Pages',
      description: 'High-converting landing pages for products & campaigns.',
      icon: 'rocket'
    },
    {
      title: 'UI/UX Design',
      description: 'Clean, modern & user-friendly design that stands out.',
      icon: 'layout'
    }
  ];

  const [servicesList, setServicesList] = useState(defaultServices);

  useEffect(() => {
    const fetchServices = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setServicesList(data);
        }
      } catch (err) {
        console.error("Error loading services from Supabase:", err);
      }
    };
    fetchServices();
  }, []);

  const getServiceIcon = (iconName) => {
    switch (iconName?.toLowerCase()) {
      case 'globe': return <Globe size={24} />;
      case 'cpu': return <Cpu size={24} />;
      case 'shopping-bag': return <ShoppingBag size={24} />;
      case 'code': return <Code2 size={24} />;
      case 'rocket': return <Rocket size={24} />;
      case 'layout': return <Layout size={24} />;
      default: return <Globe size={24} />;
    }
  };

  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-slide-up">
          <div className="section-subtitle">
            <Sparkles size={14} />
            <span>What I Do</span>
          </div>
          <h2 className="section-title">My Services</h2>
          <div className="section-divider"></div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesList.map((service, idx) => (
            <div 
              key={service.id || idx} 
              className={`service-card glass-panel reveal-slide-up delay-${Math.min((idx % 3 + 1) * 100, 400)}`}
            >
              <div className="service-icon-wrapper">
                {getServiceIcon(service.icon)}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
