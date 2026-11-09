# CampusLink Backend Starter

This is the instructor-provided Express starter for CampusLink. It runs the
fixed API shape used by the shared frontend, but it does not connect to either
database or provide mock records. Database-dependent endpoints intentionally
return HTTP 501 until the student group implements them.

## Install and run

From Windows PowerShell:

```powershell
cd backend
npm install
npm run dev
```

The API listens on `http://localhost:4000`. The frontend uses the API base URL
`http://localhost:4000/api`.

To run without the file watcher:

```powershell
npm start
```

No `.env` file is required for the starter. If you create one later, copy
`.env.example`, fill it with local values, and never commit it.

## Test the starter

From another PowerShell window:

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

The health response reports PostgreSQL and MongoDB as `NOT_CONFIGURED`.
For example, the unfinished campus endpoint returns the standard 501 error:

```powershell
Invoke-WebRequest http://localhost:4000/api/campuses
```

## Student implementation work

Students must complete the TODO sections in `src/db/postgres.js`,
`src/db/mongodb.js`, and `src/routes.js`. This includes:

- PostgreSQL connection, schema, constraints, indexes, authentication, campus
  and room operations, reservation transactions, concurrency protection,
  idempotency, and outbox records.
- MongoDB connection, collections, service requests, comments, activity logs,
  indexes, and Change Streams.
- Cross-database event processing, retries, duplicate prevention, analytics,
  JSON/CSV exports, backup and restore, and data-integrity verification.

Use the authoritative documentation in `docs/`, especially the API contract,
database design, integration requirements, security requirements, and
acceptance criteria. Do not claim database endpoints work until they are
implemented and tested.
