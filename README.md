# Custom Feed Middleware

A self-hosted feed aggregator that ingests from multiple sources (RSS, YouTube, Steam, Bilibili, and more via plugins), applies filtering rules, and delivers notifications to your devices through services like [Bark](https://github.com/Finb/Bark) and [ntfy](https://ntfy.sh).

Runs on Cloudflare Workers with D1 (SQLite) for storage.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Local dev uses Miniflare with a local SQLite-backed D1 — no Cloudflare account needed.

## Deploy to Cloudflare

Full walkthrough in [DEPLOY.md](DEPLOY.md). The short version:

```bash
# 1. Authenticate with Cloudflare
npx wrangler login

# 2. Copy the example config
cp wrangler.toml.example wrangler.toml

# 3. Create the D1 database and note the database_id from the output
npx wrangler d1 create custom-feed-db

# 4. Edit wrangler.toml — paste your database_id into the d1_databases section

# 5. Apply all migrations to the remote database
npx wrangler d1 migrations apply custom-feed-db --remote

# 6. Build and deploy
npm run build
npx wrangler deploy
```

### Custom domain (optional)

If you have a domain already managed by Cloudflare, you can serve the app from it instead of `*.workers.dev`. Add a `routes` block to your `wrangler.toml` and set `workers_dev = false`:

```toml
workers_dev = false

routes = [
  { pattern = "feed.example.com", custom_domain = true }
]
```

Then redeploy with `npx wrangler deploy`. Cloudflare automatically creates the DNS record for you.

## Securing Your Instance

By default, the app is open to anyone who knows the URL. There is no data leakage risk, but an unauthenticated visitor could configure sources and push notifications to your devices. The app will show a warning banner if it detects no authentication is in place.

The recommended way to lock it down is **Cloudflare Access** (free for up to 50 users), which adds a login gate in front of your Worker with zero code changes:

1. Go to the [Cloudflare Zero Trust dashboard](https://one.dash.cloudflare.com)
2. Navigate to **Access → Applications → Add an application → Self-hosted**
3. Set the application domain to your Worker's domain (e.g. `feed.example.com`)
4. Under **Identity providers**, add at least one — "One-time PIN" is the simplest (Cloudflare emails you a code, no third-party setup)
5. Create a policy: **Allow** → **Emails** → enter your email address
6. Save. Visitors now see a Cloudflare login screen before reaching the app.

If your instance is on a private network (e.g. LAN-only, behind a VPN), you can dismiss the in-app warning and skip this step entirely.

## Documentation

| Document | Description |
|----------|-------------|
| [DEPLOY.md](DEPLOY.md) | Detailed deployment guide (database setup, migrations, custom domains, secrets, troubleshooting) |
| [docs/architecture.md](docs/architecture.md) | System architecture and data flow |
| [docs/plugin-sdk.md](docs/plugin-sdk.md) | Writing input/output plugins |
| [docs/testing-playbook.md](docs/testing-playbook.md) | Test strategy and commands |
| [docs/local-dev.md](docs/local-dev.md) | Local development setup |

## Testing

```bash
npm run test                # full unit suite
npm run test:contracts      # connector conformance tests
npm run test:integration    # pipeline integration tests
npm run test:ui             # component tests
npm run test:e2e:smoke      # smoke E2E flow
npm run test:e2e            # full Playwright suite
```
