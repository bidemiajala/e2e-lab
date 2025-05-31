import React from 'react';
import Playground from '../../frontend/src/components/Playground';

describe('Playground Component', () => {
  beforeEach(() => {
    // Mount component with a parent div that has a specific width to ensure proper rendering
    cy.mount(
      <div className="w-screen h-screen">
        <Playground />
      </div>
    );
  });

  it('renders the main heading', () => {
    cy.contains('h2', 'QA Testing Playground').should('be.visible');
  });

  it('handles form input changes', () => {
    // Test name input
    cy.getBySel('name-input')
      .type('John Doe')
      .should('have.value', 'John Doe');

    // Test email input
    cy.getBySel('email-input')
      .type('john@example.com')
      .should('have.value', 'john@example.com');

    // Test description textarea
    cy.getBySel('description-textarea')
      .type('This is a test description')
      .should('have.value', 'This is a test description');
  });

  it('handles toggle switch', () => {
    cy.getBySel('toggle-switch')
      .should('exist')
      .click({force: true})
      .should('have.class', 'bg-gray-900');
  });

  it('handles radio button selection', () => {
    // Test each radio option
    ['email', 'phone', 'slack'].forEach(method => {
      cy.getBySel(`radio-${method}`)
        .check()
        .should('be.checked');
    });
  });

  it('handles checkbox selection', () => {
    // Test Frontend Testing checkbox
    cy.getBySel('checkbox-frontend-testing')
      .check()
      .should('be.checked');

    // Test multiple selections
    cy.getBySel('checkbox-backend-testing')
      .check()
      .should('be.checked');

    // Test unchecking
    cy.getBySel('checkbox-frontend-testing')
      .uncheck()
      .should('not.be.checked');
  });

  it('handles file upload', () => {
    // Create a test file and trigger upload
    cy.getBySel('file-upload').selectFile({
      contents: Cypress.Buffer.from('file contents'),
      fileName: 'test.txt',
      lastModified: Date.now(),
    });
  });

  it('handles form submission', () => {
    // Fill out form
    cy.getBySel('name-input').type('John Doe');
    cy.getBySel('email-input').type('john@example.com');
    cy.getBySel('description-textarea').type('Test description');
    cy.getBySel('radio-email').check();
    cy.getBySel('checkbox-frontend-testing').check();

    // Spy on console.log
    cy.window().then((win) => {
      cy.spy(win.console, 'log').as('consoleLog');
    });

    // Submit form
    cy.getBySel('submit-button').click();

    // Verify console.log was called with form data
    cy.get('@consoleLog').should('be.calledWith', 'Form data:', Cypress.sinon.match.object);
  });

  it('displays table data correctly', () => {
    // Check if table rows are rendered
    cy.getBySel('table-row-1').should('be.visible');
    cy.getBySel('table-row-2').should('be.visible');
    cy.getBySel('table-row-3').should('be.visible');

    // Verify table content
    cy.contains('Form Validation').should('be.visible');
    cy.contains('Mobile Responsiveness').should('be.visible');
    cy.contains('Accessibility').should('be.visible');
  });

  it('handles mobile menu toggle', () => {
    // Set viewport to mobile size
    cy.viewport('iphone-x');
    
    // Test hamburger menu button
    cy.getBySel('hamburger-menu')
      .should('be.visible')
      .click();

    // Verify menu items are visible
    cy.contains('Home').should('be.visible');
    cy.contains('About').should('be.visible');
    cy.contains('Contact').should('be.visible');

    // Close menu
    cy.getBySel('hamburger-menu').click();
  });
}); 