import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it, vi } from "vitest";

import { Badge } from "./badge";
import { Button } from "./button";
import { EmptyState } from "./empty-state";
import { Input } from "./input";
import { Pagination } from "./pagination";
import { Select } from "./select";

describe("shared UI accessibility", () => {
  it("has no automated accessibility violations", async () => {
    const { container } = render(
      <main>
        <label>
          Search orders
          <Input />
        </label>
        <Select
          label="Sort orders"
          options={[{ label: "Newest first", value: "newest" }]}
          value="newest"
          onValueChange={vi.fn()}
        />
        <Badge variant="processing">Processing</Badge>
        <EmptyState
          title="No orders found"
          description="Try changing your filters."
          action={<Button>Clear filters</Button>}
        />
        <Pagination page={1} totalPages={2} onPageChange={vi.fn()} />
      </main>,
    );

    const results = await axe(container, {
      rules: { "color-contrast": { enabled: false } },
    });
    expect(results.violations).toEqual([]);
  }, 10_000);
});
