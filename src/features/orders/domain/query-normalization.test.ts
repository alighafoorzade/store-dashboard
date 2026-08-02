import { describe, expect, it } from "vitest";

import {
  DEFAULT_ORDER_QUERY,
  normalizeOrderQuery,
} from "./query-normalization";

describe("normalizeOrderQuery", () => {
  it("returns safe defaults for absent or malformed input", () => {
    expect(normalizeOrderQuery()).toEqual(DEFAULT_ORDER_QUERY);
    expect(
      normalizeOrderQuery({
        search: 42,
        statuses: "Pending",
        sortBy: "id",
        sortDirection: "sideways",
        page: -2,
      }),
    ).toEqual(DEFAULT_ORDER_QUERY);
  });

  it("trims search and canonicalizes supported values", () => {
    expect(
      normalizeOrderQuery({
        search: "  Avery  ",
        statuses: ["Completed", "Pending", "Completed", "Refunded", null],
        sortBy: "customer",
        sortDirection: "asc",
        page: 3,
      }),
    ).toEqual({
      search: "Avery",
      statuses: ["Pending", "Completed"],
      sortBy: "customer",
      sortDirection: "asc",
      page: 3,
      pageSize: 10,
    });
  });

  it.each([
    0,
    1.5,
    Number.NaN,
    Number.POSITIVE_INFINITY,
    9_007_199_254_740_992,
  ])("normalizes invalid page value %s", (page) =>
    expect(normalizeOrderQuery({ page }).page).toBe(1),
  );
});
