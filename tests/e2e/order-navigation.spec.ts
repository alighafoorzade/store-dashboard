import { expect, test } from "@playwright/test";

import {
  chooseOption,
  expectNoHorizontalOverflow,
  openOrders,
  visibleOrder,
} from "./orders-test-helpers";

test("paginates while retaining query state", async ({ page }) => {
  await openOrders(page);
  await chooseOption(page, "Sort field", "Customer name");
  await expect(page).toHaveURL(/sort=customer/);
  await page.getByRole("button", { name: "Next page" }).click();

  await expect(page).toHaveURL(/sort=customer/);
  await expect(page).toHaveURL(/page=2/);
  await expect(page.getByRole("button", { name: "Page 2" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByText("Showing 11–20 of 32 orders")).toBeVisible();
});

test("restores bookmarked state and opens order details", async ({ page }) => {
  await openOrders(
    page,
    "/?q=Avery&status=Processing&sort=price&direction=asc",
  );
  await expect(
    page.getByRole("textbox", { name: "Search orders" }),
  ).toHaveValue("Avery");
  const opener = visibleOrder(page, "ORD-1001");
  await opener.click();

  const dialog = page.getByRole("dialog", { name: "Order details" });
  await expect(dialog).toContainText("Avery Johnson");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(opener).toBeFocused();
});

test("recovers from invalid URL parameters", async ({ page }) => {
  await openOrders(
    page,
    "/?status=Refunded&sort=unsafe&direction=sideways&page=-4",
  );
  await expect(page.getByRole("combobox", { name: "Sort field" })).toHaveText(
    "Created date",
  );
  await expect(
    page.getByRole("combobox", { name: "Sort direction" }),
  ).toHaveText("Descending");
  await expect(page.getByText("Showing 1–10 of 32 orders")).toBeVisible();
});

test("remains usable without horizontal overflow", async ({ page }) => {
  await openOrders(page);
  await expectNoHorizontalOverflow(page);
  if (page.viewportSize()!.width < 768) {
    await expect(
      page.getByRole("table", { name: "Order results" }),
    ).toBeHidden();
    await expect(
      page.getByRole("button", { name: /view details for order/i }).first(),
    ).toBeVisible();
  }
});
