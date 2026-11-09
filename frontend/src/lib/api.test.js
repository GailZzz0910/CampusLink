import { describe, expect, it, vi } from 'vitest';
import { api, ApiRequestError, getApiBaseUrl } from './api';

describe('CampusLink API configuration', () => {
  it('uses the documented local API base URL by default', () => {
    expect(getApiBaseUrl()).toBe('http://localhost:4000/api');
  });

  it('sends bearer and idempotency headers and parses the success envelope', async () => {
    window.localStorage.setItem('campuslink_token', 'token-1');
    window.fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: { id: 'r1' }, meta: {} }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    await api.createReservation({ roomId: 'room-1' }, 'reservation-key-1');
    const [, options] = window.fetch.mock.calls[0];
    expect(options.method).toBe('POST');
    expect(options.headers.get('Authorization')).toBe('Bearer token-1');
    expect(options.headers.get('Idempotency-Key')).toBe('reservation-key-1');
    expect(JSON.parse(options.body)).toEqual({ roomId: 'room-1' });
  });

  it.each([409, 501, 503])('preserves HTTP %i and API error code', async (status) => {
    window.fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: { code: `ERROR_${status}`, message: 'Unavailable.' } }), { status, headers: { 'Content-Type': 'application/json' } }));
    const request = api.health();
    await expect(request).rejects.toMatchObject({ status, code: `ERROR_${status}` });
    await expect(request).rejects.toBeInstanceOf(ApiRequestError);
  });

  it('returns CSV response text for downloads', async () => {
    window.fetch = vi.fn().mockResolvedValue(new Response('id,name\n1,Room', { status: 200, headers: { 'Content-Type': 'text/csv' } }));
    await expect(api.exportData('csv')).resolves.toBe('id,name\n1,Room');
  });

  it('uses the documented service request detail, comment, and status requests', async () => {
    window.fetch = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: 'sr-1' } }), { status: 200, headers: { 'Content-Type': 'application/json' } }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: 'comment-1' } }), { status: 201, headers: { 'Content-Type': 'application/json' } }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: 'sr-1', status: 'resolved' } }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    await api.serviceRequest('sr-1');
    await api.addComment('sr-1', { body: 'The projector is working again.' });
    await api.updateRequestStatus('sr-1', { status: 'resolved' });
    expect(window.fetch.mock.calls.map(([url, options]) => [url, options?.method, options?.body])).toEqual([
      ['http://localhost:4000/api/service-requests/sr-1', undefined, undefined],
      ['http://localhost:4000/api/service-requests/sr-1/comments', 'POST', JSON.stringify({ body: 'The projector is working again.' })],
      ['http://localhost:4000/api/service-requests/sr-1/status', 'PATCH', JSON.stringify({ status: 'resolved' })],
    ]);
  });

  it('uses the documented room update request and preserves update errors', async () => {
    window.fetch = vi.fn().mockResolvedValueOnce(new Response(JSON.stringify({ data: { id: 'room-1', status: 'maintenance' } }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
    await expect(api.updateRoom('room-1', { name: 'Lab 201', capacity: 40, status: 'maintenance' })).resolves.toEqual({ data: { id: 'room-1', status: 'maintenance' } });
    expect(window.fetch.mock.calls[0][0]).toBe('http://localhost:4000/api/rooms/room-1');
    expect(window.fetch.mock.calls[0][1].method).toBe('PATCH');
    expect(JSON.parse(window.fetch.mock.calls[0][1].body)).toEqual({ name: 'Lab 201', capacity: 40, status: 'maintenance' });
  });
});
