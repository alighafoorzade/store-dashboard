import { expect, type Page } from "@playwright/test";

export async function openOrders(page: Page, url = "/") {
  await page.goto(url);
  await expect(
    page.getByRole("heading", { name: "Order results" }),
  ).toBeVisible();
}

export async function chooseOption(page: Page, label: string, option: string) {
  await page.getByRole("combobox", { name: label }).click();
  await page.getByRole("option", { name: option }).click();
}

export function visibleOrder(page: Page, id: string) {
  return page.locator(`[aria-label="View details for order ${id}"]:visible`);
}

export async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          document.documentElement.scrollWidth <=
          document.documentElement.clientWidth,
      ),
    )
    .toBe(true);
}
