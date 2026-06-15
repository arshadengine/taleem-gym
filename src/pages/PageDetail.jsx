import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const pageData = {
  'strength-training': {
    title: 'Strength Training',
    img: 'https://taleemthefitnesszone.in/images/facilities/111.jpg',
    content: 'Strength training is a type of physical exercise specializing in the use of external weights to induce muscular contraction, which builds the strength, anaerobic endurance, size of skeletal muscles, and bone density. At Taleem Gym, we provide top-of-the-line free weights and guided machines to ensure you get the best out of your workout safely and effectively. Whether you are looking to bulk up or tone down, our expert trainers are here to guide your form.'
  },
  'cardio-workout': {
    title: 'Cardio Workout Session',
    img: 'https://taleemthefitnesszone.in/images/facilities/22.jpg',
    content: 'Cardio or aerobic activities are those which are performed in presence of oxygen and are conducted more than three minutes. They improve coordination and elevate the heart rate quicker. Our cardio section is equipped with the latest treadmills, ellipticals, stair climbers, and spin bikes to get your heart pumping and maximize calorie burn.'
  },
  'crossfit': {
    title: 'CrossFit Workout Session',
    img: 'https://taleemthefitnesszone.in/images/facilities/444.jpg',
    content: 'The high-intensity, multi-joint movements in CrossFit may help you gain muscle strength and stamina. Adding additional weight to your workouts can further increase muscle gain by adding stress to your muscles. Join our dynamic CrossFit community to push your limits, flip tires, swing kettlebells, and participate in daily WODs (Workout of the Day).'
  },
  'body-transformation': {
    title: 'Body Transformation',
    img: 'https://taleemthefitnesszone.in/images/facilities/BT.jpg',
    content: 'Body transformations may vary depending on the goal a person is trying to achieve: it can be weight related (if you want to lose or gain some kilos), muscle mass related, or health related. Our expert trainers craft a 12-week personalized journey just for you, combining exact nutritional plans with calculated progressive overload.'
  },
  'yoga': {
    title: 'Yoga Session',
    img: 'https://taleemthefitnesszone.in/images/facilities/yogas.jpg',
    content: 'Yoga is an old discipline from India. It is both spiritual and physical. Yoga uses breathing techniques, exercise, and meditation. It helps to improve health and happiness. Discover inner peace, enhance your flexibility, and relieve daily stress in our dedicated, sound-proofed Yoga studio under the guidance of our certified yogis.'
  },
  'zumba': {
    title: 'Zumba Session',
    img: 'https://taleemthefitnesszone.in/images/facilities/zumba1.jpg',
    content: 'Aerobic activity which improves cardiovascular endurance, muscular endurance, and coordination in a fun-loving manner. It includes Zumba toning sessions and strong by Zumba. Dance your way to fitness to the beats of high-energy Latin and international music!'
  },
  'bollywood': {
    title: 'Bollywood Session',
    img: 'https://taleemthefitnesszone.in/images/facilities/ambui.jpg',
    content: 'Bollywood dance can range from slow dancing to a more upbeat hip hop style dance. The dancing itself is a fusion of all dance forms. It could be Indian classical, Indian folk dance, belly dancing, jazz, hip hop, and everything else you can imagine. It is a fantastic way to burn calories while having a blast.'
  },
  'trainers': {
    title: 'Certified Trainers',
    img: 'https://taleemthefitnesszone.in/images/facilities/ctt.jpg',
    content: 'A personal trainer is an individual certified to have a varying degree of knowledge of general fitness involved in exercise prescription and instruction. They motivate clients by setting goals and providing feedback and accountability. Our coaches are internationally certified and dedicated entirely to your success.'
  },
  'nutrition': {
    title: 'Nutrition',
    img: 'https://taleemthefitnesszone.in/images/facilities/nutrition.jpg',
    content: 'Nutrition in and out is the most important part of fitness. Proper calculation of macro nutrients (proteins, carbohydrates, fats) and micro nutrients plays a vital role in the recovery of the body. Get a customized, realistic, and tasty diet plan today from our in-house nutritionists.'
  },
  'abs-batch': {
    title: 'Abs Batch',
    img: 'https://taleemthefitnesszone.in/images/facilities/abs.jpg',
    content: 'Your core muscles are the most important muscle group in the body and not just because of the aesthetic value, but also because it provides support to the spine. Join our dedicated 30-minute Abs Batch to chisel your midsection and build functional core strength.'
  },
  'cardio-kickboxing': {
    title: 'Cardio Kickboxing',
    img: 'https://taleemthefitnesszone.in/images/facilities/12.jpg',
    content: 'Historically developed from karate mixed with boxing, it is practiced for self-defense or general fitness. Cardio Kickboxing is a fun-loving activity in which this sport is performed on music beats. Release stress and punch away the calories in this high-octane class.'
  },
  'spa': {
    title: 'Spa & Recovery',
    img: 'https://taleemthefitnesszone.in/images/facilities/spaa.jpg',
    content: 'Proper refreshment after a workout includes a steam bath and shower. Relax your muscles, speed up recovery, and detoxify your skin in our luxurious spa and steam rooms. Recovery is just as important as the workout itself.'
  },
  'kids': {
    title: 'Specialized Kids Batches',
    img: 'https://taleemthefitnesszone.in/images/facilities/kidsy.jpg',
    content: 'Training in various western dance forms includes Basic, Intermediate, and Advance levels. We provide a fun, safe, and engaging environment for children to learn fitness and dance early in life, ensuring they build healthy habits for their future.'
  },
  'about-us': {
    title: 'About Taleem Gym',
    img: 'https://taleemthefitnesszone.in/images/main-slider/gym4.png',
    content: 'Taleem The Fitness Zone is the leading fitness center in Pune, India with world-class health club equipment, gym trainers, group exercise classes, freestyle training & much more. We believe that proper workout, healthy nutrition habits, and needful rest will combine to give you a healthy lifestyle. We are more than just a gym; we are a community of fitness enthusiasts.'
  },
  'director': {
    title: 'Director Desk',
    img: 'https://taleemthefitnesszone.in/images/main-slider/gym3.jpg',
    content: 'Welcome to Taleem Gym! Our vision is to empower individuals to achieve their maximum physical and mental potential. We are dedicated to providing the best facilities and guidance to ensure every member reaches their personal fitness goals. Our commitment is to quality, hygiene, and outstanding customer service.'
  }
};

const PageDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = pageData[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem', fontFamily: 'Inter' }}>
        <h2>Page not found</h2>
        <button className="btn" onClick={() => navigate('/')} style={{ marginTop: '2rem', background: '#1c75bc', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '4px' }}>Return Home</button>
      </div>
    );
  }

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
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} /> GO BACK
        </button>
      </nav>

      {/* Hero Section */}
      <div style={{ 
        marginTop: '70px',
        background: `url(${data.img}) center/cover`,
        padding: '8rem 2rem',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)' }}></div>
        <div style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ color: '#fff', fontSize: '3.5rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '2px' }}>{data.title}</h1>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: '6rem 5%', maxWidth: '900px', margin: '0 auto', background: '#fff', transform: 'translateY(-4rem)', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', position: 'relative', zIndex: 20 }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#1c75bc', marginBottom: '1.5rem' }}>{data.title}</h2>
        <div style={{ width: '60px', height: '4px', background: '#1c75bc', marginBottom: '2rem' }}></div>
        <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: '#555' }}>
          {data.content}
        </p>
        
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Ready to start your journey?</h3>
          <button className="btn" onClick={() => navigate('/login')} style={{ background: '#222', color: '#fff', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: '800', border: 'none', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>JOIN NOW</button>
        </div>
      </div>
      
      {/* Footer */}
      <footer style={{ background: '#111', color: '#666', padding: '2rem', textAlign: 'center', fontSize: '0.85rem' }}>
        &copy; 2024, All Rights Reserved. Design & Developed By TASKAS.
      </footer>
    </div>
  );
};

export default PageDetail;
