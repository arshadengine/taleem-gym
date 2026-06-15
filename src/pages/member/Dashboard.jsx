import React, { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle2, AlertCircle, ArrowRight, QrCode, History, Snowflake } from 'lucide-react';

const MemberDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('gym_user'));
  const { members, attendance, requests, submitRequest } = useGym();
  const [showHistory, setShowHistory] = useState(false);

  // Define memberData here
  const memberData = members.find(m => m.id === user.id) || user;

  
  const expiry = memberData.membershipExpiry?.toDate ? memberData.membershipExpiry.toDate() : new Date(memberData.membershipExpiry);
  const today = new Date();
  
  // Calculate exact days remaining
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const isActive = diffDays > 0 && memberData.status === 'Active';

  const myAttendance = attendance.filter(a => a.memberId === user.id);
  const todayStr = today.toISOString().split('T')[0];
  const attendedToday = myAttendance.some(a => a.date === todayStr);

  const pendingRequest = requests.find(r => r.memberDocId === user.id && r.status === 'Pending');

  return (
    <div className="animate-fade-in">
      <header style={{marginBottom: '3rem', textAlign: 'center'}}>
        <div style={{width: '60px', height: '60px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem'}}>
          <span style={{color: '#000', fontWeight: '900', fontSize: '1.25rem'}}>{memberData.name?.charAt(0)}</span>
        </div>
        <h1 style={{fontSize: '2rem', letterSpacing: '0.05em'}}>{memberData.name?.toUpperCase()}</h1>
        <p style={{color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.1em'}}>MEMBER ID: {memberData.id}</p>
      </header>


      <div className="glass-card" style={{padding: '2.5rem', marginBottom: '2rem', textAlign: 'center', border: '1px solid #222'}}>
        <div style={{marginBottom: '1rem'}}>
          <div className={`badge badge-${memberData.isFrozen ? 'warning' : isActive ? 'success' : 'danger'}`} style={{fontSize: '0.6rem', padding: '0.25rem 0.75rem'}}>
            {memberData.isFrozen ? 'MEMBERSHIP FROZEN' : isActive ? 'ACTIVE MEMBERSHIP' : 'MEMBERSHIP EXPIRED'}
          </div>
          <div style={{marginTop: '0.75rem', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', color: '#fff'}}>
            {memberData.membershipType ? memberData.membershipType.toUpperCase() : 'NO PLAN'}
          </div>
        </div>
        <div style={{fontSize: '4rem', fontWeight: '900', fontFamily: 'Outfit', lineHeight: '1'}}>{memberData.isFrozen ? 0 : diffDays}</div>
        <div style={{fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: '800', letterSpacing: '0.2em', marginBottom: '1.5rem'}}>DAYS REMAINING</div>
        <div style={{fontSize: '0.875rem', color: 'var(--text-muted)'}}>
          Valid until {expiry.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
        
        {memberData.isFrozen && !pendingRequest && (
          <button 
            className="btn btn-primary" 
            style={{marginTop: '2rem', width: '100%'}}
            onClick={() => submitRequest({
              memberId: memberData.id,
              memberDocId: memberData.id,
              memberName: memberData.name,
              type: 'Resume',
              status: 'Pending',
              createdAt: new Date().toISOString()
            })}
          >
            REQUEST TO RESUME
          </button>
        )}
      </div>




      <div className="grid-cols-1">
        {pendingRequest && (
          <div className="glass-card" style={{padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid #333', background: '#050505'}}>
            <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
              <Clock size={20} color="#fff" />
              <div style={{flex: 1}}>
                <div style={{fontSize: '0.875rem', fontWeight: '700'}}>REQUEST PENDING</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-dim)'}}>Your {pendingRequest.type} request is awaiting admin approval.</div>
              </div>
            </div>
          </div>
        )}

        <div className="glass-card" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem'}}>
          <div style={{width: '50px', height: '50px', borderRadius: '0.5rem', background: attendedToday ? '#fff' : '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #222'}}>
            {attendedToday ? <CheckCircle2 color="black" /> : <Clock color="var(--text-dim)" />}
          </div>
          <div style={{flex: 1}}>
            <div style={{fontWeight: '800', fontSize: '0.9rem'}}>TODAY'S STATUS</div>
            <div style={{fontSize: '0.75rem', color: 'var(--text-dim)'}}>
              {attendedToday ? 'ATTENDANCE MARKED' : 'NOT MARKED YET'}
            </div>
          </div>
          {!attendedToday && isActive && (
            <button className="btn btn-primary" style={{padding: '0.75rem', width: 'auto', borderRadius: '0.5rem'}} onClick={() => navigate('/member/scan')}>
              <QrCode size={20} />
            </button>
          )}
        </div>

        <div className="glass-card" style={{padding: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
            <h3 style={{fontSize: '1rem', letterSpacing: '0.1em'}}>ATTENDANCE HISTORY</h3>
            <button className="btn btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.7rem', border: 'none'}} onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? 'HIDE' : 'VIEW ALL'}
            </button>
          </div>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {myAttendance.slice(0, showHistory ? 100 : 3).map(a => (
              <div key={a.id} style={{display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#050505', borderRadius: '0.5rem', border: '1px solid #111'}}>
                <div style={{fontWeight: '700', fontSize: '0.875rem'}}>{a.date}</div>
                <div style={{color: 'var(--text-dim)', fontSize: '0.875rem'}}>{a.time}</div>
              </div>
            ))}
            {myAttendance.length === 0 && (
              <div style={{textAlign: 'center', color: 'var(--text-dim)', padding: '1rem', fontSize: '0.875rem'}}>No history found</div>
            )}
          </div>
        </div>

        <div className="glass-card" style={{padding: '2rem', marginTop: '1.5rem'}}>
          <h3 style={{fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1.5rem'}}>PAYMENT HISTORY</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {memberData.paymentHistory?.map(payment => (
              <div key={payment.id} style={{padding: '1.25rem', background: '#050505', borderRadius: '0.75rem', border: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                  <div style={{fontWeight: '700', fontSize: '0.9rem'}}>₹{payment.amount}</div>
                  <div style={{fontSize: '0.7rem', color: 'var(--text-dim)'}}>{payment.date?.toDate ? payment.date.toDate().toLocaleDateString('en-GB') : new Date(payment.date).toLocaleDateString('en-GB')}</div>
                </div>
                <button 
                  className="btn btn-secondary" 
                  style={{padding: '0.5rem 1rem', fontSize: '0.7rem', border: 'none', background: '#111'}}
                  onClick={() => {
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Receipt - Taleem Gym</title>
                          <style>
                            body { font-family: sans-serif; padding: 40px; text-align: center; background: #fff; color: #000; }
                            .receipt { border: 2px solid #000; padding: 30px; display: inline-block; text-align: left; min-width: 300px; }
                            h1 { border-bottom: 2px solid #000; padding-bottom: 10px; margin-top: 0; }
                            .row { display: flex; justify-content: space-between; margin: 15px 0; border-bottom: 1px dashed #ccc; padding-bottom: 5px; }
                            .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
                          </style>
                        </head>
                        <body>
                          <div class="receipt">
                            <h1>TALEEM GYM</h1>
                            <div class="row"><span>Receipt ID:</span> <strong>${payment.id}</strong></div>
                            <div class="row"><span>Member:</span> <strong>${memberData.name}</strong></div>
                            <div class="row"><span>Amount:</span> <strong>₹${payment.amount}</strong></div>
                            <div class="row"><span>Date:</span> <strong>${payment.date?.toDate ? payment.date.toDate().toLocaleDateString('en-GB') : new Date(payment.date).toLocaleDateString('en-GB')}</strong></div>
                            <div class="row"><span>Payment Method:</span> <strong>${payment.method}</strong></div>
                            <div class="footer">Thank you for choosing Taleem Gym!</div>
                          </div>
                          <script>window.print();</script>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                  }}
                >
                  RECEIPT
                </button>
              </div>
            ))}
            {(!memberData.paymentHistory || memberData.paymentHistory.length === 0) && (
              <div style={{textAlign: 'center', color: 'var(--text-dim)', padding: '1rem', fontSize: '0.875rem'}}>No payments found</div>
            )}
          </div>
        </div>

        <div className="glass-card" style={{padding: '2rem', marginTop: '1.5rem'}}>
          <h3 style={{fontSize: '1rem', letterSpacing: '0.1em', marginBottom: '1.5rem'}}>QUICK ACTIONS</h3>
          <div className="grid-cols-2" style={{gap: '1rem'}}>
            <button className="btn btn-secondary" style={{flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', background: '#050505'}} onClick={() => navigate('/member/scan')}>
              <QrCode size={24} />
              <span style={{fontSize: '0.7rem'}}>SCAN QR</span>
            </button>
            <button className="btn btn-secondary" style={{flexDirection: 'column', gap: '0.75rem', padding: '1.5rem', background: '#050505'}} onClick={() => navigate('/member/payments')}>
              <Snowflake size={24} />
              <span style={{fontSize: '0.7rem'}}>FREEZE / RENEW</span>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MemberDashboard;
