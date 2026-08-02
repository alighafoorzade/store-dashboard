import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useOrderQueryState } from "./use-order-query-state";

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/orders",
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => navigation.params,
}));

describe("useOrderQueryState actions", () => {
  beforeEach(() => {
    navigation.params = new URLSearchParams("view=compact&q=Avery&page=3");
    navigation.replace.mockReset();
  });

  it("updates filters immediately and resets the page", () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setStatuses(["Pending", "Completed"]));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/orders?view=compact&q=Avery&status=Pending&status=Completed",
      { scroll: false },
    );
  });

  it("updates sorting immediately and resets the page", () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setSorting("price", "asc"));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/orders?view=compact&q=Avery&sort=price&direction=asc",
      { scroll: false },
    );
  });

  it("updates pages without resetting other list state", () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setPage(5));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/orders?view=compact&q=Avery&page=5",
      { scroll: false },
    );
  });

  it("clears list controls but preserves unrelated parameters", () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.clear());

    expect(navigation.replace).toHaveBeenCalledWith("/orders?view=compact", {
      scroll: false,
    });
  });

  it("avoids a navigation loop for unchanged semantic state", () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setPage(3));

    expect(navigation.replace).not.toHaveBeenCalled();
  });
});
