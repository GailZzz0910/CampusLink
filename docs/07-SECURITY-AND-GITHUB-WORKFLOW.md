# Security and GitHub Workflow

## Security requirements

Keep `DATABASE_URL`, `MONGODB_URI`, `JWT_SECRET`, passwords, and tokens in backend environment variables. Only non-secret frontend variables may use the `VITE_` prefix. Never commit `.env` files or connection strings. Hash passwords with `bcryptjs`, issue and validate JWTs, and enforce Student/Staff/Administrator authorization on the backend.

Validate and normalize all request input, use parameterized SQL, apply least-privilege database access, use MongoDB access controls, limit sensitive error details, and configure CORS to the expected frontend origin. Do not rely on frontend role checks.

## GitHub workflow

The instructor creates one verified template repository containing the common
frontend, minimal Express backend starter, registered route structure, basic
middleware/error handling, environment template, API Contract, and testing
requirements. Each group creates its own repository, clones it, creates a
development branch, and implements the database and integration work described
below. Students are not required to design the entire Express server
architecture from scratch. Open reviewed pull requests and merge into `main`.
Keep meaningful commits and do not redesign the shared frontend.

Students implement the PostgreSQL connection/schema/queries/indexes and
reservation transactions; MongoDB connection/collections/CRUD; transactional
outbox, Change Streams, cross-database synchronization, retries/failure
handling, backup/recovery, and data-integrity verification.

The group size, deadlines, branch naming convention, review count, and submission policy are **Requires instructor confirmation**. Never commit credentials, secrets, passwords, tokens, or database strings.

## Related documents

[Architecture](03-SYSTEM-ARCHITECTURE.md), [API contract](04-API-CONTRACT.md), and [SOP](09-INSTRUCTOR-AND-STUDENT-SOP.md).
