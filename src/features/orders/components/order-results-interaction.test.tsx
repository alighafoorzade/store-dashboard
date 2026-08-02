import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { page } from "../application/application.fixtures";
import { normalizeOrderQuery } from "../domain";
import { OrderResultsView } from "./order-results-view";

function renderResults(onOpenOrder: (id: string) => void) {
  render(
    <OrderResultsView
      data={page}
      error={false}
      loading={false}
      onOpenOrder={onOpenOrder}
      onPageChange={vi.fn()}
      query={normalizeOrderQuery()}
      retry={vi.fn()}
    />,
  );
}

describe("order detail triggers", () => {
  it("opens a desktop row with pointer, Enter, and Space", () => {
    const open = vi.fn();
    renderResults(open);
    const row = screen.getByRole("row", { name: /view details for order/i });

    fireEvent.click(row);
    fireEvent.keyDown(row, { key: "Enter" });
    fireEvent.keyDown(row, { key: " " });
    expect(open.mock.calls).toEqual([["ORD-1001"], ["ORD-1001"], ["ORD-1001"]]);
  });

  it("opens a mobile card with keyboard activation", () => {
    const open = vi.fn();
    renderResults(open);
    const card = screen.getByRole("button", {
      name: /view details for order/i,
    });

    fireEvent.keyDown(card, { key: "Escape" });
    fireEvent.keyDown(card, { key: "Enter" });
    expect(open).toHaveBeenCalledOnce();
  });
});
