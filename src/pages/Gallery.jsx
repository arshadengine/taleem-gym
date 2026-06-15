import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Gallery = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = [
    'https://taleemthefitnesszone.in/images/gallery/1.jpg',
    'https://taleemthefitnesszone.in/images/gallery/2.jpg',
    'https://taleemthefitnesszone.in/images/gallery/3.jpg',
    'https://taleemthefitnesszone.in/images/gallery/4.jpg',
    'https://taleemthefitnesszone.in/images/gallery/5.jpg',
    'https://taleemthefitnesszone.in/images/gallery/6.jpg'
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
          <h1 style={{ color: '#fff', fontSize: '3rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>Our Gallery</h1>
          <p style={{ color: '#ccc', marginTop: '1rem', fontSize: '1.2rem' }}>See Our Exercise In Action</p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div style={{ padding: '4rem 5%', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {images.map((img, i) => (
            <div key={i} style={{ 
              borderRadius: '10px', 
              overflow: 'hidden', 
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
              aspectRatio: '4/3',
              cursor: 'pointer'
            }}>
              <img src={img} alt={`Gallery Image ${i+1}`} style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                transition: 'transform 0.4s ease'
              }} 
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} 
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} 
              onClick={() => window.open(img, '_blank')}
              />
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

export default Gallery;
