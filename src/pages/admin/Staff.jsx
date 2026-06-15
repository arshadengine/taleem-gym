import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  Users, Plus, Trash2, Edit2, Search, Clock, 
  AlertTriangle, CheckCircle, X, ShieldAlert 
} from 'lucide-react';

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

const AdminStaff = () => {
  const { staff, staffAttendance, getSlotTimeRange, deleteStaff, updateStaff, signUpStaff } = useGym();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [time, setTime] = useState(new Date());
  
  // Modals / Editing state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editSlots, setEditSlots] = useState([]);
  
  // Add Staff form fields
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newSlots, setNewSlots] = useState([]);
  
  // Custom slot inputs
  const [addCustomStart, setAddCustomStart] = useState('');
  const [addCustomEnd, setAddCustomEnd] = useState('');
  const [editCustomStart, setEditCustomStart] = useState('');
  const [editCustomEnd, setEditCustomEnd] = useState('');

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

  const handleAddCustomSlot = (isEditing = false) => {
    const startVal = isEditing ? editCustomStart : addCustomStart;
    const endVal = isEditing ? editCustomEnd : addCustomEnd;

    if (!startVal || !endVal) {
      alert('Please enter both Start and End times.');
      return;
    }

    const formattedStart = formatTimeTo12Hour(startVal);
    const formattedEnd = formatTimeTo12Hour(endVal);
    const newSlot = `${formattedStart} to ${formattedEnd}`;

    if (isEditing) {
      if (!editSlots.includes(newSlot)) {
        setEditSlots([...editSlots, newSlot]);
      }
      setEditCustomStart('');
      setEditCustomEnd('');
    } else {
      if (!newSlots.includes(newSlot)) {
        setNewSlots([...newSlots, newSlot]);
      }
      setAddCustomStart('');
      setAddCustomEnd('');
    }
  };

  const [logFilter, setLogFilter] = useState('All'); // 'All', 'Present', 'Late'

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 10000); // refresh time-based states every 10s
    return () => clearInterval(timer);
  }, []);

  // Compute late alerts: staff who missed their slot start by >15 minutes today
  const getLateAlerts = () => {
    const alerts = [];
    const todayStr = time.toISOString().split('T')[0];

    staff.forEach(member => {
      (member.slots || []).forEach(slot => {
        const range = getSlotTimeRange(slot, time);
        if (!range) return;

        // Has the slot started and has 15 minutes passed?
        if (time > range.lateTime) {
          // Did the member check in for this slot today?
          const checkIn = staffAttendance.find(
            a => a.staffId === member.id && a.date === todayStr && a.slot === slot
          );

          if (!checkIn) {
            alerts.push({
              staffId: member.id,
              name: member.name,
              phone: member.phoneNumber,
              slot: slot,
              startTime: range.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              lateTime: range.lateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
          }
        }
      });
    });
    return alerts;
  };

  const lateAlerts = getLateAlerts();

  const handleOpenEdit = (member) => {
    setSelectedStaff(member);
    setEditSlots(member.slots || []);
    setIsEditModalOpen(true);
  };

  const handleSaveSlots = async (e) => {
    e.preventDefault();
    if (!selectedStaff) return;

    try {
      await updateStaff(selectedStaff.id, { slots: editSlots });
      setIsEditModalOpen(false);
      alert('Slots updated successfully!');
    } catch (err) {
      alert(`Error updating slots: ${err.message}`);
    }
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    if (newSlots.length === 0) {
      alert('Please select at least one working slot.');
      return;
    }

    const exists = staff.find(s => s.phoneNumber === newPhone);
    if (exists) {
      alert('A staff member with this phone number already exists.');
      return;
    }

    try {
      const sid = await signUpStaff({
        name: newName,
        phoneNumber: newPhone,
        password: newPassword,
        slots: newSlots
      });
      setIsAddModalOpen(false);
      // reset
      setNewName('');
      setNewPhone('');
      setNewPassword('');
      setNewSlots([]);
      alert(`Staff registered successfully! Staff ID: ${sid}`);
    } catch (err) {
      alert(`Error registering staff: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this staff member? This will disable their login.')) {
      try {
        await deleteStaff(id);
        alert('Staff deleted successfully.');
      } catch (err) {
        alert(`Error deleting staff: ${err.message}`);
      }
    }
  };

  const handleSlotToggle = (slot, isEditing = false) => {
    if (isEditing) {
      if (editSlots.includes(slot)) {
        setEditSlots(editSlots.filter(s => s !== slot));
      } else {
        setEditSlots([...editSlots, slot]);
      }
    } else {
      if (newSlots.includes(slot)) {
        setNewSlots(newSlots.filter(s => s !== slot));
      } else {
        setNewSlots([...newSlots, slot]);
      }
    }
  };

  // Filter staff by search term
  const filteredStaff = staff.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.phoneNumber.includes(searchTerm)
  );

  // Filter attendance log
  const filteredLogs = staffAttendance.filter(log => {
    if (logFilter === 'All') return true;
    return log.status === logFilter;
  });

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '0.05em', fontWeight: '900' }}>STAFF PANEL</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em' }}>MONITOR SHIFTS, ROSTER & LATE REMARKS</p>
        </div>
        <div>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '0 2rem' }} onClick={() => setIsAddModalOpen(true)}>
            <Plus size={20} style={{ marginRight: '0.75rem' }} /> ADD NEW STAFF
          </button>
        </div>
      </div>

      {/* LATE ALERTS SECTION */}
      {lateAlerts.length > 0 && (
        <div style={{
          background: 'rgba(255, 68, 68, 0.08)',
          border: '1px solid rgba(255, 68, 68, 0.25)',
          borderRadius: '1rem',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          boxShadow: '0 0 20px rgba(255, 68, 68, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ff4444', marginBottom: '1rem' }}>
            <ShieldAlert size={24} />
            <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', fontWeight: '900', margin: 0 }}>LATE SHIFT ALERTS (15+ MINS MISSING)</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {lateAlerts.map((alert, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 68, 68, 0.15)',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.5rem',
                  fontSize: '0.8rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div>
                  <span style={{ fontWeight: '800', color: '#fff' }}>{alert.name}</span>{' '}
                  <span style={{ color: 'var(--text-dim)' }}>(ID: {alert.staffId})</span>{' '}
                  failed to check in for slot: <strong style={{ color: '#ff4444' }}>{alert.slot}</strong>
                </div>
                <div style={{ color: 'rgba(255, 68, 68, 0.85)', fontWeight: 'bold' }}>
                  Slot Started: {alert.startTime} | Limit: {alert.lateTime}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STAFF DIRECTORY SECTION */}
      <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1.25rem', fontWeight: '800' }}>STAFF DIRECTORY</h3>
      
      {/* Search and Filters */}
      <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="input" 
            placeholder="Search by name, ID or phone..." 
            style={{ paddingLeft: '3.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Directory Grid/Table */}
      <div className="table-responsive" style={{ marginBottom: '4rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CONTACT</th>
              <th>ASSIGNED SLOTS</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>No staff members found</td>
              </tr>
            ) : (
              filteredStaff.map((member) => (
                <tr key={member.id}>
                  <td><span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{member.id}</span></td>
                  <td style={{ fontWeight: '800' }}>{member.name}</td>
                  <td>{member.phoneNumber}</td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                      {(!member.slots || member.slots.length === 0) ? (
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>No Slots Selected</span>
                      ) : (
                        member.slots.map((s, idx) => (
                          <span 
                            key={idx}
                            style={{
                              fontSize: '0.65rem',
                              background: '#111',
                              border: '1px solid #222',
                              padding: '0.2rem 0.4rem',
                              borderRadius: '0.25rem',
                              color: '#ccc'
                            }}
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn" 
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-dim)', padding: '0.5rem', cursor: 'pointer' }}
                      onClick={() => handleOpenEdit(member)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn" 
                      style={{ background: 'transparent', border: 'none', color: 'var(--danger)', padding: '0.5rem', cursor: 'pointer' }}
                      onClick={() => handleDelete(member.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ATTENDANCE HISTORY LOG */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', fontWeight: '800', margin: 0 }}>ATTENDANCE LOG HISTORY</h3>
        <div style={{ display: 'flex', gap: '0.5rem', background: '#050505', padding: '0.25rem', borderRadius: '0.5rem', border: '1px solid #111' }}>
          {['All', 'Present', 'Late'].map((filter) => (
            <button
              key={filter}
              className="btn"
              style={{
                background: logFilter === filter ? '#111' : 'transparent',
                border: 'none',
                color: logFilter === filter ? '#fff' : '#555',
                fontSize: '0.65rem',
                padding: '0.35rem 0.75rem',
                borderRadius: '0.35rem'
              }}
              onClick={() => setLogFilter(filter)}
            >
              {filter.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* History Logs Table */}
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>STAFF ID</th>
              <th>NAME</th>
              <th>DATE / TIME</th>
              <th>SLOT</th>
              <th>STATUS</th>
              <th>REMARKS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-dim)' }}>No attendance entries logged</td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td><span style={{ fontFamily: 'monospace' }}>{log.staffId}</span></td>
                  <td style={{ fontWeight: '800' }}>{log.staffName}</td>
                  <td>{log.date} at {log.time}</td>
                  <td>{log.slot}</td>
                  <td>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      color: log.status === 'Present' ? 'var(--success)' : 'var(--warning)',
                      textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.02)',
                      padding: '0.2rem 0.4rem',
                      borderRadius: '0.25rem',
                      border: `1px solid ${log.status === 'Present' ? 'var(--success)' : 'var(--warning)'}33`
                    }}>
                      {log.status}
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>{log.remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD STAFF MODAL */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem'
        }}>
          <div className="glass-card animate-scale-in" style={{
            maxWidth: '500px', width: '100%', padding: '2rem',
            background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', fontWeight: '950' }}>ADD NEW STAFF MEMBER</h3>
              <button 
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                onClick={() => setIsAddModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStaff}>
              <div className="form-group">
                <label className="label">Full Name</label>
                <input 
                  type="text" 
                  className="input" 
                  placeholder="Enter full name"
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="label">Phone Number</label>
                <input 
                  type="tel" 
                  className="input" 
                  placeholder="Enter phone number"
                  value={newPhone} 
                  onChange={(e) => setNewPhone(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="label">Login Password</label>
                <input 
                  type="password" 
                  className="input" 
                  placeholder="Create login password"
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                />
              </div>

              {/* Slots Selection */}
              <div className="form-group">
                <label className="label">Work Shifts / Slots</label>
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                  gap: '0.5rem', 
                  maxHeight: '180px', 
                  overflowY: 'auto',
                  padding: '0.5rem',
                  background: '#050505',
                  borderRadius: '0.5rem',
                  border: '1px solid #111',
                  marginBottom: '1rem'
                }}>
                  {[...new Set([...STANDARD_SLOTS, ...newSlots])].map((slot) => {
                    const isChecked = newSlots.includes(slot);
                    return (
                      <div 
                        key={slot}
                        onClick={() => handleSlotToggle(slot, false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          background: isChecked ? 'rgba(255,255,255,0.05)' : 'transparent',
                          border: isChecked ? '1px solid #fff' : '1px solid #222',
                          borderRadius: '0.4rem',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                          color: isChecked ? '#fff' : 'var(--text-muted)'
                        }}
                      >
                        <span style={{flex: 1}}>{slot}</span>
                        {isChecked && <CheckCircle size={12} color="#fff" />}
                      </div>
                    );
                  })}
                </div>

                {/* Custom Slot Time Entry */}
                <div style={{
                  background: '#050505',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #111',
                  marginTop: '0.5rem'
                }}>
                  <div style={{fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '0.4rem', fontWeight: '800', letterSpacing: '0.05em'}}>ADD CUSTOM WORK HOURS:</div>
                  <div style={{display: 'flex', gap: '0.4rem', alignItems: 'center'}}>
                    <input 
                      type="time" 
                      className="input" 
                      style={{flex: 1, padding: '0.35rem', fontSize: '0.75rem', background: '#000', border: '1px solid #222'}} 
                      value={addCustomStart}
                      onChange={(e) => setAddCustomStart(e.target.value)}
                    />
                    <span style={{color: 'var(--text-dim)', fontSize: '0.7rem'}}>to</span>
                    <input 
                      type="time" 
                      className="input" 
                      style={{flex: 1, padding: '0.35rem', fontSize: '0.75rem', background: '#000', border: '1px solid #222'}} 
                      value={addCustomEnd}
                      onChange={(e) => setAddCustomEnd(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.65rem', border: '1px solid #333'}}
                      onClick={() => handleAddCustomSlot(false)}
                    >
                      Add Custom
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>
                Add Staff Account
              </button>
            </form>
          </div>
        </div>
      )}

      {/* EDIT SLOTS MODAL */}
      {isEditModalOpen && selectedStaff && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000, padding: '1rem'
        }}>
          <div className="glass-card animate-scale-in" style={{
            maxWidth: '500px', width: '100%', padding: '2rem',
            background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: '1rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', letterSpacing: '0.1em', fontWeight: '950' }}>EDIT STAFF SLOTS</h3>
              <button 
                style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Staff Member</div>
              <strong style={{ fontSize: '1.1rem' }}>{selectedStaff.name}</strong>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>ID: {selectedStaff.id}</div>
            </div>

            <form onSubmit={handleSaveSlots}>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="label">Assigned Work Shifts</label>
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
                  gap: '0.5rem', 
                  maxHeight: '220px', 
                  overflowY: 'auto',
                  padding: '0.5rem',
                  background: '#050505',
                  borderRadius: '0.5rem',
                  border: '1px solid #111',
                  marginBottom: '1rem'
                }}>
                  {[...new Set([...STANDARD_SLOTS, ...editSlots])].map((slot) => {
                    const isChecked = editSlots.includes(slot);
                    return (
                      <div 
                        key={slot}
                        onClick={() => handleSlotToggle(slot, true)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          background: isChecked ? 'rgba(255,255,255,0.05)' : 'transparent',
                          border: isChecked ? '1px solid #fff' : '1px solid #222',
                          borderRadius: '0.4rem',
                          cursor: 'pointer',
                          fontSize: '0.7rem',
                          color: isChecked ? '#fff' : 'var(--text-muted)'
                        }}
                      >
                        <span style={{flex: 1}}>{slot}</span>
                        {isChecked && <CheckCircle size={12} color="#fff" />}
                      </div>
                    );
                  })}
                </div>

                {/* Custom Slot Time Entry */}
                <div style={{
                  background: '#050505',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #111',
                  marginTop: '0.5rem'
                }}>
                  <div style={{fontSize: '0.65rem', color: 'var(--text-dim)', marginBottom: '0.4rem', fontWeight: '800', letterSpacing: '0.05em'}}>ADD CUSTOM WORK HOURS:</div>
                  <div style={{display: 'flex', gap: '0.4rem', alignItems: 'center'}}>
                    <input 
                      type="time" 
                      className="input" 
                      style={{flex: 1, padding: '0.35rem', fontSize: '0.75rem', background: '#000', border: '1px solid #222'}} 
                      value={editCustomStart}
                      onChange={(e) => setEditCustomStart(e.target.value)}
                    />
                    <span style={{color: 'var(--text-dim)', fontSize: '0.7rem'}}>to</span>
                    <input 
                      type="time" 
                      className="input" 
                      style={{flex: 1, padding: '0.35rem', fontSize: '0.75rem', background: '#000', border: '1px solid #222'}} 
                      value={editCustomEnd}
                      onChange={(e) => setEditCustomEnd(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      style={{width: 'auto', padding: '0.35rem 0.75rem', fontSize: '0.65rem', border: '1px solid #333'}}
                      onClick={() => handleAddCustomSlot(true)}
                    >
                      Add Custom
                    </button>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                Save Assigned Slots
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
