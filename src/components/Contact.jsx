import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Mail, MapPin, Phone, Clock, Send, CheckCircle, MessageSquare } from 'lucide-react';

const Contact = ({ config = {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbServices, setDbServices] = useState([]);

  useEffect(() => {
    const fetchServicesList = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('order_index', { ascending: true });
        
        if (error) throw error;
        if (data && data.length > 0) {
          setDbServices(data);
        }
      } catch (err) {
        console.error("Error loading services for contact dropdown:", err);
      }
    };
    fetchServicesList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    
    if (supabase) {
      try {
        const { error } = await supabase
          .from('messages')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              service: formData.service || null,
              message: formData.message
            }
          ]);
          
        if (error) throw error;
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: '', message: '' });
      } catch (err) {
        console.error("Failed to submit to Supabase:", err.message);
        alert("Submission failed. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', service: '', message: '' });
      }, 1200);
    }
  };

  const mailLink = config.email || 'hello@rvdigitalstudio.com';
  const phoneVal = config.phone || '+91 12345 67890';
  const locationVal = config.location || 'India';
  const responseTimeVal = config.contact_response_time || 'Within 24 Hours';

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal-slide-up">
          <div className="section-subtitle">
            <MessageSquare size={14} />
            <span>Connect</span>
          </div>
          <h2 className="section-title">Let's Work Together</h2>
          <div className="section-divider"></div>
        </div>

        <div className="contact-grid">
          {/* Contact Details Column */}
          <div className="contact-info reveal-slide-left">
            <h3 className="contact-info-title">Let's Build Something <br />Amazing Together.</h3>
            <p className="contact-info-desc">
              Have a project in mind? Let's discuss how I can help you bring your ideas to life. I specialize in high-performance web systems and AI automations.
            </p>

            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Mail size={16} />
                </div>
                <div>
                  <span className="contact-detail-label">Email Me</span>
                  <a href={`mailto:${mailLink}`} className="contact-detail-value">{mailLink}</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Phone size={16} />
                </div>
                <div>
                  <span className="contact-detail-label">Call / WhatsApp</span>
                  <a href={`tel:${phoneVal.replace(/\s+/g, '')}`} className="contact-detail-value">{phoneVal}</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <MapPin size={16} />
                </div>
                <div>
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">{locationVal}</span>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <Clock size={16} />
                </div>
                <div>
                  <span className="contact-detail-label">Response Time</span>
                  <span className="contact-detail-value">{responseTimeVal}</span>
                </div>
              </div>
            </div>

            {/* Contact details list ends here */}
          </div>

          {/* Contact Form Column */}
          <div className="contact-form-container reveal-slide-right delay-200">
            {isSubmitted ? (
              <div className="contact-success-state glass-panel">
                <CheckCircle size={48} className="success-icon" />
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully. I will get back to you shortly.</p>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-primary success-btn">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form glass-panel">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Select Service</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="form-input form-select"
                  >
                    <option value="">Choose Service</option>
                    {dbServices.length > 0 ? (
                      dbServices.map((serv) => (
                        <option key={serv.id} value={serv.title}>{serv.title}</option>
                      ))
                    ) : (
                      <>
                        <option value="Web Development">Web Development</option>
                        <option value="AI Automation">AI Automation</option>
                        <option value="Shopify Development">Shopify Development</option>
                        <option value="WordPress Development">WordPress Development</option>
                        <option value="Landing Pages">Landing Pages</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    placeholder="Tell me about your project..."
                    className="form-input text-area"
                  ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary form-submit-btn">
                  {isSubmitting ? 'Sending...' : <>Send Message <Send size={16} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
