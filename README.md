# CampusLink

CampusLink is the IT315 Distributed Database Management Systems Performance Innovative Task (PIT): a campus services and resource management platform demonstrating one application using PostgreSQL and MongoDB.

## Documentation reading order

1. [Project overview](docs/00-PROJECT-OVERVIEW.md)
2. [IT315 syllabus alignment](docs/01-IT315-SYLLABUS-ALIGNMENT.md)
3. [Requirements](docs/02-CAMPUSLINK-REQUIREMENTS.md)
4. [System architecture](docs/03-SYSTEM-ARCHITECTURE.md)
5. [API contract](docs/04-API-CONTRACT.md)
6. [Database design](docs/05-DATABASE-DESIGN.md)
7. [Integration and reliability](docs/06-DATA-INTEGRATION-AND-RELIABILITY.md)
8. [Security and GitHub workflow](docs/07-SECURITY-AND-GITHUB-WORKFLOW.md)
9. [Testing and acceptance](docs/08-TESTING-AND-ACCEPTANCE-CRITERIA.md)
10. [Instructor and student SOP](docs/09-INSTRUCTOR-AND-STUDENT-SOP.md)
11. [Decisions and changelog](docs/10-DECISIONS-AND-CHANGELOG.md)
12. [Student starter guide](docs/11-STUDENT-STARTER-GUIDE.md)

## Selected stack

React, Vite, JavaScript, plain CSS, React Router, and Fetch API; Node.js 26 LTS, Express 5, REST, and ES modules; Supabase Free PostgreSQL; MongoDB Atlas Free; and the `pg` and official `mongodb` drivers. See the architecture document for authoritative details.

## Project layout

```text
.github/copilot-instructions.md
backend/
docs/
frontend/
README.md
.gitignore
```

## Instructor-provided template

The instructor provides the common React/Vite frontend, a minimal Express
backend starter, the registered API route structure, basic middleware and
error handling, the backend environment-variable template, the fixed API
contract, and the testing and acceptance requirements. Students are not
required to design the entire Express server architecture from scratch.

The starter backend runs without database credentials. Its health endpoint
reports PostgreSQL and MongoDB as `NOT_CONFIGURED`; database-dependent routes
return HTTP 501 until implemented by the student group.

## Student implementation scope

Students implement the PostgreSQL and MongoDB connections, schemas and
collections, SQL queries and indexes, reservation transactions and
concurrency controls, MongoDB CRUD, transactional outbox synchronization,
Change Streams, retry and failure handling, backup and recovery, and
data-integrity verification. The frontend and API contract must remain
compatible with `http://localhost:4000/api`.

See [backend setup](backend/README.md), the
[student starter guide](docs/11-STUDENT-STARTER-GUIDE.md), and the
[instructor/student SOP](docs/09-INSTRUCTOR-AND-STUDENT-SOP.md) for Windows
PowerShell commands and implementation expectations.
