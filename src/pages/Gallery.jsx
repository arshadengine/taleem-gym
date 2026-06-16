import React, { useEffect, useState } from 'react';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const Gallery = () => {
  const [filter, setFilter] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = [
    { id: 1, category: 'endurance', img: 'https://taleemthefitnesszone.in/images/gallery/1.jpg', thumb: 'https://taleemthefitnesszone.in/images/gallery/1.jpg' },
    { id: 2, category: 'endurance', img: 'https://taleemthefitnesszone.in/images/gallery/2.jpg', thumb: 'https://taleemthefitnesszone.in/images/gallery/2.jpg' },
    { id: 3, category: 'flexibility', img: 'https://taleemthefitnesszone.in/images/gallery/3.jpg', thumb: 'https://taleemthefitnesszone.in/images/gallery/3.jpg' },
    { id: 4, category: 'flexibility', img: 'https://taleemthefitnesszone.in/images/gallery/4.jpg', thumb: 'https://taleemthefitnesszone.in/images/gallery/4.jpg' },
    { id: 5, category: 'agility', img: 'https://taleemthefitnesszone.in/images/gallery/5.jpg', thumb: 'https://taleemthefitnesszone.in/images/gallery/5.jpg' },
    { id: 6, category: 'agility', img: 'https://taleemthefitnesszone.in/images/gallery/6.jpg', thumb: 'https://taleemthefitnesszone.in/images/gallery/6.jpg' },
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg)' }}>
        <div className="auto-container">
          <h1>Our Gallery</h1>
        </div>
      </section>

      {/* Gallery Main Area */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="auto-container">
          <div className="sec-title">
            <h3>OUR GALLERY</h3>
            <h2>SEE OUR EXERCISE</h2>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {['all', 'endurance', 'flexibility', 'agility'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  background: filter === cat ? '#CF2026' : '#0c1f34',
                  color: '#ffffff',
                  border: 'none',
                  padding: '10px 24px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '1px',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  if (filter !== cat) {
                    e.currentTarget.style.background = '#CF2026';
                  }
                }}
                onMouseOut={e => {
                  if (filter !== cat) {
                    e.currentTarget.style.background = '#0c1f34';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  aspectRatio: '4/3',
                  border: '1px solid #eeeeee',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                }}
                className="gallery-item-container"
                onClick={() => setLightboxImg(item.img)}
              >
                <img 
                  src={item.thumb} 
                  alt={`Exercise ${item.id}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                  className="gallery-img"
                />
                
                {/* Hover Overlay */}
                <div className="gallery-hover-overlay" style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  background: 'rgba(207, 32, 38, 0.85)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  color: '#ffffff'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <i className="fa fa-search" style={{ fontSize: '28px', marginBottom: '10px' }}></i>
                    <h3 style={{
                      margin: 0, 
                      color: '#ffffff', 
                      fontSize: '14px', 
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      fontFamily: 'Montserrat'
                    }}>{item.category}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Inline styles for hover effects */}
      <style>{`
        .gallery-item-container:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
        .gallery-item-container:hover .gallery-img {
          transform: scale(1.1) !important;
        }
      `}</style>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(5, 15, 26, 0.95)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <button 
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '40px',
              cursor: 'pointer'
            }}
          >
            &times;
          </button>
          
          <img 
            src={lightboxImg} 
            alt="Lightbox Zoomed" 
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              border: '5px solid #ffffff'
            }}
          />
        </div>
      )}

      <PublicFooter />
    </div>
  );
};

export default Gallery;
