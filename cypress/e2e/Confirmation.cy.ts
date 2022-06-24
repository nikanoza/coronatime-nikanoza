/// <reference types="cypress" />

describe('confirmation page testing', () => {
  beforeEach(() => {
    cy.visit(
      '/confirmation?hash=4788369dee152009edea24e2d2e4f4ea64be5e49069cd090603fa913ab4e3c7bd79f2dac17a6a16b0c7309ce8106847c'
    );
  });

  it('user can confirm account', () => {
    cy.intercept('POST', Cypress.env('api_server') + '/confirm-account', {
      statusCode: 200,
    });
    cy.get('[id="confirm-btn"]').click();
    cy.url().should('include', 'login');
  });
});
