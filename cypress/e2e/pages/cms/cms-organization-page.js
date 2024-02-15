import { faker } from "@faker-js/faker";
import Locators from "../locators";
export default class CMSOrganizationPage extends Locators {

    createOrganization() {
        cy.get(this.cms.organizationsId).click();
        cy.get(this.cms.createOrganizationButton).click();
        cy.createRandomWords().then((text) => {
            const name = text;
            const slug = name.trim().replace(/ /g, '-');

            cy.get(this.cms.organizationNameInput).type(name);
            cy.get(this.cms.orgSlugInput).type(slug);
        });
        cy.get(this.cms.orgEmailInput).type(faker.internet.email());
        cy.get(this.cms.industryTagsDropdown).click({ force: true });
        cy.get(this.cms.selectInput).eq(0).click();// or type taikai .type('taikai');
        cy.createRandomInt(19).then((int) => {
            cy.get('.select__option').eq(int).click(); //then select the first option cy.get(this.cms.optionInput).click();
        })
        cy.get(this.cms.billingPlansDropdown).click({ force: true });
        cy.createRandomInt(2).then((int) => {
            cy.get('.select__option').eq(int).click(); //then select the first option cy.get(this.cms.optionInput).click();
        })
        cy.createParagraph(3).then((text) => {
            cy.get(this.cms.shortDescriptionInput).type(text);

        });
        cy.get(this.cms.createOrganizationButton).click();
        cy.contains('New').should('not.exist');
        this.getOrganizationName().then((name) => {
            cy.contains('span', `${name} organization was created.`).should('be.visible');
        });
        cy.reload();
        cy.get(this.cms.organizationsId).click();
        cy.get(this.cms.unpublishedOrganizations).click();
        cy.get(this.cms.iconButton).first().click();
        cy.get(this.cms.publishOrganizationOption).click();
        cy.get(this.cms.publishButton).click();
    }

    editOrganization() {
        cy.get('a[href^="/organizations/"]:not([href*="organizations/organizations"]):not([href*="organizations/unpublished-organizations"])').eq(0).click();
        cy.get(this.cms.editButton).click();
        cy.get(this.cms.uploadCoverImgInput).selectFile('cypress/fixtures/logo-taikai.png', { force: true });
        cy.get(this.cms.uploadAvatarImgInput).selectFile('cypress/fixtures/taikai-ico.png', { force: true });
        cy.get(this.cms.uploadCardImgInput).selectFile('cypress/fixtures/card.png', { force: true });
        cy.createRandomWords().then((text) => {
            const name = text;
            const slug = name.trim().replace(/ /g, '-');

            cy.get(this.cms.organizationNameInput).type(name);
            cy.get(this.cms.orgSlugInput).type(slug);
        });
        cy.get(this.cms.orgEmailInput).clear().type(faker.internet.email());
        cy.createParagraph(3).then((text) => {
            cy.get(this.cms.shortDescriptionInput).type(text);

        });
        cy.get(this.cms.websiteInput).type(faker.internet.url());
        cy.get(this.cms.saveButton).click();
    }

    addMemberToOrganization(username = 'lporto') {
        cy.get(this.cms.addMemberButton).click();
        // Input para inserir o nome do membro
        cy.get('.select__input-container').eq(1).type(username);
        cy.contains('.select__option', username).click();
        cy.get(this.cms.addButton).click();
    }

    getOrganizationName() {
        return cy.get('.styles__BreadcrumbWrapper-sc-1b7j2ad-0 > ul > :nth-child(3) > a').invoke('text').then((name) => {
            const nameWithNoHyphen = name.replace(/-/g, ' ');
            return nameWithNoHyphen;
        });
    }
}