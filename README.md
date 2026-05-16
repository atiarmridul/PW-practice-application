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

## License
MIT
