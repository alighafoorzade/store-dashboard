import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./button";
import { Input } from "./input";

describe("Button", () => {
  it("uses safe defaults and a 44px minimum target", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Button onClick={onClick}>Save order</Button>);

    const button = screen.getByRole("button", { name: "Save order" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveClass("min-h-11", "min-w-11");
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("honors disabled state", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button disabled onClick={onClick}>
        Delete
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("supports shadcn-style child composition", () => {
    render(
      <Button asChild variant="secondary">
        <a href="/orders">View orders</a>
      </Button>,
    );

    const link = screen.getByRole("link", { name: "View orders" });
    expect(link).toHaveAttribute("href", "/orders");
    expect(link).not.toHaveAttribute("type");
  });
});

describe("Input", () => {
  it("supports accessible labels and invalid state", async () => {
    const user = userEvent.setup();
    render(
      <label>
        Search orders
        <Input aria-invalid="true" />
      </label>,
    );

    const input = screen.getByRole("textbox", { name: "Search orders" });
    expect(input).toHaveClass("h-11");
    await user.type(input, "ORD-1001");
    expect(input).toHaveValue("ORD-1001");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });
});
