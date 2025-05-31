const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'uupokg',
  e2e: {
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    fixturesFolder: 'cypress/fixtures',
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1080,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true,
    screenshotOnRunFailure: true,
    experimentalStudio: true,
    watchForFileChanges: false
  },
  env: {
    apiUrl: 'http://localhost:5001/api'
  }
});
