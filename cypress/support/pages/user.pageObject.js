import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}`);
  }

  get followBtn() {
    return cy.get('follow-user-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-user-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertCanFollowUser() {
    this.followBtn.should('exist');
  }
}

export default UserPageObject;
