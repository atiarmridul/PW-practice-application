import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator with Syntax rules", async ({ page }) => {
  // Locate by tag name
  page.locator("input")
  // Locate by ID
  page.locator("#inputEmail1")
  // Locate by class name
  page.locator(".shape-rectangle")
  // Locate by XPath
  page.locator("//input[@placeholder='inputEmail1']")
  // Locate by exact text 
  await page.locator(':text-is("Using the Grid")').click()
})

