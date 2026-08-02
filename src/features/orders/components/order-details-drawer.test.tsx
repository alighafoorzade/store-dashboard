import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";

import { order } from "../application/application.fixtures";
import { OrderDetailsDrawer } from "./order-details-drawer";

function DrawerHarness({ missing = false }: { readonly missing?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open details</button>
      <OrderDetailsDrawer
        error={missing}
        loading={false}
        onOpenChange={setOpen}
        open={open}
        order={missing ? undefined : order}
      />
    </>
  );
}

describe("OrderDetailsDrawer", () => {
  it("labels the dialog, traps focus, closes with Escape, and restores focus", async () => {
    const user = userEvent.setup();
    render(<DrawerHarness />);
    const opener = screen.getByRole("button", { name: "Open details" });
    await user.click(opener);

    const dialog = screen.getByRole("dialog", { name: "Order details" });
    expect(dialog).toHaveAccessibleDescription(
      "Review the complete information for the selected order.",
    );
    expect(
      within(dialog).getByRole("button", { name: "Close order details" }),
    ).toHaveFocus();
    await user.tab();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it("closes from its named button and handles a missing order safely", async () => {
    const user = userEvent.setup();
    render(<DrawerHarness missing />);
    await user.click(screen.getByRole("button", { name: "Open details" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Order details unavailable",
    );
    expect(
      screen.queryByText(/not_found|stack|schema/i),
    ).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: "Close order details" }),
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
