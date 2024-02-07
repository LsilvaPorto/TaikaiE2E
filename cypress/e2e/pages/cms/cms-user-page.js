import Locators from '../locators';
export default class CMSUserPage extends Locators {

    searchUser(username) {
        cy.get(this.cms.usersId).click();
        cy.url().should('include', 'https://gaia.taikai.network:3000/users/users');
        cy.get(this.cms.textFieldInput).click().type(username);
    }

    openUserDetails(username) {
        cy.get(this.cms.usersId).click();
        cy.get(this.cms.userDetailsColumnFullName).click();
        cy.url().should('include', `https://gaia.taikai.network/${username}`);
    }

}