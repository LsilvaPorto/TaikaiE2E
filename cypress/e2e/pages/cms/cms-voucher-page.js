import Locators from "../locators";

export default class CMSVoucherPage extends Locators {
    createVoucher(voucherName, description) {
        cy.get('[data-testid="vouchersid"]').click();
        cy.get('[data-testid=new-voucher-button]').click();
        cy.get('.styles__FormWrapper-sc-buvz3h-0 > .styles__Wrapper-sc-mbja2a-0:nth-child(1) > .styles__TextFieldInputStyle-sc-1hxcxbo-0').type(voucherName);
        cy.get('.fr-element > p').type(description);
        cy.get('[data-testid=]').click();

    }
    checkVoucher(voucherName, description) {
        cy.get('[data-testid="vouchersid"]').click();
        cy.get('[data-testid="row-table-test-id"]:nth-child(1) > [data-testid="td-undefined"]:nth-child(5) > div').invoke('text').then((text) => {
          cy.visit(`/voucher/${text}`);
        })
        //signin button
        cy.get('#__next > div.sc-110d5d99-0.lcdJhS > div.content > div.sc-b7ab2186-0.jClupk > p:nth-child(2) > a').click();
        cy.cmsLogin();
        //text not validated account
        cy.get('#__next > div.sc-110d5d99-0.lcdJhS > div.content > div.sc-684b54f-0.syObn > p').should('contain', 'Your TAIKAI account must be validated to redeem this voucher.');
    }

}