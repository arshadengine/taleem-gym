import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGym } from '../context/GymContext';
import { Dumbbell, Lock, Phone, User, Hash, Clock, CheckCircle } from 'lucide-react';

const STANDARD_SLOTS = [
  "6:00 AM to 8:00 AM",
  "8:00 AM to 10:00 AM",
  "10:00 AM to 12:00 PM",
  "12:00 PM to 2:00 PM",
  "2:00 PM to 4:00 PM",
  "4:00 PM to 6:00 PM",
  "6:00 PM to 8:00 PM",
  "8:00 PM to 10:00 PM"
];

const Login = () => {
  const [activeTab, setActiveTab] = useState('member'); // 'member', 'staff', 'admin'
  const [isSignup, setIsSignup] = useState(false); // Only for staff
  
  // Login fields
  const [phone, setPhone] = useState('');
  const [memberId, setMemberId] = useState(''); // For members
  const [password, setPassword] = useState(''); // For admin and staff login
  
  // Staff Signup fields
  const [signUpName, setSignUpName] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  
  // Custom slot time entry
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const [error, setError] = useState('');
  const { members, staff, signUpStaff } = useGym();
  const navigate = useNavigate();

  const formatTimeTo12Hour = (timeStr) => {
    if (!timeStr) return '';
    const [hourStr, minStr] = timeStr.split(':');
    let hour = parseInt(hourStr, 10);
    const min = minStr;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12;
    hour = hour ? hour : 12;
    return `${hour}:${min} ${ampm}`;
  };

  const handleAddCustomSlot = (e) => {
    e.preventDefault();
    if (!customStart || !customEnd) {
      alert('Please enter both Start and End times.');
      return;
    }
    const formattedStart = formatTimeTo12Hour(customStart);
    const formattedEnd = formatTimeTo12Hour(customEnd);
    const newSlot = `${formattedStart} to ${formattedEnd}`;
    if (!selectedSlots.includes(newSlot)) {
      setSelectedSlots([...selectedSlots, newSlot]);
    }
    setCustomStart('');
    setCustomEnd('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'admin') {
      if (phone === 'admin' && password === 'admin123') {
        localStorage.setItem('gym_user', JSON.stringify({ role: 'admin', name: 'Administrator' }));
        window.location.href = '/admin';
      } else {
        setError('Invalid admin credentials');
      }
    } else if (activeTab === 'staff') {
      const staffMember = staff.find(s => s.phoneNumber === phone && s.password === password);
      if (staffMember) {
        localStorage.setItem('gym_user', JSON.stringify({ role: 'staff', ...staffMember }));
        window.location.href = '/staff';
      } else {
        setError('Invalid staff phone number or password');
      }
    } else {
      const member = members.find(m => m.phoneNumber === phone && m.id === memberId);
      if (member) {
        localStorage.setItem('gym_user', JSON.stringify({ role: 'member', ...member }));
        window.location.href = '/member';
      } else {
        setError('Invalid phone or member ID');
      }
    }
  };

  const handleStaffSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (signUpPassword !== signUpConfirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (selectedSlots.length === 0) {
      setError('Please select at least one slot');
      return;
    }

    const phoneExists = staff.find(s => s.phoneNumber === signUpPhone);
    if (phoneExists) {
      setError('A staff member with this phone number already exists');
      return;
    }

    try {
      const sid = await signUpStaff({
        name: signUpName,
        phoneNumber: signUpPhone,
        password: signUpPassword,
        slots: selectedSlots
      });
      alert(`Staff registered successfully! Your ID is: ${sid}`);
      setPhone(signUpPhone);
      setPassword('');
      setIsSignup(false);
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  const handleSlotToggle = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  return (
    <div className="app-container" style={{justifyContent: 'center', alignItems: 'center', background: '#000000', padding: '2rem 1rem'}}>
      <div className="mobile-container" style={{maxWidth: isSignup ? '550px' : '480px', padding: '1rem 0'}}>
        <div className="glass-card animate-fade-in" style={{padding: '2.5rem 2rem', background: '#0a0a0a', border: '1px solid #1a1a1a'}}>
          <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
            <div style={{width: '64px', height: '64px', background: '#ffffff', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'}}>
              <Dumbbell color="black" size={32} />
            </div>
            <h1 style={{fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '0.1em'}}>TALEEM GYM</h1>
            <p style={{color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '800'}}>Performance & Aesthetics</p>
          </div>

          {/* Role Navigation Tabs */}
          <div style={{display: 'flex', background: '#050505', borderRadius: '0.5rem', padding: '0.25rem', marginBottom: '2rem', border: '1px solid #111', gap: '0.25rem'}}>
            <button 
              className="btn" 
              style={{flex: 1, background: activeTab === 'member' ? '#111' : 'transparent', border: 'none', color: activeTab === 'member' ? '#fff' : '#555', fontSize: '0.65rem', padding: '0.5rem 0.25rem'}}
              onClick={() => { setActiveTab('member'); setIsSignup(false); setError(''); }}
            >
              Member
            </button>
            <button 
              className="btn" 
              style={{flex: 1, background: activeTab === 'staff' ? '#111' : 'transparent', border: 'none', color: activeTab === 'staff' ? '#fff' : '#555', fontSize: '0.65rem', padding: '0.5rem 0.25rem'}}
              onClick={() => { setActiveTab('staff'); setIsSignup(false); setError(''); }}
            >
              Staff
            </button>
            <button 
              className="btn" 
              style={{flex: 1, background: activeTab === 'admin' ? '#111' : 'transparent', border: 'none', color: activeTab === 'admin' ? '#fff' : '#555', fontSize: '0.65rem', padding: '0.5rem 0.25rem'}}
              onClick={() => { setActiveTab('admin'); setIsSignup(false); setError(''); }}
            >
              Admin
            </button>
          </div>

          {/* Render Staff Signup Form */}
          {activeTab === 'staff' && isSignup ? (
            <form onSubmit={handleStaffSignup}>
              <h3 style={{fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1.5rem', textAlign: 'center'}}>STAFF REGISTRATION</h3>
              
              <div className="form-group">
                <label className="label">Full Name</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}}>
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder="Enter full name"
                    style={{paddingLeft: '3rem'}}
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Phone Number</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}}>
                    <Phone size={18} />
                  </div>
                  <input 
                    type="tel" 
                    className="input" 
                    placeholder="Enter phone number"
                    style={{paddingLeft: '3rem'}}
                    value={signUpPhone}
                    onChange={(e) => setSignUpPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Password</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}}>
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    className="input" 
                    placeholder="Create password"
                    style={{paddingLeft: '3rem'}}
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">Confirm Password</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}}>
                    <Lock size={18} />
                  </div>
                  <input 
                    type="password" 
                    className="input" 
                    placeholder="Confirm password"
                    style={{paddingLeft: '3rem'}}
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Working Hours Slots Selection */}
              <div className="form-group" style={{marginBottom: '2rem'}}>
                <label className="label" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <Clock size={16} /> Select Working Slots
                </label>
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))', 
                  gap: '0.75rem', 
                  maxHeight: '200px', 
                  overflowY: 'auto',
                  padding: '0.5rem',
                  background: '#050505',
                  borderRadius: '0.5rem',
                  border: '1px solid #111',
                  marginBottom: '1rem'
                }}>
                  {[...new Set([...STANDARD_SLOTS, ...selectedSlots])].map((slot) => {
                    const isChecked = selectedSlots.includes(slot);
                    return (
                      <div 
                        key={slot}
                        onClick={() => handleSlotToggle(slot)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.75rem',
                          background: isChecked ? 'rgba(255,255,255,0.05)' : 'transparent',
                          border: isChecked ? '1px solid #fff' : '1px solid #222',
                          borderRadius: '0.4rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontSize: '0.75rem',
                          fontWeight: isChecked ? '700' : '400',
                          color: isChecked ? '#fff' : 'var(--text-muted)'
                        }}
                      >
                        <span style={{flex: 1}}>{slot}</span>
                        {isChecked && <CheckCircle size={14} color="#fff" />}
                      </div>
                    );
                  })}
                </div>

                {/* Custom Slot Time Entry */}
                <div style={{
                  background: '#050505',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #111',
                  marginTop: '0.5rem'
                }}>
                  <div style={{fontSize: '0.7rem', color: 'var(--text-dim)', marginBottom: '0.5rem', fontWeight: '800', letterSpacing: '0.05em'}}>ADD CUSTOM WORK HOURS:</div>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap'}}>
                    <input 
                      type="time" 
                      className="input" 
                      style={{flex: 1, minWidth: '100px', padding: '0.4rem', fontSize: '0.8rem', background: '#000', border: '1px solid #222'}} 
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                    />
                    <span style={{color: 'var(--text-dim)', fontSize: '0.75rem'}}>to</span>
                    <input 
                      type="time" 
                      className="input" 
                      style={{flex: 1, minWidth: '100px', padding: '0.4rem', fontSize: '0.8rem', background: '#000', border: '1px solid #222'}} 
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{width: 'auto', padding: '0.4rem 1rem', fontSize: '0.7rem', border: '1px solid #333'}}
                      onClick={handleAddCustomSlot}
                    >
                      Add Custom
                    </button>
                  </div>
                </div>
              </div>

              {error && <p style={{color: 'var(--danger)', fontSize: '0.75rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '700', textTransform: 'uppercase'}}>{error}</p>}

              <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '1.25rem'}}>
                Register as Staff
              </button>

              <p style={{textAlign: 'center', fontSize: '0.75rem', marginTop: '1.5rem', color: 'var(--text-dim)'}}>
                Already have an account?{' '}
                <span 
                  style={{color: '#fff', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline'}}
                  onClick={() => { setIsSignup(false); setError(''); }}
                >
                  Log In
                </span>
              </p>
            </form>
          ) : (
            /* Login Form */
            <form onSubmit={handleLogin}>
              <form-title style={{display: 'none'}}>Login</form-title>
              <div className="form-group">
                <label className="label">{activeTab === 'admin' ? 'Username' : 'Phone Number'}</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}}>
                    {activeTab === 'admin' ? <User size={18} /> : <Phone size={18} />}
                  </div>
                  <input 
                    type="text" 
                    className="input" 
                    placeholder={activeTab === 'admin' ? 'Enter admin username' : 'Registered phone number'}
                    style={{paddingLeft: '3rem'}}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">{(activeTab === 'admin' || activeTab === 'staff') ? 'Password' : 'Member ID'}</label>
                <div style={{position: 'relative'}}>
                  <div style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}}>
                    {(activeTab === 'admin' || activeTab === 'staff') ? <Lock size={18} /> : <Hash size={18} />}
                  </div>
                  <input 
                    type={(activeTab === 'admin' || activeTab === 'staff') ? "password" : "text"}
                    className="input" 
                    placeholder={(activeTab === 'admin' || activeTab === 'staff') ? 'Enter password' : 'e.g. TG60728'}
                    style={{paddingLeft: '3rem'}}
                    value={(activeTab === 'admin' || activeTab === 'staff') ? password : memberId}
                    onChange={(e) => (activeTab === 'admin' || activeTab === 'staff') ? setPassword(e.target.value) : setMemberId(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p style={{color: 'var(--danger)', fontSize: '0.75rem', marginBottom: '1.5rem', textAlign: 'center', fontWeight: '700', textTransform: 'uppercase'}}>{error}</p>}

              <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '1.25rem', marginTop: '1rem'}}>
                Access Dashboard
              </button>

              {activeTab === 'staff' && (
                <p style={{textAlign: 'center', fontSize: '0.75rem', marginTop: '1.5rem', color: 'var(--text-dim)'}}>
                  New Staff member?{' '}
                  <span 
                    style={{color: '#fff', cursor: 'pointer', fontWeight: '700', textDecoration: 'underline'}}
                    onClick={() => { setIsSignup(true); setError(''); }}
                  >
                    Sign Up here
                  </span>
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
