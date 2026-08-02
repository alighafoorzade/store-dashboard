import { describe, expect, it } from "vitest";

import { normalizeOrderQuery } from "../domain";
import { createRepository, defaultQuery } from "./repository.fixtures";

describe("MockOrderRepository contract", () => {
  it("returns queried, paginated orders through the repository contract", async () => {
    const result = await createRepository().getOrders(
      normalizeOrderQuery({
        search: "avery",
        statuses: ["Processing"],
        sortBy: "price",
        sortDirection: "asc",
      }),
    );

    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.items.map(({ id }) => id)).toEqual(["ORD-1001"]);
      expect(result.data).toMatchObject({
        page: 1,
        pageSize: 10,
        totalItems: 1,
        totalPages: 1,
      });
    }
  });

  it("returns a single order by ID", async () => {
    const result = await createRepository().getOrder("ORD-1014");

    expect(result).toMatchObject({
      ok: true,
      data: { id: "ORD-1014", customer: "Hana Kim" },
    });
  });

  it("is asynchronous even with an injected immediate delay", async () => {
    let settled = false;
    const pendingResult = createRepository()
      .getOrders(defaultQuery)
      .then(() => {
        settled = true;
      });

    expect(settled).toBe(false);
    await pendingResult;
    expect(settled).toBe(true);
  });
});
