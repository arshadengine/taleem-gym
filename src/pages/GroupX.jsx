import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const GroupX = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const groups = [
    { title: 'Specialized Zumba Batches', img: 'https://taleemthefitnesszone.in/images/facilities/zumba1.jpg', desc: 'There are several different kinds of Zumba classes, from Group X Zumba workouts to classes like Zumba Toning that incorporate weights for additional calorie burning and strength training.', slug: 'zumba' },
    { title: 'Specialized Yoga Batches', img: 'https://taleemthefitnesszone.in/images/facilities/yogas.jpg', desc: 'Yoga is an old discipline from India. It is both spiritual and physical. Yoga uses breathing techniques, exercise and meditation. It helps to improve health and happiness.', slug: 'yoga' },
    { title: 'Specialized Kids Batches', img: 'https://taleemthefitnesszone.in/images/facilities/kidsy.jpg', desc: 'Training in various western dance form includes Basic Intermediate and Advance level.', slug: 'kids' }
  ];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ 
        position: 'fixed', top: 0, left: 0, right: 0, 
        background: '#fff', 
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        zIndex: 100, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="https://taleemthefitnesszone.in/images/logoo.png" alt="Taleem Logo" style={{ height: '40px' }} />
        </div>
        
        <button 
          className="btn" 
          style={{ 
            background: '#1c75bc', 
            color: '#fff', 
            border: 'none', 
            padding: '0.5rem 1rem',
            fontWeight: '800',
            borderRadius: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }} 
          onClick={() => navigate('/')}
        >
          <ArrowLeft size={16} /> BACK TO HOME
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        marginTop: '70px',
        background: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg) center/cover',
        padding: '6rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)' }}></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>GROUP X STUDIO</h1>
        </div>
      </div>

      {/* Group Grid */}
      <div style={{ padding: '6rem 5%', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 style={{ color: '#1c75bc', fontWeight: '800', letterSpacing: '2px', fontSize: '1rem', marginBottom: '0.5rem' }}>OUR FACILITIES</h3>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#222' }}>We offer best trainings to<br/>achieve the best results</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {groups.map((group, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'} onClick={() => navigate('/page/' + group.slug)}>
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img src={group.img} alt={group.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#222' }}>{group.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{group.desc}</p>
                <div style={{ color: '#1c75bc', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer style={{ background: '#111', color: '#666', padding: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
        &copy; 2024, All Rights Reserved. Design & Developed By TASKAS.
      </footer>
    </div>
  );
};

export default GroupX;
