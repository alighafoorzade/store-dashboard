import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { createRepository, createWrapper } from "./application.fixtures";
import { createOrdersQueryClient, useOrderRepository } from "./orders-provider";

describe("OrdersProvider", () => {
  it("injects the selected repository", () => {
    const repository = createRepository();
    const { result } = renderHook(() => useOrderRepository(), {
      wrapper: createWrapper(repository),
    });

    expect(result.current).toBe(repository);
  });

  it("rejects hook usage outside the feature provider", () => {
    expect(() => renderHook(() => useOrderRepository())).toThrow(
      "Order hooks must be used within OrdersProvider.",
    );
  });

  it("creates isolated query clients with production defaults", () => {
    const firstClient = createOrdersQueryClient();
    const secondClient = createOrdersQueryClient();

    expect(firstClient).not.toBe(secondClient);
    expect(firstClient.getDefaultOptions().queries).toMatchObject({
      gcTime: 300_000,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30_000,
    });
  });
});
