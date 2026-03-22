import { expect, test } from "@playwright/test";

test("dashboard setup flow loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Custom Feed Middleware")).toBeVisible();
  await expect(page.getByText("Source Setup")).toBeVisible();
  await expect(page.getByText("Output Setup")).toBeVisible();
  await expect(page.getByText("Rule Builder")).toBeVisible();
});
