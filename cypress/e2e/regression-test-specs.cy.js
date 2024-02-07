import CMSChallengePage from './pages/cms/cms-challenge-page';
import TaikaiPage from './pages/frontend/taikai-page';
const cms = new CMSChallengePage();
const taikai = new TaikaiPage
import { visitCMSPage } from './pages/url-utils';

describe('Regression Test', () => {
    // afterEach(() => {
    //     cy.clearCookies();
    //     cy.clearLocalStorage();
    // })
    it('should create a hackathon successfully', () => {
        visitCMSPage();
        cy.cmsLogin();

        cms.createHackathon();
        // cy.contains('challenge was created').should('be.visible');
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
    });
    it('should join a Hackthon successfully', () => {
        cy.visit('');
        cy.frontendLogin();
        taikai.joinHackathon();
        cy.get('span').contains('Registration successfully submitted.').should('be.visible');

    });

    it.only('should create and publish a Project successfully', () => {
        cy.visit('');
        cy.frontendLogin();
        taikai.createProject();
        // cy.get('button[value="Publish"]').should('be.visible');
        // taikai.publishHackathon();
        taikai.changeHackathonData();
    });

    it('should finish a hackathon successfully', () => {
        cy.visit('');
        cy.frontendLogin();

    });
});