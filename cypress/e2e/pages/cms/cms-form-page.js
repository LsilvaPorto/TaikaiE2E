import Locators from "../locators";

export default class CMSFormPage extends Locators {
    updateSettings() {
        cy.get('[data-testid="forms"]').click();

    }
}
