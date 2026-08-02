import { describe, expect, it } from "vitest";

import { orderQueryKeys } from "./order-query-keys";

describe("orderQueryKeys", () => {
  it("builds hierarchical list and detail keys", () => {
    expect(orderQueryKeys.all).toEqual(["orders"]);
    expect(orderQueryKeys.lists()).toEqual(["orders", "list"]);
    expect(orderQueryKeys.details()).toEqual(["orders", "detail"]);
    expect(orderQueryKeys.detail("ORD-1001")).toEqual([
      "orders",
      "detail",
      "ORD-1001",
    ]);
  });

  it("includes normalized query state in list keys", () => {
    expect(
      orderQueryKeys.list({
        search: "  Avery ",
        statuses: ["Completed", "Pending", "Completed"],
        sortBy: "invalid",
        page: -4,
      }),
    ).toEqual([
      "orders",
      "list",
      {
        search: "Avery",
        statuses: ["Pending", "Completed"],
        sortBy: "createdAt",
        sortDirection: "desc",
        page: 1,
        pageSize: 10,
      },
    ]);
  });
});
