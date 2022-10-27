class login{

    nextButton(){
        return cy.contains('Next')
    }
    saveAndClose(){
        return cy.contains('Create')
    }
    myBelongingsCreatedNotification(){
        return cy.contains('Belonging asset was created', { timeout: 30000})
    }
    myBelongingsPlusButton(){
        return cy.get('[data-cy="add-btn"]')
    }
    nameField(){
        return cy.get('#belongingName')
    }
    priceField(){
        return cy.get('#purchasePrice')
    }
    locationField(){
        return cy.get('#linkedPropertyAsLocation')
    }
    belongingTypeFiled(){
        return cy.get('#belongingType')
    }
    manufacturerField(){
        return cy.get('#manufacturer')
    }
     
}
export default login