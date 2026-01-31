# pw-practice-app

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
- `src/app` - Angular app source
  - `@core` - core module, mock services, data definitions
  - `@theme` - shared components, layouts, theme styles
  - `pages` - feature modules and screens
- `src/assets` - images and sample data
- `tests` - Playwright tests

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

## License
MIT
