/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      //open issue detail modal with title from line 16  
      cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //Add steps to delete issue
    IssueModal.clickDeleteButton();
    IssueModal.confirmDeletion();

    // Assert that the issue is deleted and not displayed on the Jira board anymore
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle);

  });

  it('Should cancel deletion process successfully', () => {
    //Add steps to start deletion proces but cancel it
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal();

    // Assert that the issue is not deleted and still displayed on the Jira board
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle);
  });
});
