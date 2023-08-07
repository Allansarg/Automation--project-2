import IssueModal from "../../pages/IssueModal";

describe('Issue Tracker Element Test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
      cy.visit(url + '/board?modal-issue-create=true');
      //data set with which we are creating issue, saved as variable
      const issueDetails = {
        title: "TEST_TITLE",
        type: "Bug",
        description: "TEST_DESCRIPTION",
        assignee: "Lord Gaben",
      };
      const EXPECTED_AMOUNT_OF_ISSUES = '5';

      IssueModal.createIssue(issueDetails);
      IssueModal.ensureIssueIsCreated(EXPECTED_AMOUNT_OF_ISSUES, issueDetails);

    });
  });

  it('Add estimation', () => {
    IssueModal.clickOnIssueWithTitle();
    cy.contains('No time logged').should('be.visible');
    cy.get('input[placeholder="Number"]').type(10)
    cy.wait(3000);
    IssueModal.closeDetailModal();
    IssueModal.clickOnIssueWithTitle();

    //Sometimes is not saved and thus might fail
    cy.contains('10h estimated').should('be.visible');

  });

  it('Update estimation', () => {
    IssueModal.clickOnIssueWithTitle();
    cy.get('input[placeholder="Number"]').clear().type(20).blur();
    cy.wait(3000);
    IssueModal.closeDetailModal();
    IssueModal.clickOnIssueWithTitle();

    //Sometimes is not saved and thus might fail
    cy.contains('20h estimated').should('be.visible');

  });

  it('Remove estimation', () => {
    IssueModal.clickOnIssueWithTitle();
    cy.get('input[placeholder="Number"]').clear();
    IssueModal.closeDetailModal();
    IssueModal.clickOnIssueWithTitle();
    cy.contains('No time logged').should('be.visible');
    cy.get('input[placeholder="Number"]')
      .should('have.attr', 'placeholder', 'Number');

  });

  it('Log time', () => {
    IssueModal.clickOnIssueWithTitle();
    cy.get('i[data-testid="icon:stopwatch"]').click()
    cy.get('[data-testid="modal:tracking"]').should('be.visible');
    cy.contains('div', 'Time spent (hours)')
      .next()
      .find('input')
      .type(2);
    cy.contains('div', 'Time remaining (hours)')
      .next()
      .find('input').type(5)
    cy.contains('button', 'Done').click();
    cy.contains('div', 'No time logged').should('not.exist');
  });

  it('Remove logged time', () => {
    IssueModal.clickOnIssueWithTitle();
    cy.get('i[data-testid="icon:stopwatch"]').click();
    cy.get('[data-testid="modal:tracking"]').should('be.visible');
    cy.contains('div', 'Time spent (hours)')
      .next()
      .find('input')
      .clear();
    cy.contains('div', 'Time remaining (hours)')
      .next()
      .find('input')
      .clear()
    cy.contains('button', 'Done').click();
    cy.contains('div', 'No time logged').should('exist');

  });

});