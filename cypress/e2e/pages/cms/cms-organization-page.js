import Locators from "../locators";
export default class CMSOrganizationPage extends Locators {
    createOrganization(orgName, orgSlug, orgEmail, orgDescription, orgIndustry, orgBillingPlan) {
        cy.get('[data-testid="organizationsid"]').click();
        cy.url().should('contains', 'https://gaia.taikai.network:3000/organizations/organizations');
        cy.get('button:contains("Create Organizations")',).click();
        cy.get('input[placeholder="Orgnization name"]').type(orgName);
        cy.get('input[placeholder="org-slug"]').type(orgSlug);
        cy.get('input[placeholder="email@company.org"]').type(orgEmail);
        cy.contains('.select__placeholder', 'Search industry tags').click();
        cy.contains('.select__option', orgIndustry).click();
        cy.contains('.select__placeholder', 'Search billing plans').click();
        cy.contains('.select__option', orgBillingPlan).click();
        cy.get('input[placeholder="Short Description"]').type(orgDescription);
        cy.get('button[value="Create"]').click();
        cy.get('[data-testid="organizationsid"]').click();
        cy.reload();
        cy.get('[data-testid="unpublished-organizations"]').click();
        cy.get('[data-testid="icon-button"]').first().click();
        cy.get('[data-testid="li-action-menu"]:contains("Publish Organization")').click();
        cy.get('button[value="Publish"]').click();
        return orgName;
    }

    editOrganization(orgName, orgSlug, orgEmail, orgDescription, orgWebsite) {
        cy.get('[data-testid="organizationsid"]').click();
        cy.url().should('contains', 'https://gaia.taikai.network:3000/organizations/organizations');
        cy.contains(orgName).click();
        cy.get('button[value="Edit"]').click();
        cy.uploadFile('cover-image.png');
        cy.uploadFile('profile-image.png');
        cy.uploadFile('card-cover.png');
        cy.get('input[placeholder="Orgnization name"]').type(orgName);
        cy.get('input[placeholder="org-slug"]').type(orgSlug);
        cy.get('input[placeholder="email@company.org"]').type(orgEmail);
        cy.get('input[placeholder="Short Description"]').type(orgDescription);
        cy.get('input[placeholder="https://mycompany.com"]').type(orgWebsite);
        cy.get('button[value="Save"]').click();
    }
    
    addMemberToOrganization(orgName, username) {
        cy.get('[data-testid="organizationsid"]').click();
        cy.get('input[placeholder="Search"]').type(orgName);
        cy.contains(orgName).click();
        //input to insert member name
        cy.get('body > div.styles__ModalWrapper-sc-16r6vcc-1.dbSzHj > div > div.add-org-user-modal__FormStyle-sc-7qpbgk-0.gbCiIj > div:nth-child(1) > div > div > div > div.select__value-container.css-hlgwow > div.select__input-container.css-19bb58m').type(username);
        cy.contains('.select__option', username).click();
        cy.get('button[value="Add"]').click();
    }

}