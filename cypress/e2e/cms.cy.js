import CMSPages from './pages/cms';
const cms = new CMSPages();

describe('Hackathons spec', () => {
  before(() => {
    cy.visit('');
    cms.login();
  })
  it('create a Hackathon', () => {
    cms.createHackathon();
    cms.publishHackathon();
    cms.fundHackathon();
    cms.AllowSelfVote();
    cms.setRegistration();
    cms.initHackathon();
    cms.createGlobalJury();
    cms.fundGlobalJury();
  })

})