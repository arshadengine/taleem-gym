import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Plus, CreditCard, X, Zap } from 'lucide-react';

const Plans = () => {
  const { plans, addPlan } = useGym();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', price: '', duration: '' });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addPlan({
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration)
      });
      setIsModalOpen(false);
      setFormData({ name: '', price: '', duration: '' });
      alert('Plan created successfully!');
    } catch (error) {
      console.error('Error creating plan:', error);
      alert('Failed to create plan: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="animate-fade-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
        <h1 style={{fontSize: '2.5rem', letterSpacing: '0.05em'}}>PLANS</h1>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={18} /> CREATE PLAN
        </button>
      </div>

      <div className="grid-cols-3">
        {plans.map(plan => (
          <div key={plan.id} className="glass-card animate-fade-in" style={{padding: '2rem', borderTop: '4px solid #fff'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
              <div style={{padding: '0.75rem', background: '#fff', borderRadius: '0.5rem', display: 'flex'}}>
                <Zap size={24} color="black" />
              </div>
              <div className="badge badge-info" style={{fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)'}}>
                {plan.durationDays} DAYS
              </div>
            </div>
            <h3 style={{fontSize: '1.5rem', marginBottom: '0.5rem', fontWeight: '800'}}>{plan.name.toUpperCase()}</h3>
            <div style={{fontSize: '3rem', fontWeight: '900', color: '#fff', letterSpacing: '-0.03em'}}>
              ₹{plan.priceInr}
            </div>

            <div style={{marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6'}}>
              • Full Facility Access<br/>
              • Premium Locker Room<br/>
              • Priority Support
            </div>
          </div>
        ))}

      </div>

      {isModalOpen && (
        <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem'}}>
          <div className="glass-card animate-fade-in" style={{width: '100%', maxWidth: '450px', padding: '3rem', background: '#0a0a0a'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem'}}>
              <h2 style={{letterSpacing: '0.1em'}}>NEW PLAN</h2>
              <button className="btn btn-secondary" style={{padding: '0.5rem', border: 'none'}} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label">Plan Name</label>
                <input className="input" placeholder="e.g. ELITE MONTHLY" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="label">Price (₹)</label>
                <input type="number" className="input" placeholder="1500" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
              </div>
              <div className="form-group">
                <label className="label">Duration (Days)</label>
                <input type="number" className="input" placeholder="30" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} required />
              </div>
              
              <div style={{display: 'flex', gap: '1.5rem', marginTop: '2rem'}}>
                <button type="button" className="btn btn-secondary" style={{flex: 1}} onClick={() => setIsModalOpen(false)}>CANCEL</button>
                <button type="submit" className="btn btn-primary" style={{flex: 1}} disabled={isSubmitting}>
                  {isSubmitting ? 'CREATING...' : 'CREATE'}
                </button>

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans;
