# Architecture

## Data Flow

1. Input connectors poll source systems (RSS, YouTube).
2. Incoming items are normalized into `NormalizedEvent`.
3. Event dedupe prevents duplicate notifications.
4. Rule engine maps events to output destinations.
5. Delivery worker executes output connectors with retry semantics.

## Core Boundaries

- `src/core/connectors`: strict interface contracts.
- `src/core/events`: normalized event model + dedupe keys.
- `src/core/rules`: deterministic filtering/simulation.
- `src/core/plugins`: install/manifest/runtime controls.
- `src/core/pipeline`: orchestration layer.
- `src/workers`: scheduler and dispatch execution.

## Persistence

MVP includes a repository abstraction plus D1-ready schema:
- `sources`, `outputs`, `events`, `rules`, `deliveries`,
- `plugin_installs`, `plugin_secrets`.

Persistence is backed by Cloudflare D1 (SQLite). The schema is defined in `src/db/schema.ts` and accessed via Kysely.

## Security

- Third-party plugins are untrusted by default.
- Install requires manifest parsing and integrity checks.
- Runtime is capability-aware and deny-by-default.
- Plugin operations should be auditable.
