import { test, expect } from '@playwright/test'
import { printLocatorCandidatesForUrl } from './helpers/locatorHelper'

test.beforeEach(async({page}) => {
  // Open the app home page before each UI component test.
  await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
  test.beforeEach(async({page}) => {
    // Navigate through the sidebar like a real user.
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })

  // Add tests in this describe block for buttons, inputs, checkboxes, and cards.
})
