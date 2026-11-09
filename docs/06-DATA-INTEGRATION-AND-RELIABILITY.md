# Data Integration and Reliability

## Transaction and concurrency

Reservation creation uses one PostgreSQL transaction: validate, insert reservation, insert its outbox event, and commit both. Use an appropriate isolation strategy, parameterized SQL, a unique active-reservation constraint, and an idempotency key. Concurrent attempts must produce one success and one conflict, not a double booking.

PostgreSQL and MongoDB do **not** share one ACID transaction. CampusLink uses controlled eventual synchronization and integrity checks.

## Transactional outbox

1. Commit reservation and outbox event together.
2. Processor reads pending events.
3. Insert into MongoDB with unique stable `eventId`.
4. Treat an already-present event ID as an idempotent success.
5. Mark the PostgreSQL outbox row synchronized.

On failure, preserve the pending row, increment attempts, record the error, and permit retry. Never create duplicate MongoDB events.

## Change data capture and batch work

MongoDB Change Streams observe service-request changes and expose status for demonstration. A bounded processor handles pending events; analytics reads both authoritative stores and produces consolidated JSON/CSV. This is synchronization, not a cross-database transaction or a cross-database foreign key.

## Replication, failover, backup, and integrity

Document the replication/availability features offered by the selected Supabase and Atlas plans. Do not claim manual sharding, failover implementation, or stronger guarantees than the services provide. Campus-based fragmentation may be conceptual or shown through a partition-aware query. Back up test data, restore it into a controlled environment, compare counts and identifiers, verify relationships and event uniqueness, and record results.

## Required demonstrations

ACID commit/rollback; concurrent reservation attempts; duplicate request replay; processor failure and retry; pending-event inspection; duplicate event prevention; Change Streams; health monitoring; backup/restoration; integrity verification; indexes; and execution-plan analysis. Label each item as actual implementation, managed capability, demonstration/simulation, or future enhancement.

## Related documents

[Database design](05-DATABASE-DESIGN.md), [testing](08-TESTING-AND-ACCEPTANCE-CRITERIA.md), and [architecture](03-SYSTEM-ARCHITECTURE.md).
