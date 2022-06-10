/// <reference types="cypress" />

describe('login page testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dashboard/country');
  });
  it('country statistic is loaded', () => {
    cy.intercept('GET', 'https://coronatime-api.devtest.ge/api/countries/', {
      statusCode: 200,
      body: [
        {
          code: 'AF',
          name: {
            en: 'Afghanistan',
            ka: 'ავღანეთი',
          },
          statistics: {
            confirmed: 1234,
            critical: 1234,
            deaths: 1234,
            recovered: 1234,
          },
          id: '628360785af42d12eef05c44',
        },
        {
          code: 'AL',
          name: {
            en: 'Albania',
            ka: 'ალბანეთი',
          },
          statistics: {
            confirmed: 3224,
            critical: 3454,
            deaths: 1111,
            recovered: 1023,
          },
          id: '628360785af42d12eef05c45',
        },
      ],
    });
    /* eslint-disable cypress/no-unnecessary-waiting */
    cy.wait(5000).should(() => {
      expect(JSON.parse(localStorage.getItem('statistics'))[0].code).to.eq(
        'AF'
      );
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
    cy.intercept('GET', 'https://coronatime-api.devtest.ge/api/countries/').as(
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
