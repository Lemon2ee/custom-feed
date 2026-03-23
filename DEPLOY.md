# Deploying Custom Feed to Cloudflare Workers

## Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- A [Cloudflare account](https://dash.cloudflare.com/sign-up)
- `wrangler` CLI (included as a dev dependency — use via `npx wrangler`)

Authenticate with Cloudflare if you haven't already:

```bash
npx wrangler login
```

## 1. Configure Wrangler

Copy the example config:

```bash
cp wrangler.toml.example wrangler.toml
```

## 2. Create the D1 Database

```bash
npx wrangler d1 create custom-feed-db
```

This outputs a `database_id`. Copy it and update the `d1_databases` section in your `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "custom-feed-db"
database_id = "<paste-your-database-id-here>"
migrations_dir = "src/db/migrations"
```

## 3. Run Database Migrations

Apply all migrations to your remote D1 database:

```bash
npx wrangler d1 migrations apply custom-feed-db --remote
```

You can verify the tables were created:

```bash
npx wrangler d1 execute custom-feed-db --remote --command="SELECT name FROM sqlite_master WHERE type='table';"
```

## 4. Build and Deploy

```bash
npm run build
npx wrangler deploy
```

Wrangler will print the live URL (e.g. `https://custom-feed.<your-subdomain>.workers.dev`).

## Custom Domain (Optional)

If you have a domain managed by Cloudflare, you can serve the app from it instead of `*.workers.dev`. Add a `routes` block to your `wrangler.toml` and disable the default `workers.dev` subdomain:

```toml
workers_dev = false

routes = [
  { pattern = "feed.example.com", custom_domain = true }
]
```

Then redeploy with `npx wrangler deploy`. Cloudflare automatically creates the DNS record for you.

## Local Development

Local dev uses Miniflare (bundled with wrangler) which provides a local SQLite-backed D1 automatically. No extra setup is needed.

```bash
npm run dev
```

The local D1 data persists across restarts in `.wrangler/state/`.

### Seeding local D1 (first time only)

If the local database has no tables yet, apply migrations locally:

```bash
npx wrangler d1 migrations apply custom-feed-db --local
```

### Resetting local data

Delete the local state directory and re-apply migrations:

```bash
rm -rf .wrangler/state
npx wrangler d1 migrations apply custom-feed-db --local
```

## Schema Changes

When you modify `src/db/schema.ts`:

1. Generate a new migration:

   ```bash
   npm run db:generate
   ```

2. Apply it locally:

   ```bash
   npx wrangler d1 migrations apply custom-feed-db --local
   ```

3. Apply it to production:

   ```bash
   npx wrangler d1 migrations apply custom-feed-db --remote
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
| `D1_ERROR: no such table: sources` | Migrations haven't been applied. Run `npx wrangler d1 migrations apply custom-feed-db --remote`. |
| `database_id` is `<your-d1-database-id>` | You forgot to update `wrangler.toml` after `d1 create`. |
| Local dev returns empty data | Apply migrations with `--local`. See "Seeding local D1" above. |
| Build fails with `cloudflare:workers` error | Make sure you're building with `vinext build`, not `next build`. |
