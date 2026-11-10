# CampusLink Backend Starter

This is the instructor-provided Express starter for CampusLink. It runs the
fixed API shape used by the shared frontend, but it does not implement database
operations or provide mock records. It includes instructor-provided connection
and ping checks for health reporting. Database-dependent endpoints
intentionally return HTTP 501 until the student group implements them.

## Install and run

From Windows PowerShell:

```powershell
cd backend
npm install
npm run dev
```

`npm install` reads this folder's `package.json` and installs the approved
backend dependencies, including the official `mongodb` driver and PostgreSQL
`pg` driver. The template intentionally does not include `node_modules`;
dependency folders are recreated locally after cloning.

The API listens on `http://localhost:4000`. The frontend uses the API base URL
`http://localhost:4000/api`.

To run without the file watcher:

```powershell
npm start
```

No `.env` file is required for the starter. If you create one later, copy
`.env.example`, fill it with local values, and never commit it.

If a student implementation experiences a MongoDB Atlas SRV DNS error, the
student may optionally set `MONGODB_DNS_SERVERS=8.8.8.8,1.1.1.1` and apply that
value in their MongoDB connection module before `MongoClient.connect()`. This is
a configurable troubleshooting fallback. It is not required for most
environments; prefer fixing the local DNS, VPN, router, or Node.js environment
first.

## Test the starter

From another PowerShell window:

```powershell
Invoke-RestMethod http://localhost:4000/api/health
```

The health response reports each database as `CONNECTED` after the starter's
credential-driven connection and ping check succeeds, `UNAVAILABLE` when
configured credentials cannot reach the database, or `NOT_CONFIGURED` when
required environment variables are absent. A configured database failure
makes health return HTTP 503. With valid credentials, this is the expected
evidence:

```json
{
  "data": {
    "databases": {
      "postgresql": "CONNECTED",
      "mongodb": "CONNECTED"
    }
  }
}
```

The PostgreSQL check executes only `SELECT 1`; the MongoDB check executes only
an administrative `ping`. These instructor-provided connectivity checks do not
implement schemas, collections, CRUD, transactions, indexes, outbox
processing, Change Streams, retries, analytics, backup/recovery, or integrity
verification. Those remain student responsibilities.
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
