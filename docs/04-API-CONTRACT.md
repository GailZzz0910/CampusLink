# API Contract

## Purpose and rules

Base URL: `http://localhost:4000/api`. This is the authoritative backend/frontend contract. JSON success responses use `{ "data": {}, "meta": {} }`; errors use `{ "error": { "code": "ERROR_CODE", "message": "Human-readable explanation." } }`. Implemented endpoints use statuses 200, 201, 400, 401, 403, 404, 409, 422, 500, and 503. The instructor starter additionally uses 501 for database-dependent routes that students have not implemented yet.

Authenticated requests send a valid bearer JWT. Public health and login are unauthenticated. Authorization is role-based. Exact field validation and error codes are implementation details that must remain consistent with these shapes.

The instructor provides the route structure and contract. The starter's
database-independent health route is available immediately; all other
database-dependent routes initially return HTTP 501 with the standard error
shape until students implement them. Students must preserve the methods, paths,
request fields, response envelopes, authentication requirements, and error
format below.

## Endpoints

| Method and path | Purpose and source | Auth |
|---|---|---|
| `GET /health` | Connectivity and integration health from both databases | None |
| `POST /auth/login` | Authenticate a user from PostgreSQL | None |
| `GET /auth/me` | Return current authenticated user from PostgreSQL/JWT | User |
| `GET /campuses` | List campuses, PostgreSQL | User |
| `GET /rooms` | Search/filter rooms and availability, PostgreSQL | User |
| `GET /rooms/:id` | Room detail, PostgreSQL | User |
| `POST /rooms` | Create resource, PostgreSQL | Administrator |
| `PATCH /rooms/:id` | Update resource, PostgreSQL | Administrator |
| `GET /reservations` | List reservations visible to the user, PostgreSQL | User |
| `POST /reservations` | Create reservation transaction and outbox event, PostgreSQL | User |
| `PATCH /reservations/:id/cancel` | Cancel eligible reservation, PostgreSQL | Owner/Admin |
| `GET /service-requests` | List requests, MongoDB | User |
| `POST /service-requests` | Create request, MongoDB | User |
| `GET /service-requests/:id` | Request, comments, and history, MongoDB | User |
| `POST /service-requests/:id/comments` | Add comment, MongoDB | Authorized user |
| `PATCH /service-requests/:id/status` | Change status and log activity, MongoDB | Staff/Admin |
| `GET /analytics/summary` | Combine reservation and request summaries | User |
| `GET /analytics/export?format=json` | Combined JSON export | User |
| `GET /analytics/export?format=csv` | Combined CSV export | User |
| `GET /integration/events?limit=20` | Outbox/integration events, PostgreSQL/MongoDB | Administrator |
| `GET /integration/status` | Processor and Change Stream status | Administrator |
| `POST /integration/process-pending` | Process retryable outbox events | Administrator |

## Endpoint-level request and response matrix

Unless stated otherwise, successful responses use `{ "data": {}, "meta": {} }` and failures use `{ "error": { "code": "ERROR_CODE", "message": "Human-readable explanation." } }`. The database source and authentication requirement are shown in the endpoint table above.

| Method and path | Query or request body | Successful result | Relevant errors |
|---|---|---|---|
| `GET /health` | None | Database and integration health | 503 |
| `POST /auth/login` | `{ "email": "...", "password": "..." }` | Authenticated user and token | 400, 401, 503 |
| `GET /auth/me` | None | Current user | 401, 404 |
| `GET /campuses` | None | Campus list | 401, 503 |
| `GET /rooms` | `campus`, `building`, `capacity`, `date`, `timeSlot`, `availability` | Filtered room list | 400, 401, 503 |
| `GET /rooms/:id` | Path `id`; no body | Room detail | 401, 404, 503 |
| `POST /rooms` | `buildingId`, `campusId`, `name`, `capacity`, `status` | Created room | 400, 401, 403, 422, 503 |
| `PATCH /rooms/:id` | Path `id`; partial room fields | Updated room | 400, 401, 403, 404, 422, 503 |
| `GET /reservations` | `status`, `date`, `mine` | Reservation list | 400, 401, 503 |
| `POST /reservations` | `roomId`, `reservationDate`, `timeSlot`; required `Idempotency-Key` header | Created reservation, or original result on replay | 400, 401, 409, 422, 503 |
| `PATCH /reservations/:id/cancel` | Path `id`; no body | Cancelled reservation | 401, 403, 404, 409, 503 |
| `GET /service-requests` | `status`, `priority`, `category` | Service-request list | 400, 401, 503 |
| `POST /service-requests` | `title`, `description`, `category`, `priority`, optional related room ID | Created service request | 400, 401, 422, 503 |
| `GET /service-requests/:id` | Path `id`; no body | Request, comments, and activity history | 401, 404, 503 |
| `POST /service-requests/:id/comments` | Path `id`; `{ "body": "..." }` | Created comment | 400, 401, 403, 404, 422, 503 |
| `PATCH /service-requests/:id/status` | Path `id`; `{ "status": "in_progress" }` | Updated request and activity result | 400, 401, 403, 404, 422, 503 |
| `GET /analytics/summary` | None | Combined summary | 401, 503 |
| `GET /analytics/export?format=json` | `format=json` | Consolidated JSON export | 400, 401, 503 |
| `GET /analytics/export?format=csv` | `format=csv` | Consolidated CSV export | 400, 401, 503 |
| `GET /integration/events?limit=20` | Optional bounded `limit` | Integration-event list | 400, 401, 403, 503 |
| `GET /integration/status` | None | Processor and Change Stream status | 401, 403, 503 |
| `POST /integration/process-pending` | None | Processing summary | 401, 403, 503 |

## Payload examples

Login request: `{ "email": "student@example.edu", "password": "..." }`. Room creation: `{ "buildingId": "...", "name": "Room 201", "capacity": 40, "campusId": "...", "status": "available" }`. Reservation creation: `{ "roomId": "...", "reservationDate": "2026-09-10", "timeSlot": "08:00-10:00" }` plus required `Idempotency-Key` header. Valid project-defined slots are `08:00-10:00`, `10:00-12:00`, `13:00-15:00`, and `15:00-17:00`; arbitrary time ranges are not accepted. Service request: `{ "title": "...", "description": "...", "category": "IT", "priority": "normal" }`. Comment: `{ "body": "..." }`. Status update: `{ "status": "in_progress" }`.

Representative success: `{ "data": { "id": "..." }, "meta": {} }`. Representative error: `{ "error": { "code": "RESERVATION_CONFLICT", "message": "The room is already reserved for this date and time slot." } }`. Query parameters are `GET /rooms` filters (campus, building, capacity, date, timeSlot, availability), `GET /reservations` filters (status, reservationDate, timeSlot, mine), `GET /service-requests` filters (status, priority, category), and integration `limit` (default 20, bounded by implementation).

## Rules

Reservation creation must require an idempotency key, a valid `reservationDate`, and one project-defined `timeSlot`; it must return the original result for a repeated committed request. Conflicts use 409. Invalid input, including arbitrary time ranges or unsupported slots, uses 400 or 422; authentication/authorization use 401/403; unavailable dependencies use 503. Do not add endpoints without updating this contract.

## Related documents

[Requirements](02-CAMPUSLINK-REQUIREMENTS.md), [database design](05-DATABASE-DESIGN.md), and [security](07-SECURITY-AND-GITHUB-WORKFLOW.md).
