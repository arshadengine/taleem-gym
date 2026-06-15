import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGym } from '../../context/GymContext';
import { User, Clock, QrCode, LogOut, CheckCircle, AlertTriangle, HelpCircle, CalendarDays } from 'lucide-react';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const { staff, staffAttendance, getSlotTimeRange } = useGym();
  const [time, setTime] = useState(new Date());

  // Get current logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem('gym_user') || 'null');
  
  // Find latest staff data from context to ensure real-time update
  const staffMember = staff.find(s => s.id === storedUser?.id) || storedUser;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('gym_user');
    window.location.href = '/login';
  };

  if (!staffMember) {
    return (
      <div style={{color: '#fff', textAlign: 'center', padding: '2rem'}}>
        Loading staff dashboard...
      </div>
    );
  }

  // Get today's attendance for this staff
  const todayStr = time.toISOString().split('T')[0];
  const myAttendanceToday = staffAttendance.filter(
    a => a.staffId === staffMember.id && a.date === todayStr
  );

  const getSlotStatus = (slot) => {
    const range = getSlotTimeRange(slot, time);
    if (!range) return { label: 'Invalid Slot', color: '#555' };

    // Check if attendance is already marked for this slot
    const marked = myAttendanceToday.find(a => a.slot === slot);
    if (marked) {
      return { 
        label: marked.status.toUpperCase(), 
        color: marked.status === 'Present' ? 'var(--success)' : 'var(--warning)',
        marked: true,
        details: marked
      };
    }

    const checkInAllowedStart = new Date(range.startTime);
    checkInAllowedStart.setMinutes(checkInAllowedStart.getMinutes() - 15);

    if (time >= checkInAllowedStart && time <= range.endTime) {
      return { label: 'Active (Check-in open)', color: '#00e676', active: true };
    } else if (time < checkInAllowedStart) {
      return { label: 'Upcoming', color: 'var(--text-dim)' };
    } else {
      return { label: 'Missed / Unmarked', color: 'var(--danger)' };
    }
  };

  // Get my check-in history
  const myHistory = staffAttendance.filter(a => a.staffId === staffMember.id);

  return (
    <div className="glass-card animate-fade-in" style={{padding: '1.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a', minHeight: '85vh', borderRadius: '1rem'}}>
      {/* Header */}
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <span style={{
            fontSize: '0.65rem', 
            background: 'rgba(255,255,255,0.08)', 
            padding: '0.25rem 0.5rem', 
            borderRadius: '0.25rem', 
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            Staff Portal
          </span>
          <h2 style={{fontSize: '1.5rem', margin: '0.5rem 0 0 0', fontWeight: '800'}}>{staffMember.name}</h2>
          <p style={{color: 'var(--text-dim)', fontSize: '0.75rem', margin: '0.1rem 0 0 0'}}>ID: {staffMember.id}</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            background: 'transparent',
            border: '1px solid #222',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            color: 'var(--danger)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>

      {/* Date & Time Panel */}
      <div style={{
        background: '#050505',
        border: '1px solid #111',
        borderRadius: '0.75rem',
        padding: '1rem',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        <div style={{fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.1em'}}>
          {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
        <div style={{fontSize: '1.8rem', fontWeight: '800', marginTop: '0.25rem', fontFamily: 'monospace'}}>
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
      </div>

      {/* Slots Section */}
      <h3 style={{fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', color: '#fff'}}>
        Your Slots & Status Today
      </h3>
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem'}}>
        {(!staffMember.slots || staffMember.slots.length === 0) ? (
          <div style={{padding: '1rem', background: '#050505', border: '1px solid #111', borderRadius: '0.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem'}}>
            No working slots configured. Please contact the administrator.
          </div>
        ) : (
          staffMember.slots.map((slot, index) => {
            const status = getSlotStatus(slot);
            return (
              <div 
                key={index}
                style={{
                  padding: '1rem',
                  background: '#050505',
                  border: '1px solid #111',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <Clock size={16} color="var(--text-dim)" />
                  <div>
                    <div style={{fontSize: '0.85rem', fontWeight: 'bold'}}>{slot}</div>
                    <div style={{fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.1rem'}}>
                      {status.marked ? `Checked in at ${status.details?.time}` : 'Attendance slot'}
                    </div>
                  </div>
                </div>
                
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: '800',
                    color: status.color,
                    background: 'rgba(255,255,255,0.02)',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    border: `1px solid ${status.color}33`,
                    textTransform: 'uppercase'
                  }}>
                    {status.label}
                  </span>

                  {status.active && (
                    <Link to="/staff/scan" style={{
                      background: '#fff',
                      color: '#000',
                      padding: '0.4rem 0.75rem',
                      borderRadius: '0.4rem',
                      textDecoration: 'none',
                      fontSize: '0.7rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      boxShadow: '0 0 10px rgba(255,255,255,0.2)'
                    }}>
                      <QrCode size={14} /> Scan QR
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* History Log */}
      <h3 style={{
        fontSize: '0.85rem', 
        textTransform: 'uppercase', 
        letterSpacing: '0.1em', 
        marginBottom: '1rem', 
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <CalendarDays size={16} /> Attendance History
      </h3>
      <div style={{
        maxHeight: '250px',
        overflowY: 'auto',
        background: '#050505',
        border: '1px solid #111',
        borderRadius: '0.75rem',
        padding: '0.5rem'
      }}>
        {myHistory.length === 0 ? (
          <div style={{padding: '1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.8rem'}}>
            No check-in logs found.
          </div>
        ) : (
          myHistory.map((item, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                borderBottom: idx < myHistory.length - 1 ? '1px solid #111' : 'none',
                fontSize: '0.8rem'
              }}
            >
              <div>
                <div style={{fontWeight: 'bold'}}>{item.slot}</div>
                <div style={{fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.15rem'}}>
                  {item.date} at {item.time}
                </div>
              </div>
              <div style={{textAlign: 'right'}}>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  color: item.status === 'Present' ? 'var(--success)' : 'var(--warning)',
                  textTransform: 'uppercase',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '0.25rem',
                  border: `1px solid ${item.status === 'Present' ? 'var(--success)' : 'var(--warning)'}33`
                }}>
                  {item.status}
                </span>
                <div style={{fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '0.2rem'}}>
                  {item.remarks}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
