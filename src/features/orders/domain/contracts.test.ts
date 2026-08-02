import { describe, expect, expectTypeOf, it } from "vitest";

import {
  ORDERS_PAGE_SIZE,
  ORDER_DOMAIN_ERROR_CODES,
  ORDER_SORT_FIELDS,
  ORDER_STATUSES,
  SORT_DIRECTIONS,
  type Order,
  type OrderQuery,
  type OrderRepository,
  type OrderRepositoryResult,
  type OrderStatus,
  type PaginatedOrders,
} from "./index";

const order = {
  id: "ORD-1001",
  customer: "Avery Johnson",
  price: 129.95,
  items: 3,
  status: "Processing",
  createdAt: "2026-07-31T10:30:00.000Z",
} as const satisfies Order;

const query = {
  search: "avery",
  statuses: ["Pending", "Processing"],
  sortBy: "createdAt",
  sortDirection: "desc",
  page: 1,
  pageSize: ORDERS_PAGE_SIZE,
} as const satisfies OrderQuery;

describe("order domain contracts", () => {
  it("exposes only the supported statuses, sort fields, and directions", () => {
    expect(ORDER_STATUSES).toEqual([
      "Pending",
      "Processing",
      "Completed",
      "Cancelled",
    ]);
    expect(ORDER_SORT_FIELDS).toEqual(["price", "customer", "createdAt"]);
    expect(SORT_DIRECTIONS).toEqual(["asc", "desc"]);
  });

  it("keeps the list page size fixed at ten", () => {
    expect(ORDERS_PAGE_SIZE).toBe(10);
    expectTypeOf(query.pageSize).toEqualTypeOf<10>();
  });

  it("models repository success and failure as an explicit result", () => {
    const success: OrderRepositoryResult<Order> = { ok: true, data: order };
    const failure: OrderRepositoryResult<Order> = {
      ok: false,
      error: { code: "NOT_FOUND", message: "Order not found." },
    };

    expect(success.data).toBe(order);
    expect(failure.error).toEqual({
      code: "NOT_FOUND",
      message: "Order not found.",
    });
    expect(ORDER_DOMAIN_ERROR_CODES).toEqual([
      "INVALID_DATA",
      "NOT_FOUND",
      "UNEXPECTED",
    ]);
  });

  it("defines an asynchronous, implementation-agnostic repository", () => {
    expectTypeOf<OrderRepository["getOrders"]>().returns.toEqualTypeOf<
      Promise<OrderRepositoryResult<PaginatedOrders>>
    >();
    expectTypeOf<OrderRepository["getOrder"]>().returns.toEqualTypeOf<
      Promise<OrderRepositoryResult<Order>>
    >();
  });

  it("rejects unsupported contract literals during type checking", () => {
    // @ts-expect-error Refunded is not a supported order status.
    const unsupportedStatus: OrderStatus = "Refunded";
    // @ts-expect-error id is not a supported sort field.
    const unsupportedSort: OrderQuery["sortBy"] = "id";
    // @ts-expect-error page size is fixed at ten records.
    const unsupportedPageSize: OrderQuery["pageSize"] = 25;

    expect([unsupportedStatus, unsupportedSort, unsupportedPageSize]).toEqual([
      "Refunded",
      "id",
      25,
    ]);
  });
});
