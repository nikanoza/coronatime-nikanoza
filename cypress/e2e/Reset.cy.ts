/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit('/reset');
  });

  it('user can sent if email found in database', () => {
    cy.intercept(
      'POST',
      Cypress.env('api_server') + '/password/send-recovery-link',
      {
        statusCode: 200,
      }
    );

    cy.get('[id="email"]').type('shroderi@gmail.com');
    cy.get('[id="reset_btn"]').click();
    cy.contains('We have sent you a confirmation email');
  });
  it('user can not sent request if email not found', () => {
    cy.intercept(
      'POST',
      Cypress.env('api_server') + '/password/send-recovery-link',
      {
        statusCode: 403,
      }
    );
    cy.get('[id="email"]').type('shroderi@gmail.com');
    cy.get('[id="reset_btn"]').click();
    cy.contains('email not found');
  });
});
