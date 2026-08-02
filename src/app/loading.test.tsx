import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import Loading from "./loading";

describe("route loading UI", () => {
  it("announces loading and reserves page regions", () => {
    const { container } = render(<Loading />);

    expect(
      screen.getByRole("status", { name: "Loading Orders page" }),
    ).toBeVisible();
    expect(container.querySelector(".min-h-56")).toBeInTheDocument();
    expect(container.querySelector(".min-h-80")).toBeInTheDocument();
  });

  it("has no detectable accessibility violations", async () => {
    const { container } = render(<Loading />);
    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  }, 10_000);
});
