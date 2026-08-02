import { expect, test } from "@playwright/test";

test("renders a usable responsive Orders shell", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { level: 1, name: "Orders" }),
  ).toBeVisible();
  await expect(page.getByText("Shop Admin", { exact: true })).toBeVisible();
  await expect(page.locator('a[aria-current="page"]:visible')).toHaveText(
    "Orders",
  );

  const hasHorizontalOverflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);

  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to main content" }),
  ).toBeFocused();
});
