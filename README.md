# pw-practice-app

![Angular](https://img.shields.io/badge/Angular-14-red)
![Playwright](https://img.shields.io/badge/Playwright-E2E-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Enabled-blue)
![License](https://img.shields.io/badge/License-MIT-green)

A lightweight Angular 14 app based on Akveo ngx-admin, intended for UI automation practice with Playwright.

## Features
- Nebular UI components with themed layouts
- Dashboard widgets, forms, tables, charts, and modal overlays
- Sample data and mock services for consistent UI behavior

## Tech Stack
- Angular 14
- Nebular (`@nebular/*`)
- Bootstrap 4.3
- ECharts, Chart.js, Leaflet
- Playwright

## Prerequisites
- Node.js (recommended: 16.x or 18.x)
- npm

## Getting Started
1) Install dependencies:
   - `npm install`
2) Start the dev server:
   - `npm run start`
3) Open the app:
   - `http://localhost:4200`

## Scripts
- `npm run start` - start Angular dev server
- `npx playwright test` - run Playwright tests

## Project Structure

```txt
PW-practice-application/
├── src/
│   ├── app/
│   │   ├── @core/                  # Core services, data providers, and utilities
│   │   ├── @theme/                 # Shared layouts, UI components, and styling
│   │   ├── pages/                  # Feature modules and application pages
│   │   ├── app-routing.module.ts   # Root routing configuration
│   │   └── app.module.ts           # Main Angular module
│   │
│   ├── assets/                     # Static assets and sample resources
│   ├── environments/               # Environment configurations
│   └── styles.scss                 # Global application styles
│
├── tests/                          # Playwright automation test suites
├── playwright.config.ts            # Playwright framework configuration
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

## Routing
- Root routes: `src/app/app-routing.module.ts`
- Pages routes: `src/app/pages/pages-routing.module.ts`

## Playwright
- Config: `playwright.config.ts`
- `testDir` is `./tests`
- `baseURL` is not set (tests can use explicit URLs or set baseURL)

## Notes
- This repo is derived from Akveo ngx-admin; it has been simplified to focus on UI automation practice.
- Original ngx-admin repo:

```
https://github.com/akveo/ngx-admin
```

## Automation Architecture

This repository is designed to support scalable UI automation practices using Playwright.

### Key Goals
- Maintainable automation structure
- Reliable UI interaction handling
- Scalable page object implementation
- Automation learning playground

### Recommended Future Improvements
- Page Object Model enhancement
- GitHub Actions integration
- Allure reporting
- Cross-browser execution
- Trace viewer integration
- Screenshot capture on failure

## Testing Strategy

The project is intended to support:

- UI automation testing
- Functional validation
- Cross-browser testing
- Responsive UI testing
- Regression testing

## CI/CD Vision

Future CI/CD implementation may include:

- GitHub Actions workflows
- Automated Playwright execution
- HTML report publishing
- Failure screenshot artifacts
- Scheduled regression runs

## Documentation

Recommended additional documentation:

- framework architecture
- locator strategy
- fixture management
- test data handling
- execution strategy

## Learning Outcomes

This project helps practice:

- Playwright automation framework design
- Angular application testing
- UI validation strategies
- Cross-browser testing concepts
- TypeScript automation implementation

## Additional Recommendations

- Add reusable fixture management
- Add environment configuration
- Add API mocking support
- Add reusable custom commands
- Add dashboard reporting

## Repository Information

- Repository Owner: Atiar Mridul
- GitHub Profile: https://github.com/atiarmridul

## Playwright MCP Setup

This project can be inspected with Playwright MCP from VS Code or another MCP-enabled agent.

The workspace MCP configuration is stored in:

```txt
.vscode/mcp.json
```

Expected server configuration:

```json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@playwright/mcp@latest"]
    }
  }
}
```

To use Playwright MCP:

1. Start the Angular app:
   - `npm run start`
2. Open the VS Code Command Palette:
   - `Cmd + Shift + P`
3. Run:
   - `MCP: List Servers`
4. Start the `playwright` MCP server.
5. Ask the agent to inspect:
   - `http://localhost:4200/`

Example prompt:

```txt
Use Playwright MCP to inspect http://localhost:4200 and suggest a Playwright test.
```

## Useful App Pages For Testing

These routes are useful for Playwright practice:

- `http://localhost:4200/pages/iot-dashboard`
- `http://localhost:4200/pages/forms/layouts`
- `http://localhost:4200/pages/forms/datepicker`
- `http://localhost:4200/pages/modal-overlays/dialog`
- `http://localhost:4200/pages/modal-overlays/window`
- `http://localhost:4200/pages/modal-overlays/popover`
- `http://localhost:4200/pages/modal-overlays/toastr`
- `http://localhost:4200/pages/modal-overlays/tooltip`
- `http://localhost:4200/pages/tables/smart-table`
- `http://localhost:4200/pages/tables/tree-grid`

## Playwright Test Writing Pattern

Recommended test flow:

1. Navigate directly to the page route.
2. Scope locators to a stable section or `nb-card`.
3. Interact with user-visible controls.
4. Assert the result with `expect`.

Example:

```ts
import { test, expect } from '@playwright/test';

test.describe('Form Layouts page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/pages/forms/layouts');
  });

  test('fills the inline form', async ({ page }) => {
    const inlineForm = page.locator('nb-card', {
      has: page.locator('nb-card-header', { hasText: 'Inline form' }),
    });

    await expect(inlineForm).toBeVisible();

    await inlineForm.getByPlaceholder('Jane Doe').fill('Atiar Rahman');
    await inlineForm.getByPlaceholder('Email').fill('atiar@example.com');
    await inlineForm.locator('nb-checkbox').click();

    await expect(inlineForm.getByPlaceholder('Jane Doe')).toHaveValue('Atiar Rahman');
    await expect(inlineForm.getByPlaceholder('Email')).toHaveValue('atiar@example.com');
    await expect(inlineForm.locator('nb-checkbox input')).toBeChecked();
  });
});
```

## Locator Strategy

Prefer user-facing locators where possible:

- `page.getByRole()`
- `page.getByLabel()`
- `page.getByPlaceholder()`
- `page.getByText()`

For Nebular cards, scope locators to the card title:

```ts
const card = page.locator('nb-card', {
  has: page.locator('nb-card-header', { hasText: 'Card Title' }),
});
```

This keeps tests more stable when multiple forms contain similar fields.

## Validation Commands

Run the app:

```bash
npm run start
```

Run all Playwright tests:

```bash
npx playwright test
```

Run only Chromium:

```bash
npx playwright test --project=chromium
```

Run one spec file:

```bash
npx playwright test tests/autoWaiting.spec.ts --project=chromium
```

Build the Angular app:

```bash
npx ng build
```

Check dependency security:

```bash
npm audit --audit-level=high
```

## Current Health Notes

- Angular build passes.
- Playwright tests pass across Chromium, Firefox, and WebKit when the app is running.
- The dependency stack is old and `npm audit` reports vulnerabilities that need careful upgrade planning.
- `.browserslistrc` still includes `IE 11`, which causes an Angular build warning.
- `playwright.config.ts` does not currently start the Angular dev server automatically because `webServer` is commented out.

## License
MIT
