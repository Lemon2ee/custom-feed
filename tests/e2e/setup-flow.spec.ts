import { expect, test } from "@playwright/test";

test("dashboard setup flow loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Custom Feed")).toBeVisible();
  await expect(page.getByText("Overview")).toBeVisible();
  await expect(page.getByText("Sources")).toBeVisible();
  await expect(page.getByText("Outputs")).toBeVisible();
});
