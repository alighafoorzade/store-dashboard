# E-Commerce Admin Panel Implementation Prompt

## Role

You are a **Senior Frontend Engineer**, **Software Architect**, **UI/UX Engineer**, **QA Engineer**, and **Security Engineer**.

Your goal is to build a **production-quality internal admin panel** that demonstrates clean architecture, scalability, maintainability, accessibility, performance, security, and testing best practices.

Do **not** build a quick demo. Build the project as if it will become a real production application.

---

# Project Overview

Implement an **Internal Order Management Panel** for an e-commerce company.

The application will be used by customer support operators to:

- View orders
- Search orders
- Filter orders
- Sort orders
- View order details

The backend is **not available**, therefore all data must come from mocked JSON data.

The project should be structured so replacing the mock backend with a real REST API requires minimal changes.

---

# Tech Stack

Use:

- React 19
- TypeScript
- Vite
- TanStack Query
- React Router
- Zod
- Tailwind CSS
- shadcn/ui
- React Hook Form (if needed)
- Vitest
- React Testing Library
- Playwright
- ESLint
- Prettier
- Husky
- lint-staged
- CommitLint

---

# Project Structure

Use a scalable feature-based architecture.

Example:

```
src/
    app/
    assets/
    components/
    features/
        orders/
            api/
            components/
            hooks/
            services/
            types/
            utils/
            pages/
    hooks/
    layouts/
    lib/
    mocks/
    routes/
    shared/
    styles/
    types/
    utils/
```

Keep business logic separate from UI.

---

# Mock Data

Create

```
src/mocks/orders.json
```

Requirements:

- Minimum 30 records
- Realistic customer names
- Different order statuses
- Different dates
- Different prices
- Different item counts

Example schema:

```ts
interface Order {
    id: string
    customer: string
    price: number
    items: number
    status:
        | "Pending"
        | "Processing"
        | "Completed"
        | "Cancelled"
    createdAt: string
}
```

---

# Data Layer

Do NOT access JSON directly from UI components.

Create a repository/service layer.

Example:

```
OrderRepository

getOrders()

getOrder(id)

searchOrders()

filterOrders()

sortOrders()
```

Later this layer should be replaceable with REST API implementation.

---

# UI Requirements

Create an Orders page.

Display a responsive data table.

Columns:

- Order Number
- Customer Name
- Total Price
- Item Count
- Status
- Created Date

Desktop and mobile must both be fully usable.

---

# Search

Support searching by:

- Order Number
- Customer Name

Search should be:

- Fast
- Debounced
- Case insensitive

---

# Filtering

Support filtering by:

- Pending
- Processing
- Completed
- Cancelled

Filtering should work together with searching and sorting.

---

# Sorting

Allow sorting by:

- Price
- Customer Name
- Created Date

Support ascending and descending order.

---

# Pagination

Implement client-side pagination.

Requirements:

- 10 records per page
- Previous / Next buttons
- Page numbers
- Current page indicator

Pagination must continue working after search/filter/sort.

---

# Order Details

Clicking a row should open a Drawer (preferred) or Modal.

Display:

- Order Number
- Customer
- Price
- Items
- Status
- Created Date

Design should be clean and responsive.

---

# Responsive Design

Support:

- Desktop
- Tablet
- Mobile

Table should remain usable on small screens.

Use responsive layouts instead of horizontal scrolling where practical.

---

# Accessibility

Follow WCAG 2.2 AA.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus
- Accessible dialogs
- ARIA labels
- Screen reader support

---

# Performance

Assume this application may eventually manage over 100,000 orders.

Avoid unnecessary renders.

Use:

- memoization where appropriate
- derived state
- efficient filtering
- efficient sorting

Design so server-side pagination can easily replace client-side pagination.

---

# State Management

Keep state minimal.

Prefer:

- URL search params
- React state
- TanStack Query cache

Avoid unnecessary global state.

---

# Error Handling

Handle:

- Empty state
- No search results
- Invalid order
- Unexpected errors

Provide user-friendly messages.

---

# Loading States

Even though data is mocked, simulate asynchronous loading.

Show:

- Skeleton loaders
- Loading indicators

---

# Reusable Components

Create reusable components when appropriate.

Examples:

- DataTable
- SearchInput
- Pagination
- StatusBadge
- EmptyState
- LoadingState
- SortButton
- FilterDropdown

Avoid duplicated code.

---

# Code Quality

Follow:

- SOLID
- DRY
- KISS
- Clean Architecture
- Feature-first organization

Never use:

- any
- duplicated business logic
- large components
- magic numbers

---

# Testing

Follow Test Driven Development.

Write tests for:

## Unit Tests

- search logic
- filtering
- sorting
- pagination
- utility functions

## Component Tests

- Orders table
- Search
- Filter
- Drawer
- Pagination

## End-to-End Tests

Verify:

- View orders
- Search
- Filter
- Sort
- Pagination
- Open order details

Coverage should prioritize business logic.

---

# Security

Treat all external data as untrusted.

Validate mock data using Zod before using it.

Avoid unsafe rendering.

---

# Documentation

Create the following files.

## README.md

Include:

### Project Overview

Describe the project.

### Installation

How to install dependencies.

### Running

How to start development.

### Build

How to build production.

### Assumptions

Document assumptions.

### Future Improvements

Explain how the application would change if a real backend existed.

Include:

- REST API integration
- React Query improvements
- Authentication
- Authorization
- Error handling
- Server-side pagination
- Server-side filtering
- Server-side sorting

---

## DECISIONS.md

Maximum one page.

Explain:

- Why the architecture was chosen.
- Why the folder structure was chosen.
- Why TanStack Query was selected.
- Why reusable components were extracted.
- How maintainability was improved.

Finally explain:

**If the system had 100,000 orders, what would change?**

Discuss:

- Server-side pagination
- Server-side filtering
- Server-side sorting
- Virtualized tables
- Database indexing
- Caching
- Infinite scrolling vs pagination
- API optimization

---

# Git Quality

Configure:

- ESLint
- Prettier
- Husky
- lint-staged
- CommitLint

Pre-commit:

- ESLint
- Prettier
- TypeScript

Pre-push:

- Unit tests
- Build

Reject commits that violate Conventional Commits.

---

# Deliverables

The final repository should include:

- Source code
- orders.json
- README.md
- DECISIONS.md
- Unit tests
- Component tests
- Playwright tests
- ESLint configuration
- Prettier configuration
- Husky
- CommitLint
- lint-staged configuration

The final solution should be production-ready, easy to maintain, easy to extend, and demonstrate senior-level frontend engineering practices rather than simply satisfying the functional requirements.