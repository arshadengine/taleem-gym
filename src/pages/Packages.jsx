import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const Packages = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gymPackages = [
    { name: 'One Month', price: '1500', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Quarterly', price: '4000', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Half Yearly', price: '5500', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Annual', price: '6999', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] }
  ];

  const zumbaYogaPackages = [
    { name: 'One Month', price: '1000', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Quarterly', price: '2700', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Half Yearly', price: '4500', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Annual', price: '6000', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] }
  ];


  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg)' }}>
        <div className="auto-container">
          <h1>Our Packages</h1>
        </div>
      </section>

      {/* Packages Content */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="auto-container">
          {/* Gym Packages */}
          <div className="sec-title" style={{ marginBottom: '40px' }}>
            <h3>PLANS AND PRICINGS</h3>
            <h2>OUR PACKAGES FOR GYM</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {gymPackages.map((pkg, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #eeeeee',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="price-table"
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(207,32,38,0.12)';
                  e.currentTarget.querySelector('.price-title-box').style.background = '#CF2026';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.03)';
                  e.currentTarget.querySelector('.price-title-box').style.background = '#0c1f34';
                }}
              >
                {/* Title */}
                <div 
                  className="price-title-box"
                  style={{
                    background: '#0c1f34',
                    color: '#ffffff',
                    padding: '20px',
                    textAlign: 'center',
                    transition: 'background 0.3s ease'
                  }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    margin: 0,
                    color: '#ffffff',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    {pkg.name}
                  </h3>
                </div>

                {/* Inner */}
                <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '900',
                    color: '#CF2026',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px'
                  }}>
                    {pkg.price} <span style={{ fontSize: '16px', fontWeight: '700', verticalAlign: 'super' }}>Rs</span>
                  </div>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 30px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ fontSize: '13px', color: '#666' }}>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => navigate('/contact')}
                    style={{
                      background: 'transparent',
                      color: '#0c1f34',
                      border: '2px solid #0c1f34',
                      padding: '8px 20px',
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                    onMouseOver={e => {
                      e.target.style.background = '#CF2026';
                      e.target.style.borderColor = '#CF2026';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseOut={e => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = '#0c1f34';
                      e.target.style.color = '#0c1f34';
                    }}
                  >
                    Order Now
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Zumba & Yoga Packages */}
          <div className="sec-title" style={{ marginBottom: '40px' }}>
            <h3>PLANS AND PRICINGS</h3>
            <h2>OUR PACKAGES FOR ZUMBA AND YOGA</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {zumbaYogaPackages.map((pkg, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  border: '1px solid #eeeeee',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
                  transition: 'all 0.3s ease',
                  position: 'relative'
                }}
                className="price-table"
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(207,32,38,0.12)';
                  e.currentTarget.querySelector('.price-title-box').style.background = '#CF2026';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.03)';
                  e.currentTarget.querySelector('.price-title-box').style.background = '#0c1f34';
                }}
              >
                {/* Title */}
                <div 
                  className="price-title-box"
                  style={{
                    background: '#0c1f34',
                    color: '#ffffff',
                    padding: '20px',
                    textAlign: 'center',
                    transition: 'background 0.3s ease'
                  }}
                >
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    margin: 0,
                    color: '#ffffff',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    {pkg.name}
                  </h3>
                </div>

                {/* Inner */}
                <div style={{ padding: '30px 20px', textAlign: 'center' }}>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '900',
                    color: '#CF2026',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: '20px'
                  }}>
                    {pkg.price} <span style={{ fontSize: '16px', fontWeight: '700', verticalAlign: 'super' }}>Rs</span>
                  </div>

                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 30px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} style={{ fontSize: '13px', color: '#666' }}>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <button 
                    onClick={() => navigate('/contact')}
                    style={{
                      background: 'transparent',
                      color: '#0c1f34',
                      border: '2px solid #0c1f34',
                      padding: '8px 20px',
                      fontSize: '11px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontFamily: 'Montserrat, sans-serif'
                    }}
                    onMouseOver={e => {
                      e.target.style.background = '#CF2026';
                      e.target.style.borderColor = '#CF2026';
                      e.target.style.color = '#ffffff';
                    }}
                    onMouseOut={e => {
                      e.target.style.background = 'transparent';
                      e.target.style.borderColor = '#0c1f34';
                      e.target.style.color = '#0c1f34';
                    }}
                  >
                    Order Now
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default Packages;
