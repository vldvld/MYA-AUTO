class signup{
    createNewAccountButton(){
        return cy.contains('Create a new account')
    }
    userName(){
        return cy.get('#userName')
    }
    lastName(){
        return cy.get('#lastName')
    }
    email(){
        return cy.get('#email')
    }
    submitButton(){
        return cy.get('[type=submit]')
    }
    password(){
        return cy.get('[name="password"]')
    }
    termsCheckBox(){
        return cy.get('[name="terms"]')
    }
    monthlyCompleteButton(){
        return cy.contains('div', 'Continue').find('button').first() 
    }
    backButtonStripeForm(){
        return cy.contains('Back')
    }
    stripeEmail(){
        return cy.get('#billing-email',{ timeout: 30000 })
    }
    stripeCard(){
        return cy.getWithinIframe('[name="cardnumber"]',{ timeout: 30000 })
    }
    stripeExpDate(){
        return cy.getWithinIframe('[name="exp-date"]',{ timeout: 30000 })  
    }
    stripeCvc(){
        return cy.getWithinIframe('[name="cvc"]',{ timeout: 30000 })  
    }
    stripePostal(){
        return cy.getWithinIframe('[name="postal"]',{ timeout: 30000 })
    }
    subscribeButton(){
        return cy.contains('Subscribe')
    }
    completeButton(){
        return cy.contains('Complete')
    }
    selectButton(){
        return cy.contains('Select',{ timeout: 15000 })
    }
    nextButton(){
        return cy.contains('[type=button]', 'Next')
    }
    accountSettingsNotification(){
        return cy.contains('    ')
    }
    
}
export default signup
