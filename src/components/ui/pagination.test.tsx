import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("exposes navigation state and page actions", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    const { rerender } = render(
      <Pagination page={2} totalPages={3} onPageChange={onPageChange} />,
    );

    expect(
      screen.getByRole("navigation", { name: "Orders pagination" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await user.click(screen.getByRole("button", { name: "Next page" }));
    await user.click(screen.getByRole("button", { name: "Previous page" }));
    await user.click(screen.getByRole("button", { name: "Page 1" }));
    expect(onPageChange.mock.calls).toEqual([[3], [1], [1]]);
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveFocus();
    rerender(
      <Pagination page={1} totalPages={3} onPageChange={onPageChange} />,
    );
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveFocus();
  });

  it("disables boundary actions and renders nothing for empty results", () => {
    const { rerender } = render(
      <Pagination page={1} totalPages={2} onPageChange={vi.fn()} />,
    );
    expect(
      screen.getByRole("button", { name: "Previous page" }),
    ).toBeDisabled();

    rerender(<Pagination page={2} totalPages={2} onPageChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();

    rerender(<Pagination page={1} totalPages={0} onPageChange={vi.fn()} />);
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });
});
