import './commands';
import { mount } from 'cypress/react';
import './component.css';

Cypress.Commands.add('mount', mount);

// Example of adding a custom command for component testing
Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-testid=${selector}]`, ...args);
}); 