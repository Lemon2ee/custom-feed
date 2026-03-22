# Contributing

Thanks for helping improve Custom Feed Middleware.

## Development Workflow

1. Install dependencies: `npm install`
2. Start app: `npm run dev`
3. Add or update tests for your change.
4. Run quality gates locally:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test`
   - `npm run test:contracts`

## Connector Contributions

- Follow `src/core/connectors/types.ts` contracts.
- Include contract tests under `tests/contracts`.
- Provide fixture examples under `tests/fixtures` when external payload formats matter.
- Document required config and capabilities in plugin docs.

## UI Contributions

- Follow shadcn-style component patterns in `components/ui`.
- Add component tests in `tests/ui`.
- Cover major user flows in `tests/e2e`.

## Plugin Safety Expectations

- Assume plugins are untrusted by default.
- Use explicit capability declarations.
- Keep permission requests minimal and auditable.
