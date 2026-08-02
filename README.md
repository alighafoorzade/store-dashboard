# Shop Dashboard

An accessible order-management dashboard built with Next.js 16, React 19,
TypeScript, TanStack Query, and Tailwind CSS. It supports URL-persisted search,
status filters, sorting, pagination, responsive results, and order details.

## Requirements and installation

Use Node.js 24 and npm with the committed `package-lock.json`.

```bash
npm ci
```

## Run and build

```bash
npm run dev
npm run build
npm run start
```

## Tests and quality checks

```bash
npm run test:unit -- --run
npm run test:coverage
npm run test:e2e
npm run format:check
npm run lint
npm run typecheck
npm run check:dead-code
npm run check:cycles
npm run check:architecture
npm run validate
```

Playwright builds and starts the production application unless an external test
server is selected. `validate` runs formatting, linting, types, coverage,
architecture checks, and a production build.

## Security and analysis

```bash
npm run security:audit
```

CI also runs Gitleaks, Semgrep, CodeQL, Dependabot, and an OWASP ZAP baseline.
Authorized Sonar setup is documented in [docs/sonar.md](docs/sonar.md).

## Architecture

- `src/app` owns the App Router page, layout, and route failure states.
- `src/components/ui` contains reusable accessible UI primitives.
- `src/features/orders/domain` contains dependency-free contracts and queries.
- `src/features/orders/application` contains query keys, hooks, and providers.
- `src/features/orders/infrastructure` validates data and implements storage.
- `src/features/orders/components` contains order-specific presentation.

The UI calls typed hooks, hooks call the injected `OrderRepository`, and the
repository returns safe domain results. The mock adapter validates JSON with
Zod before pure search, filter, stable sort, and pagination utilities run.
TanStack Query caches results, while validated URL parameters preserve list
state across refreshes and bookmarks.

## Assumptions

- All customer and order records are deterministic synthetic data.
- Prices are displayed in USD and mock dates are valid ISO timestamps.
- Ten records form a page; the current dataset is intentionally client-queryable.
- Authentication and authorization are not implemented in this demonstration.
- Unsafe data is rendered as text and repository failures expose safe messages.

## Replacing the mock repository with REST

Implement `OrderRepository` with an HTTP adapter and inject it through
`OrdersProvider`; components and hooks should not change. Translate normalized
query fields to API parameters, validate responses at the boundary, map HTTP
failures to domain errors, and add request cancellation plus retry policy.

Authentication should establish a server-validated session. Authorization must
be enforced by the API for every order and action, never only by hidden UI.
Move filtering, sorting, and pagination to the server and return result totals
or cursors. Add observability with privacy-safe logs, traces, metrics, and audit
events.

For 100,000 orders, never download the full collection. Use indexed server-side
queries, preferably cursor pagination for changing data, and composite indexes
matching status/date/price access patterns. Add bounded API and TanStack Query
caches with explicit invalidation. Virtualize long on-screen result windows,
but keep database pagination as the primary scale boundary.

## Framework substitutions

The original brief mentioned Vite and React Router. Next.js App Router provides
the build/runtime, route ownership, metadata, loading/error boundaries, and URL
search-parameter integration instead. `next dev`, `next build`, and `next start`
replace Vite commands; App Router navigation replaces React Router.

See [DECISIONS.md](DECISIONS.md) for the concise decision record.
