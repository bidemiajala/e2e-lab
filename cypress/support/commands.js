// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command for API requests
Cypress.Commands.add('api', {
  prevSubject: false
}, (method, path, body = null) => {
  const options = {
    method,
    url: `http://localhost:5001${path}`, // Using direct URL instead of env variable
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  };

  if (body) {
    options.body = body;
  }

  return cy.request(options);
});

// Custom command for finding elements by data-testid
Cypress.Commands.add('findByDataTestId', (testId) => {
  return cy.get(`[data-testid="${testId}"]`);
}); 