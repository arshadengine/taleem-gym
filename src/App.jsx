import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate } from 'react-router-dom';
import { GymProvider } from './context/GymContext';
import { LayoutDashboard, Users, CalendarDays, CreditCard, User, QrCode, LogOut, Home } from 'lucide-react';

// Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminMembers from './pages/admin/Members';
import AdminAttendance from './pages/admin/Attendance';
import AdminPlans from './pages/admin/Plans';
import AdminStaff from './pages/admin/Staff';

import MemberDashboard from './pages/member/Dashboard';
import MemberScan from './pages/member/Scan';
import MemberPayments from './pages/member/Payments';
import MemberProfile from './pages/member/Profile';

import StaffDashboard from './pages/staff/Dashboard';
import StaffScan from './pages/staff/Scan';
import StaffProfile from './pages/staff/Profile';

import Login from './pages/Login';
import Gallery from './pages/Gallery';
import GroupX from './pages/GroupX';
import PageDetail from './pages/PageDetail';
import Landing from './pages/Landing';
import About from './pages/About';
import DirectorDesk from './pages/DirectorDesk';
import Facilities from './pages/Facilities';
import Packages from './pages/Packages';
import Contact from './pages/Contact';
import InstallPWA from './components/InstallPWA';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Members', path: '/admin/members', icon: <Users size={20} /> },
    { name: 'Staff Panel', path: '/admin/staff', icon: <User size={20} /> },
    { name: 'Attendance', path: '/admin/attendance', icon: <CalendarDays size={20} /> },
    { name: 'Plans', path: '/admin/plans', icon: <CreditCard size={20} /> },
  ];

  return (
    <div className="app-container">
      <nav className="nav-container">
        <div className="nav-content">
          <div className="nav-logo" onClick={() => navigate('/admin')}>
            TALEEM GYM 
            <span style={{
              fontSize: '0.7rem', 
              border: '1px solid #fff', 
              color: 'white', 
              padding: '4px 10px', 
              borderRadius: '2px', 
              marginLeft: '1rem',
              fontWeight: '900',
              letterSpacing: '0.1em'
            }}>ADMIN</span>
          </div>
          <Link to="/login" className="btn btn-secondary" style={{padding: '0.75rem 1.5rem', borderRadius: '4px'}} onClick={() => localStorage.removeItem('gym_user')}>
            <LogOut size={16} /> <span className="hide-mobile" style={{marginLeft: '0.5rem'}}>LOGOUT</span>
          </Link>
        </div>
      </nav>
      <div className="content-area">
        <div style={{display: 'flex', gap: '4rem'}}>
          <aside className="hide-mobile glass-card" style={{
            width: '280px', 
            height: 'fit-content', 
            padding: '1.5rem', 
            position: 'sticky', 
            top: '120px', 
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            zIndex: 10
          }}>

            {navItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`btn ${location.pathname === item.path ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  justifyContent: 'flex-start', 
                  width: '100%', 
                  padding: '1.25rem 1.5rem', /* Better padding */
                  border: 'none',
                  fontSize: '0.75rem',
                  letterSpacing: '0.15em',
                  whiteSpace: 'nowrap',
                  fontWeight: '800'
                }}
              >
                <span style={{opacity: 0.8, display: 'flex', alignItems: 'center'}}>{item.icon}</span>
                <span style={{marginLeft: '1rem'}}>{item.name.toUpperCase()}</span>
              </Link>
            ))}

          </aside>

          <main style={{flex: 1, minWidth: 0, overflow: 'visible'}}>
            {children}
          </main>

        </div>
      </div>
      
      {/* Mobile Bottom Nav for Admin */}
      <div className="bottom-nav show-mobile">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const MemberLayout = ({ children }) => {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/member', icon: <Home size={20} /> },
    { name: 'Scan', path: '/member/scan', icon: <QrCode size={20} /> },
    { name: 'Payments', path: '/member/payments', icon: <CreditCard size={20} /> },
    { name: 'Profile', path: '/member/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="app-container">
      <div className="mobile-container" style={{paddingBottom: '80px'}}>
        {children}
      </div>
      <div className="bottom-nav">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

const StaffLayout = ({ children }) => {
  const location = useLocation();
  const navItems = [
    { name: 'Home', path: '/staff', icon: <Home size={20} /> },
    { name: 'Scan', path: '/staff/scan', icon: <QrCode size={20} /> },
    { name: 'Profile', path: '/staff/profile', icon: <User size={20} /> },
  ];

  return (
    <div className="app-container">
      <div className="mobile-container" style={{paddingBottom: '80px'}}>
        {children}
      </div>
      <div className="bottom-nav">
        {navItems.map(item => (
          <Link key={item.path} to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};


function App() {
  const user = JSON.parse(localStorage.getItem('gym_user') || 'null');

  return (
    <GymProvider>
      <Router>
        <InstallPWA />
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Landing />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/groupx" element={<GroupX />} />
          <Route path="/about" element={<About />} />
          <Route path="/director-desk" element={<DirectorDesk />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/page/:slug" element={<PageDetail />} />
          
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={user?.role === 'admin' ? <AdminLayout><AdminDashboard /></AdminLayout> : <Navigate to="/login" />} />
          <Route path="/admin/members" element={user?.role === 'admin' ? <AdminLayout><AdminMembers /></AdminLayout> : <Navigate to="/login" />} />
          <Route path="/admin/staff" element={user?.role === 'admin' ? <AdminLayout><AdminStaff /></AdminLayout> : <Navigate to="/login" />} />
          <Route path="/admin/attendance" element={user?.role === 'admin' ? <AdminLayout><AdminAttendance /></AdminLayout> : <Navigate to="/login" />} />
          <Route path="/admin/plans" element={user?.role === 'admin' ? <AdminLayout><AdminPlans /></AdminLayout> : <Navigate to="/login" />} />
          
          {/* Member Routes */}
          <Route path="/member" element={user?.role === 'member' ? <MemberLayout><MemberDashboard /></MemberLayout> : <Navigate to="/login" />} />
          <Route path="/member/scan" element={user?.role === 'member' ? <MemberLayout><MemberScan /></MemberLayout> : <Navigate to="/login" />} />
          <Route path="/member/payments" element={user?.role === 'member' ? <MemberLayout><MemberPayments /></MemberLayout> : <Navigate to="/login" />} />
          <Route path="/member/profile" element={user?.role === 'member' ? <MemberLayout><MemberProfile /></MemberLayout> : <Navigate to="/login" />} />
          
          {/* Staff Routes */}
          <Route path="/staff" element={user?.role === 'staff' ? <StaffLayout><StaffDashboard /></StaffLayout> : <Navigate to="/login" />} />
          <Route path="/staff/scan" element={user?.role === 'staff' ? <StaffLayout><StaffScan /></StaffLayout> : <Navigate to="/login" />} />
          <Route path="/staff/profile" element={user?.role === 'staff' ? <StaffLayout><StaffProfile /></StaffLayout> : <Navigate to="/login" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GymProvider>
  );
}

export default App;
