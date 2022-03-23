class mycontacts{

    plusButton(){
        return cy.get('.MuiFab-root')
    }
    firstName(){
        return cy.get('#firstName')
    }
    lastName(){
        return cy.get('#lastName')
    }
    lastName(){
        return cy.get('#lastName')
    }
    companyField(){
        return cy.get('#company')
    }
    positionField(){
        return cy.get('#position')
    }
    emailField(){
        return cy.get('#email')
    }
    phoneField(){
        return cy.get('#phoneNumber')
    }
    addressSearchField(){
        return cy.get('#addressSearch')
    }
    createButton(){
        return cy.contains('Create')
    }
    contactCreatedNotification(){
        return cy.contains('Success! Contact was created', { timeout: 30000 })
    }
    

}
export default mycontacts