class documentstorage{

    plusButton(){   
        return cy.get('.MuiFab-root')
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
        return cy.contains('Upload')
    }
    modalTitle(){
        return cy.get('#customized-dialog-title')   
    }
    dropFilesButton(){
        return cy.contains('Drop files here or chose files')
    }
}
export default documentstorage


