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
import 'cypress-file-upload';
import Locators from "../e2e/pages/locators";
const locators = new Locators();

const { faker } = require('@faker-js/faker');

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
    cy.get('a.button').contains("Log in").click({ force: true });
    cy.get('[data-testid=login-email-input]').type(username);
    cy.get('[data-testid=login-password-input]').type(password);
    cy.get('[data-testid=login-submit-button]').click();
    cy.get('#rcc-confirm-button').click();
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

Cypress.Commands.add('createParagraph', (numberOfparagraphs = 1) => {
    const paragraph = faker.lorem.paragraph(numberOfparagraphs);
    return paragraph.toString();
});

Cypress.Commands.add('createRandomInt', (numbers) => {
    return Math.floor(Math.random() * (numbers + 1));
});

Cypress.Commands.add('createRandomWords', (numberOfWords = 2) => {
    const name = faker.lorem.words(numberOfWords);
    return name.toString();
});