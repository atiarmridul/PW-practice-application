import { test, expect } from '@playwright/test'
import { getHealingLocator } from './helpers/locatorHelper'

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/pages/forms/layouts')
  })

  test('fills the inline form', async ({ page }) => {
    const inlineForm = page.locator('nb-card', {
      has: page.locator('nb-card-header', { hasText: 'Inline form' }),
    })

    await expect(inlineForm).toBeVisible()

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

    const rememberMeCheckbox = await getHealingLocator(inlineForm, {
      css: 'nb-checkbox',
    })

    await nameInput.fill('Atiar Rahman')
    await emailInput.fill('atiar@example.com')
    await rememberMeCheckbox.click()

    await expect(nameInput).toHaveValue('Atiar Rahman')
    await expect(emailInput).toHaveValue('atiar@example.com')
    await expect(inlineForm.locator('nb-checkbox input')).toBeChecked()
  })
})
