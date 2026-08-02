import { describe, expect, it } from "vitest";

import { ids, orders } from "./query.fixtures";
import { sortOrders } from "./query-sort";

describe("sortOrders", () => {
  it.each([
    ["price", "asc", ["ORD-1002", "ORD-1003", "ORD-1001", "ORD-1004"]],
    ["price", "desc", ["ORD-1004", "ORD-1001", "ORD-1002", "ORD-1003"]],
    ["customer", "asc", ["ORD-1002", "ORD-1004", "ORD-1003", "ORD-1001"]],
    ["customer", "desc", ["ORD-1001", "ORD-1003", "ORD-1004", "ORD-1002"]],
    ["createdAt", "asc", ["ORD-1004", "ORD-1002", "ORD-1003", "ORD-1001"]],
    ["createdAt", "desc", ["ORD-1001", "ORD-1003", "ORD-1002", "ORD-1004"]],
  ] as const)("sorts by %s %s", (sortBy, direction, expectedIds) => {
    expect(ids(sortOrders(orders, sortBy, direction))).toEqual(expectedIds);
  });

  it("keeps equal values stable and does not mutate the source", () => {
    const originalIds = ids(orders);

    expect(ids(sortOrders(orders, "price", "asc")).slice(0, 2)).toEqual([
      "ORD-1002",
      "ORD-1003",
    ]);
    expect(ids(orders)).toEqual(originalIds);
  });
});
