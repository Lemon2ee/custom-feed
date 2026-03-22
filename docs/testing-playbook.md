# Testing Playbook

## Suites

- Unit tests: deterministic logic (rules, dedupe, helpers).
- Contract tests: input/output connector conformance.
- Integration tests: ingest -> normalize -> filter -> dispatch.
- UI tests: component-level behavior.
- E2E tests: user setup flow and dashboard behavior.

## Commands

```bash
npm run test
npm run test:contracts
npm run test:integration
npm run test:ui
npm run test:e2e:smoke
```

## Contributor Expectations

- New connectors must include contract tests.
- Rule engine changes require new unit tests.
- API changes require integration test updates.
- UI feature changes require UI tests and at least one E2E assertion for critical workflows.

## CI Gates

- Typecheck, lint, and all test suites must pass.
- Connector contract failures block merge.
- E2E smoke failures block release branches.
