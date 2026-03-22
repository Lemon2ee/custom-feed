import { expect, test } from "@playwright/test";

test("dashboard setup flow loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Custom Feed")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Sources" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Outputs" })).toBeVisible();
});
