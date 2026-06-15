import React from 'react';
import { useGym } from '../../context/GymContext';
import { Users, UserX, CalendarCheck, TrendingUp, AlertCircle, Clock, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const { members, attendance, requests, approveRequest, rejectRequest } = useGym();

  const activeMembers = members.filter(m => m.status === 'Active').length;
  const frozenMembers = members.filter(m => m.status === 'Frozen').length;
  const expiredMembers = members.filter(m => m.status === 'Expired').length;
  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.filter(a => {
    const aDate = a.checkedInAt?.toDate ? a.checkedInAt.toDate().toISOString().split('T')[0] : a.date;
    return aDate === today;
  }).length;

  
  const pendingRequests = requests.filter(r => r.status === 'Pending');

  const stats = [
    { label: 'ACTIVE', value: activeMembers, icon: <Users size={20} />, color: '#fff' },
    { label: 'FROZEN', value: frozenMembers, icon: <AlertCircle size={20} />, color: '#a3a3a3' },
    { label: 'EXPIRED', value: expiredMembers, icon: <UserX size={20} />, color: '#ff4444' },
    { label: 'TODAY', value: todayAttendance, icon: <CalendarCheck size={20} />, color: '#fff' },
  ];

  return (
    <div className="animate-fade-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
        <h1 style={{fontSize: '2.5rem', letterSpacing: '0.05em'}}>DASHBOARD</h1>
        <div className="badge badge-info" style={{background: '#fff', color: '#000'}}>LIVE SYSTEM</div>
      </div>

      <div className="grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card stat-card" style={{padding: '2rem', background: '#0a0a0a', border: '1px solid #1a1a1a'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
              <span className="stat-label" style={{fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em'}}>{stat.label}</span>
              <div style={{color: stat.color}}>{stat.icon}</div>
            </div>
            <div className="stat-value" style={{fontSize: '3rem', fontWeight: '900'}}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid-cols-2 mt-4" style={{marginTop: '3rem'}}>
        {/* Pending Requests Section */}
        <div className="glass-card" style={{padding: '2rem', background: '#0a0a0a'}}>
          <h3 style={{marginBottom: '2rem', fontSize: '1rem', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
            <Clock size={20} /> PENDING REQUESTS
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {pendingRequests.map(req => (
              <div key={req.id} style={{padding: '1.25rem', background: '#050505', borderRadius: '0.75rem', border: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: '700', fontSize: '0.9rem'}}>{req.memberName.toUpperCase()}</div>
                  <div style={{fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '600'}}>Request: {req.type} {req.planName ? `(${req.planName})` : ''}</div>
                </div>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <button className="btn btn-primary" style={{padding: '0.5rem', borderRadius: '0.4rem'}} onClick={() => approveRequest(req)}>
                    <Check size={16} />
                  </button>
                  <button className="btn btn-danger" style={{padding: '0.5rem', borderRadius: '0.4rem', background: 'transparent'}} onClick={() => rejectRequest(req.id)}>
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <div style={{textAlign: 'center', color: '#333', padding: '3rem', fontWeight: '800', fontSize: '0.7rem'}}>NO PENDING REQUESTS</div>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-card" style={{padding: '2rem', background: '#0a0a0a'}}>
          <h3 style={{marginBottom: '2rem', fontSize: '1rem', letterSpacing: '0.1em'}}>RECENT ATTENDANCE</h3>
          <div className="table-wrapper">
            <table className="table" style={{fontSize: '0.8rem'}}>
              <thead>
                <tr>
                  <th>MEMBER</th>
                  <th>TIME</th>
                </tr>
              </thead>
              <tbody>
                {attendance.slice(0, 5).map(a => (
                  <tr key={a.id}>
                    <td><span style={{fontWeight: '700'}}>{a.memberName}</span></td>
                    <td>{a.time}</td>
                  </tr>
                ))}
                {attendance.length === 0 && (
                  <tr>
                    <td colSpan="2" style={{textAlign: 'center', color: '#333', padding: '2rem', fontWeight: '800'}}>EMPTY LOG</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
