import CMSChallengePage from './pages/cms/cms-challenge-page';
import TaikaiPage from './pages/frontend/taikai-page';
const cms = new CMSChallengePage();
const taikai = new TaikaiPage
import { visitCMSPage } from './pages/url-utils';

describe('Regression Test', () => {
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

    it('should create and publish a Project successfully', () => {
        cy.visit('');
        cy.frontendLogin();
        taikai.createProject();
        cy.get('button[value="Publish"]').should('be.visible');
        taikai.publishHackathon();
        taikai.changeHackathonData();
    });

    it('should change hackathon to vote step successfully', () => {
        visitCMSPage();
        cy.cmsLogin();
        cms.changeHackathonStepTo('Voting');
        cy.contains(`Changed to step: Voting with success.`)
    });

    it('should add a project to cart end vote successfully', () => {
        cy.visit('');
        cy.frontendLogin();
        taikai.addProjectToCartAndCheckout();
        cy.contains('span' ,'Your votes were submitted with success.').should('be.visible');
    });

    it('should change hackathon to Results step and finish it successfully', () => {
        visitCMSPage();
        cy.cmsLogin();
        cms.changeHackathonStepTo('Results');
        cy.contains(`Changed to step: Results with success.`);
        cms.terminateHackathon();
        cms.getHackathonName().then(name => {
            cy.contains('span', `Challenge ${name} closed.`).should('be.visible');
        });
    });
});