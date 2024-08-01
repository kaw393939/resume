# Resume Website

This project hosts a resume website and is set up to run Playwright tests before deploying to GitHub Pages. The website is stored in the `docs` folder and is available at [https://kaw393939.github.io/resume/](https://kaw393939.github.io/resume/).

## Getting Started

### Prerequisites

1. **Node.js and npm**: You need to have Node.js and npm installed on your machine. You can download and install them from [nodejs.org](https://nodejs.org/).

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kaw393939/resume.git
    cd resume
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Install Playwright Browsers**:
    ```bash
    npx playwright install --with-deps
    ```

### Running the Server

To start the Express server, use the following command:

```bash
npm start
```

This will start the server and you can view the website by navigating to `http://localhost:3000` in your browser.

### Running Tests

To start the server and run the Playwright tests, use the following command:

```bash
npm run test
```

This command will:
1. Start the Express server.
2. Run the Playwright tests.

### Project Structure

- `docs/`: Contains the static files for the resume website.
- `tests/`: Contains the Playwright test files.
- `playwright.config.ts`: Configuration file for Playwright.

### Playwright Configuration

The `playwright.config.ts` file is used to configure the Playwright test runner. Here are some common options explained:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  reporter: 'html',
});
```

- **testDir**: The directory where your test files are located.
- **timeout**: Maximum time one test can run. Default is 30 seconds.
- **retries**: Number of times to retry a failed test.
- **use**: Default context and browser options.
  - **headless**: Run tests in headless mode (without a visible UI).
  - **viewport**: Specify the width and height of the browser window.
  - **actionTimeout**: Maximum time for each action (like click, type). Default is no timeout.
  - **ignoreHTTPSErrors**: Ignore HTTPS errors.
  - **video**: Record video only for failed tests.
- **reporter**: Specifies the test reporter to use. 'html' generates an HTML report.

### Using Playwright Recordings

Playwright offers a feature to record tests by interacting with your web application. To start recording a new test, run:

```bash
npx playwright codegen
```

This will open a browser where you can interact with your application. Playwright will generate the corresponding code for you. You can save this code in the `tests` directory to create new test files.

## GitHub Actions Workflow

This project includes two GitHub Actions workflows:

1. **Playwright Tests**: Runs Playwright tests on every push to `main` or `master` branches and on every pull request to these branches.
2. **Deploy to GitHub Pages**: Deploys the website to GitHub Pages only if the Playwright tests pass.

### Workflow Configuration

The workflow configuration is defined in `.github/workflows/playwright-tests-and-deploy.yml`.

```yaml
name: Playwright Tests and Deploy

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  test:
    name: Run Playwright Tests
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  deploy:
    name: Deploy to GitHub Pages
    needs: test
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v5
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Conclusion

This project is configured to ensure that your website is only deployed to GitHub Pages if all Playwright tests pass, providing a robust and reliable deployment pipeline. Happy testing and deploying!
