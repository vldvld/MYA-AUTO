class mainpage{
    personalAccountMenu(){
      return cy.get('[data-cy=personal-account-btn]',{ timeout: 25000 })
    }
    accountSettings(){
      return cy.contains('Account Settings')
    }
    security(){
      return cy.contains('security')
    }
    accessControl(){
      return cy.contains('Access control')
    }
    billingAndSubscription(){
      return cy.contains('Billing and Subscription')
    }
    contacts(){
      return cy.contains('Contacts')
    }
    signOut(){
      return cy.contains('Sign out')
    }
    goToMyFinance(){
      return cy.get('[title="My Finance"]',{ timeout: 20000 })
    }
    goToMyProperty(){
      return cy.get('[title="My Property"]',{ timeout: 20000 })
    }
    goToMyCollection(){
      return cy.get('[title="My Collection"]',{ timeout: 20000 })
    }
    goToMyBelongings(){
      return cy.get('[title="My Belongings"]',{ timeout: 20000 })
    }
    goToMyGroups(){
      return cy.get('[title="Groups"]',{ timeout: 20000 })
    }
    goToDocumentVault(){
      return cy.get('[title="Document Vault"]',{ timeout: 20000 })
    }
    homePageUrl(){
      return cy.url().should('eq', `${Cypress.config().baseUrl}auth/login`)
    }
    modalTitle(){
      return cy.get('#customized-dialog-title').find('span')
  }
}
export default mainpage
