import React from 'react';
import { useNavigate } from 'react-router-dom';
import WhatsAppWidget from './WhatsAppWidget';

const PublicFooter = () => {
  const navigate = useNavigate();

  const navTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const facilitiesCol1 = [
    { name: 'Strength Training', slug: 'strength-training' },
    { name: 'Cardio Workout Session', slug: 'cardio-workout' },
    { name: 'CrossFit Workout Session', slug: 'crossfit' },
    { name: 'Body Transformation', slug: 'body-transformation' },
    { name: 'Yoga Session', slug: 'yoga' },
    { name: 'Zumba Session', slug: 'zumba' },
  ];

  const facilitiesCol2 = [
    { name: 'Bollywood Session', slug: 'bollywood' },
    { name: 'Abs Batch', slug: 'abs-batch' },
    { name: 'Certified Trainers', slug: 'trainers' },
    { name: 'Nutrition', slug: 'nutrition' },
    { name: 'Cardio Kickboxing', slug: 'cardio-kickboxing' },
    { name: 'Spa', slug: 'spa' },
  ];

  return (
    <footer className="public-footer" style={{
      background: '#0c1f34',
      color: '#ffffff',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '14px',
      borderTop: '5px solid #CF2026'
    }}>
      
      {/* Upper Footer: Social Links */}
      <div style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '30px 0'
      }}>
        <div className="auto-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '900',
            color: '#ffffff',
            margin: 0,
            fontFamily: 'Montserrat, sans-serif'
          }}>
            GET <span style={{ color: '#CF2026' }}>IN TOUCH</span>
          </h2>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <a 
              href="https://m.facebook.com/story.php?story_fbid=113069463643270&id=110408740576009" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#CF2026'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a 
              href="https://www.instagram.com/p/B9hB37IniNZ/?igshid=1i2yh7pipd8c2" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
              onMouseOver={e => { e.currentTarget.style.background = '#CF2026'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Lower Footer: Content */}
      <div style={{ padding: '60px 0' }}>
        <div className="auto-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 2fr 1fr',
            gap: '40px'
          }} className="footer-grid">
            
            {/* Contact Us Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                borderLeft: '3px solid #CF2026',
                paddingLeft: '12px',
                marginBottom: '10px',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Contact Us
              </h3>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <li style={{ display: 'flex', gap: '15px' }}>
                  <strong style={{ width: '80px', flexShrink: 0, color: '#CF2026', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', fontSize: '12px' }}>Address</strong>
                  <p style={{ margin: 0, color: '#b9c4cf', fontSize: '13px', lineHeight: '1.6' }}>
                    3rd floor, Bhadawale heights, shree control chowk, above vighnaharta hospital, narhe, pune - 411041
                  </p>
                </li>
                <li style={{ display: 'flex', gap: '15px' }}>
                  <strong style={{ width: '80px', flexShrink: 0, color: '#CF2026', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', fontSize: '12px' }}>Email Id</strong>
                  <a href="mailto:taleemthefitnesszone@gmail.com" style={{ color: '#b9c4cf', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#CF2026'} onMouseOut={e => e.target.style.color = '#b9c4cf'}>
                    taleemthefitnesszone@gmail.com
                  </a>
                </li>
                <li style={{ display: 'flex', gap: '15px' }}>
                  <strong style={{ width: '80px', flexShrink: 0, color: '#CF2026', fontFamily: 'Montserrat, sans-serif', textTransform: 'uppercase', fontSize: '12px' }}>Phone</strong>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <a href="tel:+917720803644" style={{ color: '#b9c4cf', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#CF2026'} onMouseOut={e => e.target.style.color = '#b9c4cf'}>
                      +91-7720803644
                    </a>
                    <a href="tel:+919823893700" style={{ color: '#b9c4cf', fontSize: '13px', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#CF2026'} onMouseOut={e => e.target.style.color = '#b9c4cf'}>
                      +91-9823893700
                    </a>
                  </div>
                </li>
              </ul>
            </div>

            {/* Our Facilities Column */}
            <div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                borderLeft: '3px solid #CF2026',
                paddingLeft: '12px',
                marginBottom: '30px',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Our Facilities
              </h3>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {facilitiesCol1.map((item, idx) => (
                    <li key={idx}>
                      <span 
                        onClick={() => navTo(`/page/${item.slug}`)} 
                        style={{ 
                          color: '#b9c4cf', 
                          cursor: 'pointer', 
                          fontSize: '13px',
                          transition: 'color 0.2s',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseOver={e => e.target.style.color = '#CF2026'}
                        onMouseOut={e => e.target.style.color = '#b9c4cf'}
                      >
                        <i className="fa fa-angle-right" style={{ color: '#CF2026' }}></i> {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {facilitiesCol2.map((item, idx) => (
                    <li key={idx}>
                      <span 
                        onClick={() => navTo(`/page/${item.slug}`)} 
                        style={{ 
                          color: '#b9c4cf', 
                          cursor: 'pointer', 
                          fontSize: '13px',
                          transition: 'color 0.2s',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseOver={e => e.target.style.color = '#CF2026'}
                        onMouseOut={e => e.target.style.color = '#b9c4cf'}
                      >
                        <i className="fa fa-angle-right" style={{ color: '#CF2026' }}></i> {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Copyright Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'flex-start' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#ffffff',
                borderLeft: '3px solid #CF2026',
                paddingLeft: '12px',
                marginBottom: '20px',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                Copyright
              </h3>
              <p style={{ margin: 0, color: '#b9c4cf', fontSize: '13px', lineHeight: '1.6' }}>
                &copy; {new Date().getFullYear()}, All Rights Reserved.
              </p>
              <div style={{ fontSize: '12px', color: '#8899a6', lineHeight: '1.5' }}>
                Design & Developed By 
                <br />
                <span 
                  style={{ 
                    color: '#CF2026', 
                    fontWeight: '700',
                  }}
                >
                  TASKAS.
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating WhatsApp Chat Popup Widget */}
      <WhatsAppWidget />

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default PublicFooter;
