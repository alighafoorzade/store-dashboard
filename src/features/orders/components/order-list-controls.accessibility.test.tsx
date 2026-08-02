import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { expect, it, vi } from "vitest";

import { OrderListControls } from "./order-list-controls";

vi.mock("next/navigation", () => ({
  usePathname: () => "/orders",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

it("has no detectable accessibility violations", async () => {
  const { container } = render(<OrderListControls />);
  const results = await axe(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  expect(results.violations).toEqual([]);
}, 10_000);
