import Locators from '../locators';
import { createCMSLink } from '../url-utils';
export default class CMSUserPage extends Locators {

    searchUser(username) {
        cy.get(this.cms.usersId).click();
        createCMSLink().then((url) => {
            cy.url().should('include', `${url}/users/users`);
        });
        cy.get(this.cms.textFieldInput).click().type(username);
    }

    openUserDetails(username) {
        cy.get(this.cms.usersId).click();
        cy.get(this.cms.userDetailsColumnFullName).click();
        createCMSLink().then((url) => {
            cy.url().should('include', `${url}/${username}`);
        });
    }

}