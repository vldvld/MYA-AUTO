class documentstorage{

    plusButton(){   
        return cy.get('[data-cy="add-btn"]')
    }
    assetType(){
        return cy.get('[aria-haspopup="listbox"]')
    }
    artAssetType(){
        return cy.get('[data-value="ART"]')
    }
    skipButton(){
        return cy.contains('Skip')
    }
    uploadButton(){
        return cy.get('[data-cy="asset-dialog-submit-btn"]')

        
    }
    modalTitle(){
        return cy.get('#customized-dialog-title')   
    }
    dropFilesButton(){
        return cy.contains('Drop file(s) here or choose file(s)')
    }
    documentAddedNotification(){
        return cy.contains('Success! Document was uploaded', { timeout: 50000})
    }  
}
export default documentstorage


