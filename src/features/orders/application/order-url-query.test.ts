import { describe, expect, it } from "vitest";

import { normalizeOrderQuery } from "../domain";
import {
  buildOrderSearchParams,
  createOrderUrl,
  parseOrderSearchParams,
} from "./order-url-query";

describe("parseOrderSearchParams", () => {
  it("restores valid bookmarked list state", () => {
    const params = new URLSearchParams(
      "q=Avery&status=Pending&status=Completed&sort=price&direction=asc&page=3",
    );

    expect(parseOrderSearchParams(params)).toEqual({
      search: "Avery",
      statuses: ["Pending", "Completed"],
      sortBy: "price",
      sortDirection: "asc",
      page: 3,
      pageSize: 10,
    });
  });

  it("supports comma-separated statuses and rejects invalid values", () => {
    const params = new URLSearchParams(
      "status=Completed%2CPending%2CRefunded&sort=id&direction=down&page=1.5",
    );

    expect(parseOrderSearchParams(params)).toEqual({
      search: "",
      statuses: ["Pending", "Completed"],
      sortBy: "createdAt",
      sortDirection: "desc",
      page: 1,
      pageSize: 10,
    });
  });

  it.each(["0", "-1", "1.5", "Infinity", "9007199254740992"])(
    "normalizes unsafe page value %s",
    (page) => {
      expect(parseOrderSearchParams(new URLSearchParams({ page })).page).toBe(
        1,
      );
    },
  );
});

describe("buildOrderSearchParams", () => {
  it("writes canonical state while preserving unrelated parameters", () => {
    const current = new URLSearchParams("view=compact&q=old&page=9");
    const query = normalizeOrderQuery({
      search: "Avery",
      statuses: ["Completed", "Pending"],
      sortBy: "customer",
      sortDirection: "asc",
      page: 2,
    });

    expect(buildOrderSearchParams(current, query).toString()).toBe(
      "view=compact&q=Avery&status=Pending&status=Completed&sort=customer&direction=asc&page=2",
    );
  });

  it("omits default values and safely builds local URLs", () => {
    expect(
      buildOrderSearchParams(
        new URLSearchParams("page=4"),
        normalizeOrderQuery(),
      ).toString(),
    ).toBe("");
    expect(createOrderUrl("/orders", new URLSearchParams("q=Avery"))).toBe(
      "/orders?q=Avery",
    );
    expect(createOrderUrl("javascript:alert(1)", new URLSearchParams())).toBe(
      "/",
    );
  });
});
