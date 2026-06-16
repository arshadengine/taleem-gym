import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

const Landing = () => {
  const navigate = useNavigate();

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      img: 'https://taleemthefitnesszone.in/images/main-slider/gym6.jpg',
      badge: 'GET TRANSFORMED IN LESS THAN 6 WEEKS',
      title: 'ARE YOU READY TO CHANGE YOURSELVE?',
      btnText: 'TRY OUT THIS PLAN FOR 3 DAYS AND TOTALLY FREE'
    },
    {
      img: 'https://taleemthefitnesszone.in/images/main-slider/gym4.png',
      badge: 'GET FIT IN LESS THAN 6 WEEKS',
      title: 'CHANGE YOURSELVE AND TRY YOUR WORKPUT AT OUR GYM!',
      btnText: 'TRY OUT THIS PLAN FOR 3 DAYS AND TOTALLY FREE'
    },
    {
      img: 'https://taleemthefitnesszone.in/images/main-slider/gym3.jpg',
      isSplit: true,
      col1Badge: 'WORKOUT FOR WOMEN',
      col1Text: 'TAKE A LOOK AT THE FITNESS COURSES',
      col2Badge: 'WORKOUT FOR MEN',
      col2Text: 'CHECK OUT THE 6 WEEKS FITNESS PLAN'
    }
  ];

  // Auto-cycle Hero Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Testimonials State
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: 'Harsha',
      role: 'Artist',
      text: 'Nice gym ..well equipped and well maintained gym.....and good trainers and power team performs well around the globe..',
      img: 'https://taleemthefitnesszone.in/images/testimonials/1.jpg'
    },
    {
      name: 'Pranali',
      role: 'Health physicist',
      text: 'Nice gym ..well equipped and well maintained gym.....and good trainers and power team performs well around the globe..',
      img: 'https://taleemthefitnesszone.in/images/testimonials/2.jpg'
    },
    {
      name: 'Shree',
      role: 'Web Developer',
      text: 'Nice gym ..well equipped and well maintained gym.....and good trainers and power team performs well around the globe..',
      img: 'https://taleemthefitnesszone.in/images/testimonials/3.jpg'
    }
  ];

  // Auto-cycle Testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const featuredServices = [
    { num: '01', title: 'Workout', subtitle: 'PROGRAMME', desc: 'Whether your aim is to loose weight, tone up, build bulk or gain weight we can put together a gym programme.' },
    { num: '02', title: 'Trainers', subtitle: 'With EXPERIANCE', desc: 'Certified Fitness Trainers with Experiance Professionals in Fitness Field' },
    { num: '03', title: 'ATHLETE', subtitle: 'TRAININGS', desc: 'We design our clubs to give you Specialized Trainings for individual in any kind of sport.' },
    { num: '04', title: 'Fitness Courses', subtitle: 'CLUB TIMINGS', desc: 'CFT-Certified fitness Trainer Course and Open All Week Days Except Goverment Holidays.' }
  ];

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


  const scrollImages = [
    'https://taleemthefitnesszone.in/images/resource/scroller-image-4.png',
    'https://taleemthefitnesszone.in/images/resource/scroller-image-5.png',
    'https://taleemthefitnesszone.in/images/resource/scroller-image-6.png'
  ];

  const partners = [
    'https://taleemthefitnesszone.in/images/clients/1.jpeg',
    'https://taleemthefitnesszone.in/images/clients/2.jpeg',
    'https://taleemthefitnesszone.in/images/clients/3.jpeg',
    'https://taleemthefitnesszone.in/images/clients/4.jpeg'
  ];

  const navTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <div className="public-page" style={{ overflowX: 'hidden' }}>
      
      {/* Header */}
      <PublicHeader />

      {/* Hero Slider Section */}
      <section style={{
        position: 'relative',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        background: '#050505',
        marginTop: '80px'
      }}>
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div 
              key={idx}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${slide.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.05)',
                transition: 'opacity 1.5s ease-in-out, transform 1.5s ease-in-out',
                display: 'flex',
                alignItems: 'center',
                zIndex: isActive ? 1 : 0
              }}
            >
              {/* Overlay */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'rgba(12, 31, 52, 0.65)'
              }}></div>

              {/* Slide Content */}
              <div className="auto-container" style={{ position: 'relative', zIndex: 2 }}>
                {!slide.isSplit ? (
                  <div style={{ maxWidth: '800px', textAlign: 'left', paddingLeft: '50px' }}>
                    <div className="anim-fade-up" style={{
                      background: 'rgba(207, 32, 38, 0.95)',
                      color: '#ffffff',
                      display: 'inline-block',
                      padding: '10px 20px',
                      marginBottom: '20px',
                      fontSize: '14px',
                      fontWeight: '800',
                      letterSpacing: '1px',
                      fontFamily: 'Montserrat, sans-serif'
                    }}>
                      {slide.badge}
                    </div>
                    <h2 style={{
                      fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                      fontWeight: '900',
                      color: '#ffffff',
                      lineHeight: '1.1',
                      textTransform: 'uppercase',
                      marginBottom: '30px',
                      textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                      fontFamily: 'Montserrat, sans-serif'
                    }}>
                      {slide.title}
                    </h2>
                    <a href="#packages" className="btn-red" style={{ textDecoration: 'none' }}>
                      <i className="fa fa-play-circle" style={{ fontSize: '18px' }}></i> {slide.btnText}
                    </a>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    width: '100%',
                    flexWrap: 'wrap',
                    gap: '40px',
                    padding: '0 50px'
                  }}>
                    {/* Left Column (Women) */}
                    <div style={{ flex: 1, minWidth: '280px', textAlign: 'left' }}>
                      <div style={{
                        background: 'rgba(207, 32, 38, 0.95)',
                        color: '#ffffff',
                        display: 'inline-block',
                        padding: '10px 20px',
                        marginBottom: '15px',
                        fontSize: '13px',
                        fontWeight: '800',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        {slide.col1Badge}
                      </div>
                      <h3 style={{
                        fontSize: '24px',
                        color: '#ffffff',
                        fontWeight: '900',
                        lineHeight: '1.2',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{slide.col1Text}</h3>
                    </div>
                    {/* Right Column (Men) */}
                    <div style={{ flex: 1, minWidth: '280px', textAlign: 'right' }}>
                      <div style={{
                        background: '#0c1f34',
                        color: '#ffffff',
                        display: 'inline-block',
                        padding: '10px 20px',
                        marginBottom: '15px',
                        fontSize: '13px',
                        fontWeight: '800',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>
                        {slide.col2Badge}
                      </div>
                      <h3 style={{
                        fontSize: '24px',
                        color: '#ffffff',
                        fontWeight: '900',
                        lineHeight: '1.2',
                        fontFamily: 'Montserrat, sans-serif'
                      }}>{slide.col2Text}</h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Slide navigation controls */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: 0, right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          zIndex: 10
        }}>
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: currentSlide === idx ? '#CF2026' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            ></button>
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section style={{
        background: '#0c1f34',
        padding: '0',
        position: 'relative',
        zIndex: 5
      }}>
        <div className="auto-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            borderTop: '1px solid rgba(255,255,255,0.08)'
          }}>
            {featuredServices.map((serv, idx) => (
              <div 
                key={idx}
                style={{
                  padding: '40px 30px',
                  borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  transition: 'background 0.3s ease'
                }}
                className="featured-box"
                onMouseOver={e => e.currentTarget.style.background = '#CF2026'}
                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
              >
                <h2 style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  margin: 0
                }}>
                  <span style={{ fontSize: '40px', fontWeight: '900', color: 'rgba(255,255,255,0.15)' }}>{serv.num}</span>
                  <span style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', lineHeight: '1.2' }}>
                    {serv.title} <br />
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>{serv.subtitle}</span>
                  </span>
                </h2>
                <p style={{ color: '#b9c4cf', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>
                  {serv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome / Curved Section */}
      <section style={{
        padding: '120px 0',
        background: '#ffffff'
      }}>
        <div className="auto-container">
          <div style={{
            display: 'flex',
            gap: '50px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            {/* Left Narrative */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <div style={{ textAlign: 'left', marginBottom: '30px' }}>
                <h3 style={{ color: '#CF2026', fontSize: '16px', fontWeight: '800', letterSpacing: '2px', margin: '0 0 10px 0' }}>WELCOME TO</h3>
                <h2 style={{ fontSize: '46px', fontWeight: '900', color: '#111111', margin: 0, lineHeight: '1.2' }}>
                  Taleem <span style={{ color: '#CF2026', fontSize: '28px', fontWeight: '700', textTransform: 'lowercase' }}>The Fitness Zone</span>
                </h2>
              </div>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.9', marginBottom: '35px', textAlign: 'justify' }}>
                Gym is the only place where you pay to work hard, so make sure you work harder here than any other place. <strong>TALEEM</strong> is the place where you practice to achieve your desired goals. We believe that proper workout, healthy nutrition habits and needful rest will combine to give you a healthy lifestyle and we will make sure you will get proper guidance throughout.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={() => navTo('/facilities')} className="btn-dark">Our Facilities</button>
                <a href="#packages" className="btn-red" style={{ textDecoration: 'none' }}>Check Packages</a>
              </div>
            </div>

            {/* Right Image */}
            <div style={{
              flex: 1,
              minWidth: '300px',
              height: '480px',
              backgroundImage: 'url(https://taleemthefitnesszone.in/images/resource/image-13.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              boxShadow: '0 15px 30px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '30px',
                right: '30px',
                background: '#CF2026',
                color: '#ffffff',
                padding: '15px 25px',
                fontWeight: '900',
                fontSize: '18px',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                TALEEM GYM
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facilities Grid Section */}
      <section style={{
        padding: '80px 0',
        background: '#f9fbfd',
        borderTop: '1px solid #eeeeee'
      }}>
        <div className="auto-container">
          <div className="sec-title">
            <h3>OUR FACILITIES</h3>
            <h2>We offer best trainings to<br />achieve the best results</h2>
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
                }} onClick={() => navTo(`/page/${fac.slug}`)}>
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
                    transition: 'background 0.3s'
                  }} className="img-overlay"></div>
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
                    {fac.desc.length > 180 ? fac.desc.substring(0, 177) + '...' : fac.desc}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <span 
                      onClick={() => navTo(`/page/${fac.slug}`)}
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

      {/* Custom Skewed Banner Section */}
      <section style={{
        position: 'relative',
        width: '100%',
        height: '450px',
        background: '#0c1f34',
        overflow: 'hidden'
      }} className="skewed-banner-section">
        
        {/* 1. Red Block (Left, static, layered on top with high z-index) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '-100px',
          width: 'calc(32% + 100px)',
          height: '100%',
          background: '#CF2026',
          transform: 'skewX(-14deg)',
          transformOrigin: 'top left',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxSizing: 'border-box'
        }} className="banner-red-block">
          <div style={{ 
            transform: 'skewX(14deg)',
            paddingLeft: '100px',
            maxWidth: '300px', 
            textAlign: 'center', 
            color: '#ffffff' 
          }} className="banner-red-content">
            <i className="fa fa-instagram" style={{ fontSize: '36px', marginBottom: '25px', display: 'block' }}></i>
            <p style={{
              fontSize: '14px',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '600',
              lineHeight: '1.8',
              margin: 0
            }}>
              Energy is for Everyone Believe in the power of a motivating group fitness community. We design our clubs to give you the most awesome workouts possible.
            </p>
          </div>
        </div>

        {/* 2. Looping Image Marquee (Base layer, sliding from right to left behind the red block) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          overflow: 'hidden'
        }} className="banner-marquee-container">
          <div style={{
            display: 'flex',
            height: '100%',
            width: 'max-content',
            animation: 'skewedMarquee 30s linear infinite'
          }} className="banner-marquee-track">
            {/* Render 6 sets of the 3 scroll images to ensure enough width for looping */}
            {[
              ...scrollImages,
              ...scrollImages,
              ...scrollImages,
              ...scrollImages,
              ...scrollImages,
              ...scrollImages
            ].map((imgUrl, idx) => (
              <div 
                key={idx}
                style={{
                  width: '420px',
                  height: '100%',
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                  transform: 'skewX(-14deg)',
                  marginRight: '-1px' // flush fit
                }}
                className="banner-marquee-item"
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-20%',
                    width: '140%',
                    height: '100%',
                    backgroundImage: `url(${imgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: 'skewX(14deg)',
                    transformOrigin: 'center'
                  }}
                  className="banner-marquee-img"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CSS for Responsive Design and Keyframes */}
        <style>{`
          @keyframes skewedMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-1260px); /* 3 images * 420px = 1260px */
            }
          }

          @media (max-width: 768px) {
            .skewed-banner-section {
              height: auto !important;
              display: flex;
              flex-direction: column;
            }
            .banner-red-block {
              position: relative !important;
              left: 0 !important;
              width: 100% !important;
              height: 280px !important;
              transform: none !important;
              padding: 40px 20px !important;
            }
            .banner-red-content {
              transform: none !important;
              padding-left: 0 !important;
              max-width: 100% !important;
            }
            .banner-marquee-container {
              position: relative !important;
              width: 100% !important;
              height: auto !important;
            }
            .banner-marquee-track {
              display: grid !important;
              grid-template-columns: 1fr !important;
              width: 100% !important;
              animation: none !important;
            }
            .banner-marquee-item {
              width: 100% !important;
              height: 250px !important;
              transform: none !important;
              margin-right: 0 !important;
              border-bottom: 2px solid #0c1f34;
            }
            .banner-marquee-img {
              left: 0 !important;
              width: 100% !important;
              transform: none !important;
            }
          }
        `}</style>
      </section>

      {/* Packages Section */}
      <section id="packages" style={{
        padding: '80px 0',
        background: '#ffffff'
      }}>
        <div className="auto-container">
          {/* Gym Packages */}
          <div className="sec-title" style={{ marginBottom: '40px' }}>
            <h3>PLANS AND PRICINGS</h3>
            <h2>OUR PACKAGES FOR GYM</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                    onClick={() => navTo('/contact')}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
                    onClick={() => navTo('/contact')}
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

      {/* Testimonials Section */}
      <section style={{
        padding: '80px 0',
        background: '#f9fbfd',
        borderTop: '1px solid #eeeeee',
        borderBottom: '1px solid #eeeeee'
      }}>
        <div className="auto-container">
          <div className="sec-title">
            <h3>OUR TESTIMONIALS</h3>
            <h2>SEE WHAT OUR HAPPY CLIENTS SAYS</h2>
          </div>

          <div style={{
            maxWidth: '700px',
            margin: '40px auto 0 auto',
            background: '#ffffff',
            boxShadow: '0 5px 20px rgba(0,0,0,0.03)',
            border: '1px solid #eeeeee',
            padding: '40px',
            textAlign: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '40px',
              color: 'rgba(207, 32, 38, 0.1)',
              position: 'absolute',
              top: '20px',
              left: '30px'
            }}>
              <i className="fa fa-quote-left"></i>
            </div>
            
            <p style={{
              fontSize: '15px',
              fontStyle: 'italic',
              color: '#555',
              lineHeight: '1.8',
              marginBottom: '30px'
            }}>
              "{testimonials[currentTestimonial].text}"
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <img 
                src={testimonials[currentTestimonial].img} 
                alt={testimonials[currentTestimonial].name}
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid #CF2026'
                }}
              />
              <div style={{ fontSize: '14px', fontFamily: 'Montserrat, sans-serif' }}>
                <span style={{ fontWeight: '800', color: '#0c1f34' }}>{testimonials[currentTestimonial].name}</span>
                <span style={{ color: '#666', fontSize: '12px' }}>, {testimonials[currentTestimonial].role}</span>
              </div>
            </div>

            {/* Pagination dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '30px' }}>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: currentTestimonial === idx ? '#CF2026' : '#dddddd',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos / Partners */}
      <section style={{ padding: '60px 0 80px 0', background: '#ffffff', overflow: 'hidden' }}>
        {/* Title container stays centered */}
        <div className="auto-container" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#0c1f34',
            margin: 0,
            fontFamily: 'Montserrat, sans-serif'
          }}>
            GYM & STUDIO <span style={{ color: '#CF2026' }}>FRIENDS AND PARTNERS</span>
          </h2>
        </div>
        
        {/* Full-width Marquee Container (Outside auto-container) */}
        <div className="partners-marquee-container" style={{
          overflow: 'hidden',
          width: '100%',
          position: 'relative'
        }}>
          <div className="partners-marquee-track" style={{
            display: 'flex',
            width: 'max-content',
            animation: 'partnersMarquee 45s linear infinite',
            gap: '80px',
            padding: '15px 0'
          }}>
            {/* First half */}
            {[...partners, ...partners, ...partners, ...partners].map((img, idx) => (
              <img 
                key={`p1-${idx}`}
                src={img} 
                alt={`Partner ${idx + 1}`}
                style={{
                  height: '70px',
                  width: '160px',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ))}
            {/* Second half for seamless loop */}
            {[...partners, ...partners, ...partners, ...partners].map((img, idx) => (
              <img 
                key={`p2-${idx}`}
                src={img} 
                alt={`Partner ${idx + 1}`}
                style={{
                  height: '70px',
                  width: '160px',
                  objectFit: 'contain',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>
        </div>
        
        <style>{`
          @keyframes partnersMarquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .partners-marquee-container:hover .partners-marquee-track {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Footer */}
      <PublicFooter />

    </div>
  );
};

export default Landing;
