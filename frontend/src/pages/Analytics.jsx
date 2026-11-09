import { BarChart3, Download, FileJson, FileSpreadsheet, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import LiveApiState from '../components/LiveApiState';
import { api } from '../lib/api';
import { reservations, serviceRequests } from '../data/demoData';

function download(value, format) {
  const content = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = `campuslink-analytics.${format}`; link.click(); URL.revokeObjectURL(url);
}

export default function Analytics({ mode }) {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => { if (mode === 'live') api.analyticsSummary().then((result) => setSummary(result.data || result)).catch(setError); }, [mode]);
  const exportLive = async (format) => { try { download(await api.exportData(format), format); } catch (requestError) { setError(requestError); } };
  if (mode === 'live') return <><PageHeader eyebrow="Analytics and reports" title="See the bigger picture" description="Consolidated analytics from the CampusLink API." action={<div className="button-group"><button className="secondary-button" onClick={() => exportLive('json')}><FileJson size={16} /> JSON</button><button className="primary-button" onClick={() => exportLive('csv')}><Download size={16} /> Export CSV</button></div>} />{error && <LiveApiState title={error.status === 501 ? 'Analytics is not implemented yet' : 'Analytics unavailable'} message={error.message} />}{summary && <div className="stats-grid">{Object.entries(summary.stats || summary).slice(0, 4).map(([label, value]) => <div className="stat-card" key={label}><div className="stat-icon icon-blue"><BarChart3 size={19} /></div><span className="stat-label">{label}</span><strong className="stat-value">{String(value)}</strong></div>)}</div>}{!summary && !error && <LiveApiState message="Loading analytics summary..." />}</>;
  return <><PageHeader eyebrow="Analytics and reports" title="See the bigger picture" description="Fictional consolidated insights for frontend review." action={<div className="button-group"><button className="secondary-button" onClick={() => download({ reservations, serviceRequests }, 'json')}><FileJson size={16} /> JSON</button><button className="primary-button" onClick={() => download('reservation_id,request_id\\n demo, demo', 'csv')}><Download size={16} /> Export CSV</button></div>} /><div className="stats-grid"><div className="stat-card"><div className="stat-icon icon-blue"><BarChart3 size={19} /></div><span className="stat-label">Reservations this month</span><strong className="stat-value">184</strong></div><div className="stat-card"><div className="stat-icon icon-amber"><FileSpreadsheet size={19} /></div><span className="stat-label">Requests resolved</span><strong className="stat-value">76%</strong><span className="stat-change positive"><TrendingUp size={14} /> 4.2%</span></div></div></>;
}
