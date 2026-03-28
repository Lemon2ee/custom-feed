---
name: new-connector
description: >
  Step-by-step guide for adding a new input source connector to this custom-feed project.
  Use this skill whenever the user wants to add a new data source, integrate a new API, create
  a new feed connector, or asks about how to wire up a new plugin/source/connector in this
  codebase — even if they phrase it as "add support for X" or "I want to pull data from Y".
---

# Adding a New Input Source Connector

This project uses a plugin architecture where each source is an `InputConnector<TConfig>`. Every
connector lives in `src/plugins/input/` and must be registered in two places.

Here is the complete checklist:

1. Create the connector file in `src/plugins/input/<name>.ts`
2. Add the connector ID to `SourceType` in `src/core/events/types.ts`
3. Register the connector in `src/plugins/registry.ts` (both the runtime registry and the UI catalog)

---

## Step 1 — Write the connector file

### Config schema (Zod)

Define a Zod schema for the user-facing config. This schema drives both runtime validation and the
UI form fields shown in the app. Keep it minimal — only what the connector genuinely needs.

```ts
import { z } from "zod"

const MyConnectorConfigSchema = z.object({
  apiKey: z.string().min(1),                        // required string
  limit: z.coerce.number().int().min(1).max(50).default(20), // optional with default
})

type MyConnectorConfig = z.infer<typeof MyConnectorConfigSchema>
```

### Implement InputConnector<TConfig>

```ts
import type { InputConnector } from "../../core/connectors/types"

export const myInputConnector: InputConnector<MyConnectorConfig> = {
  kind: "input",
  id: "my-source",   // must match the key used in registry.ts and SourceType

  validateConfig(raw) {
    const result = MyConnectorConfigSchema.safeParse(raw)
    if (!result.success) {
      return { valid: false, errors: result.error.errors.map(e => e.message) }
    }
    return { valid: true }
  },

  async poll(context, config) {
    // context provides: workspaceId, sourceId, lastCursor, db, logger, env
    // config is already validated

    const parsed = MyConnectorConfigSchema.parse(config)
    const cursor = context.lastCursor ? JSON.parse(context.lastCursor) : null

    const rawItems = await fetchFromApi(parsed, cursor)

    const items: ExternalItem[] = rawItems.map(item => ({
      externalItemId: String(item.id),   // must be stable and unique per source
      title: item.title,
      url: item.link ?? undefined,
      contentText: item.summary ?? undefined,
      author: item.author ?? undefined,
      publishedAt: new Date(item.timestamp * 1000).toISOString(),
      imageUrl: item.thumbnail ?? undefined,
      authorImageUrl: undefined,
      tags: ["my-source"],              // add any useful tags
      rawPayload: item,                 // keep the full original for debugging
    }))

    const nextCursor = rawItems.length > 0
      ? JSON.stringify({ since: rawItems[0].timestamp })
      : context.lastCursor ?? undefined

    return {
      items,
      nextCursor,
      details: { strategy: "api-v2", fetched: rawItems.length },  // logged to poll_logs
    }
  },
}
```

### Key rules for ExternalItem

| Field | Rule |
|---|---|
| `externalItemId` | Must be **stable** — the same item must produce the same ID across polls. The pipeline deduplicates on `(sourceId, externalItemId)`. |
| `publishedAt` | ISO 8601 string. If missing from the API, use the current time as a fallback. |
| `rawPayload` | Always store the full original object — it shows up in the event detail view. |
| `tags` | Always include the connector id as a tag. Add more tags when meaningful (e.g., category, feed name). |

### Cursor design

The cursor is a string stored in `sources.last_cursor`. Use it to do incremental fetches so you
don't re-process old items on every poll.

Common cursor patterns used in this project:

- **Timestamp** (Steam): store the Unix timestamp or ISO string of the newest item seen; filter
  `date > cursor` on the next poll.
- **Offset / ID** (Hacker News): store a JSON object like `{ currentId, notifiedIds: [] }` to
  track which items have already been delivered.
- **Page token / next cursor** (APIs that return a pagination token): store the token string.

On first poll `context.lastCursor` is `null` — treat this as an initial sync and ingest the
most recent N items without filtering by cursor (but do set `nextCursor` on the way out so
subsequent polls are incremental).

### Multi-strategy / fallback pattern (optional)

If the API may be unreliable (like Bilibili), implement multiple strategies and try them in order:

```ts
const strategies = [strategyA, strategyB, strategyC]
const errors: string[] = []

for (const strategy of strategies) {
  try {
    const result = await strategy(config, context)
    return { ...result, details: { strategy: strategy.name, previousErrors: errors } }
  } catch (err) {
    errors.push(`${strategy.name}: ${String(err)}`)
    context.logger.warn(`Strategy ${strategy.name} failed, trying next`, { err })
  }
}
throw new Error(`All strategies failed:\n${errors.join("\n")}`)
```

---

## Step 2 — Add to SourceType

Open `src/core/events/types.ts` and add your connector ID to the union:

```ts
// Before
export type SourceType = "rss" | "youtube" | "bilibili" | "hackernews" | "steam-news"

// After
export type SourceType = "rss" | "youtube" | "bilibili" | "hackernews" | "steam-news" | "my-source"
```

---

## Step 3 — Register in registry.ts

Open `src/plugins/registry.ts`. There are two places to update:

### 3a. Runtime registry (for the poll pipeline)

```ts
import { myInputConnector } from "./input/my-source"

export const connectorRegistry = {
  inputs: {
    // ...existing connectors...
    "my-source": myInputConnector,
  },
  // ...
}
```

### 3b. UI catalog (for the Add Source form)

The catalog drives the form fields shown when a user creates a source. Each field needs a `type`
and becomes a key in the stored `config_json`.

```ts
export const connectorCatalog = {
  inputs: [
    // ...existing entries...
    {
      id: "my-source",
      name: "My Source",                                     // human-readable display name
      description: "Pull items from My Source API",         // shown in the connector picker
      configFields: [
        {
          key: "apiKey",
          label: "API Key",
          type: "password" as const,                        // "text" | "url" | "number" | "password" | "select"
          required: true,
          placeholder: "sk-...",
        },
        {
          key: "limit",
          label: "Max items per poll",
          type: "number" as const,
          required: false,
          placeholder: "20",
        },
      ],
    },
  ],
  // ...
}
```

---

## Observability

The poll pipeline automatically writes a row to `poll_logs` after each poll. The `details` object
you return from `poll()` is serialized into `details_json` on that row — use it to surface
diagnostic info like which API strategy succeeded, how many items were fetched vs filtered, etc.

Use `context.logger` inside `poll()`:

```ts
context.logger.info("my-source poll complete", { fetched: items.length, cursor: nextCursor })
context.logger.warn("rate limited, backing off", { status: 429 })
```

---

## Checklist summary

- [ ] `src/plugins/input/<name>.ts` created with `InputConnector<TConfig>` implementation
- [ ] Zod config schema defined and used in both `validateConfig` and `poll`
- [ ] `externalItemId` is stable and unique per item
- [ ] Cursor handled: null on first poll → ingest recent N; subsequent polls → incremental
- [ ] `SourceType` union updated in `src/core/events/types.ts`
- [ ] Connector added to `connectorRegistry.inputs` in `src/plugins/registry.ts`
- [ ] Catalog entry added to `connectorCatalog.inputs` with all `configFields`

---

## Quick reference: types

| Type | File |
|---|---|
| `InputConnector<TConfig>` | `src/core/connectors/types.ts` |
| `ExternalItem` | `src/core/connectors/types.ts` |
| `InputPollContext` | `src/core/connectors/types.ts` |
| `ConnectorValidationResult` | `src/core/connectors/types.ts` |
| `SourceType` | `src/core/events/types.ts` |

## Real examples to read

| Connector | Notable technique |
|---|---|
| [steam-news.ts](src/plugins/input/steam-news.ts) | Timestamp cursor, BBCode image extraction |
| [hackernews.ts](src/plugins/input/hackernews.ts) | JSON cursor with ID tracking, flip-flop prevention |
| [bilibili.ts](src/plugins/input/bilibili.ts) | Multi-strategy fallback, cookie caching |
| [rss.ts](src/plugins/input/rss.ts) | Simplest case — good starting point |
