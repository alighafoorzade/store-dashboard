import { describe, expect, it, vi } from "vitest";

import { normalizeOrderQuery } from "../domain";
import { MockOrderRepository } from "./mock-order-repository";
import { createRepositoryDelay, MOCK_ORDER_DELAY_MS } from "./repository-delay";
import ordersJson from "../../../mocks/orders.json";

describe("repository delay", () => {
  it("resolves after the deterministic configured duration", async () => {
    vi.useFakeTimers();
    const repository = new MockOrderRepository(
      ordersJson,
      createRepositoryDelay(),
    );
    const result = repository.getOrders(normalizeOrderQuery());

    await vi.advanceTimersByTimeAsync(MOCK_ORDER_DELAY_MS - 1);
    let settled = false;
    void result.then(() => {
      settled = true;
    });
    await Promise.resolve();
    expect(settled).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    await expect(result).resolves.toMatchObject({ ok: true });
  });
});
