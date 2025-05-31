describe('App', () => {
  it('loads successfully', () => {
    cy.visit('/')
    cy.get('[data-testid="app-container"]').should('exist')
  })
}) 