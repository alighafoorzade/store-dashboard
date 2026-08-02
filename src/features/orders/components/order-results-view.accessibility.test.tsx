import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { expect, it, vi } from "vitest";

import { page } from "../application/application.fixtures";
import { normalizeOrderQuery } from "../domain";
import { OrderResultsView } from "./order-results-view";

it("has no detectable responsive results accessibility violations", async () => {
  const { container } = render(
    <OrderResultsView
      data={page}
      error={false}
      loading={false}
      query={normalizeOrderQuery()}
      retry={vi.fn()}
    />,
  );
  const results = await axe(container, {
    rules: { "color-contrast": { enabled: false } },
  });
  expect(results.violations).toEqual([]);
}, 10_000);
