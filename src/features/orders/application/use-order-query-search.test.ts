import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  SEARCH_DEBOUNCE_MS,
  useOrderQueryState,
} from "./use-order-query-state";

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),
  pathname: "/orders",
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => navigation.pathname,
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => navigation.params,
}));

describe("useOrderQueryState search", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    navigation.params = new URLSearchParams("view=compact&page=4");
    navigation.replace.mockReset();
  });

  it("updates input immediately and debounces URL replacement", async () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setSearch("Avery"));
    expect(result.current.searchInput).toBe("Avery");
    await act(() => vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS - 1));
    expect(navigation.replace).not.toHaveBeenCalled();

    await act(() => vi.advanceTimersByTimeAsync(1));
    expect(navigation.replace).toHaveBeenCalledWith(
      "/orders?view=compact&q=Avery",
      { scroll: false },
    );
  });

  it("cancels the previous pending search value", async () => {
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setSearch("Ave"));
    await act(() => vi.advanceTimersByTimeAsync(200));
    act(() => result.current.setSearch("Avery"));
    await act(() => vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS));

    expect(navigation.replace).toHaveBeenCalledTimes(1);
    expect(navigation.replace.mock.calls[0]?.[0]).toContain("q=Avery");
  });

  it("avoids navigation when trimmed search is unchanged", async () => {
    navigation.params = new URLSearchParams("q=Avery");
    const { result } = renderHook(() => useOrderQueryState());

    act(() => result.current.setSearch("  Avery  "));
    await act(() => vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MS));

    expect(navigation.replace).not.toHaveBeenCalled();
    expect(result.current.searchInput).toBe("Avery");
  });

  it("prefers an external URL change over stale pending input", () => {
    navigation.params = new URLSearchParams("q=Avery");
    const { result, rerender } = renderHook(() => useOrderQueryState());

    act(() => result.current.setSearch("Ave"));
    navigation.params = new URLSearchParams("q=Mina");
    rerender();

    expect(result.current.searchInput).toBe("Mina");
  });
});
