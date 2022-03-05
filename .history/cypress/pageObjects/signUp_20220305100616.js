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
        return cy.get('#billing-email')
    }
    stripeCard(){
        return cy.getWithinIframe('[name="cardnumber"]')
    }
    stripeExpDate(){
        return cy.getWithinIframe('[name="exp-date"]')  
    }
    stripeCvc(){
        return cy.getWithinIframe('[name="cvc"]')  
    }
    stripePostal(){
        return cy.getWithinIframe('[name="postal"]')
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
        return cy.contains('Next')
    }
    
}
export default signup
