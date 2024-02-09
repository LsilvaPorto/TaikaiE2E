import Locators from "../locators";
export default class CMSOrganizationPage extends Locators {

    createOrganization(orgName, orgSlug, orgEmail, orgDescription, orgIndustry, orgBillingPlan) {
        cy.get(this.cms.organizationsId).click();
        cy.get(this.cms.createOrganizationButton).click();
        cy.get(this.cms.organizationNameInput).type(orgName);
        cy.get(this.cms.orgSlugInput).type(orgSlug);
        cy.get(this.cms.orgEmailInput).type(orgEmail);
        cy.get(this.cms.industryTagsDropdown).click();
        cy.contains('.select__option', orgIndustry).click();
        cy.get(this.cms.billingPlansDropdown).click();
        cy.contains('.select__option', orgBillingPlan).click();
        cy.get(this.cms.shortDescriptionInput).type(orgDescription);
        cy.get(this.cms.createButton).click();
        cy.get(this.cms.organizationsId).click();
        cy.reload();
        cy.get(this.cms.unpublishedOrganizations).click();
        cy.get(this.cms.iconButton).first().click();
        cy.get(this.cms.publishOrganizationOption).click();
        cy.get(this.cms.publishButton).click();
        return orgName;
    }

    editOrganization(orgName, orgSlug, orgEmail, orgDescription, orgWebsite) {
        cy.get(this.cms.organizationsId).click();
        cy.contains(orgName).click();
        cy.get(this.cms.editButton).click();
        cy.uploadFile('cover-image.png', this.cms.uploadCoverImgInput);
        cy.uploadFile('profile-image.png', this.cms.uploadAvatarImgInput);
        cy.uploadFile('card-cover.png', this.cms.uploadCardImgInput);
        cy.get(this.cms.organizationNameInput).type(orgName);
        cy.get(this.cms.orgSlugInput).type(orgSlug);
        cy.get(this.cms.orgEmailInput).type(orgEmail);
        cy.get(this.cms.shortDescriptionInput).type(orgDescription);
        cy.get(this.cms.websiteInput).type(orgWebsite);
        cy.get(this.cms.saveButton).click();
    }

    addMemberToOrganization(orgName, username) {
        cy.get(this.cms.organizationsId).click();
        cy.get(this.cms.searchInput).type(orgName);
        cy.contains(orgName).click();
        cy.get(this.cms.addMemberButton).click();
        // Input para inserir o nome do membro
        cy.get('.select__input-container').type(username);
        cy.contains('.select__option', username).click();
        cy.get(this.cms.addMemberButton).click();
    }

}