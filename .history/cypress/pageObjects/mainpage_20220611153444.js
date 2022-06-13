class mainpage {
  personalAccountMenu() {
    return cy.get('[data-cy=personal-account-btn]', { timeout: 25000 })
  }
  accountSettings() {
    return cy.contains('Account Settings')
  }
  security() {
    return cy.contains('security')
  }
  accessControl() {
    return cy.contains('Access control')
  }
  billingAndSubscription() {
    return cy.contains('Billing and Subscription')
  }
  contacts() {
    return cy.contains('Contacts')
  }
  signOut() {
    return cy.contains('Sign out')
  }
  goToMyFinance() {
    return cy.get('[title="MyFinances"]', { timeout: 20000 })
  }
  goToMyProperty() {
    return cy.get('[title="MyProperties"]', { timeout: 20000 })
  }
  goToMyCollection() {
    return cy.get('[title="MyCollectables"]', { timeout: 20000 })
  }
  goToMyBelongings() {
    return cy.get('[title="MyBelongings"]', { timeout: 20000 })
  }
  goToMyGroups() {
    return cy.get('[title="Groups"]', { timeout: 20000 })
  }
  goToDocumentVault() {
    return cy.get('[title="DataVault"]', { timeout: 20000 })
  }
  homePageUrl() {
    return cy.url().should('eq', `${Cypress.config().baseUrl}auth/login`)
  }
  modalTitle() {
    return cy.get('#customized-dialog-title').find('span')
  }
  cbValueWidget() {
    return cy.get('[data-cy="summary-widget-value"]', { timeout: 30000 })
  }
  cbLiabilityWidget() {
    return cy.get('[data-cy=summary-widget-liabilities]', { timeout: 30000 })
  }
  cbNetValueWidget() {
    return cy.get('[data-cy=summary-widget-net-value]', { timeout: 30000 })
  }

}
export default mainpage
