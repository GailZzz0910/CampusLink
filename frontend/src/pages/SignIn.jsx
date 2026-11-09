import { Activity, ArrowRight, Database, LockKeyhole } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import { demoUser } from '../data/demoData';

export default function SignIn({ mode, onLogin, onModeChange }) {
  const [email, setEmail] = useState('maya.santos@ustp.edu.ph');
  const [password, setPassword] = useState('demo-password');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');
    if (mode === 'demo') {
      onLogin(demoUser);
      navigate('/');
      return;
    }
    setBusy(true);
    try {
      const result = await api.login({ email, password });
      const user = result.data?.user || result.data;
      if (!user) throw new Error('The API did not return a user record.');
      const token = result.data?.token || result.data?.accessToken;
      if (!token) throw new Error('The API did not return an access token.');
      window.localStorage.setItem('campuslink_token', token);
      onLogin(user);
      navigate('/');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="signin-shell">
      <div className="signin-visual">
        <div className="brand brand-light"><div className="brand-mark"><Activity size={21} /></div><div><strong>CampusLink</strong><span>Campus operations</span></div></div>
        <div className="visual-copy"><p className="eyebrow">USTP • IT315</p><h1>One connected view of campus life.</h1><p>Coordinate facilities, reservations, service requests, and distributed data with clarity.</p></div>
        <div className="visual-footer"><span><Database size={15} /> PostgreSQL + MongoDB</span><span>Performance Innovative Task</span></div>
      </div>
      <div className="signin-panel">
        <div className="signin-form-wrap">
          <div className="mobile-brand brand"><div className="brand-mark"><Activity size={21} /></div><div><strong>CampusLink</strong><span>Campus operations</span></div></div>
          <div className="signin-heading"><p className="eyebrow">Welcome back</p><h2>Sign in to your workspace</h2><p>Use your campus credentials to continue.</p></div>
          <div className="mode-switcher" role="group" aria-label="Application mode">
            <button className={mode === 'demo' ? 'active' : ''} onClick={() => onModeChange('demo')}>Demo mode</button>
            <button className={mode === 'live' ? 'active' : ''} onClick={() => onModeChange('live')}>Live API mode</button>
          </div>
          {mode === 'demo' && <div className="demo-notice"><LockKeyhole size={16} /><span>Demo mode uses clearly labeled fictional records. No backend is required.</span></div>}
          <form onSubmit={submit} className="stack-form">
            <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {error && <div className="error-banner" role="alert">{error}</div>}
            <button className="primary-button full-width" disabled={busy}>{busy ? 'Signing in…' : 'Continue'} <ArrowRight size={17} /></button>
          </form>
          <p className="form-footnote">For the shared classroom frontend. Contact your administrator if you need access.</p>
        </div>
      </div>
    </div>
  );
}
