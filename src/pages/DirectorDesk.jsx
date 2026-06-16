import React, { useEffect } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import FacilitySidebar from '../components/FacilitySidebar';

const DirectorDesk = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const directors = [
    {
      name: 'Siddharth Kawade',
      role: 'Fitness Coach & Gym Director',
      age: '21 Years Old',
      bio: 'Siddharth is the driving force behind the athletic and strength training disciplines at Taleem Gym. Certified in advanced fitness coaching and sports science, he designs tailored programs focusing on progressive overload, recovery, and bodybuilding. Siddharth is committed to ensuring every member receives scientific guidance on the gym floor.',
      icon: 'fa-user'
    },
    {
      name: 'Mansi Limbore',
      role: 'Group X Director & Lead Zumba Trainer',
      age: '21 Years Old',
      bio: 'Mansi is a highly-energetic licensed Zumba Fitness instructor and dance choreographer. She directs the Group X studio operations, specialized batches, and aerobic activities. Her classes combine calorie-burning cardio workouts with a fun, dance-party atmosphere, catering to participants of all fitness levels.',
      icon: 'fa-user'
    },
    {
      name: 'Sheetal Kawade',
      role: 'Group X Director & Yoga Specialist',
      age: '43 Years Old',
      bio: 'Sheetal brings over a decade of holistic wellness experience, specializing in traditional Hatha Yoga, Vinyasa flows, and mindfulness meditation. She directs specialized batches for flexibility, yoga therapy, and kids batches, helping members coordinate body, mind, and spirit for a stress-free healthy lifestyle.',
      icon: 'fa-user'
    }
  ];

  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg)' }}>
        <div className="auto-container">
          <h1>Director Desk</h1>
        </div>
      </section>

      {/* 2-Column Section */}
      <section className="page-columns">
        <div className="auto-container">
          <div className="columns-row">
            
            {/* Left Content Column */}
            <div className="left-column">
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0c1f34', marginBottom: '20px' }}>
                MEET OUR DIRECTORS
              </h2>
              <div style={{ width: '60px', height: '3px', background: '#CF2026', marginBottom: '25px' }}></div>
              
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify', marginBottom: '40px' }}>
                At Taleem - The Fitness Zone, our directors lead by example, combining professional certifications, academic background, 
                and extensive training experience. They are committed to transforming lives and ensuring that Taleem remains the most 
                supportive and results-driven fitness club in Pune.
              </p>

              {/* Profiles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {directors.map((dir, idx) => (
                  <div 
                    key={idx}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #eeeeee',
                      padding: '30px',
                      display: 'flex',
                      gap: '25px',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap'
                    }}
                  >
                    {/* Visual Icon Box */}
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: '#0c1f34',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      borderRadius: '0',
                      border: '3px solid #CF2026',
                      flexShrink: 0
                    }}>
                      <i className={`fa ${dir.icon}`}></i>
                    </div>

                    {/* Bio Details */}
                    <div style={{ flex: 1, minWidth: '250px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0c1f34', margin: '0 0 5px 0' }}>
                        {dir.name}
                      </h3>
                      <div style={{
                        display: 'flex',
                        gap: '15px',
                        fontSize: '11px',
                        fontWeight: '700',
                        color: '#CF2026',
                        textTransform: 'uppercase',
                        marginBottom: '15px',
                        fontFamily: 'Montserrat'
                      }}>
                        <span>{dir.role}</span>
                        <span>&bull;</span>
                        <span>{dir.age}</span>
                      </div>
                      <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#555', margin: 0, textAlign: 'justify' }}>
                        {dir.bio}
                      </p>
                    </div>
                  </div>
                ))}
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

export default DirectorDesk;
