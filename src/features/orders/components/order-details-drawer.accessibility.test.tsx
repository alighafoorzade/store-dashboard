import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { expect, it, vi } from "vitest";

import { order } from "../application/application.fixtures";
import { OrderDetailsDrawer } from "./order-details-drawer";

it.each([
  ["desktop", 1280],
  ["mobile", 390],
])(
  "has no detectable %s drawer violations",
  async (_, width) => {
    Object.defineProperty(window, "innerWidth", {
      configurable: true,
      value: width,
    });
    render(
      <OrderDetailsDrawer
        error={false}
        loading={false}
        onOpenChange={vi.fn()}
        open
        order={order}
      />,
    );
    const dialog = screen.getByRole("dialog");
    const results = await axe(dialog, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  },
  10_000,
);
