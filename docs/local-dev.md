# Local Development

## Prerequisites

- Node.js 20.9+
- npm 10+

## Setup

```bash
npm install
npm run dev
```

## Useful Commands

- `npm run typecheck`
- `npm run lint`
- `npm run test:contracts`
- `npm run test:e2e:smoke`

## Notes

- Local development uses a D1 database via `wrangler dev`. To reset, delete `.wrangler/state/`.
- The D1 schema is defined in `src/db/schema.ts`; run `npm run db:generate` after schema changes.
