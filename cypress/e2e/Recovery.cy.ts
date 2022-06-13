/// <reference types="cypress" />

describe('login page testing', () => {
  it('not allow to push button', () => {
    cy.visit('/recovery');
  });
});
