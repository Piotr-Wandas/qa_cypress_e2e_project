
/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import UserPageObject from '../support/pages/user.pageObject';

const signInPage = new SignInPageObject();
const userPage = new UserPageObject();

describe('User', () => {
  let firstUser;
  let secondUser;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      firstUser = generateUser;
      cy.register(firstUser.email, firstUser.username, firstUser.password);
      secondUser = generateUser;
      secondUser.email += 'mail';
      secondUser.username += 'follower';
      cy.register(secondUser.email, secondUser.username, secondUser.password);
    });
  });

  it('should be able to follow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(secondUser.email);
    signInPage.typePassword(secondUser.password);

    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.visit(`/#/@${firstUser.username.replace('follower', '')}`);

    cy.contains(
      'button',
      `Follow ${firstUser.username.replace('follower', '')}`
    ).click();
  });

  it('should allow to unfollow the another user', () => {
    signInPage.visit();

    signInPage.typeEmail(secondUser.email);
    signInPage.typePassword(secondUser.password);

    signInPage.clickSignInBtn();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.visit(`/#/@${firstUser.username.replace('follower', '')}`);

    userPage.assertFollowingUser();

    cy.contains(
      'button',
      `Follow ${firstUser.username.replace('follower', '')}`
    ).click();
    userPage.assertUnfollowingUser();
    cy.contains(
      'button',
      `Unfollow ${firstUser.username.replace('follower', '')}`
    ).click();
  });
});
