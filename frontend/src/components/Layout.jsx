import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Activity, BarChart3, Building2, CalendarDays, ClipboardList, Home, LogOut, Menu, Settings, ShieldCheck, Wifi, X } from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { to: '/', label: 'Dashboard', icon: Home },
  { to: '/facilities', label: 'Facilities', icon: Building2 },
  { to: '/reservations', label: 'Reservations', icon: CalendarDays },
  { to: '/service-desk', label: 'Service Desk', icon: ClipboardList },
  { to: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { to: '/administration', label: 'Administration', icon: ShieldCheck },
];

export default function Layout({ user, mode, onModeChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    window.localStorage.removeItem('campuslink_token');
    window.localStorage.removeItem('campuslink_user');
    navigate('/signin');
  };

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><Activity size={21} /></div>
          <div><strong>CampusLink</strong><span>Campus operations</span></div>
          <button className="mobile-close icon-button" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={19} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="main-nav">
          {navigation.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} end={to === '/'} onClick={() => setSidebarOpen(false)}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mode-card">
            <div className="mode-card-title"><Wifi size={16} /> {mode === 'demo' ? 'Demo mode' : 'Live API mode'}</div>
            <p>{mode === 'demo' ? 'Fictional records are displayed.' : 'Connected to the CampusLink API.'}</p>
            <button className="text-button" onClick={() => onModeChange(mode === 'demo' ? 'live' : 'demo')}>Switch mode</button>
          </div>
          <NavLink to="/administration"><Settings size={18} /> Settings</NavLink>
          <button className="logout-button" onClick={logout}><LogOut size={18} /> Sign out</button>
        </div>
      </aside>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <main className="main-content">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={21} /></button>
          <div className="breadcrumbs">USTP <span>/</span> Campus operations</div>
          <div className="topbar-actions">
            <span className={`mode-pill mode-pill-${mode}`}>{mode === 'demo' ? 'DEMO MODE' : 'LIVE API MODE'}</span>
            <div className="user-avatar">{user?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2)}</div>
            <div className="user-summary"><strong>{user?.name}</strong><span>{user?.role}</span></div>
          </div>
        </header>
        <div className="content-wrap"><Outlet /></div>
      </main>
    </div>
  );
}
