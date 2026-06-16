import React, { useEffect, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending message
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg)' }}>
        <div className="auto-container">
          <h1>Contact us</h1>
        </div>
      </section>

      {/* Contact Main Area */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="auto-container">
          <div className="sec-title">
            <h3>GET IN TOUCH</h3>
            <h2>CONTACT TALEEM GYM</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '50px',
            marginTop: '40px'
          }} className="contact-row">
            
            {/* Left Column: Contact Form */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #eeeeee',
              padding: '40px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '800',
                color: '#0c1f34',
                marginBottom: '10px',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Send Us a Message
              </h3>
              <div style={{ width: '40px', height: '3px', background: '#CF2026', marginBottom: '25px' }}></div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0',
                      outline: 'none',
                      fontSize: '14px',
                      fontFamily: 'Open Sans'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0',
                      outline: 'none',
                      fontSize: '14px',
                      fontFamily: 'Open Sans'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0',
                      outline: 'none',
                      fontSize: '14px',
                      fontFamily: 'Open Sans'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    style={{
                      padding: '12px 15px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0',
                      outline: 'none',
                      fontSize: '14px',
                      fontFamily: 'Open Sans',
                      resize: 'vertical'
                    }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  className="btn-red"
                  style={{ alignSelf: 'flex-start', marginTop: '10px' }}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'success' && (
                  <div style={{ color: '#059669', fontSize: '14px', fontWeight: '700', marginTop: '10px' }}>
                    <i className="fa fa-check-circle"></i> Message sent successfully! We will get back to you soon.
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: Contact Details + Maps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{
                background: '#0c1f34',
                color: '#ffffff',
                padding: '40px',
                borderLeft: '4px solid #CF2026'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#ffffff',
                  marginBottom: '20px',
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  Gym Information
                </h3>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <li style={{ display: 'flex', gap: '15px' }}>
                    <i className="fa fa-map-marker" style={{ color: '#CF2026', fontSize: '20px', marginTop: '3px' }}></i>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', margin: '0 0 5px 0', fontFamily: 'Montserrat' }}>Address</h4>
                      <p style={{ margin: 0, color: '#b9c4cf', fontSize: '13px', lineHeight: '1.5' }}>
                        3rd floor, Bhadawale heights, shree control chowk, above vighnaharta hospital, narhe, pune - 411041
                      </p>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '15px' }}>
                    <i className="fa fa-envelope" style={{ color: '#CF2026', fontSize: '18px', marginTop: '3px' }}></i>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', margin: '0 0 5px 0', fontFamily: 'Montserrat' }}>Email Address</h4>
                      <a href="mailto:taleemthefitnesszone@gmail.com" style={{ color: '#b9c4cf', fontSize: '13px', textDecoration: 'none' }}>
                        taleemthefitnesszone@gmail.com
                      </a>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '15px' }}>
                    <i className="fa fa-phone" style={{ color: '#CF2026', fontSize: '20px', marginTop: '3px' }}></i>
                    <div>
                      <h4 style={{ color: '#ffffff', fontSize: '12px', fontWeight: '800', margin: '0 0 5px 0', fontFamily: 'Montserrat' }}>Phone Numbers</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <a href="tel:+917720803644" style={{ color: '#b9c4cf', fontSize: '13px', textDecoration: 'none' }}>
                          +91-7720803644
                        </a>
                        <a href="tel:+919823893700" style={{ color: '#b9c4cf', fontSize: '13px', textDecoration: 'none' }}>
                          +91-9823893700
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Map Embed */}
              <div style={{ border: '1px solid #eeeeee', background: '#f8fafc', padding: '10px' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236.55314426734793!2d73.82214467972517!3d18.445104510788585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc295733716229f%3A0x24455c472b66a6d1!2sTALEEM%20The%20Fitness%20Zone!5e0!3m2!1sen!2sin!4v1781548494724!5m2!1sen!2sin" 
                  width="100%" 
                  height="260" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Taleem Gym Google Maps Location"
                ></iframe>
              </div>

            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Contact;
