import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Clock, ChevronDown } from 'lucide-react';

const PublicHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Track dropdown open states on mobile
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const navTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const facilitiesList = [
    { name: 'Strength Training', slug: 'strength-training' },
    { name: 'Cardio Workout Session', slug: 'cardio-workout' },
    { name: 'CrossFit Workout Session', slug: 'crossfit' },
    { name: 'Body Transformation', slug: 'body-transformation' },
    { name: 'Abs Batch', slug: 'abs-batch' },
    { name: 'Certified Trainers', slug: 'trainers' },
    { name: 'Nutrition', slug: 'nutrition' },
    { name: 'Cardio Kickboxing', slug: 'cardio-kickboxing' },
    { name: 'Spa', slug: 'spa' },
    { name: 'Bollywood Session', slug: 'bollywood' },
  ];

  const groupXList = [
    { name: 'Specialized Zumba Batches', slug: 'zumba' },
    { name: 'Specialized Yoga Batches', slug: 'yoga' },
    { name: 'Specialized Kids Batches', slug: 'kids' },
  ];

  return (
    <header className="public-header" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      background: scrolled ? '#0c1f34' : 'rgba(12, 31, 52, 0.95)',
      boxShadow: scrolled ? '0 2px 15px rgba(0,0,0,0.25)' : 'none',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      transition: 'all 0.3s ease',
      height: '80px',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="auto-container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}>
        
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navTo('/')}>
          <img 
            src="https://taleemthefitnesszone.in/images/logoo.png" 
            alt="Taleem Logo" 
            style={{ 
              height: '55px', 
              width: '110px', 
              objectFit: 'contain',
              transition: 'transform 0.3s ease'
            }} 
            className="logo-img"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hide-mobile" style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          height: '80px'
        }}>
          {/* Home */}
          <span 
            onClick={() => navTo('/')} 
            style={{
              color: location.pathname === '/' ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '10px 0',
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#CF2026'}
            onMouseOut={e => e.target.style.color = location.pathname === '/' ? '#CF2026' : '#ffffff'}
          >
            Home
          </span>

          {/* About us Dropdown */}
          <div className="dropdown-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{
              color: (location.pathname === '/about' || location.pathname === '/director-desk') ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '30px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }} className="nav-dropdown-trigger">
              About us <ChevronDown size={14} />
            </span>
            <div className="dropdown-menu-content" style={{
              position: 'absolute',
              top: '80px',
              left: 0,
              background: '#0c1f34',
              minWidth: '180px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderTop: '3px solid #CF2026',
              display: 'none',
              flexDirection: 'column',
              zIndex: 100
            }}>
              <span onClick={() => navTo('/about')} style={{
                color: '#ffffff',
                padding: '12px 20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: '700',
                cursor: 'pointer',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                transition: 'background 0.2s'
              }} onMouseOver={e => e.target.style.background = '#CF2026'} onMouseOut={e => e.target.style.background = 'transparent'}>About us</span>
              <span onClick={() => navTo('/director-desk')} style={{
                color: '#ffffff',
                padding: '12px 20px',
                fontSize: '12px',
                textTransform: 'uppercase',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }} onMouseOver={e => e.target.style.background = '#CF2026'} onMouseOut={e => e.target.style.background = 'transparent'}>Director Desk</span>
            </div>
          </div>

          {/* Facilities Dropdown */}
          <div className="dropdown-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <span onClick={() => navTo('/facilities')} style={{
              color: (location.pathname === '/facilities' || location.pathname.startsWith('/page/') && facilitiesList.some(f => `/page/${f.slug}` === location.pathname)) ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '30px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }} className="nav-dropdown-trigger">
              Facilities <ChevronDown size={14} />
            </span>
            <div className="dropdown-menu-content" style={{
              position: 'absolute',
              top: '80px',
              left: 0,
              background: '#0c1f34',
              minWidth: '240px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderTop: '3px solid #CF2026',
              display: 'none',
              flexDirection: 'column',
              zIndex: 100
            }}>
              {facilitiesList.map((f, idx) => (
                <span key={idx} onClick={() => navTo(`/page/${f.slug}`)} style={{
                  color: '#ffffff',
                  padding: '10px 20px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderBottom: idx < facilitiesList.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'background 0.2s'
                }} onMouseOver={e => e.target.style.background = '#CF2026'} onMouseOut={e => e.target.style.background = 'transparent'}>{f.name}</span>
              ))}
            </div>
          </div>

          {/* Group X Dropdown */}
          <div className="dropdown-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <span onClick={() => navTo('/groupx')} style={{
              color: (location.pathname === '/groupx' || location.pathname.startsWith('/page/') && groupXList.some(g => `/page/${g.slug}` === location.pathname)) ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '30px 0',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }} className="nav-dropdown-trigger">
              Group X <ChevronDown size={14} />
            </span>
            <div className="dropdown-menu-content" style={{
              position: 'absolute',
              top: '80px',
              left: 0,
              background: '#0c1f34',
              minWidth: '220px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
              borderTop: '3px solid #CF2026',
              display: 'none',
              flexDirection: 'column',
              zIndex: 100
            }}>
              {groupXList.map((g, idx) => (
                <span key={idx} onClick={() => navTo(`/page/${g.slug}`)} style={{
                  color: '#ffffff',
                  padding: '12px 20px',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  cursor: 'pointer',
                  borderBottom: idx < groupXList.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  transition: 'background 0.2s'
                }} onMouseOver={e => e.target.style.background = '#CF2026'} onMouseOut={e => e.target.style.background = 'transparent'}>{g.name}</span>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <span 
            onClick={() => navTo('/gallery')} 
            style={{
              color: location.pathname === '/gallery' ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '10px 0',
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#CF2026'}
            onMouseOut={e => e.target.style.color = location.pathname === '/gallery' ? '#CF2026' : '#ffffff'}
          >
            Gallery
          </span>

          {/* Packages */}
          <span 
            onClick={() => navTo('/packages')} 
            style={{
              color: location.pathname === '/packages' ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '10px 0',
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#CF2026'}
            onMouseOut={e => e.target.style.color = location.pathname === '/packages' ? '#CF2026' : '#ffffff'}
          >
            Packages
          </span>

          {/* Contact */}
          <span 
            onClick={() => navTo('/contact')} 
            style={{
              color: location.pathname === '/contact' ? '#CF2026' : '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '0.5px',
              padding: '10px 0',
              transition: 'color 0.2s'
            }}
            onMouseOver={e => e.target.style.color = '#CF2026'}
            onMouseOut={e => e.target.style.color = location.pathname === '/contact' ? '#CF2026' : '#ffffff'}
          >
            Contact
          </span>

          {/* Portal Login */}
          <button
            onClick={() => navTo('/login')}
            style={{
              background: '#CF2026',
              color: '#ffffff',
              border: 'none',
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              marginLeft: '10px',
              borderRadius: '0',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={e => {
              e.target.style.background = '#ffffff';
              e.target.style.color = '#CF2026';
            }}
            onMouseOut={e => {
              e.target.style.background = '#CF2026';
              e.target.style.color = '#ffffff';
            }}
          >
            Portal Login
          </button>
        </nav>

        {/* Opening Hours Badge (Desktop only) */}
        <div className="hide-mobile" style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '8px 15px',
          color: '#ffffff',
          gap: '8px'
        }}>
          <Clock size={16} color="#CF2026" />
          <div style={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>
            <span style={{ fontWeight: '800', color: '#CF2026' }}>Opening Hours</span>
            <br />
            Mon - Sun 6:00 AM - 10:00 PM
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="show-mobile" style={{ display: 'flex', alignItems: 'center' }}>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

      </div>

      {/* CSS injection for Desktop Hover dropdown effects */}
      <style>{`
        .dropdown-wrapper:hover .dropdown-menu-content {
          display: flex !important;
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .hide-mobile { display: flex !important; }
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* Mobile Sliding Navigation Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#0c1f34',
          zIndex: 999,
          padding: '20px 30px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          borderTop: '2px solid #CF2026'
        }}>
          {/* Home */}
          <div 
            onClick={() => navTo('/')}
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '15px',
              textTransform: 'uppercase',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            Home
          </div>

          {/* About us */}
          <div>
            <div 
              onClick={() => toggleDropdown('about')}
              style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '15px',
                textTransform: 'uppercase',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              About us <ChevronDown size={16} />
            </div>
            {activeDropdown === 'about' && (
              <div style={{ background: 'rgba(0,0,0,0.2)', paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                <span onClick={() => navTo('/about')} style={{ color: '#ccc', padding: '10px 0', fontSize: '13px', textTransform: 'uppercase', fontWeight: '600' }}>About us</span>
                <span onClick={() => navTo('/director-desk')} style={{ color: '#ccc', padding: '10px 0', fontSize: '13px', textTransform: 'uppercase', fontWeight: '600' }}>Director Desk</span>
              </div>
            )}
          </div>

          {/* Facilities */}
          <div>
            <div 
              onClick={() => toggleDropdown('facilities')}
              style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '15px',
                textTransform: 'uppercase',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              Facilities <ChevronDown size={16} />
            </div>
            {activeDropdown === 'facilities' && (
              <div style={{ background: 'rgba(0,0,0,0.2)', paddingLeft: '20px', display: 'flex', flexDirection: 'column', maxHeight: '250px', overflowY: 'auto' }}>
                <span onClick={() => navTo('/facilities')} style={{ color: '#CF2026', padding: '10px 0', fontSize: '13px', textTransform: 'uppercase', fontWeight: '700' }}>All Facilities</span>
                {facilitiesList.map((f, idx) => (
                  <span key={idx} onClick={() => navTo(`/page/${f.slug}`)} style={{ color: '#ccc', padding: '8px 0', fontSize: '13px', textTransform: 'uppercase', fontWeight: '600' }}>{f.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Group X */}
          <div>
            <div 
              onClick={() => toggleDropdown('groupx')}
              style={{
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '15px',
                textTransform: 'uppercase',
                padding: '10px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              Group X <ChevronDown size={16} />
            </div>
            {activeDropdown === 'groupx' && (
              <div style={{ background: 'rgba(0,0,0,0.2)', paddingLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                <span onClick={() => navTo('/groupx')} style={{ color: '#CF2026', padding: '10px 0', fontSize: '13px', textTransform: 'uppercase', fontWeight: '700' }}>Group X Home</span>
                {groupXList.map((g, idx) => (
                  <span key={idx} onClick={() => navTo(`/page/${g.slug}`)} style={{ color: '#ccc', padding: '8px 0', fontSize: '13px', textTransform: 'uppercase', fontWeight: '600' }}>{g.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Gallery */}
          <div 
            onClick={() => navTo('/gallery')}
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '15px',
              textTransform: 'uppercase',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            Gallery
          </div>

          {/* Packages */}
          <div 
            onClick={() => navTo('/packages')}
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '15px',
              textTransform: 'uppercase',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            Packages
          </div>

          {/* Contact */}
          <div 
            onClick={() => navTo('/contact')}
            style={{
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '15px',
              textTransform: 'uppercase',
              padding: '10px 0',
              borderBottom: '1px solid rgba(255,255,255,0.05)'
            }}
          >
            Contact
          </div>

          {/* Opening Hours Badge (Mobile) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px 15px',
            color: '#ffffff',
            gap: '10px',
            marginTop: '10px'
          }}>
            <Clock size={20} color="#CF2026" />
            <div style={{ fontSize: '11px', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>
              <span style={{ fontWeight: '800', color: '#CF2026' }}>Opening Hours</span>
              <br />
              Mon - Sun 6:00 AM - 10:00 PM
            </div>
          </div>

          {/* Portal Login */}
          <button
            onClick={() => navTo('/login')}
            style={{
              background: '#CF2026',
              color: '#ffffff',
              border: 'none',
              padding: '14px 20px',
              fontSize: '14px',
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              cursor: 'pointer',
              marginTop: '15px',
              width: '100%',
              borderRadius: '0'
            }}
          >
            Portal Login
          </button>
        </div>
      )}

    </header>
  );
};

export default PublicHeader;
