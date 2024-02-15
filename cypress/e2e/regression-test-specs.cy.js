import CMSChallengePage from './pages/cms/cms-challenge-page';
import CMSOrganizationPage from './pages/cms/cms-organization-page';
import TaikaiPage from './pages/frontend/taikai-page';
const cmsChallengePage = new CMSChallengePage();
const cmsOrganizationPage = new CMSOrganizationPage();
const taikai = new TaikaiPage
import { visitCMSPage } from './pages/url-utils';

describe('Regression Test', () => {
    it('should create a hackathon successfully', () => {
        visitCMSPage();
        cy.cmsLogin();
        cmsChallengePage.createHackathon();
        // cy.contains('challenge was created').should('be.visible');
        cmsChallengePage.publishHackathon();
        cy.contains('published with success').should('be.visible');
        cmsChallengePage.fundHackathon();
        cy.contains('.styles__Wrapper-sc-1dru8fr-0 > span', 'Funded').should('be.visible');
        cmsChallengePage.AllowSelfVote();
        cy.contains('Advanced Settings Saved.').should('be.visible');
        cmsChallengePage.setRegistration();
        cy.contains('PARTICIPANT Registration Form Saved').should('be.visible');
        cy.contains('Registration dates updated with success.').should('be.visible');
        cmsChallengePage.initHackathon();
        cy.contains('Changed to step: Registration with success.').should('be.visible');
        cmsChallengePage.createGlobalJury();
        cy.contains('added as jury.').should('be.visible');
        cmsChallengePage.fundGlobalJury();
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
        cmsChallengePage.changeHackathonStepTo('Voting');
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
        cmsChallengePage.changeHackathonStepTo('Results');
        cy.contains(`Changed to step: Results with success.`);
        cmsChallengePage.terminateHackathon();
        cmsChallengePage.getHackathonName().then(name => {
            cy.contains('span', `Challenge ${name} closed.`).should('be.visible');
        });
    });

    it('should create a organization successfully', () => {
        visitCMSPage();
        cy.cmsLogin();
        cmsOrganizationPage.createOrganization();
        cy.contains('span', 'published with success').should('be.visible');
        cmsOrganizationPage.editOrganization();
        cy.contains('span', 'organization updated.');
        cmsOrganizationPage.addMemberToOrganization();
        cy.contains('span', 'added to').should('be.visible');
    });
});