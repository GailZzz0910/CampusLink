export const timeSlots = ['08:00-10:00', '10:00-12:00', '13:00-15:00', '15:00-17:00'];

export const demoUser = {
  id: 'demo-user-1',
  name: 'Maya Santos',
  email: 'maya.santos@ustp.edu.ph',
  role: 'Administrator',
};

export const campuses = [
  { id: 'campus-1', name: 'Cagayan de Oro Campus', location: 'Cagayan de Oro City' },
  { id: 'campus-2', name: 'Claveria Campus', location: 'Claveria, Misamis Oriental' },
];

export const rooms = [
  { id: 'room-1', name: 'Innovation Lab 201', building: 'ICT Building', campus: 'Cagayan de Oro Campus', capacity: 40, status: 'available', equipment: 'Projector, workstations' },
  { id: 'room-2', name: 'Collaboration Room 104', building: 'Library Annex', campus: 'Cagayan de Oro Campus', capacity: 18, status: 'available', equipment: 'Display, whiteboard' },
  { id: 'room-3', name: 'Lecture Hall A', building: 'Academic Building', campus: 'Claveria Campus', capacity: 120, status: 'maintenance', equipment: 'Projector, sound system' },
  { id: 'room-4', name: 'Seminar Room 302', building: 'ICT Building', campus: 'Cagayan de Oro Campus', capacity: 30, status: 'available', equipment: 'Display, video conferencing' },
];

export const reservations = [
  { id: 'res-1', roomId: 'room-1', roomName: 'Innovation Lab 201', userName: 'Maya Santos', reservationDate: '2026-11-12', timeSlot: '08:00-10:00', status: 'active' },
  { id: 'res-2', roomId: 'room-2', roomName: 'Collaboration Room 104', userName: 'Jonah Lim', reservationDate: '2026-11-12', timeSlot: '13:00-15:00', status: 'active' },
  { id: 'res-3', roomId: 'room-4', roomName: 'Seminar Room 302', userName: 'Maya Santos', reservationDate: '2026-11-14', timeSlot: '10:00-12:00', status: 'active' },
];

export const serviceRequests = [
  { id: 'sr-1', title: 'Projector lamp replacement', category: 'IT', priority: 'high', status: 'in_progress', requester: 'Maya Santos', updatedAt: 'Today, 9:40 AM', relatedRoom: 'Innovation Lab 201' },
  { id: 'sr-2', title: 'Air conditioning inspection', category: 'Maintenance', priority: 'normal', status: 'open', requester: 'Jonah Lim', updatedAt: 'Yesterday, 3:15 PM', relatedRoom: 'Collaboration Room 104' },
  { id: 'sr-3', title: 'Network port activation', category: 'IT', priority: 'low', status: 'resolved', requester: 'Aira Cruz', updatedAt: 'Nov 8, 2026', relatedRoom: 'Seminar Room 302' },
];

export const integrationEvents = [
  { id: 'evt-1', type: 'reservation.created', aggregateId: 'res-1', status: 'synchronized', createdAt: 'Today, 8:02 AM' },
  { id: 'evt-2', type: 'reservation.created', aggregateId: 'res-2', status: 'pending', createdAt: 'Today, 8:35 AM' },
  { id: 'evt-3', type: 'reservation.created', aggregateId: 'res-legacy-7', status: 'failed', error: 'MongoDB temporarily unavailable', createdAt: 'Nov 9, 2026' },
];

export const dashboardStats = [
  { label: 'Total resources', value: '48', change: '+4 this month', tone: 'teal' },
  { label: 'Active reservations', value: '26', change: '8 today', tone: 'blue' },
  { label: 'Open service requests', value: '12', change: '3 high priority', tone: 'amber' },
  { label: 'Integration health', value: '98.4%', change: '2 pending events', tone: 'green' },
];
