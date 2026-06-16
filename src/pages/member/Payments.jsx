import { useState } from 'react';
import { useGym } from '../../context/GymContext';
import { History, Snowflake, CheckCircle2 } from 'lucide-react';

const Payments = () => {
  const { members, plans, requests, submitRequest } = useGym();
  const user = JSON.parse(localStorage.getItem('gym_user'));
  const memberData = members.find(m => m.id === user.id) || user;
  const [activeTab, setActiveTab] = useState('plans');
  const [requestStatus, setRequestStatus] = useState(null);

  const [freezeDuration, setFreezeDuration] = useState(30); // Default to 30 days (1 month)

  const pendingRequest = requests.find(r => r.memberDocId === user.id && r.status === 'Pending');

  const handleRequest = async (type, data = {}) => {
    if (pendingRequest) {
      alert("You already have a pending request.");
      return;
    }

    const request = {
      type,
      memberDocId: user.id,
      memberName: user.name,
      ...data
    };

    await submitRequest(request);
    setRequestStatus(`Your ${type} request has been sent to admin for approval.`);
  };

  return (
    <div className="animate-fade-in">
      <h1 style={{fontSize: '1.75rem', marginBottom: '2rem', letterSpacing: '0.1em'}}>MEMBERSHIP</h1>

      <div style={{display: 'flex', background: '#0a0a0a', borderRadius: '0.5rem', padding: '0.25rem', marginBottom: '2rem', border: '1px solid #111'}}>
        <button 
          className="btn" 
          style={{flex: 1, background: activeTab === 'plans' ? '#111' : 'transparent', border: 'none', fontSize: '0.7rem', color: activeTab === 'plans' ? '#fff' : '#444'}}
          onClick={() => setActiveTab('plans')}
        >
          PLANS & REQUESTS
        </button>
        <button 
          className="btn" 
          style={{flex: 1, background: activeTab === 'history' ? '#111' : 'transparent', border: 'none', fontSize: '0.7rem', color: activeTab === 'history' ? '#fff' : '#444'}}
          onClick={() => setActiveTab('history')}
        >
          HISTORY
        </button>
      </div>

      {requestStatus && (
        <div className="glass-card" style={{padding: '1.25rem', marginBottom: '1.5rem', background: '#0a0a0a', border: '1px solid #fff'}}>
          <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
            <CheckCircle2 size={20} color="#fff" />
            <div style={{fontSize: '0.875rem', fontWeight: '700'}}>{requestStatus}</div>
          </div>
        </div>
      )}

      {activeTab === 'plans' ? (
        <div className="grid-cols-1">
          <div className="glass-card" style={{padding: '2rem', background: '#050505', border: '1px solid #111', marginBottom: '2rem'}}>
            <div style={{display: 'flex', gap: '1.5rem', alignItems: 'center'}}>
              <div style={{width: '50px', height: '50px', background: '#111', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #222'}}>
                <Snowflake size={24} color="#fff" />
              </div>
              <div style={{flex: 1}}>
                <div style={{fontWeight: '800', fontSize: '0.9rem'}}>FREEZE MEMBERSHIP</div>
                <div style={{fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.5rem'}}>Select freeze duration</div>
                <select 
                  className="input" 
                  style={{background: '#0a0a0a', border: '1px solid #222', padding: '0.35rem 0.5rem', fontSize: '0.75rem', height: 'auto', width: '100px'}}
                  value={freezeDuration}
                  onChange={(e) => setFreezeDuration(Number(e.target.value))}
                >
                  <option value={15}>15 Days</option>
                  <option value={30}>1 Month</option>
                  <option value={60}>2 Months</option>
                  <option value={90}>3 Months</option>
                </select>
              </div>
              <button 
                className={`btn ${pendingRequest ? 'btn-secondary' : 'btn-primary'}`} 
                style={{width: 'auto', padding: '0.6rem 1rem', fontSize: '0.7rem'}}
                onClick={() => handleRequest('Freeze', { durationDays: freezeDuration })}
                disabled={!!pendingRequest}
              >
                {pendingRequest?.type === 'Freeze' ? 'PENDING' : 'REQUEST'}
              </button>
            </div>
          </div>

          <h3 style={{marginBottom: '1.5rem', fontSize: '0.875rem', letterSpacing: '0.1em', fontWeight: '800', color: 'var(--text-dim)'}}>RENEWAL PLANS</h3>
          {plans.map(plan => (
            <div key={plan.id} className="glass-card" style={{padding: '2rem', marginBottom: '1.5rem', background: '#0a0a0a'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                <div>
                  <div style={{fontWeight: '900', fontSize: '1.25rem', marginBottom: '0.25rem'}}>{plan.name.toUpperCase()}</div>
                  <div style={{color: 'var(--text-dim)', fontSize: '0.7rem', fontWeight: '700'}}>{plan.duration} DAYS VALIDITY</div>
                </div>
                <div style={{fontSize: '1.5rem', fontWeight: '900'}}>₹{plan.price}</div>
              </div>
              <button 
                className={`btn ${pendingRequest ? 'btn-secondary' : 'btn-primary'}`} 
                style={{width: '100%'}}
                onClick={() => handleRequest('Renew', { planId: plan.id, planName: plan.name })}
                disabled={!!pendingRequest}
              >
                {pendingRequest?.type === 'Renew' && pendingRequest.planId === plan.id ? 'REQUEST PENDING' : 'REQUEST RENEWAL'}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid-cols-1">
          {/* Remaining Balance Card */}
          <div className="glass-card" style={{padding: '2rem', background: '#050505', border: '1px solid #111', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <div style={{fontWeight: '800', fontSize: '0.9rem', color: 'var(--text-dim)'}}>REMAINING BALANCE</div>
              <div style={{fontSize: '0.75rem', color: '#888', marginTop: '0.25rem'}}>Outstanding balance for this period</div>
            </div>
            <div style={{fontSize: '2rem', fontWeight: '900', color: (memberData.remainingBalance || 0) > 0 ? '#ff4444' : '#10b981'}}>
              ₹{memberData.remainingBalance || 0}
            </div>
          </div>

          <h3 style={{marginBottom: '1.5rem', fontSize: '0.875rem', letterSpacing: '0.1em', fontWeight: '800', color: 'var(--text-dim)'}}>TRANSACTION HISTORY</h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            {memberData.paymentHistory && memberData.paymentHistory.length > 0 ? (
              memberData.paymentHistory.map(payment => (
                <div key={payment.id} className="glass-card" style={{padding: '1.25rem 2rem', background: '#0a0a0a', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <div>
                    <div style={{fontWeight: '900', fontSize: '1.15rem', color: '#fff'}}>₹{payment.amount}</div>
                    <div style={{fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '0.25rem'}}>
                      {payment.date?.toDate ? payment.date.toDate().toLocaleDateString('en-GB') : new Date(payment.date).toLocaleDateString('en-GB')}
                      {payment.type ? ` • ${payment.type.toUpperCase()}` : ''}
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                    <span className="badge badge-secondary" style={{fontSize: '0.65rem', background: '#111', border: '1px solid #222', padding: '0.35rem 0.75rem'}}>
                      {payment.method?.toUpperCase()}
                    </span>
                    <button 
                      className="btn btn-secondary" 
                      style={{padding: '0.5rem 1rem', fontSize: '0.7rem', border: 'none', background: '#111', width: 'auto'}}
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
                </div>
              ))
            ) : (
              <div className="glass-card" style={{padding: '4rem 2rem', textAlign: 'center', border: '1px solid #111'}}>
                <History size={48} style={{opacity: 0.1, marginBottom: '1.5rem'}} />
                <p style={{color: 'var(--text-dim)', fontSize: '0.875rem', fontWeight: '700'}}>NO TRANSACTION HISTORY</p>
                <p style={{fontSize: '0.7rem', color: '#444', marginTop: '0.5rem'}}>You have no payment records yet.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Payments;
