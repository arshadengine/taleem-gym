import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { User, Phone, Hash, Clock, CheckCircle, Award, AlertCircle } from 'lucide-react';

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

const StaffProfile = () => {
  const { staff, staffAttendance, updateStaff } = useGym();
  
  const storedUser = JSON.parse(localStorage.getItem('gym_user') || 'null');
  const staffMember = staff.find(s => s.id === storedUser?.id) || storedUser;

  const [selectedSlots, setSelectedSlots] = useState(staffMember?.slots || []);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

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

  if (!staffMember) {
    return (
      <div style={{color: '#fff', textAlign: 'center', padding: '2rem'}}>
        Loading staff profile...
      </div>
    );
  }

  // Calculate statistics
  const myAttendance = staffAttendance.filter(a => a.staffId === staffMember.id);
  const totalCheckIns = myAttendance.length;
  const lateCheckIns = myAttendance.filter(a => a.status === 'Late').length;
  const onTimeCheckIns = totalCheckIns - lateCheckIns;
  const onTimePercentage = totalCheckIns > 0 ? Math.round((onTimeCheckIns / totalCheckIns) * 100) : 100;

  const handleSlotToggle = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter(s => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSaveSlots = async (e) => {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    if (selectedSlots.length === 0) {
      setErrorMsg('Please select at least one working slot');
      return;
    }

    try {
      await updateStaff(staffMember.id, { slots: selectedSlots });
      // Update local storage representation in case user refreshes
      const updatedUser = { ...storedUser, slots: selectedSlots };
      localStorage.setItem('gym_user', JSON.stringify(updatedUser));
      setSuccessMsg('Your working hours slots have been updated successfully!');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to update slots');
    }
  };

  return (
    <div className="glass-card animate-fade-in" style={{padding: '1.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a', minHeight: '85vh', borderRadius: '1rem'}}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '0.05em', fontWeight: '900', margin: 0 }}>PROFILE</h1>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', margin: 0 }}>MANAGE YOUR INFORMATION</p>
      </div>

      {/* Profile Card */}
      <div style={{
        background: '#050505',
        border: '1px solid #111',
        borderRadius: '1rem',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid #222',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <User size={36} color="#fff" />
        </div>
        <div>
          <h2 style={{fontSize: '1.3rem', margin: 0, fontWeight: '800'}}>{staffMember.name}</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '0.35rem', color: 'var(--text-dim)', fontSize: '0.75rem'}}>
            <span style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
              <Hash size={12} /> Staff ID: {staffMember.id}
            </span>
            <span style={{display: 'flex', alignItems: 'center', gap: '0.4rem'}}>
              <Phone size={12} /> Phone: {staffMember.phoneNumber}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <h3 style={{fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#fff'}}>
        Performance Metrics
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.75rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#050505',
          border: '1px solid #111',
          borderRadius: '0.75rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem'}}>Shifts</div>
          <div style={{fontSize: '1.5rem', fontWeight: '900', color: '#fff'}}>{totalCheckIns}</div>
        </div>
        <div style={{
          background: '#050505',
          border: '1px solid #111',
          borderRadius: '0.75rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem'}}>On-Time</div>
          <div style={{fontSize: '1.5rem', fontWeight: '900', color: 'var(--success)'}}>{onTimePercentage}%</div>
        </div>
        <div style={{
          background: '#050505',
          border: '1px solid #111',
          borderRadius: '0.75rem',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <div style={{fontSize: '0.65rem', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.25rem'}}>Late Remarks</div>
          <div style={{fontSize: '1.5rem', fontWeight: '900', color: lateCheckIns > 0 ? 'var(--warning)' : '#fff'}}>{lateCheckIns}</div>
        </div>
      </div>

      {/* Edit Slots Form */}
      <h3 style={{fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#fff'}}>
        Working Hours Slot Configuration
      </h3>
      <form onSubmit={handleSaveSlots}>
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '0.75rem', 
          background: '#050505',
          border: '1px solid #111',
          borderRadius: '0.75rem',
          padding: '1rem',
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
          borderRadius: '0.75rem',
          border: '1px solid #111',
          marginBottom: '1.5rem'
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

        {errorMsg && <p style={{color: 'var(--danger)', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 'bold'}}>{errorMsg}</p>}
        {successMsg && <p style={{color: 'var(--success)', fontSize: '0.75rem', marginBottom: '1rem', fontWeight: 'bold'}}>{successMsg}</p>}

        <button type="submit" className="btn btn-primary" style={{width: '100%', padding: '1rem'}}>
          Save Working Slots
        </button>
      </form>
    </div>
  );
};

export default StaffProfile;
