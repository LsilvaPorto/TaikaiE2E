export function visitCMSPage() {
  const baseUrl = Cypress.config('baseUrl');
  const modifiedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  cy.visit(`${modifiedBaseUrl}:3000`);
   
}
export function createCMSLink() {
  const baseUrl = Cypress.config('baseUrl');
  const modifiedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${modifiedBaseUrl}:3000`;
}