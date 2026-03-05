# Playwright-MCP

End-to-end UI test automation project using **Playwright + TypeScript** with the **Page Object Model (POM)** pattern.

The suite validates flows in the demo banking app:
- Login and homepage checks
- Quick transactions
- Transaction history validation
- Bill payments (data-driven + smoke coverage)
- Account management checks

## Tech Stack
- Node.js 18+
- Playwright Test (`@playwright/test`)
- TypeScript
- CI pipelines for:
  - Azure Pipelines
  - Jenkins
  - GitHub Actions

## Project Structure

```text
config/                Environment config and defaults
pages/                 Page Object classes
test-data/             JSON test data + typed exports
tests/                 Test specs and fixtures
playwright.config.ts   Playwright test configuration
azure-pipelines.yml    Azure CI pipeline
Jenkinsfile            Jenkins pipeline
.github/workflows/     GitHub Actions workflow
```

## Prerequisites
1. Install Node.js 18 or newer.
2. Install dependencies:

```bash
npm ci
```

3. Install Playwright browsers:

```bash
npx playwright install --with-deps
```

> On Windows local machines, `npx playwright install` is usually enough. In Linux CI, `--with-deps` is recommended.

## Configuration

Default values are in `config/config.json`:
- `url`
- `username`
- `password`
- `appName`

Runtime overrides are read in `config/environment.ts`:
- `BASE_URL`
- `E2E_USERNAME`
- `E2E_PASSWORD`

Example (PowerShell):

```powershell
$env:BASE_URL="https://bakkappan.github.io/Testers-Talk-Practice-Site/"
$env:E2E_USERNAME="TestersTalk"
$env:E2E_PASSWORD="TestersTalk"
npx playwright test
```

## Running Tests Locally

Run full suite:

```bash
npx playwright test
```

Run smoke tests only (`@smoke`):

```bash
npx playwright test --grep "@smoke"
```

Run specific browsers:

```bash
npx playwright test --project=chromium --project=firefox
```

Open HTML report after run:

```bash
npx playwright show-report
```

## Reports

Configured in `playwright.config.ts`:
- HTML report: `playwright-report/`
- JUnit report: `test-results/results.xml`

## CI/CD Pipelines

### Azure Pipelines (`azure-pipelines.yml`)
- Trigger: `main` branch
- OS: `ubuntu-latest`
- Steps:
  1. Install Node 18
  2. `npm ci`
  3. `npx playwright install --with-deps`
  4. Run smoke tests: `npx playwright test --grep @smoke`
  5. Publish JUnit results
  6. Publish Playwright HTML report artifact

Expected pipeline variables/secrets:
- `BASE_URL`
- `USERNAME`
- `PASSWORD`

> Note: the current runtime config reads `E2E_USERNAME` / `E2E_PASSWORD`. If you want CI secrets to override credentials at runtime, map variables accordingly or update env variable names.

### Jenkins (`Jenkinsfile`)
- Parameterized build:
  - `SMOKE` (boolean) to run only smoke tests
- Stages:
  1. Checkout
  2. Install dependencies (`npm ci`)
  3. Install browsers (`npx playwright install`)
  4. Run tests (Chromium + Firefox; optional `--grep @smoke`)
- Post actions:
  - Archive `playwright-report/**/*`
  - Publish JUnit `test-results/results.xml`
  - Publish HTML Playwright report

Jenkins requirement:
- NodeJS tool configured as `NODEJS`

### GitHub Actions (`.github/workflows/playwright.yml`)
- Trigger:
  - `push` to `main`
  - `workflow_dispatch`
- Behavior:
  - On push: runs smoke tests
  - On manual dispatch: runs full suite
- Steps:
  1. Checkout
  2. Setup Node 18
  3. `npm ci`
  4. Install Playwright browsers
  5. Run tests
  6. Upload HTML and JUnit artifacts

Repository secrets used by workflow:
- `USERNAME`
- `PASSWORD`

## Useful Commands

```bash
# headed mode
npx playwright test --headed

# debug mode
npx playwright test --debug

# run a single spec
npx playwright test tests/banking-test.spec.ts
```

## Notes
- `tests/example.spec.ts` is the default Playwright sample spec and can be kept as reference or removed if not needed.
- Existing reports under `playwright-report/` and `test-results/` are generated artifacts.
