import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";

import { AppShell } from "./app-shell";

describe("AppShell", () => {
  it("provides semantic navigation, location, and skip access", () => {
    render(
      <AppShell>
        <h1>Orders</h1>
      </AppShell>,
    );

    expect(screen.getByRole("banner")).toBeVisible();
    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { name: "Orders" }),
    );
    expect(
      screen.getByRole("link", { name: "Skip to main content" }),
    ).toHaveAttribute("href", "#main-content");
    screen.getAllByRole("link", { name: "Orders" }).forEach((link) => {
      expect(link).toHaveAttribute("aria-current", "page");
      expect(link).toHaveClass("min-h-11");
    });
  });

  it("has no automated accessibility violations", async () => {
    const { container } = render(
      <AppShell>
        <h1>Orders</h1>
      </AppShell>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  }, 10_000);
});
