# CampusLink Student Starter Guide

CampusLink is the IT315 Distributed Database Management Systems Performance
Innovative Task. The instructor provides the common application interface and
the API rules. Your group implements the database and distributed-data work.

## What you receive

The template includes:

- The common React/Vite frontend with Demo Mode and Live API Mode.
- A minimal Express backend starter with the fixed route structure.
- Database connection placeholders and environment-variable examples.
- The fixed API Contract and database ownership design.
- Integration, security, testing, acceptance, and workflow requirements.

You are not required to design the entire Express server architecture from
scratch. Do not redesign the shared frontend or change the API Contract.

## Windows PowerShell setup

Install Visual Studio Code, Git, and the instructor-approved Node.js 26 LTS
environment. From the cloned repository:

```powershell
cd CampusLink
cd frontend
npm install
Copy-Item .env.example .env
cd ..\backend
npm install
Copy-Item .env.example .env
```

Edit only `backend\.env` with your own local Supabase, MongoDB Atlas, and JWT
values. Never commit either `.env` file or share credentials.

## Run the starter

Use two PowerShell windows.

Frontend:

```powershell
cd CampusLink\frontend
npm run dev
```

Backend:

```powershell
cd CampusLink\backend
npm run dev
```

Open `http://localhost:5173`. The frontend calls
`http://localhost:4000/api` by default. Demo Mode works without databases and
uses clearly labelled fictional records.

Before database work is implemented, `GET /api/health` returns HTTP 200 with
PostgreSQL and MongoDB reported as `NOT_CONFIGURED`. Database-dependent routes
return HTTP 501. This is expected and is not mock database behavior.

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

## Your implementation responsibilities

### PostgreSQL

- Configure the `pg` connection to Supabase.
- Create campuses, buildings, rooms, users, reservations, and outbox tables.
- Add keys, constraints, indexes, and parameterized queries.
- Implement authentication and role authorization.
- Implement reservation transactions, conflict protection, and idempotency.

### MongoDB

- Configure the official MongoDB driver and Atlas database.
- Design service-request, activity-log, and integration-event collections.
- Implement request creation, retrieval, comments, and status history.
- Add indexes and unique event protection.
- Implement Change Streams where required.

### Integration and reliability

- Process PostgreSQL outbox events into MongoDB.
- Make processing retryable and idempotent.
- Preserve pending state when a dependency fails.
- Implement analytics summaries and JSON/CSV exports.
- Demonstrate backup, restore, and data-integrity verification.

## Recommended implementation order

1. Read the documentation and keep the API Contract open.
2. Configure databases and document your local setup without committing secrets.
3. Implement schema/collection structures and seed safe test data.
4. Implement authentication and read operations.
5. Implement room and reservation operations, including transactions and
   idempotency.
6. Implement service requests, comments, activity history, and permissions.
7. Implement outbox processing, retries, duplicate prevention, and Change
   Streams.
8. Implement analytics, exports, backup/recovery, and integrity checks.
9. Run acceptance tests and capture reproducible evidence.

## Evidence and submission

For each important test, record the date, environment, request or query,
expected result, actual result, and useful logs or screenshots. Demonstrate
both databases, a concurrent reservation conflict, idempotent replay, an
outbox retry, duplicate-event prevention, Change Streams, exports, security,
backup/restoration, and integrity verification.

Review these documents before implementation:

- [API Contract](04-API-CONTRACT.md)
- [Database Design](05-DATABASE-DESIGN.md)
- [Integration and Reliability](06-DATA-INTEGRATION-AND-RELIABILITY.md)
- [Security and GitHub Workflow](07-SECURITY-AND-GITHUB-WORKFLOW.md)
- [Testing and Acceptance Criteria](08-TESTING-AND-ACCEPTANCE-CRITERIA.md)
- [Instructor and Student SOP](09-INSTRUCTOR-AND-STUDENT-SOP.md)

Do not claim an endpoint or database behavior works until you have implemented
and tested it.
