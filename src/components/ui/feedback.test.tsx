import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "./badge";
import { EmptyState } from "./empty-state";
import { Skeleton } from "./skeleton";

describe("feedback primitives", () => {
  it("communicates status with visible text", () => {
    render(<Badge variant="completed">Completed</Badge>);

    expect(screen.getByText("Completed")).toHaveClass("text-status-completed");
  });

  it("hides decorative skeletons from assistive technology", () => {
    const { container } = render(<Skeleton className="h-4" />);

    expect(container.firstChild).toHaveAttribute("aria-hidden", "true");
    expect(container.firstChild).toHaveClass("motion-reduce:animate-none");
  });

  it("provides a named empty state and optional action", () => {
    render(
      <EmptyState
        title="No orders found"
        description="Try changing your filters."
        action={<button type="button">Clear filters</button>}
      />,
    );

    expect(
      screen.getByRole("region", { name: "No orders found" }),
    ).toBeVisible();
    expect(screen.getByRole("button", { name: "Clear filters" })).toBeVisible();
  });

  it("supports a decorative icon without an action", () => {
    const { container } = render(
      <EmptyState
        title="No orders yet"
        description="New orders will appear here."
        icon={<svg aria-hidden="true" data-testid="empty-icon" />}
      />,
    );

    expect(screen.getByTestId("empty-icon")).toBeVisible();
    expect(container.querySelector("button")).toBeNull();
  });
});
