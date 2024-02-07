import Locators from "../pages/locators";
export default class CMSControlCenterPage extends Locators {
    checkControlCenterInfo() {
        this.verifyCardValue(1);
        this.verifyCardValue(2);
        this.verifyCardValue(3);
        this.verifyCardValue(4);
    }

    verifyCardValue(cardNumber) {
        const cardSelector = `${this.locators.overviewStats} ${this.locators.cardValue}:nth-child(${cardNumber}) > span`;
        cy.get(cardSelector).should('not.eq', 0);
    }
}