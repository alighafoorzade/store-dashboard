import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { createRepository, createWrapper, page } from "./application.fixtures";
import { useOrders } from "./use-orders";

describe("useOrders", () => {
  it("normalizes input and returns repository data", async () => {
    const repository = createRepository();
    const getOrders = vi.spyOn(repository, "getOrders");
    const { result } = renderHook(
      () => useOrders({ search: "  Avery ", page: -1 }),
      { wrapper: createWrapper(repository) },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(page);
    expect(getOrders).toHaveBeenCalledWith({
      search: "Avery",
      statuses: [],
      sortBy: "createdAt",
      sortDirection: "desc",
      page: 1,
      pageSize: 10,
    });
  });

  it("exposes a typed safe repository error", async () => {
    const error = {
      code: "INVALID_DATA",
      message: "Order data is unavailable.",
    } as const;
    const repository = createRepository({ orders: { ok: false, error } });
    const { result } = renderHook(() => useOrders(), {
      wrapper: createWrapper(repository),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(error);
  });
});
