import { CalendarDays, CheckCircle2, Clock3, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LiveApiState from '../components/LiveApiState';
import { api, ApiRequestError } from '../lib/api';
import { reservations as demoReservations, rooms, timeSlots } from '../data/demoData';

const unwrap = (result) => result?.data || result || [];
const newKey = () => `reservation-${crypto.randomUUID()}`;

export default function Reservations({ mode }) {
  const [items, setItems] = useState(demoReservations);
  const [roomOptions, setRoomOptions] = useState(rooms);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [pendingKey, setPendingKey] = useState(null);
  const load = () => api.reservations().then((result) => setItems(unwrap(result))).catch(setError);
  useEffect(() => { if (mode === 'live') { Promise.all([api.reservations(), api.rooms()]).then(([reservationsResult, roomsResult]) => { setItems(unwrap(reservationsResult)); setRoomOptions(unwrap(roomsResult)); }).catch(setError); } }, [mode]);
  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const key = pendingKey || newKey();
    setPendingKey(key);
    try { await api.createReservation({ roomId: form.get('roomId'), reservationDate: form.get('reservationDate'), timeSlot: form.get('timeSlot') }, key); setPendingKey(null); setShowForm(false); await load(); } catch (requestError) { setError(requestError); if (requestError instanceof ApiRequestError && requestError.status === 409) await Promise.allSettled([load(), api.rooms()]); }
  };
  if (mode === 'live') return <><PageHeader eyebrow="Room reservations" title="Plan your next session" description="Reserve a room using one of the predefined campus time slots." action={<button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17} /> New reservation</button>} />{error && <LiveApiState title={error.status === 501 ? 'Reservations are not implemented yet' : error.status === 409 ? 'Reservation conflict' : 'Reservations unavailable'} message={error.message} />}{!error && items.length === 0 && <LiveApiState message="No reservations were returned by the API." />}<ReservationTable items={items} onCancel={async (id) => { try { await api.cancelReservation(id); await load(); } catch (requestError) { setError(requestError); } }} />{showForm && <Modal title="Create reservation" onClose={() => setShowForm(false)}><form className="stack-form" onSubmit={submit}><label>Room<select name="roomId" required>{roomOptions.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}</select></label><div className="form-row"><label>Reservation date<input name="reservationDate" type="date" required /></label><label>Time slot<select name="timeSlot" required>{timeSlots.map((slot) => <option key={slot}>{slot}</option>)}</select></label></div><div className="demo-form-note"><CheckCircle2 size={16} /> The same Idempotency-Key is reused if this attempt is retried.</div><button className="primary-button full-width" disabled={Boolean(pendingKey)}>Confirm reservation</button></form></Modal>}</>;
  const filtered = filter === 'all' ? items : items.filter((item) => item.status === filter);
  return <><PageHeader eyebrow="Room reservations" title="Plan your next session" description="Demo reservations are fictional examples." action={<button className="primary-button" onClick={() => setShowForm(true)}><Plus size={17} /> New reservation</button>} /><div className="info-banner"><Clock3 size={17} /> Scheduling uses four predefined slots.</div><div className="toolbar"><div className="tabs"><button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All reservations</button><button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button></div></div><ReservationTable items={filtered} /><ModalPlaceholder show={showForm} onClose={() => setShowForm(false)} /></>;
}

function ReservationTable({ items, onCancel }) {
  return <section className="panel"><div className="table-wrap"><table><thead><tr><th>Room</th><th>Date</th><th>Time slot</th><th>Reserved by</th><th>Status</th><th /></tr></thead><tbody>{items.map((item) => <tr key={item.id}><td><strong>{item.roomName || item.room?.name || item.roomId}</strong><small>Resource ID: {item.roomId || item.resourceId}</small></td><td>{item.reservationDate}</td><td><span className="slot-label"><Clock3 size={14} /> {item.timeSlot}</span></td><td>{item.userName || item.user?.name || item.userId || '—'}</td><td><StatusBadge value={item.status} /></td><td>{onCancel && item.status === 'active' && <button className="table-action" onClick={() => onCancel(item.id)}>Cancel</button>}</td></tr>)}</tbody></table></div></section>;
}

function ModalPlaceholder({ show, onClose }) {
  return show ? <Modal title="Create reservation" onClose={onClose}><p>Use Live API mode to submit reservations to the backend.</p></Modal> : null;
}
