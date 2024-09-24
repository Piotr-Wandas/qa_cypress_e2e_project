import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  get succesfulRegistrationMessage() {
    return cy.get('.swal-text');
  }

  assertSuccesfulRegistrationMessage() {
    this.succesfulRegistrationMessage.should(
      'contain',
      'Your registration was successful!'
    );
  }

  get successfulRegistrationBtn() {
    return cy.get('.swal-button');
  }

  clickSuccessfulRegistrationBtn() {
    this.successfulRegistrationBtn.click();
  }
}

export default HomePageObject;
