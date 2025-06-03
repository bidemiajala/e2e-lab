[![Build and Test](https://github.com/bidemiajala/e2e-lab/actions/workflows/main.yml/badge.svg)](https://github.com/bidemiajala/e2e-lab/actions/workflows/main.yml)
# E2E Testing Playground

Hey there! 👋 This is my testing playground where I experiment with different QA automation approaches. The main app is a feedback collection system, but the real fun is in how we test it!

## What's Inside

The playground has two main parts:

1. **Testing Elements Playground** - A sandbox full of different UI elements that are commonly tricky to test:
   - Dynamic loading states
   - Form validations
   - Async operations
   - Error states
   - Modal dialogs
   - And more fun stuff to test!

2. **Feedback Collection App** - A real-world example app where users can:
   - Submit feedback with star ratings
   - View all submitted feedback
   - (There's a cool cron job that clears feedback daily, so we can start fresh!)

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Express.js
- **Testing Tools**:
  - Cypress for E2E and Component testing
  - Playwright for cross-browser testing
  - Component testing with Cypress for React components
  - GitHub Actions for CI/CD
  - Vercel for frontend deployment
  - Render for backend deployment

## Getting Started

1. Clone the repo:
```bash
git clone https://github.com/yourusername/e2e-lab.git
cd e2e-lab
```

2. Install dependencies:
```bash
npm install
```

3. Start both frontend and backend:
```bash
npm run start:servers
```

## Running Tests

We've got several ways to run tests:

```bash
# Run Cypress component tests
npm run test:cypress:component

# Open Cypress Component Testing UI
npm run test:cypress:component:open

# Run Cypress E2E tests
npm run test:cypress

# Open Cypress Test Runner
npm run test:cypress:open

# Run Playwright tests
npm run test:playwright

# Run Playwright with UI
npm run test:playwright:ui

# Run all tests
npm run test:all
```

### Component Tests

Our React components are tested using Cypress Component Testing. These tests:
- Run in isolation from the full app
- Test component behavior and interactions
- Verify UI states and user interactions
- Run faster than E2E tests
- Help catch issues early in development

Key component test files:
```
e2e-lab/
├── cypress/
│   ├── component/           # Component test files
│   │   └── *.cy.jsx         # Individual component tests
│   └── support/
│       ├── component.js     # Component test configuration
│       └── component.css    # Component test styles
```

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration, running:
- Dependency security checks
- Backend tests
- Frontend tests:
  1. Component tests (Cypress)
  2. E2E tests (Cypress)
  3. Cross-browser tests (Playwright)
- Automated deployments to Vercel (frontend) and Render (backend)

Component tests must pass before E2E tests run and before any deployment can proceed.

## Live Demo

- Frontend: https://e2e-lab.vercel.app
- Backend: https://e2e-lab.onrender.com

## Environment Variables

Frontend (Vercel):
```bash
REACT_APP_API_URL=your_backend_url
```

Backend (Render):
```bash
FRONTEND_URL=your_frontend_url
```

## Project Structure
```
e2e-lab/
├── frontend/         # React frontend
│   ├── src/          # Source code
│   └── tests/        # Playwright tests
│
├── cypress/          # Cypress tests
│   ├── e2e/          # End-to-end tests
│   └── component/    # Component tests
│
└── backend/          # Express backend
    ├── server.js     # Main server file
    └── db.js         # Database operations
```

## Contributing

Feel free to open issues or PRs if you find bugs or have suggestions for more test scenarios! This is a learning playground after all 🎮

## License

MIT - Feel free to use this for your own testing experiments!

---

Made with ☕ by a QA engineer who loves breaking things (professionally, of course!)