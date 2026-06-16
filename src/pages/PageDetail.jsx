import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';
import FacilitySidebar from '../components/FacilitySidebar';

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
    content: 'A personal trainer is an individual certified to have a varying degree of knowledge of general fitness involved in exercise prescription and instruction. They motivate clients by setting goals and providing feedback and accountability to clients. Our coaches are internationally certified and dedicated entirely to your success.'
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
    title: 'Spa & Steam Bath',
    img: 'https://taleemthefitnesszone.in/images/facilities/spaa.jpg',
    content: 'Proper refreshment after a workout includes a steam bath and shower. Relax your muscles, speed up recovery, and detoxify your skin in our luxurious spa and steam rooms. Recovery is just as important as the workout itself.'
  },
  'kids': {
    title: 'Specialized Kids Batches',
    img: 'https://taleemthefitnesszone.in/images/facilities/kidsy.jpg',
    content: 'Training in various western dance forms includes Basic, Intermediate, and Advance levels. We provide a fun, safe, and engaging environment for children to learn fitness and dance early in life, ensuring they build healthy habits for their future.'
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
      <div className="public-page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <PublicHeader />
        <div style={{ textAlign: 'center', padding: '120px 20px', flex: 1 }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Page not found</h2>
          <button className="btn-dark" onClick={() => navigate('/')} style={{ marginTop: '20px' }}>Return Home</button>
        </div>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="public-page">
      <PublicHeader />

      {/* Page Banner */}
      <section className="subpage-banner" style={{ backgroundImage: `url(${data.img})` }}>
        <div className="auto-container">
          <h1>{data.title}</h1>
        </div>
      </section>

      {/* 2-Column Section */}
      <section className="page-columns">
        <div className="auto-container">
          <div className="columns-row">
            
            {/* Left Content Column */}
            <div className="left-column">
              <div style={{ position: 'relative', marginBottom: '30px', overflow: 'hidden' }}>
                <img 
                  src={data.img} 
                  alt={data.title}
                  style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }}
                />
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0c1f34', marginBottom: '20px' }}>
                {data.title}
              </h2>
              <div style={{ width: '60px', height: '3px', background: '#CF2026', marginBottom: '25px' }}></div>
              
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: '#555', textAlign: 'justify', marginBottom: '30px' }}>
                {data.content}
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1px dashed #CF2026',
                padding: '30px',
                textAlign: 'center',
                marginTop: '40px'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '15px', color: '#0c1f34' }}>
                  Ready to transform your fitness journey?
                </h3>
                <button 
                  onClick={() => navigate('/login')} 
                  className="btn-red"
                >
                  Join Us Today
                </button>
              </div>
            </div>

            {/* Right Sidebar Column */}
            <div className="right-column">
              <FacilitySidebar />
            </div>

          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
};

export default PageDetail;
