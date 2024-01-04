import CMSPages from './pages/cms-page';
const cms = new CMSPages();

describe('CMS specs', () => {
  before(() => {
    cy.visit('');
    cms.login();
  })
  it('create complete Hackathon', () => {
    cms.createHackathon();
    cy.contains('challenge was created').should('be.visible');
    cms.publishHackathon();
    cy.contains('published with success').should('be.visible');
    cms.fundHackathon();
    cy.contains('.styles__Wrapper-sc-1dru8fr-0 > span', 'Funded').should('be.visible');
    cms.AllowSelfVote();
    cy.contains('Advanced Settings Saved.').should('be.visible');
    cms.setRegistration();
    cy.contains('PARTICIPANT Registration Form Saved').should('be.visible');
    cy.contains('Registration dates updated with success.').should('be.visible');
    cms.initHackathon();
    cy.contains('Changed to step: Registration with success.').should('be.visible');
    cms.createGlobalJury();
    cy.contains('added as jury.').should('be.visible');
    cms.fundGlobalJury();
    cy.contains('VKAI top-up to').should('be.visible');
  })

})