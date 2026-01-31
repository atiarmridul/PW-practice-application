# Project Knowledge (pw-practice-app)

## Purpose
- Angular 14 app based on Akveo ngx-admin, trimmed for Playwright UI automation practice.
- Main UI stack: Nebular components + Bootstrap + ECharts + Leaflet.

## Key Commands
- Start dev server: `npm run start`
- Playwright tests: `npx playwright test`

## Tech Stack
- Angular 14
- Nebular UI (`@nebular/*`)
- Bootstrap 4.3
- ECharts, Chart.js, Leaflet
- Playwright for E2E testing

## App Entry Points
- Bootstrap: `src/main.ts` -> `AppModule` in `src/app/app.module.ts`
- Global styles configured in `angular.json`, include `src/app/@theme/styles/styles.scss`

## Routing Overview
- Root routes: `src/app/app-routing.module.ts`
  - `/pages` -> lazy loads `PagesModule`
  - `/auth/*` -> Nebular auth pages
  - default redirect -> `/pages/iot-dashboard`
- Child routes: `src/app/pages/pages-routing.module.ts`
  - `/pages/iot-dashboard` -> Dashboard
  - `/pages/forms/*` -> Forms module
  - `/pages/modal-overlays/*` -> Modal overlays
  - `/pages/extra-components/*` -> Extra components
  - `/pages/charts/*` -> Charts
  - `/pages/tables/*` -> Tables

## Navigation Menu
- Defined in `src/app/pages/pages-menu.ts`
- Mirrors routes for dashboard, forms, modal overlays, extra components, charts, tables, and auth.

## Key Directories
- `src/app/pages`: feature modules + screens
- `src/app/@theme`: layouts, shared components (header/footer/search), theme definitions
- `src/app/@core`: core module, mock services, data interfaces
- `tests`: Playwright test directory (currently empty)

## Notes for Playwright
- Config: `playwright.config.ts`
- `testDir` is `./tests`
- `baseURL` is not set (tests should use explicit URL or set baseURL)

## Assets
- Images and sample data live in `src/assets`

