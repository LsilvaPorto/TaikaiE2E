import Locators from './locators';
const { faker } = require('@faker-js/faker');


export default class CMSPages extends Locators {
    login(username = Cypress.env('USERNAME'), password = Cypress.env('PASSWORD')) {
        cy.get(this.locators.loginUsernameInput).type(username);
        cy.get(this.locators.loginPasswordInput).type(password);
        cy.get(this.locators.loginSubmitButton).click();
    }

    createRamdomWords(numberOfWords = 3) {
        const name = faker.lorem.words(numberOfWords);
        return name.toString();
    }

    createValue(max = 1000) {
        const value = faker.number.int({ max });
        return value;
    }

    createHackathon() {
        const name = this.createRamdomWords()
        const slug = name.trim().replace(/ /g, '-');
        //open hackathons page 
        cy.get(this.locators.challengesId).click();
        cy.get(this.locators.createChallengeButton).click();
        //hackathon name
        cy.get(this.locators.challengeNameInput).type(name);
        //slug name
        cy.get(this.locators.challengeSlugInput).type(slug);
        //select taikai as organization
        cy.get('#react-select-2-input').type('taikai');
        cy.get('#react-select-2-option-0').click();
        //input prize
        cy.get(this.locators.challengePrizeInput).type(this.createValue());
        //select industry
        cy.get('#react-select-3-input').click();
        cy.get('#react-select-3-option-5').click();
        //select timezone
        cy.get('#react-select-4-input').type('portugal');
        cy.get('#react-select-4-option-540').click();
        //insert description
        cy.get(this.locators.challengeDescriptionInput).type(this.createRamdomWords(10));
        //click create challenge button
        cy.get(this.locators.createNewChallengeButton).click();

    }
    publishHackathon() {
        cy.get(this.locators.iconButton).click();
        cy.get(':nth-child(6) > a > span').click();
        cy.get('.styles__FooterStyle-sc-1xdsng6-0 > .gjQFLT').click();
        //go to published page
        cy.get(this.locators.challenges).click().wait(1000);
    }
    fundHackathon() {
        cy.get(this.locators.tableActionMenu).click();
        cy.get(this.locators.ulActionMenu).click();
        cy.get(this.locators.fundKaiAmount).clear().type(this.createValue());
        cy.get(this.locators.fundModalButton).click();
        cy.get(this.locators.challengeNameCol).click();
    }

    AllowSelfVote() {
        cy.get(this.locators.settingsButton).click();
        cy.get(this.locators.advancedButton).click();
        cy.get(this.locators.editWebhookButton).click();
        cy.get(this.locators.allowSelfVoteCheckbox).click();
        cy.get(this.locators.challengeModerateProjCheckbox).check();
        cy.get(this.locators.updateAdvancedConfigModalButton).click();
    }

    getDate() {
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        return formattedDate;
    }
    createFutureDate() {
        const originalFormattedDate = this.getDate();

        // Convert the formatted date to a Date object
        const originalDate = new Date(originalFormattedDate);

        // Add 2 years to the date
        originalDate.setFullYear(originalDate.getFullYear() + 2);

        // Format the new date
        const year = originalDate.getFullYear();
        const month = String(originalDate.getMonth() + 1).padStart(2, '0');
        const day = String(originalDate.getDate()).padStart(2, '0');
        const newFormattedDate = `${year}-${month}-${day}`;
        return newFormattedDate;

    }

    setRegistration() {
        cy.get(this.locators.stepsButton).click();
        cy.get(this.locators.stepRegistration).click();
        cy.get(this.locators.editRegistrationDatesButton).click();
        cy.get(this.locators.firstDatePickerInput).type(this.getDate());
        cy.get(this.locators.firstTimePickerInput).type('00:00');
        cy.get(this.locators.datePickerInput).type(this.createFutureDate(this.getDate()));
        cy.get(this.locators.timePickerInput).type('00:00');
        cy.get(this.locators.createFormButton).click();
        cy.get(this.locators.secondCreateFormButton).click();
    }

    initHackathon() {
        cy.get(this.locators.stepList).click();
        cy.get(this.locators.firstStepOption).click();
        cy.get(this.locators.changeToThisStepButton).click();
        cy.get(this.locators.confirmButton).click();
    }

    createGlobalJury(user = 'lporto') {
        cy.get(this.locators.globalJuriesButton).click();
        cy.get(this.locators.globalTracksButton).click();
        cy.get(this.locators.addBackerButton).click();
        cy.get(this.locators.searchMemberInput).type(user);
        cy.get(this.locators.firstMemberSelection).click();
        cy.get(this.locators.confirmButton).click();
    }

    fundGlobalJury() {
        cy.get(this.locators.fundGlobalJuryButton).click();
        cy.get(this.locators.ulActionMenuFund).click();
        cy.get(this.locators.globalJuryAmountInput).clear().type(this.createValue());
        cy.get(this.locators.confirmButton).click().wait(1000);
        cy.get(this.locators.confirmButton).click();
    }



}