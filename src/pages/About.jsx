import React, { useEffect } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import FacilitySidebar from '../components/FacilitySidebar';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg)' }}>
        <div className="auto-container">
          <h1>About us</h1>
        </div>
      </section>

      {/* 2-Column Section */}
      <section className="page-columns">
        <div className="auto-container">
          <div className="columns-row">
            
            {/* Left Content Column */}
            <div className="left-column">
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0c1f34', marginBottom: '20px' }}>
                WELCOME TO TALEEM GYM
              </h2>
              <div style={{ width: '60px', height: '3px', background: '#CF2026', marginBottom: '25px' }}></div>
              
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify', marginBottom: '20px' }}>
                Gym is the only place where you pay to work hard, so make sure you work harder here than any other place. 
                <strong> TALEEM</strong> is the place where you practice to achieve your desired goals. We believe that proper 
                workout, healthy nutrition habits and needful rest will combine to give you a healthy lifestyle and we will make 
                sure you will get proper guidance throughout.
              </p>

              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify', marginBottom: '30px' }}>
                Established as Pune's premier fitness destination, Taleem - The Fitness Zone provides world-class exercise machines, 
                spacious locker areas, customized steam/shower facilities, and specialized studios for group activities. We are 
                dedicated to building a community where everyone, from absolute beginners to professional athletes, feels motivated 
                and supported.
              </p>

              {/* Mission & Vision */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
                <div style={{ background: '#f8fafc', padding: '25px', borderLeft: '3px solid #CF2026' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0c1f34', marginBottom: '10px' }}>OUR MISSION</h3>
                  <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.6' }}>
                    To provide exceptional fitness coaching, scientific nutritional guidance, and top-tier facilities that empower our members to safely and sustainably reach their peak health and physical transformations.
                  </p>
                </div>
                <div style={{ background: '#f8fafc', padding: '25px', borderLeft: '3px solid #0c1f34' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0c1f34', marginBottom: '10px' }}>OUR VISION</h3>
                  <p style={{ fontSize: '13px', color: '#666', margin: 0, lineHeight: '1.6' }}>
                    To inspire a healthier society by making professional fitness mentoring accessible, building a positive community culture, and expanding our footprint as a benchmark of excellence in the fitness industry.
                  </p>
                </div>
              </div>

              {/* Core Values */}
              <div style={{ marginTop: '50px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0c1f34', marginBottom: '15px' }}>OUR CORE VALUES</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#555' }}>
                    <i className="fa fa-check-circle" style={{ color: '#CF2026', marginTop: '4px' }}></i>
                    <div><strong>Scientific Training:</strong> We implement evidence-based workout schedules and tracking techniques to ensure safe progression.</div>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#555' }}>
                    <i className="fa fa-check-circle" style={{ color: '#CF2026', marginTop: '4px' }}></i>
                    <div><strong>Member Inclusivity:</strong> We cultivate a welcoming environment where individuals of all age groups and physical abilities feel comfortable.</div>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: '#555' }}>
                    <i className="fa fa-check-circle" style={{ color: '#CF2026', marginTop: '4px' }}></i>
                    <div><strong>Absolute Hygiene:</strong> We enforce strict standards of cleanliness and sanitation across all gym floors, steam rooms, and shower cubicles.</div>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right Sidebar Column */}
            <div className="right-column">
              <FacilitySidebar />
            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default About;
