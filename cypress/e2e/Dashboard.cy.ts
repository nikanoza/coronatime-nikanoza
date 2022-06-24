/// <reference types="cypress" />

describe('dashboard page testing', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.fixture('countries').then((json) => {
      cy.intercept('GET', Cypress.env('api_server') + '/countries/', {
        statusCode: 200,
        body: json.countries,
      });
    });
    cy.get('[id="username"]').type('donovani');
    cy.get('[id="password"]').type('12345678');
    cy.intercept('POST', Cypress.env('api_server') + '/login', {
      statusCode: 200,
      body: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlbGEiLCJlbWFpbCI6ImdlbGFAcmVkYmVycnkuZ2UiLCJpYXQiOjE2NTQ3NTUxMTB9.wfqWFe8ROZ9pLD57QU0paQrI2VSXqfVZne2oTrbOTdk',
      },
    });
    cy.get('[id="login_btn"]').click();
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(1000);
    cy.get('[id="country_btn"]').click();
  });
  it('country statistic is loaded', () => {
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(5000).should(() => {
      expect(
        JSON.parse(localStorage.getItem('statistics') || '')[0].code
      ).to.eq('AF');
    });
    cy.get('[id="h-menu"]').click();
    cy.get('.css-b62m3t-container').click();
    cy.get('[id="geo"]').click();
    cy.get('[id="name_asc"]').click();
    cy.get('[id="name_dsc"]').click();
    cy.get('[id="cases_asc"]').click();
    cy.get('[id="cases_dsc"]').click();
    cy.get('[id="death_asc"]').click();
    cy.get('[id="death_dsc"]').click();
    cy.get('[id="filter_countries"]').type('ავ');
    cy.get('[id="h-menu"]').click();
    cy.get('.css-b62m3t-container').click();
    cy.get('[id="eng"]').click();
    cy.get('[id="name_asc"]').click();
    cy.get('[id="name_dsc"]').click();
    cy.get('[id="cases_asc"]').click();
    cy.get('[id="cases_dsc"]').click();
    cy.get('[id="death_asc"]').click();
    cy.get('[id="death_dsc"]').click();
    cy.get('[id="recovered_asc"]').click();
    cy.get('[id="recovered_dsc"]').click();
    cy.get('[id="filter_countries"]').type('af');
    cy.get('[id="location"]').click();
    cy.get('[id="location"]').click();
    cy.reload();
  });
  it('user can log out', () => {
    cy.get('[id="h-menu"]').click();
    cy.get('[id="logout_btn"]').click();
    cy.url().should('include', 'login');
    cy.visit('/dashboard/world');
    cy.url().should('include', 'login');
  });
});
