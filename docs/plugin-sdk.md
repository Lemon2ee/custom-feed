# Plugin SDK Guide

## Plugin Types

- `input`: receives feed items from external systems.
- `output`: pushes notifications to external destinations.
- `transform`: optional enrichment/classification phase.

## Manifest Contract

Required fields:
- `id`, `name`, `version`, `type`, `entrypoint`,
- `capabilities`, `integrity`, `signature`.

Example:

```json
{
  "id": "community.rss-plus",
  "name": "RSS Plus",
  "version": "1.0.0",
  "type": "input",
  "entrypoint": "dist/index.js",
  "capabilities": ["http:outbound"],
  "integrity": "sha256-of-artifact",
  "signature": "publisher-signature"
}
```

## Input Connector Contract

Expose:
- `validateConfig(config)` -> `{ valid, errors? }`
- `poll(context, config)` -> `{ items, nextCursor? }`

Each item should provide:
- stable `externalItemId`,
- `title`,
- optional `contentText`, `url`, `publishedAt`, `tags`,
- original source payload in `rawPayload`.

## Output Connector Contract

Expose:
- `validateConfig(config)`
- `send(event, context, config)` -> `sent | retryable_error | permanent_error`

## Publishing Checklist

1. Add manifest file with all required fields.
2. Run `npm run plugin:validate path/to/manifest.json`.
3. Run connector contract tests for plugin package.
4. Publish release artifact on GitHub.
