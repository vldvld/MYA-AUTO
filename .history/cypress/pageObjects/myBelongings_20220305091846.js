class login{

    nextButton(){
        return cy.contains('Next')
    }
    saveAndClose(){
        return cy.contains('Save and close')
    }
    myBelongingsCreatedNotification(){
        return cy.contains('Other Asset was created', { timeout: 30000})
    }
    myBelongingsPlusButton(){
        return cy.get('.MuiFab-root')
    }
    nameField(){
        return cy.get('#otherName')
    }
    priceField(){
        return cy.get('#purchasePricePerUnit')
    }

    


        
}
export default login