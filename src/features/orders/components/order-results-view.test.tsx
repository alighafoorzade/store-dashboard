import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { order, page } from "../application/application.fixtures";
import { normalizeOrderQuery } from "../domain";
import { OrderResultsView } from "./order-results-view";

const defaults = normalizeOrderQuery();
const actions = { onPageChange: vi.fn(), retry: vi.fn() };

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
        {...actions}
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
        {...actions}
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
        {...actions}
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
        {...actions}
      />,
    );
    expect(
      screen.getByRole("heading", { name: "No matching orders" }),
    ).toBeVisible();
  });
});
