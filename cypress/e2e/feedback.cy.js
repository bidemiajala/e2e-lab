const env = Cypress.env();

describe('API Tests', () => {
  it('should fetch feedbacks successfully', () => {
    cy.request({
      method: 'GET',
      url: `${env.apiUrl}/feedback`,
    }).its('status').should('equal', 200);
  });

  it('should create new feedback via API', () => {
    const feedback = {
      name: 'Demi Ajala',
      message: 'API Test Feedback',
      rating: 5
    };

    cy.request({
      method: 'POST',
      url: `${env.apiUrl}/feedback`,
      body: feedback
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data.name).to.eq(feedback.name);
      expect(response.body.data.message).to.eq(feedback.message);
      expect(response.body.data.rating).to.eq(feedback.rating);
    });
  });
}); 

describe('Feedback Form', () => {
  beforeEach(() => {
    // Reset database before
    cy.request({
      method: 'POST',
      url: `${env.apiUrl}/test/reset`,
    });
    cy.visit('/');
  });

  it('should submit feedback successfully', () => {
    cy.findByDataTestId('input-name').should('be.visible').clear().type('Demi Ajala');
    cy.findByDataTestId('star-rating-4').should('be.visible').click()
    const feedbackMessage = 'This is a test feedback message!';
    cy.findByDataTestId('input-message').should('be.visible').clear().type(feedbackMessage);
    cy.findByDataTestId('button-submit').should('be.visible').click();
    cy.contains('Feedback submitted successfully!').should('be.visible');
  });

  it('should display validation error for empty feedback', () => {
    cy.findByDataTestId('button-submit').should('be.visible').click();
    cy.contains('Name is required').should('be.visible');
  });
});