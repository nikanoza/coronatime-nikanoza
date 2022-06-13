/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('not allow to push button', () => {
    cy.get('[id="login_btn"]').click();
    cy.url().should('include', 'login');
  });
  it('user can change language', () => {
    cy.get('.css-b62m3t-container').click();
    cy.get('[id="geo"]').click();
    cy.contains('კეთილი იყოს თქვენი მობრძანება');
  });

  it('user can navigate passpord recovery page', () => {
    cy.get('[id="reset_password_btn"]').click();
    cy.url().should('not.include', 'login');
  });

  it('error mesage appears if user enter invalid data', () => {
    cy.get('[id="username"]').type('ws');
    cy.get('[id="login_btn"]').click();
    cy.contains('Username should be unique, min 3 symbols');
  });

  it('user can login if enter valid data', () => {
    cy.get('[id="username"]').type('donovani');
    cy.get('[id="password"]').type('1234567');
    cy.intercept('POST', Cypress.env('api_server') + 'login', {
      statusCode: 200,
      body: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlbGEiLCJlbWFpbCI6ImdlbGFAcmVkYmVycnkuZ2UiLCJpYXQiOjE2NTQ3NTUxMTB9.wfqWFe8ROZ9pLD57QU0paQrI2VSXqfVZne2oTrbOTdk',
      },
    });
    cy.get('[id="login_btn"]').click();
    cy.url().should('include', '/dashboard/world');
  });

  it('user can not login if enter incorect username or password', () => {
    cy.get('[id="username"]').type('donovani');
    cy.get('[id="password"]').type('123456');
    cy.intercept('POST', Cypress.env('api_server') + 'login', {
      statusCode: 401,
    });
    cy.get('[id="login_btn"]').click();
    cy.contains('please, provide correct credentials...');
  });
});
