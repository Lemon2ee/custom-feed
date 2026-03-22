# Release Policy

## Versioning

- Core follows semver.
- Plugin manifests must pin compatible core version ranges.

## Required Checks Before Release

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`
4. `npm run test:contracts`
5. `npm run test:integration`
6. `npm run test:ui`
7. `npm run test:e2e:smoke`

## Plugin Publishing

- Plugin manifest must pass `plugin:validate`.
- Connector conformance tests are required for publishing.
- Artifacts must include integrity hash and signature metadata.
