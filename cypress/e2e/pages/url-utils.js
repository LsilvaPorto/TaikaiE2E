export function visitCMSPage() {
  const baseUrl = Cypress.config('baseUrl');
  const modifiedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  cy.visit(`${modifiedBaseUrl}:3000`);
   
}