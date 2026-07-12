# SauceDemo Automation Assessment

## Overview

This project contains an automated end-to-end test for the SauceDemo application using Playwright and TypeScript.

Application under test : https://www.saucedemo.com
Credentials: Username: standard_user , Password: secret_sauce

The test covers the following user journey:
**`tests/PurchaseFlow.spec.ts`** 
1. Login with a valid user account 
2. Identify and add the two cheapest products to the cart
3. Verify cart item count
4. Proceed to checkout
5. Complete checkout information
6. Verify checkout overview and total calculation
7. Complete the purchase
8. Verify order confirmation page

 **`tests/LoginFailure.spec.ts`** 
1.  attempts login with a wrong password and asserts the exact error message text.

---
## Project Structure

```
.
PLAYWRIGHT-SAUCEDEMO
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── LoginPage.ts
│   └── ProductPage.ts
│
├── tests/
│   ├── LoginFailure.spec.ts
│   └── PurchaseFlow.spec.ts
│
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
├── README.md
└── TASK2-API-TESTCASE.md
```

---
| Path | Description |
|--------|-------------|
| `.github/workflows/playwright.yml` | GitHub Actions CI workflow |
| `pages/` | Page Object Model (POM) classes |
| `pages/LoginPage.ts` | Login page actions and validations |
| `pages/ProductPage.ts` | Product selection and cart actions |
| `pages/CartPage.ts` | Cart page actions and validations |
| `pages/CheckoutPage.ts` | Checkout page actions and validations |
| `tests/PurchaseFlow.spec.ts` | End-to-end purchase flow scenario |
| `tests/LoginFailure.spec.ts` | Invalid login scenario |
| `playwright.config.ts` | Playwright configuration |
| `package.json` | Project dependencies and test scripts |
| `TASK2-API-TESTCASE.md` | API test cases for Task 2 |
| `README.md` | Project documentation |

---
## Prerequisites

- Node.js 18+ and npm

## Setup
Note:For the purpose of this assessment, the test suite is configured to run on Chromium only to simplify the execution

```bash
git clone https://github.com/cikct/Playwright-SauceDemo.git
cd Playwright-SauceDemo
npm install                          #install dependencies
npx playwright install chromium      #install playwright browser - chromium
```
## Run Tests

The project is configured to run using a single command:

```bash
npm test    # Run all tests in the project
```

---

## Future Improvements

The current implementation delivers the core assessment requirements and includes additional improvements such as centralized configuration, externalized test data, enhanced reporting, and improved test readability through test.step().

In Future, the following enhancements could be considered:

1. Playwright fixtures — Centralize common setup activities such as page object initialization and reusable test preconditions to further reduce duplication across test files.
2. Environment Management — Support multiple environments (e.g. QA, UAT, Production) through environment variables and configuration files.







