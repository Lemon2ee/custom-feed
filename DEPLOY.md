# Deploying Custom Feed to Cloudflare Workers

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- `wrangler` CLI (included as a dev dependency — use via `npx wrangler`)

Authenticate with Cloudflare if you haven't already:

```bash
npx wrangler login
```

## 1. Create the D1 Database

```bash
npx wrangler d1 create custom-feed-db
```

This outputs a `database_id`. Copy it and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "custom-feed-db"
database_id = "<paste-your-database-id-here>"
```

## 2. Run the Database Migration

Apply the schema to your remote D1 database:

```bash
npx wrangler d1 execute custom-feed-db --remote \
  --file=src/db/migrations/20260322102459_illegal_proteus/migration.sql
```

You can verify the tables were created:

```bash
npx wrangler d1 execute custom-feed-db --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## 3. Build and Deploy

```bash
npm run build
npx wrangler deploy
```

Wrangler will print the live URL (e.g. `https://custom-feed.<your-subdomain>.workers.dev`).

## Local Development

Local dev uses Miniflare (bundled with wrangler) which provides a local SQLite-backed D1 automatically. No extra setup is needed.

```bash
npm run dev
```

The local D1 data persists across restarts in `.wrangler/state/`.

### Seeding local D1 (first time only)

If the local database has no tables yet, apply the migration locally:

```bash
npx wrangler d1 execute custom-feed-db --local \
  --file=src/db/migrations/20260322102459_illegal_proteus/migration.sql
```

### Resetting local data

Delete the local state directory and re-run the migration:

```bash
rm -rf .wrangler/state
npx wrangler d1 execute custom-feed-db --local \
  --file=src/db/migrations/20260322102459_illegal_proteus/migration.sql
```

## Schema Changes

When you modify `src/db/schema.ts`:

1. Generate a new migration:

   ```bash
   npm run db:generate
   ```

2. Apply it locally:

   ```bash
   npx wrangler d1 execute custom-feed-db --local \
     --file=src/db/migrations/<new-migration-folder>/migration.sql
   ```

3. Apply it to production:

   ```bash
   npx wrangler d1 execute custom-feed-db --remote \
     --file=src/db/migrations/<new-migration-folder>/migration.sql
   ```

## Custom Domain (Optional)

To serve from your own domain instead of `*.workers.dev`:

1. Go to **Cloudflare Dashboard > Workers & Pages > custom-feed > Settings > Domains & Routes**
2. Add a custom domain (must be proxied through Cloudflare DNS)

Or add a route in `wrangler.toml`:

```toml
routes = [
  { pattern = "feed.example.com", custom_domain = true }
]
```

## Environment Variables / Secrets

If you need to add secrets (not stored in `wrangler.toml`):

```bash
npx wrangler secret put MY_SECRET_NAME
```

This prompts for the value interactively. Secrets are available at runtime via `env.MY_SECRET_NAME`.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `D1_ERROR: no such table: sources` | Migration hasn't been applied. Run the `d1 execute` command above. |
| `database_id` is `placeholder-...` | You forgot to update `wrangler.toml` after `d1 create`. |
| Local dev returns empty data | Apply the migration with `--local`. See "Seeding local D1" above. |
| Build fails with `cloudflare:workers` error | Make sure you're building with `vinext build`, not `next build`. |
