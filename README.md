# Playwright TypeScript Cucumber QA Automation Framework

## About

This is a UI test automation framework built using Playwright, TypeScript and Cucumber BDD.

The framework automates SauceDemo application workflows using the Page Object Model.

## Technologies

- Playwright
- TypeScript
- Cucumber BDD
- Node.js
- Git & GitHub
- GitHub Actions

## Project Structure

- features - Cucumber feature files
- stepDefinitions - Cucumber step definitions
- pages - Page Object Model classes
- hooks - Browser setup and teardown
- utils - Reusable methods and test data
- config - Cucumber and environment configuration
- reports - Cucumber HTML reports

## Test Scenarios

### Login
- Valid login
- Invalid username
- Invalid password
- Empty username
- Empty password

### Products
- Verify products
- Sort products by price
- Add product to cart

### Cart
- Add product and verify cart
- Remove product from cart

### Checkout
- Complete checkout for a product

## How to Run

Install dependencies:

```bash
npm install