import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { SEARCH_DEBOUNCE_MS } from "../application/use-order-query-state";
import { OrderListControls } from "./order-list-controls";

const navigation = vi.hoisted(() => ({
  params: new URLSearchParams(),
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/orders",
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => navigation.params,
}));

describe("OrderListControls", () => {
  beforeEach(() => {
    navigation.params = new URLSearchParams();
    navigation.replace.mockReset();
  });

  it("debounces search and communicates loading feedback", () => {
    vi.useFakeTimers();
    render(<OrderListControls />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search orders" }), {
      target: { value: "Avery" },
    });
    expect(screen.getByText("Updating search…")).toBeInTheDocument();

    vi.advanceTimersByTime(SEARCH_DEBOUNCE_MS - 1);
    expect(navigation.replace).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(navigation.replace).toHaveBeenCalledWith("/orders?q=Avery", {
      scroll: false,
    });
  });

  it("updates status immediately and resets pagination", async () => {
    navigation.params = new URLSearchParams("q=Avery&status=Pending&page=3");
    const user = userEvent.setup();
    render(<OrderListControls />);

    await user.click(screen.getByRole("checkbox", { name: "Completed" }));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/orders?q=Avery&status=Pending&status=Completed",
      { scroll: false },
    );
    expect(screen.getByText("1 status filters selected")).toBeInTheDocument();
  });

  it("updates sorting immediately", async () => {
    navigation.params = new URLSearchParams("q=Avery&page=2");
    const user = userEvent.setup();
    render(<OrderListControls />);

    screen.getByRole("combobox", { name: "Sort field" }).focus();
    await user.keyboard("[Enter]");
    await user.click(screen.getByRole("option", { name: "Price" }));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/orders?q=Avery&sort=price",
      { scroll: false },
    );
  });

  it("clears active controls and supports keyboard focus", async () => {
    navigation.params = new URLSearchParams(
      "q=Avery&status=Pending&sort=price&direction=asc",
    );
    const user = userEvent.setup();
    render(<OrderListControls />);

    await user.tab();
    expect(
      screen.getByRole("textbox", { name: "Search orders" }),
    ).toHaveFocus();
    expect(screen.getByText("1 status filters selected")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear controls" }));
    expect(navigation.replace).toHaveBeenCalledWith("/orders", {
      scroll: false,
    });
  });
});
