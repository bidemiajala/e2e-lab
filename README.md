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
  - Cypress for E2E testing
  - Playwright for cross-browser testing
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

We've got a few ways to run tests:

```bash
# Run Cypress tests
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

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration, running:
- Dependency security checks
- Backend tests
- Frontend tests (Cypress & Playwright)
- Automated deployments to Vercel (frontend) and Render (backend)

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
│   ├── cypress/      # Cypress tests
│   └── tests/        # Playwright tests
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