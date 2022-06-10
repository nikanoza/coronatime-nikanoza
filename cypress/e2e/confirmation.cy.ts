/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit(
      'http://localhost:3000/confirmation?hash=4788369dee152009edea24e2d2e4f4ea64be5e49069cd090603fa913ab4e3c7bd79f2dac17a6a16b0c7309ce8106847c'
    );
  });

  it('user can confirm acount', () => {
    cy.intercept(
      'POST',
      'https://coronatime-api.devtest.ge/api/confirm-account',
      {
        statusCode: 200,
      }
    );
    cy.get('[id="confirm-btn"]').click();
    cy.url().should('include', 'confirmed');
  });
});
