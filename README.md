# CusatThings

The unofficial student commons for CUSAT (Cochin University of Science and Technology): a campus noticeboard, events, food nearby, quick trips from Kochi, and a campus map.

## What works today

- **Noticeboard**: post tips, search, filter by category, save posts, mark helpful, comment, delete your own posts.
- **Campus pulse**: event listings with a "going" toggle (hidden automatically once an event's date passes).
- **Food**, **trips** and **map**: filterable guides; map spots can be saved.
- Accessible dialogs, keyboard navigation, visible focus states, responsive layout.

**Important:** posts, comments, saves and RSVPs are stored in the visitor's own browser (`localStorage`). There is no shared backend yet, so one student cannot see another's posts. Editorial content (food, trips, places, events, starter posts) lives in `artifacts/cusatthings/src/data/campus.ts`. Review it before launch: event entries are placeholders and food hours are unverified.

## Structure

pnpm monorepo:

| Path | Purpose |
| --- | --- |
| `artifacts/cusatthings` | The website (React 19, Vite, Tailwind 4, wouter). **This is what gets deployed.** |
| `artifacts/api-server` | Express 5 API (health check only). Optional, not deployed by `vercel.json`. |
| `artifacts/cusatthings-design-system` | Design-token and component preview app. |
| `lib/*` | OpenAPI spec, generated client/Zod types, Drizzle DB package (empty schema). |

## Local development

Requires Node 22+ and pnpm 10 (`corepack enable`).

```bash
pnpm install
pnpm dev            # web app on http://localhost:5173
pnpm test           # unit tests (Node built-in runner)
pnpm typecheck      # type-check all packages
pnpm build          # type-check + build everything
```

Copy `.env.example` to `.env` only if you run the API server. The web app needs no environment variables.

## Deploy to GitHub and Vercel

```bash
git init -b main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<you>/Cusa-Connect.git
git push -u origin main
```

Then in Vercel: **Add New → Project → import the repo**. `vercel.json` at the repo root already sets everything:

- Root Directory: repository root (leave default)
- Framework Preset: Other
- Install: `pnpm install --frozen-lockfile`
- Build: `pnpm --filter @workspace/cusatthings run build`
- Output: `artifacts/cusatthings/dist/public`
- SPA rewrite and security headers (CSP, HSTS, frame and MIME protections)

No environment variables are required. Deploy, then open the URL and check the noticeboard, dialogs and a hard refresh on `/some-bad-path` (should show the 404 page).

The API server needs a persistent Node process and is **not** suitable for Vercel as-is. To add a shared feed, convert routes to Vercel Functions or host the API elsewhere, add a hosted Postgres (`DATABASE_URL`), authentication, validation and rate limiting.

## Security notes

- No secrets are committed; `.env*` is git-ignored.
- React escapes all user content; stored data is re-validated and length-limited when read back.
- API: allowlist CORS (`CORS_ORIGIN`), 100 kB body limit, no stack traces in responses.
- Run `pnpm audit` before each release.
