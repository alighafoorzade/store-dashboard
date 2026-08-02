import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import RouteError from "./error";

const sensitiveError = Object.assign(
  new Error("Database password secret; Zod schema failed"),
  { digest: "private-digest" },
);

describe("route error UI", () => {
  it("shows safe messaging and retries without exposing internals", async () => {
    const retry = vi.fn();
    const user = userEvent.setup();
    render(<RouteError error={sensitiveError} unstable_retry={retry} />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Orders could not be displayed",
    );
    expect(
      screen.queryByText(/password|zod|private-digest/i),
    ).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = render(
      <RouteError error={sensitiveError} unstable_retry={vi.fn()} />,
    );
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  }, 10_000);
});
