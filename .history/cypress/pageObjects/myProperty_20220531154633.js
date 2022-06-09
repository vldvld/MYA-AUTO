class property{
    
    email(){
        return cy.get('[name="email"]')
    }
    myPropertyPlusButton(){
        return cy.get('.MuiFab-root')
    }
    propertyName(){
        return cy.get('[name="propertyName"]')
    }
    nextButton(){
        return cy.contains('Next')
    }
    propertyType(){
        return cy.get('#propertyType')
    }
    ownershipType(){
        return cy.get('.MuiSelect-root')
    }
    locationField(){
        return cy.get('#location')
    }
    createButton(){
        return cy.get('.MuiPaper-root > .MuiDialogActions-root').contains('Save and Close')
    }
    saveAndCloseMain(){
        return cy.contains('Create')
    }
    purchasePrice(){
        return cy.get('#purchasePrice')
    }
    bedroomsNumber(){
        return cy.get('#bedroomsNumber')
    }
    propertyCollectiblesValue(){
        return cy.get('[data-cy="summary-widget-value"]', { timeout: 30000 })
    }
    propertyLiability(){
        return cy.get('[data-cy=property-collectibles-liabilities]', { timeout: 30000 })
    }
    propertyCollectiblesNetValue(){
        return cy.get('[data-cy=property-collectibles-net-value]', { timeout: 30000 })
    }
    propertyCreatedNotification(){
        return cy.contains('Property Asset was created', { timeout: 30000})
    }
    myPropertiesTab(){
        return cy.get('[data-cy=properties-tab-btn]')
    }
    npopertySummaryTab(){
        return cy.get('[data-cy=property-summary-tab-btn]')
    }
    name(){
        return cy.get('')
    }
    name(){
        return cy.get('')
    }


}
export default property