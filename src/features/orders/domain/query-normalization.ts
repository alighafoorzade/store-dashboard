import {
  ORDERS_PAGE_SIZE,
  ORDER_SORT_FIELDS,
  ORDER_STATUSES,
  SORT_DIRECTIONS,
  type OrderQuery,
  type OrderSortField,
  type OrderStatus,
  type SortDirection,
} from "./order";

export interface OrderQueryInput {
  readonly search?: unknown;
  readonly statuses?: unknown;
  readonly sortBy?: unknown;
  readonly sortDirection?: unknown;
  readonly page?: unknown;
}

export const DEFAULT_ORDER_QUERY: Readonly<OrderQuery> = Object.freeze({
  search: "",
  statuses: Object.freeze([]),
  sortBy: "createdAt",
  sortDirection: "desc",
  page: 1,
  pageSize: ORDERS_PAGE_SIZE,
});

function isOrderStatus(value: unknown): value is OrderStatus {
  return (
    typeof value === "string" &&
    (ORDER_STATUSES as readonly string[]).includes(value)
  );
}

function isOrderSortField(value: unknown): value is OrderSortField {
  return (
    typeof value === "string" &&
    (ORDER_SORT_FIELDS as readonly string[]).includes(value)
  );
}

function isSortDirection(value: unknown): value is SortDirection {
  return (
    typeof value === "string" &&
    (SORT_DIRECTIONS as readonly string[]).includes(value)
  );
}

export function normalizeOrderQuery(
  input: Readonly<OrderQueryInput> = {},
): Readonly<OrderQuery> {
  const selectedStatuses = new Set(
    Array.isArray(input.statuses) ? input.statuses.filter(isOrderStatus) : [],
  );

  return Object.freeze({
    search: typeof input.search === "string" ? input.search.trim() : "",
    statuses: Object.freeze(
      ORDER_STATUSES.filter((status) => selectedStatuses.has(status)),
    ),
    sortBy: isOrderSortField(input.sortBy)
      ? input.sortBy
      : DEFAULT_ORDER_QUERY.sortBy,
    sortDirection: isSortDirection(input.sortDirection)
      ? input.sortDirection
      : DEFAULT_ORDER_QUERY.sortDirection,
    page:
      typeof input.page === "number" &&
      Number.isSafeInteger(input.page) &&
      input.page > 0
        ? input.page
        : DEFAULT_ORDER_QUERY.page,
    pageSize: ORDERS_PAGE_SIZE,
  });
}
