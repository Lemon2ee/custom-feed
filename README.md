# Custom Feed Middleware

Plugin-first feed middleware for:
- multi-source ingest (RSS, YouTube, more via plugins),
- deterministic filtering/rule matching,
- multi-channel delivery (ntfy, Bark, and additional output connectors).

The system is designed to start self-hosted and evolve to multi-tenant without major domain rewrites.

## Core Architecture

Pipeline:
1. Source connector polls or receives feed data.
2. Data is normalized into a shared event schema.
3. Events are deduplicated and stored.
4. Rules are evaluated in deterministic priority order.
5. Deliveries are queued and dispatched by output connectors.

Key modules:
- `src/core/connectors`: input/output connector contracts
- `src/core/rules`: rule evaluator + simulation support
- `src/core/plugins`: manifest validation, installer, runtime boundaries
- `src/core/pipeline`: ingest + delivery orchestration
- `src/db`: schema and repository layer
- `src/workers`: ingest scheduler + delivery worker

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Testing

- `npm run test` - full unit suite
- `npm run test:contracts` - connector conformance tests
- `npm run test:integration` - pipeline integration tests
- `npm run test:ui` - component tests
- `npm run test:e2e:smoke` - smoke E2E flow
- `npm run test:e2e` - full Playwright suite

## API Overview (MVP)

- `POST/GET/PATCH /api/sources`
- `POST/GET/PATCH /api/outputs`
- `POST/GET/PATCH /api/rules`
- `POST /api/rules/simulate`
- `GET /api/events`
- `GET /api/deliveries`
- `POST /api/plugins/install`
- `POST /api/plugins/update`
- `POST /api/plugins/disable`

## Plugin Model

Third-party plugins are treated as untrusted:
- declarative manifest with capabilities,
- integrity/signature checks before activation,
- deny-by-default runtime permissions,
- auditable install/update/disable actions.

See:
- `docs/plugin-sdk.md`
- `docs/architecture.md`
- `docs/testing-playbook.md`

## Cloudflare Notes

Target runtime is Cloudflare-compatible (`wrangler.toml` included). D1/KV/Queues wiring is represented in module boundaries so production adapters can be plugged in without changing connector/rule contracts.
