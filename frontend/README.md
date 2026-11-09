# CampusLink Frontend

The shared CampusLink frontend is a React/Vite JavaScript application for the IT315 project. It is intentionally reusable by every student group and does not contain backend or database source code.

## Modes

- **Demo mode:** enabled by default and uses clearly labeled fictional records so the interface can be reviewed before the backend exists.
- **Live API mode:** sends requests to `VITE_API_BASE_URL` (default `http://localhost:4000/api`). Live request failures are displayed and never silently replaced with demo records.

## Development

```powershell
npm install
npm run dev
```

The Vite development server uses port `5173`. Copy `.env.example` to `.env` only when local configuration is needed. Do not place credentials or backend secrets in frontend environment variables.

## Validation

```powershell
npm test
npm run build
```

## Pages

Sign In, Dashboard, Facilities, Reservations, Service Desk, Analytics and Reports, and Administration and Integration Monitoring.
