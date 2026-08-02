import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { order, page } from "../application/application.fixtures";
import { normalizeOrderQuery } from "../domain";
import { OrderResultsView } from "./order-results-view";

const defaults = normalizeOrderQuery();

describe("OrderResultsView", () => {
  it("renders every order field in table and card layouts as text", () => {
    const unsafeOrder = { ...order, customer: "<img src=x onerror=alert(1)>" };
    const data = { ...page, items: [unsafeOrder] };
    const { container } = render(
      <OrderResultsView
        data={data}
        error={false}
        loading={false}
        query={defaults}
        retry={vi.fn()}
      />,
    );

    expect(screen.getAllByText(order.id)).toHaveLength(2);
    expect(screen.getAllByText(unsafeOrder.customer)).toHaveLength(2);
    expect(screen.getAllByText("$129.95")).toHaveLength(2);
    expect(screen.getAllByText("3")).toHaveLength(2);
    expect(screen.getAllByText("Processing")).toHaveLength(2);
    expect(screen.getAllByText("Jul 31, 2026")).toHaveLength(2);
    expect(container.querySelector("img")).toBeNull();
  });

  it("announces the active table sort", () => {
    render(
      <OrderResultsView
        data={page}
        error={false}
        loading={false}
        query={defaults}
        retry={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("columnheader", { name: "Created" }),
    ).toHaveAttribute("aria-sort", "descending");
    expect(
      screen.getByRole("columnheader", { name: "Customer" }),
    ).toHaveAttribute("aria-sort", "none");
  });

  it("distinguishes empty data from filtered no-results", () => {
    const emptyPage = { ...page, items: [], totalItems: 0, totalPages: 0 };
    const { rerender } = render(
      <OrderResultsView
        data={emptyPage}
        error={false}
        loading={false}
        query={defaults}
        retry={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "No orders available" }),
    ).toBeVisible();

    rerender(
      <OrderResultsView
        data={emptyPage}
        error={false}
        loading={false}
        query={normalizeOrderQuery({ search: "missing" })}
        retry={vi.fn()}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "No matching orders" }),
    ).toBeVisible();
  });

  it("shows clear loading and recoverable error states", () => {
    const retry = vi.fn();
    const { rerender } = render(
      <OrderResultsView error={false} loading query={defaults} retry={retry} />,
    );
    expect(
      screen.getByRole("status", { name: "Loading orders" }),
    ).toBeVisible();

    rerender(
      <OrderResultsView error loading={false} query={defaults} retry={retry} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
    expect(screen.queryByText(/stack|invalid_data/i)).not.toBeInTheDocument();
  });
});
