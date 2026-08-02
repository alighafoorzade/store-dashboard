import { describe, expect, it, vi } from "vitest";

import { mockOrderRepository } from "./mock-orders";
import { MOCK_ORDER_DELAY_MS } from "./repository-delay";

describe("default mock order repository", () => {
  it("loads the validated JSON dataset behind the repository contract", async () => {
    vi.useFakeTimers();
    const result = mockOrderRepository.getOrder("ORD-1001");

    await vi.advanceTimersByTimeAsync(MOCK_ORDER_DELAY_MS);

    await expect(result).resolves.toMatchObject({
      ok: true,
      data: { id: "ORD-1001", customer: "Avery Johnson" },
    });
  });
});
