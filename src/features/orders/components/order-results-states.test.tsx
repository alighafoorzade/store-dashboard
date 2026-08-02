import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import { normalizeOrderQuery } from "../domain";
import { OrderResultsView } from "./order-results-view";

it("shows clear loading and recoverable error states", () => {
  const retry = vi.fn();
  const props = {
    onPageChange: vi.fn(),
    query: normalizeOrderQuery(),
    retry,
  };
  const { rerender } = render(
    <OrderResultsView {...props} error={false} loading />,
  );
  expect(screen.getByRole("status", { name: "Loading orders" })).toBeVisible();

  rerender(<OrderResultsView {...props} error loading={false} />);
  fireEvent.click(screen.getByRole("button", { name: "Try again" }));
  expect(retry).toHaveBeenCalledOnce();
  expect(screen.queryByText(/stack|invalid_data/i)).not.toBeInTheDocument();
});
