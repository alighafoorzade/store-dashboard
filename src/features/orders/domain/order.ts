export const ORDER_STATUSES = Object.freeze([
  "Pending",
  "Processing",
  "Completed",
  "Cancelled",
] as const);

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const ORDER_SORT_FIELDS = Object.freeze([
  "price",
  "customer",
  "createdAt",
] as const);

export type OrderSortField = (typeof ORDER_SORT_FIELDS)[number];

export const SORT_DIRECTIONS = Object.freeze(["asc", "desc"] as const);

export type SortDirection = (typeof SORT_DIRECTIONS)[number];

export const ORDERS_PAGE_SIZE = 10 as const;

export type OrdersPageSize = typeof ORDERS_PAGE_SIZE;

export interface Order {
  readonly id: string;
  readonly customer: string;
  readonly price: number;
  readonly items: number;
  readonly status: OrderStatus;
  readonly createdAt: string;
}

export interface OrderQuery {
  readonly search: string;
  readonly statuses: readonly OrderStatus[];
  readonly sortBy: OrderSortField;
  readonly sortDirection: SortDirection;
  readonly page: number;
  readonly pageSize: OrdersPageSize;
}

export interface PaginatedOrders {
  readonly items: readonly Order[];
  readonly page: number;
  readonly pageSize: OrdersPageSize;
  readonly totalItems: number;
  readonly totalPages: number;
}
