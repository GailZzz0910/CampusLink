import { ArrowUpRight, CalendarCheck, CircleCheck, Database, GitBranch, Layers3, Server, TicketCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LiveApiState from '../components/LiveApiState';
import { api, ApiRequestError } from '../lib/api';
import { dashboardStats, integrationEvents, reservations, serviceRequests } from '../data/demoData';

function unwrap(result) {
  return result?.data || result;
}

export default function Dashboard({ mode }) {
  const [state, setState] = useState({ loading: true, error: null, summary: null, events: [], health: null });
  useEffect(() => {
    if (mode !== 'live') return;
    let active = true;
    Promise.allSettled([api.analyticsSummary(), api.integrationEvents(10), api.health()]).then((results) => {
      if (!active) return;
      const [summary, events, health] = results;
      const errors = results.filter((item) => item.status === 'rejected').map((item) => item.reason);
      setState({ loading: false, error: errors[0] || null, summary: summary.status === 'fulfilled' ? unwrap(summary.value) : null, events: events.status === 'fulfilled' ? unwrap(events.value) : [], health: health.status === 'fulfilled' ? unwrap(health.value) : null });
    });
    return () => { active = false; };
  }, [mode]);
  if (mode === 'live') {
    const summary = state.summary || {};
    const stats = summary.stats || summary;
    return <><PageHeader eyebrow="Operations overview" title="Campus dashboard" description="Live operational data from the CampusLink API." />
      {state.error && <LiveApiState title={state.error instanceof ApiRequestError && state.error.status === 501 ? 'Dashboard data is not implemented yet' : 'Some dashboard data is unavailable'} message={state.error.message} />}
      {state.loading && <LiveApiState message="Loading analytics, integration events, and health status..." />}
      {!state.loading && <><div className="stats-grid">{[['Total resources', stats.totalResources], ['Active reservations', stats.activeReservations], ['Open service requests', stats.openServiceRequests], ['Integration health', stats.integrationHealth || state.health?.integration || 'Unknown']].map(([label, value]) => <div className="stat-card" key={label}><div className="stat-icon icon-teal"><Layers3 size={19} /></div><span className="stat-label">{label}</span><strong className="stat-value">{value ?? 'Unavailable'}</strong></div>)}</div>
        <div className="dashboard-grid"><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Distributed data</p><h2>System health</h2></div></div><div className="health-list"><div><Database size={17} /><span>PostgreSQL / Supabase</span><StatusBadge value={state.health?.databases?.postgresql || 'unknown'} /></div><div><Server size={17} /><span>MongoDB Atlas</span><StatusBadge value={state.health?.databases?.mongodb || 'unknown'} /></div><div><GitBranch size={17} /><span>Integration</span><StatusBadge value={state.health?.integration || 'unknown'} /></div></div></section><section className="panel"><div className="panel-heading"><div><p className="eyebrow">Integration monitor</p><h2>Latest events</h2></div></div><div className="event-list">{Array.isArray(state.events) && state.events.map((event) => <div className="event-item" key={event.id || event.eventId}><CalendarCheck size={17} /><div><strong>{event.type || event.eventType}</strong><span>{event.aggregateId || event.id}</span></div><StatusBadge value={event.status} /></div>)}</div></section></div></>}
    </>;
  }
  return <><PageHeader eyebrow="Tuesday, November 10, 2026" title="Good morning, Maya" description="Here is what is happening across your campus workspace today." /><div className="info-banner"><CircleCheck size={17} /><span><strong>Demo mode is active.</strong> The records below are fictional examples for frontend review.</span></div><div className="stats-grid">{dashboardStats.map((stat) => <div className="stat-card" key={stat.label}><div className={`stat-icon icon-${stat.tone}`}><Layers3 size={19} /></div><span className="stat-label">{stat.label}</span><strong className="stat-value">{stat.value}</strong><span className="stat-change">{stat.change}</span></div>)}</div><div className="dashboard-grid"><section className="panel"><div className="panel-heading"><h2>Recent reservations</h2><a href="/reservations" className="link-button">View all <ArrowUpRight size={15} /></a></div><div className="table-wrap"><table><tbody>{reservations.map((item) => <tr key={item.id}><td><strong>{item.roomName}</strong><small>{item.userName}</small></td><td>{item.reservationDate}</td><td>{item.timeSlot}</td><td><StatusBadge value={item.status} /></td></tr>)}</tbody></table></div></section><section className="panel"><div className="panel-heading"><h2>Service desk</h2></div><div className="request-list">{serviceRequests.map((item) => <div className="request-item" key={item.id}><div className="request-icon"><TicketCheck size={17} /></div><div className="request-copy"><strong>{item.title}</strong><span>{item.category} · {item.updatedAt}</span></div><StatusBadge value={item.priority} /></div>)}</div></section></div></>;
}
