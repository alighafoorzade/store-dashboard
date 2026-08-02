import { describe, expect, it } from "vitest";

import { ids, orders } from "./query.fixtures";
import { filterOrders, searchOrders } from "./query-search";

describe("searchOrders", () => {
  it("matches IDs and customer names case-insensitively", () => {
    expect(ids(searchOrders(orders, "ord-1003"))).toEqual(["ORD-1003"]);
    expect(ids(searchOrders(orders, "  AVERY  "))).toEqual([
      "ORD-1002",
      "ORD-1004",
    ]);
  });

  it("returns every order for blank input", () => {
    expect(searchOrders(orders, "   ")).toBe(orders);
  });
});

describe("filterOrders", () => {
  it("combines statuses and treats no selection as all statuses", () => {
    expect(ids(filterOrders(orders, ["Pending", "Cancelled"]))).toEqual([
      "ORD-1001",
      "ORD-1004",
    ]);
    expect(filterOrders(orders, [])).toBe(orders);
  });
});
