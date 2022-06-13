/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit('/dashboard/country');
  });
  it('country statistic is loaded', () => {
    cy.fixture('countries').then((json) => {
      cy.intercept('GET', Cypress.env('api_server') + 'countries/', {
        statusCode: 200,
        body: json.countries,
      });
    });

    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(5000).should(() => {
      expect(
        JSON.parse(localStorage.getItem('statistics') || '')[0].code
      ).to.eq('AF');
    });
    cy.get('[id="name_asc"]').click();
    cy.get('[id="name_dsc"]').click();
    cy.get('[id="cases_asc"]').click();
    cy.get('[id="cases_dsc"]').click();
    cy.get('[id="death_asc"]').click();
    cy.get('[id="death_dsc"]').click();
    cy.get('[id="recovered_asc"]').click();
    cy.get('[id="recovered_dsc"]').click();
    cy.get('[id="filter_countries"]').type('af');
    cy.get('[id="h-menu"]').click();
    cy.get('.css-b62m3t-container').click();
    cy.get('[id="geo"]').click();
    cy.get('[id="name_asc"]').click();
    cy.get('[id="name_dsc"]').click();
    cy.get('[id="filter_countries"]').type('ავ');
    cy.reload();
  });
  it('check request error', () => {
    cy.intercept('GET', Cypress.env('api_server') + 'countries/').as(
      'getCountries'
    );
    cy.wait('@getCountries')
      .its('response.statusCode')
      .should('be.oneOf', [500]);
  });
  it('user can log out', () => {
    cy.get('[id="h-menu"]').click();
    cy.get('[id="logout_btn"]').click();
    cy.url().should('include', 'login');
  });
});
