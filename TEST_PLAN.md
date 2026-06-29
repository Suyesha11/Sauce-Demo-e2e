# Test Plan  -  SauceDemo E2E Automation Suite

---

## 1. Introduction & Objectives

SauceDemo app is an e-commerce application where you can buy clothes and lifestyle products.
The application is made by Swag Labs and hosted at https://www.saucedemo.com/

This document states the different types of testing like functional, e2e, smoke and regression which will be carried out on the application. It covers the test approach that will be used and the coverage that the team is aiming for in e2e testing.

**Objectives:**

- This suite aims to achieve 90% automation coverage which will include all the critical paths from login to product checkout and also negative scenarios like hitting page URLs directly.
- The suite is designed so that any engineer can understand the testing decisions made and how to scale the suite themselves by reading through this document.
- This project is a personal portfolio piece built to demonstrate professional QA automation practices.

---

## 2. Scope

### In Scope

- Functional UI testing across all 6 feature areas
- Happy path and negative test scenarios per feature
- Cross-page E2E flows from login to order confirmation
- Security testing - direct URL access without authentication
- Bug verification testing for known user-specific defects
- Cross-browser testing with Chromium, WebKit and Firefox

### Out of Scope

- API testing - this project covers UI automation only
- Performance testing
- Accessibility testing
- Visual regression testing
- Mobile and responsive testing

---

## 3. Test Approach

This suite uses Playwright with TypeScript following the Page Object Model architecture. Each page has a dedicated Page Object class which encapsulates locators and actions. Tests are organised by feature area into separate spec files. Custom Playwright fixtures handle authentication and navigation setup, eliminating repeated code across test files. Test data is managed through environment variables and typed TypeScript interfaces. Constants are used for all expected values such as error messages and filter labels.

---

## 4. Test Types

| Type | Description |
|------|-------------|
| Functional | Tests each feature on each page covering happy path and negative scenarios |
| E2E | Full user journey flows from login to order confirmation - planned for a future iteration. Currently individual feature areas are covered independently |
| Smoke | A subset of critical path tests verifying core functionality is working - login, add to cart, checkout - planned for a future iteration |
| Regression | The full suite runs on every push and pull request via GitHub Actions CI to catch any unintended breaking changes |

---

## 5. Features to be Tested

| # | Feature | Coverage |
|---|---------|----------|
| 1 | Login | Authentication flows for all 6 user types, error handling, access control |
| 2 | Product Page | Product and price display, sort filters, add/remove from cart, product detail navigation |
| 3 | Cart | Cart item verification, remove item, navigation to checkout and back to shopping |
| 4 | Checkout Step 1 | Personal info form validation, happy path, cancel navigation |
| 5 | Checkout Overview | Order summary verification, price calculation, navigation |
| 6 | Order Confirmation | Success state verification, cart cleared, back home navigation |

---

## 6. Features NOT to be Tested

| Feature | Reason |
|---------|--------|
| Logout | Deprioritised - session management tested implicitly via fixture teardown |
| Visual User specific tests | Identified layout bugs manually but not automated in this iteration |
| Problem User sort filter bug | Identified but not automated - image bug covered instead |
| Footer links | Static content, low risk, out of scope for functional testing |
| About link in burger menu | External link to Swag Labs, outside application scope |

---

## 7. Entry & Exit Criteria

### Entry Criteria

- Test environment is accessible at https://www.saucedemo.com/
- All user credentials are available and loaded via .env file
- Playwright and all dependencies are installed
- All Page Object classes and fixtures are implemented

### Exit Criteria

- All 40 automated tests passing in CI
- No critical or high severity test failures
- GitHub Actions pipeline running green on main branch
- HTML test report generated and accessible

---

## 8. Test Environment

| Component | Details |
|-----------|---------|
| Application URL | https://www.saucedemo.com/ |
| Browsers | Chromium, Firefox, WebKit (via Playwright) |
| Operating System | Windows 11 (local), Ubuntu Latest (CI) |
| Node.js | v22.22.2 |
| Playwright | v1.60.0 |
| TypeScript | v5.4.5 |
| CI Environment | GitHub Actions |
| Test Users | 6 predefined users provided by SauceDemo |

---

## 9. Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| SauceDemo is a third-party URL not under our control and could go down | Tests are designed to fail fast with clear error messages. CI pipeline alerts on failure immediately |
| Flaky tests due to timing issues | Playwright built-in auto-waiting used throughout. waitForURL added at every navigation point |
| Hardcoded test data breaking if app changes | All expected values stored in constants file - single point of update |
| Credentials exposed in repository | All credentials stored in .env file which is gitignored. GitHub Secrets used in CI pipeline |
| Browser compatibility issues | All three major browsers tested locally. CI runs Chromium only for speed |

---

## 10. Deliverables

- Formal Test Plan document (`TEST_PLAN.md`)
- 40 automated tests across 6 feature areas
- Page Object Model classes for all application pages
- Custom Playwright fixtures for authenticated sessions
- GitHub Actions CI/CD pipeline with browser caching
- HTML test report generated on every CI run
- Professional README with setup instructions and coverage documentation
- `.env.example` for environment setup guidance