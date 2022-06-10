/// <reference types="cypress" />

describe('login page testing', () => {
  it('not allow to push button', () => {
    cy.visit('http://localhost:3000/recovery');
  });
});
