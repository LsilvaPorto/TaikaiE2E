import Locators from "../pages/locators";
export default class CMSControlCenterPage extends Locators {
    checkControlCenterInfo() {
        cy.visit('https://gaia.taikai.network:3000/control-center/stats');
        cy.get('[data-testid="overview-stats"] .styles__CardValueStyle-sc-1ki7jdk-0:nth-child(1) > span').should('not.eq', 0);
        cy.get('[data-testid="overview-stats"] .styles__CardValueStyle-sc-1ki7jdk-0:nth-child(2) > span').should('not.eq', 0);
        cy.get('[data-testid="overview-stats"] .styles__CardValueStyle-sc-1ki7jdk-0:nth-child(3) > span').should('not.eq', 0);
        cy.get('[data-testid="overview-stats"] .styles__CardValueStyle-sc-1ki7jdk-0:nth-child(4) > span').should('not.eq', 0);

    }
}