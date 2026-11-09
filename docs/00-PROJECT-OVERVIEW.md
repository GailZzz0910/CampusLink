# CampusLink Project Overview

## Purpose

CampusLink is an educational campus management application for IT315. It demonstrates how one common frontend can use two different database technologies while preserving clear ownership, transactions, synchronization, reliability, and security boundaries.

## Scenario

Students and staff find campus rooms and resources, reserve available rooms, and submit service requests. Administrators manage resources and monitor integration. Analytics combines reservation data from PostgreSQL with service-request data from MongoDB.

## Scope

The project covers a React frontend, a Node/Express REST backend, Supabase PostgreSQL for campus and reservation data, MongoDB Atlas for service-request data, and a beginner-friendly transactional outbox integration. It includes monitoring, testing, backup/restoration of test data, and evidence for the IT315 outcomes.

## Target users and modules

Users are **Student**, **Staff**, and **Administrator**. Modules are Dashboard; Campus Facilities and Resources; Room Reservations; Service Desk; Analytics and Reports; Integration Monitoring; and Basic Administration.

## System boundaries

The instructor supplies one common frontend template. Each group implements its backend, database structures, operations, integration, and evaluation. PostgreSQL and MongoDB do not share one ACID transaction or a cross-database foreign key. Managed-service replication is not manual sharding or a student-implemented failover system.

## Success criteria

- The fixed API contract works with the common frontend.
- PostgreSQL remains authoritative for reservations and MongoDB for service requests.
- Concurrent requests cannot double-book a room.
- Outbox events are idempotently synchronized with retry support.
- Change Streams, monitoring, backup/restoration, integrity checks, and query analysis are demonstrated.
- Testing and documentation provide evidence against the official PIT rubric.

## Related documents

See [requirements](02-CAMPUSLINK-REQUIREMENTS.md), [architecture](03-SYSTEM-ARCHITECTURE.md), and [testing](08-TESTING-AND-ACCEPTANCE-CRITERIA.md).
