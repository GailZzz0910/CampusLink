import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Facilities from './pages/Facilities';
import Reservations from './pages/Reservations';
import ServiceDesk from './pages/ServiceDesk';
import Analytics from './pages/Analytics';
import Administration from './pages/Administration';
import { demoUser } from './data/demoData';
import { api, ApiRequestError, isDemoMode } from './lib/api';

function ProtectedRoutes({ user, mode, onModeChange, onLogout }) {
  const location = useLocation();
  if (!user) return <Navigate to="/signin" replace state={{ from: location.pathname }} />;
  return <Layout user={user} mode={mode} onModeChange={onModeChange} onLogout={onLogout} />;
}

export default function App() {
  const [mode, setMode] = useState(isDemoMode() ? 'demo' : 'live');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(window.localStorage.getItem('campuslink_user')) || null; } catch { return null; }
  });
  const navigate = useNavigate();
  useEffect(() => { window.localStorage.setItem('campuslink_demo_mode', mode === 'demo' ? 'true' : 'false'); }, [mode]);
  useEffect(() => {
    if (mode !== 'live' || !window.localStorage.getItem('campuslink_token')) return;
    api.me().then((result) => {
      const currentUser = result.data?.user || result.data;
      if (currentUser) {
        setUser(currentUser);
        window.localStorage.setItem('campuslink_user', JSON.stringify(currentUser));
      }
    }).catch((error) => {
      if (error instanceof ApiRequestError && [401, 403].includes(error.status)) {
        window.localStorage.removeItem('campuslink_token');
        window.localStorage.removeItem('campuslink_user');
        setUser(null);
      }
    });
  }, [mode]);
  const login = (nextUser) => { setUser(nextUser); window.localStorage.setItem('campuslink_user', JSON.stringify(nextUser)); };
  const logout = () => { setUser(null); window.localStorage.removeItem('campuslink_user'); navigate('/signin'); };
  return (
    <Routes>
      <Route path="/signin" element={<SignIn mode={mode} onModeChange={setMode} onLogin={login} />} />
      <Route element={<ProtectedRoutes user={user} mode={mode} onModeChange={setMode} onLogout={logout} />}>
        <Route index element={<Dashboard mode={mode} />} />
        <Route path="facilities" element={<Facilities mode={mode} user={user} />} />
        <Route path="reservations" element={<Reservations mode={mode} />} />
        <Route path="service-desk" element={<ServiceDesk mode={mode} />} />
        <Route path="analytics" element={<Analytics mode={mode} />} />
        <Route path="administration" element={<Administration mode={mode} />} />
      </Route>
      <Route path="*" element={<Navigate to={user ? '/' : '/signin'} replace />} />
    </Routes>
  );
}
