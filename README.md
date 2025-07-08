# 🧪 Saucedemo Playwright

Automated end-to-end tests for [saucedemo.com](https://www.saucedemo.com) using TypeScript & Playwright.

## 🚀 Tech Stack
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)

## 📂 Project Structure

```
.
├── page-objects/      # Page Object Models
├── tests/             # Test cases (auth, checkout, products, security)
├── data/              # Test data (users, etc.)
├── playwright.config.ts # Playwright configuration
```

## 📦 Installation

```bash
git clone https://github.com/GA3RlEL/saucedemo_playwright.git
cd saucedemo_playwright
npm install
```

## ▶️ Running Tests

```bash
npx playwright test
```
Show HTML report:
```bash
npx playwright show-report
```

## 📝 Sample Scenarios

- ✅ Login (valid & invalid)
- 🛒 Add/remove products to cart
- 💳 Checkout process & form validation
- 🔐 Security: redirects for unauthorized users
