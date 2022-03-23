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
    createbUTTON(){
        return cy.contains('Create')
    }

}
export default mycontacts