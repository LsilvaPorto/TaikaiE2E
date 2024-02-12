import Locators from '../locators';
export default class TaikaiPage extends Locators {

    openFirstHackathon(step = 'Registration') {
        cy.get('a[value="For participants"]').click();
        cy.get('select[name="sort-by"]').select('Most Recent');
        cy.wait(2000);
        cy.contains(step).first().should('be.visible').click({ force: true });
    }

    joinHackathon() {
        this.openFirstHackathon();
        cy.get('button[value="Join Hackathon"').first().click();
        cy.get('input').eq(0).clear().type('username');
        cy.get('input').eq(1).clear().type('username@mail.com');
        cy.get('select.sc-fqkvVR.kzYmIe').select('MALE');
        cy.get('input[type="date"]').invoke('attr', 'max').then(maxValue => {
            cy.get('input[type="date"]').type(maxValue);
        });
        cy.createParagraph().then(paragraph => {
            cy.get('textarea').type(paragraph);
        });
        cy.get('input').eq(3).type('Gondomar');
        cy.get('.select__input').eq(0).type('Portugal');
        cy.get('.select__menu').eq(0).click();
        cy.get('.select__input').eq(1).click();
        cy.createRandomInt(242).then((int) => {
            cy.get('.select__option').eq(int).click();
        })
        cy.get('button[value="Submit"]').click();
    }

    createProject() {
        this.openFirstHackathon();
        cy.get('button[value="Create Project"]').first().click();
        cy.createRandomWords(3).then((text) => {
            cy.get('#name').type(text);
        })
        cy.createParagraph(2).then((text) => {
            cy.get('#teaser').type(text);
        })
        cy.get('button[value="Continue"]').click();
        cy.get('button[value="Create Project"]').click({ force: true });
    }

    publishHackathon() {
        cy.get('button[value="Publish"]').first().click();
        cy.get('button[value="Publish"]').eq(1).click();
    }

    changeHackathonData() {
        cy.createParagraph(5).then((text) => {
            cy.get('h3:contains("Description") button').click().type(text);
        })
        cy.get('button[value="Save"]').click();
        cy.get('#projectAssetFile').selectFile('cypress/fixtures/card.png', { force: true });
        cy.get('button[value="Edit"]').click();
        cy.get('#coverImageFile').selectFile('cypress/fixtures/logo-taikai.png', { force: true });
        cy.get('#logoImageFile').selectFile('cypress/fixtures/taikai-ico.png', { force: true });
        cy.get('button[value="Save"]').click();
    }

    addProjectToCartAndCheckout() {
        this.openFirstHackathon('Voting');
        cy.contains('a', 'Projects').click();
        cy.get('button.back-project').click();
        cy.get('input[name="amount"]').type(1);
        cy.get('button[value="Add to Cart"]').click();
        cy.get('button.button[color=purple850]').click();
        cy.get(':nth-child(1) > :nth-child(2) > :nth-child(2) > span').invoke('text').then(value => {
            cy.get('input[name="amount"]').clear().type(value);
        })
        cy.get('button[value="Proceed to Checkout"]').click();
        cy.get('input[name="isAware"]').click({ force: true });
        cy.get('button[value="Checkout"]').click();
    }

}