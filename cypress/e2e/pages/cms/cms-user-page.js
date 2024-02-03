import Locators from './locators';
export default class CMSUserPage extends Locators {

    searchUser(username) {
        cy.get('[data-testid="usersid"]').click();
        cy.url().should('contains', 'https://gaia.taikai.network:3000/users/users');
        cy.get('.styles__TextFieldInputStyle-sc-1hxcxbo-0').click().type(username);

    }

    openUserDetails(username) {
        cy.get('[data-testid="usersid"]').click();
        cy.get('[data-testid="td-users-column-fullName"]').click();
        cy.url().should('contains', `https://gaia.taikai.network/${username}`);;
        
    }

}