# Instructor and Student SOP

## Instructor preparation

Confirm the official syllabus and rubric, prepare and verify the common
React/Vite frontend, prepare the minimal Express backend starter with its
registered API routes, middleware/error handling, environment template, and
fixed API Contract, document expected API usage, create the GitHub template,
and communicate requirements, deadlines, and rubric. The instructor also
provides the testing and acceptance requirements. The frontend and starter
architecture remain shared; group-specific database and integration work
begins after distribution. Students are not required to design the entire
Express server architecture from scratch. Group size, exact dates, and
institutional policies are **Requires instructor confirmation**.

## Student setup on Windows 11

Install the required development tools named by the course: Visual Studio Code, Git, and the instructor-approved Node.js 26 LTS environment. Clone the group's repository, create a development branch, and review the documentation before implementation. Create a backend-only `.env` from the documented variable names; never commit it. Create Supabase and Atlas resources according to instructor access and plan limits, then inspect them through SQL Editor and Atlas Data Explorer. Do not install an ORM, MongoDB Compass, pgAdmin, Docker, or unapproved infrastructure.

Distribute [the student starter guide](11-STUDENT-STARTER-GUIDE.md) with the
template. It contains the exact Windows PowerShell setup commands, starter
behavior, implementation responsibilities, recommended order, and evidence
checklist.

## Local workflow

Use the fixed ports: frontend `5173`, backend `4000`, API `/api`. Start only the approved frontend/backend development commands after implementation is authorized. Verify health, authentication, database connectivity, and integration status before feature testing. Keep database setup and test-data procedures repeatable and safe.

The starter can be run before database setup. Its health endpoint reports
`CONNECTED` only after the instructor-provided PostgreSQL/MongoDB connection
and ping checks succeed, `UNAVAILABLE` when configured settings cannot reach a
database, and `NOT_CONFIGURED` when settings are absent. Database-dependent
endpoints return HTTP 501. Students complete the PostgreSQL/MongoDB
schemas/collections, queries and indexes, reservation transactions, MongoDB
CRUD, outbox synchronization, Change Streams, retries, backup/recovery, and
integrity verification.

## Git workflow

Branch from the current `main`, make small meaningful commits, push the branch, open a pull request, request review, address feedback, and merge according to instructor rules. Do not redesign the shared frontend or commit secrets.

## Milestones

Recommended sequence: review requirements and architecture; establish schemas and seed test data; implement authentication and read operations; implement reservation transactions and idempotency; implement service requests; implement outbox/retry and Change Streams; add analytics/exports; perform security, recovery, performance, and acceptance testing; prepare portfolio and defense. Exact deadlines are **Requires instructor confirmation**.

## Submission and defense

Submit the repository, documentation, test evidence, database design, architecture explanation, and meaningful commit/PR history as required by the instructor. Demonstrate both databases, ownership, a concurrent conflict, idempotency, outbox retry, Change Streams, analytics export, security controls, backup/restoration, and limitations. Do not claim managed capabilities as student implementations.

## Related documents

[Workflow/security](07-SECURITY-AND-GITHUB-WORKFLOW.md), [testing](08-TESTING-AND-ACCEPTANCE-CRITERIA.md), and [decisions](10-DECISIONS-AND-CHANGELOG.md).
