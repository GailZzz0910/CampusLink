const defaultBaseUrl = 'http://localhost:4000/api';

export function getApiBaseUrl() {
  return import.meta.env.VITE_API_BASE_URL || defaultBaseUrl;
}

export class ApiRequestError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest(path, options = {}) {
  const token = window.localStorage.getItem('campuslink_token');
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${getApiBaseUrl()}${path}`, { ...options, headers });
  const contentType = response.headers.get('content-type') || '';
  const payload = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const message = payload?.error?.message || `Request failed with status ${response.status}.`;
    throw new ApiRequestError(message, response.status, payload?.error?.code);
  }
  return payload;
}

export function apiDownload(path, options = {}) {
  return apiRequest(path, { ...options, headers: { Accept: path.includes('format=csv') ? 'text/csv' : 'application/json', ...(options.headers || {}) } });
}

export const api = {
  login: (body) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  me: () => apiRequest('/auth/me'),
  health: () => apiRequest('/health'),
  analyticsSummary: () => apiRequest('/analytics/summary'),
  integrationEvents: (limit = 20) => apiRequest(`/integration/events?limit=${limit}`),
  integrationStatus: () => apiRequest('/integration/status'),
  processPending: () => apiRequest('/integration/process-pending', { method: 'POST' }),
  campuses: () => apiRequest('/campuses'),
  rooms: (params = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined));
    return apiRequest(`/rooms${query.toString() ? `?${query}` : ''}`);
  },
  room: (id) => apiRequest(`/rooms/${id}`),
  createRoom: (body) => apiRequest('/rooms', { method: 'POST', body: JSON.stringify(body) }),
  updateRoom: (id, body) => apiRequest(`/rooms/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  reservations: (params = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined));
    return apiRequest(`/reservations${query.toString() ? `?${query}` : ''}`);
  },
  createReservation: (body, idempotencyKey) => apiRequest('/reservations', { method: 'POST', headers: { 'Idempotency-Key': idempotencyKey }, body: JSON.stringify(body) }),
  cancelReservation: (id) => apiRequest(`/reservations/${id}/cancel`, { method: 'PATCH' }),
  serviceRequests: (params = {}) => {
    const query = new URLSearchParams(Object.entries(params).filter(([, value]) => value !== '' && value !== undefined));
    return apiRequest(`/service-requests${query.toString() ? `?${query}` : ''}`);
  },
  serviceRequest: (id) => apiRequest(`/service-requests/${id}`),
  createServiceRequest: (body) => apiRequest('/service-requests', { method: 'POST', body: JSON.stringify(body) }),
  addComment: (id, body) => apiRequest(`/service-requests/${id}/comments`, { method: 'POST', body: JSON.stringify(body) }),
  updateRequestStatus: (id, body) => apiRequest(`/service-requests/${id}/status`, { method: 'PATCH', body: JSON.stringify(body) }),
  exportData: (format) => apiDownload(`/analytics/export?format=${format}`),
};

export function isDemoMode() {
  return window.localStorage.getItem('campuslink_demo_mode') !== 'false';
}
