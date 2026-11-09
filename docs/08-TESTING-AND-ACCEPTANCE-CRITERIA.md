# Testing and Acceptance Criteria

## Purpose

Testing must produce reproducible evidence for the PIT and must not report unexecuted tests as passed.

The instructor-provided template includes the common frontend, minimal
Express starter, registered API routes, basic middleware/error handling,
environment template, API Contract, and these testing requirements. Before
student database work is added, the starter must start without credentials,
return truthful `NOT_CONFIGURED` database health states, return HTTP 501 for
database-dependent routes, and return the standard HTTP 404 response for
unknown routes. Students then add evidence for the database and integration
behaviors below; they do not need to redesign the server architecture.

## Test areas

- **Functional/API:** health, login/me, role restrictions, campus/room CRUD, filters, reservation lifecycle using each of the four valid slots (`08:00-10:00`, `10:00-12:00`, `13:00-15:00`, `15:00-17:00`), service requests/comments/status, analytics, exports, and all documented error statuses.
- **SQL:** relationships, constraints, parameterized queries, active-reservation uniqueness on `(resource_id, reservation_date, time_slot)`, rejection of unsupported slots and arbitrary ranges, indexes, rollback, and `EXPLAIN`/query plan evidence.
- **MongoDB:** collection validation as applicable, request history, unique event IDs, status filters, activity logs, and Change Streams.
- **Concurrency/idempotency:** simultaneous reservations for the same resource/date/slot; repeated identical `Idempotency-Key`; key reuse with a different payload; processor replay.
- **Integration/failure:** reservation creates one outbox event; successful processing marks it; MongoDB outage preserves pending state; retry succeeds; duplicate insertion is harmless.
- **Recovery/performance:** backup and restore test data; compare counts/IDs/integrity; measure indexed versus unindexed or representative query plans. Do not claim a threshold unless the instructor confirms one.

## Acceptance evidence

Capture test date, environment, request/response or query, expected and actual result, and screenshots/logs where useful. Include architecture and design evidence for 15%, data modeling/implementation for 25%, querying/performance for 15%, integration/reliability/security for 20%, testing/evaluation for 10%, and documentation/presentation for 15%. These are the official PIT criteria and total 100%; the PIT is 20% of the Lecture Grade.

## Acceptance statement

The project is acceptable when the fixed contract works with the common frontend, ownership and security rules hold, concurrency prevents double booking, synchronization is retryable and idempotent, reliability demonstrations are complete, and evidence is traceable to the official rubric. Specific numeric performance targets are **Requires instructor confirmation**.

## Related documents

[Official alignment](01-IT315-SYLLABUS-ALIGNMENT.md), [requirements](02-CAMPUSLINK-REQUIREMENTS.md), and [integration](06-DATA-INTEGRATION-AND-RELIABILITY.md).
