
## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Chrome, Firefox, and Safari for cross-browser testing

### Setup Test Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e2e-lab.git
   cd e2e-lab
   ```

2. Install dependencies:
   ```bash
   npm install
   npm run install:all
   ```

3. Configure test environment:

   Create `.env.test`:
   ```
   NODE_ENV=test
   PORT=5001
   ```

### Running Tests

#### Cypress Tests
```bash
# Run all Cypress tests headlessly
npm run test:cypress

# Open Cypress Test Runner for development
npm run test:cypress:open

# Run specific test file
npx cypress run --spec "cypress/e2e/feedback.cy.js"
```

#### Playwright Tests
```bash
# Install browsers
npx playwright install

# Run all Playwright tests
npm run test:playwright

# Run with UI mode
npm run test:playwright:ui

# Run tests in specific browser
npx playwright test --project=chromium
```

#### Running All Tests
```bash
# Run all test suites
npm run test:all
```

## 📊 Test Scenarios

### API Tests
- Health check endpoint verification
- Feedback submission validation
- Error handling verification
- Rate limiting tests
- Database operations verification

### Frontend Tests
- Form validation scenarios
- Star rating functionality
- Error message display
- Loading states
- Responsive design verification
- Accessibility testing

### Integration Tests
- End-to-end feedback submission
- Data persistence verification
- API error handling
- Cross-browser compatibility
- Mobile responsiveness

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm install
      - name: Run Cypress tests
        run: npm run test:cypress
      - name: Run Playwright tests
        run: npm run test:playwright
```

## 📈 Test Reports

- Cypress videos: `cypress/videos/`
- Playwright report: `playwright-report/`
- Screenshots: `cypress/screenshots/`
- CI/CD artifacts preserved in GitHub Actions

## 🔍 Testing Best Practices

1. **Test Organization:**
   - Page Object Model implementation
   - Custom command patterns
   - Shared test utilities
   - Fixture-based test data

2. **Test Stability:**
   - Retry mechanisms for flaky tests
   - Dynamic wait strategies
   - Network request stubbing
   - Database cleanup hooks

3. **CI/CD Integration:**
   - Parallel test execution
   - Cross-browser testing
   - Artifact preservation
   - Test result reporting

## 🐛 Known Issues & Limitations

- Safari tests require manual intervention on local machines
- Visual regression tests may vary across environments
- Rate limiting affects parallel test execution

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewTestSuite`)
3. Commit your changes (`git commit -m 'Add new test suite'`)
4. Push to the branch (`git push origin feature/NewTestSuite`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Playwright Test Documentation](https://playwright.dev/docs/intro)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

Happy Testing :)