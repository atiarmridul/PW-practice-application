import { test, expect } from '@playwright/test'
import { printLocatorCandidatesForUrl } from './helpers/locatorHelper'

test.beforeEach(async({page}) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
  test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
  })
})
