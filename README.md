# Cypress TypeScript POM Test Automation

Cypress end-to-end test automation project using:

- [Cypress](https://www.cypress.io/)
- TypeScript
- Page Object Model (POM)
- Cypress Fixtures
- Google Chrome
- Docker
- Mochawesome HTML Reports

---

## Project Structure

```text
.
├── cypress/
│   ├── e2e/
│   │   └── ReportManagementTests.cy.ts
│   │
│   ├── fixtures/
│   │   ├── NavbarFixture.json
│   │   └── RepertoireManagementPageFixture.json
│   │
│   ├── pages/
│   │   ├── Homepage.ts
│   │   ├── Navbar.ts
│   │   └── RepertoireManagementPage.ts
│   │
│   ├── screenshots/
│   ├── videos/
│   └── results/
│
├── cypress.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── Dockerfile
├── docker-compose.yml
└── .dockerignore
```

---

# Prerequisites

## Local execution

Install:

- Node.js
- npm
- Google Chrome

Verify Node.js:

```bash
node --version
```

Verify npm:

```bash
npm --version
```

Verify Chrome is installed.

## Docker execution

Install:

- Docker Desktop

Verify Docker:

```bash
docker --version
```

Verify Docker Compose:

```bash
docker compose version
```

---

# Install Dependencies

Clone the repository and navigate to the project directory:

```bash
cd spanish-point-assessment
```

Install dependencies:

```bash
npm install
```

---

# Run Cypress Interactively

To open the Cypress Test Runner:

```bash
npx cypress open
```

Select:

```text
E2E Testing
```

Then select:

```text
Google Chrome
```

and choose the test you want to execute.

---

# Run Tests from Terminal

## Run all tests

```bash
npx cypress run
```

This runs Cypress in headless mode.

---

## Run tests using Google Chrome

The project is configured to run tests using Chrome.

```bash
npx cypress run --browser chrome
```

This is the recommended local command for CI-style execution.

---

## Run a specific test

For example:

```bash
npx cypress run \
  --browser chrome \
  --spec "cypress/e2e/ReportManagementTests.cy.ts"
```

On Windows PowerShell, you can use:

```powershell
npx cypress run --browser chrome --spec "cypress/e2e/ReportManagementTests.cy.ts"
```

---

# NPM Scripts

The following scripts can be configured in `package.json`:

```json
{
  "scripts": {
    "cy:open": "cypress open",
    "cy:run": "cypress run --browser chrome",
    "test": "npm run cy:run",
    "report:merge": "mochawesome-merge cypress/results/*.json -o cypress/results/mochawesome.json",
    "report:generate": "marge cypress/results/mochawesome.json -f index -o cypress/results/report"
  }
}
```

You can then run:

### Open Cypress

```bash
npm run cy:open
```

### Run all tests in Chrome

```bash
npm run cy:run
```

### Run the complete test suite and generate the report

```bash
npm run cy:run
npm run report:merge
npm run report:generate
```

---

# Test Reports

The project uses Mochawesome to generate HTML test reports.

After running the tests and generating the report:

```text
cypress/
└── results/
    ├── mochawesome.json
    └── report/
        └── index.html
```

Open:

```text
cypress/results/report/index.html
```

in a browser.

The report contains:

- Passed tests
- Failed tests
- Test duration
- Test suites
- Test errors
- Screenshots where configured

---

# Screenshots

Screenshots are automatically captured when a test fails.

They are stored in:

```text
cypress/screenshots/
```

For example:

```text
cypress/
└── screenshots/
    └── ReportManagementTests.cy.ts/
        └── Repertoire Management Test (failed).png
```

Screenshots are particularly useful when investigating failures in Docker.

---

# Video Recording

Video recording is enabled for headless test execution.

Videos are stored in:

```text
cypress/videos/
```

For example:

```text
cypress/
└── videos/
    └── ReportManagementTests.cy.ts.mp4
```

---

# Docker Execution

The project includes a Docker configuration that runs Cypress in a container.

The Docker image uses an official Cypress image containing the Cypress runtime and supported browsers.

## Build the Docker image

From the project root:

```bash
docker build -t matching-engine-cypress .
```

---

## Run the Docker container

```bash
docker run --rm matching-engine-cypress
```

The Docker configuration runs Cypress using Google Chrome:

```bash
npx cypress run --browser chrome
```

---

# Docker Compose

Docker Compose is recommended because it makes it easier to preserve test results, screenshots and videos.

Run:

```bash
docker compose up --build
```

This will:

1. Build the Cypress Docker image
2. Install npm dependencies
3. Copy the Cypress project into the container
4. Start Cypress
5. Run tests in Google Chrome
6. Generate test results
7. Save screenshots and videos
8. Make the results available on the host machine

---

# Docker Results

The Docker Compose configuration mounts the following directories:

```text
./cypress/results
./cypress/screenshots
./cypress/videos
```

Therefore, after the Docker execution completes, results will be available locally.

### HTML report

```text
cypress/results/report/index.html
```

### Screenshots

```text
cypress/screenshots/
```

### Videos

```text
cypress/videos/
```

---

# Run Docker in the Background

You can run the tests without keeping the terminal attached:

```bash
docker compose up --build -d
```

Check the container:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

Stop the containers:

```bash
docker compose down
```

---

# Run a Specific Cypress Test in Docker

You can override the Docker command:

```bash
docker compose run --rm cypress \
  npx cypress run \
  --browser chrome \
  --spec "cypress/e2e/ReportManagementTests.cy.ts"
```

On Windows PowerShell:

```powershell
docker compose run --rm cypress npx cypress run --browser chrome --spec "cypress/e2e/ReportManagementTests.cy.ts"
```

---

# Page Object Model

The project uses Page Object Model to separate test logic from page interaction logic.

For example:

```text
cypress/pages/Homepage.ts
```

contains homepage-specific operations:

```typescript
class Homepage {
  visit(): void {
    cy.visit("https://www.matchingengine.com/");
  }

  acceptCookies(): void {
    cy.get("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll").click();
  }
}

export default Homepage;
```

The test then focuses on the business flow:

```typescript
homePage.visit();
homePage.acceptCookies();

navbar.goTo("Repertoire Management");

repertoireManagementPage.goToSection("All-in-one solution for scale");
```

---

# Fixtures

Test data is stored under:

```text
cypress/fixtures/
```

For example:

```text
NavbarFixture.json
RepertoireManagementPageFixture.json
```

Fixtures can be loaded using:

```typescript
cy.fixture("NavbarFixture").then((fixture) => {
  // Use fixture data
});
```

This keeps test data separate from the test implementation.

---

# Cypress Configuration

The main Cypress configuration is:

```text
cypress.config.ts
```

The configuration defines:

- Cypress test settings
- Viewport size
- Reporter
- Screenshots
- Video recording
- Node event configuration

Example:

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: "mochawesome",

  reporterOptions: {
    reportDir: "cypress/results",
    overwrite: false,
    html: false,
    json: true,
  },

  video: true,
  screenshotOnRunFailure: true,
});
```

---

# Troubleshooting

## Tests pass locally but fail in Docker

First run:

```bash
docker compose run --rm cypress \
  npx cypress run --browser chrome
```

Check the Cypress screenshots:

```text
cypress/screenshots/
```

Also check the Docker logs:

```bash
docker compose logs
```

---

## Check Chrome

Verify that Cypress can detect Chrome:

```bash
npx cypress info
```

Then run:

```bash
npx cypress run --browser chrome
```

---

## Check Cypress Version

```bash
npx cypress version
```

The Cypress version used by the Docker image should match the Cypress version defined in `package.json`.

---

## Rebuild Docker Without Cache

If dependencies or the Docker configuration have changed:

```bash
docker compose build --no-cache
```

Then:

```bash
docker compose up
```

---

## Clean Docker Environment

To remove the containers:

```bash
docker compose down
```

To remove the image:

```bash
docker image rm matching-engine-cypress
```

Then rebuild:

```bash
docker build -t matching-engine-cypress .
```

---

# Recommended Execution Commands

## Development

Open Cypress interactively:

```bash
npm run cy:open
```

## Local CI-style execution

Run all tests in Chrome:

```bash
npm run cy:run
```

## Docker execution

Build and execute:

```bash
docker compose up --build
```

## View the HTML report

After execution:

```text
cypress/results/report/index.html
```

---

# Test Execution Flow

```text
Developer
    |
    +---- npm run cy:open
    |          |
    |          └── Cypress Test Runner
    |
    +---- npm run cy:run
    |          |
    |          └── Chrome (headless)
    |
    +---- docker compose up --build
               |
               ├── Docker
               │     |
               │     └── Cypress + Chrome
               |
               ├── Test execution
               |
               ├── Screenshots
               |
               ├── Videos
               |
               └── Mochawesome HTML report
                         |
                         └── cypress/results/report/index.html
```

---

# Notes

- Tests should use stable selectors where possible.
- Avoid relying on generated CSS class names when a stable `data-testid`, `id`, role, or accessible label is available.
- Page-specific selectors and actions should remain in Page Object classes.
- Test data should be maintained in Cypress fixtures.
- Tests should be independent and should not rely on execution order.
- Chrome is used for terminal and Docker execution.
- Screenshots and videos should be checked when investigating Docker-specific failures.
