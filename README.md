# Sauce Demo E2E Test Suite

A professional end-to-end test automation suite for [SauceDemo](https://www.saucedemo.com/) - a sample e-commerce application by Swag Labs. Built to demonstrate real-world QA automation practices including Page Object Model, custom fixtures, typed test data, and CI/CD integration.

> **Repository:** https://github.com/Suyesha11/Sauce-Demo-e2e

---

## Tech Stack

| Tool | Version |
|------|---------|
| [Playwright](https://playwright.dev/) | 1.60.0 |
| TypeScript | 5.4.5 |
| Node.js | 22.22.2 |
| dotenv | 16.4.5 |

---

## Project Structure

```
sauce-demo-e2e/
├── .github/                      # GitHub Actions CI workflow
├── tests/                        # Test spec files
│   ├── login.spec.ts             # Login feature tests
│   └── ProductPage.spec.ts       # Products page tests
├── pages/                        # Page Object Model classes
│   ├── LoginPage.ts              # Login page locators and actions
│   └── ProductPage.ts            # Products page locators and actions
├── fixtures/                     # Custom Playwright fixtures
│   └── auth-fixture.ts           # Authenticated session fixtures per user
├── test-data/                    # Test data
│   └── users.ts                  # User credentials loaded from .env
├── types/                        # TypeScript interfaces
│   └── index.ts                  # User type definition
├── utils/                        # Constants and helpers
│   ├── constant.ts               # Expected error messages
│   └── productFilters.ts         # Product sort filter labels
├── .env                          # Local credentials (gitignored)
├── .env.example                  # Template for required environment variables
├── playwright.config.ts          # Playwright configuration
├── TEST_PLAN.md                  # Formal test plan document
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Git](https://git-scm.com/)

---

## Installation

**1. Clone the repository**
```bash
git clone https://github.com/Suyesha11/Sauce-Demo-e2e.git
cd Sauce-Demo-e2e
```

**2. Install dependencies**
```bash
npm install
```

**3. Install Playwright browsers**
```bash
npx playwright install
```

**4. Set up environment variables**

Copy the example file and fill in the credentials:
```bash
cp .env.example .env
```

Open `.env` and add the SauceDemo credentials (publicly available on the login page):
```
STANDARD_USER=standard_user
LOCKED_OUT_USER=locked_out_user
PROBLEM_USER=problem_user
PERFORMANCE_GLITCH_USER=performance_glitch_user
ERROR_USER=error_user
VISUAL_USER=visual_user
INVALID_USER=invalid_credentials
PASSWORD=secret_sauce
```

> **Note:** These credentials are publicly documented by Swag Labs on the SauceDemo login page. In a real project, credentials would never be committed or publicly shared.

---

## Running Tests

**Run full test suite**
```bash
npx playwright test
```

**Run in headed mode (watch the browser)**
```bash
npx playwright test --headed
```

**Run a specific spec file**
```bash
npx playwright test tests/login.spec.ts
npx playwright test tests/ProductPage.spec.ts
```

**Run a specific test by name**
```bash
npx playwright test --grep "should login successfully"
```

**View HTML test report**
```bash
npx playwright show-report
```

---

## Test Coverage

### Login (`login.spec.ts`) - 11 tests

| Scenario | Type |
|----------|------|
| Standard user logs in successfully | Happy path |
| Performance glitch user logs in successfully | Happy path |
| Error user logs in successfully | Happy path |
| Visual user logs in successfully | Happy path |
| Locked out user sees error message | Negative |
| Invalid credentials show error message | Negative |
| Empty username shows error message | Negative |
| Empty password shows error message | Negative |
| Special characters show error message | Edge case |
| Both fields empty show error message | Edge case |
| Direct URL access without login is blocked | Security |

### Products Page (`ProductPage.spec.ts`)- 10 tests

| Scenario | Type |
|----------|------|
| Filter dropdown displays 4 sort options | Functional |
| Sort by name A-Z orders products correctly | Functional |
| Sort by name Z-A orders products correctly | Functional |
| Sort by price low to high orders correctly | Functional |
| Sort by price high to low orders correctly | Functional |
| Add to cart updates badge count | Functional |
| Remove from cart hides badge | Functional |
| Add to cart changes button text to Remove | UI state |
| Clicking product name navigates to detail page | Navigation |
| Adding multiple products updates badge count | Functional |
| Problem user sees identical images (known bug) | Bug verification |

---

## Design Decisions

**Page Object Model (POM)**
All locators and page interactions are encapsulated in Page Object classes under `pages/`. Tests never reference `data-test` attributes directly - they call methods on Page Objects. This separates test logic from implementation details, making the suite easier to maintain when the UI changes.

**Custom Fixtures**
Rather than repeating login steps in every test that requires authentication, custom Playwright fixtures in `fixtures/auth-fixture.ts` handle login per user type. Tests simply destructure the fixture they need in `beforeEach` and receive an already-authenticated page.

**Typed Test Data**
User credentials are typed using a `User` interface from `types/index.ts` and loaded from environment variables via `test-data/users.ts`. This ensures credentials are never hardcoded in test files and are consistent across the suite.

**Constants for Expected Values**
Error messages and filter labels are stored in `utils/constant.ts` and `utils/productFilters.ts`. If the application changes a message or label, it is updated in one place rather than across every test file.

**Environment Variables**
Credentials are loaded from a `.env` file using `dotenv` and are gitignored. A `.env.example` file is committed so any engineer cloning the repo knows exactly what variables are required.

---

## CI/CD

This project includes a GitHub Actions workflow that runs the full test suite on every push and pull request to `main`. The workflow installs dependencies, installs Playwright browsers, and runs all tests in headless mode.

---

## Known Issues

- **Problem User:** All product images display the same broken image (`sl-404.jpg`). This is an intentional bug in SauceDemo used to verify bug detection capabilities.
- **Problem User:** Product sort filters do not reorder products as expected.
- **Visual User:** Cart icon and some UI elements are misplaced due to intentional CSS bugs.

---

## Author

**Suyesha Patil** - Quality Assurance Engineer  
[GitHub](https://github.com/Suyesha11/Sauce-Demo-e2e)
