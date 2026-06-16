import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FacilitySidebar = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const facilities = [
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

  const handleNav = (targetSlug) => {
    navigate(`/page/${targetSlug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div style={{
      background: '#f8fafc',
      border: '1px solid #e2e8f0',
      padding: '30px 20px',
      fontFamily: 'Montserrat, sans-serif'
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: '800',
        color: '#0c1f34',
        borderBottom: '2px solid #CF2026',
        paddingBottom: '10px',
        marginBottom: '20px',
        textTransform: 'uppercase'
      }}>
        All Facilities
      </h3>
      
      <ul style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px'
      }}>
        {facilities.map((fac, idx) => {
          const isActive = slug === fac.slug;
          return (
            <li key={idx} style={{ margin: 0 }}>
              <button
                onClick={() => handleNav(fac.slug)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? '#CF2026' : 'transparent',
                  color: isActive ? '#ffffff' : '#334155',
                  border: 'none',
                  padding: '12px 15px',
                  fontSize: '12px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'Montserrat, sans-serif',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                className="sidebar-item-btn"
                onMouseOver={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#0c1f34';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseOut={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#334155';
                  }
                }}
              >
                <span>{fac.name}</span>
                <i className="fa fa-angle-right" style={{ fontSize: '14px' }}></i>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FacilitySidebar;
