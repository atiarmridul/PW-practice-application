import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Start each locator example from the same page state.
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator with Syntax rules", async ({ page }) => {
  // These examples show different locator syntaxes Playwright supports.
  // Locate by tag name
  page.locator("input")
  // Locate by ID
  page.locator("#inputEmail1")
  // Locate by class name
  page.locator(".shape-rectangle")
  // Locate by XPath
  page.locator("//input[@placeholder='inputEmail1']")
  // Locate by exact text and click the matching card title.
  await page.locator(':text-is("Using the Grid")').click()
})

test("User Facing locator", async ({ page }) => {
  // User-facing locators are preferred because they match how users see the page.
  await page.getByRole("textbox", { name: "Email" }).first().click();

  // Labels are another stable way to find form fields.
  await page.getByLabel("Email").first().click();

});
