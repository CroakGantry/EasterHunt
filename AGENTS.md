# AGENTS.md

## Cursor Cloud specific instructions

This is a single Next.js 16 app (App Router) — a client-side Easter Treasure Hunt game with no backend, database, or external service dependencies.

### Quick reference (all commands run from repo root)

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (binds `0.0.0.0:3000`) |
| Lint | `npm run lint` |
| Tests (watch) | `npm test` |
| Tests (CI) | `npm run test:run` |
| Build | `npm run build` |

### Known issues

- One test in `tests/page.test.tsx` fails due to a text mismatch: the test expects `"Find the six passwords to unlock six clues."` but the component renders `"Find six passwords to unlock six clues."` (without "the"). This is a pre-existing issue, not caused by environment setup.

### Notes

- The app is entirely client-side; unlocked-card state is persisted in browser `localStorage`.
- Static video/poster assets live under `public/videos/` and `public/posters/`.
- Path alias `@/*` maps to the project root (configured in `tsconfig.json`).
