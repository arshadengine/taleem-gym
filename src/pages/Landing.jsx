import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import { SplineScene } from '../components/SplineScene';
import { Spotlight } from '../components/Spotlight';

const Landing = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const facilities = [
    { title: 'Strength Training', img: 'https://taleemthefitnesszone.in/images/facilities/111.jpg', desc: 'Specializing in the use of external weights to induce muscular contraction.', slug: 'strength-training' },
    { title: 'Cardio Workout Session', img: 'https://taleemthefitnesszone.in/images/facilities/22.jpg', desc: 'Aerobic activities performed in presence of oxygen and conducted more than three minutes.', slug: 'cardio-workout' },
    { title: 'CrossFit Workout Session', img: 'https://taleemthefitnesszone.in/images/facilities/444.jpg', desc: 'High-intensity, multi-joint movements to gain muscle strength and stamina.', slug: 'crossfit' },
    { title: 'Body Transformation', img: 'https://taleemthefitnesszone.in/images/facilities/BT.jpg', desc: 'Body transformations may vary depending on the goal a person is trying to achieve.', slug: 'body-transformation' },
    { title: 'Yoga Session', img: 'https://taleemthefitnesszone.in/images/facilities/yogas.jpg', desc: 'Old discipline from India. Both spiritual and physical using breathing techniques.', slug: 'yoga' },
    { title: 'Zumba Session', img: 'https://taleemthefitnesszone.in/images/facilities/zumba1.jpg', desc: 'Aerobic activity which improves cardio vascular endurance in a fun loving manner.', slug: 'zumba' },
    { title: 'Bollywood Session', img: 'https://taleemthefitnesszone.in/images/facilities/ambui.jpg', desc: 'Fusion of all dance forms. Indian classical, folk, belly dancing, jazz, and hip hop.', slug: 'bollywood' },
    { title: 'Certified Trainers', img: 'https://taleemthefitnesszone.in/images/facilities/ctt.jpg', desc: 'Motivate clients by setting goals and providing feedback and accountability.', slug: 'trainers' },
    { title: 'Nutrition', img: 'https://taleemthefitnesszone.in/images/facilities/nutrition.jpg', desc: 'Proper calculations of macro and micro nutrients plays a vital role in recovery of body.', slug: 'nutrition' }
  ];

  const packages = [
    { name: 'One Month', price: '1500', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Quarterly', price: '4000', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Half Yearly', price: '5500', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] },
    { name: 'Annual', price: '6999', features: ['2 Days Personal Training', 'Complimentary Group X Activities'] }
  ];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', color: '#333', fontFamily: 'Inter, sans-serif' }}>

      {/* Navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: scrolled ? '#fff' : 'rgba(0,0,0,0.5)',
        boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
        transition: 'all 0.3s ease',
        zIndex: 100, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src="https://taleemthefitnesszone.in/images/logoo.png" alt="Taleem Logo" style={{ height: '50px', filter: scrolled ? 'none' : 'brightness(0) invert(1)', cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)} />
        </div>

        <div className="hide-mobile" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#facilities" style={{ color: scrolled ? '#000' : '#fff', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase', cursor: 'pointer' }}>Facilities</a>
          <a href="#packages" style={{ color: scrolled ? '#000' : '#fff', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', textTransform: 'uppercase', cursor: 'pointer' }}>Packages</a>
          <span onClick={() => navigate('/groupx')} style={{ color: scrolled ? '#000' : '#fff', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer' }}>Group X</span>
          <span onClick={() => navigate('/gallery')} style={{ color: scrolled ? '#000' : '#fff', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', cursor: 'pointer' }}>Gallery</span>
        </div>

        <button
          className="btn"
          style={{
            background: scrolled ? '#1c75bc' : '#fff',
            color: scrolled ? '#fff' : '#000',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontWeight: '800',
            borderRadius: '0.25rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
          onClick={() => navigate('/login')}
        >
          PORTAL LOGIN <ArrowRight size={16} />
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        backgroundImage: 'url(https://taleemthefitnesszone.in/images/main-slider/gym6.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '5%'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)' }}></div>

        <div style={{ position: 'relative', zIndex: 10, color: '#fff', maxWidth: '800px' }}>
          <div style={{ background: 'rgba(28, 117, 188, 0.9)', display: 'inline-block', padding: '10px 20px', borderTopLeftRadius: '20px', borderBottomRightRadius: '20px', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700', letterSpacing: '1px' }}>GET TRANSFORMED IN LESS THAN 6 WEEKS</h3>
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '900', lineHeight: '1.1', textTransform: 'uppercase', marginBottom: '2rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Are you ready to<br />change yourself?
          </h1>
          <button className="btn" style={{ background: '#fff', color: '#1c75bc', border: 'none', padding: '1rem 2rem', fontSize: '1.1rem', fontWeight: '800', borderRadius: '30px' }}>
            <PlayCircle size={20} /> TRY OUT THIS PLAN FOR 3 DAYS
          </button>
        </div>
      </div>

      {/* Interactive 3D Robot Section */}
      <div style={{
        padding: '6rem 5%',
        background: '#0a0a0a',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <Spotlight size={500} color="rgba(255, 255, 255, 0.15)" />
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          maxWidth: '1200px',
          gap: '4rem',
          zIndex: 10,
          position: 'relative'
        }}>
          {/* Text Content */}
          <div style={{
            flex: '1 1 400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '900',
              color: '#ffffff',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
              background: 'linear-gradient(to bottom, #ffffff, #a3a3a3)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Future of <br/>Fitness
            </h2>
            <p style={{
              color: '#a3a3a3',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '2rem',
              maxWidth: '500px'
            }}>
              Experience our state-of-the-art interactive platform. Explore our gym features, virtual tours, and AI-assisted workouts right from your device. Bring your training to life.
            </p>
            <button className="btn" style={{
              background: 'transparent',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '1rem 2rem',
              fontSize: '1rem',
              fontWeight: '800',
              borderRadius: '30px',
              width: 'fit-content'
            }}>
              EXPLORE MORE
            </button>
          </div>

          {/* 3D Robot Scene */}
          <div style={{
            flex: '1 1 400px',
            height: '500px',
            position: 'relative',
            borderRadius: '20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            overflow: 'hidden'
          }}>
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            />
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div id="facilities" style={{ padding: '6rem 5%', background: '#fff' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 style={{ color: '#1c75bc', fontWeight: '800', letterSpacing: '2px', fontSize: '1rem', marginBottom: '0.5rem' }}>OUR FACILITIES</h3>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#222' }}>We offer best trainings to<br />achieve the best results</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {facilities.map((fac, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'} onClick={() => navigate('/page/' + fac.slug)}>
              <div style={{ height: '250px', overflow: 'hidden' }}>
                <img src={fac.img} alt={fac.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: '#222' }}>{fac.title}</h3>
                <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>{fac.desc}</p>
                <div style={{ color: '#1c75bc', fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Read More <ArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Plans & Pricing */}
      <div id="packages" style={{ padding: '6rem 5%', background: '#f9fbfd' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h3 style={{ color: '#1c75bc', fontWeight: '800', letterSpacing: '2px', fontSize: '1rem', marginBottom: '0.5rem' }}>PLANS AND PRICINGS</h3>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#222' }}>CHECK OUT OUR PACKAGES</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {packages.map((pkg, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '10px', borderTop: '5px solid #1c75bc', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }} onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(28,117,188,0.2)' }} onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#222', marginBottom: '1rem' }}>{pkg.name}</h3>
              <div style={{ fontSize: '3rem', fontWeight: '900', color: '#1c75bc', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>₹</span>{pkg.price}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pkg.features.map((feature, j) => (
                  <li key={j} style={{ color: '#666', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="#1c75bc" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', color: '#fff', padding: '5rem 5% 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', borderLeft: '3px solid #1c75bc', paddingLeft: '10px' }}>Contact Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <div style={{ display: 'flex', gap: '1rem' }}><MapPin size={20} color="#1c75bc" style={{ flexShrink: 0 }} /> 3rd floor, Bhadawale heights, shree control chowk, narhe, pune - 411041</div>
              <div style={{ display: 'flex', gap: '1rem' }}><Mail size={20} color="#1c75bc" style={{ flexShrink: 0 }} /> taleemthefitnesszone@gmail.com</div>
              <div style={{ display: 'flex', gap: '1rem' }}><Phone size={20} color="#1c75bc" style={{ flexShrink: 0 }} /> +91-7720803644 <br /> +91-9823893700</div>
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', borderLeft: '3px solid #1c75bc', paddingLeft: '10px' }}>Our Facilities</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', color: '#aaa', fontSize: '0.9rem' }}>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/strength-training')}>Strength Training</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/cardio-workout')}>Cardio Workout</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/crossfit')}>CrossFit</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/body-transformation')}>Body Transformation</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/yoga')}>Yoga Session</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/zumba')}>Zumba Session</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/bollywood')}>Bollywood Session</li>
              <li style={{ cursor: 'pointer' }} onClick={() => navigate('/page/spa')}>Spa</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #333', color: '#666', fontSize: '0.85rem' }}>
          &copy; 2024, All Rights Reserved. Design & Developed By TASKAS.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
