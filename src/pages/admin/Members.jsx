import React, { useState, useEffect } from 'react';
import { useGym } from '../../context/GymContext';
import { 
  Search, Edit2, Trash2, X, Eye, 
  Play, Plus, User, QrCode, Printer 
} from 'lucide-react';

const Members = () => {
  const { 
    members, plans, deleteMember, archiveExpiredMembers, 
    resumeMembership, addMember, updateMember, recordPayment 
  } = useGym();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    membershipType: '', 
    totalAmount: '',
    paidAmount: '',
    paymentMethod: 'Cash',
    startDate: new Date().toISOString().split('T')[0], 
    expiryDate: '' 
  });

  useEffect(() => {
    archiveExpiredMembers();
  }, []);

  const handlePlanChange = (planName) => {
    const plan = plans.find(p => p.name === planName);
    let expiry = '';
    let planPrice = '';
    if (plan) {
      const planPriceVal = plan.priceInr || 0;
      planPrice = planPriceVal;
      if (formData.startDate) {
        const start = new Date(formData.startDate);
        const expDate = new Date(start);
        expDate.setDate(start.getDate() + (plan.durationDays || 30));
        expiry = expDate.toISOString().split('T')[0];
      }
    }
    setFormData(prev => ({
      ...prev,
      membershipType: planName,
      expiryDate: expiry,
      totalAmount: prev.totalAmount === '' || !editingMember ? planPrice : prev.totalAmount,
      paidAmount: prev.paidAmount === '' || !editingMember ? planPrice : prev.paidAmount
    }));
  };

  const handleStartDateChange = (startDateStr) => {
    let expiry = '';
    if (formData.membershipType && startDateStr) {
      const plan = plans.find(p => p.name === formData.membershipType);
      if (plan) {
        const start = new Date(startDateStr);
        const expDate = new Date(start);
        expDate.setDate(start.getDate() + (plan.durationDays || 30));
        expiry = expDate.toISOString().split('T')[0];
      }
    }
    setFormData(prev => ({
      ...prev,
      startDate: startDateStr,
      expiryDate: expiry
    }));
  };

  const filteredMembers = members.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.phoneNumber?.includes(searchTerm) ||
      m.id?.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'All' || m.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleOpenModal = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData({ 
        name: member.name, 
        phone: member.phoneNumber, 
        membershipType: member.membershipType, 
        totalAmount: member.totalAmount !== undefined ? member.totalAmount : '',
        paidAmount: member.paidAmount !== undefined ? member.paidAmount : '',
        paymentMethod: 'Cash',
        startDate: member.membershipStart?.toDate?.() ? member.membershipStart.toDate().toISOString().split('T')[0] : (member.membershipStart || ''), 
        expiryDate: member.membershipExpiry?.toDate?.() ? member.membershipExpiry.toDate().toISOString().split('T')[0] : (member.membershipExpiry || '') 
      });
    } else {
      setEditingMember(null);
      setFormData({ 
        name: '', 
        phone: '', 
        membershipType: '', 
        totalAmount: '',
        paidAmount: '',
        paymentMethod: 'Cash',
        startDate: new Date().toISOString().split('T')[0], 
        expiryDate: '' 
      });
    }
    setIsModalOpen(true);
  };

  const handleViewDetails = (member) => {
    setSelectedMember(member);
    setIsDetailOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingMember) {
      // Need to format dates to Firestore Timestamps like in addMember,
      // and map 'phone' to 'phoneNumber' so it matches the db schema.
      const { Timestamp } = await import('firebase/firestore');
      const totalAmt = Number(formData.totalAmount || 0);
      const paidAmt = Number(formData.paidAmount || 0);
      const remainingBal = Math.max(0, totalAmt - paidAmt);
      
      const updates = {
        name: formData.name,
        phoneNumber: formData.phone,
        membershipType: formData.membershipType,
        totalAmount: totalAmt,
        paidAmount: paidAmt,
        remainingBalance: remainingBal
      };
      
      // Only update dates if they are valid
      if (formData.startDate) {
        updates.membershipStart = Timestamp.fromDate(new Date(formData.startDate));
      }
      if (formData.expiryDate) {
        updates.membershipExpiry = Timestamp.fromDate(new Date(formData.expiryDate));
      }
      
      await updateMember(editingMember.id, updates);
    } else {
      const mid = await addMember(formData);
      alert(`Member Added Successfully! Member ID is: ${mid}`);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '5rem' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '0.05em', fontWeight: '900' }}>MEMBERS</h1>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em' }}>MANAGE YOUR FITNESS TRIBE</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '0 1.5rem', border: '1px solid #222' }} onClick={() => setIsQrModalOpen(true)}>
            <QrCode size={20} style={{ marginRight: '0.75rem' }} /> ENTRY QR
          </button>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '0 2rem' }} onClick={() => handleOpenModal()}>
            <Plus size={20} style={{ marginRight: '0.75rem' }} /> ADD NEW MEMBER
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
          <div style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }}>
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="input" 
            placeholder="Search by name, phone or ID..." 
            style={{ paddingLeft: '3.5rem', background: '#0a0a0a', border: '1px solid #1a1a1a' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="input" 
          style={{ width: '220px', background: '#0a0a0a', border: '1px solid #1a1a1a' }} 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Members</option>
          <option value="Active">Active Only</option>
          <option value="Frozen">Frozen Only</option>
          <option value="Expired">Expired Only</option>
        </select>
      </div>

      {/* Table Section */}
      <div className="table-wrapper" style={{ border: '1px solid #111', borderRadius: '1rem', overflow: 'hidden', marginBottom: '2rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th style={{ padding: '1.25rem' }}>ID</th>
              <th>MEMBER</th>
              <th>PHONE</th>
              <th>PLAN</th>
              <th>STATUS</th>
              <th>BALANCE</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.id} className="hover-row" style={{ borderBottom: '1px solid #0a0a0a' }}>
                <td style={{ padding: '1.25rem' }}>
                  <code style={{ color: '#fff', background: '#1a1a1a', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800' }}>
                    {member.id}
                  </code>
                </td>
                <td>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{member.name}</div>
                </td>
                <td style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>{member.phoneNumber}</td>
                <td>
                  <div style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em' }}>{member.membershipType?.toUpperCase() || 'N/A'}</div>
                </td>
                <td>
                  <span className={`badge badge-${member.status === 'Active' ? 'success' : member.status === 'Frozen' ? 'warning' : 'danger'}`} style={{ fontSize: '0.65rem', padding: '0.35rem 0.75rem' }}>
                    {member.status?.toUpperCase()}
                  </span>
                </td>
                <td>
                  {member.remainingBalance > 0 ? (
                    <span style={{ color: '#ff4444', fontWeight: '800', fontSize: '0.875rem' }}>
                      ₹{member.remainingBalance}
                    </span>
                  ) : (
                    <span style={{ color: '#10b981', fontWeight: '700', fontSize: '0.875rem' }}>
                      ₹0
                    </span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                    <button className="btn btn-secondary" style={{ padding: '0.6rem', border: '1px solid #222', width: 'auto' }} onClick={() => handleViewDetails(member)}>
                      <Eye size={18} />
                    </button>
                    <button className="btn btn-secondary" style={{ padding: '0.6rem', border: '1px solid #222', width: 'auto' }} onClick={() => handleOpenModal(member)}>
                      <Edit2 size={18} />
                    </button>
                    {member.status === 'Frozen' && (
                      <button className="btn btn-success" style={{ padding: '0.6rem', border: 'none', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', width: 'auto' }} onClick={() => resumeMembership(member.id)}>
                        <Play size={18} />
                      </button>
                    )}
                    <button className="btn btn-secondary" style={{ padding: '0.6rem', border: '1px solid #222', width: 'auto' }} onClick={() => { if(window.confirm('Delete this member?')) deleteMember(member.id) }}>
                      <Trash2 size={18} color="#ff4444" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-dim)' }}>
                  No members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modals are kept inside the same parent div */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div className="glass-card animate-scale-in" style={{ width: '100%', maxWidth: '600px', padding: '3rem', background: '#0a0a0a', border: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ letterSpacing: '0.1em', fontWeight: '900' }}>{editingMember ? 'UPDATE MEMBER' : 'REGISTER NEW MEMBER'}</h2>
              <button className="btn btn-secondary" style={{ padding: '0.5rem', border: 'none', width: 'auto' }} onClick={() => setIsModalOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid-cols-2">
                <div className="form-group">
                  <label className="label">FULL NAME</label>
                  <input
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter member name"
                  />
                </div>
                <div className="form-group">
                  <label className="label">PHONE NUMBER</label>
                  <input
                    className="input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    placeholder="e.g. 9876543210"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="label">MEMBERSHIP PLAN</label>
                <select
                  className="input"
                  value={formData.membershipType}
                  onChange={(e) => handlePlanChange(e.target.value)}
                  required
                >
                  <option value="">Select a plan</option>
                  {plans.map(p => <option key={p.id} value={p.name}>{p.name.toUpperCase()} — {p.durationDays} DAYS (₹{p.priceInr})</option>)}
                </select>
              </div>

              <div className="grid-cols-2">
                <div className="form-group">
                  <label className="label">START DATE</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.startDate}
                    onChange={(e) => handleStartDateChange(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="label">EXPIRY DATE (AUTO)</label>
                  <input
                    type="date"
                    className="input"
                    value={formData.expiryDate}
                    readOnly
                    style={{ background: '#050505', cursor: 'not-allowed', color: 'var(--text-dim)' }}
                  />
                </div>
              </div>

              <div className="grid-cols-3" style={{ gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem' }}>
                <div className="form-group">
                  <label className="label">TOTAL AMOUNT (₹)</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.totalAmount}
                    onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                    required
                    placeholder="e.g. 1500"
                  />
                </div>
                <div className="form-group">
                  <label className="label">PAID AMOUNT (₹)</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.paidAmount}
                    onChange={(e) => setFormData({ ...formData, paidAmount: e.target.value })}
                    required
                    placeholder="e.g. 1500"
                  />
                </div>
                <div className="form-group">
                  <label className="label">REMAINING BALANCE (₹)</label>
                  <input
                    type="text"
                    className="input"
                    value={Math.max(0, Number(formData.totalAmount || 0) - Number(formData.paidAmount || 0))}
                    readOnly
                    style={{ background: '#050505', cursor: 'not-allowed', color: '#ff4444', fontWeight: '800' }}
                  />
                </div>
              </div>
              
              {!editingMember && (
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label className="label">PAYMENT METHOD</label>
                  <select
                    className="input"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                  >
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI / GPay / PhonePe</option>
                    <option value="Card">Card Payment</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '3rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1, padding: '1rem' }} onClick={() => setIsModalOpen(false)}>CANCEL</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '1rem' }}>{editingMember ? 'UPDATE RECORD' : 'CONFIRM REGISTRATION'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDetailOpen && selectedMember && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.98)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
          <div className="glass-card animate-scale-in" style={{ width: '100%', maxWidth: '650px', padding: '3rem', background: '#0a0a0a', border: '1px solid #333', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '60px', height: '60px', background: '#ffffff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                  <User color="black" size={32} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h2 style={{ letterSpacing: '0.1em', fontWeight: '900', fontSize: '1.5rem', margin: 0 }}>{selectedMember.name.toUpperCase()}</h2>
                  <div className={`badge badge-${selectedMember.status === 'Active' ? 'success' : 'danger'}`} style={{ fontSize: '0.6rem', marginTop: '0.25rem' }}>
                    {selectedMember.status?.toUpperCase()}
                  </div>
                </div>
              </div>
              <button className="btn btn-secondary" style={{ padding: '0.5rem', border: 'none', width: 'auto' }} onClick={() => setIsDetailOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
              {/* Member Details */}
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', background: '#050505', borderRadius: '1rem', border: '1px solid #1a1a1a' }}>
                <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: '900', color: 'var(--text-dim)', borderBottom: '1px solid #111', paddingBottom: '0.5rem', margin: 0 }}>MEMBER PROFILE</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>MEMBER ID</span>
                  <span style={{ fontWeight: '900', fontFamily: 'monospace' }}>{selectedMember.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>PHONE</span>
                  <span style={{ fontWeight: '600' }}>{selectedMember.phoneNumber}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>PLAN TYPE</span>
                  <span style={{ fontWeight: '800' }}>{selectedMember.membershipType?.toUpperCase() || 'N/A'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>EXPIRY DATE</span>
                  <span style={{ color: '#fff', fontWeight: '900' }}>
                    {(() => {
                      const expiry = selectedMember.membershipExpiry;
                      if (!expiry) return 'N/A';
                      if (expiry.toDate) return expiry.toDate().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                      return new Date(expiry).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
                    })()}
                  </span>
                </div>
              </div>

              {/* Payment Status Summary */}
              <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.25rem', padding: '1.5rem', background: '#050505', borderRadius: '1rem', border: '1px solid #1a1a1a' }}>
                <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: '900', color: 'var(--text-dim)', borderBottom: '1px solid #111', paddingBottom: '0.5rem', margin: 0 }}>PAYMENT DETAILS</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>TOTAL AMOUNT</span>
                  <span style={{ fontWeight: '800' }}>₹{selectedMember.totalAmount || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>PAID SO FAR</span>
                  <span style={{ fontWeight: '800', color: '#10b981' }}>₹{selectedMember.paidAmount || 0}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #222', paddingTop: '0.5rem' }}>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800' }}>REMAINING BALANCE</span>
                  <span style={{ fontWeight: '900', color: (selectedMember.remainingBalance || 0) > 0 ? '#ff4444' : '#10b981' }}>
                    ₹{selectedMember.remainingBalance || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Record New Payment Form */}
            {(selectedMember.remainingBalance || 0) > 0 && (
              <div style={{ textAlign: 'left', padding: '1.5rem', background: 'rgba(255, 68, 68, 0.03)', borderRadius: '1rem', border: '1px solid rgba(255, 68, 68, 0.15)', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: '900', color: '#ff4444', marginBottom: '1rem', marginTop: 0 }}>COLLECT OUTSTANDING BALANCE</h3>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const amount = Number(form.elements.payAmt.value);
                  const method = form.elements.payMethod.value;
                  if (!amount || amount <= 0) return alert('Please enter a valid amount');
                  if (amount > selectedMember.remainingBalance) return alert('Payment amount cannot exceed remaining balance');
                  
                  try {
                    await recordPayment(selectedMember.id, amount, method);
                    alert('Payment recorded successfully!');
                    // Update current selectedMember in state to reflect new values
                    const updatedMember = {
                      ...selectedMember,
                      paidAmount: (selectedMember.paidAmount || 0) + amount,
                      remainingBalance: Math.max(0, (selectedMember.remainingBalance || 0) - amount),
                      paymentHistory: [
                        ...(selectedMember.paymentHistory || []),
                        {
                          amount,
                          date: new Date(),
                          id: `PAY_${Date.now()}`,
                          method,
                          status: 'Completed',
                          type: 'Installment'
                        }
                      ]
                    };
                    setSelectedMember(updatedMember);
                    form.reset();
                  } catch (err) {
                    console.error(err);
                    alert('Failed to record payment: ' + err.message);
                  }
                }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <input
                        type="number"
                        name="payAmt"
                        className="input"
                        placeholder="Amount to pay (₹)"
                        max={selectedMember.remainingBalance}
                        min={1}
                        required
                        style={{ background: '#050505', border: '1px solid #222' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                      <select name="payMethod" className="input" style={{ background: '#050505', border: '1px solid #222' }}>
                        <option value="Cash">Cash</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: 'auto', padding: '0 1.5rem', background: '#ff4444', borderColor: '#ff4444' }}>
                      COLLECT
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Payment History inside Profile Details */}
            <div style={{ textAlign: 'left', marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', letterSpacing: '0.1em', fontWeight: '900', marginBottom: '1rem' }}>PAYMENT HISTORY</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '180px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {selectedMember.paymentHistory && selectedMember.paymentHistory.length > 0 ? (
                  selectedMember.paymentHistory.map((payment, index) => (
                    <div key={index} style={{ padding: '0.9rem 1.25rem', background: '#050505', borderRadius: '0.75rem', border: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '0.85rem' }}>₹{payment.amount}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                          {payment.date?.toDate ? payment.date.toDate().toLocaleDateString('en-GB') : new Date(payment.date).toLocaleDateString('en-GB')}
                          {payment.type ? ` • ${payment.type.toUpperCase()}` : ''}
                        </div>
                      </div>
                      <span className="badge badge-secondary" style={{ fontSize: '0.65rem', background: '#111', border: '1px solid #222' }}>
                        {payment.method?.toUpperCase()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>No payment history recorded</div>
                )}
              </div>
            </div>

            <button className="btn btn-primary" style={{ width: '100%', padding: '1.25rem', fontWeight: '900' }} onClick={() => setIsDetailOpen(false)}>CLOSE PROFILE</button>
          </div>
        </div>
      )}

      {isQrModalOpen && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0,0,0,0.9)', 
          zIndex: 10000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '1.5rem',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="animate-scale-in" style={{ 
            width: '100%', 
            maxWidth: '420px', 
            padding: '2.5rem', 
            background: '#ffffff', 
            textAlign: 'center', 
            color: '#000', 
            borderRadius: '2.5rem',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.1rem', color: '#000', letterSpacing: '0.1em', fontWeight: '900', marginBottom: '0.25rem' }}>ENTRANCE QR</h2>
                <p style={{ fontSize: '0.65rem', color: '#666', fontWeight: '700' }}>TALEEM GYM OFFICIAL</p>
              </div>
              <button 
                className="btn" 
                style={{ padding: '0.5rem', border: 'none', background: '#f5f5f5', color: '#000', width: '40px', height: '40px', borderRadius: '50%' }} 
                onClick={() => setIsQrModalOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ 
              background: '#fff', 
              padding: '1.5rem', 
              borderRadius: '2rem', 
              border: '2px solid #f0f0f0', 
              marginBottom: '2rem', 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              aspectRatio: '1/1'
            }}>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=TALEEM_GYM`} 
                alt="Entry QR" 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
            
            <div style={{ background: '#fcfcfc', padding: '1.5rem', borderRadius: '1.5rem', marginBottom: '2rem', border: '1px dashed #ddd' }}>
              <p style={{ fontSize: '0.75rem', color: '#444', fontWeight: '700', lineHeight: '1.5' }}>
                PLEASE STICK THIS AT THE GYM ENTRANCE.<br/>
                <span style={{ color: '#888', fontSize: '0.65rem' }}>MEMBERS WILL SCAN THIS TO MARK ATTENDANCE.</span>
              </p>
            </div>
            
            <button 
              className="btn" 
              style={{ 
                width: '100%', 
                background: '#000', 
                color: '#fff', 
                padding: '1.25rem', 
                fontWeight: '900', 
                borderRadius: '1.25rem',
                fontSize: '0.85rem'
              }} 
              onClick={() => window.print()}
            >
              <Printer size={20} style={{ marginRight: '0.75rem' }} /> PRINT QR CODE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
