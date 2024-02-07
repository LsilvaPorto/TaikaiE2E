import Locators from "../locators";

export default class CMSVoucherPage extends Locators {

    checkVoucher() {
        cy.get(this.cms.vouchersId).click();
        cy.get(`${this.cms.rowTableTestId}:nth-child(1) > [data-testid="td-undefined"]:nth-child(5) > div`).invoke('text').then((text) => {
            cy.visit(`/voucher/${text}`);
        });
        cy.get(this.cms.signInButton).click();
        cy.cmsLogin();
        cy.get(this.cms.notValidatedAccountText).should('contain', 'Your TAIKAI account must be validated to redeem this voucher.');
    }

    createVoucher(voucherName, description) {
        cy.get(this.cms.vouchersId).click();
        cy.get(this.cms.newVoucherButton).click();
        cy.get(this.cms.voucherNameInput).type(voucherName);
        cy.get(this.cms.voucherDescriptionInput).type(description);
        cy.get(this.cms.submitButton).click();
    }


}