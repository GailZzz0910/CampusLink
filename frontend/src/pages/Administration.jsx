import { CheckCircle2, Database, GitBranch, Play, RefreshCw, ShieldCheck, Wifi } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LiveApiState from '../components/LiveApiState';
import { api } from '../lib/api';
import { integrationEvents as demoEvents } from '../data/demoData';

const unwrap = (result) => result?.data || result || [];

export default function Administration({ mode }) {
  const [state, setState] = useState({ health: null, status: null, events: [], error: null });
  const load = () => Promise.all([api.health(), api.integrationStatus(), api.integrationEvents(20)]).then(([health, status, events]) => setState({ health: unwrap(health), status: unwrap(status), events: unwrap(events), error: null })).catch((error) => setState((current) => ({ ...current, error })));
  useEffect(() => { if (mode === 'live') load(); }, [mode]);
  if (mode === 'live') return <><PageHeader eyebrow="Administration" title="Trust the connection" description="Live database and integration monitoring from the CampusLink API." action={<button className="secondary-button" onClick={load}><RefreshCw size={16} /> Refresh status</button>} />{state.error && <LiveApiState title={state.error.status === 501 ? 'Monitoring is not implemented yet' : 'Monitoring unavailable'} message={state.error.message} />}<div className="admin-grid"><section className="panel"><div className="panel-heading"><h2>Connected services</h2></div><div className="connection-list"><Connection name="Supabase PostgreSQL" value={state.health?.databases?.postgresql} /><Connection name="MongoDB Atlas" value={state.health?.databases?.mongodb} /><Connection name="Integration processor" value={state.health?.integration || state.status?.processor} /></div></section><section className="panel"><div className="panel-heading"><h2>Integration status</h2></div><pre>{JSON.stringify(state.status, null, 2)}</pre></section></div><section className="panel"><div className="panel-heading"><h2>Integration events</h2><button className="primary-button" onClick={() => api.processPending().then(load).catch((error) => setState((current) => ({ ...current, error })))}><Play size={16} /> Process pending</button></div><EventTable events={state.events} /></section></>;
  return <><PageHeader eyebrow="Administration" title="Trust the connection" description="Demo monitoring shows fictional records." /><div className="admin-note"><Wifi size={17} /><span><strong>Demo monitoring:</strong> Live API mode displays backend health and integration responses only.</span></div><EventTable events={demoEvents} /></>;
}

function Connection({ name, value }) {
  return <div className="connection-row"><div className="connection-icon icon-teal"><Database size={18} /></div><div><strong>{name}</strong><span>{value || 'Unavailable'}</span></div>{value && <CheckCircle2 className="success-icon" size={19} />}</div>;
}

function EventTable({ events }) {
  return <div className="table-wrap"><table><thead><tr><th>Event</th><th>Aggregate</th><th>Status</th></tr></thead><tbody>{Array.isArray(events) && events.map((event) => <tr key={event.id || event.eventId}><td><strong>{event.type || event.eventType}</strong><small>{event.id || event.eventId}</small></td><td>{event.aggregateId || '—'}</td><td><StatusBadge value={event.status} /></td></tr>)}</tbody></table></div>;
}
