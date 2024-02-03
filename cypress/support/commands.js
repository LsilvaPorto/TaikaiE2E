// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Locators from "../e2e/pages/locators";
const locators = new Locators();

Cypress.Commands.add('cmsLogin', (username = Cypress.env('USERNAME'), password = Cypress.env('PASSWORD')) => {
    cy.get(locators.cms.loginUsernameInput).type(username);
    cy.get(locators.cms.loginPasswordInput).type(password);
    cy.get(locators.cms.loginSubmitButton).click();
});

Cypress.Commands.add('cmsLogout', () => {
    cy.get('[data-testid="action-logout"]').click();
    cy.url().should('contains', 'https://gaia.taikai.network:3000/login');

});

Cypress.Commands.add('frontendLogin', (username = Cypress.env('USERNAME'), password = Cypress.env('PASSWORD')) => {
    cy.get('[data-testid=login-email-input]').type(username);
    cy.get('[data-testid=login-password-input]').type(password);
    cy.get('[data-testid=login-submit-button]').click();
});

Cypress.Commands.add('frontendLogout', () => {

});
Cypress.Commands.add('uploadFile', (fileName, locator) => {
    cy.fixture(fileName).then(fileContent => {
        cy.get(locator).attachFile({
            fileContent: fileContent.toString(),
            fileName: fileName,
            mimeType: 'image/svg+xml'
        });
    });
});