import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { Calendar, Filter, Search, FileText } from 'lucide-react';

const Attendance = () => {
  const { attendance } = useGym();
  const [filter, setFilter] = useState('all'); // 'all', 'daily', 'weekly', 'monthly'
  const [searchTerm, setSearchTerm] = useState('');

  const getFilteredAttendance = () => {
    let filtered = attendance;
    const now = new Date();

    if (filter === 'daily') {
      const today = now.toISOString().split('T')[0];
      filtered = attendance.filter(a => a.date === today);
    } else if (filter === 'weekly') {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      filtered = attendance.filter(a => {
        const aDate = a.checkedInAt?.toDate ? a.checkedInAt.toDate() : new Date(a.date);
        return aDate >= sevenDaysAgo;
      });
    } else if (filter === 'monthly') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(now.getDate() - 30);
      filtered = attendance.filter(a => {
        const aDate = a.checkedInAt?.toDate ? a.checkedInAt.toDate() : new Date(a.date);
        return aDate >= thirtyDaysAgo;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.memberName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        a.memberId?.includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredData = getFilteredAttendance();

  return (
    <div className="animate-fade-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '2rem'}}>
        <h1 style={{fontSize: '2.5rem', letterSpacing: '0.05em'}}>ATTENDANCE</h1>
        <div style={{display: 'flex', gap: '1rem', flex: 1, justifyContent: 'flex-end'}}>
          <div style={{position: 'relative', flex: 1, maxWidth: '300px'}}>
            <Search size={18} style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)'}} />
            <input 
              type="text" 
              className="input" 
              placeholder="Search member..." 
              style={{paddingLeft: '3rem', background: '#0a0a0a'}}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="input" 
            style={{width: '180px', background: '#0a0a0a'}}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">ALL TIME</option>
            <option value="daily">TODAY</option>
            <option value="weekly">THIS WEEK</option>
            <option value="monthly">THIS MONTH</option>
          </select>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>DATE</th>
              <th>TIME</th>
              <th>MEMBER</th>
              <th>MEMBER ID</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map(log => (
              <tr key={log.id}>
                <td>{log.date}</td>
                <td>{log.time}</td>
                <td><span style={{fontWeight: '700'}}>{log.memberName?.toUpperCase()}</span></td>
                <td><code style={{background: '#111', padding: '2px 6px', borderRadius: '4px'}}>{log.memberId}</code></td>
                <td>
                  <span className="badge badge-success" style={{background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.2)'}}>PRESENT</span>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', padding: '5rem', color: '#333'}}>
                  <FileText size={64} style={{opacity: 0.1, marginBottom: '1.5rem', margin: '0 auto'}} />
                  <p style={{fontWeight: '800', letterSpacing: '0.2em', marginTop: '1rem'}}>NO ATTENDANCE FOUND</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;

