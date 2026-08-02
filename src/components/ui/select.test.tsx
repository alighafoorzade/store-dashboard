import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Select } from "./select";

const options = [
  { label: "Newest first", value: "newest" },
  { label: "Price: low to high", value: "price-asc" },
] as const;

describe("Select", () => {
  it("has an accessible label and 44px trigger", () => {
    render(
      <Select
        label="Sort orders"
        options={options}
        value="newest"
        onValueChange={vi.fn()}
      />,
    );

    const trigger = screen.getByRole("combobox", { name: "Sort orders" });
    expect(trigger).toHaveClass("h-11");
    expect(trigger).toHaveTextContent("Newest first");
  });

  it("supports keyboard selection", async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Select
        label="Sort orders"
        options={options}
        value="newest"
        onValueChange={onValueChange}
      />,
    );

    screen.getByRole("combobox", { name: "Sort orders" }).focus();
    await user.keyboard("[ArrowDown][ArrowDown][Enter]");

    expect(onValueChange).toHaveBeenCalledWith("price-asc");
  });
});
