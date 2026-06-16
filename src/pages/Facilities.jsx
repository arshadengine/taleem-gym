import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const Facilities = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const facilities = [
    { title: 'Strength Training', img: 'https://taleemthefitnesszone.in/images/facilities/111.jpg', desc: 'Strength training is a type of physical exercise specializing in the use of external weights to induce muscular contraction, which builds the strength, anaerobic endurance, size of skeletal muscles and bone density.', slug: 'strength-training' },
    { title: 'Cardio Workout Session', img: 'https://taleemthefitnesszone.in/images/facilities/22.jpg', desc: 'Cardio or aerobic activities are those which are performed in presence of oxygen and are conducted more than three minutes. They improve coordination and elevate the heart rate quicker.', slug: 'cardio-workout' },
    { title: 'CrossFit Workout Session', img: 'https://taleemthefitnesszone.in/images/facilities/444.jpg', desc: 'The high-intensity, multi-joint movements in CrossFit may help you gain muscle strength and stamina. Adding additional weight to your workouts can further increase muscle gain by adding stress to your muscles.', slug: 'crossfit' },
    { title: 'Body Transformation', img: 'https://taleemthefitnesszone.in/images/facilities/BT.jpg', desc: 'Body transformations may vary depending on the goal a person is trying to achieve: it can be weight related (if you want to lose or gain some kilos), muscle mass related or health related - get fitter, faster or stronger.', slug: 'body-transformation' },
    { title: 'Yoga Session', img: 'https://taleemthefitnesszone.in/images/facilities/yogas.jpg', desc: 'Yoga is an old discipline from India. It is both spiritual and physical. Yoga uses breathing techniques, exercise and meditation. It helps to improve health and happiness.', slug: 'yoga' },
    { title: 'Zumba Session', img: 'https://taleemthefitnesszone.in/images/facilities/zumba1.jpg', desc: 'Aerobic activity which improves cardio vascular endurance, muscular endurance, coordination etc in fun loving manner. It Includes zumba tonning session and strong by zumba.', slug: 'zumba' },
    { title: 'Bollywood Session', img: 'https://taleemthefitnesszone.in/images/facilities/ambui.jpg', desc: 'Bollywood dance can range from slow dancing, to a more upbeat hip hop style dance. The dancing itself is a fusion of all dance forms. It could be Indian classical, folk, belly dancing, jazz, and hip hop.', slug: 'bollywood' },
    { title: 'Abs Batch', img: 'https://taleemthefitnesszone.in/images/facilities/abs.jpg', desc: 'Your core muscles are the most important muscle group in the body and not just because of the aesthetic value but also it provides support to the spine.', slug: 'abs-batch' },
    { title: 'Certified Trainers', img: 'https://taleemthefitnesszone.in/images/facilities/ctt.jpg', desc: 'A personal trainer is an individual certified to have a varying degree of knowledge of general fitness involved in exercise prescription and instruction. They motivate clients by setting goals and providing feedback.', slug: 'trainers' },
    { title: 'Nutrition', img: 'https://taleemthefitnesszone.in/images/facilities/nutrition.jpg', desc: 'Nutrition in and out is the most important part in fitness. Proper calculations of macro nutrients (proteins, carbohydrates, fats) and micro nutrients plays a vital role in recovery of body.', slug: 'nutrition' },
    { title: 'Cardio Kickboxing', img: 'https://taleemthefitnesszone.in/images/facilities/12.jpg', desc: 'Historically developed from karate mixed with boxing is practiced for selfdefence or general fitness. Cardio Kickboxing is fun loving activity performed on music beats.', slug: 'cardio-kickboxing' },
    { title: 'Spa', img: 'https://taleemthefitnesszone.in/images/facilities/spaa.jpg', desc: 'Proper refreshment after workout includes steam bath and shower. A spa is a location where mineral-rich spring water is used to give medicinal baths.', slug: 'spa' }
  ];

  const handleNav = (slug) => {
    navigate(`/page/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: 'url(https://taleemthefitnesszone.in/images/background/page-banner-bg.jpg)' }}>
        <div className="auto-container">
          <h1>Our Facilities</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="auto-container">
          <div className="sec-title">
            <h3>WHAT WE OFFER</h3>
            <h2>OUR SPECIALIZED DEPARTMENTS</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginTop: '40px'
          }}>
            {facilities.map((fac, idx) => (
              <div 
                key={idx}
                style={{
                  background: '#ffffff',
                  boxShadow: '0 5px 20px rgba(0,0,0,0.04)',
                  border: '1px solid #eeeeee',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease'
                }}
                className="facility-card"
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(207,32,38,0.1)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.04)';
                }}
              >
                {/* Image Wrap */}
                <div style={{
                  height: '240px',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer'
                }} onClick={() => handleNav(fac.slug)}>
                  <img 
                    src={fac.img} 
                    alt={fac.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(12,31,52,0.15)',
                  }}></div>
                </div>

                {/* Content */}
                <div style={{
                  padding: '25px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1
                }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '800',
                    color: '#0c1f34',
                    marginBottom: '15px',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    {fac.title}
                  </h3>
                  <p style={{
                    color: '#666',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    marginBottom: '20px',
                    flex: 1,
                    textAlign: 'justify'
                  }}>
                    {fac.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span 
                      onClick={() => handleNav(fac.slug)}
                      style={{
                        color: '#CF2026',
                        fontSize: '11px',
                        fontWeight: '800',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontFamily: 'Montserrat, sans-serif'
                      }}
                    >
                      <i className="fa fa-angle-right" style={{ fontSize: '14px' }}></i> Read More
                    </span>
                  </div>
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

export default Facilities;
