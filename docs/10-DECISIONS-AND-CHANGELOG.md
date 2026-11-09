# Decisions and Changelog

## Selected decisions

| Date | Decision | Rationale |
|---|---|---|
| 2026-11-10 | React/Vite/JavaScript/plain CSS/Router/Fetch frontend | Preserve the instructor-provided common frontend contract. |
| 2026-11-10 | Node.js 26 LTS, Express 5, REST, ES modules | Keep the backend approachable and aligned with the fixed project stack. |
| 2026-11-10 | Supabase PostgreSQL owns campus and reservation data | Relational constraints and ACID transactions protect reservation integrity. |
| 2026-11-10 | MongoDB Atlas owns service-request and integration data | Demonstrate a heterogeneous NoSQL store and Change Streams. |
| 2026-11-10 | Transactional outbox with eventual synchronization | Integrate stores without falsely claiming a distributed ACID transaction. |
| 2026-11-10 | Reservations use four predefined non-overlapping time slots stored as `timeSlot` | Make scheduling deterministic and enforce active uniqueness by resource, date, and slot. This is an instructor-selected CampusLink project decision, not an official university scheduling policy. |
| 2026-11-10 | Instructor-provided backend starter with registered contract routes and 501 database placeholders | Give every group the same understandable Express structure while reserving database and integration implementation for students. |

## Rejected alternatives

ORMs, TypeScript, Tailwind, Docker/Kubernetes, microservices, Redis, Kafka, GraphQL, pgAdmin, MongoDB Compass, payment systems, mobile apps, complex external integrations, and unnecessary ML are outside the fixed scope. Firestore is an official course topic but not the selected CampusLink database.

## Known limitations

The project uses one managed deployment per database; it does not implement manual sharding or cross-database ACID. Managed replication/failover behavior depends on the selected free plans and must be documented rather than assumed. Exact schema field choices, performance thresholds, deadlines, group size, and institutional policies may require instructor confirmation.

## Unresolved questions

- Instructor-confirmed group size, deadlines, submission format, and defense schedule.
- Instructor-approved seed data, performance targets, and exact backup/restore environment.
- Whether any additional role permissions or frontend field names are required by the supplied template.

## Changelog

**2026-11-10:** Created the project knowledge base, Copilot instructions, README, ignore rules, and ten source-of-truth documents.

**2026-11-10:** Added the instructor-provided backend starter and clarified the
division of responsibility: the instructor supplies the common frontend,
Express route structure, middleware/error handling, environment template, API
Contract, and acceptance requirements; students implement database and
integration operations.

## Related documents

All documents in `docs/`, especially [syllabus alignment](01-IT315-SYLLABUS-ALIGNMENT.md) and [architecture](03-SYSTEM-ARCHITECTURE.md).
