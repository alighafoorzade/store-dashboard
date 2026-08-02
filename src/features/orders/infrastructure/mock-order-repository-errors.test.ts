import { describe, expect, it } from "vitest";

import { MockOrderRepository } from "./mock-order-repository";
import {
  createRepository,
  defaultQuery,
  immediateDelay,
} from "./repository.fixtures";

describe("MockOrderRepository errors", () => {
  it("returns a safe not-found error", async () => {
    await expect(createRepository().getOrder("ORD-9999")).resolves.toEqual({
      ok: false,
      error: { code: "NOT_FOUND", message: "Order not found." },
    });
  });

  it("hides schema details when data is malformed", async () => {
    const result = await createRepository([{ invalid: "record" }]).getOrders(
      defaultQuery,
    );

    expect(result).toEqual({
      ok: false,
      error: { code: "INVALID_DATA", message: "Order data is unavailable." },
    });
    expect(JSON.stringify(result)).not.toContain("record");
  });

  it("converts unexpected failures into a safe domain error", async () => {
    const failingDelay = () => Promise.reject(new Error("sensitive detail"));
    const repository = new MockOrderRepository([], failingDelay);

    await expect(repository.getOrders(defaultQuery)).resolves.toEqual({
      ok: false,
      error: { code: "UNEXPECTED", message: "Unable to load orders." },
    });
  });

  it("validates before looking up an individual order", async () => {
    const repository = new MockOrderRepository([], immediateDelay);

    await expect(repository.getOrder("ORD-1001")).resolves.toMatchObject({
      ok: false,
      error: { code: "INVALID_DATA" },
    });
  });
});
