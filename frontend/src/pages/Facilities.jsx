import { Building2, Edit3, Filter, MapPin, Search, Users, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LiveApiState from '../components/LiveApiState';
import { api, ApiRequestError } from '../lib/api';
import { campuses as demoCampuses, rooms as demoRooms } from '../data/demoData';

const value = (result) => result?.data || result || [];

export default function Facilities({ mode, user }) {
  const [search, setSearch] = useState('');
  const [campus, setCampus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [editingRoom, setEditingRoom] = useState(null);
  const [data, setData] = useState({ campuses: demoCampuses, rooms: demoRooms, error: null, loading: mode === 'live' });
  const isAdmin = ['admin', 'administrator'].includes(String(user?.role || '').toLowerCase());
  const load = () => Promise.all([api.campuses(), api.rooms()])
    .then(([campusResult, roomResult]) => setData({ campuses: value(campusResult), rooms: value(roomResult), error: null, loading: false }))
    .catch((error) => setData((current) => ({ ...current, loading: false, error })));

  const submitRoom = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await api.createRoom({ buildingId: form.get('buildingId'), campusId: form.get('campusId'), name: form.get('name'), capacity: Number(form.get('capacity')), status: form.get('status') });
      setShowForm(false);
      await load();
    } catch (error) {
      setData((current) => ({ ...current, error, loading: false }));
    }
  };

  const saveRoom = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    try {
      await api.updateRoom(editingRoom.id, { buildingId: form.get('buildingId'), campusId: form.get('campusId'), name: form.get('name'), capacity: Number(form.get('capacity')), status: form.get('status') });
      setEditingRoom(null);
      setSelectedRoom(null);
      await load();
    } catch (error) {
      setData((current) => ({ ...current, error, loading: false }));
    }
  };

  useEffect(() => {
    if (mode === 'live') {
      setData((current) => ({ ...current, loading: true, error: null }));
      load();
    }
  }, [mode]);

  const filtered = useMemo(() => data.rooms.filter((room) => (!search || `${room.name} ${room.building || room.buildingName || ''}`.toLowerCase().includes(search.toLowerCase())) && (!campus || room.campus === campus || room.campusId === campus)), [data.rooms, search, campus]);

  const openRoom = (room) => {
    if (mode === 'demo') {
      setSelectedRoom(room);
      return;
    }
    api.room(room.id).then((result) => setSelectedRoom(value(result))).catch((error) => setData((current) => ({ ...current, error })));
  };

  if (mode === 'live') return <><PageHeader eyebrow="Campus facilities" title="Find a space that works" description="Browse live rooms and resources from the CampusLink API." action={isAdmin && <button className="primary-button" onClick={() => setShowForm(true)}><Building2 size={17} /> Add resource</button>} />{data.error && <LiveApiState title={data.error instanceof ApiRequestError && data.error.status === 501 ? 'Facilities are not implemented yet' : 'Facilities unavailable'} message={data.error.message} />}{data.loading && <LiveApiState message="Loading campuses and rooms..." />}{!data.loading && !data.error && <FacilityContent campuses={data.campuses} rooms={filtered} campus={campus} setCampus={setCampus} search={search} setSearch={setSearch} onOpen={openRoom} isAdmin={isAdmin} onEdit={setEditingRoom} />}{showForm && <Modal title="Add campus resource" onClose={() => setShowForm(false)}><RoomForm campuses={data.campuses} onSubmit={submitRoom} /></Modal>}{selectedRoom && <RoomDetails room={selectedRoom} isAdmin={isAdmin} onClose={() => setSelectedRoom(null)} onEdit={() => setEditingRoom(selectedRoom)} />}{editingRoom && <Modal title="Edit campus resource" onClose={() => setEditingRoom(null)}><RoomForm room={editingRoom} campuses={data.campuses} onSubmit={saveRoom} /></Modal>}</>;
  return <><PageHeader eyebrow="Campus facilities" title="Find a space that works" description="Browse fictional demonstration records." action={isAdmin && <button className="primary-button" onClick={() => setShowForm(true)}><Building2 size={17} /> Add resource</button>} /><FacilityContent campuses={demoCampuses} rooms={filtered} campus={campus} setCampus={setCampus} search={search} setSearch={setSearch} onOpen={openRoom} isAdmin={isAdmin} onEdit={setEditingRoom} />{showForm && <Modal title="Add campus resource" onClose={() => setShowForm(false)}><p className="demo-form-note">Demo mode does not contact the backend.</p></Modal>}{selectedRoom && <RoomDetails room={selectedRoom} isAdmin={isAdmin} onClose={() => setSelectedRoom(null)} onEdit={() => setEditingRoom(selectedRoom)} />}</>;
}

function FacilityContent({ campuses, rooms, campus, setCampus, search, setSearch, onOpen, isAdmin, onEdit }) {
  return <><div className="toolbar"><div className="search-field"><Search size={17} /><input placeholder="Search rooms or buildings" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}</div><div className="select-field"><Filter size={16} /><select value={campus} onChange={(event) => setCampus(event.target.value)}><option value="">All campuses</option>{campuses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div></div><div className="facility-grid">{rooms.map((room) => <article className="facility-card" key={room.id}><div className="facility-card-top"><div className="facility-icon"><Building2 size={20} /></div><StatusBadge value={room.status} /></div><h2>{room.name}</h2><p className="muted"><MapPin size={14} /> {room.building || room.buildingName} · {room.campus || room.campusName}</p><p className="muted"><Users size={14} /> Capacity {room.capacity}{room.equipment && ` · ${room.equipment}`}</p><div className="facility-actions"><button className="secondary-button" onClick={() => onOpen(room)}>View details</button>{isAdmin && <button className="ghost-button" onClick={() => onEdit(room)}><Edit3 size={15} /> Edit</button>}</div></article>)}</div>{!rooms.length && <div className="panel"><div className="empty-state"><Search size={28} /><strong>No matching resources</strong><span>Try another search or campus filter.</span></div></div>}</>;
}

function RoomDetails({ room, isAdmin, onClose, onEdit }) {
  return <Modal title={room.name || 'Room details'} onClose={onClose}><div className="request-detail"><p className="muted">{room.building || room.buildingName} · {room.campus || room.campusName}</p><p>Capacity: {room.capacity}</p><StatusBadge value={room.status} />{isAdmin && <button className="primary-button full-width" onClick={onEdit}><Edit3 size={16} /> Edit room</button>}</div></Modal>;
}

function RoomForm({ room = {}, campuses, onSubmit }) {
  return <form className="stack-form" onSubmit={onSubmit}><label>Resource name<input name="name" defaultValue={room.name || ''} required /></label><div className="form-row"><label>Campus<select name="campusId" defaultValue={room.campusId || campuses[0]?.id || ''} required>{campuses.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label>Capacity<input name="capacity" type="number" min="1" defaultValue={room.capacity || ''} required /></label></div><label>Building ID<input name="buildingId" defaultValue={room.buildingId || ''} required /></label><label>Status<select name="status" defaultValue={room.status || 'available'}><option value="available">Available</option><option value="maintenance">Maintenance</option></select></label><button className="primary-button full-width">{room.id ? 'Save changes' : 'Save resource'}</button></form>;
}
