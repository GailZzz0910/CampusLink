import { ClipboardList, MessageSquare, Plus, Search, Send, UserRound, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LiveApiState from '../components/LiveApiState';
import { api, ApiRequestError } from '../lib/api';
import { serviceRequests as demoRequests } from '../data/demoData';

const unwrap = (result) => result?.data || result || [];
const statusOptions = ['open', 'in_progress', 'resolved'];

export default function ServiceDesk({ mode, user }) {
  const [items, setItems] = useState(demoRequests);
  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const canUpdateStatus = ['staff', 'admin', 'administrator'].includes(String(user?.role || '').toLowerCase());

  const load = () => api.serviceRequests(status === 'all' ? {} : { status })
    .then((result) => setItems(unwrap(result)))
    .catch(setError);

  useEffect(() => {
    if (mode === 'live') {
      setError(null);
      load();
    }
  }, [mode, status]);

  const openRequest = (request) => {
    if (mode === 'demo') {
      setSelected(request);
      return;
    }
    setDetailLoading(true);
    setError(null);
    api.serviceRequest(request.id)
      .then((result) => setSelected(unwrap(result)))
      .catch(setError)
      .finally(() => setDetailLoading(false));
  };

  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await api.createServiceRequest({
        title: form.get('title'),
        description: form.get('description'),
        category: form.get('category'),
        priority: form.get('priority'),
        ...(form.get('relatedRoomId') ? { relatedRoomId: form.get('relatedRoomId') } : {}),
      });
      setShowForm(false);
      await load();
    } catch (requestError) {
      setError(requestError);
    }
  };

  const filtered = useMemo(
    () => items.filter((item) => !search || (item.title || '').toLowerCase().includes(search.toLowerCase())),
    [items, search],
  );

  if (mode === 'live') {
    return (
      <>
        <PageHeader eyebrow="Service desk" title="Keep campus moving" description="Live service requests from MongoDB through the CampusLink API." action={<button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17} /> New request</button>} />
        {error && <LiveApiState title={error instanceof ApiRequestError && error.status === 501 ? 'Service desk is not implemented yet' : 'Service desk unavailable'} message={error.message} />}
        {detailLoading && <LiveApiState message="Loading request details..." />}
        <ServiceToolbar status={status} setStatus={setStatus} search={search} setSearch={setSearch} />
        <RequestGrid items={filtered} onSelect={openRequest} />
        {showForm && <Modal title="Create service request" onClose={() => setShowForm(false)}><RequestForm onSubmit={submit} /></Modal>}
        {selected && <RequestDetails request={selected} canUpdateStatus={canUpdateStatus} onClose={() => setSelected(null)} onRefresh={async () => { const result = await api.serviceRequest(selected.id); setSelected(unwrap(result)); await load(); }} />}
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Service desk" title="Keep campus moving" description="Track fictional demonstration requests." action={<button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17} /> New request</button>} />
      <ServiceToolbar status={status} setStatus={setStatus} search={search} setSearch={setSearch} />
      <RequestGrid items={filtered} onSelect={openRequest} />
      {showForm && <Modal title="Create service request" onClose={() => setShowForm(false)}><p>Demo mode does not contact the backend.</p></Modal>}
      {selected && <RequestDetails request={selected} canUpdateStatus={false} onClose={() => setSelected(null)} />}
    </>
  );
}

function ServiceToolbar({ status, setStatus, search, setSearch }) {
  return <div className="toolbar"><div className="tabs">{['all', ...statusOptions].map((item) => <button key={item} className={status === item ? 'active' : ''} onClick={() => setStatus(item)}>{item === 'all' ? 'All' : item.replace('_', ' ')}</button>)}</div><div className="search-field compact"><Search size={17} /><input placeholder="Search requests" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}</div></div>;
}

function RequestGrid({ items, onSelect }) {
  return <div className="request-grid">{items.map((request) => <article className="panel request-card" key={request.id} onClick={() => onSelect(request)}><div className="request-card-header"><div className="request-icon"><ClipboardList size={18} /></div><StatusBadge value={request.status} /></div><h2>{request.title}</h2><p className="muted">{request.category} · {request.relatedRoom || request.relatedRoomId || 'No room linked'}</p><div className="request-meta"><span><UserRound size={14} /> {request.requester || request.requesterId || '—'}</span><StatusBadge value={request.priority} /></div><div className="request-footer"><span><MessageSquare size={14} /> {request.comments?.length || 0} comments</span></div></article>)}</div>;
}

function RequestForm({ onSubmit }) {
  return <form className="stack-form" onSubmit={onSubmit}><label>Title<input name="title" required placeholder="Describe the issue briefly" /></label><div className="form-row"><label>Category<select name="category"><option>IT</option><option>Maintenance</option></select></label><label>Priority<select name="priority"><option>normal</option><option>high</option><option>low</option></select></label></div><label>Related room ID (optional)<input name="relatedRoomId" /></label><label>Description<textarea name="description" rows="4" required placeholder="Add helpful details..." /></label><button className="primary-button full-width"><Send size={16} /> Submit request</button></form>;
}

function RequestDetails({ request, canUpdateStatus, onClose, onRefresh }) {
  const [comment, setComment] = useState('');
  const [nextStatus, setNextStatus] = useState(request.status || 'open');
  const [error, setError] = useState(null);
  const comments = request.comments || request.commentList || [];
  const history = request.activityHistory || request.activity || [];
  const live = Boolean(onRefresh);

  const addComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) return;
    try {
      await api.addComment(request.id, { body: comment.trim() });
      setComment('');
      await onRefresh();
    } catch (requestError) {
      setError(requestError);
    }
  };

  const updateStatus = async (event) => {
    event.preventDefault();
    try {
      await api.updateRequestStatus(request.id, { status: nextStatus });
      await onRefresh();
    } catch (requestError) {
      setError(requestError);
    }
  };

  return <Modal title={request.title || 'Service request'} onClose={onClose}><div className="request-detail"><p>{request.description || 'No description provided.'}</p><div className="request-meta"><StatusBadge value={request.status} /><StatusBadge value={request.priority} /></div>{error && <div className="error-banner" role="alert">{error.message}</div>}<h3>Comments</h3>{comments.length ? <div className="detail-list">{comments.map((item, index) => <div key={item.id || index}><strong>{item.authorName || item.authorId || item.userName || 'User'}</strong><p>{item.body}</p></div>)}</div> : <p className="muted">No comments yet.</p>}{live && <form className="stack-form" onSubmit={addComment}><label>Add comment<textarea value={comment} onChange={(event) => setComment(event.target.value)} rows="3" required /></label><button className="secondary-button"><MessageSquare size={16} /> Add comment</button></form>}{history.length > 0 && <><h3>Activity history</h3><div className="detail-list">{history.map((item, index) => <div key={item.id || index}><strong>{item.action || 'Status update'}</strong><p>{item.oldStatus || '—'} → {item.newStatus || item.status || '—'}</p></div>)}</div></>}{live && canUpdateStatus && <form className="stack-form" onSubmit={updateStatus}><label>Update status<select value={nextStatus} onChange={(event) => setNextStatus(event.target.value)}>{statusOptions.map((item) => <option key={item}>{item}</option>)}</select></label><button className="primary-button">Save status</button></form>}</div></Modal>;
}
