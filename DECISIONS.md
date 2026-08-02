# Architecture Decisions

## Context

This repository is a production-oriented demonstration of an orders dashboard.
It uses synthetic local data today but preserves boundaries needed by an API.

## Decisions

1. **Use Next.js 16 App Router.** It replaces the brief's Vite bootstrap and
   React Router with file-based routing, metadata, route loading/error states,
   production builds, and URL search parameters in one supported runtime.
2. **Organize orders by layer.** Domain code is dependency-free; application
   hooks orchestrate TanStack Query; infrastructure validates and retrieves
   data; components render behavior. Dependency Cruiser enforces boundaries.
3. **Depend on an `OrderRepository`.** The mock adapter is injected through the
   provider. A REST adapter can replace it without rewriting consuming UI.
4. **Treat URL state as shareable state.** Search, statuses, sort, direction,
   and page are validated and normalized. Invalid input safely returns defaults.
5. **Query locally only for the demo.** Pure deterministic utilities operate on
   the small mock dataset. A real service must own filtering, sorting,
   pagination, authorization, and response validation.
6. **Prefer accessible responsive composition.** Semantic tables serve larger
   screens, cards serve mobile, and dialogs preserve keyboard focus. Shared
   primitives provide focus visibility, touch targets, and reduced motion.
7. **Make quality executable.** Vitest, Playwright, axe, ESLint, TypeScript,
   Knip, Madge, Dependency Cruiser, and production builds form merge gates.
8. **Use defense in depth.** CSP and security headers protect responses, while
   pinned CI scanners cover dependencies, secrets, SAST, CodeQL, and DAST.

## Scale and operational consequences

At 100,000 orders, use server-side indexed queries and cursor pagination, with
composite indexes driven by observed filters and sorts. Cache bounded query
results with explicit invalidation and virtualize only the rows already fetched.
Instrument API latency, failures, traces, structured logs, and privacy-safe audit
events. Authentication establishes identity; server-side authorization decides
which orders and actions that identity may access.

These choices add adapters and validation, but isolate change, keep tests
deterministic, and prevent the browser from becoming a security or scale boundary.
