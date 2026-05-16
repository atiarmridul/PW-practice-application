import { test, expect } from '@playwright/test'
import { getHealingLocator } from './helpers/locatorHelper'

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    // Open the page directly so the test does not depend on sidebar navigation.
    await page.goto('http://localhost:4200/pages/forms/layouts')
  })

  test('fills the inline form', async ({ page }) => {
    // Scope all actions to the "Inline form" card to avoid matching fields in other cards.
    const inlineForm = page.locator('nb-card', {
      has: page.locator('nb-card-header', { hasText: 'Inline form' }),
    })

    // Make sure the card loaded before searching inside it.
    await expect(inlineForm).toBeVisible()

    // Healing locators try multiple selector strategies before failing.
    const nameInput = await getHealingLocator(inlineForm, {
      role: 'textbox',
      name: 'Jane Doe',
      placeholder: 'Jane Doe',
      css: 'input[placeholder="Jane Doe"]',
    })

    const emailInput = await getHealingLocator(inlineForm, {
      role: 'textbox',
      name: 'Email',
      placeholder: 'Email',
      css: 'input[placeholder="Email"]',
    })

    // Nebular checkboxes are easiest to click through the visible wrapper.
    const rememberMeCheckbox = await getHealingLocator(inlineForm, {
      css: 'nb-checkbox',
    })

    // Perform the user actions being tested.
    await nameInput.fill('Atiar Rahman')
    await emailInput.fill('atiar@example.com')
    await rememberMeCheckbox.click()

    // Assert the UI kept the values and checkbox state after interaction.
    await expect(nameInput).toHaveValue('Atiar Rahman')
    await expect(emailInput).toHaveValue('atiar@example.com')
    await expect(inlineForm.locator('nb-checkbox input')).toBeChecked()
  })
})
