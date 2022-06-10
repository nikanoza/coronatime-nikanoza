/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/registration');
  });

  it('user can navigate to login page', () => {
    cy.get('[id="sign_btn"]').click();
    cy.url().should('include', 'login');
  });
  it('user can not sign up if enter invalid data', () => {
    cy.get('[id="username"]').type('so');
    cy.get('[id="email"]').type('nika@gmail.com');
    cy.get('[id="password"]').type('12345');
    cy.get('[id="repeat_password"]').type('12345');
    cy.get('[id="sign_up"]').click();
    cy.url().should('include', 'registration');
  });
  it('user can not register if username is olready taken', () => {
    cy.get('[id="username"]').type('donovani');
    cy.get('[id="email"]').type('nika@gmail.com');
    cy.get('[id="password"]').type('12345');
    cy.get('[id="repeat_password"]').type('12345');
    cy.intercept('POST', 'https://coronatime-api.devtest.ge/api/register', {
      statusCode: 422,
      body: [
        {
          message: 'this username is already taken.',
          path: ['username'],
          type: 'custom',
          context: {
            label: 'username',
            value: 'gela',
            key: 'username',
          },
        },
      ],
    });
    cy.get('[id="sign_up"]').click();
    cy.url().should('include', 'registration');
    cy.contains('this username is already taken.');
  });
  it('user can not register if email is olready taken', () => {
    cy.get('[id="username"]').type('donovani');
    cy.get('[id="email"]').type('nika@gmail.com');
    cy.get('[id="password"]').type('12345');
    cy.get('[id="repeat_password"]').type('12345');
    cy.intercept('POST', 'https://coronatime-api.devtest.ge/api/register', {
      statusCode: 422,
      body: [
        {
          message: 'this email is already taken.',
          path: ['email'],
          type: 'custom',
          context: {
            label: 'email',
            value: 'gela',
            key: 'username',
          },
        },
      ],
    });
    cy.get('[id="sign_up"]').click();
    cy.url().should('include', 'registration');
    cy.contains('this email is already taken.');
  });
  it('user can register if enter unique and valid data', () => {
    cy.get('[id="username"]').type('soso');
    cy.get('[id="email"]').type('nika@gmail.com');
    cy.get('[id="password"]').type('12345');
    cy.get('[id="repeat_password"]').type('12345');
    cy.intercept('POST', 'https://coronatime-api.devtest.ge/api/register', {
      statusCode: 201,
    });
    cy.get('[id="sign_up"]').click();
    cy.url().should('include', 'sent-info');
  });
});

// sign_up
// sent-info
