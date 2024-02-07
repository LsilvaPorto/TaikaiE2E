export default class TaikaiPage {

    openFirstHackathon() {
        cy.get('a[value="For participants"]').click();
        cy.get('select[name="sort-by"]').select('Most Recent');
        cy.wait(2000);
        cy.contains("Registration").first().should('be.visible').click({ force: true });
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
        // cy.get('button[value="Create Project"]').first().click();
        // cy.createRandomWords(3).then((text) => {
        //     cy.get('#name').type(text);
        // })
        // cy.createParagraph(2).then((text) => {
        //     cy.get('#teaser').type(text);
        // })
        // cy.get('button[value="Continue"]').click();
        // cy.get('button[value="Create Project"]').click({ force: true });
    }

    publishHackathon() {
        cy.get('button[value="Publish"]').first().click();
        cy.get('button[value="Publish"]').eq(1).click();

    }
    changeHackathonData() {
        cy.createParagraph(5).then((text) => {
            cy.get('h3:contains("Description") button').type(text);
        })
        cy.get('button[type="submit"]').click();
        cy.uploadFile('card.png', 'h3:contains("Attachments") button').wait(10000);
        cy.get('button[value="Edit"]').click();
        cy.uploadFile('logo-taikai.png', '#coverImageFile').wait(10000);
        cy.uploadFile('taikai-ico.png', '#logoImageFile').wait(10000);
        cy.get('button[value="Save"]').click();

    }
}