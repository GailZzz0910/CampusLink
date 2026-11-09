# CampusLink Copilot Instructions

- Read the relevant documents in `docs/` before modifying project code.
- Treat `docs/01-IT315-SYLLABUS-ALIGNMENT.md` as authoritative for course requirements and grading.
- Treat `docs/04-API-CONTRACT.md` as authoritative for backend/frontend communication.
- Treat `docs/03-SYSTEM-ARCHITECTURE.md` as authoritative for selected technologies.
- Treat `docs/05-DATABASE-DESIGN.md` as authoritative for data ownership and schemas.
- Do not silently contradict existing documents or invent missing syllabus requirements.
- If requirements conflict, stop and explain the conflict before changing code or documentation.
- Keep implementation beginner-friendly and do not introduce unnecessary technologies.
- Never expose credentials, tokens, passwords, or connection strings.
- Add or update tests when changing functionality.
- Do not claim tests passed unless they were actually executed.
- Make small, understandable changes and explain important technical decisions in plain language.
- Use workspace search and retrieve relevant documentation instead of assuming project knowledge is in the current conversation.

When a requirement is not established by the source documents, write **Requires instructor confirmation** rather than guessing.
