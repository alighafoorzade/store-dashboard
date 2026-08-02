import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createRepository, createWrapper, order } from "./application.fixtures";
import { useOrder } from "./use-order";

describe("useOrder", () => {
  it("returns an order by ID", async () => {
    const repository = createRepository();
    const getOrder = vi.spyOn(repository, "getOrder");
    const { result } = renderHook(() => useOrder("ORD-1001"), {
      wrapper: createWrapper(repository),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(order);
    expect(getOrder).toHaveBeenCalledWith("ORD-1001");
  });

  it("does not query without a selected ID", async () => {
    const repository = createRepository();
    const getOrder = vi.spyOn(repository, "getOrder");
    const { result } = renderHook(() => useOrder(null), {
      wrapper: createWrapper(repository),
    });

    expect(result.current.fetchStatus).toBe("idle");
    expect(result.current.data).toBeUndefined();
    await Promise.resolve();
    expect(getOrder).not.toHaveBeenCalled();
  });

  it("exposes a typed not-found error", async () => {
    const error = { code: "NOT_FOUND", message: "Order not found." } as const;
    const repository = createRepository({ order: { ok: false, error } });
    const { result } = renderHook(() => useOrder("ORD-9999"), {
      wrapper: createWrapper(repository),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(error);
  });
});
