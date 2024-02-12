import Locators from '../locators'
const { faker, fa } = require('@faker-js/faker');


export default class CMSChallengePage extends Locators {
    login(username = Cypress.env('USERNAME'), password = Cypress.env('PASSWORD')) {
        cy.get(this.cms.loginUsernameInput).type(username);
        cy.get(this.cms.loginPasswordInput).type(password);
        cy.get(this.cms.loginSubmitButton).click();
    }

    createValue(max = 1000) {
        const value = faker.number.int({ max });
        return value;
    }

    createHackathon() {
        cy.createRandomWords().then((text) => {
            const name = text;
            const slug = name.trim().replace(/ /g, '-');
            //open hackathons page 
            cy.get(this.cms.challengesId).click();
            cy.get(this.cms.createChallengeButton).click();
            //hackathon name
            cy.get(this.cms.challengeNameInput).type(name);
            //slug name
            cy.get(this.cms.challengeSlugInput).type(slug);
        })
        //select taikai as organization
        cy.get(this.cms.selectInput).eq(0).click();// or type taikai .type('taikai');
        cy.createRandomInt(19).then((int) => {
            cy.get(this.cms.optionInput).eq(int).click(); //then select the first option cy.get(this.cms.optionInput).click();
        })
        //input prize
        cy.get(this.cms.challengePrizeInput).type(this.createValue());
        //select industry
        cy.get(this.cms.selectInput).eq(1).click();
        cy.createRandomInt(23).then((int) => {
            cy.get(this.cms.optionInput).eq(int).click();
        })
        //select timezone
        cy.get(this.cms.selectInput).eq(2).type('portugal');
        cy.get(this.cms.optionInput).click();
        //insert description
        cy.createRandomWords(10).then((text) => {
            cy.get(this.cms.challengeDescriptionInput).type(text);
        })
        //click create challenge button
        cy.get(this.cms.createNewChallengeButton).click();

    }
    publishHackathon() {
        cy.get(this.cms.iconButton).first().click();
        cy.get(this.cms.publishHackathonButton).click();
        cy.get(this.cms.confirmPublishHackathonButton).click();
    }

    fundHackathon() {
        //go to published page
        cy.get(this.cms.challenges).click().wait(1000);
        cy.get(this.cms.tableActionMenu).click();
        cy.get(this.cms.ulActionMenu).click();
        cy.get(this.cms.fundKaiAmount).clear().type(this.createValue());
        cy.get(this.cms.fundModalButton).click();

    }

    getFirstHackathon() {
        return cy.get(this.cms.challengeNameColumn).first().invoke('text').then((text) => {
          return text;
        });
    }

    AllowSelfVote() {
        cy.get(this.cms.challengesId).click().wait(1000);
        this.getFirstHackathon().then((hackathon) => {
            cy.contains(hackathon).click();
        })
        cy.get(this.cms.settingsButton).click();
        cy.get(this.cms.advancedButton).click();
        cy.get(this.cms.editWebhookButton).click();
        cy.get(this.cms.allowSelfVoteCheckbox).click();
        cy.get(this.cms.updateAdvancedConfigModalButton).click();
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
        cy.get(this.cms.stepsButton).click();
        cy.get(this.cms.stepRegistration).click();
        cy.get(this.cms.editRegistrationDatesButton).click();
        cy.get(this.cms.startDatePickerInput).type(this.getDate());
        cy.get(this.cms.startTimePickerInput).type('00:00');
        cy.get(this.cms.endDatePickerInput).type(this.createFutureDate(this.getDate()));
        cy.get(this.cms.endTimePickerInput).type('00:00');
        cy.get(this.cms.createFormButton).click();
        cy.get(this.cms.secondCreateFormButton).click();
    }

    initHackathon() {
        cy.get(this.cms.stepList).click();
        cy.get(this.cms.firstStepOption).click();
        cy.get(this.cms.changeToThisStepButton).click();
        cy.get(this.cms.confirmButton).click();
    }

    createGlobalJury(user = 'lporto') {
        cy.get(this.cms.globalJuriesButton).click();
        cy.get(this.cms.globalTracksButton).click();
        cy.get(this.cms.addBackerButton).click();
        cy.get(this.cms.searchMemberInput).type(user);
        cy.get(this.cms.optionInput).contains(user).click();
        cy.get(this.cms.confirmButton).click();
    }

    fundGlobalJury() {
        cy.get(this.cms.fundGlobalJuryButton).click();
        cy.get(this.cms.ulActionMenuFund).click();
        const value = this.createValue();
        cy.get(this.cms.globalJuryAmountInput).clear().type(value);
        cy.get(this.cms.confirmButton).click().wait(1000);
        cy.get(this.cms.confirmButton).click();
    }

    changeHackathonStepTo(step) {
        cy.get(this.cms.challengesId).click();
        cy.get(this.cms.challengesId).click().wait(1000);
        this.getFirstHackathon().then((hackathon) => {
            cy.contains(hackathon).click();
        })
        cy.get(this.cms.stepsButton).click();
        cy.get(this.cms.stepList).click().wait(1000);
        cy.get(`tr:contains("${step}")`)
            .find('button')
            .first()
            .click({ force: true });
        cy.get(this.cms.changeToThisStepButton).click();
        cy.get(this.cms.confirmButton).click();
    }

    terminateHackathon() {
        cy.get('button[value="Terminate"]').click();
        cy.get('button[value="Yes, I\'m sure"]').click();
    }

    getHackathonName() {
        return cy.get('.styles__BreadcrumbWrapper-sc-1b7j2ad-0 > ul > :nth-child(3) > a').invoke('text').then((name) => {
            return name;
        });
    }
}