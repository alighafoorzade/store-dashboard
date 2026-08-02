import { describe, expect, it } from "vitest";

import { orders } from "./query.fixtures";
import { queryOrders } from "./query";

describe("queryOrders", () => {
  it("combines search, filtering, sorting, and pagination", () => {
    expect(
      queryOrders(orders, {
        search: "avery",
        statuses: ["Processing", "Cancelled"],
        sortBy: "price",
        sortDirection: "desc",
        page: 1,
      }),
    ).toEqual({
      items: [orders[3], orders[1]],
      page: 1,
      pageSize: 10,
      totalItems: 2,
      totalPages: 1,
    });
  });

  it("handles an empty input collection", () => {
    expect(queryOrders([])).toMatchObject({
      items: [],
      page: 1,
      totalItems: 0,
      totalPages: 0,
    });
  });
});
