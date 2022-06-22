/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit(
      '/new-password?hash=4788369dee152009edea24e2d2e4f4ea64be5e49069cd090603fa913ab4e3c7bd79f2dac17a6a16b0c7309ce8106847c'
    );
  });

  it('user can not update password if enter data is invalid', () => {
    cy.intercept('POST', Cypress.env('api_server') + '/password/recover', {
      statusCode: 422,
    });
    cy.get('[id="new_password"]').type('1234');
    cy.get('[id="repeat_password"]').type('1234');
    cy.get('[id="save_new_password_btn"]').click();
    cy.contains('invalid data provided.');
  });
  it('user can change password if all data is valid', () => {
    cy.intercept('POST', Cypress.env('api_server') + '/password/recover', {
      statusCode: 200,
    });
    cy.get('[id="new_password"]').type('123456');
    cy.get('[id="repeat_password"]').type('123456');
    cy.get('[id="save_new_password_btn"]').click();
    cy.contains('Your password has been updated successfully');
  });
  it('check password did not match error', () => {
    cy.get('[id="new_password"]').type('1238');
    cy.get('[id="repeat_password"]').type('1234');
    cy.get('[id="save_new_password_btn"]').click();
    cy.contains('password did not match');
  });
});
