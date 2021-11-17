class signup{
    signUpTab(){
        return cy.get('#sign-up-tab')
    }
    firstName(){
        return cy.get('#firstName')
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
        // was before - return cy.get(':nth-child(2) > .jss319 > .MuiButtonBase-root')
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
    
}
export default signup
