import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { order, page } from "../application/application.fixtures";
import { normalizeOrderQuery } from "../domain";
import { OrderResultsView } from "./order-results-view";

const tenOrders = Array.from({ length: 10 }, (_, index) => ({
  ...order,
  id: `ORD-${index + 1}`,
}));

describe("order results pagination", () => {
  it("renders exactly ten records in each responsive representation", () => {
    render(
      <OrderResultsView
        data={{ ...page, items: tenOrders, totalItems: 12, totalPages: 2 }}
        error={false}
        loading={false}
        onPageChange={vi.fn()}
        query={normalizeOrderQuery()}
        retry={vi.fn()}
      />,
    );

    expect(within(screen.getByRole("table")).getAllByRole("row")).toHaveLength(
      11,
    );
    expect(
      screen.getAllByRole("button", { name: /view details for order/i }),
    ).toHaveLength(10);
    expect(screen.getByText("Showing 1–10 of 12 orders")).toBeVisible();
  });

  it("shows filtered totals and requests adjacent pages", () => {
    const onPageChange = vi.fn();
    render(
      <OrderResultsView
        data={{
          ...page,
          items: [order, { ...order, id: "ORD-1002" }],
          page: 2,
          totalItems: 12,
          totalPages: 2,
        }}
        error={false}
        loading={false}
        onPageChange={onPageChange}
        query={normalizeOrderQuery({ statuses: ["Processing"], page: 2 })}
        retry={vi.fn()}
      />,
    );

    expect(screen.getByText("Showing 11–12 of 12 orders")).toBeVisible();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
