import { test, expect } from '@playwright/test'

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/pages/forms/layouts')
  })

  test('fills the inline form', async ({ page }) => {
    const inlineForm = page.locator('nb-card', {
      has: page.locator('nb-card-header', { hasText: 'Inline form' }),
    })

    await expect(inlineForm).toBeVisible()

    await inlineForm.getByPlaceholder('Jane Doe').fill('Atiar Rahman')
    await inlineForm.getByPlaceholder('Email').fill('atiar@example.com')
    await inlineForm.locator('nb-checkbox').click()

    await expect(inlineForm.getByPlaceholder('Jane Doe')).toHaveValue('Atiar Rahman')
    await expect(inlineForm.getByPlaceholder('Email')).toHaveValue('atiar@example.com')
    await expect(inlineForm.locator('nb-checkbox input')).toBeChecked()
  })
})
