import { expect, test } from "@playwright/test";

import { chooseOption, openOrders, visibleOrder } from "./orders-test-helpers";

test("searches by customer and order ID", async ({ page }) => {
  await openOrders(page);
  const search = page.getByRole("textbox", { name: "Search orders" });

  await search.fill("Avery Johnson");
  await expect(page).toHaveURL(/q=Avery(?:\+|%20)Johnson/);
  await expect(visibleOrder(page, "ORD-1001")).toBeVisible();
  await expect(page.getByText("Showing 1–1 of 1 orders")).toBeVisible();
  await expect(page.getByText("Search is up to date")).toBeVisible();

  await search.fill("ORD-1002");
  await expect(page).toHaveURL(/q=ORD-1002/);
  await expect(visibleOrder(page, "ORD-1002")).toBeVisible();
});

test("combines status filtering with search", async ({ page }) => {
  await openOrders(page);
  await page.getByRole("checkbox", { name: "Pending" }).click();
  await expect(page).toHaveURL(/status=Pending/);
  await expect(page.getByText("Showing 1–7 of 7 orders")).toBeVisible();

  await page.getByRole("textbox", { name: "Search orders" }).fill("Mina");
  await expect(page).toHaveURL(/q=Mina/);
  await expect(visibleOrder(page, "ORD-1002")).toBeVisible();
  await expect(page.getByText("Showing 1–1 of 1 orders")).toBeVisible();
});

test("sorts price in both directions", async ({ page }) => {
  await openOrders(page);
  await chooseOption(page, "Sort field", "Price");
  await expect(page).toHaveURL(/sort=price/);
  await chooseOption(page, "Sort direction", "Ascending");
  await expect(page).toHaveURL(/sort=price/);
  await expect(page).toHaveURL(/direction=asc/);
  await expect(visibleOrder(page, "ORD-1029")).toBeVisible();

  await chooseOption(page, "Sort direction", "Descending");
  await expect(page).toHaveURL(/sort=price/);
  await expect(page).not.toHaveURL(/direction=asc/);
  await expect(visibleOrder(page, "ORD-1023")).toBeVisible();
});
