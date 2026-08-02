import { describe, expect, it } from "vitest";

import { orders } from "./query.fixtures";
import { paginateOrders } from "./query-pagination";

const manyOrders = Array.from({ length: 23 }, (_, index) => ({
  ...orders[index % orders.length],
  id: `ORD-${String(index + 1).padStart(4, "0")}`,
}));

describe("paginateOrders", () => {
  it("returns full and partial pages with accurate metadata", () => {
    expect(paginateOrders(manyOrders, 1)).toMatchObject({
      page: 1,
      pageSize: 10,
      totalItems: 23,
      totalPages: 3,
    });
    expect(paginateOrders(manyOrders, 1).items).toHaveLength(10);
    expect(paginateOrders(manyOrders, 3).items).toHaveLength(3);
  });

  it("clamps invalid and out-of-range pages safely", () => {
    expect(paginateOrders(manyOrders, -1).page).toBe(1);
    expect(paginateOrders(manyOrders, 1.5).page).toBe(1);
    expect(paginateOrders(manyOrders, 99).page).toBe(3);
  });

  it("returns a usable first page for an empty collection", () => {
    expect(paginateOrders([], 4)).toEqual({
      items: [],
      page: 1,
      pageSize: 10,
      totalItems: 0,
      totalPages: 0,
    });
  });
});
