import React from 'react';
import { User, Phone, MapPin, Mail, LogOut, ChevronRight, Settings, ShieldCheck, Hash, Download } from 'lucide-react';
import { useGym } from '../../context/GymContext';

const Profile = () => {
  const { members } = useGym();
  const user = JSON.parse(localStorage.getItem('gym_user'));
  const memberData = members.find(m => m.id === user.id) || user;

  const handleLogout = () => {
    localStorage.removeItem('gym_user');
    window.location.href = '/login';
  };

  const menuItems = [
    { icon: <Hash size={20} color="#fff" />, label: 'MEMBER ID', value: memberData.id || 'N/A' },
    { icon: <Phone size={20} color="#fff" />, label: 'PHONE NUMBER', value: memberData.phoneNumber || 'N/A' },
    { icon: <ShieldCheck size={20} color="#fff" />, label: 'SECURITY', value: 'Change Password' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{textAlign: 'center', marginBottom: '4rem'}}>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <div style={{width: '120px', height: '120px', borderRadius: '50%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid #333', boxShadow: '0 0 40px rgba(255,255,255,0.05)'}}>
            <User size={60} color="white" />
          </div>
        </div>
        <h1 style={{fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '0.1em'}}>{user.name.toUpperCase()}</h1>
        <p style={{color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.2em'}}>GYM MEMBER</p>
      </div>

      <div className="glass-card" style={{padding: '1rem', marginBottom: '2rem', background: '#0a0a0a', border: '1px solid #1a1a1a'}}>
        {menuItems.map((item, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderBottom: i === menuItems.length - 1 ? 'none' : '1px solid #111'}}>
            <div style={{width: '45px', height: '45px', background: '#050505', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #222'}}>
              {item.icon}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontWeight: '800', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '0.25rem'}}>{item.label}</div>
              <div style={{fontWeight: '700', fontSize: '1rem', color: '#fff'}}>{item.value}</div>
            </div>
            <ChevronRight size={18} color="#222" />
          </div>
        ))}
        
        {/* Manual Install Instruction Fallback */}
        <div 
          onClick={() => { if(window.triggerPWAInstall) window.triggerPWAInstall(); else alert('Installation not supported automatically. Please use the "Add to Home Screen" option in your browser menu.'); }}
          style={{display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', borderTop: '1px solid #111', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'background 0.2s'}}
          onMouseOver={(e) => e.currentTarget.style.background = '#111'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
        >
          <div style={{width: '45px', height: '45px', background: '#fff', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Download size={20} color="#000" />
          </div>
          <div style={{flex: 1}}>
            <div style={{fontWeight: '800', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.1em', marginBottom: '0.25rem'}}>APP INSTALLATION</div>
            <div style={{fontWeight: '700', fontSize: '0.85rem', color: '#fff'}}>Tap to Install PWA (or view instructions)</div>
          </div>
        </div>
      </div>

      <button className="btn btn-danger" style={{width: '100%', padding: '1.25rem', background: 'transparent', border: '1px solid #333', color: '#ff4444'}} onClick={handleLogout}>
        <LogOut size={20} /> SIGN OUT
      </button>

      <p style={{textAlign: 'center', marginTop: '3rem', fontSize: '0.6rem', color: '#222', fontWeight: '800', letterSpacing: '0.3em'}}>
        TALEEM GYM CORE v2.0
      </p>
    </div>
  );
};

export default Profile;
