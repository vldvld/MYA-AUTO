class mainpage{
   personalAccountMenu(){
       return cy.get('[data-cy=personal-account-btn]',{ timeout: 15000 })
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
        return cy.get('[title="My Finance"]')
    }
     goToMyProperty(){
        return cy.get('[title="My Property"]')
    }
      goToMyCollection(){
        return cy.get('[title="My Collection"]')
    }
      goToMyBelongings(){
        return cy.get('[title="My Belongings"]')
    }
      goToMyGroups(){
        return cy.get('[title="Groups"]')
    }
    goToDocumentVault(){
      return cy.get('[title="Document Vault"]')
  }
    homePageUrl(){
      return cy.url().should('eq', `${Cypress.config().baseUrl}`)
    }
}
export default mainpage
