# CampusLink Requirements

## Purpose and scope

This document defines the fixed MVP behavior for the common frontend and each group's backend. It does not authorize extra commercial features or a redesigned frontend.

## Roles

- **Student:** browse facilities, make/cancel eligible reservations, and create/view service requests.
- **Staff:** perform student capabilities and update assigned service requests according to permission.
- **Administrator:** manage resources, manage basic roles, and monitor/retry integration.

## Functional requirements

### Dashboard

Show total resources, active reservations, open service requests, recent activity, database connectivity, and integration status.

### Facilities and resources

View, search, and filter rooms/resources; show building, campus, capacity, and availability. Administrators may add and update resources.

### Reservations

CampusLink uses predefined, non-overlapping reservation slots rather than arbitrary user-entered time ranges:

- `08:00-10:00`
- `10:00-12:00`
- `13:00-15:00`
- `15:00-17:00`

Store the selected value as `timeSlot`. Reserve an available room for a reservation date and one of these slots, view reservations, and cancel eligible reservations. A room cannot have two active reservations for the same date and `timeSlot`. The system must prevent duplicate requests and concurrent double booking. This is an instructor-selected CampusLink project decision, not an official university scheduling policy.

### Service desk

Create maintenance or IT requests with category and priority; view details; add comments; update status according to permissions; and record activity history.

### Analytics and integration

Retrieve PostgreSQL reservation and MongoDB service-request information, combine and summarize it, and export consolidated JSON or CSV. Show pending, synchronized, and failed outbox events, permit retry, and display Change Stream status.

## Page and workflow requirements

Pages correspond to the seven modules in the overview. A normal reservation workflow is login → browse/filter room → inspect availability → submit with `Idempotency-Key` → receive success/conflict → view or cancel. A service workflow is login → create request → add comments → authorized status update → activity history. An integration workflow is administrator login → inspect events/status → process pending → verify synchronized or failed state and retry.

## MVP and non-goals

MVP is the functionality listed above plus authentication, authorization, persistence, synchronization, monitoring, and evidence. Do not build payments, real-time messaging, mobile apps, microservices, Kubernetes, Docker, Redis, Kafka, GraphQL, complex external integrations, or unnecessary machine-learning models.

## Acceptance requirements

The fixed API works from the common frontend; authorization is enforced; ownership is not duplicated unnecessarily; active reservations are unique; requests are idempotent; outbox processing is retryable; duplicate MongoDB events are prevented; Change Streams and monitoring are demonstrable; exports combine both sources; and tests cover functionality, failure, performance, backup/restoration, and integrity.

## Related documents

[API contract](04-API-CONTRACT.md), [database design](05-DATABASE-DESIGN.md), and [acceptance criteria](08-TESTING-AND-ACCEPTANCE-CRITERIA.md).
